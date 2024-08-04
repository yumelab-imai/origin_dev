build:
	docker compose build && make nodem

nbuild:
	docker compose build --no-cache && make nodem

up:
	docker compose up -d

down:
	docker compose down

api:
	docker-compose exec api bash

nextjs:
	docker-compose exec next bash

rapi:
	docker-compose exec -u root api bash

wlog:
	docker-compose logs web

alog:
	docker-compose logs api

nlog:
	docker-compose logs next

dls:
	docker container ls

# nextコンテナのnode_modulesをホストにコピー
nodem:
	docker cp sys1-nextjs:/app/node_modules ./next/

dump:
	@echo "Running the MySQL backup script..."
	@/bin/bash scripts/mysql_backup.sh

clog:
	cat /var/log/cron

cedit:
	crontab -e

# Huskyの設定で、-T オプションを記述
test:
	docker-compose exec -T api php artisan test

