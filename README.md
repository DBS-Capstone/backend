# Kicau Mono Repo

A full-stack application with NestJS backend, Python inference service, and PostgreSQL database, all containerized with Docker.

## 🏗️ Architecture

- **NestJS Backend** (Port 3000) - Web service API
- **Python Backend** (Port 8000) - Inference service
- **PostgreSQL** (Port 5432) - Database
- **pgAdmin** (Port 8080) - Database administration (optional)

## 📋 Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)
- Make (for Unix/Linux/Mac) or use native Docker commands for Windows

## 🚀 Quick Start

### Option 1: Using Make (Unix/Linux/Mac)

```bash
# First-time setup (builds images, starts all services with pgAdmin, seeds database)
make first-run

# Start all services
make up

# Start all services with pgAdmin
make up-admin

# Stop all services
make down

# View all available commands
make help
```

### Option 2: Native Docker Commands (Windows/All Platforms)

#### First-Time Setup
```bash
# Build all services
docker-compose build

# Start all services with pgAdmin
docker-compose --profile admin up -d

# Run database migrations
docker-compose exec nestjs-backend npx prisma migrate deploy

# Seed the database
docker-compose exec nestjs-backend npm run prisma:seed
```

#### Daily Development Commands
```bash
# Start all services (without pgAdmin)
docker-compose up -d

# Start all services with pgAdmin
docker-compose --profile admin up -d

# Stop all services
docker-compose down

# View service status
docker-compose ps

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker-compose logs -f nestjs-backend
docker-compose logs -f python-backend
docker-compose logs -f postgres
```

## 🔧 Development Commands

### Service Management

#### Using Make
```bash
# Start individual services
make nestjs-up      # NestJS + PostgreSQL
make python-up      # Python + PostgreSQL
make postgres-up    # PostgreSQL only
make pgadmin-up     # PostgreSQL + pgAdmin

# Restart services
make restart        # All services
make restart-admin  # All services with pgAdmin

# Build services
make build          # Build all
make build-nocache  # Build without cache
make rebuild        # Stop, build, start
```

#### Using Docker Commands
```bash
# Start individual services
docker-compose up -d postgres nestjs-backend
docker-compose up -d postgres python-backend
docker-compose up -d postgres
docker-compose --profile admin up -d postgres pgadmin

# Restart services
docker-compose restart

# Build services
docker-compose build
docker-compose build --no-cache
```

### Database Operations

#### Using Make
```bash
make db-migrate     # Run migrations
make db-seed        # Seed database
make db-studio      # Open Prisma Studio
make db-reset       # Reset database (WARNING: deletes data)
make db-backup      # Create backup
```

#### Using Docker Commands
```bash
# Run migrations
docker-compose exec nestjs-backend npx prisma migrate deploy

# Seed database
docker-compose exec nestjs-backend npm run prisma:seed

# Open Prisma Studio
docker-compose exec nestjs-backend npx prisma studio

# Reset database (WARNING: deletes all data)
docker-compose exec nestjs-backend npx prisma migrate reset --force

# Create database backup
mkdir backups
docker-compose exec postgres pg_dump -U kicau_user -d kicau_db > backups/backup_$(date +%Y%m%d_%H%M%S).sql
```

### Shell Access

#### Using Make
```bash
make shell-nestjs   # Access NestJS container
make shell-python   # Access Python container
make shell-postgres # Access PostgreSQL
```

#### Using Docker Commands
```bash
# Access container shells
docker-compose exec nestjs-backend sh
docker-compose exec python-backend bash
docker-compose exec postgres psql -U kicau_user -d kicau_db
```

### Linting

#### Using Make
```bash
make lint-nestjs        # Lint NestJS code
```

#### Using Docker Commands
```bash
# NestJS linting
docker-compose exec nestjs-backend npm run lint
```

### Health Checks

#### Using Make
```bash
make health         # Check all services
make health-nestjs  # Check NestJS health endpoint
make health-python  # Check Python health endpoint
```

#### Using Docker Commands
```bash
# Check service status
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"

# Health check endpoints (requires curl or use browser)
curl http://localhost:3000/health
curl http://localhost:8000/health
```

## 🧹 Cleanup Commands

#### Using Make
```bash
make clean          # Remove containers and volumes
make clean-images   # Remove built images
make clean-all      # Complete cleanup (WARNING: removes everything)
```

#### Using Docker Commands
```bash
# Basic cleanup
docker-compose down -v --remove-orphans

# Remove images
docker-compose down --rmi all

# Complete cleanup (WARNING: removes everything)
docker-compose down -v --rmi all --remove-orphans
docker system prune -f
```

## 🌐 Service URLs

After starting the services, you can access:

- **NestJS API**: http://localhost:3000
- **Python API**: http://localhost:8000
- **pgAdmin**: http://localhost:8080 (when using admin profile)
- **PostgreSQL**: localhost:5432

### pgAdmin Login (if using admin profile)
- **Email**: admin@kicau.com
- **Password**: admin123

### Database Connection Details
- **Host**: postgres (internal) / localhost (external)
- **Port**: 5432
- **Database**: kicau_db
- **Username**: kicau_user
- **Password**: kicau_password

## 📁 Project Structure

```
kicau-mono-repo/
├── web-service/          # NestJS backend
├── inference-service/    # Python backend
├── docker-compose.yml    # Docker services configuration
├── Makefile             # Development commands
└── README.md            # This file
```

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using the port
   netstat -ano | findstr :3000  # Windows
   lsof -i :3000                 # Mac/Linux
   ```

2. **Docker daemon not running**
   - Make sure Docker Desktop is running
   - On Windows: Check system tray for Docker icon

3. **Permission denied (Linux/Mac)**
   ```bash
   sudo chmod +x Makefile
   # or use docker commands directly
   ```

4. **Database connection issues**
   ```bash
   # Restart PostgreSQL service
   docker-compose restart postgres
   ```

### Logs and Debugging

```bash
# View logs for troubleshooting
docker-compose logs nestjs-backend
docker-compose logs python-backend
docker-compose logs postgres

# Follow logs in real-time
docker-compose logs -f
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test using the provided commands
5. Submit a pull request

## 📝 Notes for Windows Users

- Use PowerShell or Command Prompt for Docker commands
- If you have WSL2, you can use the Make commands there
- Make sure Docker Desktop is configured to use WSL2 backend for better performance
- Use `docker-compose` instead of `make` commands if Make is not available

## 🔄 Development Workflow

1. **Start development environment**:
   ```bash
   make dev  # or docker-compose up -d
   ```

2. **Make code changes** in `web-service/` or `inference-service/`

3. **View logs** to debug:
   ```bash
   make logs  # or docker-compose logs -f
   ```

4. **Restart services** if needed:
   ```bash
   make restart  # or docker-compose restart
   ```
