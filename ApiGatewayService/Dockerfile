# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/api-gateway

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Expose the port on which your API gateway will run
EXPOSE 3001

# Define the command to start your API gateway
CMD [ "npm", "run", "dev"]