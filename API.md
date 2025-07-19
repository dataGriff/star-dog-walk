# Star Dog Walk API Documentation

This directory contains the OpenAPI specification and documentation for the Star Dog Walk API.

## 📖 API Documentation

### View Interactive Documentation

**Option 1: Local HTML File**
1. Open `api-docs.html` in your web browser
2. The documentation will load the OpenAPI spec from `openapi.yaml`

**Option 2: Online Swagger Editor**
1. Go to [Swagger Editor](https://editor.swagger.io/)
2. Copy the contents of `openapi.yaml` and paste it into the editor

**Option 3: VS Code Extension**
1. Install the "OpenAPI (Swagger) Editor" extension
2. Open `openapi.yaml` in VS Code
3. Use the preview pane to view the documentation

### API Base URLs

- **Development**: `http://localhost:3001/api`
- **Docker Production**: `http://localhost:3000/api` (proxied through Nginx)

## 🔐 Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### Getting a Token

1. **Register a new user**: `POST /auth/register`
2. **Login**: `POST /auth/login`
3. Use the returned token in subsequent requests

### Test Accounts

- **Owner**: `owner@example.com` / `password`
- **Walker**: `walker@stardogwalker.com` / `password`
- **Owner 2**: `emma@example.com` / `password`

## 📋 API Endpoints Overview

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `GET /auth/verify` - Verify JWT token

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### Dogs
- `GET /dogs` - Get dogs (filtered by user role)
- `POST /dogs` - Create new dog (owners only)
- `GET /dogs/{dogId}` - Get dog by ID
- `PUT /dogs/{dogId}` - Update dog (owners only)
- `DELETE /dogs/{dogId}` - Delete dog (owners only)

### Walks
- `GET /walks` - Get walks (filtered by user role)
- `POST /walks` - Create new walk
- `GET /walks/{walkId}` - Get walk by ID
- `PUT /walks/{walkId}` - Update walk
- `DELETE /walks/{walkId}` - Delete walk
- `GET /walks/public/{walkId}` - Get public walk details (no auth)

### Notifications
- `GET /notifications` - Get user notifications
- `POST /notifications` - Create notification
- `DELETE /notifications` - Clear all notifications

### Health
- `GET /health` - API health check (no auth required)

## 🔍 Testing the API

### Using curl

**Login Example:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "owner@example.com", "password": "password"}'
```

**Get Dogs Example:**
```bash
curl -X GET http://localhost:3001/api/dogs \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using the Swagger UI

1. Open the interactive documentation (see options above)
2. Click "Authorize" and enter your JWT token
3. Try out the endpoints directly in the browser

## 📝 Request/Response Examples

### Register User
```json
POST /auth/register
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "role": "owner",
  "phone": "+44 7123 456789",
  "address": "123 Main St, Cardiff"
}
```

### Create Dog
```json
POST /dogs
{
  "name": "Buddy",
  "breed": "Labrador",
  "age": 2,
  "weight": 30,
  "color": "Yellow",
  "behaviorNotes": "Friendly and energetic",
  "emergencyContact": "John Doe - +44 7123 456789"
}
```

### Book Walk
```json
POST /walks
{
  "dogId": "1",
  "date": "2024-01-20",
  "startTime": "14:00",
  "duration": 60,
  "pickupAddress": "123 Main St, Cardiff",
  "specialNotes": "Dog is afraid of loud noises"
}
```

## ⚡ Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., user already exists)
- `500` - Internal Server Error

## 🏗️ Data Models

### User Roles
- `owner` - Dog owners who book walks
- `walker` - Dog walkers who perform walks

### Walk Statuses
- `pending` - Walk requested, awaiting confirmation
- `confirmed` - Walk confirmed by walker
- `completed` - Walk finished
- `cancelled` - Walk cancelled

### Notification Types
- `info` - General information
- `success` - Success messages
- `warning` - Warning messages
- `error` - Error messages

## 🔄 API Versioning

Current version: `v1.0.0`

The API follows semantic versioning. Breaking changes will increment the major version.

## 📞 Support

For API support or questions:
- Email: support@stardogwalker.com
- Documentation: This OpenAPI specification
- Repository: [Star Dog Walk GitHub](https://github.com/dataGriff/star-dog-walk)
