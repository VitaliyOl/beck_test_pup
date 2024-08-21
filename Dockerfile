# Use the official Node.js image as the base
FROM node:20-bullseye-slim

# Install necessary dependencies for Puppeteer
RUN apt-get update && apt-get install -y wget gnupg \
    && apt-get install -y --no-install-recommends \
    ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk1.0-0 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libxcomposite1 libxdamage1 libxrandr2 xdg-utils

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies, including Puppeteer
RUN npm install

# Copy the remaining project files
COPY . .

# Expose the port your application runs on
EXPOSE 10000

# Run the application
CMD ["node", "server.js"]
