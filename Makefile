# Makefile for Kicau Mono Repo

# default target
.DEFAULT_GOAL := help

COMPOSE_FILE := docker-compose.yml
ADMIN_PROFILE := --profile admin
NESTJS_DIR := web-service
PYTHON_DIR := inference-service

.PHONY: help
help:
	@echo "Kicau Mono Repo - Available Commands"
	@echo "=================================="
	@awk 'BEGIN {FS = ":.*##"; printf "\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  %-20s %s\n", $$1, $$2 } /^##@/ { printf "\n%s\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

.PHONY: up
up:
	@echo "Starting all services..."
	docker-compose up -d
	@echo "Services started successfully!"
	@echo "NestJS Backend: http://localhost:3000"
	@echo "Python Backend: http://localhost:8000"
	@echo "PostgreSQL: localhost:5432"

.PHONY: up-admin
up-admin:
	@echo "Starting all services with pgAdmin..."
	docker-compose $(ADMIN_PROFILE) up -d
	@echo "Services started successfully!"
	@echo "NestJS Backend: http://localhost:3000"
	@echo "Python Backend: http://localhost:8000"
	@echo "PostgreSQL: localhost:5432"
	@echo "pgAdmin: http://localhost:8080"

.PHONY: down
down:
	@echo "Stopping all services..."
	docker-compose down
	@echo "Services stopped successfully!"

.PHONY: restart
restart: down up

.PHONY: restart-admin
restart-admin: down up-admin

.PHONY: build
build:
	@echo "Building all services..."
	docker-compose build
	@echo "Build completed!"

.PHONY: build-nocache
build-nocache:
	@echo "Building all services without cache..."
	docker-compose build --no-cache
	@echo "Build completed!"

.PHONY: rebuild
rebuild: down build up

.PHONY: rebuild-admin
rebuild-admin: down build up-admin

.PHONY: nestjs-up
nestjs-up:
	@echo "Starting NestJS service..."
	docker-compose up -d postgres nestjs-backend

.PHONY: python-up
python-up:
	@echo "Starting Python service..."
	docker-compose up -d postgres python-backend

.PHONY: postgres-up
postgres-up:
	@echo "Starting PostgreSQL service..."
	docker-compose up -d postgres

.PHONY: pgadmin-up
pgadmin-up:
	@echo "Starting PostgreSQL and pgAdmin..."
	docker-compose $(ADMIN_PROFILE) up -d postgres pgadmin

.PHONY: logs
logs:
	docker-compose logs -f

.PHONY: logs-nestjs
logs-nestjs:
	docker-compose logs -f nestjs-backend

.PHONY: logs-python
logs-python:
	docker-compose logs -f python-backend

.PHONY: logs-postgres
logs-postgres:
	docker-compose logs -f postgres

.PHONY: logs-pgadmin
logs-pgadmin:
	docker-compose logs -f pgadmin

.PHONY: status
status:
	@echo "Service Status:"
	docker-compose ps

.PHONY: db-migrate
db-migrate:
	@echo "Running database migrations..."
	docker-compose exec nestjs-backend npx prisma migrate deploy

.PHONY: db-seed
db-seed:
	@echo "Seeding database..."
	docker-compose exec nestjs-backend npm run prisma:seed

.PHONY: db-studio
db-studio:
	@echo "Opening Prisma Studio..."
	docker-compose exec nestjs-backend npx prisma studio

.PHONY: db-reset
db-reset:
	@echo "WARNING: This will delete all database data!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker-compose exec nestjs-backend npx prisma migrate reset --force

.PHONY: db-backup
db-backup:
	@echo "Creating database backup..."
	@mkdir -p backups
	docker-compose exec postgres pg_dump -U kicau_user -d kicau_db > backups/backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "Backup created in backups/ directory"

.PHONY: shell-nestjs
shell-nestjs:
	docker-compose exec nestjs-backend sh

.PHONY: shell-python
shell-python:
	docker-compose exec python-backend bash

.PHONY: shell-postgres
shell-postgres:
	docker-compose exec postgres psql -U kicau_user -d kicau_db

.PHONY: lint-nestjs
lint-nestjs:
	@echo "Running NestJS linting..."
	docker-compose exec nestjs-backend npm run lint

.PHONY: test-nestjs
test-nestjs:
	@echo "Running NestJS tests..."
	docker-compose exec nestjs-backend npm run test

.PHONY: test-nestjs-e2e
test-nestjs-e2e:
	@echo "Running NestJS e2e tests..."
	docker-compose exec nestjs-backend npm run test:e2e

.PHONY: test-python
test-python:
	@echo "Running Python tests..."
	docker-compose exec python-backend python -m pytest

.PHONY: install-nestjs
install-nestjs:
	@echo "Installing NestJS dependencies..."
	docker-compose exec nestjs-backend npm install

.PHONY: install-python
install-python:
	@echo "Installing Python dependencies..."
	docker-compose exec python-backend pip install -r requirements.txt

.PHONY: clean
clean:
	@echo "Cleaning up containers and volumes..."
	docker-compose down -v --remove-orphans
	@echo "Cleanup completed!"

.PHONY: clean-images
clean-images:
	@echo "Removing built images..."
	docker-compose down --rmi all
	@echo "Images removed!"

.PHONY: clean-all
clean-all:
	@echo "WARNING: This will remove all containers, volumes, and images!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ]
	docker-compose down -v --rmi all --remove-orphans
	docker system prune -f
	@echo "Complete cleanup finished!"

.PHONY: health
health:
	@echo "Checking service health..."
	@docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

.PHONY: health-nestjs
health-nestjs:
	@echo "Checking NestJS health..."
	@curl -f http://localhost:3000/health || echo "NestJS service is not healthy"

.PHONY: health-python
health-python:
	@echo "Checking Python health..."
	@curl -f http://localhost:8000/health || echo "Python service is not healthy"

.PHONY: first-run
first-run: build up-admin db-seed
	@echo "First-time setup completed!"
	@echo "Your services are now running:"
	@echo "  - NestJS Backend: http://localhost:3000"
	@echo "  - Python Backend: http://localhost:8000"
	@echo "  - pgAdmin: http://localhost:8080"
	@echo "  - PostgreSQL: localhost:5432"

.PHONY: dev
dev: up
	@echo "Development environment started!"
	@echo "Use 'make logs' to see all logs"
