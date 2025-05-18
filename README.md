# Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Features

- User authentication (register/login)
- Create, read, update, and delete tasks
- Task categorization
- Priority levels
- Status tracking
- Filtering tasks by status and priority
- Responsive design with Tailwind CSS

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Headless UI

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd task-management-app
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your-secret-key
```

4. Set up the frontend:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Tasks
- GET `/api/tasks` - Get all tasks for the authenticated user
- POST `/api/tasks` - Create a new task
- PUT `/api/tasks/:id` - Update a task
- DELETE `/api/tasks/:id` - Delete a task
- GET `/api/tasks/category/:category` - Get tasks by category
- GET `/api/tasks/status/:status` - Get tasks by status

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 