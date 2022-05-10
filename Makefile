up:
	docker-compose --env-file .env up -d

up-prod:
	docker-compose --env-file .env -f docker-compose.yml -f docker-compose.prod.yml up --build -d

down:
	docker-compose down