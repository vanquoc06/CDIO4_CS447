# 🚀 Setup & Deployment Guide

## Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x
- **SQL Server** 2019+ hoặc SQL Server Express
- **Git**

---

## 📥 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/vanquoc06/CDIO4_CS447.git
cd CDIO4_ILLIT_F1_System
cd illit-f1-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
# Copy example file
cp .env.example .env

# Edit .env with your values
# - DATABASE_URL: Your SQL Server connection string
# - JWT_SECRET: Generate a secure random string
# - GEMINI_API_KEY: Get from Google Cloud Console
```

### 4. Setup Database
```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view data
npm run prisma:studio
```

### 5. Start Development Server
```bash
npm run dev
```

Server will start at: **http://localhost:8080**

---

## 🔧 Available Commands

```bash
# Development
npm run dev              # Start with nodemon (auto-reload)

# Production
npm run build           # Compile TypeScript to JavaScript
npm start              # Run compiled JavaScript

# Database
npm run prisma:generate # Generate Prisma Client
npm run prisma:migrate # Run database migrations
npm run prisma:studio  # Open Prisma Studio UI

# Linting
npm run lint           # Type check TypeScript
npm run type-check     # Check for type errors
```

---

## 🗄️ Database Setup

### SQL Server Connection String

**Windows Authentication:**
```
sqlserver://localhost:1433;database=ILLIT_F1_System;integratedSecurity=true;encrypt=true;trustServerCertificate=true
```

**SQL Authentication:**
```
sqlserver://SA:YourPassword@localhost:1433;database=ILLIT_F1_System;encrypt=true;trustServerCertificate=true
```

### Create Database
```sql
-- Run in SQL Server Management Studio
CREATE DATABASE ILLIT_F1_System;
```

### Run Migrations
```bash
npm run prisma:migrate dev --name init
```

---

## 🔑 Getting API Keys

### 1. Google Gemini API
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Google Generative AI API"
4. Create API key (Credentials → Create Credential → API Key)
5. Copy key to `GEMINI_API_KEY`

### 2. JWT Secret
```bash
# Generate a secure random string
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📝 Example .env File

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL="sqlserver://localhost:1433;database=ILLIT_F1_System;integratedSecurity=true;encrypt=true;trustServerCertificate=true"

# Authentication
JWT_SECRET="your_super_secret_key_here_min_32_chars"

# APIs
GEMINI_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

---

## ✅ Verify Installation

### Check Server Health
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "Server hoạt động bình thường",
  "database": "connected"
}
```

### Test User Registration
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "full_name": "Test User"
  }'
```

---

## 🔄 Development Workflow

### 1. Start Server
```bash
npm run dev
```

### 2. Make Changes
- Edit files in `src/`
- Server automatically restarts (nodemon)

### 3. Test Endpoints
```bash
# Use curl, Postman, or VS Code REST Client
curl http://localhost:8080/api/users
```

### 4. View Logs
```bash
# Check console for [DEBUG], [INFO], [WARN], [ERROR] messages
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@prisma/client'"
```bash
npm install
npm run prisma:generate
```

### Issue: "Database connection failed"
- Check `DATABASE_URL` in `.env`
- Verify SQL Server is running
- Test connection: `sqlcmd -S localhost -U SA -P YourPassword`

### Issue: "GEMINI_API_KEY is not set"
- Add `GEMINI_API_KEY` to `.env`
- Restart the server

### Issue: "Port 8080 already in use"
```bash
# Change PORT in .env or kill the process
# Linux/Mac:
lsof -i :8080 | kill -9 <PID>

# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

---

## 🚢 Production Deployment

### 1. Build Application
```bash
npm run build
```

### 2. Set Environment Variables
```bash
export NODE_ENV=production
export PORT=3000
export DATABASE_URL="production_db_url"
export JWT_SECRET="production_secret_key"
export GEMINI_API_KEY="your_api_key"
```

### 3. Start Server
```bash
npm start
```

### 4. Use Process Manager (Recommended)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start dist/index.js --name "illit-f1-api"

# Monitor
pm2 monit

# View logs
pm2 logs illit-f1-api
```

### 5. Setup Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name api.illit-f1.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 6. SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot
certbot certonly --nginx -d api.illit-f1.com
```

---

## 📊 Performance Tips

1. **Enable Compression**
   ```bash
   npm install compression
   ```

2. **Add Caching Headers**
   ```typescript
   app.use((req, res, next) => {
     res.set('Cache-Control', 'public, max-age=300');
     next();
   });
   ```

3. **Use Database Indexes**
   - Already set on: email, sku_code, user_id

4. **Monitor Performance**
   ```bash
   npm install clinic
   clinic doctor -- npm start
   ```

---

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc7519)

---

## ✨ Next Steps

1. ✅ Setup is complete
2. 📖 Read [README.md](./README.md) for API overview
3. 🚀 Check [ROUTES.md](./ROUTES.md) for all endpoints
4. 🏗️ Review [ARCHITECTURE.md](./ARCHITECTURE.md) for system design
5. 💻 Start developing!

---

**Last Updated:** 2026-05-28  
**Guide Version:** 1.0
