# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

# Set the entry point command to run the app
CMD ["node", "index.js"]
