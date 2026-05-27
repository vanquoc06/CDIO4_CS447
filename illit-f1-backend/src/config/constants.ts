// src/config/constants.ts

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

export const ERROR_MESSAGES = {
  INVALID_EMAIL: 'Email không hợp lệ',
  WEAK_PASSWORD: 'Mật khẩu phải từ 6 ký tự trở lên',
  EMPTY_FIELD: 'Trường không được để trống',
  EMAIL_TAKEN: 'Email này đã được sử dụng',
  INVALID_CREDENTIALS: 'Email hoặc mật khẩu không chính xác',
  TOKEN_MISSING: 'Token không được tìm thấy',
  TOKEN_INVALID: 'Token không hợp lệ hoặc đã hết hạn',
  UNAUTHORIZED: 'Bạn không có quyền truy cập',
  NOT_FOUND: 'Tài nguyên không tìm thấy',
  SERVER_ERROR: 'Lỗi server',
  DATABASE_ERROR: 'Lỗi kết nối cơ sở dữ liệu'
};

export const MIN_PASSWORD_LENGTH = 6;
