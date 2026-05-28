# 📦 Database Migration Guide

Complete guide to managing database schema changes with Prisma.

---

## 🎯 Overview

Prisma migrations track schema changes and ensure consistency across environments.

---

## 🚀 Quick Start

### First Time Setup
```bash
# Generate migrations from existing database
npm run prisma:db pull

# Create initial migration
npm run prisma:migrate dev --name init

# View database in UI
npm run prisma:studio
```

### Regular Development
```bash
# Make changes to schema.prisma
nano prisma/schema.prisma

# Create migration
npm run prisma:migrate dev --name "add_feature_name"

# This will:
# 1. Generate SQL files
# 2. Create migration
# 3. Apply to development database
# 4. Generate Prisma Client
```

---

## 📝 Migration Workflow

### Step 1: Update Schema
```prisma
// prisma/schema.prisma

model Users {
  id              String   @id @default(cuid())
  email           String   @unique
  password        String
  full_name       String
  phone_number    String   // NEW FIELD
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  is_deleted      Boolean  @default(false)

  @@index([email])
}
```

### Step 2: Create Migration
```bash
npm run prisma:migrate dev --name "add_phone_number_to_users"
```

### Step 3: Review Generated SQL
```bash
# Check generated migration file
cat prisma/migrations/<timestamp>_<name>/migration.sql
```

### Step 4: Test Migration
```bash
# Apply to development
npm run prisma:migrate dev

# Run tests
npm test

# Verify in Prisma Studio
npm run prisma:studio
```

### Step 5: Deploy to Production
```bash
# On production server
npm run prisma:migrate deploy

# Verify
npm run prisma:status
```

---

## 🔧 Common Migration Commands

### Create Migration
```bash
# Interactive migration (recommended)
npm run prisma:migrate dev

# Create migration without applying
npm run prisma:migrate create --name "add_something"

# Migration with description
npm run prisma:migrate dev --name "add_email_field_to_users"
```

### Apply Migration
```bash
# Development (creates and applies)
npm run prisma:migrate dev

# Production (applies existing)
npm run prisma:migrate deploy

# Specific environment
prisma migrate deploy --schema=prisma/schema.prod.prisma
```

### Reset Database
```bash
# ⚠️ WARNING: Deletes all data
npm run prisma:migrate reset

# Confirmation required
# This will:
# 1. Drop database
# 2. Create new database
# 3. Run all migrations
# 4. Seed data (if seed script exists)
```

### Check Status
```bash
npm run prisma:status
```

### View Migrations
```bash
# List all migrations
ls -la prisma/migrations/

# View specific migration
cat prisma/migrations/20240101120000_init/migration.sql
```

### Rollback Migration
```bash
# Resolve pending migration (interactive)
npm run prisma:migrate resolve --rolled-back --name "add_phone_number_to_users"

# After:
# 1. Fix schema.prisma
# 2. Create new migration
# 3. Run: npm run prisma:migrate dev
```

---

## 📊 Migration Examples

### Add New Table
```prisma
model Products {
  id              String   @id @default(cuid())
  name            String
  base_price      Decimal
  category        String
  created_at      DateTime @default(now())
  updated_at      DateTime @updatedAt
  is_deleted      Boolean  @default(false)
}
```

Migration:
```bash
npm run prisma:migrate dev --name "add_products_table"
```

### Add Column
```prisma
model Users {
  // ... existing fields ...
  phone_number    String?  // Optional
  address         String?
  city            String?
}
```

Migration:
```bash
npm run prisma:migrate dev --name "add_contact_fields_to_users"
```

### Add Index
```prisma
model Orders {
  id              String   @id @default(cuid())
  user_id         String
  order_date      DateTime
  
  @@index([user_id])
  @@index([order_date])
}
```

Migration:
```bash
npm run prisma:migrate dev --name "add_indexes_to_orders"
```

### Create Relationship
```prisma
model Orders {
  id              String   @id @default(cuid())
  user_id         String
  user            Users    @relation(fields: [user_id], references: [id], onDelete: Cascade)
  
  @@index([user_id])
}

model Users {
  id              String   @id @default(cuid())
  orders          Orders[]
}
```

Migration:
```bash
npm run prisma:migrate dev --name "add_user_orders_relationship"
```

### Rename Column
```prisma
// Old:
// name String

// New:
product_name String
```

Generated migration might need manual adjustment:
```sql
-- migration.sql
ALTER TABLE Products RENAME COLUMN name TO product_name;
```

### Change Column Type
```prisma
// Old:
// price Int

// New:
price Decimal
```

Manual migration:
```sql
ALTER TABLE Products ALTER COLUMN price DECIMAL(10, 2);
```

### Add Constraint
```prisma
model Orders {
  id              String   @id @default(cuid())
  total_price     Decimal  @default(0)
  status          String   @default("pending")
  
  // Constraint: total_price must be >= 0
  // Note: Prisma doesn't support CHECK constraints directly
  // Add manually in migration SQL if needed
}
```

---

## 🗂️ Migration File Structure

```
prisma/
├── migrations/
│   ├── 20240101000000_init/
│   │   └── migration.sql
│   ├── 20240115120000_add_products/
│   │   └── migration.sql
│   ├── 20240120150000_add_phone_to_users/
│   │   └── migration.sql
│   └── migration_lock.toml
└── schema.prisma
```

### Migration SQL Example
```sql
-- CreateTable
CREATE TABLE [dbo].[Users] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [full_name] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Users_created_at_df] DEFAULT GETDATE(),
    [updated_at] DATETIME2 NOT NULL,
    [is_deleted] BIT NOT NULL CONSTRAINT [Users_is_deleted_df] DEFAULT 0,
    CONSTRAINT [Users_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex
CREATE UNIQUE INDEX [Users_email_key] ON [dbo].[Users]([email]);
```

---

## ⚠️ Troubleshooting

### Migration Fails
```bash
# View detailed error
npm run prisma:migrate dev --verbose

# Check for pending migrations
npm run prisma:status

# If database is corrupted, reset (development only!)
npm run prisma:migrate reset
```

### Pending Migrations
```bash
# Resolve interactive prompt
npm run prisma:migrate dev

# Or resolve specific migration
npm run prisma:migrate resolve --rolled-back --name "migration_name"
```

### Schema Sync Issues
```bash
# Regenerate Prisma Client
npm run prisma:generate

# Push schema without migrations (development only!)
npm run prisma:db push
```

### Performance Issues After Migration
```bash
# Verify indexes were created
-- In SQL Server
SELECT * FROM sys.indexes WHERE object_id = OBJECT_ID('table_name');

# If needed, add indexes manually
-- In migration SQL
CREATE INDEX idx_name ON table_name (column_name);
```

---

## 🔄 Environment-Specific Migrations

### Development
```bash
npm run prisma:migrate dev
```

### Staging
```bash
# Set DATABASE_URL to staging
DATABASE_URL="..." npm run prisma:migrate deploy
```

### Production
```bash
# Backup first!
# ...

# Set DATABASE_URL to production
DATABASE_URL="..." npm run prisma:migrate deploy

# Verify
DATABASE_URL="..." npm run prisma:status
```

---

## 🚨 Production Safety

### Before Production Migration
1. ✅ Backup database
2. ✅ Test in staging
3. ✅ Plan downtime (if needed)
4. ✅ Notify team
5. ✅ Prepare rollback plan

### During Production Migration
1. ✅ Monitor database
2. ✅ Check application logs
3. ✅ Monitor performance
4. ✅ Have support ready

### After Production Migration
1. ✅ Verify all endpoints work
2. ✅ Check data integrity
3. ✅ Monitor for errors
4. ✅ Update documentation
5. ✅ Notify team of completion

---

## 🆘 Rollback Strategy

### Rollback Approach 1: Database Restore
```bash
# If migration failed, restore from backup
RESTORE DATABASE [database_name]
FROM DISK = '/path/to/backup.bak';
```

### Rollback Approach 2: Manual SQL
```sql
-- Reverse the changes made in last migration
DROP TABLE new_table;
-- or
ALTER TABLE table_name DROP COLUMN column_name;
```

### Rollback Approach 3: Code Revert
```bash
# Revert to previous schema
git checkout HEAD~1 prisma/schema.prisma

# Create rollback migration
npm run prisma:migrate dev --name "rollback_last_change"
```

---

## 📋 Migration Checklist

### Before Migration
- [ ] Schema changes reviewed
- [ ] Migration generates correct SQL
- [ ] Tested in development
- [ ] Team notified
- [ ] Backup plan ready
- [ ] Rollback procedure documented

### During Migration
- [ ] Database connection verified
- [ ] Migration running
- [ ] Progress monitored
- [ ] No errors in logs
- [ ] Performance acceptable

### After Migration
- [ ] All endpoints tested
- [ ] Data integrity verified
- [ ] Application logs clean
- [ ] Performance normal
- [ ] Documentation updated
- [ ] Team notified of completion

---

## 📚 Best Practices

1. **One Change Per Migration**
   ```bash
   # Good: One logical change
   npm run prisma:migrate dev --name "add_phone_to_users"
   
   # Avoid: Multiple unrelated changes in one migration
   ```

2. **Descriptive Names**
   ```bash
   # Good
   npm run prisma:migrate dev --name "add_email_verification_to_users"
   
   # Bad
   npm run prisma:migrate dev --name "update"
   ```

3. **Test Locally First**
   ```bash
   npm run prisma:migrate dev
   npm test
   npm run prisma:studio
   ```

4. **Keep Migrations Small**
   - Easier to debug
   - Faster to apply
   - Easier to rollback

5. **Document Complex Migrations**
   ```sql
   -- Migration name: add_audit_logging
   -- Purpose: Add audit trail for order changes
   -- Depends on: Users table
   
   CREATE TABLE OrderAudit (
     id INT PRIMARY KEY,
     order_id INT,
     action VARCHAR(50),
     timestamp DATETIME DEFAULT GETDATE()
   );
   ```

---

## 🔗 Related Commands

```bash
# Full commands with explanations
npm run prisma:migrate dev        # Create and apply migration
npm run prisma:migrate deploy     # Apply existing migrations
npm run prisma:migrate resolve    # Resolve migration conflicts
npm run prisma:status             # Check migration status
npm run prisma:generate           # Generate Prisma Client
npm run prisma:db push            # Push schema without migrations
npm run prisma:db pull            # Pull schema from database
npm run prisma:studio             # Open database UI
npm run prisma:validate           # Validate schema
```

---

## 📞 Support

For issues:
1. Check [Prisma Documentation](https://www.prisma.io/docs/reference/api-reference/prisma-cli-reference)
2. Review generated migration SQL
3. Check application logs
4. Test rollback procedure

---

**Happy Migrating!** 🚀
