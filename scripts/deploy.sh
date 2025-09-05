#!/bin/bash

# Deployment script for production
set -e

echo "🚀 Starting deployment..."

# Build and push Docker images
echo "📦 Building Docker images..."
docker-compose -f docker-compose.prod.yml build

# Run database migrations
echo "🗄️ Running database migrations..."
docker-compose -f docker-compose.prod.yml run --rm backend npx prisma migrate deploy

# Start services
echo "🔄 Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 30

# Run health checks
echo "🏥 Running health checks..."
curl -f http://localhost/health || exit 1
curl -f http://localhost/api/health || exit 1

echo "✅ Deployment completed successfully!"
