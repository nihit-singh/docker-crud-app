<div align="center">

# 🐳 MERN User Registration

### A Full-Stack Dockerized User Management Application

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js_20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_8-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

---

A production-ready **MERN** stack application for user registration and management, fully orchestrated with **Docker Compose**. Built as a DevOps project demonstrating containerization, multi-stage builds, and service orchestration.

</div>

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Local Development](#-local-development)
- [License](#-license)

---

## ✨ Features

- 🔐 **User Registration** — Create users with name, email, age, and phone
- 📋 **User Listing** — View all registered users sorted by latest first
- 🗑️ **User Deletion** — Remove users with a single click
- 🐳 **Fully Containerized** — One command to spin up the entire stack
- ⚡ **Multi-Stage Builds** — Optimized Docker images with Nginx serving the frontend
- 💾 **Persistent Storage** — MongoDB data persisted via Docker volumes

---

## 🏗️ Architecture

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│             │       │             │       │             │
│   Frontend  │──────▶│   Backend   │──────▶│   MongoDB   │
│  (React +   │ :3000 │  (Express)  │ :5000 │   (Mongo)   │
│   Nginx)    │       │             │       │             │
│             │       │             │       │             │
└─────────────┘       └─────────────┘       └─────────────┘
     :3000                 :5000                :27017
      │                      │                    │
      └──────────────────────┴────────────────────┘
                  Docker Compose Network
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center" width="200"><b>Layer</b></td>
<td align="center" width="400"><b>Technology</b></td>
</tr>
<tr>
<td align="center">🎨 Frontend</td>
<td>React 19 · Vite 8 · Axios</td>
</tr>
<tr>
<td align="center">⚙️ Backend</td>
<td>Node.js 20 · Express 5 · Mongoose 9</td>
</tr>
<tr>
<td align="center">💾 Database</td>
<td>MongoDB 8</td>
</tr>
<tr>
<td align="center">🐳 DevOps</td>
<td>Docker · Docker Compose · Nginx · Multi-stage Builds</td>
</tr>
</table>

---

## 📁 Project Structure

```
docker_project/
│
├── frontend/                   # React client application
│   ├── src/
│   │   ├── App.jsx             # Main component (form + user list)
│   │   ├── App.css             # Application styles
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles
│   ├── public/                 # Static assets
│   ├── Dockerfile              # Multi-stage: Build → Nginx
│   ├── .dockerignore
│   ├── vite.config.js
│   └── package.json
│
├── backend/                    # Express REST API
│   ├── models/
│   │   └── User.js             # Mongoose user schema
│   ├── routes/
│   │   └── userRoutes.js       # CRUD route handlers
│   ├── server.js               # App entry point
│   ├── Dockerfile              # Node.js Alpine image
│   ├── .dockerignore
│   └── package.json
│
├── docker-compose.yml          # Service orchestration
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

| Tool           | Version  | Installation                                              |
| -------------- | -------- | --------------------------------------------------------- |
| Docker         | 20.10+   | [Get Docker](https://docs.docker.com/get-docker/)         |
| Docker Compose | 2.0+     | [Get Compose](https://docs.docker.com/compose/install/)   |

### Quick Start

**1.** Clone the repository

```bash
git clone <repository-url>
cd docker_project
```

**2.** Build and start all services

```bash
docker compose up --build
```

**3.** Open the application

| Service  | URL                          | Description          |
| -------- | ---------------------------- | -------------------- |
| Frontend | http://localhost:3000         | React UI             |
| Backend  | http://localhost:5000         | REST API             |
| MongoDB  | `mongodb://localhost:27017`  | Database             |

**4.** Stop the services

```bash
# Stop containers (preserves data)
docker compose down

# Stop and remove all data
docker compose down -v
```

---

## 📡 API Reference

### Base URL: `http://localhost:5000`

#### Create User

```http
POST /api/users
Content-Type: application/json
```

| Field   | Type     | Required | Description       |
| ------- | -------- | -------- | ----------------- |
| `name`  | `string` | ✅       | Full name         |
| `email` | `string` | ✅       | Email address     |
| `age`   | `number` | ✅       | Age               |
| `phone` | `string` | ✅       | Phone number      |

**Example:**

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "age": 25,
    "phone": "9876543210"
  }'
```

**Response:** `201 Created`

```json
{
  "_id": "64f...",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 25,
  "phone": "9876543210",
  "createdAt": "2026-11-10T18:00:00.000Z",
  "updatedAt": "2026-11-10T18:00:00.000Z"
}
```

#### List All Users

```http
GET /api/users
```

**Response:** `200 OK` — Array of user objects (sorted by newest first)

#### Delete User

```http
DELETE /api/users/:id
```

**Response:** `200 OK`

```json
{
  "message": "User deleted successfully"
}
```

---

## ⚙️ Environment Variables

The backend reads the following environment variables (configured automatically in `docker-compose.yml`):

| Variable     | Description                | Default (Docker)                   |
| ------------ | -------------------------- | ---------------------------------- |
| `PORT`       | Server listening port      | `5000`                             |
| `MONGO_URI`  | MongoDB connection string  | `mongodb://mongodb:27017/userdb`   |

> **💡 Tip:** For local development, create a `backend/.env` file with these variables.

---

## 💻 Local Development

To run the project **without Docker**, you'll need Node.js 20+ and a local MongoDB instance.

```bash
# Start MongoDB locally (or use MongoDB Atlas)

# Terminal 1 — Backend
cd backend
npm install
cp .env.example .env    # Configure your environment
npm run dev             # Starts with nodemon on port 5000

# Terminal 2 — Frontend
cd frontend
npm install
npm run dev             # Starts Vite dev server on port 5173
```

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

---

Built with ❤️ using the MERN Stack & Docker

</div>
