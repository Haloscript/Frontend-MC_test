# запуск всех конейнеров
up:
	sudo docker-compose up -d

# остановка всех конейнеров
down:
	sudo docker-compose down

#пересоздает контейнеры проекта
restart: sudo down up

#сбилдить в dev режиме
serve:
	sudo docker-compose exec node npm run serve

#сбилдить в prod режиме
prod:
	sudo docker-compose exec node npm run build

#установка зависимостей
install:
	sudo docker-compose exec node npm install

#установка node-sass
sass:
	sudo docker-compose exec node npm install --unsafe-perm node-sass

