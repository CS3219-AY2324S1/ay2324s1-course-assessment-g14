# Google Kubernetes Engine (GKE) Deployment
This folder includes the config files for deploying PeerPrep onto GKE environment.

## Contents
- [Google Kubernetes Engine (GKE) Deployment](#google-kubernetes-engine-gke-deployment)
  - [Contents](#contents)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
    - [Step 1: Prepare the Docker images](#step-1-prepare-the-docker-images)
    - [Step 2: Create the GKE Cluster](#step-2-create-the-gke-cluster)
    - [Step 3: Create the namespace](#step-3-create-the-namespace)
    - [Step 4: Create the main services](#step-4-create-the-main-services)
    - [Step 5: Add the Horizontal Pod Autoscaler (HPA)](#step-5-add-the-horizontal-pod-autoscaler-hpa)
    - [Step 6: Updating the ConfigMap](#step-6-updating-the-configmap)
    - [Step 7: Access PeerPrep](#step-7-access-peerprep)
  - [Helpful Resources](#helpful-resources)

## Requirements
Before starting the deployment, you must install and configure the following tools to create and manage an GKE cluster.

* **`kubectl`** – A command line tool for working with GKE clusters. [Guide](https://cloud.google.com/kubernetes-engine/docs/how-to/cluster-access-for-kubectl)

* **`gcloud`** – A command line tool for managing Google Cloud resources, including GKE clusters. [Guide](https://cloud.google.com/sdk/docs/install)

You should also have a Google Cloud account and be able to use the Google Cloud Console.

## Getting Started
### Step 1: Prepare the Docker images
1. Publish your prepared docker images on the Docker registry.
   
   You can use the `docker-compose.yml` in this folder to build the images, just change the target images.
2. Update the docker images to be used for the main services in each `deployment.yaml`. 
   
   By default, it will be using our prepared images located in `szelongq/peerprep-<SERVICE_NAME>:latest`.

### Step 2: Create the GKE Cluster
1. From the Google Cloud Console, choose or create a new project
2. Enable Kubernetes Engine API for your project
3. Create an Autopilot cluster using the Google Cloud Console (Refer to: [creating-an-auto-pilot-cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-an-autopilot-cluster)). The Autopilot cluster helps us to manage vertical scaling of resources for us automatically.
4. Open up your Terminal and login to the glcloud CLI
    ``` bash
    gcloud auth login
    ```
5. Set the project you will be working on
    ``` bash
    gcloud config set project PROJECT_ID
    ```
6. Get authentication credentials and configure kubectl to interact with your cluster
    ``` bash
    gcloud container clusters get-credentials CLUSTER_NAME
    ```

### Step 3: Create the namespace
1. Navigate to the `k8s` folder in the cloned repository
2. Create the `peerprep` namespace
    ```bash
    kubectl apply -f 01-Namespace/.
    ```

### Step 4: Create the main services
1. Deploy the services and their endpoints
    ```bash
    kubectl apply -f 02-Services/.
    ```
2. Check that the deployments and services are visible from the console, or run the following commands:
    ```bash
    kubectl get deploy
    kubectl get services
    ```
    There should be 7 deployments and services in total. They might take some time to start up and become available.

### Step 5: Add the Horizontal Pod Autoscaler (HPA)
1. Create the HPAs for the main services
    ```bash
    kubectl apply -f 03-HPA/.
    ```

    Take Note: The Matching and Chat Services do not have HPAs due to their reliance on persistent Websocket connections.

### Step 6: Updating the ConfigMap
1. From the Google Cloud Console, navigate to the `Services & Ingress` tab and check that every service have received a static IP address (You might have to wait for a while).
2. Update the ConfigMap in `02-Services/00-env-configs.yaml` with the new endpoint IP addresses of:
   1. `api-gateway-service`
   2. `matching-service`
   3. `chat-service`

   Take note:
   * `REACH_BASE_URL` refers to the api-gateway-service endpoint
   * Question, Auth and User service endpoints must also be updated with the base address of `api-gateway-service`.
3. Apply the updated ConfigMap
    ```bash
    kubectl apply -f 02-Services/00-env-configs.yaml
    ```

### Step 7: Access PeerPrep
1. You should now be able to access Peerprep on the static IP address of the `frontend-service`.

## Helpful Resources
* [Deploying an app onto a GKE cluster](https://cloud.google.com/kubernetes-engine/docs/deploy-app-cluster)