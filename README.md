<p align="center">
   <img src="frontend/public/logo192.png" alt="PeerPrep Logo" />
</p>
<h1 align="center">PeerPrep</h1>
<p align="center">PeerPrep is a technical interview preparation platform and peer matching system, where students can find peers to practice whiteboard-style interview questions together.</p>

---
Table of Contents
===
- [Table of Contents] (#table-of-contents)
  - [Introduction] (#introduction)
  - [Project Setup] (#project-setup)
     - [Prerequisites] (#prerequisites)
     - [Setting up environment files] (#setting-up-env-files)
     - [Running] (#running)
     - [Running without Docker] (#running-without-docker)

## Introduction
This project is a full-stack application that is built on a microservices architecture. The backend is built using NodeJS with Express, and the frontend is built using React. PeerPrep is an application that helps students prepare for technical interviews by allowing users to match up with each other to practice and simulate a real interview environment.

These are the following microservices that we built:
1. API Gateway Service
2. Auth Service
3. Chat Service
4. Collab Service
5. Matching Service
6. Question Service
7. User Service

## Project Setup
This section will tell you how to run the application locally (either through docker-compose or without docker-compose).

## Prerequisites
1. [Docker](https://docs.docker.com/get-docker/)
2. [docker-compose](https://docs.docker.com/compose/install/)

#### Setting up environment files
There were 2 env files uploaded to Canvas, the instructions are on the README uploaded to Canvas.

#### Running
For our production/development environment, we use `docker-compose up --build` to build and run all the services; this can be done from the root directory of the project (the same level as you would see the `docker-compose.yml` in. 

