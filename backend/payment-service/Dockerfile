# Payment Service Dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY src/ ./src/
COPY . .
EXPOSE 5005
CMD ["node", "src/app.js"]
