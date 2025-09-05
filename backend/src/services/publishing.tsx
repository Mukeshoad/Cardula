import { PrismaClient } from "@prisma/client"
import AWS from "aws-sdk"
import { v4 as uuidv4 } from "uuid"

const prisma = new PrismaClient()

// Configure AWS S3
const s3 = new AWS.S3({
  endpoint: process.env.S3_ENDPOINT,
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION || "us-east-1",
  s3ForcePathStyle: true,
})

export async function publishSite(projectId: string, userId: string) {
  try {
    // Get project data
    const project = await prisma.project.findFirst({
      where: { id: projectId, userId },
    })

    if (!project) {
      throw new Error("Project not found")
    }

    // Generate static HTML
    const html = generateStaticHTML(project)

    // Generate unique deployment ID
    const deploymentId = uuidv4()
    const sitePath = `sites/${project.slug}-${deploymentId}`

    // Upload to S3
    const uploadParams = {
      Bucket: process.env.PUBLISH_S3_BUCKET || process.env.S3_BUCKET!,
      Key: `${sitePath}/index.html`,
      Body: html,
      ContentType: "text/html",
      ACL: "public-read",
    }

    await s3.upload(uploadParams).promise()

    // Generate published URL
    const publishDomain = process.env.PUBLISH_DOMAIN || "localhost:3000"
    const publishedUrl = `https://${project.slug}.${publishDomain}`

    // Update project with published info
    await prisma.project.update({
      where: { id: projectId },
      data: {
        isPublished: true,
        publishedAt: new Date(),
        publishedUrl,
      },
    })

    return {
      success: true,
      publishedUrl,
      deploymentId,
      sitePath,
    }
  } catch (error) {
    console.error("Publishing failed:", error)
    throw error
  }
}

function generateStaticHTML(project: any): string {
  const blocks = project.content || []
  const styles = project.styles || {}

  // Generate CSS from styles
  const css = generateCSS(styles)

  // Generate HTML from blocks
  const bodyHTML = blocks.map((block: any) => renderBlockToHTML(block)).join("\n")
  const textColor = "#333" // Define textColor here to avoid use before declaration

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${project.seoTitle || project.title}</title>
  <meta name="description" content="${project.seoDescription || project.description || ""}">
  ${project.favicon ? `<link rel="icon" href="${project.favicon}">` : ""}
  
  <!-- Generated Styles -->
  <style>
    ${css}
    ${project.customCss || ""}
  </style>
  
  <!-- Analytics -->
  <script>
    // Add analytics tracking here
  </script>
</head>
<body>
  ${bodyHTML}
  
  <!-- Contact Form Handler -->
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const forms = document.querySelectorAll('form[data-form-type="contact"]');
      forms.forEach(form => {
        form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());
          
          // Send to form handler service
          fetch('/api/forms/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              projectId: '${project.id}',
              ...data
            })
          })
          .then(response => response.json())
          .then(result => {
            if (result.success) {
              alert('Message sent successfully!');
              form.reset();
            } else {
              alert('Failed to send message. Please try again.');
            }
          })
          .catch(error => {
            console.error('Form submission error:', error);
            alert('Failed to send message. Please try again.');
          });
        });
      });
    });
  </script>
</body>
</html>
  `.trim()
}

function generateCSS(styles: any): string {
  const primaryColor = styles.primaryColor || "#0066FF"
  const fontFamily = styles.fontFamily || "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
  const spacing = styles.spacing || "normal"

  const spacingValues = {
    tight: "0.5rem",
    normal: "1rem",
    comfortable: "1.5rem",
  }

  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${fontFamily};
      line-height: 1.6;
      color: #333;
    }
    
    :root {
      --primary-color: ${primaryColor};
      --spacing: ${spacingValues[spacing as keyof typeof spacingValues]};
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--spacing);
    }
    
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: var(--primary-color);
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      transition: all 0.2s ease;
      border: none;
      cursor: pointer;
    }
    
    .btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    
    .btn-outline {
      background-color: transparent;
      color: var(--primary-color);
      border: 2px solid var(--primary-color);
    }
    
    .btn-outline:hover {
      background-color: var(--primary-color);
      color: white;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    .form-group {
      margin-bottom: 1rem;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    
    .form-input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 16px;
    }
    
    .form-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 0 1rem;
      }
      
      h1 {
        font-size: 2rem !important;
      }
      
      h2 {
        font-size: 1.5rem !important;
      }
    }
  `
}

function renderBlockToHTML(block: any): string {
  switch (block.type) {
    case "hero":
      const {
        title = "Welcome",
        subtitle = "Subtitle",
        description = "Description",
        buttonText = "Get Started",
        buttonLink = "#",
        backgroundImage,
        backgroundColor = "#0066FF",
        alignment = "center",
        textColor = "#FFFFFF",
      } = block.props

      return `
        <section style="
          position: relative;
          padding: 80px 0;
          text-align: ${alignment};
          background-color: ${backgroundImage ? "transparent" : backgroundColor};
          ${backgroundImage ? `background-image: url(${backgroundImage}); background-size: cover; background-position: center;` : ""}
          color: ${textColor};
        ">
          ${backgroundImage ? '<div style="position: absolute; inset: 0; background: rgba(0,0,0,0.4);"></div>' : ""}
          <div class="container" style="position: relative;">
            <h1 style="font-size: 3.5rem; font-weight: bold; margin-bottom: 1rem;">${title}</h1>
            <h2 style="font-size: 1.5rem; margin-bottom: 1.5rem; opacity: 0.9;">${subtitle}</h2>
            <p style="font-size: 1.125rem; margin-bottom: 2rem; opacity: 0.8; max-width: 600px; margin-left: auto; margin-right: auto;">${description}</p>
            <a href="${buttonLink}" class="btn" style="background: white; color: #1f2937;">${buttonText}</a>
          </div>
        </section>
      `

    case "text":
      const { content = "<p>Text content</p>", fontSize = 16, textAlign = "left" } = block.props
      return `
        <section style="padding: 2rem 0;">
          <div class="container">
            <div style="font-size: ${fontSize}px; color: #333; text-align: ${textAlign};">
              ${content}
            </div>
          </div>
        </section>
      `

    case "button":
      const {
        text = "Button",
        link = "#",
        backgroundColor: btnBg = "#0066FF",
        textColor: btnColor = "#FFFFFF",
        borderRadius = 8,
        fontSize: btnSize = 16,
        alignment: btnAlign = "left",
        variant = "solid",
      } = block.props

      return `
        <section style="padding: 1rem 0;">
          <div class="container" style="text-align: ${btnAlign};">
            <a href="${link}" class="btn ${variant === "outline" ? "btn-outline" : ""}" style="
              ${variant === "solid" ? `background-color: ${btnBg}; color: ${btnColor};` : `color: ${btnBg}; border-color: ${btnBg};`}
              border-radius: ${borderRadius}px;
              font-size: ${btnSize}px;
            ">${text}</a>
          </div>
        </section>
      `

    case "image":
      const {
        src = "/placeholder.svg?height=300&width=600",
        alt = "Image",
        caption = "",
        borderRadius: imgRadius = 8,
        alignment: imgAlign = "center",
      } = block.props

      return `
        <section style="padding: 1rem 0;">
          <div class="container" style="text-align: ${imgAlign};">
            <img src="${src}" alt="${alt}" style="border-radius: ${imgRadius}px;" />
            ${caption ? `<p style="margin-top: 1rem; font-size: 14px; color: #6b7280; font-style: italic;">${caption}</p>` : ""}
          </div>
        </section>
      `

    case "form":
      const {
        title: formTitle = "Contact Us",
        description: formDesc = "Get in touch",
        buttonText: formBtn = "Send Message",
        backgroundColor: formBg = "#FFFFFF",
        borderColor = "#E5E7EB",
      } = block.props

      return `
        <section style="padding: 2rem 0;">
          <div class="container">
            <div style="max-width: 500px; margin: 0 auto; padding: 2rem; background: ${formBg}; border: 1px solid ${borderColor}; border-radius: 12px;">
              <h3 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 0.5rem;">${formTitle}</h3>
              <p style="color: #6b7280; margin-bottom: 2rem;">${formDesc}</p>
              
              <form data-form-type="contact">
                <div class="form-group">
                  <label class="form-label">Name</label>
                  <input type="text" name="name" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input type="email" name="email" class="form-input" required>
                </div>
                
                <div class="form-group">
                  <label class="form-label">Message</label>
                  <textarea name="message" class="form-input" rows="4" required></textarea>
                </div>
                
                <button type="submit" class="btn" style="width: 100%;">${formBtn}</button>
              </form>
            </div>
          </div>
        </section>
      `

    case "spacer":
      const { height = 60, backgroundColor: spacerBg = "transparent" } = block.props
      return `<div style="height: ${height}px; background-color: ${spacerBg};"></div>`

    default:
      return `<div style="padding: 1rem; border: 1px solid #ef4444; background: #fef2f2; color: #dc2626;">Unknown block type: ${block.type}</div>`
  }
}
