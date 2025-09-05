import { Router } from "express"
import { getTemplates, getTemplate, getCategories, seedTemplates } from "../controllers/templates"
import { optionalAuth } from "../middleware/auth"

const router = Router()

// Public routes
router.get("/", optionalAuth, getTemplates)
router.get("/categories", getCategories)
router.get("/:id", optionalAuth, getTemplate)

// Admin routes (simplified for demo)
router.post("/seed", seedTemplates)

export default router
