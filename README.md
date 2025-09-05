# Website Builder - Carrd.co Style

A production-ready, full-stack website builder with drag-and-drop editor, template gallery, and custom domain publishing.

## 🚀 Features

- **Template Gallery**: Responsive masonry layout with lazy-loaded thumbnails
- **Block-Based Editor**: Drag-and-drop interface with live preview
- **Publishing**: Static site generation with subdomain and custom domain support
- **Authentication**: JWT-based auth with bcrypt password hashing
- **File Upload**: S3-compatible storage with image optimization
- **Domain Management**: Custom domain verification and SSL provisioning
- **Queue System**: Bull + Redis for background publishing jobs

## 🏗️ Architecture

\`\`\`
website-builder/
├── frontend/          # Next.js 14 App Router
├── backend/           # Express + TypeScript API
├── docker-compose.dev.yml
└── README.md
\`\`\`

## 🛠️ Local Development Setup

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone and Install

\`\`\`bash
git clone <repository-url>
cd website-builder
npm install
\`\`\`

### 2. Environment Setup

\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### 3. Start Development Services

\`\`\`bash
# Start PostgreSQL, Redis, and MinIO
npm run docker:dev

# Run database migrations
npm run db:migrate

# Seed the database with templates
npm run db:seed

# Start both frontend and backend
npm run dev
\`\`\`

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- MinIO Console: http://localhost:9001 (minioadmin/minioadmin)

## 📦 Production Deployment

### Frontend (Vercel)

\`\`\`bash
cd frontend
vercel --prod
\`\`\`

### Backend (Render/DigitalOcean)

\`\`\`bash
cd backend
docker build -t website-builder-backend .
# Deploy to your preferred platform
\`\`\`

### Environment Variables

Required for production:

\`\`\`env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-key
REDIS_URL=redis://host:6379
S3_ENDPOINT=https://your-region.digitaloceanspaces.com
S3_BUCKET=your-bucket
S3_ACCESS_KEY=your-key
S3_SECRET_KEY=your-secret
CLOUDFLARE_API_TOKEN=your-token (optional)
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
npm run test

# Frontend tests
npm run test:frontend

# Backend tests
npm run test:backend
\`\`\`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### Templates
- `GET /api/templates` - List all templates
- `GET /api/templates/:id` - Get template details
- `POST /api/templates/seed` - Seed templates (admin)

### Projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `POST /api/projects/:id/publish` - Publish project

### File Upload
- `POST /api/uploads/image` - Upload image

### Domains
- `POST /api/domains` - Add custom domain
- `GET /api/domains/:id/status` - Check domain status

## 🎨 Design System

- **Primary Color**: #0066FF
- **Hover Color**: #0052D4
- **Accent Color**: #00C2A8
- **Background**: #F7FAFC
- **Surface**: #FFFFFF
- **Text**: #0B1324
- **Font**: Inter Variable
- **Border Radius**: 14px (2xl)
- **Card Shadow**: 0 6px 18px rgba(11,19,36,0.06)

## 🔧 Development Commands

\`\`\`bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run docker:dev       # Start development services
npm run docker:down      # Stop development services
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed database with templates
\`\`\`

## 📝 License

MIT License - see LICENSE file for details
