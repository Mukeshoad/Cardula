import type { Response } from "express"
import { PrismaClient } from "@prisma/client"
import { body, validationResult } from "express-validator"
import type { AuthRequest } from "../middleware/auth"
import { domainQueue } from "../services/queue"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

export const addDomainValidation = [
  body("domain").isURL({ require_protocol: false }).withMessage("Invalid domain format"),
  body("projectId").optional().isString(),
]

export const addDomain = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: "Validation failed",
        details: errors.array(),
      })
    }

    const userId = req.user!.id
    const { domain: domainName, projectId } = req.body

    // Clean domain name
    const cleanDomain = domainName.replace(/^https?:\/\//, "").replace(/\/$/, "")

    // Check if domain already exists
    const existingDomain = await prisma.domain.findUnique({
      where: { domain: cleanDomain },
    })

    if (existingDomain) {
      return res.status(409).json({ error: "Domain already exists" })
    }

    // Generate verification token
    const verificationToken = uuidv4()

    // Create domain record
    const domain = await prisma.domain.create({
      data: {
        domain: cleanDomain,
        projectId,
        userId,
        verificationToken,
        status: "PENDING",
        dnsRecords: [
          {
            type: "TXT",
            name: `_site-verification.${cleanDomain}`,
            value: verificationToken,
            ttl: 300,
          },
          {
            type: "CNAME",
            name: cleanDomain,
            value: process.env.PUBLISH_DOMAIN || "sites.example.com",
            ttl: 300,
          },
        ],
      },
    })

    // Start verification job
    await domainQueue.add(
      "verify-domain",
      {
        domainId: domain.id,
      },
      {
        delay: 30000, // Wait 30 seconds before first check
        attempts: 10,
        backoff: {
          type: "exponential",
          delay: 60000, // 1 minute
        },
      },
    )

    res.status(201).json({
      domain: {
        id: domain.id,
        domain: domain.domain,
        status: domain.status,
        verificationToken: domain.verificationToken,
        dnsRecords: domain.dnsRecords,
      },
    })
  } catch (error) {
    console.error("Add domain error:", error)
    res.status(500).json({ error: "Failed to add domain" })
  }
}

export const getDomains = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id

    const domains = await prisma.domain.findMany({
      where: { userId },
      select: {
        id: true,
        domain: true,
        status: true,
        sslStatus: true,
        projectId: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    res.json({ domains })
  } catch (error) {
    console.error("Get domains error:", error)
    res.status(500).json({ error: "Failed to fetch domains" })
  }
}

export const getDomainStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const domain = await prisma.domain.findFirst({
      where: { id, userId },
    })

    if (!domain) {
      return res.status(404).json({ error: "Domain not found" })
    }

    res.json({
      domain: {
        id: domain.id,
        domain: domain.domain,
        status: domain.status,
        sslStatus: domain.sslStatus,
        verificationToken: domain.verificationToken,
        dnsRecords: domain.dnsRecords,
        createdAt: domain.createdAt,
        updatedAt: domain.updatedAt,
      },
    })
  } catch (error) {
    console.error("Get domain status error:", error)
    res.status(500).json({ error: "Failed to get domain status" })
  }
}

export const deleteDomain = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user!.id

    const domain = await prisma.domain.findFirst({
      where: { id, userId },
    })

    if (!domain) {
      return res.status(404).json({ error: "Domain not found" })
    }

    await prisma.domain.delete({
      where: { id },
    })

    res.json({ message: "Domain deleted successfully" })
  } catch (error) {
    console.error("Delete domain error:", error)
    res.status(500).json({ error: "Failed to delete domain" })
  }
}
