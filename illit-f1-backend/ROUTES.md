# 🚀 API Routes Summary - ILLIT F1 Backend

## Complete Routes Map

```
/api
├── /health                           # Health Check
├── /users
│   ├── GET /                         # List users (auth)
│   ├── POST /                        # Register
│   └── POST /login                   # Login
├── /products
│   ├── GET /                         # List products
│   └── POST /                        # Create product (auth)
├── /orders                           # Quản lý đơn hàng
│   ├── GET /                         # List my orders (auth)
│   ├── GET /:orderId                 # Get order detail (auth)
│   ├── POST /                        # Create order (auth)
│   ├── PUT /:orderId                 # Update order status (auth)
│   └── DELETE /:orderId              # Delete order (auth)
├── /cart                             # Quản lý giỏ hàng
│   ├── GET /                         # Get cart (auth)
│   ├── POST /items                   # Add to cart (auth)
│   ├── PUT /items/:cartItemId        # Update quantity (auth)
│   ├── DELETE /items/:cartItemId     # Remove from cart (auth)
│   └── DELETE /:cartId               # Clear cart (auth)
├── /reviews                          # Đánh giá sản phẩm
│   ├── GET /product/:productId       # List product reviews
│   ├── GET /my-reviews               # My reviews (auth)
│   ├── POST /                        # Create review (auth)
│   ├── PUT /:reviewId                # Update review (auth)
│   └── DELETE /:reviewId             # Delete review (auth)
├── /vouchers                         # Mã giảm giá
│   ├── GET /                         # List vouchers
│   ├── POST /validate                # Validate voucher
│   ├── POST /                        # Create voucher (auth)
│   ├── PUT /:voucherId               # Update voucher (auth)
│   └── DELETE /:voucherId            # Delete voucher (auth)
├── /f1                               # Dữ liệu F1
│   ├── /races
│   │   ├── GET /races                # List races
│   │   └── GET /races/:raceId        # Race detail
│   ├── /drivers
│   │   ├── GET /drivers              # List drivers
│   │   └── GET /drivers/:driverId    # Driver detail
│   ├── /teams
│   │   ├── GET /teams                # List teams
│   │   └── GET /teams/:teamId        # Team detail
│   └── GET /standings                # Championship standings
├── /chatbot                          # AI Chatbot
│   ├── POST /sessions                # Create chat session (auth)
│   ├── GET /sessions                 # Get my sessions (auth)
│   ├── GET /sessions/:sessionId      # Get session detail (auth)
│   ├── GET /sessions/:sessionId/messages       # Get messages (auth)
│   ├── POST /sessions/:sessionId/messages      # Send message (auth)
│   ├── DELETE /sessions/:sessionId   # Delete session (auth)
│   └── DELETE /sessions/:sessionId/messages    # Clear messages (auth)
├── /roles                            # Quản lý roles
│   ├── GET /                         # List all roles
│   ├── GET /:roleId                  # Get role detail
│   ├── GET /user/:userId             # Get user roles
│   ├── POST /                        # Create role (auth)
│   ├── POST /assign                  # Assign role to user (auth)
│   └── POST /remove                  # Remove role from user (auth)
└── /ai
    └── POST /chat                    # Chat with AI (auth)
```

---

## 📊 Feature Breakdown

### 1️⃣ **User Management** ✅
- Đăng ký tài khoản
- Đăng nhập (JWT Token)
- Lấy danh sách người dùng
- Password hashing (Bcrypt)

### 2️⃣ **Product Management** ✅
- Xem danh sách sản phẩm
- Tạo sản phẩm mới
- Quản lý variants (SKU, color, size)
- Soft delete

### 3️⃣ **Order Management** ✅
- Tạo đơn hàng
- Xem danh sách đơn hàng của user
- Xem chi tiết đơn hàng
- Cập nhật trạng thái đơn hàng
- Xóa đơn hàng

### 4️⃣ **Shopping Cart** ✅
- Tạo/lấy giỏ hàng (per user/session)
- Thêm sản phẩm vào giỏ
- Cập nhật số lượng
- Xóa sản phẩm khỏi giỏ
- Xóa hết giỏ

### 5️⃣ **Product Reviews** ✅
- Xem đánh giá sản phẩm
- Tạo đánh giá (cần admin approve)
- Cập nhật đánh giá
- Xóa đánh giá
- Tính rating trung bình

### 6️⃣ **Vouchers/Discounts** ✅
- Xem danh sách voucher
- Validate voucher
- Tính discount
- Admin tạo/sửa/xóa voucher

### 7️⃣ **F1 Data** ✅
- Danh sách giải đua
- Danh sách tài xế
- Danh sách đội
- Kết quả giải đua
- Bảng xếp hạng

### 8️⃣ **AI Chatbot** ✅
- Chat với Gemini AI
- Lưu lịch sử chat

---

## 🔐 Authentication

### Protected Routes (Requires Token)
```
✅ GET    /api/users
✅ POST   /api/products
✅ GET    /api/orders
✅ POST   /api/orders
✅ PUT    /api/orders/:orderId
✅ DELETE /api/orders/:orderId
✅ GET    /api/cart
✅ POST   /api/cart/items
✅ PUT    /api/cart/items/:cartItemId
✅ DELETE /api/cart/items/:cartItemId
✅ DELETE /api/cart/:cartId
✅ GET    /api/reviews/my-reviews
✅ POST   /api/reviews
✅ PUT    /api/reviews/:reviewId
✅ DELETE /api/reviews/:reviewId
✅ POST   /api/vouchers (admin)
✅ POST   /api/ai/chat
```

### Public Routes (No Auth Required)
```
❌ POST   /api/users (register)
❌ POST   /api/users/login
❌ GET    /api/products
❌ GET    /api/reviews/product/:productId
❌ GET    /api/vouchers
❌ POST   /api/vouchers/validate
❌ GET    /api/f1/* (all F1 routes)
❌ GET    /api/health
```

---

## 📥 Request Examples

### Create Order
```json
POST /api/orders
Authorization: Bearer <token>

{
  "total_amount": 500000,
  "shipping_address": "123 Main Street, Hanoi",
  "guest_email": "user@example.com",
  "guest_phone": "0912345678",
  "items": [
    {
      "variant_id": "uuid",
      "sku_code": "F1-001",
      "product_name": "F1 Merchandise",
      "quantity": 2,
      "price": 250000
    }
  ]
}
```

### Add to Cart
```json
POST /api/cart/items
Authorization: Bearer <token>

{
  "cartId": "uuid",
  "variantId": "uuid",
  "quantity": 1
}
```

### Create Review
```json
POST /api/reviews
Authorization: Bearer <token>

{
  "product_id": "uuid",
  "rating": 5,
  "comment": "Tuyệt vời!",
  "image_url": "https://..."
}
```

### Validate Voucher
```json
POST /api/vouchers/validate

{
  "code": "SUMMER20",
  "orderValue": 500000
}
```

---

## 🎯 Database Models Covered

✅ Users
✅ Products + Product_Variants
✅ Orders + Order_Items
✅ Carts + Cart_Items
✅ Product_Reviews
✅ Vouchers
✅ Race_Schedules + Race_Results
✅ Drivers + Teams
✅ Chatbot_Sessions + Chatbot_Messages

❌ Not Yet Implemented:
- Roles + User_Roles (permission system)
- F1_Knowledge_Base (AI knowledge base)

---

## 🛠️ Development Notes

1. **Input Validation** - Middleware validates all inputs
2. **Error Handling** - Global error handler for consistency
3. **Authentication** - JWT with 1-day expiration
4. **Database** - Prisma ORM + SQL Server
5. **Logging** - Structured logging throughout
6. **Response Format** - Consistent JSON responses

---

**Cập nhật:** 2026-05-28
**Trạng thái:** 8/10 features implemented
