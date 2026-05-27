# 🏗️ Architecture Document - ILLIT F1 Backend

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Client (Frontend)                 │
└────────────────────┬────────────────────────────────┘
                     │ HTTP/REST
                     ↓
┌─────────────────────────────────────────────────────┐
│              Express.js API Gateway                 │
│  (Port 8080)                                        │
└────────┬────────────────────────────────┬───────────┘
         │                                │
    ┌────↓──────┐                   ┌────↓──────┐
    │ CORS       │                   │ Request   │
    │ Middleware │                   │ Logger    │
    └────────────┘                   └───────────┘
         │                                │
         └────────────┬───────────────────┘
                      ↓
         ┌────────────────────────┐
         │   Route Handlers       │
         │ (/api/users, /orders)  │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │  JWT Authentication    │
         │  (verifyToken)         │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │   Input Validation     │
         │ (validateUserInput)    │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │  Controller Layer      │
         │ (userController.ts)    │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │   Service Layer        │
         │ (userService.ts)       │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │   Prisma ORM           │
         │ (Database Query)       │
         └──────────┬─────────────┘
                    ↓
         ┌────────────────────────┐
         │   SQL Server           │
         │   Database             │
         └────────────────────────┘
```

---

## 📁 Folder Structure

```
src/
├── config/                          # Configuration & Setup
│   ├── database.ts                  # Prisma Client
│   ├── logger.ts                    # Logging utility
│   └── constants.ts                 # Constants & Messages
│
├── middlewares/                     # Express Middlewares
│   ├── auth.middleware.ts           # JWT Verification
│   ├── error.middleware.ts          # Global Error Handler
│   └── validation.middleware.ts     # Input Validation
│
├── routes/                          # Route Definitions
│   ├── user.routes.ts
│   ├── product.routes.ts
│   ├── order.routes.ts
│   ├── cart.routes.ts
│   ├── review.routes.ts
│   ├── voucher.routes.ts
│   ├── race.routes.ts
│   ├── ai.routes.ts
│
├── controllers/                     # Business Logic Handlers
│   ├── user.controller.ts
│   ├── product.controller.ts
│   ├── order.controller.ts
│   ├── cart.controller.ts
│   ├── review.controller.ts
│   ├── voucher.controller.ts
│   ├── race.controller.ts
│   ├── ai.controller.ts
│
├── services/                        # Database & External API Calls
│   ├── user.service.ts
│   ├── product.service.ts
│   ├── order.service.ts
│   ├── cart.service.ts
│   ├── review.service.ts
│   ├── voucher.service.ts
│   ├── race.service.ts
│   ├── ai.service.ts
│
└── index.ts                         # Server Entry Point
```

---

## 🔄 Request Flow Example

### User Registration Flow

```
1. Client sends POST /api/users
   {
     "email": "user@example.com",
     "password": "123456",
     "full_name": "John Doe"
   }

2. Express receives request
   ↓

3. CORS & JSON middleware parse body
   ↓

4. Route handler matches /api/users
   ↓

5. validateUserInput middleware runs
   - Check email format
   - Check password length
   - Check full_name
   ✗ If validation fails → 400 response
   ✓ If passes → next()
   ↓

6. createUser controller runs
   - Extract data from req.body
   - Call userService.createUser()
   ↓

7. userService.createUser() runs
   - Hash password with bcrypt
   - Create user in database via Prisma
   ↓

8. Database returns created user
   ↓

9. Controller returns 201 response with user data
   ↓

10. Client receives success response
```

---

## 🔐 Security Layers

### 1. **Input Validation**
- Email format validation
- Password strength check (min 6 chars)
- Required field validation
- Type checking

### 2. **Authentication**
- JWT Token verification
- Bearer token extraction
- Token expiration check (1 day)

### 3. **Password Security**
- Bcrypt hashing (salt rounds: 10)
- Never store plain passwords
- Compare hashes during login

### 4. **Database Security**
- Soft deletes (is_deleted flag)
- Transaction support
- SQL Injection prevention (Prisma ORM)

### 5. **Error Handling**
- Sensitive data never leaked
- Consistent error messages
- Logging for debugging

---

## 📊 Data Models

### User Model
```
Users
├── user_id (PK)
├── email (Unique)
├── password_hash
├── full_name
├── phone_number
├── status (active/inactive)
├── is_deleted (soft delete)
├── created_at
├── updated_at
└── Relations:
    ├── Carts
    ├── Orders
    ├── Product_Reviews
    ├── Chatbot_Sessions
    └── User_Roles
```

### Product Model
```
Products
├── product_id (PK)
├── name
├── description
├── base_price
├── is_deleted (soft delete)
├── created_at
└── Relations:
    ├── Product_Variants (1:N)
    └── Product_Reviews (1:N)

Product_Variants
├── variant_id (PK)
├── product_id (FK)
├── sku_code (Unique)
├── color
├── size
├── price_override
├── stock_quantity
├── version
└── Relations:
    ├── Cart_Items
    └── Order_Items
```

### Order Model
```
Orders
├── order_id (PK)
├── user_id (FK - nullable)
├── guest_email
├── guest_phone
├── total_amount
├── status (Pending/Processing/Shipped/Delivered)
├── shipping_address
├── created_at
└── Relations:
    └── Order_Items (1:N)

Order_Items
├── item_id (PK)
├── order_id (FK)
├── variant_id (FK)
├── sku_code_snapshot
├── product_name_snapshot
├── quantity
├── price_at_purchase
└── Relations:
    └── Products & Carts
```

---

## 🔄 Common Patterns

### 1. **Controller Pattern**
```typescript
export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await userService.getUser(req.params.id);
    res.status(200).json({ status: 'success', data });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
```

### 2. **Service Pattern**
```typescript
export const getUser = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { user_id: userId }
  });
  return user;
};
```

### 3. **Middleware Pattern**
```typescript
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  // Verify token logic
  next();
};
```

---

## 🚀 Performance Considerations

### 1. **Database Queries**
- Use Prisma select() to fetch only needed fields
- Implement pagination for large datasets
- Add indexes on frequently queried columns

### 2. **Caching**
- Consider Redis for session/cart data
- Cache product list with TTL

### 3. **Async Operations**
- All DB queries are async
- Proper error handling with try-catch

---

## 📝 Logging Strategy

### Log Levels
```
DEBUG   → Development info
INFO    → Important events
WARN    → Warning situations
ERROR   → Critical errors
```

### What Gets Logged
- Server startup/shutdown
- All authentication attempts
- Database errors
- API errors
- Validation failures

---

## 🔄 Response Format

### Success Response
```json
{
  "status": "success",
  "message": "Operation completed",
  "data": { ... }
}
```

### Error Response
```json
{
  "status": "fail|error",
  "message": "Human readable error message"
}
```

### Paginated Response
```json
{
  "status": "success",
  "data": [ ... ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```

---

## 🧪 Testing Strategy

### Unit Tests
- Service layer functions
- Validation functions
- Utility functions

### Integration Tests
- API endpoints
- Database interactions
- Authentication flow

### E2E Tests
- Complete user workflows
- Order creation → payment

---

**Diagram Updated:** 2026-05-28
**Architecture Version:** 1.0
