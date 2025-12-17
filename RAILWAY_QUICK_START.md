# 🚀 Railway Deployment - Quick Start Checklist

Use this checklist to quickly deploy HealthTrack to Railway.

## ✅ Pre-Deployment Checklist

- [ ] Code is pushed to GitHub: https://github.com/nabiltechdev/healthtrack.git
- [ ] Railway account created and linked to GitHub
- [ ] All local changes are committed

## 📦 Backend Deployment

- [ ] Create new Railway project
- [ ] Deploy from GitHub repo (nabiltechdev/healthtrack)
- [ ] Add MySQL database to project
- [ ] Set Root Directory to `healthtrack-backend`
- [ ] Add environment variables:
  - [ ] `JWT_SECRET` (generate a strong random string)
  - [ ] `NODE_ENV=production`
  - [ ] `FRONTEND_URL` (will update after frontend deployment)
- [ ] Generate domain for backend
- [ ] Copy backend URL: `_______________________________`
- [ ] Test health endpoint: `https://your-backend-url/health`
- [ ] Run database setup SQL script in Railway MySQL
- [ ] Verify database tables created

## 🎨 Frontend Deployment

- [ ] Add new service to Railway project
- [ ] Deploy from same GitHub repo
- [ ] Set Root Directory to `healthtrack-frontend`
- [ ] Verify build command: `npm install && npm run build`
- [ ] Set start command: `npx serve -s build -l $PORT`
- [ ] Add environment variable:
  - [ ] `REACT_APP_API_URL=https://your-backend-url`
  - [ ] `NPM_CONFIG_PRODUCTION=false`
- [ ] Generate domain for frontend
- [ ] Copy frontend URL: `_______________________________`

## 🔄 Final Configuration

- [ ] Update backend `FRONTEND_URL` variable with frontend URL
- [ ] Wait for backend to redeploy
- [ ] Test frontend application
- [ ] Test user registration/login
- [ ] Test adding activities
- [ ] Test analytics page
- [ ] Verify all features work

## 📝 Your Deployment URLs

**Backend:** `https://___________________________________`

**Frontend:** `https://___________________________________`

**Health Check:** `https://___________________________________/health`

## 🎉 Post-Deployment

- [ ] Share your application URL
- [ ] Monitor Railway dashboard for usage
- [ ] Set up regular database backups
- [ ] Document any custom configurations

## 🆘 If Something Goes Wrong

1. Check Railway logs in dashboard
2. Verify all environment variables are set
3. Ensure database is running
4. Check CORS configuration
5. Review RAILWAY_DEPLOYMENT_GUIDE.md for detailed troubleshooting

---

**Estimated Time:** 15-30 minutes

**Free Tier:** $5/month credit (sufficient for testing)

**Support:** Railway Discord or GitHub Issues
