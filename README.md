# ILLIT F1 Racing Platform

Full-stack F1 racing website with React frontend and Node.js backend.

## Project Structure

```
f2/
├── illit-f1-frontend/     # React Frontend (JavaScript)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
├── illit-f1-backend/      # Node.js Backend (TypeScript)  
│   ├── src/
│   ├── prisma/
│   ├── package.json
│   └── .env
├── .gitignore
└── README.md
```

## Tech Stack

### Frontend
- **React 19** + **Vite** + **Tailwind CSS v4**
- **React Router v7** for navigation
- **JavaScript** with JSX

### Backend  
- **Node.js** + **Express** + **TypeScript**
- **Prisma ORM** + **SQL Server**
- **JWT Authentication** + **Bcrypt**

## Quick Start

### 1. Start Backend Server
```bash
cd illit-f1-backend
npm install
npm run dev
```
Backend: `http://localhost:8080`

### 2. Start Frontend App
```bash  
cd illit-f1-frontend
npm install  
npm run dev
```
Frontend: `http://localhost:5173`

## Features

✅ **Modern F1-themed UI** with racing animations  
✅ **Full authentication system** (register/login)  
✅ **JWT token management** and session persistence  
✅ **Protected routes** for authenticated users  
✅ **Real-time server status** monitoring  
✅ **SQL Server database** with Prisma ORM  
✅ **Responsive design** for all devices  

## API Endpoints

- `POST /api/users` - User registration
- `POST /api/users/login` - User login  
- `GET /api/users` - Get users (requires JWT)
- `GET /api/health` - Server health check

## Development

Each directory has its own package.json and can be developed independently:

- **Frontend**: Pure React development with Vite hot reload
- **Backend**: TypeScript + Express with nodemon auto-restart  

## Database

Backend uses SQL Server with Prisma ORM for:
- User management and authentication
- Race data and results
- Reviews and ratings

## Authentication Flow

1. Frontend forms → Backend API
2. JWT tokens issued and stored
3. Protected routes verify authentication
4. Session persistence via localStorage

See individual README files in each directory for detailed setup instructions.

## Git Repository Structure

Now organized for easy deployment and development:
- `illit-f1-frontend/` - Complete React app
- `illit-f1-backend/` - Complete Node.js API  
- Separate dependencies and build processes
- Clear separation of concerns