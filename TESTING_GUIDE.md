# 🧪 HealthTrack Testing Guide

This guide will help you test all the fixes for admin login, registration, and endpoint testing.

---

## 📋 Prerequisites

Before testing, ensure:

1. ✅ MySQL is running
2. ✅ Database `healthtrack` exists
3. ✅ Backend dependencies installed (`npm install` in healthtrack-backend)
4. ✅ Frontend dependencies installed (`npm install` in healthtrack-frontend)
5. ✅ `.env` file configured in healthtrack-backend

---

## 🔧 Step 1: Configure Environment

### Create .env file

```bash
cd healthtrack-backend
cp .env.example .env
```

### Edit .env file with your values:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=healthtrack
DB_PORT=3306

JWT_SECRET=your_secret_key_here_change_in_production

EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_char_app_password

FRONTEND_URL=http://localhost:3000
PORT=5000
```

---

## 🗄️ Step 2: Update Database Schema

Run the updated SQL script to fix the admin user:

```bash
# Open MySQL
mysql -u root -p

# Select database
USE healthtrack;

# Run the update script
source healthtrack-backend/update-database-schema.sql
```

### Verify Admin User

```sql
SELECT * FROM users WHERE role = 'admin';
```

**Expected Result:**
- Email: `admin` (NOT admin@healthtrack.com)
- Role: `admin`
- Name: `Administrator`

---

## 🚀 Step 3: Start Backend Server

```bash
cd healthtrack-backend
npm start
```

**Expected Output:**
```
Attempting DB connection with user: root password: provided
MySQL connected successfully
Server running on port 5000
```

---

## 🧪 Step 4: Test Backend Endpoints

### Option A: Using the Test Script (Recommended)

```bash
cd healthtrack-backend
node test-endpoints.js
```

This will automatically test:
- ✅ User Registration
- ✅ Admin Login
- ✅ User Login
- ✅ Get Current User
- ✅ Admin Statistics
- ✅ Get All Users
- ✅ Create Activity
- ✅ Get Activities
- ✅ Unauthorized Access (should fail)
- ✅ Non-Admin Access (should fail)

### Option B: Manual Testing with cURL

#### Test 1: User Registration

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 2,
    "email": "test@example.com",
    "name": "Test User"
  },
  "message": "Registration successful! Welcome to HealthTrack."
}
```

#### Test 2: Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"admin"}'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "admin",
    "name": "Administrator",
    "role": "admin"
  },
  "message": "Login successful! Welcome back."
}
```

#### Test 3: Admin Statistics (Replace YOUR_ADMIN_TOKEN)

```bash
curl -X GET http://localhost:5000/api/admin/statistics \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "statistics": {
    "total_users": 2,
    "total_admins": 1,
    "total_activities": 0,
    "active_users": 0,
    "activities_today": 0,
    "new_users_today": 1,
    "new_users_week": 1,
    "activities_week": 0
  }
}
```

#### Test 4: Get All Users (Admin Only)

```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

---

## 🌐 Step 5: Test Frontend

### Start Frontend

```bash
cd healthtrack-frontend
npm start
```

Browser should open at `http://localhost:3000`

### Test Registration Flow

1. Navigate to Dashboard (`/dashboard`)
2. Click "Don't have an account? Register here"
3. Fill in:
   - Name: `Test User`
   - Email: `newuser@example.com`
   - Password: `test123456`
4. Click "Register"
5. ✅ Should see success message
6. ✅ Should be logged in automatically
7. ✅ Should see dashboard with activities

### Test Login Flow

1. Logout if logged in
2. Navigate to Dashboard (`/dashboard`)
3. Fill in:
   - Email: `admin`
   - Password: `admin`
4. Click "Login"
5. ✅ Should see success message
6. ✅ Should be logged in
7. ✅ Should see dashboard

### Test Admin Login

1. Logout if logged in
2. Navigate to Dashboard (`/dashboard`)
3. Notice the blue box showing admin credentials
4. Fill in:
   - Email: `admin`
   - Password: `admin`
5. Click "Login"
6. ✅ Should login successfully
7. ✅ User object should have `role: "admin"`

---

## ✅ Verification Checklist

### Backend Tests
- [ ] Admin user exists in database with email `admin`
- [ ] Backend starts without errors
- [ ] Registration endpoint works (`/api/auth/register`)
- [ ] Login endpoint works (`/api/auth/login`)
- [ ] Admin login works with email `admin`
- [ ] Admin statistics endpoint works
- [ ] Admin endpoints require authentication
- [ ] Admin endpoints require admin role

### Frontend Tests
- [ ] Registration form appears when clicking register link
- [ ] Registration creates new user and logs in
- [ ] Login form works with existing users
- [ ] Admin login works with credentials shown
- [ ] Dashboard shows after successful login
- [ ] Activities can be created
- [ ] Logout works properly

---

## 🐛 Troubleshooting

### Issue: "User not found" when logging in as admin

**Solution:** Run the database update script again:
```sql
USE healthtrack;
source healthtrack-backend/update-database-schema.sql;
```

### Issue: "Database connection failed"

**Solution:** Check your .env file:
- Verify DB_USER and DB_PASSWORD are correct
- Ensure MySQL is running
- Verify database `healthtrack` exists

### Issue: "Invalid or expired token"

**Solution:** 
- Check JWT_SECRET is set in .env
- Try logging in again to get a fresh token

### Issue: "Email not sending"

**Solution:**
- Verify EMAIL_USER and EMAIL_PASSWORD in .env
- Ensure you're using Gmail App Password (not regular password)
- Check: https://myaccount.google.com/apppasswords

### Issue: Frontend shows "Login failed"

**Solution:**
- Check backend is running on port 5000
- Check browser console for CORS errors
- Verify API endpoints are correct in App.js

---

## 📊 Expected Test Results

After running all tests, you should see:

```
╔════════════════════════════════════════════════════════╗
║                    TEST SUMMARY                        ║
╚════════════════════════════════════════════════════════╝

Total Tests: 10
Passed: 10
Failed: 0

🎉 All tests passed! Your API is working correctly!
Success Rate: 100.0%
```

---

## 🎯 Next Steps

Once all tests pass:

1. ✅ Configure email service (Step 1 in QUICK_START_CHECKLIST.md)
2. ✅ Complete remaining checklist items
3. ✅ Deploy to Railway (backend)
4. ✅ Deploy to Vercel (frontend)
5. ✅ Take screenshots
6. ✅ Complete project report

---

## 📞 Need Help?

If you encounter issues:

1. Check the error messages carefully
2. Review the console logs (backend and frontend)
3. Verify all environment variables are set
4. Ensure database schema is up to date
5. Check that all dependencies are installed

---

**Good luck with your testing! 🚀**
