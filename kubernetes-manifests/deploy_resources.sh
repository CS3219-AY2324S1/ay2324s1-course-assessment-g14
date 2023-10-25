#!/bin/bash

# Notify user
echo "Deploying to kubernetes.."

# List of YAML files to deploy
yaml_files=(
    "api-gateway-deployment.yaml"
    "api-gateway-service.yaml"	
    "question-service-deployment.yaml"
    "question-service-service.yaml"
    "auth-service-deployment.yaml"
    "auth-service-service.yaml"	
    "user-service-deployment.yaml"
    "user-service-service.yaml"
    "matching-service-deployment.yaml"
    "matching-service-service.yaml"
    "chat-service-deployment.yaml"
    "chat-service-service.yaml"
    )

# Namespace where you want to deploy the resources
namespace="default"

# Iterate over the list of YAML files and deploy them
for file in "${yaml_files[@]}"; do
  kubectl apply -f "$file" -n "$namespace"
  # You can add error handling or additional logic here if needed
done

# Notify user
echo "All services have been deployed..."

# Wait for all background processes to finish
wait


