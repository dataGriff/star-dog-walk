#!/bin/bash

# Star Dog Walk - Deployment Script

echo "🐕 Deploying Star Dog Walk application..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Set deployment mode (default to production)
MODE=${1:-production}

if [ "$MODE" = "development" ] || [ "$MODE" = "dev" ]; then
    echo "🔧 Starting in development mode..."
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml up -d
    echo "✅ Development environment is running!"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:3001"
else
    echo "🚀 Starting in production mode..."
    docker-compose down
    docker-compose up -d
    echo "✅ Production environment is running!"
    echo "Frontend: http://localhost:3000"
    echo "Backend: http://localhost:3001"
fi

echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop: docker-compose down"
