# **PagBarato API**

## **Pre-requisites**
- Docker and Docker Compose (or Docker Desktop)

## **How to run**
1. Clone the project
2. Create a .env file with your private/secret credentials
3. Open the terminal inside project's root folder
4. Run "docker-compose build" and wait until the container is settled up
5. Run the containers according to your operational system
#### **Linux Users**
- For running in development mode: use "make up" command
- For running in production mode: use "make up-prod" command
- For shutting down: use "make down" command
#### **Windows Users**
- For running in development mode: use "docker-compose --env-file .env up -d" command
- For running in production mode: use "docker-compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up --build -d" command
- For shutting down: use "docker-compose down" command