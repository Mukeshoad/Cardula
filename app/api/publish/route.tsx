import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { siteId, siteName, blocks } = await request.json()

    if (!siteId || !siteName || !blocks) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    const html = generateHTMLFromBlocks(blocks, siteName)

    const deploymentUrl = `https://${siteName.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${siteId.slice(0, 8)}.siteforge.app`

    // In a real implementation, this would:
    // 1. Generate static HTML/CSS files
    // 2. Deploy to CDN/hosting service
    // 3. Configure custom domains
    // 4. Set up SSL certificates

    console.log(`[v0] Publishing site: ${siteName}`)
    console.log(`[v0] Generated HTML length: ${html.length} characters`)
    console.log(`[v0] Deployment URL: ${deploymentUrl}`)

    // Simulate deployment delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      url: deploymentUrl,
      message: "Site published successfully",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("[v0] Publish error:", error)
    return NextResponse.json({ success: false, error: "Failed to publish site" }, { status: 500 })
  }
}

function generateHTMLFromBlocks(blocks: any[], siteName: string): string {
  const blockHTML = blocks
    .sort((a, b) => a.order - b.order)
    .map((block) => generateBlockHTML(block))
    .join("\n")

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${siteName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; }
  </style>
</head>
<body class="bg-white">
  <main>
    ${blockHTML}
  </main>
</body>
</html>`
}

function generateBlockHTML(block: any): string {
  const { type, props } = block

  switch (type) {
    case "hero":
      return `
        <section class="py-20 px-4 text-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">${props.title || "Welcome"}</h1>
            <p class="text-xl text-gray-600 mb-8">${props.subtitle || "Subtitle"}</p>
          </div>
        </section>`

    case "text":
      return `
        <section class="py-12 px-4">
          <div class="max-w-4xl mx-auto">
            <div class="text-${props.alignment || "left"} text-${props.fontSize || "base"} text-gray-700">
              ${props.content || "Text content"}
            </div>
          </div>
        </section>`

    case "button":
      const buttonClasses =
        props.variant === "primary"
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-900"

      return `
        <section class="py-8 px-4 text-${props.alignment || "center"}">
          <div class="max-w-4xl mx-auto">
            <a href="${props.link || "#"}" class="inline-block px-8 py-3 rounded-lg font-medium transition-colors ${buttonClasses}">
              ${props.text || "Button"}
            </a>
          </div>
        </section>`

    case "image":
      return `
        <section class="py-8 px-4 text-${props.alignment || "center"}">
          <div class="max-w-4xl mx-auto">
            <img src="${props.src || "/placeholder.svg"}" alt="${props.alt || "Image"}" class="max-w-full h-auto rounded-lg shadow-lg mx-auto">
            ${props.caption ? `<p class="text-sm text-gray-600 mt-4">${props.caption}</p>` : ""}
          </div>
        </section>`

    case "contact":
      return `
        <section class="py-16 px-4 bg-gray-50">
          <div class="max-w-2xl mx-auto">
            <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">${props.title || "Contact Us"}</h2>
            <p class="text-gray-600 text-center mb-8">${props.description || "Get in touch"}</p>
            <form class="space-y-6">
              <input type="text" placeholder="Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <input type="email" placeholder="Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <textarea placeholder="Message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"></textarea>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                ${props.submitText || "Send Message"}
              </button>
            </form>
          </div>
        </section>`

    case "spacer":
      const height = props.height === "small" ? "py-4" : props.height === "large" ? "py-16" : "py-8"
      return `<div class="${height}"></div>`

    case "columns":
      const columnCount = props.columns || 2
      const gridClass = `grid-cols-1 md:grid-cols-${columnCount}`
      const columnContent = (props.content || [])
        .map((col: any) => `<div class="p-6">${col.content || "Column content"}</div>`)
        .join("")

      return `
        <section class="py-12 px-4">
          <div class="max-w-6xl mx-auto">
            <div class="grid ${gridClass} gap-6">
              ${columnContent}
            </div>
          </div>
        </section>`

    default:
      return `<div class="py-4 px-4 text-center text-gray-500">Unknown block type: ${type}</div>`
  }
}
