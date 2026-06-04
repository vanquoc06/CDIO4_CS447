# API Documentation - ILLIT F1 Backend

## Base URL
```
http://localhost:8080/api
```

## 🔍 Health Check

### GET /health
Kiểm tra trạng thái server và kết nối database.

**Response:**
```json
{
  "status": "success",
  "message": "Server hoạt động bình thường",
  "timestamp": "2026-05-28T01:24:54.072Z",
  "database": "connected",
  "uptime": 125.456
}
```

---

## 👤 User Endpoints

### POST /users
Đăng ký tài khoản mới.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "123456",
  "full_name": "John Doe",
  "phone_number": "0912345678"
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Tạo tài khoản thành công!",
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "full_name": "John Doe"
  }
}
```

**Error (400):**
```json
{
  "status": "fail",
  "message": "Email không hợp lệ"
}
```

---

### POST /users/login
Đăng nhập tài khoản.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "message": "Đăng nhập thành công!",
  "data": {
    "user": {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "full_name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error (401):**
```json
{
  "status": "fail",
  "message": "Mật khẩu không chính xác!"
}
```

---

### GET /users
Lấy danh sách tất cả người dùng. **Yêu cầu authentication**

**Headers:**
```
Authorization: Bearer <your_token>
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "email": "user@example.com",
      "full_name": "John Doe",
      "created_at": "2026-05-28T01:24:54.072Z"
    }
  ],
  "count": 1
}
```

---

## 🛍️ Product Endpoints

### GET /products
Lấy danh sách tất cả sản phẩm. **Không yêu cầu authentication**

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "product_id": "650e8400-e29b-41d4-a716-446655440001",
      "name": "F1 Merchandise",
      "description": "Official F1 merchandise",
      "base_price": 99.99,
      "Product_Variants": [
        {
          "variant_id": "750e8400-e29b-41d4-a716-446655440002",
          "sku_code": "F1-MERCH-001",
          "color": "Red",
          "size": "M",
          "stock_quantity": 50
        }
      ]
    }
  ],
  "count": 1
}
```

---

### POST /products
Tạo sản phẩm mới. **Yêu cầu authentication**

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "F1 Merchandise",
  "description": "Official F1 merchandise",
  "base_price": 99.99,
  "variants": [
    {
      "sku_code": "F1-MERCH-001",
      "color": "Red",
      "size": "M",
      "stock_quantity": 50
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "message": "Thêm sản phẩm thành công!",
  "data": {
    "product_id": "650e8400-e29b-41d4-a716-446655440001",
    "name": "F1 Merchandise",
    "base_price": 99.99,
    "Product_Variants": [...]
  }
}
```

---

## 🤖 AI Chat Endpoints

### POST /ai/chat
Chat với Gemini AI. **Yêu cầu authentication**

**Headers:**
```
Authorization: Bearer <your_token>
Content-Type: application/json
```

**Request:**
```json
{
  "prompt": "Hãy kể cho tôi về tiêu đề F1 năm 2026"
}
```

**Response (200 OK):**
```json
{
  "status": "success",
  "data": "Năm 2026 là một năm quan trọng trong giải đua công thức 1..."
}
```

**Error (400):**
```json
{
  "status": "fail",
  "message": "Bạn chưa nhập câu hỏi (prompt)!"
}
```

---

## 🔐 Authentication

### JWT Token Format
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTUwZTg0MDAtZTI5Yi00MWQ0LWE3MTYtNDQ2NjU1NDQwMDAwIiwiaWF0IjoxNjExNjA4MTk4LCJleHAiOjE2MTE2OTQ1OTh9.xxx
```

### Token Expiration
- **Thời hạn**: 1 ngày (24 giờ)
- **Cần tạo token mới khi hết hạn**

---

## ✅ Validation Rules

### User Validation
| Field | Rules |
|-------|-------|
| email | Phải hợp lệ (chứa @) |
| password | Tối thiểu 6 ký tự |
| full_name | Không được để trống |
| phone_number | Tùy chọn |

### Product Validation
| Field | Rules |
|-------|-------|
| name | Không được để trống |
| base_price | Phải là số dương |
| variants | Phải có ít nhất 1 |
| sku_code | Phải là duy nhất (unique) |

---

## 🛡️ Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request thành công |
| 201 | Created | Tài nguyên được tạo thành công |
| 400 | Bad Request | Dữ liệu không hợp lệ |
| 401 | Unauthorized | Không có quyền truy cập (token không hợp lệ) |
| 404 | Not Found | Route/resource không tồn tại |
| 409 | Conflict | Dữ liệu đã tồn tại (email, SKU) |
| 500 | Server Error | Lỗi server |
| 503 | Service Unavailable | Database không kết nối |

---

## 📝 Examples

### Example 1: Đăng ký → Đăng nhập → Lấy danh sách user

```bash
# 1. Đăng ký
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456",
    "full_name": "Test User"
  }'

# 2. Đăng nhập
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "123456"
  }'
# Response sẽ có token

# 3. Lấy danh sách (với token từ bước 2)
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer <your_token>"
```

### Example 2: Chat với AI

```bash
curl -X POST http://localhost:8080/api/ai/chat \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "F1 2026 sẽ có những thay đổi gì?"
  }'
```

---

**Phiên bản API:** 1.0.0  
**Cập nhật lần cuối:** 2026-05-28
