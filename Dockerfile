FROM node:16-slim

USER root
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    xvfb \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

CMD ["xvfb-run", "--auto-servernum", "--server-args=-screen 0 1024x768x24", "node", "server.js"]
