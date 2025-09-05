import { PrismaClient } from "@prisma/client"
import dns from "dns"
import { promisify } from "util"

const prisma = new PrismaClient()
const resolveTxt = promisify(dns.resolveTxt)
const resolveCname = promisify(dns.resolveCname)

export async function verifyDomain(domainId: string) {
  try {
    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
    })

    if (!domain) {
      throw new Error("Domain not found")
    }

    // Check DNS records
    const isVerified = await checkDNSRecords(domain.domain, domain.verificationToken!)

    if (isVerified) {
      // Update domain status
      await prisma.domain.update({
        where: { id: domainId },
        data: {
          status: "VERIFIED",
          sslStatus: "PENDING", // Will be handled by SSL provisioning
        },
      })

      // Trigger SSL provisioning (simplified)
      setTimeout(async () => {
        await provisionSSL(domainId)
      }, 5000)

      return { success: true, status: "VERIFIED" }
    } else {
      return { success: false, status: "PENDING", error: "DNS records not found" }
    }
  } catch (error) {
    console.error("Domain verification failed:", error)

    await prisma.domain.update({
      where: { id: domainId },
      data: { status: "FAILED" },
    })

    throw error
  }
}

async function checkDNSRecords(domain: string, verificationToken: string): Promise<boolean> {
  try {
    // Check for TXT record verification
    const txtRecords = await resolveTxt(`_site-verification.${domain}`)
    const flatRecords = txtRecords.flat()

    return flatRecords.some((record) => record.includes(verificationToken))
  } catch (error) {
    console.error("DNS lookup failed:", error)
    return false
  }
}

async function provisionSSL(domainId: string) {
  try {
    // Simplified SSL provisioning
    // In production, integrate with Let's Encrypt or Cloudflare

    await new Promise((resolve) => setTimeout(resolve, 10000)) // Simulate SSL provisioning

    await prisma.domain.update({
      where: { id: domainId },
      data: { sslStatus: "PROVISIONED" },
    })

    console.log(`SSL provisioned for domain ${domainId}`)
  } catch (error) {
    console.error("SSL provisioning failed:", error)

    await prisma.domain.update({
      where: { id: domainId },
      data: { sslStatus: "FAILED" },
    })
  }
}
