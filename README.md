# Task Management Application

A full-stack task management application built with React, Node.js, and MongoDB.

## Features

- User authentication
- Task creation and management
- Drag-and-drop Kanban board
- Task prioritization
- Task archiving
- Statistics dashboard

## Tech Stack

### Frontend

- React
- Vite
- TailwindCSS
- DND Kit
- Axios

### Backend

- Node.js
- Express
- MongoDB
- JWT Authentication
- Mongoose

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   # Install backend dependencies
   cd back-end
   npm install

   # Install frontend dependencies
   cd ../front-end
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the back-end directory with:

   ```
   PORT=9090
   DB_MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the servers:

   ```bash
   # Start backend (from back-end directory)
   npm start

   # Start frontend (from front-end directory)
   npm run dev
   ```

## License

MIT
