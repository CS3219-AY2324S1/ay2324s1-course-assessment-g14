<p align="center">
   <img src="frontend/public/logo192.png" alt="PeerPrep Logo" />
</p>
<h1 align="center">PeerPrep</h1>
<p align="center">PeerPrep is a technical interview preparation platform and peer matching system, where students can find peers to practice whiteboard-style interview questions together.</p>

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Project Setup](#project-setup)
  - [Prerequisites](#prerequisites)
  - [Step 1: Set up environment files](#step-1-set-up-environment-files)
  - [Step 2: Run docker-compose](#step-2-run-docker-compose)
  - [Step 3: Access Peerprep](#step-3-access-peerprep)
- [Deployment](#deployment)

## Introduction
This project is a full-stack application that is built on a microservices architecture. The backend is built using NodeJS with Express, and the frontend is built using React. PeerPrep is an application that helps students prepare for technical interviews by allowing users to match up with each other to practice and simulate a real interview environment.

The following are the microservices that we built:
1. API Gateway Service
2. Auth Service
3. Chat Service
4. Collab Service
5. Matching Service
6. Question Service
7. User Service

## Project Setup
For our development environment, we use `docker-compose` to quickly set up all our microservices containers with one command.

This section will tell you how to run the application locally using `docker-compose`.

### Prerequisites
1. [Docker](https://docs.docker.com/get-docker/)
2. [docker-compose](https://docs.docker.com/compose/install/)

### Step 1: Set up environment files
There were 2 env files uploaded to Canvas, the instructions are on the README uploaded to Canvas.

### Step 2: Run docker-compose
1. Navigate to the root directory of this repository (where the `docker-compose.yml` is)
2. Run `docker-compose` to build and run all the services
    ``` bash
    docker-compose up --build
    ```

### Step 3: Access Peerprep
1. Open up your browser and navigate to http://localhost:3000/

## Deployment
For deployment, we use Kubernetes to orchestrate our microservices. Kubernetes provides many benefits, such as load-balancing, auto-scaling and built-in service discovery.
Our microservices images are hosted in Docker Registry and deployed onto the cloud using Google Kubernete Engine (GKE). You may refer to our [README.md](./k8s/README.md) in the k8s folder for more information.