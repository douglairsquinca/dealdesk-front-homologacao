# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app
COPY package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the application code into the working directory
COPY . .

# Build the application for production
RUN npm run build

# Start the Nginx server
CMD ["npm" , "run", "serve"]

# Expose port 80 for the Nginx server
EXPOSE 8081

