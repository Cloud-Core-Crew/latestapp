# Build stage
FROM node:18-slim AS builder
WORKDIR /app
COPY package.json ./
RUN corepack enable && yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Production stage
FROM node:18-slim AS production
WORKDIR /app
RUN corepack enable && yarn global add serve
COPY --from=builder /app/dist ./dist
EXPOSE 5180
CMD ["serve", "-s", "dist", "-l", "5180"]
