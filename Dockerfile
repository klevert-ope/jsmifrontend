# Stage 1: Building the Svelte Node app

# Start from the official Node.js 20 image based on Alpine Linux
FROM node:23-alpine3.19 AS builder

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json gsap-bonus.tgz ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy the source code to the working directory
COPY . .

# Build the Svelte Node app and minify CSS
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev

# Stage 2: Running the Svelte Node app

# Start from the official Node.js 23 image based on Alpine Linux
FROM node:23-alpine3.19

# Set the working directory to /app
WORKDIR /app

# Copy the build artifacts and node_modules directory from the builder stage
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Expose port 3000 for the Svelte Node app
EXPOSE 3000

# Run the Svelte Node app with strict mode and no lazy loading
CMD [ "node", "--no-lazy", "--use-strict", "build" ]
