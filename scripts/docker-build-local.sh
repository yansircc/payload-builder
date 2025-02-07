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

echo "🔨 Building Docker image locally..."

# Build Docker image (no push)
docker build \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  -t ${IMAGE_NAME}:${IMAGE_TAG} \
  .

# Check build result
if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo "📦 Image: ${IMAGE_NAME}:${IMAGE_TAG}"
else
  echo "❌ Build failed!"
  exit 1
fi 