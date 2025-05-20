FROM node:22-slim

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm install --production
RUN cat /app/.env || echo "No .env file"

EXPOSE 5000
CMD ["node","server.js"]

