# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install -g @nestjs/cli && npm install --production

# Copy the Prisma schema and generate the Prisma client
COPY prisma ./prisma/

RUN npx prisma generate

# Copy the entire application code to the container
COPY . .

# Build the application
RUN nest build

# Expose the port the app runs on
EXPOSE 3000

# Run the application
CMD ["npm","run","start:prod"]
