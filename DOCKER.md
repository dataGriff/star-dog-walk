# Star Dog Walk - Docker Deployment Guide

This document explains how to run the Star Dog Walk application using Docker.

## Prerequisites

- Docker (v20.10+)
- Docker Compose (v2.0+)

## Quick Start

### Production Deployment

1. **Build and start the application:**
   ```bash
   ./deploy.sh
   # or
   npm run docker:up
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001/api
   - Health Check: http://localhost:3001/api/health

### Development Deployment

1. **Start in development mode:**
   ```bash
   ./deploy.sh development
   # or
   npm run docker:dev
   ```

2. **Features in development mode:**
   - Hot reloading for both frontend and backend
   - Source code mounted as volumes
   - Development environment variables

## Available Scripts

### NPM Scripts
```bash
npm run docker:build    # Build Docker images
npm run docker:up       # Start production containers
npm run docker:down     # Stop containers
npm run docker:dev      # Start development containers
npm run docker:logs     # View container logs
```

### Shell Scripts
```bash
./build.sh             # Build Docker images
./deploy.sh            # Deploy production
./deploy.sh dev        # Deploy development
```

## Docker Services

### Frontend Service
- **Container:** `star-dog-walk-frontend`
- **Port:** 3000 (external) → 80 (internal)
- **Technology:** React + Vite served by Nginx
- **Features:** 
  - Production build optimization
  - Nginx reverse proxy for API calls
  - Security headers
  - Gzip compression

### Backend Service
- **Container:** `star-dog-walk-backend`
- **Port:** 3001 (external) → 3001 (internal)
- **Technology:** Node.js + Express
- **Features:**
  - Health check endpoint
  - JWT authentication
  - CORS configuration
  - Mock data (for demo purposes)

## Environment Variables

### Production (.env.production)
```env
NODE_ENV=production
PORT=3001
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key-change-in-production-please
```

### Frontend Build (.env.production.local)
```env
VITE_API_URL=/api
```

## File Structure

```
├── Dockerfile.frontend          # Production frontend image
├── Dockerfile.frontend.dev      # Development frontend image
├── Dockerfile.backend           # Backend image
├── docker-compose.yml           # Production compose file
├── docker-compose.dev.yml       # Development compose file
├── nginx.conf                   # Nginx configuration
├── .dockerignore               # Docker ignore rules
├── build.sh                    # Build script
├── deploy.sh                   # Deployment script
└── DOCKER.md                   # This file
```

## Test Accounts

The application includes mock data with test accounts:

- **Owner:** `owner@example.com` / `password`
- **Walker:** `walker@stardogwalker.com` / `password`
- **Owner 2:** `emma@example.com` / `password`

## Health Checks

Both services include health checks:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:3001/api/health`

## Troubleshooting

### View logs
```bash
docker-compose logs -f
# or for specific service
docker-compose logs -f frontend
docker-compose logs -f backend
```

### Restart services
```bash
docker-compose restart
```

### Rebuild images
```bash
docker-compose build --no-cache
```

### Clean up
```bash
docker-compose down -v
docker system prune -f
```

## Production Considerations

For a real production deployment, consider:

1. **Database:** Replace mock data with a real database (PostgreSQL, MongoDB, etc.)
2. **Security:** 
   - Use strong, randomly generated JWT secrets
   - Configure proper CORS origins
   - Add rate limiting
   - Use HTTPS/TLS certificates
3. **Monitoring:** Add logging, metrics, and monitoring
4. **Scaling:** Use a container orchestration platform (Kubernetes, Docker Swarm)
5. **CI/CD:** Implement automated testing and deployment pipelines
6. **Secrets Management:** Use proper secrets management instead of environment files

## Network Architecture

```
Internet → Frontend (Nginx:80) → Backend (Express:3001)
             ↓
    API calls proxied via /api/* routes
```

The frontend container serves the React application and proxies API calls to the backend container through Docker's internal network.
