# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/matching-service

# Copy package.json and package-lock.json to the working directory
COPY package.json ./

# Install app dependencies
RUN npm install

# Bundle your app source code into the container
COPY . .

# Expose the port on which your Auth service will run
EXPOSE 3005

# Define the command to start your Auth service
CMD [ "npm", "run", "dev"]