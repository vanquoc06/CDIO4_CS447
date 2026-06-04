# 🤝 Contributing Guide

## Code Style & Standards

### TypeScript
- Use strict mode: `"strict": true` in tsconfig.json
- Always type function parameters and returns
- Avoid `any` type - use `unknown` instead if necessary

```typescript
// ✅ Good
export const getUser = async (userId: string): Promise<User | null> => {
  return await prisma.users.findUnique({ where: { user_id: userId } });
};

// ❌ Bad
export const getUser = async (userId) => {
  return await prisma.users.findUnique({ where: { user_id: userId } });
};
```

### Naming Conventions
- **Files**: `camelCase.ts` (e.g., `userService.ts`)
- **Folders**: `camelCase` (e.g., `services/`)
- **Functions**: `camelCase` (e.g., `getAllUsers()`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MIN_PASSWORD_LENGTH`)
- **Classes/Interfaces**: `PascalCase` (e.g., `UserService`)

### File Organization

**Controllers:**
- One controller per domain
- Name: `{domain}.controller.ts`
- Export named functions only

**Services:**
- One service per domain
- Name: `{domain}.service.ts`
- Only database/external API calls here

**Routes:**
- One route file per domain
- Name: `{domain}.routes.ts`
- Import controller functions

```typescript
// ✅ Structure
// controllers/user.controller.ts
export const getUsers = async (req, res) => { ... }

// services/user.service.ts
export const getAllUsers = async () => { ... }

// routes/user.routes.ts
router.get('/', getUsers);
```

---

## Code Quality

### Error Handling
- Always use try-catch in async functions
- Log errors with context
- Return meaningful error messages

```typescript
// ✅ Good
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json({ status: 'success', data: user });
  } catch (error: any) {
    logger.error('Failed to get user', { id: req.params.id, error: error.message });
    res.status(500).json({ status: 'error', message: 'Lỗi khi lấy người dùng' });
  }
};
```

### Input Validation
- Validate in middleware when possible
- Check required fields early
- Provide specific error messages

```typescript
// ✅ Validation middleware
export const validateUserInput = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !validateEmail(email)) {
    return res.status(400).json({ message: 'Email không hợp lệ' });
  }
  
  next();
};
```

### Comments
- Only comment WHY, not WHAT
- Code should be self-documenting

```typescript
// ✅ Good
// User hasn't confirmed email yet, so prevent login
if (!user.email_verified) {
  throw new Error('Email chưa được xác nhận');
}

// ❌ Bad
// Check if email is verified
if (!user.email_verified) {
  throw new Error('Email not verified');
}
```

---

## Creating New Features

### 1. Create Service
```typescript
// src/services/feature.service.ts
import prisma from '../config/database';

export const getFeatures = async () => {
  return await prisma.features.findMany();
};

export const createFeature = async (data: any) => {
  return await prisma.features.create({ data });
};
```

### 2. Create Controller
```typescript
// src/controllers/feature.controller.ts
import * as featureService from '../services/feature.service';

export const getFeatures = async (req: Request, res: Response) => {
  try {
    const features = await featureService.getFeatures();
    res.json({ status: 'success', data: features });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
```

### 3. Create Routes
```typescript
// src/routes/feature.routes.ts
import { Router } from 'express';
import { getFeatures, createFeature } from '../controllers/feature.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', getFeatures);
router.post('/', verifyToken, createFeature);

export default router;
```

### 4. Register Routes
```typescript
// src/index.ts
import featureRoutes from './routes/feature.routes';
app.use('/api/features', featureRoutes);
```

---

## Testing Your Changes

### Local Testing
```bash
# 1. Start server
npm run dev

# 2. Test endpoint with curl
curl http://localhost:8080/api/features

# 3. Or use REST Client (VS Code extension)
GET http://localhost:8080/api/features
```

### Database Testing
```bash
# Open Prisma Studio
npm run prisma:studio

# View your data in UI
```

---

## Commit Message Format

Follow conventional commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (no logic change)
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Build, dependencies

**Examples:**
```
feat(orders): add order status update endpoint

fix(auth): fix token verification issue in middleware

docs(api): update API documentation with new routes

refactor(services): extract common logic into utilities
```

---

## Pull Request Process

### 1. Create Feature Branch
```bash
git checkout -b feature/user-authentication
git checkout -b fix/cart-calculation
```

### 2. Commit Changes
```bash
git add src/
git commit -m "feat(auth): implement JWT token generation"
```

### 3. Push to Remote
```bash
git push origin feature/user-authentication
```

### 4. Create Pull Request
- Add clear description
- Reference related issues
- Request reviewers

### 5. Address Review Comments
- Make requested changes
- Push again
- Request re-review

---

## Performance Guidelines

### Database Queries
```typescript
// ❌ N+1 Problem
const orders = await prisma.orders.findMany();
for (const order of orders) {
  order.user = await prisma.users.findUnique({ where: { user_id: order.user_id } });
}

// ✅ Efficient
const orders = await prisma.orders.findMany({
  include: { Users: true }
});
```

### Pagination
```typescript
// ✅ Always paginate large datasets
const orders = await prisma.orders.findMany({
  skip: (page - 1) * limit,
  take: limit
});
```

### Indexing
```typescript
// Check schema.prisma for indexes
// ✅ Good practice - index on frequently queried fields
model Products {
  @@index([name], map: "IX_Products_Name")
}
```

---

## Security Checklist

Before submitting PR:

- [ ] No hardcoded secrets/keys
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Prisma)
- [ ] XSS protection (JSON responses)
- [ ] Rate limiting considered
- [ ] Authentication on protected routes
- [ ] Proper error handling (no stack traces exposed)
- [ ] Data sanitization

---

## Documentation

### Add JSDoc Comments
```typescript
/**
 * Get user by ID
 * @param userId - The user's unique identifier
 * @returns Promise<User | null> - User object or null if not found
 * @throws Error if database connection fails
 */
export const getUser = async (userId: string): Promise<User | null> => {
  return await prisma.users.findUnique({ where: { user_id: userId } });
};
```

### Update README/API Docs
- New endpoints → Update ROUTES.md
- Architecture changes → Update ARCHITECTURE.md
- Setup changes → Update SETUP.md

---

## Common Issues

### "Module not found" Error
```bash
npm install
npm run prisma:generate
npm run build
```

### Type Errors
```bash
npm run type-check
# Fix any TypeScript errors
```

### Database Schema Changes
```bash
# Update schema.prisma
npx prisma migrate dev --name your_migration_name
```

---

## Resources

- **Prisma Docs**: https://www.prisma.io/docs/
- **Express Best Practices**: https://expressjs.com/en/advanced/best-practice-security.html
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **REST API Standards**: https://restfulapi.net/

---

## Questions?

- Create an issue on GitHub
- Check existing documentation
- Ask in team chat

---

**Last Updated:** 2026-05-28  
**Contributing Guide Version:** 1.0

Thank you for contributing! 🎉
