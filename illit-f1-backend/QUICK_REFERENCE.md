# 🚀 Quick Reference Guide

Fast lookup for common tasks and commands.

---

## ⚡ Most Used Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build TypeScript
npm start                  # Run production

# Database
npm run prisma:migrate dev         # Create & apply migration
npm run prisma:migrate:deploy      # Deploy migrations
npm run prisma:studio             # Open DB UI
npm run prisma:generate           # Generate client

# Code Quality
npm run type-check         # Type check
npm run lint              # Lint code
npm test                  # Run tests (TBD)
```

---

## 🔑 Environment Variables

```env
# Server
PORT=8080
NODE_ENV=development

# Database
DATABASE_URL=sqlserver://localhost:1433;database=ILLIT_F1_System;...

# Security
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=1d

# AI
GEMINI_API_KEY=your_key_here

# CORS (optional)
CORS_ORIGIN=http://localhost:3000
```

---

## 📝 API Quick Reference

### Health Check
```bash
GET /api/health
```

### Authentication
```bash
# Register
POST /api/users
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "Full Name"
}

# Login
POST /api/users/login
{
  "email": "user@example.com",
  "password": "password123"
}

# Response (token needed for other requests)
{
  "token": "eyJhbGc...",
  "user": { ... }
}

# Use token in Authorization header:
Authorization: Bearer eyJhbGc...
```

### Users (need auth)
```bash
GET    /api/users/:userId
PUT    /api/users/:userId
DELETE /api/users/:userId
```

### Products
```bash
GET    /api/products
GET    /api/products/:productId
POST   /api/products (admin only)
PUT    /api/products/:productId (admin only)
DELETE /api/products/:productId (admin only)
```

### Orders (need auth)
```bash
GET    /api/orders
POST   /api/orders
GET    /api/orders/:orderId
PUT    /api/orders/:orderId
DELETE /api/orders/:orderId
```

### Cart (need auth)
```bash
GET    /api/carts
POST   /api/carts/items
PUT    /api/carts/items/:itemId
DELETE /api/carts/items/:itemId
DELETE /api/carts
```

### Reviews (need auth)
```bash
GET    /api/reviews/product/:productId
GET    /api/reviews/user
POST   /api/reviews
PUT    /api/reviews/:reviewId
DELETE /api/reviews/:reviewId
```

### Vouchers
```bash
GET    /api/vouchers
GET    /api/vouchers/:code
POST   /api/vouchers/validate
POST   /api/vouchers (admin)
PUT    /api/vouchers/:voucherId (admin)
DELETE /api/vouchers/:voucherId (admin)
```

### F1 Data
```bash
GET    /api/f1/races
GET    /api/f1/races/:raceId
GET    /api/f1/drivers
GET    /api/f1/drivers/:driverId
GET    /api/f1/teams
GET    /api/f1/standings
```

### Chatbot (need auth)
```bash
POST   /api/chatbot/sessions
GET    /api/chatbot/sessions
GET    /api/chatbot/sessions/:sessionId
POST   /api/chatbot/sessions/:sessionId/messages
GET    /api/chatbot/sessions/:sessionId/messages
DELETE /api/chatbot/sessions/:sessionId/messages
DELETE /api/chatbot/sessions/:sessionId
```

### Roles (admin only)
```bash
GET    /api/roles
POST   /api/roles
POST   /api/roles/assign
DELETE /api/roles/users/:userId/roles/:roleId
```

---

## 🧪 Quick Test Commands

### Test with cURL

```bash
# Health check
curl http://localhost:8080/api/health

# Get all products
curl http://localhost:8080/api/products

# Register
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123",
    "full_name":"Test User"
  }'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"password123"
  }'

# With token (replace TOKEN)
curl http://localhost:8080/api/users/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 🏗️ Project Structure

```
src/
├── controllers/    (Request handlers)
├── services/       (Business logic)
├── routes/         (Endpoints)
├── middlewares/    (Auth, validation, error)
├── config/         (Constants, logger)
└── index.ts        (Entry point)

prisma/
├── schema.prisma   (Database schema)
└── migrations/     (Schema versions)
```

---

## 🐛 Common Issues & Fixes

### "Port 8080 already in use"
```bash
# Find process on port 8080
netstat -ano | findstr :8080

# Kill it
taskkill /PID <PID> /F
```

### "Database connection failed"
- Check DATABASE_URL in .env
- Ensure SQL Server is running
- Verify connection string

### "TypeScript errors"
```bash
npm install                    # Reinstall deps
npm run prisma:generate       # Generate client
npm run type-check            # Check types
```

### "Module not found"
```bash
rm -rf node_modules
npm install
npm run prisma:generate
```

---

## 📚 Documentation Quick Links

| Task | Document |
|------|----------|
| Get running in 5 min | [QUICKSTART.md](./QUICKSTART.md) |
| Full API reference | [API.md](./API.md) |
| All endpoints map | [ROUTES.md](./ROUTES.md) |
| System design | [ARCHITECTURE.md](./ARCHITECTURE.md) |
| How to test | [TESTING.md](./TESTING.md) |
| Deployment guide | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Database migrations | [MIGRATION.md](./MIGRATION.md) |
| Dev guidelines | [CONTRIBUTING.md](./CONTRIBUTING.md) |
| What's built | [IMPLEMENTATION.md](./IMPLEMENTATION.md) |
| Feature status | [CHECKLIST.md](./CHECKLIST.md) |
| Roadmap | [TODO.md](./TODO.md) |
| Project summary | [SUMMARY.md](./SUMMARY.md) |

---

## 🔐 Common Patterns

### Create Resource
```bash
curl -X POST http://localhost:8080/api/resources \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field1": "value1",
    "field2": "value2"
  }'
```

### Update Resource
```bash
curl -X PUT http://localhost:8080/api/resources/:id \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "field1": "new_value"
  }'
```

### Delete Resource
```bash
curl -X DELETE http://localhost:8080/api/resources/:id \
  -H "Authorization: Bearer TOKEN"
```

### List Resources
```bash
curl http://localhost:8080/api/resources \
  -H "Authorization: Bearer TOKEN"
```

---

## 💻 Development Workflow

1. **Make Changes**
   ```bash
   # Edit src files
   # Changes auto-reload with nodemon
   ```

2. **Schema Changes**
   ```bash
   npm run prisma:migrate dev
   ```

3. **Type Check**
   ```bash
   npm run type-check
   ```

4. **Build**
   ```bash
   npm run build
   ```

5. **Test**
   ```bash
   npm run test
   ```

6. **Deploy**
   ```bash
   npm start
   # Or see DEPLOYMENT.md for options
   ```

---

## 🎯 Role-Based Access

### User (Default)
- ✅ View products
- ✅ Create orders
- ✅ View own profile
- ❌ Manage products
- ❌ Delete orders (own only)

### Moderator
- ✅ All User permissions
- ✅ Approve reviews
- ✅ Manage vouchers
- ❌ Delete orders
- ❌ Manage users

### Admin
- ✅ All permissions
- ✅ Manage users
- ✅ Manage products
- ✅ View reports
- ✅ Manage roles

---

## 📊 Response Format

### Success (2xx)
```json
{
  "status": "success",
  "message": "Operation successful",
  "data": { ... }
}
```

### Error (4xx/5xx)
```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

---

## 🔑 Authentication

### JWT Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token Expiration
- Default: 1 day
- Configure: JWT_EXPIRATION in .env
- Format: "1d", "24h", "86400s"

### Refresh Strategy
- Get new token: Login again
- Automatic: Not yet (see TODO.md)

---

## 🗄️ Database Info

### Tables (18 total)
- Users, Products, Orders, Carts, Reviews, Vouchers
- Races, Drivers, Teams, Race Results
- Chatbot Sessions, Chatbot Messages
- Roles, User Roles, F1 Knowledge Base
- Product Variants, Order Items, Cart Items

### Soft Deletes
- Field: `is_deleted` (boolean)
- Default: false
- Effect: Excluded from queries

### Relationships
- Cascade delete: Parent deletes remove children
- Foreign keys: Enforced at database level
- Indexes: On frequently queried fields

---

## 🛠️ Useful Tips

1. **View Database**
   ```bash
   npm run prisma:studio
   ```

2. **Check Types**
   ```bash
   npm run type-check
   ```

3. **See all routes**
   ```bash
   # Check ROUTES.md or
   # Grep src/routes/*.ts
   ```

4. **View Logs**
   ```bash
   # Watch console output
   # Look for [DEBUG], [INFO], [WARN], [ERROR]
   ```

5. **Test Endpoint**
   ```bash
   # Use curl or Postman
   # See TESTING.md for examples
   ```

---

## 🚀 Deployment Checklist

Before deploying:
- [ ] npm audit passed
- [ ] npm run type-check ok
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] .env configured
- [ ] npm run build successful
- [ ] All tests passing

After deploying:
- [ ] Health check passes
- [ ] Test key endpoints
- [ ] Monitor logs
- [ ] Check error rate

---

## 📞 Need Help?

| Question | Document |
|----------|----------|
| How to start? | [QUICKSTART.md](./QUICKSTART.md) |
| How to use API? | [API.md](./API.md) |
| Where's endpoint X? | [ROUTES.md](./ROUTES.md) |
| How to test? | [TESTING.md](./TESTING.md) |
| How to deploy? | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Database questions? | [MIGRATION.md](./MIGRATION.md) |
| Lost in docs? | [INDEX.md](./INDEX.md) |
| What's done? | [CHECKLIST.md](./CHECKLIST.md) |

---

## ⏱️ Time Estimates

| Task | Time |
|------|------|
| Setup locally | 5 min |
| First API call | 2 min |
| Understand architecture | 30 min |
| Add new endpoint | 15 min |
| Deploy to production | 30 min |
| Write unit tests | 60 min |

---

**Bookmark this page!** 🔖

---

**Last Updated:** 2026-05-28  
**Version:** 1.0.0  
**Status:** ✅ Complete
