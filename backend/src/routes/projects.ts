import { Router } from "express"
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
  duplicateProject,
  createProjectValidation,
  updateProjectValidation,
} from "../controllers/projects"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// All project routes require authentication
router.use(authenticateToken)

router.post("/", createProjectValidation, createProject)
router.get("/", getProjects)
router.get("/:id", getProject)
router.put("/:id", updateProjectValidation, updateProject)
router.delete("/:id", deleteProject)
router.post("/:id/duplicate", duplicateProject)

export default router
