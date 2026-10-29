# Task Manager REST API

A RESTful Task Manager API built with **Node.js, Express.js, MongoDB, and Mongoose**. It provides user authentication with JSON Web Tokens (JWT) and password hashing with bcrypt.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT-based authentication for protected routes
- Create, read, update, and delete tasks
- User-specific task access: users can access only their own tasks
- Request validation with `express-validator`
- Consistent HTTP status codes and error handling
- Environment-based configuration with `dotenv`

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (`jsonwebtoken`)
- `bcryptjs`
- `express-validator`
- `dotenv`
- Nodemon for development

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/VaishnaviBankar14/Task_Manager_Api.git
cd Task_Manager_Api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root. Use `.env.example` as a reference.

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/task_manager_db
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=1d
```

Replace the example JWT secret with a strong, private random value. Never commit your real `.env` file or share your JWT secret.

### 4. Start MongoDB

Make sure your local MongoDB server is running. If you use a MongoDB Atlas database, set `MONGODB_URI` to your Atlas connection string instead.

### 5. Start the API

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

By default, the API runs at `http://localhost:5000`.

## API Endpoints

### Health Check

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `GET` | `/api/health` | Check whether the API is running | No |

### Authentication

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in and receive a JWT | No |
| `GET` | `/api/auth/me` | Get the logged-in user's profile | Yes |

### Tasks

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| `POST` | `/api/tasks` | Create a task | Yes |
| `GET` | `/api/tasks` | List the logged-in user's tasks | Yes |
| `GET` | `/api/tasks/:id` | Get a task by ID | Yes |
| `PUT` | `/api/tasks/:id` | Update a task | Yes |
| `DELETE` | `/api/tasks/:id` | Delete a task | Yes |

Protected endpoints require this request header:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

In Postman, select **Authorization → Bearer Token** and paste the token into the token field.

## Example Requests

### Register a user

`POST /api/auth/register`

```json
{
  "name": "Example User",
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

### Log in

`POST /api/auth/login`

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

Use the JWT returned by a successful login for protected requests.

### Create a task

`POST /api/tasks`

```json
{
  "title": "Complete API project",
  "description": "Test and document the Task Manager API",
  "status": "pending"
}
```

Supported task statuses:

- `pending`
- `in-progress`
- `completed`

A task can also include an optional `dueDate` if it is accepted by the task validator.

## HTTP Status Codes

| Status | Meaning |
|---|---|
| `200 OK` | Request completed successfully |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Invalid input, validation error, or invalid task ID |
| `401 Unauthorized` | Missing or invalid authentication, or invalid login credentials |
| `404 Not Found` | Task not found or not accessible to the current user |
| `409 Conflict` | Registration email already exists |
| `500 Internal Server Error` | Unexpected server-side error |

## Security Notes

- Passwords are hashed before being stored.
- JWT authentication protects task routes.
- Task database queries include the authenticated user's ID to enforce ownership.
- Secrets are read from environment variables.
- `.env` and `node_modules/` should remain excluded from version control.

## Testing

Use [Postman](https://www.postman.com/) to test:

- Registration and login
- Retrieving the authenticated user's profile
- Creating, listing, retrieving, updating, and deleting tasks
- Requests without a token and with an invalid token
- Invalid task IDs and invalid task statuses
- Duplicate email registration and incorrect passwords
- Task ownership using two different user accounts

## Project Structure

```text
task-manager-api/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── validators/
│   │   ├── authValidator.js
│   │   └── taskValidator.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── package-lock.json
```

## Repository

[View Task Manager REST API on GitHub](https://github.com/VaishnaviBankar14/Task_Manager_Api)
