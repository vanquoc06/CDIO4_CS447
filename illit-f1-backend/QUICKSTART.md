# ⚡ Quick Start Guide

## 🚀 5 Minutes to Running API

### Step 1: Clone & Install (1 min)
```bash
cd illit-f1-backend
npm install
```

### Step 2: Configure (1 min)
```bash
cp .env.example .env

# Edit .env:
PORT=8080
DATABASE_URL="sqlserver://localhost:1433;database=ILLIT_F1_System;integratedSecurity=true;encrypt=true;trustServerCertificate=true"
JWT_SECRET="your_secret_here"
GEMINI_API_KEY="your_gemini_key"
```

### Step 3: Database (1 min)
```bash
npm run prisma:migrate
```

### Step 4: Run (30 sec)
```bash
npm run dev
```

### Step 5: Test (30 sec)
```bash
curl http://localhost:8080/api/health
```

Done! ✅ Your API is running at **http://localhost:8080**

---

## 🧪 Quick API Tests

### Register User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "123456",
    "full_name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "123456"
  }'
# Response will have token
```

### Get Products
```bash
curl http://localhost:8080/api/products
```

### Create Product (with token)
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "F1 Merchandise",
    "base_price": 99.99,
    "variants": [
      {
        "sku_code": "F1-001",
        "color": "Red",
        "size": "M",
        "stock_quantity": 50
      }
    ]
  }'
```

### Get F1 Races
```bash
curl http://localhost:8080/api/f1/races
```

### Chat with AI
```bash
curl -X POST http://localhost:8080/api/ai/chat \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Tell me about F1 2026"
  }'
```

---

## 📁 File Locations

- **Start server:** `npm run dev`
- **View logs:** Console output (look for [INFO], [DEBUG], [ERROR])
- **Database:** Check SQL Server
- **API docs:** See `API.md`
- **Routes:** See `ROUTES.md`

---

## 🔧 Common Commands

```bash
npm run dev              # Start dev server
npm run build           # Build TypeScript
npm start              # Run production build
npm run prisma:studio  # Open database UI
npm run type-check     # Check TypeScript
```

---

## 🆘 Troubleshooting

**Q: Port 8080 already in use?**
```bash
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :8080 | kill -9 <PID>
```

**Q: Database connection failed?**
- Check DATABASE_URL in .env
- Verify SQL Server is running
- Test: `sqlcmd -S localhost -U SA -P YourPassword`

**Q: Missing GEMINI_API_KEY?**
1. Get key from [Google Cloud Console](https://console.cloud.google.com)
2. Add to .env
3. Restart server

**Q: TypeScript errors?**
```bash
npm run type-check
npm install
npm run prisma:generate
```

---

## 📚 Learn More

- **Full Setup:** See `SETUP.md`
- **All Routes:** See `ROUTES.md`
- **API Examples:** See `API.md`
- **Architecture:** See `ARCHITECTURE.md`
- **Contributing:** See `CONTRIBUTING.md`

---

## 🎯 Next Steps

1. ✅ Test the API
2. 📖 Read `README.md` for overview
3. 🚀 Explore endpoints in `ROUTES.md`
4. 🏗️ Review `ARCHITECTURE.md`
5. 💻 Start developing!

---

**Happy coding!** 🚀
