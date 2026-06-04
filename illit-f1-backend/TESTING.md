# 🧪 Testing Guide

## Overview
Complete guide to testing the ILLIT F1 API endpoints.

---

## 🛠️ Setup

### Install Testing Tools

#### Option 1: cURL (Windows/Mac/Linux)
```bash
# Already installed on most systems
curl --version
```

#### Option 2: Postman
- Download: https://www.postman.com/downloads/
- Import collection (see below)

#### Option 3: VSCode REST Client Extension
- Install extension: REST Client
- Create file with `.rest` or `.http` extension
- Click "Send Request"

---

## 📝 Test Files

### REST Client Format (.rest files)

**Example: user.rest**
```
### Register User
POST http://localhost:8080/api/users
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "full_name": "Test User"
}

### Login User
POST http://localhost:8080/api/users/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

---

## 🧑‍🔬 Test Scenarios

### 1️⃣ User Management Tests

#### Register User
```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123",
    "full_name": "John Doe"
  }'
```

**Expected:**
```json
{
  "status": "success",
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "newuser@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

#### Login User
```bash
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "Password123"
  }'
```

**Expected:**
```json
{
  "status": "success",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "email": "newuser@example.com",
    "full_name": "John Doe"
  }
}
```

#### Get User Profile
```bash
curl -X GET http://localhost:8080/api/users/:userId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 2️⃣ Product Tests

#### Get All Products
```bash
curl http://localhost:8080/api/products
```

#### Create Product (Admin)
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "F1 Racing Suit",
    "description": "Official F1 racing suit",
    "base_price": 1299.99,
    "category": "Merchandise",
    "variants": [
      {
        "sku_code": "F1-RS-001",
        "color": "Red",
        "size": "M",
        "stock_quantity": 50
      }
    ]
  }'
```

#### Get Product by ID
```bash
curl http://localhost:8080/api/products/:productId
```

#### Update Product
```bash
curl -X PUT http://localhost:8080/api/products/:productId \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "base_price": 999.99
  }'
```

---

### 3️⃣ Order Tests

#### Create Order
```bash
curl -X POST http://localhost:8080/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "product_id": "uuid",
        "variant_id": "uuid",
        "quantity": 2,
        "unit_price": 99.99
      }
    ],
    "total_price": 199.98,
    "shipping_address": "123 Main St, City, Country",
    "payment_method": "credit_card"
  }'
```

#### Get User Orders
```bash
curl http://localhost:8080/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get Order by ID
```bash
curl http://localhost:8080/api/orders/:orderId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Order Status
```bash
curl -X PUT http://localhost:8080/api/orders/:orderId \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "shipped"
  }'
```

---

### 4️⃣ Shopping Cart Tests

#### Get Cart
```bash
curl http://localhost:8080/api/carts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Add Item to Cart
```bash
curl -X POST http://localhost:8080/api/carts/items \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "uuid",
    "variant_id": "uuid",
    "quantity": 1
  }'
```

#### Update Cart Item
```bash
curl -X PUT http://localhost:8080/api/carts/items/:itemId \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

#### Remove Item from Cart
```bash
curl -X DELETE http://localhost:8080/api/carts/items/:itemId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Clear Cart
```bash
curl -X DELETE http://localhost:8080/api/carts \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 5️⃣ Review Tests

#### Create Review
```bash
curl -X POST http://localhost:8080/api/reviews \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": "uuid",
    "rating": 5,
    "comment": "Excellent product! Highly recommend.",
    "title": "Amazing product"
  }'
```

#### Get Product Reviews
```bash
curl http://localhost:8080/api/reviews/product/:productId
```

#### Get User Reviews
```bash
curl http://localhost:8080/api/reviews/user \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Review
```bash
curl -X PUT http://localhost:8080/api/reviews/:reviewId \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 4,
    "comment": "Great product, minor issue"
  }'
```

---

### 6️⃣ Voucher Tests

#### Get All Vouchers
```bash
curl http://localhost:8080/api/vouchers
```

#### Get Voucher by Code
```bash
curl http://localhost:8080/api/vouchers/:code
```

#### Validate Voucher
```bash
curl -X POST http://localhost:8080/api/vouchers/validate \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE20",
    "cart_total": 100.00
  }'
```

#### Create Voucher (Admin)
```bash
curl -X POST http://localhost:8080/api/vouchers \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "SAVE50",
    "discount_type": "percentage",
    "discount_value": 50,
    "max_uses": 100,
    "expiry_date": "2026-12-31",
    "min_order_value": 50.00
  }'
```

---

### 7️⃣ AI Chatbot Tests

#### Create Chat Session
```bash
curl -X POST http://localhost:8080/api/chatbot/sessions \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "F1 2026 Season"
  }'
```

#### Send Message
```bash
curl -X POST http://localhost:8080/api/chatbot/sessions/:sessionId/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me about Lewis Hamilton"
  }'
```

#### Get Message History
```bash
curl http://localhost:8080/api/chatbot/sessions/:sessionId/messages \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get User Sessions
```bash
curl http://localhost:8080/api/chatbot/sessions \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 8️⃣ F1 Data Tests

#### Get All Races
```bash
curl http://localhost:8080/api/f1/races
```

#### Get Race by ID
```bash
curl http://localhost:8080/api/f1/races/:raceId
```

#### Get All Drivers
```bash
curl http://localhost:8080/api/f1/drivers
```

#### Get All Teams
```bash
curl http://localhost:8080/api/f1/teams
```

#### Get Championship Standings
```bash
curl http://localhost:8080/api/f1/standings
```

---

### 9️⃣ Role Management Tests

#### Get All Roles
```bash
curl http://localhost:8080/api/roles
```

#### Assign Role to User (Admin)
```bash
curl -X POST http://localhost:8080/api/roles/assign \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "uuid",
    "role_id": "uuid"
  }'
```

#### Remove Role from User (Admin)
```bash
curl -X DELETE http://localhost:8080/api/roles/users/:userId/roles/:roleId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 Postman Collection

Create `ILLIT-F1-API.postman_collection.json`:

```json
{
  "info": {
    "name": "ILLIT F1 API",
    "description": "Complete API collection for ILLIT F1 e-commerce"
  },
  "item": [
    {
      "name": "Users",
      "item": [
        {
          "name": "Register",
          "request": {
            "method": "POST",
            "url": "{{base_url}}/api/users",
            "header": [{"key": "Content-Type", "value": "application/json"}],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"full_name\": \"Test User\"\n}"
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {"key": "base_url", "value": "http://localhost:8080"}
  ]
}
```

---

## ⚙️ Testing Workflow

### 1. Start Server
```bash
npm run dev
```

### 2. Test Health Check
```bash
curl http://localhost:8080/api/health
# Should return 200 OK
```

### 3. Test Authentication
```bash
# Register
# Login
# Get token
```

### 4. Test Protected Routes
```bash
# Use token in Authorization header
```

### 5. Test Error Cases
```bash
# Invalid token
# Missing fields
# Invalid data
```

---

## ✅ Test Checklist

### Authentication
- [ ] Register new user
- [ ] Login with credentials
- [ ] Access protected endpoint with token
- [ ] Access protected endpoint without token (should fail)
- [ ] Use expired/invalid token (should fail)

### Users
- [ ] Create user
- [ ] Get all users
- [ ] Get user by ID
- [ ] Update user
- [ ] Delete user

### Products
- [ ] Get all products
- [ ] Get product by ID
- [ ] Create product
- [ ] Update product
- [ ] Delete product

### Orders
- [ ] Create order
- [ ] Get user orders
- [ ] Get order by ID
- [ ] Update order status
- [ ] Delete order

### Cart
- [ ] Get cart
- [ ] Add item
- [ ] Update quantity
- [ ] Remove item
- [ ] Clear cart

### Reviews
- [ ] Create review
- [ ] Get product reviews
- [ ] Update review
- [ ] Delete review

### Vouchers
- [ ] Get all vouchers
- [ ] Get voucher by code
- [ ] Validate voucher
- [ ] Create voucher

### Chatbot
- [ ] Create session
- [ ] Send message
- [ ] Get messages
- [ ] Delete session

### F1 Data
- [ ] Get races
- [ ] Get drivers
- [ ] Get teams
- [ ] Get standings

### Roles
- [ ] Get roles
- [ ] Assign role
- [ ] Remove role

---

## 🐛 Debugging

### Enable Debug Logs
```bash
# In .env
DEBUG=*
```

### Check Server Logs
```bash
# Watch console for [DEBUG], [INFO], [WARN], [ERROR]
```

### Verify Database
```bash
npm run prisma:studio
```

### Test with cURL Verbose
```bash
curl -v http://localhost:8080/api/health
```

---

## 📈 Performance Testing

### Test Response Times
```bash
# Single request
time curl http://localhost:8080/api/products

# Multiple requests
for i in {1..100}; do curl http://localhost:8080/api/products; done
```

### Load Testing
```bash
# Install: npm install -g autocannon
autocannon http://localhost:8080/api/health
```

---

## 🚀 Running Tests

### Manual Testing
1. Follow test scenarios above
2. Verify responses
3. Check database changes

### Automated Testing (Future)
```bash
npm run test           # Unit tests
npm run test:e2e      # Integration tests
npm run test:coverage # Coverage report
```

---

## 📝 Test Report Template

```markdown
# Test Report - [Date]

## Summary
- Tests Passed: X/X
- Coverage: X%
- Issues Found: X

## Passed Tests
- [ ] Test name

## Failed Tests
- [ ] Test name
  - Error: 
  - Steps to reproduce:
  - Expected:
  - Actual:

## Notes
- Performance: Good/Fair/Poor
- Stability: Stable/Unstable
- Recommendations: ...
```

---

## 🆘 Common Issues

### Port Already in Use
```bash
# Kill process on port 8080
# Windows:
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :8080 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Database Connection Failed
- Check DATABASE_URL in .env
- Verify SQL Server is running
- Check credentials

### Token Expired
- Login again to get new token
- Update Authorization header

### 401 Unauthorized
- Include valid token in Authorization header
- Check token format: `Bearer <token>`

---

## 📚 Resources

- [cURL Documentation](https://curl.se/docs/)
- [Postman Documentation](https://learning.postman.com/)
- [REST API Testing Best Practices](https://restfulapi.net/testing/)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)

---

**Happy Testing!** 🎉
