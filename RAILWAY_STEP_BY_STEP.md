# 📖 Railway Deployment - Step by Step Guide

Follow these exact steps to deploy HealthTrack to Railway.

---

## 🔐 Step 1: Sign Up for Railway

1. Go to: **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. Complete the signup process

✅ **You should now see the Railway dashboard**

---

## 🗂️ Step 2: Prepare Your GitHub Repository

Your repository is already at: **https://github.com/nabiltechdev/healthtrack.git**

Make sure all changes are pushed:

```bash
# Navigate to your project
cd c:/Users/TT/Desktop/project

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Configure for Railway deployment"

# Push to GitHub
git push origin main
```

✅ **Verify your code is on GitHub by visiting the repository URL**

---

## 🚀 Step 3: Create Railway Project

1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. You'll see a list of your repositories
4. Find and click: **"nabiltechdev/healthtrack"**
5. Railway will start analyzing your repository

✅ **Railway should detect both frontend and backend folders**

---

## 🗄️ Step 4: Add MySQL Database

1. In your project dashboard, click **"+ New"** button
2. Select **"Database"**
3. Choose **"Add MySQL"**
4. Wait for MySQL to provision (takes ~30 seconds)
5. Click on the MySQL service to see connection details

✅ **MySQL database is now running**

---

## ⚙️ Step 5: Configure Backend Service

### 5.1: Set Root Directory

1. Click on the **backend service** (should be auto-detected)
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Enter: `healthtrack-backend`
5. Click **"Update"**

### 5.2: Add Environment Variables

1. Click **"Variables"** tab
2. Click **"+ New Variable"**
3. Add these variables one by one:

**Variable 1:**
```
Name: JWT_SECRET
Value: healthtrack_super_secret_jwt_key_2024_change_this_in_production
```

**Variable 2:**
```
Name: NODE_ENV
Value: production
```

**Variable 3:** (We'll update this later)
```
Name: FRONTEND_URL
Value: http://localhost:3000
```

4. Click **"Add"** for each variable

✅ **Environment variables are set**

### 5.3: Generate Backend Domain

1. Go to **"Settings"** tab
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"**
4. Copy the generated URL (e.g., `healthtrack-backend-production-xxxx.up.railway.app`)
5. **SAVE THIS URL** - you'll need it for the frontend!

**Your Backend URL:** `https://________________________________`

✅ **Backend is deploying (check "Deployments" tab)**

---

## 🗃️ Step 6: Setup Database Schema

### Method 1: Using Railway Query Editor (Easiest)

1. Click on your **MySQL database** service
2. Go to **"Data"** tab
3. Click **"Query"** button
4. Open the file: `c:/Users/TT/Desktop/project/healthtrack-backend/setup-database-enhanced.sql`
5. Copy ALL the contents
6. Paste into Railway query editor
7. Click **"Run"** or **"Execute"**
8. Wait for completion message

### Method 2: Using Local MySQL Client

1. Click on MySQL service
2. Go to **"Connect"** tab
3. Copy the connection string
4. Open terminal and run:

```bash
# Connect to Railway MySQL (use the connection string from Railway)
mysql -h containers-us-west-xxx.railway.app -u root -p --port xxxxx

# Enter password when prompted

# Once connected, select database
USE railway;

# Run the setup script
source c:/Users/TT/Desktop/project/healthtrack-backend/setup-database-enhanced.sql
```

✅ **Database tables are created**

---

## 🎨 Step 7: Configure Frontend Service

### 7.1: Add Frontend Service

1. In your project dashboard, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose: **"nabiltechdev/healthtrack"** (same repo)
4. Railway will create a second service

### 7.2: Set Root Directory

1. Click on the **new service** (frontend)
2. Go to **"Settings"** tab
3. Scroll to **"Root Directory"**
4. Enter: `healthtrack-frontend`
5. Click **"Update"**

### 7.3: Configure Build Settings

1. Still in **"Settings"** tab
2. Scroll to **"Build Command"** (should be auto-detected)
3. Verify it shows: `npm install && npm run build`
4. Scroll to **"Start Command"**
5. Enter: `npx serve -s build -l $PORT`
6. Click **"Update"**

### 7.4: Add Environment Variables

1. Click **"Variables"** tab
2. Click **"+ New Variable"**

**Variable 1:**
```
Name: REACT_APP_API_URL
Value: https://your-backend-url-from-step-5.railway.app
```
(Replace with YOUR actual backend URL from Step 5.3)

**Variable 2:**
```
Name: NPM_CONFIG_PRODUCTION
Value: false
```

3. Click **"Add"** for each

### 7.5: Generate Frontend Domain

1. Go to **"Settings"** tab
2. Scroll to **"Networking"**
3. Click **"Generate Domain"**
4. Copy the generated URL

**Your Frontend URL:** `https://________________________________`

✅ **Frontend is deploying**

---

## 🔄 Step 8: Update Backend CORS

1. Go back to your **backend service**
2. Click **"Variables"** tab
3. Find the `FRONTEND_URL` variable
4. Click **"Edit"** (pencil icon)
5. Update the value to your frontend URL from Step 7.5
6. Click **"Update"**

✅ **Backend will automatically redeploy with new CORS settings**

---

## ✅ Step 9: Verify Deployment

### 9.1: Check Backend Health

Open in browser:
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

### 9.2: Check Frontend

Open in browser:
```
https://your-frontend-url.railway.app
```

You should see the HealthTrack homepage.

### 9.3: Test Full Application

1. Click **"Dashboard"** or **"Get Started"**
2. Enter an email and password to register
3. Add a test activity
4. Check the Analytics page
5. Verify everything works

✅ **Application is fully deployed!**

---

## 📊 Step 10: Monitor Your Application

### Check Deployment Status

1. In Railway dashboard, click on each service
2. Go to **"Deployments"** tab
3. Check for any errors in build logs

### Monitor Usage

1. Click on your project name
2. Go to **"Usage"** tab
3. Monitor your $5 free credit usage

### View Logs

1. Click on any service
2. Go to **"Logs"** tab
3. See real-time application logs

---

## 🎉 Success! Your Application is Live

**Frontend:** `https://your-frontend-url.railway.app`

**Backend:** `https://your-backend-url.railway.app`

**API Health:** `https://your-backend-url.railway.app/health`

---

## 🔧 Common Issues & Solutions

### Issue: "Application failed to respond"

**Solution:**
```bash
# Check logs in Railway dashboard
# Verify environment variables are set
# Ensure PORT is used in server.js (already configured)
```

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Verify MySQL service is running
# Check that db.js uses MYSQL* variables (already updated)
# Run database setup script again
```

### Issue: "CORS error" in browser console

**Solution:**
```bash
# Verify FRONTEND_URL is set correctly in backend
# Check that frontend URL matches exactly
# Redeploy backend after updating FRONTEND_URL
```

### Issue: Frontend shows blank page

**Solution:**
```bash
# Check browser console for errors
# Verify REACT_APP_API_URL is set correctly
# Check that build completed successfully in Railway logs
# Ensure 'serve' package is being used
```

---

## 💡 Pro Tips

1. **Save Your URLs**: Write down your frontend and backend URLs
2. **Monitor Usage**: Check Railway dashboard regularly
3. **Free Tier**: $5/month is enough for testing and small usage
4. **Logs**: Always check logs first when debugging
5. **Redeploy**: Click "Redeploy" if you make changes to environment variables

---

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **Railway Discord**: https://discord.gg/railway
- **GitHub Issues**: https://github.com/nabiltechdev/healthtrack/issues

---

## 🎯 Next Steps

1. ✅ Share your application with friends
2. ✅ Add custom domain (optional)
3. ✅ Set up monitoring alerts
4. ✅ Regular database backups
5. ✅ Keep dependencies updated

**Congratulations! You've successfully deployed HealthTrack to Railway! 🚀**
