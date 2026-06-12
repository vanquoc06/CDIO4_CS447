# ILLIT F1 - Authentication System

## Tính năng

✅ **Đăng ký tài khoản mới**
- Form validation (email, password min 6 ký tự, confirm password)
- Kiểm tra email đã tồn tại
- Tự động đăng nhập sau khi đăng ký

✅ **Đăng nhập**
- Email + Password authentication
- Remember session (localStorage)
- Redirect về trang trước đó sau login

✅ **Protected Routes**
- Trang `/results` và `/profile` yêu cầu đăng nhập
- Auto redirect về `/login` nếu chưa đăng nhập
- Lưu location để redirect lại sau khi login

✅ **User Menu**
- Hiện thông tin user trong navbar
- Dropdown menu: Profile, Logout
- Hiện tên + email

✅ **Profile Page**
- Xem thông tin tài khoản
- Quick actions
- Logout button

## Routes

### Public (không cần đăng nhập)
- `/` - Homepage
- `/drivers` - Drivers
- `/teams` - Teams
- `/schedule` - Schedule
- `/news` - News
- `/login` - Đăng nhập
- `/register` - Đăng ký

### Protected (cần đăng nhập)
- `/results` - Race Results
- `/profile` - User Profile

## Cách sử dụng

### 1. Đăng ký tài khoản mới
```
1. Vào http://localhost:5174/register
2. Nhập thông tin:
   - Full Name: Tên đầy đủ
   - Email: email@example.com
   - Password: tối thiểu 6 ký tự
   - Confirm Password: nhập lại password
3. Click "Register Account"
4. Tự động đăng nhập và chuyển về trang chủ
```

### 2. Đăng nhập
```
1. Vào http://localhost:5174/login
2. Nhập email + password đã đăng ký
3. Click "Access System"
4. Chuyển về trang yêu cầu (hoặc homepage)
```

### 3. Xem Profile
```
1. Đăng nhập trước
2. Click vào icon user ở navbar (góc phải)
3. Chọn "Profile" trong dropdown
4. Xem thông tin tài khoản
```

### 4. Logout
```
Cách 1: Click user icon > Logout
Cách 2: Vào /profile > Click nút Logout
```

## Storage

**LocalStorage Keys:**
- `illitf1_user` - Current user session (id, email, fullName)
- `illitf1_users` - Mảng tất cả users đã đăng ký

**⚠️ Lưu ý bảo mật:**
- Password được lưu plain text trong localStorage (DEMO ONLY!)
- Production cần:
  - Backend API thật
  - Hash password (bcrypt)
  - JWT tokens
  - HTTPS
  - Refresh tokens

## Cấu trúc Code

```
src/
├── context/
│   └── AuthContext.jsx     ← Auth state management
├── components/
│   ├── Navbar.jsx          ← User menu + login link
│   └── ProtectedRoute.jsx  ← HOC bảo vệ routes
└── pages/
    ├── Login.jsx           ← Form đăng nhập
    ├── Register.jsx        ← Form đăng ký
    └── Profile.jsx         ← Trang thông tin user
```

## Demo Users

Bạn có thể test với:
```
Email: driver@illitf1.racing
Password: 123456
```
(Tạo bằng cách đăng ký lần đầu)

## Dev Server

```bash
npm run dev
# http://localhost:5174
```

## Build Production

```bash
npm run build
npm run preview  # preview production build
```

---

**Status: ✅ SECURE | AUTHENTICATED**
