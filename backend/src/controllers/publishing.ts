import type { Response } from "express"
import { PrismaClient } from "@prisma/client"
import type { AuthRequest } from "../middleware/auth"
import { publishQueue } from "../services/queue"
import QRCode from "qrcode"

const prisma = new PrismaClient()

export const publishProject = async (req: AuthRequest, res: Response) => {
  try {
    const { id: projectId } = req.params
    const userId = req.user!.id

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    })

    if (!project) {
      return res.status(404).json({ error: "Project not found" })
    }

    // Create publish job
    const job = await publishQueue.add(
      "publish-site",
      {
        projectId,
        userId,
      },
      {
        attempts: 3,
        backoff: {
          type: "exponential",
          delay: 2000,
        },
      },
    )

    // Create job record
    await prisma.job.create({
      data: {
        id: job.id.toString(),
        type: "PUBLISH_SITE",
        status: "PENDING",
        data: { projectId, userId },
        projectId,
      },
    })

    res.json({
      success: true,
      jobId: job.id,
      message: "Publishing started",
    })
  } catch (error) {
    console.error("Publish project error:", error)
    res.status(500).json({ error: "Failed to start publishing" })
  }
}

export const getPublishStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { jobId } = req.params
    const userId = req.user!.id

    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
        project: { userId },
      },
      include: { project: true },
    })

    if (!job) {
      return res.status(404).json({ error: "Job not found" })
    }

    // Get job status from queue
    const queueJob = await publishQueue.getJob(jobId)

    let status = job.status
    let result = job.result

    if (queueJob) {
      if (queueJob.finishedOn) {
        status = queueJob.failedReason ? "FAILED" : "COMPLETED"
        result = queueJob.returnvalue

        // Update database
        await prisma.job.update({
          where: { id: jobId },
          data: {
            status: status as any,
            result,
            error: queueJob.failedReason,
            completedAt: new Date(queueJob.finishedOn),
          },
        })
      } else if (queueJob.processedOn) {
        status = "PROCESSING"
      }
    }

    let qrCode = null
    if (status === "COMPLETED" && result?.publishedUrl) {
      qrCode = await QRCode.toDataURL(result.publishedUrl)
    }

    res.json({
      status,
      result,
      error: job.error,
      qrCode,
      publishedUrl: result?.publishedUrl,
    })
  } catch (error) {
    console.error("Get publish status error:", error)
    res.status(500).json({ error: "Failed to get publish status" })
  }
}
