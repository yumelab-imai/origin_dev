build:
	docker compose build

nbuild:
	docker compose build --no-cache

up:
	docker compose up -d

down:
	docker compose down

app:
	docker-compose exec app bash

next:
	docker-compose exec next bash

rapp:
	docker-compose exec -u root app bash

wlog:
	docker-compose logs web

alog:
	docker-compose logs app

nlog:
	docker-compose logs next

dump:
	@echo "Running the MySQL backup script..."
	@/bin/bash scripts/mysql_backup.sh

clog:
	cat /var/log/cron

cedit:
	crontab -e

# Huskyの設定で、-T オプションを記述
test:
	docker-compose exec -T app php artisan test

