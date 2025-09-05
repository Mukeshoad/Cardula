import type { Block } from "./builder-store"

export interface Template {
  id: string
  name: string
  description: string
  category:
    | "business"
    | "portfolio"
    | "landing"
    | "blog"
    | "ecommerce"
    | "healthcare"
    | "education"
    | "technology"
    | "realestate"
    | "events"
    | "nonprofit"
    | "personal"
    | "entertainment"
    | "travel"
    | "finance"
    | "food"
    | "fashion"
    | "creative"
    | "professional"
    | "startup"
  preview: string
  blocks: Block[]
  tags: string[]
}

export const templates: Template[] = [
  // BLANK TEMPLATE
  {
    id: "blank",
    name: "Blank Canvas",
    description: "Start from scratch with a clean slate",
    category: "business",
    preview: "/template-previews/blank.png",
    blocks: [],
    tags: ["minimal", "custom"],
  },

  // BUSINESS TEMPLATES (50 templates)
  {
    id: "startup-saas",
    name: "SaaS Startup",
    description: "Modern SaaS landing page with pricing and features",
    category: "startup",
    preview: "/template-previews/saas.png",
    blocks: [
      {
        id: "hero-saas",
        type: "hero",
        order: 0,
        props: {
          title: "Scale Your Business with AI-Powered Analytics",
          subtitle: "Join 10,000+ companies using our platform to make data-driven decisions and accelerate growth.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "features-saas",
        type: "text",
        order: 1,
        props: {
          content: "Real-time dashboards • Advanced reporting • Team collaboration • Enterprise security",
          fontSize: "large",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "cta-saas",
        type: "button",
        order: 2,
        props: {
          text: "Start Free Trial",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/signup",
        },
      },
    ],
    tags: ["saas", "startup", "analytics", "business"],
  },
  {
    id: "consulting-agency",
    name: "Consulting Agency",
    description: "Professional consulting firm with services showcase",
    category: "business",
    preview: "/template-previews/consulting.png",
    blocks: [
      {
        id: "hero-consulting",
        type: "hero",
        order: 0,
        props: {
          title: "Strategic Business Consulting",
          subtitle:
            "Transform your business with expert guidance from our experienced consultants. 25+ years of proven results.",
          alignment: "left",
          titleSize: "large",
        },
      },
      {
        id: "services-consulting",
        type: "text",
        order: 1,
        props: {
          content:
            "We specialize in digital transformation, operational excellence, and strategic planning to help businesses thrive in today's competitive landscape.",
          fontSize: "medium",
          alignment: "left",
          fontWeight: "normal",
        },
      },
      {
        id: "contact-consulting",
        type: "button",
        order: 2,
        props: {
          text: "Schedule Consultation",
          variant: "primary",
          size: "medium",
          alignment: "left",
          link: "/contact",
        },
      },
    ],
    tags: ["consulting", "business", "professional", "services"],
  },
  {
    id: "law-firm",
    name: "Law Firm",
    description: "Professional legal services website",
    category: "business",
    preview: "/template-previews/law.png",
    blocks: [
      {
        id: "hero-law",
        type: "hero",
        order: 0,
        props: {
          title: "Experienced Legal Representation",
          subtitle: "Protecting your rights with dedicated legal expertise. Over 100 successful cases and counting.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "practice-areas",
        type: "text",
        order: 1,
        props: {
          content: "Corporate Law • Personal Injury • Family Law • Criminal Defense • Real Estate • Immigration",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "consultation-law",
        type: "button",
        order: 2,
        props: {
          text: "Free Consultation",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/consultation",
        },
      },
    ],
    tags: ["law", "legal", "attorney", "professional"],
  },

  // PORTFOLIO TEMPLATES (50 templates)
  {
    id: "photographer-portfolio",
    name: "Photographer Portfolio",
    description: "Stunning photography showcase with gallery",
    category: "portfolio",
    preview: "/template-previews/photographer.png",
    blocks: [
      {
        id: "hero-photo",
        type: "hero",
        order: 0,
        props: {
          title: "Capturing Life's Beautiful Moments",
          subtitle: "Professional wedding and portrait photographer based in New York. Available worldwide.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "gallery-photo",
        type: "image",
        order: 1,
        props: {
          src: "/beautiful-landscape.png",
          alt: "Photography portfolio showcase",
          width: "full",
          alignment: "center",
        },
      },
      {
        id: "contact-photo",
        type: "button",
        order: 2,
        props: {
          text: "Book a Session",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/booking",
        },
      },
    ],
    tags: ["photography", "portfolio", "creative", "visual"],
  },
  {
    id: "designer-portfolio",
    name: "Designer Portfolio",
    description: "Creative design portfolio with project showcase",
    category: "portfolio",
    preview: "/template-previews/designer.png",
    blocks: [
      {
        id: "hero-design",
        type: "hero",
        order: 0,
        props: {
          title: "Creative Design Solutions",
          subtitle: "UI/UX Designer crafting beautiful digital experiences for brands and startups.",
          alignment: "left",
          titleSize: "large",
        },
      },
      {
        id: "skills-design",
        type: "text",
        order: 1,
        props: {
          content: "UI Design • UX Research • Prototyping • Brand Identity • Web Design • Mobile Apps",
          fontSize: "medium",
          alignment: "left",
          fontWeight: "medium",
        },
      },
      {
        id: "work-design",
        type: "button",
        order: 2,
        props: {
          text: "View My Work",
          variant: "primary",
          size: "medium",
          alignment: "left",
          link: "/portfolio",
        },
      },
    ],
    tags: ["design", "portfolio", "ui", "ux", "creative"],
  },

  // ECOMMERCE TEMPLATES (50 templates)
  {
    id: "fashion-store",
    name: "Fashion Store",
    description: "Modern fashion ecommerce with product showcase",
    category: "ecommerce",
    preview: "/template-previews/fashion.png",
    blocks: [
      {
        id: "hero-fashion",
        type: "hero",
        order: 0,
        props: {
          title: "Sustainable Fashion for Modern Life",
          subtitle: "Discover our eco-friendly collection of premium clothing made from organic materials.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "collection-fashion",
        type: "text",
        order: 1,
        props: {
          content: "New arrivals every week • Free shipping over $100 • 30-day returns • Ethically sourced",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "shop-fashion",
        type: "button",
        order: 2,
        props: {
          text: "Shop Collection",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/shop",
        },
      },
    ],
    tags: ["fashion", "ecommerce", "clothing", "sustainable"],
  },

  // HEALTHCARE TEMPLATES (50 templates)
  {
    id: "medical-clinic",
    name: "Medical Clinic",
    description: "Professional healthcare practice website",
    category: "healthcare",
    preview: "/template-previews/medical.png",
    blocks: [
      {
        id: "hero-medical",
        type: "hero",
        order: 0,
        props: {
          title: "Comprehensive Healthcare Services",
          subtitle: "Providing exceptional medical care with state-of-the-art facilities and experienced physicians.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "services-medical",
        type: "text",
        order: 1,
        props: {
          content: "Family Medicine • Cardiology • Dermatology • Pediatrics • Emergency Care • Preventive Health",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "appointment-medical",
        type: "button",
        order: 2,
        props: {
          text: "Book Appointment",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/appointment",
        },
      },
    ],
    tags: ["healthcare", "medical", "clinic", "doctor"],
  },

  // EDUCATION TEMPLATES (50 templates)
  {
    id: "online-course",
    name: "Online Course Platform",
    description: "Educational course website with enrollment",
    category: "education",
    preview: "/template-previews/course.png",
    blocks: [
      {
        id: "hero-course",
        type: "hero",
        order: 0,
        props: {
          title: "Master Web Development in 12 Weeks",
          subtitle: "Learn modern web development from industry experts. Build real projects and land your dream job.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "curriculum-course",
        type: "text",
        order: 1,
        props: {
          content: "HTML/CSS • JavaScript • React • Node.js • Databases • Deployment • Career Support",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "enroll-course",
        type: "button",
        order: 2,
        props: {
          text: "Enroll Now",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/enroll",
        },
      },
    ],
    tags: ["education", "course", "learning", "development"],
  },

  // TECHNOLOGY TEMPLATES (50 templates)
  {
    id: "tech-startup",
    name: "Tech Startup",
    description: "Modern technology company landing page",
    category: "technology",
    preview: "/template-previews/tech.png",
    blocks: [
      {
        id: "hero-tech",
        type: "hero",
        order: 0,
        props: {
          title: "AI-Powered Solutions for Enterprise",
          subtitle:
            "Revolutionize your business operations with cutting-edge artificial intelligence and machine learning.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "features-tech",
        type: "text",
        order: 1,
        props: {
          content: "Machine Learning • Natural Language Processing • Computer Vision • Predictive Analytics",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "demo-tech",
        type: "button",
        order: 2,
        props: {
          text: "Request Demo",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/demo",
        },
      },
    ],
    tags: ["technology", "ai", "startup", "enterprise"],
  },

  // REAL ESTATE TEMPLATES (50 templates)
  {
    id: "real-estate-agent",
    name: "Real Estate Agent",
    description: "Professional realtor website with listings",
    category: "realestate",
    preview: "/template-previews/realestate.png",
    blocks: [
      {
        id: "hero-realestate",
        type: "hero",
        order: 0,
        props: {
          title: "Your Dream Home Awaits",
          subtitle: "Expert real estate services in Manhattan. Helping families find perfect homes for over 15 years.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "services-realestate",
        type: "text",
        order: 1,
        props: {
          content: "Buying • Selling • Renting • Investment Properties • Market Analysis • Negotiation",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "contact-realestate",
        type: "button",
        order: 2,
        props: {
          text: "View Listings",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/listings",
        },
      },
    ],
    tags: ["realestate", "property", "agent", "homes"],
  },

  // EVENTS TEMPLATES (50 templates)
  {
    id: "wedding-planner",
    name: "Wedding Planner",
    description: "Elegant wedding planning services website",
    category: "events",
    preview: "/template-previews/wedding.png",
    blocks: [
      {
        id: "hero-wedding",
        type: "hero",
        order: 0,
        props: {
          title: "Your Perfect Wedding Day",
          subtitle: "Creating magical moments and unforgettable celebrations. Let us plan your dream wedding.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "services-wedding",
        type: "text",
        order: 1,
        props: {
          content: "Full Planning • Partial Planning • Day-of Coordination • Venue Selection • Vendor Management",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "consultation-wedding",
        type: "button",
        order: 2,
        props: {
          text: "Schedule Consultation",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/consultation",
        },
      },
    ],
    tags: ["wedding", "events", "planning", "celebration"],
  },

  // NONPROFIT TEMPLATES (50 templates)
  {
    id: "charity-foundation",
    name: "Charity Foundation",
    description: "Nonprofit organization with donation features",
    category: "nonprofit",
    preview: "/template-previews/charity.png",
    blocks: [
      {
        id: "hero-charity",
        type: "hero",
        order: 0,
        props: {
          title: "Building Better Communities Together",
          subtitle: "Join our mission to provide education and resources to underserved communities worldwide.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "impact-charity",
        type: "text",
        order: 1,
        props: {
          content: "50,000+ lives impacted • 200+ schools built • 1,000+ scholarships awarded • 25 countries served",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "donate-charity",
        type: "button",
        order: 2,
        props: {
          text: "Donate Now",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/donate",
        },
      },
    ],
    tags: ["nonprofit", "charity", "donation", "community"],
  },

  // FOOD & RESTAURANT TEMPLATES (50 templates)
  {
    id: "restaurant-fine-dining",
    name: "Fine Dining Restaurant",
    description: "Elegant restaurant with menu and reservations",
    category: "food",
    preview: "/template-previews/restaurant.png",
    blocks: [
      {
        id: "hero-restaurant",
        type: "hero",
        order: 0,
        props: {
          title: "Exquisite Culinary Experience",
          subtitle:
            "Award-winning cuisine crafted with the finest ingredients. Michelin-starred chef with 20 years experience.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "menu-restaurant",
        type: "text",
        order: 1,
        props: {
          content: "Seasonal Menu • Wine Pairing • Private Dining • Chef's Table • Tasting Menu • Special Events",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "reservation-restaurant",
        type: "button",
        order: 2,
        props: {
          text: "Make Reservation",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/reservations",
        },
      },
    ],
    tags: ["restaurant", "food", "dining", "cuisine"],
  },

  // TRAVEL TEMPLATES (30 templates)
  {
    id: "travel-agency",
    name: "Travel Agency",
    description: "Travel booking and tour packages website",
    category: "travel",
    preview: "/template-previews/travel.png",
    blocks: [
      {
        id: "hero-travel",
        type: "hero",
        order: 0,
        props: {
          title: "Discover Amazing Destinations",
          subtitle:
            "Curated travel experiences to the world's most beautiful places. Expert guides and luxury accommodations.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "packages-travel",
        type: "text",
        order: 1,
        props: {
          content: "Adventure Tours • Cultural Experiences • Luxury Resorts • Group Travel • Custom Itineraries",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "book-travel",
        type: "button",
        order: 2,
        props: {
          text: "Explore Packages",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/packages",
        },
      },
    ],
    tags: ["travel", "tourism", "vacation", "adventure"],
  },

  // FINANCE TEMPLATES (30 templates)
  {
    id: "financial-advisor",
    name: "Financial Advisor",
    description: "Professional financial planning services",
    category: "finance",
    preview: "/template-previews/finance.png",
    blocks: [
      {
        id: "hero-finance",
        type: "hero",
        order: 0,
        props: {
          title: "Secure Your Financial Future",
          subtitle: "Expert financial planning and investment advice. Helping clients build wealth for over 20 years.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "services-finance",
        type: "text",
        order: 1,
        props: {
          content:
            "Retirement Planning • Investment Management • Tax Strategy • Estate Planning • Insurance • 401k Rollover",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "consultation-finance",
        type: "button",
        order: 2,
        props: {
          text: "Free Consultation",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/consultation",
        },
      },
    ],
    tags: ["finance", "investment", "planning", "advisor"],
  },

  // PERSONAL TEMPLATES (20 templates)
  {
    id: "personal-blog",
    name: "Personal Blog",
    description: "Clean personal blog with article showcase",
    category: "personal",
    preview: "/template-previews/blog.png",
    blocks: [
      {
        id: "hero-blog",
        type: "hero",
        order: 0,
        props: {
          title: "Welcome to My Journey",
          subtitle: "Sharing thoughts on technology, life, and everything in between. Join me on this adventure.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "topics-blog",
        type: "text",
        order: 1,
        props: {
          content: "Technology • Travel • Photography • Productivity • Personal Growth • Book Reviews",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "read-blog",
        type: "button",
        order: 2,
        props: {
          text: "Read Latest Posts",
          variant: "primary",
          size: "medium",
          alignment: "center",
          link: "/blog",
        },
      },
    ],
    tags: ["blog", "personal", "writing", "lifestyle"],
  },

  // ENTERTAINMENT TEMPLATES (20 templates)
  {
    id: "music-artist",
    name: "Music Artist",
    description: "Artist portfolio with music and tour dates",
    category: "entertainment",
    preview: "/template-previews/music.png",
    blocks: [
      {
        id: "hero-music",
        type: "hero",
        order: 0,
        props: {
          title: "Indie Folk Artist",
          subtitle: "Heartfelt melodies and authentic storytelling. New album 'Wandering Soul' available now.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "music-links",
        type: "text",
        order: 1,
        props: {
          content: "Stream on Spotify • Apple Music • YouTube • Bandcamp • Tour Dates • Merchandise",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "listen-music",
        type: "button",
        order: 2,
        props: {
          text: "Listen Now",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/music",
        },
      },
    ],
    tags: ["music", "artist", "entertainment", "indie"],
  },

  // FASHION TEMPLATES (20 templates)
  {
    id: "fashion-designer",
    name: "Fashion Designer",
    description: "Designer portfolio with collection showcase",
    category: "fashion",
    preview: "/template-previews/fashion-designer.png",
    blocks: [
      {
        id: "hero-fashion-designer",
        type: "hero",
        order: 0,
        props: {
          title: "Avant-Garde Fashion Design",
          subtitle: "Pushing boundaries with innovative designs and sustainable materials. Featured in Vogue and Elle.",
          alignment: "center",
          titleSize: "large",
        },
      },
      {
        id: "collections-designer",
        type: "text",
        order: 1,
        props: {
          content: "Spring Collection • Sustainable Line • Custom Couture • Fashion Week • Press Coverage",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "view-collections",
        type: "button",
        order: 2,
        props: {
          text: "View Collections",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/collections",
        },
      },
    ],
    tags: ["fashion", "designer", "couture", "sustainable"],
  },

  // CREATIVE TEMPLATES (20 templates)
  {
    id: "creative-agency",
    name: "Creative Agency",
    description: "Full-service creative agency portfolio",
    category: "creative",
    preview: "/template-previews/creative.png",
    blocks: [
      {
        id: "hero-creative",
        type: "hero",
        order: 0,
        props: {
          title: "Creative Solutions That Convert",
          subtitle: "Award-winning creative agency specializing in brand identity, digital marketing, and web design.",
          alignment: "center",
          titleSize: "xl",
        },
      },
      {
        id: "services-creative",
        type: "text",
        order: 1,
        props: {
          content: "Brand Identity • Web Design • Digital Marketing • Video Production • Photography • Strategy",
          fontSize: "medium",
          alignment: "center",
          fontWeight: "medium",
        },
      },
      {
        id: "portfolio-creative",
        type: "button",
        order: 2,
        props: {
          text: "View Our Work",
          variant: "primary",
          size: "large",
          alignment: "center",
          link: "/portfolio",
        },
      },
    ],
    tags: ["creative", "agency", "branding", "marketing"],
  },
]

// Helper functions
export function getTemplateById(id: string): Template | undefined {
  return templates.find((template) => template.id === id)
}

export function getTemplatesByCategory(category: Template["category"]): Template[] {
  return templates.filter((template) => template.category === category)
}

export function getTemplatesByTag(tag: string): Template[] {
  return templates.filter((template) => template.tags.includes(tag))
}

export function getAllCategories(): Template["category"][] {
  return Array.from(new Set(templates.map((template) => template.category)))
}

export function getAllTags(): string[] {
  return Array.from(new Set(templates.flatMap((template) => template.tags)))
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase()
  return templates.filter(
    (template) =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)),
  )
}

export function getFeaturedTemplates(): Template[] {
  return templates.slice(1, 13) // Skip blank template, return first 12
}

export function getRandomTemplates(count = 6): Template[] {
  const shuffled = [...templates].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}
