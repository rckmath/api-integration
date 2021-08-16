## API Integration

This project wises aims to integrate two distinct platforms: Pipedrive and Bling. The first one catching up all registered deals with "won" status and the second one receiving these won deals as an order, then we save a collection aggregating the won deals orders per day with the total value of the all orders.

## Table of Contents
- [API Integration](#api-integration)
- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Setup](#setup)
  - [Pre-requisites](#pre-requisites)
  - [Instructions](#instructions)
- [Docker](#docker)
- [Technologies](#technologies)
- [Environment](#environment)

## Features

- Integrate Pipedrive deal system, getting all won deals
- Integrate Bling order creation, registering the according to Pipedrive deals
- Gather deal and order data post creation into a collection and bring the document to an API

## Setup

### Pre-requisites

- [Node 14.17.5 LTS](https://nodejs.org/en/) -> To run the application if you will **not** use [Docker](#docker)
- [NPM](https://www.npmjs.com) -> To install and use the package.json scripts
- [Docker](https://www.docker.com) -> If you don't have a prepared environment setup
- [MongoDB](https://www.mongodb.com/try) -> To locally setup or MongoDB Atlas cluster use
- [Pipedrive](https://www.pipedrive.com) -> To integrate with Pipedrive, create an account and get the API key
- [Bling](https://www.bling.com.br) -> To integrate with Bling, create an account and get the API key

### Instructions

Done with the pre-requisites, the next step is to follow these instructions:

1. Clone the repository
2. Open the terminal at the project root folder and type "npm install" to install all dependencies
3. Create a file named as ".env-development" and a ".env-production" at the root of the project.
4. Use the following code in the created file:

```env
NODE_ENV=development

PORT=3000

DATABASE_URI=mongodb+srv://<YOUR_HOST>
DATABASE_USER=<YOUR_MONGO_DB_USER>
DATABASE_PASSWORD=<YOUR_MONGO_DB_PASS>
DATABASE_HOST=<YOUR_HOST>
DATABASE_NAME=<YOUR_NAME>

BLING_MOCK_PRODUCT_CODE=<A_DEFAULT_PRODUCT_CODE_CREATED_AT_BLING>
BLING_BASE_URL=<THE_BLING_BASE_URL>
BLING_API_KEY=<YOUR_PIPEDRIVE_API_KEY>

PIPEDRIVE_API_KEY=<YOUR_PIPEDRIVE_API_KEY>
PIPEDRIVE_BASE_URL=<THE_PIPEDRIVE_BASE_URL>
```

For every environment variable you need to substitute with your **own configured data**.

5. With setup done, you just need to test running **npm run dev** OR **npm run docker**
6. If everything's OK, you should could test the server status through the endpoint: **your_domain:your_port/api/status** which returns a JSON with basic information and the terminal should show a log like `GET /api/status 200 1.152 ms`.
7. Have fun! :)

## Docker

This project is Docker compatible, and I've used the following configuration in order to set-up the project with Docker:

**Dockerfile**
```Dockerfile
FROM node:lts-alpine

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm install --production

COPY . .

RUN chmod +x docker.entrypoint.sh
ENTRYPOINT [ "./docker.entrypoint.sh" ]
```

**docker.entrypoint.sh**
```sh
#!/bin/sh
npm run start & npm run start:job
```

## Technologies

- :star: Node.js
- :star: Express
- :star: Moongose
- :star: MongoDB Atlas
- :star: Docker
- :star: Pipedrive
- :star: Bling

## Environment

- :desktop_computer: Visual Studio Code for coding
- :desktop_computer: Robo3T for database management
- :desktop_computer: Postman for API testing
- :desktop_computer: Git for code versioning
- :desktop_computer: Spotify music for focusing
- :desktop_computer: ~~Stack Overflow for debugging~~