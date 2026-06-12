# ILLIT F1 Frontend

Frontend React application for ILLIT F1 Racing website with authentication integration.

## Tech Stack

- **React 19** with JSX
- **Vite** build tool
- **Tailwind CSS v4** for styling  
- **React Router v7** for navigation
- **JavaScript** (ES6+)

## Features

✅ **Modern F1-themed UI** with racing animations  
✅ **Authentication system** integrated with backend API  
✅ **Protected routes** (Results, Profile)  
✅ **Responsive design** for all devices  
✅ **Real-time server status** monitoring  
✅ **JWT token management**  

## Pages

- **Homepage** - Landing page with F1 racing theme
- **Drivers** - F1 drivers information
- **Teams** - F1 teams details  
- **Schedule** - Race calendar
- **Results** - Race results (protected)
- **Login** - User authentication
- **Register** - New user registration
- **Profile** - User account management (protected)

## How to Run

### Prerequisites
- Node.js 18+ 
- Backend API running on `http://localhost:8080`

### Installation & Start
```bash
cd illit-f1-frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

## API Integration

Connects to backend API endpoints:
- `POST /api/users` - Registration
- `POST /api/users/login` - Login
- `GET /api/health` - Health check

## Environment

- **Development**: `http://localhost:5173`
- **Backend API**: `http://localhost:8080`
- **Build output**: `dist/` folder

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## Project Structure

```
illit-f1-frontend/
├── src/
│   ├── api/           # API integration layer
│   ├── components/    # Reusable React components
│   ├── context/       # React Context (Auth)
│   ├── pages/         # Page components
│   ├── assets/        # Images, icons
│   ├── App.jsx        # Main app component
│   └── main.jsx       # React entry point
├── public/            # Static assets
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
└── package.json       # Dependencies
```

## Authentication Flow

1. User registers/logs in via forms
2. Frontend calls backend API
3. JWT token received and stored
4. Protected routes check auth status
5. Token sent with future API requests

## Development Notes

- Uses JSX for components (not TypeScript)
- Tailwind CSS for styling with F1 racing theme
- React Context for global auth state
- localStorage for session persistence
- Error handling for network issues