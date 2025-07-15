# Auth Service Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY .env .env
COPY . .
EXPOSE 5001
CMD ["node", "src/app.js"]
