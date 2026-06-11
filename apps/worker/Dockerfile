FROM node:20-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && pnpm install --prod --ignore-scripts || true
COPY . .
CMD ["node", "src/index.ts"]
