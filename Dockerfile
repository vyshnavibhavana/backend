# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application's source code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to start the app
CMD ["nodemon", "index.js"]
