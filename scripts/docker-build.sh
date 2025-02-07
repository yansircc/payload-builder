#!/bin/bash

# Use .env.docker if it exists, otherwise use .env
if [ -f .env.docker ]; then
  echo "📝 Using .env.docker for build..."
  export $(cat .env.docker | grep -v '^#' | xargs)
elif [ -f .env ]; then
  echo "⚠️ .env.docker not found, using .env instead..."
  export $(cat .env | grep -v '^#' | xargs)
else
  echo "❌ No environment file found!"
  exit 1
fi

# Set image name and tag
IMAGE_NAME="yansircc/payload-builder"
IMAGE_TAG="latest"

echo "🔨 Building Docker image for linux/amd64..."

# Check if buildx is installed
if ! docker buildx version > /dev/null 2>&1; then
  echo "❌ Docker buildx not found!"
  echo "👉 Please use 'bun run docker:build:local' instead, or install buildx first"
  exit 1
fi

# Build and push Docker image
docker buildx build \
  --platform linux/amd64 \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  -t ${IMAGE_NAME}:${IMAGE_TAG} \
  . --push

# Check build result
if [ $? -eq 0 ]; then
  echo "✅ Build and push successful!"
  echo "📦 Image: ${IMAGE_NAME}:${IMAGE_TAG}"
else
  echo "❌ Build or push failed!"
  exit 1
fi 