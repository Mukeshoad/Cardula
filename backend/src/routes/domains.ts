import { Router } from "express"
import { addDomain, getDomains, getDomainStatus, deleteDomain, addDomainValidation } from "../controllers/domains"
import { authenticateToken } from "../middleware/auth"

const router = Router()

router.use(authenticateToken)

router.post("/", addDomainValidation, addDomain)
router.get("/", getDomains)
router.get("/:id/status", getDomainStatus)
router.delete("/:id", deleteDomain)

export default router
