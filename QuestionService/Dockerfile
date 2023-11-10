# Use an official Node.js runtime as a parent image
FROM node:bookworm-slim

# Set the working directory in the container
WORKDIR /usr/src/question-service

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Expose the port on which your Question service will run
# EXPOSE 3002

# Define the command to start your Question service
CMD [ "npm", "run", "dev"]