import Queue from "bull"
import Redis from "redis"

// Initialize Redis connection
const redis = Redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
})

redis.on("error", (err) => {
  console.error("Redis connection error:", err)
})

redis.on("connect", () => {
  console.log("Connected to Redis")
})

// Create job queues
export const publishQueue = new Queue("publish site", {
  redis: {
    port: Number.parseInt(process.env.REDIS_PORT || "6379"),
    host: process.env.REDIS_HOST || "localhost",
    password: process.env.REDIS_PASSWORD,
  },
})

export const domainQueue = new Queue("domain verification", {
  redis: {
    port: Number.parseInt(process.env.REDIS_PORT || "6379"),
    host: process.env.REDIS_HOST || "localhost",
    password: process.env.REDIS_PASSWORD,
  },
})

// Job processors
publishQueue.process("publish-site", async (job) => {
  const { projectId, userId } = job.data
  console.log(`Processing publish job for project ${projectId}`)

  try {
    // Import here to avoid circular dependencies
    const { publishSite } = await import("./publishing")
    const result = await publishSite(projectId, userId)

    return result
  } catch (error) {
    console.error("Publish job failed:", error)
    throw error
  }
})

domainQueue.process("verify-domain", async (job) => {
  const { domainId } = job.data
  console.log(`Processing domain verification for ${domainId}`)

  try {
    const { verifyDomain } = await import("./domains")
    const result = await verifyDomain(domainId)

    return result
  } catch (error) {
    console.error("Domain verification failed:", error)
    throw error
  }
})

export { redis }
