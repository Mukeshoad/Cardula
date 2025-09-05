import { Router } from "express"
import { uploadImage, deleteImage, upload } from "../controllers/uploads"
import { authenticateToken } from "../middleware/auth"

const router = Router()

router.post("/image", authenticateToken, upload.single("image"), uploadImage)
router.delete("/image/:fileName", authenticateToken, deleteImage)

export default router
