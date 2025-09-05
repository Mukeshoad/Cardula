"use client"

import { useState } from "react"
import Image from "next/image"

interface ImageWithFallbackProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  aspectRatio?: string
}

export function ImageWithFallback({
  src,
  alt,
  width = 600,
  height = 400,
  className = "",
  aspectRatio = "16/9",
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const fallbackSvg = `data:image/svg+xml;base64,${btoa(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#F3F4F6"/>
      <rect x="${width / 2 - 60}" y="${height / 2 - 40}" width="120" height="80" rx="8" fill="#E5E7EB"/>
      <circle cx="${width / 2 - 30}" cy="${height / 2 - 15}" r="8" fill="#9CA3AF"/>
      <path d="M${width / 2 - 45} ${height / 2 + 5} L${width / 2 - 15} ${height / 2 - 25} L${width / 2 + 15} ${height / 2 - 5} L${width / 2 + 45} ${height / 2 + 5} V${height / 2 + 25} H${width / 2 - 45} V${height / 2 + 5}Z" fill="#9CA3AF"/>
      <text x="${width / 2}" y="${height / 2 + 50}" textAnchor="middle" fill="#6B7280" fontFamily="Inter, sans-serif" fontSize="14">Template Preview</text>
    </svg>
  `)}`

  if (error) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center ${className}`} style={{ aspectRatio }}>
        <img src={fallbackSvg || "/placeholder.svg"} alt={alt} className="w-full h-full object-cover" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
      {loading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300"
        style={{ opacity: loading ? 0 : 1 }}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true)
          setLoading(false)
        }}
        loading="lazy"
      />
    </div>
  )
}
