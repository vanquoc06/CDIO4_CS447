@echo off
echo Starting ILLIT F1 Development Servers...
echo.

echo [1/2] Starting Backend Server (Port 8080)...
start "ILLIT F1 Backend" cmd /k "cd /d illit-f1-backend && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Starting Frontend Server (Port 5173)...
start "ILLIT F1 Frontend" cmd /k "cd /d illit-f1-frontend && npm run dev"

echo.
echo ✅ Both servers are starting!
echo 🚀 Backend:  http://localhost:8080
echo 🎨 Frontend: http://localhost:5173
echo.
pause