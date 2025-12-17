# 🚀 HealthTrack Deployment Guide - Railway & Vercel

## 📋 Overview

This guide will help you deploy:
- **Backend** → Railway (with MySQL database)
- **Frontend** → Vercel

---

## 🔧 Part 1: Deploy Backend to Railway

### Step 1: Create Railway Account

1. Go to https://railway.app/
2. Sign up with GitHub
3. Verify your email

### Step 2: Create New Project

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your `healthtrack` repository

### Step 3: Add MySQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add MySQL"
3. Railway will automatically create a MySQL database
4. Note the connection details (you'll need these)

### Step 4: Configure Environment Variables

1. Click on your backend service
2. Go to "Variables" tab
3. Add the following variables:

```env
DB_HOST=<from MySQL service>
DB_USER=<from MySQL service>
DB_PASSWORD=<from MySQL service>
DB_NAME=railway
DB_PORT=<from MySQL service>
JWT_SECRET=your-super-secret-jwt-key-change-this
PORT=5000
EMAIL_USER=82310010@students.liu.edu.lb
EMAIL_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

**Important:** Railway provides MySQL connection details automatically. Click on the MySQL service to see them.

### Step 5: Set Up Database Schema

1. Connect to Railway MySQL using a MySQL client or Railway's built-in console
2. Run the database setup scripts:

```bash
# Option 1: Using Railway CLI
railway connect MySQL
# Then paste the contents of setup-database-enhanced.sql
# Then paste the contents of update-database-schema.sql

# Option 2: Using MySQL Workbench or phpMyAdmin
# Connect using Railway's MySQL credentials
# Import both SQL files
```

### Step 6: Deploy

1. Railway will automatically deploy when you push to GitHub
2. Get your backend URL from Railway dashboard (e.g., `https://healthtrack-backend.up.railway.app`)
3. Test the API: `https://your-backend-url.railway.app/api/auth/login`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API URL

Before deploying, update the API URL in your frontend:

**File: `healthtrack-frontend/src/App.js`**

Replace all instances of `http://localhost:5000` with your Railway backend URL:

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend-url.railway.app';

// Then use it like:
axios.post(`${API_URL}/api/auth/login`, { email, password })
```

Or create a `.env` file in `healthtrack-frontend/`:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Step 2: Create Vercel Account

1. Go to https://vercel.com/
2. Sign up with GitHub
3. Verify your email

### Step 3: Import Project

1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Select the `healthtrack-frontend` folder as the root directory

### Step 4: Configure Build Settings

Vercel should auto-detect React. Verify these settings:

- **Framework Preset:** Create React App
- **Build Command:** `npm run build`
- **Output Directory:** `build`
- **Install Command:** `npm install`

### Step 5: Add Environment Variables

In Vercel project settings, add:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app
```

### Step 6: Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Get your frontend URL (e.g., `https://healthtrack.vercel.app`)

### Step 7: Update Backend CORS

Update `healthtrack-backend/server.js` to allow your Vercel domain:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://healthtrack.vercel.app',
    'https://your-custom-domain.com'
  ],
  credentials: true
}));
```

Commit and push to trigger Railway redeployment.

---

## ✅ Part 3: Verify Deployment

### Test Backend

```bash
# Test health check
curl https://your-backend-url.railway.app/api/auth/login

# Test registration
curl -X POST https://your-backend-url.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test"}'
```

### Test Frontend

1. Visit your Vercel URL
2. Try to register a new account
3. Check if you receive welcome email
4. Try logging in
5. Test all features

---

## 🔐 Part 4: Update Environment Variables

### Backend (.env on Railway)

```env
DB_HOST=<railway-mysql-host>
DB_USER=<railway-mysql-user>
DB_PASSWORD=<railway-mysql-password>
DB_NAME=railway
DB_PORT=<railway-mysql-port>
JWT_SECRET=<generate-strong-secret>
PORT=5000
EMAIL_USER=82310010@students.liu.edu.lb
EMAIL_PASSWORD=<your-gmail-app-password>
FRONTEND_URL=https://healthtrack.vercel.app
NODE_ENV=production
```

### Frontend (.env on Vercel)

```env
REACT_APP_API_URL=https://healthtrack-backend.up.railway.app
```

---

## 📝 Part 5: Update README with Live Links

Update your `README.md` with:

```markdown
## 🌐 Live Demo

- **Frontend:** https://healthtrack.vercel.app
- **Backend API:** https://healthtrack-backend.up.railway.app
- **Admin Panel:** https://healthtrack.vercel.app/admin

### Test Credentials
- **Admin:** email: `admin`, password: `admin`
- **Regular User:** Register your own account
```

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Failed**
- Verify MySQL credentials in Railway
- Check if database tables are created
- Ensure DB_PORT is set correctly

**CORS Errors**
- Add your Vercel domain to CORS whitelist
- Redeploy backend after changes

**Email Not Sending**
- Verify EMAIL_USER and EMAIL_PASSWORD
- Check Gmail App Password is correct
- Look at Railway logs for errors

### Frontend Issues

**API Calls Failing**
- Verify REACT_APP_API_URL is correct
- Check browser console for errors
- Ensure backend is running

**Build Failures**
- Check for TypeScript errors
- Verify all dependencies are in package.json
- Review Vercel build logs

---

## 📊 Part 6: Monitor Your Deployment

### Railway Monitoring

1. Go to Railway dashboard
2. Click on your service
3. View "Metrics" tab for:
   - CPU usage
   - Memory usage
   - Request count
   - Response times

### Vercel Analytics

1. Go to Vercel dashboard
2. Click on your project
3. View "Analytics" for:
   - Page views
   - Unique visitors
   - Performance metrics

---

## 🔄 Part 7: Continuous Deployment

Both Railway and Vercel support automatic deployments:

1. **Push to GitHub** → Automatic deployment
2. **Pull Request** → Preview deployment
3. **Merge to main** → Production deployment

### Set Up Auto-Deploy

**Railway:**
- Already configured by default
- Deploys on every push to main branch

**Vercel:**
- Already configured by default
- Creates preview for PRs
- Deploys production on merge to main

---

## 📸 Part 8: Take Screenshots for Report

After deployment, take screenshots of:

1. **Home Page** - Landing page
2. **Registration** - Sign up form
3. **Login** - Login form
4. **Dashboard** - Main dashboard with activities
5. **Add Activity** - Activity creation form
6. **Analytics** - Charts and statistics
7. **Admin Panel** - Admin dashboard (if implemented)
8. **Mobile View** - Responsive design on mobile
9. **Email Notification** - Welcome email screenshot
10. **Database** - Railway MySQL tables

Save these in a `screenshots/` folder for your project report.

---

## 🎯 Deployment Checklist

- [ ] Backend deployed to Railway
- [ ] MySQL database created and configured
- [ ] Database schema imported
- [ ] Admin user created
- [ ] Environment variables set on Railway
- [ ] Frontend deployed to Vercel
- [ ] API URL updated in frontend
- [ ] CORS configured for Vercel domain
- [ ] Email service tested
- [ ] All features working on live site
- [ ] Screenshots taken
- [ ] README updated with live links
- [ ] Custom domain configured (optional)

---

## 🌟 Optional: Custom Domain

### For Backend (Railway)

1. Go to Railway project settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records as instructed

### For Frontend (Vercel)

1. Go to Vercel project settings
2. Click "Domains"
3. Add custom domain
4. Update DNS records as instructed

---

## 📞 Support

If you encounter issues:

1. **Railway Issues:** https://railway.app/help
2. **Vercel Issues:** https://vercel.com/support
3. **Check Logs:** Both platforms provide detailed logs

---

**Deployment Complete! 🎉**

Your HealthTrack application is now live and accessible worldwide!

**Last Updated:** ${new Date().toLocaleDateString()}
