# 🔧 Railway Deployment Troubleshooting Guide

## Common Railway Crash Issues & Solutions

---

## 🚨 Quick Diagnosis

### Check Railway Logs First!

1. Go to Railway dashboard
2. Click on your crashed service
3. Click "Deployments" tab
4. Click on the failed deployment
5. Check the **Build Logs** and **Deploy Logs**

**Look for these common errors:**
- ❌ "Module not found"
- ❌ "Port already in use"
- ❌ "Database connection failed"
- ❌ "Cannot find module"
- ❌ "EADDRINUSE"

---

## 🔍 Most Common Issues & Fixes

### Issue 1: Wrong Start Command

**Error in logs:**
```
npm ERR! missing script: start
```

**Solution:**

**Check `package.json` has start script:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**If using different file name, update:**
```json
{
  "scripts": {
    "start": "node index.js"  // or app.js, or whatever your file is
  }
}
```

---

### Issue 2: Port Configuration

**Error in logs:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

**Update `server.js` to use Railway's PORT:**
```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**Railway automatically provides PORT variable!**

---

### Issue 3: Database Connection Failed

**Error in logs:**
```
Error: connect ECONNREFUSED
ER_ACCESS_DENIED_ERROR
```

**Solution:**

**Update `db.js` to use Railway MySQL variables:**

```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'healthtrack_db',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
```

**Make sure MySQL service is added in Railway!**

---

### Issue 4: Missing Dependencies

**Error in logs:**
```
Error: Cannot find module 'express'
Error: Cannot find module 'mysql2'
```

**Solution:**

**Check `package.json` has all dependencies:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  }
}
```

**Commit and push to GitHub:**
```bash
git add package.json
git commit -m "Fix dependencies"
git push
```

---

### Issue 5: Environment Variables Not Set

**Error in logs:**
```
JWT_SECRET is not defined
Database connection failed
```

**Solution:**

**In Railway Dashboard:**
1. Click on your backend service
2. Go to "Variables" tab
3. Add these variables:

```env
MYSQLHOST=${{MYSQLHOST}}
MYSQLUSER=${{MYSQLUSER}}
MYSQLPASSWORD=${{MYSQLPASSWORD}}
MYSQLDATABASE=${{MYSQLDATABASE}}
MYSQLPORT=${{MYSQLPORT}}
JWT_SECRET=your-super-secret-key-change-this-to-something-random
NODE_ENV=production
PORT=5000
```

**Railway auto-fills MySQL variables when you add MySQL service!**

---

### Issue 6: Database Not Created

**Error:**
```
ER_BAD_DB_ERROR: Unknown database 'healthtrack_db'
```

**Solution:**

**Railway MySQL uses database name from MYSQLDATABASE variable.**

**Option A: Use Railway's database name**
```javascript
// In db.js, use Railway's variable
database: process.env.MYSQLDATABASE
```

**Option B: Import your schema**
```bash
# Connect to Railway MySQL
railway connect MySQL

# Then paste your SQL schema
# Or import file:
mysql -h <host> -u <user> -p<password> <database> < setup-database-enhanced.sql
```

---

### Issue 7: CORS Errors

**Error in browser console:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**

**Update CORS configuration in `server.js`:**
```javascript
const cors = require('cors');

// Allow Railway frontend URL
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://healthtrack-frontend-production.up.railway.app',
    'https://*.railway.app'  // Allow all Railway domains
  ],
  credentials: true
};

app.use(cors(corsOptions));
```

---

### Issue 8: Build Timeout

**Error:**
```
Build exceeded maximum time limit
```

**Solution:**

**Optimize package.json:**
```json
{
  "scripts": {
    "start": "node server.js"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

**Remove unnecessary devDependencies from production:**
```bash
npm install --production
```

---

## 🛠️ Step-by-Step Fix Process

### Step 1: Check Your Files

**Verify these files exist and are correct:**

**✅ healthtrack-backend/package.json**
```json
{
  "name": "healthtrack-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  }
}
```

**✅ healthtrack-backend/server.js**
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'HealthTrack API is running!' });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/analytics', require('./routes/analytics'));

// Use Railway's PORT or default to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**✅ healthtrack-backend/db.js**
```javascript
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'healthtrack_db',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected successfully!');
    connection.release();
  }
});

module.exports = pool.promise();
```

### Step 2: Update Files

**If any files are wrong, update them:**

```bash
cd healthtrack-backend

# Make your changes to the files above

# Commit changes
git add .
git commit -m "Fix Railway deployment issues"
git push origin main
```

### Step 3: Redeploy on Railway

**Railway will auto-deploy when you push to GitHub!**

Or manually:
```bash
railway up
```

---

## 🔍 Debugging Checklist

### Before Deployment:
- [ ] `package.json` has "start" script
- [ ] `server.js` uses `process.env.PORT`
- [ ] `db.js` uses Railway MySQL variables
- [ ] All dependencies in `package.json`
- [ ] `.env` file NOT committed (in .gitignore)
- [ ] Code pushed to GitHub

### In Railway Dashboard:
- [ ] MySQL service added
- [ ] Environment variables set
- [ ] Backend service connected to MySQL
- [ ] Build logs show success
- [ ] Deploy logs show "Server running"

### After Deployment:
- [ ] Backend URL works: `https://your-app.railway.app`
- [ ] Test endpoint: `https://your-app.railway.app/api/auth/test`
- [ ] Database connection successful
- [ ] No errors in logs

---

## 📝 Complete Working Configuration

### package.json (Backend)
```json
{
  "name": "healthtrack-backend",
  "version": "1.0.0",
  "description": "HealthTrack Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "engines": {
    "node": "18.x"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.6.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### server.js (Backend)
```javascript
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://*.railway.app'
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealthTrack API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/analytics', require('./routes/analytics'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Use Railway's PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
```

### db.js (Backend)
```javascript
const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || 'localhost',
  user: process.env.MYSQLUSER || 'root',
  password: process.env.MYSQLPASSWORD || '',
  database: process.env.MYSQLDATABASE || 'healthtrack_db',
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Host:', process.env.MYSQLHOST);
    console.error('User:', process.env.MYSQLUSER);
    console.error('Database:', process.env.MYSQLDATABASE);
  } else {
    console.log('✅ Database connected successfully!');
    connection.release();
  }
});

module.exports = pool.promise();
```

---

## 🆘 Still Crashing?

### Share These Details:

1. **Error message from Railway logs**
2. **Which service is crashing** (backend or frontend?)
3. **Environment variables you set**
4. **Your package.json content**
5. **Your server.js PORT configuration**

### Quick Fixes to Try:

```bash
# 1. Ensure all changes are committed
git add .
git commit -m "Fix deployment"
git push

# 2. Redeploy on Railway
railway up

# 3. Check logs
railway logs

# 4. Restart service
railway restart
```

---

## 💡 Pro Tips

1. **Always check logs first** - They tell you exactly what's wrong
2. **Use Railway's variables** - Don't hardcode database credentials
3. **Test locally first** - Make sure it works with `npm start`
4. **One change at a time** - Easier to identify issues
5. **Keep it simple** - Start with basic setup, add features later

---

**Tell me:**
1. What error message do you see in Railway logs?
2. Is it the backend or frontend that's crashing?
3. Did you add the MySQL database service?

I'll help you fix it immediately!
