
# Team Task Manager

A minimalist and modern task management application built with vanilla JavaScript, HTML, and CSS.

## Features

- User authentication (register/login) with JWT
- Create, view, and delete tasks
- Modern UI with responsive design
- Secure password hashing with bcrypt

## Tech Stack

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- bcrypt for password hashing

### Frontend
- Vanilla HTML
- CSS (modern and minimalist design)
- JavaScript

## Setup Instructions

### Prerequisites
- Node.js (v12+)
- PostgreSQL

### Backend Setup

1. Navigate to the server directory:
```
cd server
```

2. Install dependencies:
```
npm install
```

3. Create a PostgreSQL database:
```
psql -U postgres
CREATE DATABASE taskmanager;
\q
```

4. Run the SQL script to create tables:
```
psql -U postgres -d taskmanager -f database.sql
```

5. Create a .env file based on .env.example and update with your database credentials and JWT secret.

6. Start the server:
```
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```
cd client
```

2. Open the application in a web browser:
- Open index.html in your browser
- Or use a simple server like Live Server extension in VS Code

## API Routes

- POST /api/register - Register a new user
- POST /api/login - Login and get JWT token
- GET /api/tasks - Get all tasks for authenticated user
- POST /api/tasks - Create a new task
- DELETE /api/tasks/:id - Delete a specific task

## Project Structure

```
└── team-task-manager/
    ├── client/
    │   ├── css/
    │   │   └── styles.css
    │   ├── js/
    │   │   ├── api.js
    │   │   ├── app.js
    │   │   ├── auth.js
    │   │   └── tasks.js
    │   └── index.html
    └── server/
        ├── server.js
        ├── database.sql
        ├── .env.example
        └── package.json
```
