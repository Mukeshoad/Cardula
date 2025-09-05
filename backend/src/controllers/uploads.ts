import type { Request, Response } from "express"
import multer from "multer"
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"
import path from "path"

const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
  forcePathStyle: true,
})

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed."))
    }
  },
})

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" })
    }

    const fileId = uuidv4()
    const fileExtension = path.extname(req.file.originalname)
    const fileName = `${fileId}${fileExtension}`

    // Process image with Sharp
    let processedBuffer = req.file.buffer

    // Optimize image
    if (req.file.mimetype !== "image/gif") {
      processedBuffer = await sharp(req.file.buffer)
        .resize(2000, 2000, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toBuffer()
    }

    // Upload to S3
    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: `uploads/${fileName}`,
      Body: processedBuffer,
      ContentType: req.file.mimetype,
      CacheControl: "public, max-age=31536000",
    })

    await s3Client.send(uploadCommand)

    const fileUrl = `${process.env.S3_ENDPOINT}/${process.env.S3_BUCKET}/uploads/${fileName}`

    res.json({
      success: true,
      url: fileUrl,
      fileName,
      originalName: req.file.originalname,
      size: processedBuffer.length,
    })
  } catch (error) {
    console.error("Upload error:", error)
    res.status(500).json({ error: "Failed to upload file" })
  }
}

export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.params

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: `uploads/${fileName}`,
    })

    await s3Client.send(deleteCommand)

    res.json({ success: true })
  } catch (error) {
    console.error("Delete error:", error)
    res.status(500).json({ error: "Failed to delete file" })
  }
}

export { upload }
