npm # ILLIT F1 Authentication Integration

## Overview
The frontend React app is now connected to the backend API for real authentication instead of localStorage simulation.

## Backend API Endpoints Used

- **POST /api/users** - User Registration
- **POST /api/users/login** - User Login  
- **GET /api/health** - Server Health Check

## How to Run the Full Stack

### 1. Start Backend Server
```bash
cd illit-f1-backend
npm run dev
```
Backend will run on `http://localhost:8080`

### 2. Start Frontend React App
```bash
# From root directory
npm run dev
```
Frontend will run on `http://localhost:5173`

## Features Implemented

### ✅ Real API Integration
- Registration connects to `POST /api/users`
- Login connects to `POST /api/users/login` 
- JWT tokens are stored and managed
- Server health status indicator

### ✅ Enhanced Registration Form
- Full Name (required)
- Email (required)
- Phone Number (optional)
- Password with confirmation
- Real-time server status

### ✅ Enhanced Login Form  
- Email and password authentication
- JWT token storage
- Server connection status
- Error handling for network issues

### ✅ Authentication State Management
- JWT token persistence
- Auto-logout when token is cleared
- Protected routes (Results, Profile)
- User session management

## Authentication Flow

1. **Registration**: User fills form → API call to `/api/users` → Auto-login with JWT
2. **Login**: User credentials → API call to `/api/users/login` → JWT stored → User session created
3. **Logout**: Clear JWT token and user session
4. **Session Persistence**: JWT and user data stored in localStorage

## Error Handling

- Network connection errors
- Server unavailable errors  
- Invalid credentials
- Email already exists
- Password validation

## API Data Format

### Registration Request:
```json
{
  "email": "user@example.com",
  "password": "password123", 
  "full_name": "John Doe",
  "phone_number": "+84901234567"
}
```

### Login Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### API Response:
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": 1,
      "email": "user@example.com", 
      "full_name": "John Doe"
    },
    "token": "jwt_token_here"
  }
}
```

## Security Notes

- JWT tokens are stored in localStorage
- Passwords are hashed with bcrypt on backend
- CORS is enabled for frontend-backend communication
- SQL injection protection via Prisma ORM

## Next Steps

- [ ] Token expiration handling
- [ ] Refresh token implementation  
- [ ] Password reset functionality
- [ ] Email verification
- [ ] User profile update API
- [ ] Admin user management