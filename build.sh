#!/bin/bash

# Star Dog Walk - Build Script

echo "🐕 Building Star Dog Walk application..."

# Build the application using Docker Compose
echo "Building Docker images..."
docker-compose build

echo "✅ Build complete!"
echo ""
echo "To run the application:"
echo "  Production: docker-compose up -d"
echo "  Development: docker-compose -f docker-compose.dev.yml up -d"
echo ""
echo "Access the application at:"
echo "  Frontend: http://localhost:3000"
echo "  Backend API: http://localhost:3001/api"
echo "  Health Check: http://localhost:3001/api/health"
