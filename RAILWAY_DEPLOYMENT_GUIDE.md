# 🚂 Railway Deployment Guide for HealthTrack

This guide will walk you through deploying your HealthTrack application to Railway for free hosting.

## 📋 Prerequisites

- GitHub account (https://github.com)
- Railway account (https://railway.app) - Sign up with GitHub
- Your GitHub repository: https://github.com/nabiltechdev/healthtrack.git

## 🎯 Overview

We'll deploy:
1. **Backend API** (Node.js/Express) with MySQL database
2. **Frontend** (React application)

Railway offers $5 free credit per month, which is sufficient for testing and small-scale usage.

---

## 📦 Part 1: Prepare Your Repository

### Step 1: Push Your Code to GitHub

Your code is already on GitHub at: https://github.com/nabiltechdev/healthtrack.git

Make sure all the latest changes are pushed:

```bash
cd c:/Users/TT/Desktop/project
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

---

## 🚀 Part 2: Deploy Backend to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"** or **"Login with GitHub"**
3. Authorize Railway to access your GitHub account

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository: **nabiltechdev/healthtrack**
4. Railway will detect your project structure

### Step 3: Add MySQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add MySQL"**
4. Railway will automatically provision a MySQL database
5. Note: The database will be automatically linked to your backend service

### Step 4: Configure Backend Service

1. Click on your backend service (it should auto-detect `healthtrack-backend`)
2. Go to **"Settings"** tab
3. Configure the following:

#### Root Directory
- Set **Root Directory** to: `healthtrack-backend`

#### Environment Variables
Click **"Variables"** tab and add these variables:

```env
# JWT Secret (Generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_secure_and_random

# Node Environment
NODE_ENV=production

# Frontend URL (we'll update this after deploying frontend)
FRONTEND_URL=https://your-frontend-url.railway.app
```

**Important:** Railway automatically provides MySQL connection variables:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLUSER`
- `MYSQLPASSWORD`
- `MYSQLDATABASE`

These are automatically injected, so you don't need to add them manually.

#### Update db.js for Railway

Railway provides MySQL credentials in a different format. We need to update the database connection:

**Option A: Use Railway's MySQL variables directly**

Update `healthtrack-backend/db.js`:

```javascript
const mysql = require('mysql');

// Railway provides MYSQL* variables, fallback to DB_* for local development
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306
});

console.log('Attempting DB connection...');

db.connect(err => {
  if (err) {
    console.error('DB Connection Failed:', err.message);
    throw err;
  }
  console.log('MySQL connected successfully');
});

module.exports = db;
```

### Step 5: Deploy Backend

1. Railway will automatically deploy your backend
2. Wait for the deployment to complete (check the **"Deployments"** tab)
3. Once deployed, click **"Settings"** → **"Generate Domain"**
4. Copy your backend URL (e.g., `https://healthtrack-backend-production.up.railway.app`)

### Step 6: Setup Database Schema

You need to run the SQL setup script on your Railway MySQL database.

**Method 1: Using Railway MySQL Client (Recommended)**

1. In Railway dashboard, click on your **MySQL database**
2. Go to **"Data"** tab
3. Click **"Query"** or use the built-in query editor
4. Copy the contents of `healthtrack-backend/setup-database-enhanced.sql`
5. Paste and execute the SQL script

**Method 2: Using MySQL Client Locally**

1. In Railway, click on your MySQL database
2. Go to **"Connect"** tab
3. Copy the connection command (it will look like):
   ```bash
   mysql -h containers-us-west-xxx.railway.app -u root -p --port xxxxx
   ```
4. Run this command in your terminal
5. Enter the password when prompted
6. Once connected, run:
   ```sql
   USE your_database_name;
   source c:/Users/TT/Desktop/project/healthtrack-backend/setup-database-enhanced.sql
   ```

### Step 7: Test Backend

Visit your backend URL in a browser:
```
https://your-backend-url.railway.app/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "healthtrack-backend"
}
```

---

## 🎨 Part 3: Deploy Frontend to Railway

### Step 1: Add Frontend Service

1. In your Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose the same repository: **nabiltechdev/healthtrack**
4. Railway will create a new service

### Step 2: Configure Frontend Service

1. Click on the new service
2. Go to **"Settings"** tab

#### Root Directory
- Set **Root Directory** to: `healthtrack-frontend`

#### Build Command
- Railway should auto-detect this, but verify:
  ```
  npm install && npm run build
  ```

#### Start Command
- Set to:
  ```
  npx serve -s build -l $PORT
  ```

#### Install serve package
Add `serve` to your frontend dependencies:

1. Go to **"Variables"** tab
2. Add:
   ```env
   NPM_CONFIG_PRODUCTION=false
   ```

Or update `healthtrack-frontend/package.json`:
```json
{
  "dependencies": {
    ...existing dependencies...,
    "serve": "^14.2.0"
  }
}
```

### Step 3: Set Environment Variables

In the **"Variables"** tab, add:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

Replace `your-backend-url.railway.app` with your actual backend URL from Part 2, Step 5.

### Step 4: Generate Domain

1. Go to **"Settings"** tab
2. Click **"Generate Domain"**
3. Copy your frontend URL (e.g., `https://healthtrack-frontend-production.up.railway.app`)

### Step 5: Update Backend CORS

1. Go back to your **backend service**
2. Go to **"Variables"** tab
3. Update the `FRONTEND_URL` variable with your frontend URL:
   ```env
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```
4. The backend will automatically redeploy

---

## ✅ Part 4: Verification & Testing

### Step 1: Create Local Environment Files

For local development, create these files:

**healthtrack-backend/.env**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_local_password
DB_NAME=healthtrack
DB_PORT=3306
JWT_SECRET=your_local_jwt_secret
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**healthtrack-frontend/.env**
```env
REACT_APP_API_URL=http://localhost:5000
```

### Step 2: Test Your Deployed Application

1. Visit your frontend URL: `https://your-frontend-url.railway.app`
2. Try to register/login
3. Add some activities
4. Check the analytics page
5. Verify all features work correctly

### Step 3: Monitor Your Application

In Railway dashboard:
- Check **"Deployments"** for build logs
- Check **"Metrics"** for usage statistics
- Check **"Logs"** for runtime errors

---

## 🔧 Troubleshooting

### Issue: Backend won't connect to database

**Solution:**
1. Check that MySQL service is running in Railway
2. Verify environment variables are set correctly
3. Check logs in Railway dashboard
4. Ensure `db.js` uses Railway's MySQL variables

### Issue: Frontend can't reach backend

**Solution:**
1. Verify `REACT_APP_API_URL` is set correctly in frontend
2. Check CORS configuration in backend
3. Ensure backend domain is generated and accessible
4. Check browser console for CORS errors

### Issue: Database tables not created

**Solution:**
1. Manually run the SQL setup script in Railway's MySQL query editor
2. Check MySQL logs for errors
3. Verify database connection is successful

### Issue: "Application failed to respond"

**Solution:**
1. Check that `PORT` environment variable is used in backend
2. Verify start command is correct
3. Check deployment logs for errors
4. Ensure all dependencies are installed

### Issue: Frontend shows blank page

**Solution:**
1. Check browser console for errors
2. Verify build completed successfully
3. Check that `serve` package is installed
4. Verify start command is correct

---

## 💰 Railway Free Tier Limits

- **$5 free credit per month**
- Approximately **500 hours** of usage
- **1GB RAM** per service
- **1GB storage** for databases

**Tips to stay within free tier:**
- Services sleep after 30 minutes of inactivity
- Database stays active (counts toward usage)
- Monitor usage in Railway dashboard
- Consider pausing services when not in use

---

## 🔐 Security Best Practices

1. **Never commit `.env` files** to GitHub
2. **Use strong JWT secrets** (generate random strings)
3. **Keep dependencies updated**
4. **Monitor logs** for suspicious activity
5. **Use HTTPS** (Railway provides this automatically)

---

## 📚 Additional Resources

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Repository: https://github.com/nabiltechdev/healthtrack

---

## 🎉 Success!

Your HealthTrack application is now deployed on Railway! 

**Your URLs:**
- Frontend: `https://your-frontend-url.railway.app`
- Backend: `https://your-backend-url.railway.app`
- Backend Health: `https://your-backend-url.railway.app/health`

Share your application with others and start tracking health activities! 🏃‍♂️💪

---

## 📝 Next Steps

1. **Custom Domain** (Optional): Add your own domain in Railway settings
2. **Monitoring**: Set up monitoring and alerts
3. **Backups**: Regularly backup your MySQL database
4. **Updates**: Keep your application updated with new features

---

**Need Help?**
- Check Railway logs for errors
- Review this guide carefully
- Contact Railway support
- Check GitHub issues

Good luck with your deployment! 🚀
