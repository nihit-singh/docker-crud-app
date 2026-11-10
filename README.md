# MERN User Registration — Dockerized

A full-stack **MERN** (MongoDB, Express, React, Node.js) user registration app, fully containerized with **Docker Compose**.

## Features

- Register users with name, email, age, and phone number
- View all registered users (newest first)
- Delete users
- Fully containerized — one command to run the entire stack

## Tech Stack

| Layer    | Technology              |
| -------- | ----------------------- |
| Frontend | React 19, Vite, Axios   |
| Backend  | Node.js 20, Express 5   |
| Database | MongoDB 8               |
| DevOps   | Docker, Docker Compose  |

## Project Structure

```
docker_project/
├── frontend/               # React + Vite app
│   ├── src/
│   ├── Dockerfile          # Multi-stage build → Nginx
│   └── package.json
├── backend/                # Express REST API
│   ├── models/User.js      # Mongoose User schema
│   ├── routes/userRoutes.js
│   ├── server.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml      # Orchestrates all 3 services
└── .gitignore
```

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd docker_project
```

### 2. Start all services

```bash
docker compose up --build
```

This builds and starts three containers:

| Service    | URL                       |
| ---------- | ------------------------- |
| Frontend   | http://localhost:3000      |
| Backend    | http://localhost:5000      |
| MongoDB    | `localhost:27017`         |

### 3. Stop the services

```bash
docker compose down
```

To also remove the persisted database volume:

```bash
docker compose down -v
```

## API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/users`     | List all users    |
| POST   | `/api/users`     | Create a new user |
| DELETE | `/api/users/:id` | Delete a user     |

### Example — Create a user

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 25, "phone": "9876543210"}'
```

## Environment Variables

The backend reads the following variables (set automatically by `docker-compose.yml`):

| Variable    | Description               | Default (in Compose)              |
| ----------- | ------------------------- | --------------------------------- |
| `PORT`      | Server port               | `5000`                            |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongodb:27017/userdb`  |

## Local Development (without Docker)

```bash
# Terminal 1 — Backend
cd backend
npm install
echo "PORT=5000\nMONGO_URI=mongodb://localhost:27017/userdb" > .env
npm run dev

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev
```

> **Note:** You'll need a local MongoDB instance running on port 27017.

