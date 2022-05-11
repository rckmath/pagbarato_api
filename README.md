# **PagBarato API**

## **Pre-requisites**
- Docker and Docker Compose (or Docker Desktop)

## **How to run**
1. Clone the project
2. Open the terminal inside project's root folder
3. Run "docker-compose build" and wait until the container is settled up
### **Linux Users**
#### For starting the container, use:
- Run "make up" command for run the container in development mode
- Run "make up-prod" command for run the container in production mode
- Run "make down" command for shutting down the container
### **Windows Users**
#### For starting the container, use:
- Run "docker-compose --env-file .env up -d" command for run the container in development mode
- Run "docker-compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up --build -d" command for run the container in production mode
- Run "docker-compose down" command for shutting down the container