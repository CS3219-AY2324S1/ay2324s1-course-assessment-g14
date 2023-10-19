# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/frontend

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy all app files to the container
COPY . .

# Build the React app
RUN npm run build

# Expose a port (usually 3000) that the app will listen on
EXPOSE 3000

# Define the command to run your app (e.g., the development server)
CMD [ "npm", "start" ]
