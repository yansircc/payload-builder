# To use this Dockerfile, you have to set `output: 'standalone'` in your next.config.js file.
# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# 使用 Bun 的基础镜像
FROM oven/bun:1 AS base

# 安装依赖阶段
FROM base AS deps
WORKDIR /app

# 复制 package.json 和 lockfile
COPY package.json bun.lockb ./

# 安装依赖，禁用 husky
ENV HUSKY=0
RUN bun install --frozen-lockfile --no-progress

# 构建阶段
FROM base AS builder
WORKDIR /app

# 定义构建参数
ARG DATABASE_URL
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG CRON_SECRET

# 复制依赖
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 设置构建时环境变量
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
# 使用构建参数
ENV DATABASE_URL=${DATABASE_URL}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV CRON_SECRET=${CRON_SECRET}

# 构建应用
RUN bun run build

# 生产阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV HUSKY=0
ENV NEXT_TELEMETRY_DISABLED 1

# 添加非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制公共文件
COPY --from=builder /app/public ./public

# 设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 复制构建输出
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 启动应用
CMD ["bun", "server.js"]
