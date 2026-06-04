# ILLIT F1 Backend API

API backend cho hệ thống e-commerce F1 với AI chatbot, quản lý sản phẩm, đơn hàng và người dùng.

> **🚀 [QUICKSTART.md](./QUICKSTART.md)** - Chạy API trong 5 phút  
> **📖 [INDEX.md](./INDEX.md)** - Chỉ mục tài liệu toàn bộ  
> **📝 [CHECKLIST.md](./CHECKLIST.md)** - Kiểm tra tiến độ

## 🚀 Công nghệ

- **Node.js** + **Express.js** (v5.2.1)
- **TypeScript** (v6.0.3)
- **Prisma ORM** (v6.19.3)
- **SQL Server** Database
- **JWT** + **Bcrypt** (Authentication)
- **Google Generative AI** (Gemini)
- **CORS**, **Dotenv**

## 📋 Cấu trúc dự án

```
src/
├── index.ts                          # Server chính
├── config/
│   ├── database.ts                   # Kết nối Prisma
│   └── constants.ts                  # Hằng số toàn ứng dụng
├── routes/
│   ├── user.routes.ts               # Routes người dùng
│   ├── product.routes.ts            # Routes sản phẩm
│   └── ai.routes.ts                 # Routes AI Chatbot
├── controllers/
│   ├── user.controller.ts           # Xử lý logic người dùng
│   ├── product.controller.ts        # Xử lý logic sản phẩm
│   └── ai.controller.ts             # Xử lý logic AI
├── services/
│   ├── user.service.ts              # Nghiệp vụ người dùng
│   ├── product.service.ts           # Nghiệp vụ sản phẩm
│   └── ai.service.ts                # Nghiệp vụ AI
└── middlewares/
    ├── auth.middleware.ts           # JWT xác thực
    ├── error.middleware.ts          # Xử lý lỗi toàn cục
    └── validation.middleware.ts     # Validation dữ liệu
```

## 🔧 Cài đặt & Chạy

### 1. Cài đặt dependencies
```bash
npm install
```

### 2. Cấu hình biến môi trường
Sao chép `.env.example` thành `.env` và điền các giá trị:
```bash
PORT=8080
DATABASE_URL="sqlserver://..."
JWT_SECRET="your_secret_key"
GEMINI_API_KEY="your_api_key"
NODE_ENV=development
```

### 3. Khởi tạo database
```bash
npx prisma migrate dev
npx prisma db seed  # (nếu có seed file)
```

### 4. Chạy server
```bash
npm run dev       # Development mode với nodemon
npm run build     # Build TypeScript
npm start         # Production mode
```

Server sẽ chạy tại: `http://localhost:8080`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/users` | Đăng ký tài khoản | ❌ |
| POST | `/api/users/login` | Đăng nhập | ❌ |
| GET | `/api/users` | Lấy danh sách người dùng | ✅ |

### Products
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/products` | Lấy danh sách sản phẩm | ❌ |
| POST | `/api/products` | Tạo sản phẩm mới | ✅ |

### Orders
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/orders` | Lấy danh sách đơn hàng | ✅ |
| GET | `/api/orders/:orderId` | Lấy chi tiết đơn hàng | ✅ |
| POST | `/api/orders` | Tạo đơn hàng mới | ✅ |
| PUT | `/api/orders/:orderId` | Cập nhật trạng thái đơn hàng | ✅ |
| DELETE | `/api/orders/:orderId` | Xóa đơn hàng | ✅ |

### Cart
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/cart` | Lấy giỏ hàng | ✅ |
| POST | `/api/cart/items` | Thêm vào giỏ | ✅ |
| PUT | `/api/cart/items/:cartItemId` | Cập nhật số lượng | ✅ |
| DELETE | `/api/cart/items/:cartItemId` | Xóa khỏi giỏ | ✅ |
| DELETE | `/api/cart/:cartId` | Xóa hết giỏ | ✅ |

### Product Reviews
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/reviews/product/:productId` | Lấy đánh giá sản phẩm | ❌ |
| GET | `/api/reviews/my-reviews` | Lấy đánh giá của tôi | ✅ |
| POST | `/api/reviews` | Tạo đánh giá | ✅ |
| PUT | `/api/reviews/:reviewId` | Cập nhật đánh giá | ✅ |
| DELETE | `/api/reviews/:reviewId` | Xóa đánh giá | ✅ |

### Vouchers
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/vouchers` | Lấy danh sách voucher | ❌ |
| POST | `/api/vouchers/validate` | Validate voucher | ❌ |
| POST | `/api/vouchers` | Tạo voucher (admin) | ✅ |
| PUT | `/api/vouchers/:voucherId` | Cập nhật voucher | ✅ |
| DELETE | `/api/vouchers/:voucherId` | Xóa voucher | ✅ |

### F1 Data
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/f1/races` | Lấy danh sách giải đua | ❌ |
| GET | `/api/f1/races/:raceId` | Lấy chi tiết giải đua | ❌ |
| GET | `/api/f1/drivers` | Lấy danh sách tài xế | ❌ |
| GET | `/api/f1/drivers/:driverId` | Lấy chi tiết tài xế | ❌ |
| GET | `/api/f1/teams` | Lấy danh sách đội | ❌ |
| GET | `/api/f1/teams/:teamId` | Lấy chi tiết đội | ❌ |
| GET | `/api/f1/standings` | Lấy bảng xếp hạng | ❌ |

### AI
| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/ai/chat` | Chat với AI | ✅ |

### Health Check
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/health` | Kiểm tra trạng thái server |

## 🔐 Authentication

Sử dụng **JWT Token** trong header:
```
Authorization: Bearer <your_token_here>
```

Token được cấp khi đăng nhập thành công, có hiệu lực **1 ngày**.

## ✅ Validation

### User Validation
- **Email**: Phải hợp lệ (chứa @)
- **Password**: Tối thiểu 6 ký tự
- **Full Name**: Không được để trống (chỉ khi đăng ký)

### Product Validation
- **Name**: Không được để trống
- **Base Price**: Phải là số dương
- **Variants**: Phải có ít nhất 1 biến thể

## 🛡️ Error Handling

Tất cả lỗi được xử lý qua middleware toàn cục:
```json
{
  "status": "fail|error",
  "message": "Mô tả lỗi"
}
```

## 📊 Database Models

Chính: Users, Products, Orders, Carts, Chatbot_Sessions, Race_Schedules, Teams, Drivers, Vouchers

Xem chi tiết: `prisma/schema.prisma`

## 🚀 Tính năng nổi bật

✅ Xác thực JWT an toàn  
✅ Hashing mật khẩu với Bcrypt  
✅ Validation dữ liệu tự động  
✅ Error handling toàn cục  
✅ CORS được cấu hình  
✅ Health check endpoint  
✅ AI Chatbot tích hợp Gemini  
✅ Quản lý sản phẩm với variants  

## 📝 License

ISC

---

**Phát triển bởi:** ILLIT F1 Team  
**Lần cập nhật cuối:** 2026-05-28
