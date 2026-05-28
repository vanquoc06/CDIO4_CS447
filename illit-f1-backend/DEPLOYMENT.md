# 🚀 Deployment Guide

Complete guide to deploying ILLIT F1 API to production.

---

## 📋 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Code reviewed and approved
- [ ] TypeScript compilation successful
- [ ] No console errors/warnings
- [ ] SSL certificate ready (for HTTPS)
- [ ] Database backup taken
- [ ] Monitoring configured
- [ ] Logging configured

---

## 🏗️ Deployment Approaches

### Option 1: Traditional Server (VPS/Dedicated)

#### Prerequisites
- Node.js v20+
- SQL Server
- NPM or Yarn
- PM2 (process manager)

#### Steps

1. **SSH into Server**
```bash
ssh user@your-server-ip
```

2. **Clone Repository**
```bash
git clone https://github.com/yourusername/CDIO4_CS447.git
cd illit-f1-backend
```

3. **Install Dependencies**
```bash
npm install --production
```

4. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with production values
nano .env
```

5. **Run Migrations**
```bash
npm run prisma:migrate
```

6. **Build TypeScript**
```bash
npm run build
```

7. **Install PM2**
```bash
npm install -g pm2
```

8. **Start with PM2**
```bash
pm2 start dist/index.js --name "illit-f1-api"
pm2 save
pm2 startup
```

9. **Monitor**
```bash
pm2 logs illit-f1-api
pm2 status
```

---

### Option 2: Docker Containerization

#### Prerequisites
- Docker installed
- Docker Hub account
- Docker Compose (optional)

#### Dockerfile
```dockerfile
# illit-f1-backend/Dockerfile

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

#### docker-compose.yml
```yaml
version: '3.8'

services:
  api:
    build: ./illit-f1-backend
    container_name: illit-f1-api
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - db
    restart: unless-stopped
    networks:
      - illit-network

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: illit-f1-db
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=${MSSQL_SA_PASSWORD}
    ports:
      - "1433:1433"
    volumes:
      - mssql-data:/var/opt/mssql
    restart: unless-stopped
    networks:
      - illit-network

networks:
  illit-network:
    driver: bridge

volumes:
  mssql-data:
```

#### Deploy with Docker
```bash
# Build image
docker build -t illit-f1-api:1.0.0 .

# Run container
docker run -d \
  -p 8080:8080 \
  --name illit-f1-api \
  -e DATABASE_URL="..." \
  -e JWT_SECRET="..." \
  illit-f1-api:1.0.0

# Or use Docker Compose
docker-compose up -d
```

---

### Option 3: Cloud Platform (Heroku)

#### Prerequisites
- Heroku CLI installed
- Heroku account

#### Procfile
```
web: npm start
worker: npm run worker
```

#### Deploy
```bash
# Login to Heroku
heroku login

# Create app
heroku create illit-f1-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DATABASE_URL="sqlserver://..."
heroku config:set JWT_SECRET="your-secret"

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

### Option 4: AWS Deployment

#### Using Elastic Beanstalk

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize**
```bash
eb init -p "Node.js 20 running on 64bit Amazon Linux 2"
```

3. **Create Environment**
```bash
eb create illit-f1-api-env
```

4. **Configure .ebextensions/nodecommand.config**
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "npm start"
```

5. **Deploy**
```bash
eb deploy
```

---

### Option 5: Azure App Service

#### Prerequisites
- Azure CLI
- Azure subscription

#### Deploy
```bash
# Login to Azure
az login

# Create resource group
az group create \
  --name illit-f1-rg \
  --location eastus

# Create App Service plan
az appservice plan create \
  --name illit-f1-plan \
  --resource-group illit-f1-rg \
  --sku B1

# Create web app
az webapp create \
  --resource-group illit-f1-rg \
  --plan illit-f1-plan \
  --name illit-f1-api \
  --runtime "node|20"

# Deploy from Git
az webapp deployment source config \
  --name illit-f1-api \
  --resource-group illit-f1-rg \
  --repo-url <github-repo-url> \
  --branch main

# Set environment variables
az webapp config appsettings set \
  --name illit-f1-api \
  --resource-group illit-f1-rg \
  --settings DATABASE_URL="..." JWT_SECRET="..."
```

---

## 🔐 Security Checklist

### Before Production

- [ ] Update dependencies
```bash
npm audit fix
npm update
```

- [ ] Check for vulnerabilities
```bash
npm audit
```

- [ ] Remove console.logs
- [ ] Enable HTTPS
- [ ] Set secure headers
- [ ] Configure CORS properly
- [ ] Rate limiting enabled
- [ ] Input validation in place
- [ ] Error messages sanitized
- [ ] Secrets not in code
- [ ] Database credentials secured
- [ ] API keys rotated

### Middleware Stack
```javascript
// Recommended middleware order:
1. Helmet (security headers)
2. CORS (origin checking)
3. Compression (reduce payload)
4. Rate limiting
5. Request parsing
6. Authentication
7. Validation
8. Routes
9. Error handling
```

---

## 📊 Monitoring & Logging

### Recommended Tools

- **APM:** New Relic, DataDog, Elastic APM
- **Logging:** ELK Stack, Splunk, CloudWatch
- **Monitoring:** Prometheus, Grafana
- **Error Tracking:** Sentry, Rollbar
- **Uptime:** StatusPage.io, UptimeRobot

### Basic Monitoring
```bash
# Check process status
pm2 status

# Monitor resources
pm2 monit

# View logs
pm2 logs illit-f1-api --lines 100
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Example

**.github/workflows/deploy.yml**
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run type-check
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          curl -X POST ${{ secrets.DEPLOY_WEBHOOK }} \
            -H "Authorization: Bearer ${{ secrets.DEPLOY_TOKEN }}"
```

---

## 📈 Performance Optimization

### Node.js Tuning
```bash
# Increase memory limit
NODE_OPTIONS=--max-old-space-size=4096

# Enable clustering
npm install cluster-light
```

### Database Optimization
```sql
-- Add indexes
CREATE INDEX idx_user_email ON Users(email);
CREATE INDEX idx_order_user_id ON Orders(user_id);
CREATE INDEX idx_product_category ON Products(category);
```

### API Optimization
- Enable gzip compression
- Implement caching
- Use pagination
- Optimize query performance
- Connection pooling

---

## 🆘 Troubleshooting

### Application Won't Start
```bash
# Check logs
pm2 logs illit-f1-api

# Verify dependencies
npm install

# Check Node version
node --version

# Test locally
npm run dev
```

### High Memory Usage
```bash
# Monitor memory
pm2 monit

# Restart process
pm2 restart illit-f1-api

# Check for memory leaks
npm install clinic
clinic doctor -- npm start
```

### Database Connection Issues
```bash
# Test connection
npm run prisma:db push

# Reset migrations
npm run prisma:migrate reset

# Check database status
sqlcmd -S server -U user -P password
```

### Slow Response Times
```bash
# Enable profiling
npm install autocannon
autocannon http://your-api:8080

# Check database queries
npm run prisma:studio

# Monitor resources
pm2 monit
```

---

## 📋 Deployment Checklist

### Before Deploying
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Build successful
- [ ] No TypeScript errors
- [ ] Environment variables set
- [ ] Database migrations tested
- [ ] Security audit passed

### During Deployment
- [ ] Database backup taken
- [ ] Zero-downtime deployment
- [ ] Health checks passing
- [ ] Monitor logs for errors
- [ ] Verify all endpoints working
- [ ] Test critical workflows

### After Deployment
- [ ] Smoke tests passed
- [ ] Performance acceptable
- [ ] Error rate normal
- [ ] Logs clean
- [ ] Monitoring active
- [ ] Team notified
- [ ] Documentation updated

---

## 🔄 Rollback Plan

If something goes wrong:

```bash
# With PM2
pm2 restart illit-f1-api

# With Docker
docker stop illit-f1-api
docker run -d ... # Start previous version

# With Git
git revert <commit-hash>
npm run build
npm start
```

---

## 📚 Further Reading

- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-web-app-production/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Docker Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- [Kubernetes Deployment](https://kubernetes.io/docs/tasks/run-application/)

---

## 🎯 Deployment Checklist Matrix

| Phase | Task | Status |
|-------|------|--------|
| Pre | Code review | ⏳ |
| Pre | Security audit | ⏳ |
| Pre | Database backup | ⏳ |
| Deploy | Update environment | ⏳ |
| Deploy | Run migrations | ⏳ |
| Deploy | Start application | ⏳ |
| Post | Smoke test | ⏳ |
| Post | Monitor logs | ⏳ |
| Post | Verify endpoints | ⏳ |
| Post | Notify team | ⏳ |

---

**Happy Deploying!** 🚀
