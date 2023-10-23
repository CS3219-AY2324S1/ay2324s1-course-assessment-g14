#!/bin/bash

# Function to start an Express service
start_service() {
    service_name=$1
    command=$2
    echo "Starting $service_name..."
    (cd $service_name && $command &)
}

# Start all Express backend services
start_service ApiGatewayService "npm run dev"
start_service AuthService "npm run dev"
start_service ChatService "npm run dev"
start_service MatchingService "npm run dev"
start_service QuestionService "npm run dev"
start_service UserService "npm run dev"

# Start the frontend service
start_service frontend "npm start"

# Notify user
echo "All services are now running..."

# Wait for all background processes to finish
wait