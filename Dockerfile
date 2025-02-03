# Stage 1: Building the Svelte Node app

# Start from the official Node.js 20 image based on Alpine Linux
FROM node:20-alpine3.19 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json gsap-bonus.tgz ./

# Install production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Copy the source code to the working directory
COPY . .

# Build the Svelte Node app
RUN npm run build

# Stage 2: Running the Svelte Node app

# Start from the official Node.js 20 image based on Alpine Linux
FROM node:20-alpine3.19

# Set the working directory to /app
WORKDIR /app

# Copy the build artifacts and node_modules directory from the builder stage
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Expose port 3000 for the Svelte Node app
EXPOSE 3200

# Run the Svelte Node app with strict mode and no lazy loading
ENTRYPOINT [ "node", "--no-lazy", "--use-strict", "build/index.js" ]
