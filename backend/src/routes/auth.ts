import { Router } from "express"
import rateLimit from "express-rate-limit"
import { signup, login, getProfile, signupValidation, loginValidation } from "../controllers/auth"
import { authenticateToken } from "../middleware/auth"

const router = Router()

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { error: "Too many authentication attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
})

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login requests per windowMs
  message: { error: "Too many login attempts, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
})

// Auth routes
router.post("/signup", authLimiter, signupValidation, signup)
router.post("/login", loginLimiter, loginValidation, login)
router.get("/profile", authenticateToken, getProfile)

export default router
