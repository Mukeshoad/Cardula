const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface UploadResponse {
  success: boolean
  url: string
  fileName: string
  originalName: string
  size: number
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("image", file)

  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE}/api/uploads/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Upload failed")
  }

  return response.json()
}

export const deleteImage = async (fileName: string): Promise<void> => {
  const token = localStorage.getItem("token")

  const response = await fetch(`${API_BASE}/api/uploads/image/${fileName}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Delete failed")
  }
}
