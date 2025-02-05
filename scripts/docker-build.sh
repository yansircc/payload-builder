#!/bin/bash

# 从 .env 文件加载环境变量
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# 构建 Docker 镜像
docker build \
  --build-arg DATABASE_URL="${DATABASE_URL}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  -t your-app-name . 