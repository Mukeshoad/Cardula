import { Router } from "express"
import { publishProject, getPublishStatus } from "../controllers/publishing"
import { authenticateToken } from "../middleware/auth"

const router = Router()

router.use(authenticateToken)

router.post("/:id/publish", publishProject)
router.get("/jobs/:jobId/status", getPublishStatus)

export default router
