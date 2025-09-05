import type { BlockType } from "@/lib/projects"

export interface BlockDefinition {
  type: BlockType
  name: string
  icon: string
  description: string
  defaultProps: Record<string, any>
  properties: PropertyDefinition[]
}

export interface PropertyDefinition {
  key: string
  label: string
  type: "text" | "textarea" | "color" | "number" | "select" | "boolean" | "image" | "url"
  options?: { value: string; label: string }[]
  placeholder?: string
  min?: number
  max?: number
}

export const blockDefinitions: Record<BlockType, BlockDefinition> = {
  hero: {
    type: "hero",
    name: "Hero Section",
    icon: "🎯",
    description: "Large banner with title, subtitle, and call-to-action",
    defaultProps: {
      title: "Welcome to Our Website",
      subtitle: "Your Success Starts Here",
      description: "Create amazing experiences with our powerful platform",
      buttonText: "Get Started",
      buttonLink: "#",
      backgroundImage: "",
      backgroundColor: "#0066FF",
      textColor: "#FFFFFF",
      alignment: "center",
    },
    properties: [
      { key: "title", label: "Title", type: "text", placeholder: "Enter hero title" },
      { key: "subtitle", label: "Subtitle", type: "text", placeholder: "Enter subtitle" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Enter description" },
      { key: "buttonText", label: "Button Text", type: "text", placeholder: "Button text" },
      { key: "buttonLink", label: "Button Link", type: "url", placeholder: "https://example.com" },
      { key: "backgroundImage", label: "Background Image", type: "image" },
      { key: "backgroundColor", label: "Background Color", type: "color" },
      { key: "textColor", label: "Text Color", type: "color" },
      {
        key: "alignment",
        label: "Text Alignment",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ],
      },
    ],
  },
  text: {
    type: "text",
    name: "Text Block",
    icon: "📝",
    description: "Rich text content with formatting options",
    defaultProps: {
      content:
        "<p>Add your text content here. You can use <strong>bold</strong>, <em>italic</em>, and other formatting.</p>",
      fontSize: 16,
      textColor: "#333333",
      textAlign: "left",
      maxWidth: "100%",
    },
    properties: [
      { key: "content", label: "Content", type: "textarea", placeholder: "Enter your text content" },
      { key: "fontSize", label: "Font Size", type: "number", min: 12, max: 72 },
      { key: "textColor", label: "Text Color", type: "color" },
      {
        key: "textAlign",
        label: "Text Alignment",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
          { value: "justify", label: "Justify" },
        ],
      },
    ],
  },
  button: {
    type: "button",
    name: "Button",
    icon: "🔘",
    description: "Call-to-action button with customizable styling",
    defaultProps: {
      text: "Click Me",
      link: "#",
      backgroundColor: "#0066FF",
      textColor: "#FFFFFF",
      borderRadius: 8,
      padding: "12px 24px",
      fontSize: 16,
      alignment: "left",
      variant: "solid",
    },
    properties: [
      { key: "text", label: "Button Text", type: "text", placeholder: "Button text" },
      { key: "link", label: "Link URL", type: "url", placeholder: "https://example.com" },
      { key: "backgroundColor", label: "Background Color", type: "color" },
      { key: "textColor", label: "Text Color", type: "color" },
      { key: "borderRadius", label: "Border Radius", type: "number", min: 0, max: 50 },
      { key: "fontSize", label: "Font Size", type: "number", min: 12, max: 24 },
      {
        key: "variant",
        label: "Style",
        type: "select",
        options: [
          { value: "solid", label: "Solid" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
        ],
      },
      {
        key: "alignment",
        label: "Alignment",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ],
      },
    ],
  },
  image: {
    type: "image",
    name: "Image",
    icon: "🖼️",
    description: "Image with caption and styling options",
    defaultProps: {
      src: "/placeholder.svg?height=300&width=600",
      alt: "Image description",
      caption: "",
      width: "100%",
      borderRadius: 8,
      alignment: "center",
    },
    properties: [
      { key: "src", label: "Image URL", type: "image" },
      { key: "alt", label: "Alt Text", type: "text", placeholder: "Describe the image" },
      { key: "caption", label: "Caption", type: "text", placeholder: "Optional caption" },
      { key: "borderRadius", label: "Border Radius", type: "number", min: 0, max: 50 },
      {
        key: "alignment",
        label: "Alignment",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
          { value: "right", label: "Right" },
        ],
      },
    ],
  },
  form: {
    type: "form",
    name: "Contact Form",
    icon: "📋",
    description: "Contact form with customizable fields",
    defaultProps: {
      title: "Contact Us",
      description: "Get in touch with us",
      fields: [
        { type: "text", name: "name", label: "Name", required: true },
        { type: "email", name: "email", label: "Email", required: true },
        { type: "textarea", name: "message", label: "Message", required: true },
      ],
      buttonText: "Send Message",
      backgroundColor: "#FFFFFF",
      borderColor: "#E5E7EB",
    },
    properties: [
      { key: "title", label: "Form Title", type: "text", placeholder: "Contact Us" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Form description" },
      { key: "buttonText", label: "Submit Button Text", type: "text", placeholder: "Send Message" },
      { key: "backgroundColor", label: "Background Color", type: "color" },
      { key: "borderColor", label: "Border Color", type: "color" },
    ],
  },
  spacer: {
    type: "spacer",
    name: "Spacer",
    icon: "📏",
    description: "Add vertical spacing between sections",
    defaultProps: {
      height: 60,
      backgroundColor: "transparent",
    },
    properties: [
      { key: "height", label: "Height (px)", type: "number", min: 10, max: 200 },
      { key: "backgroundColor", label: "Background Color", type: "color" },
    ],
  },
}
