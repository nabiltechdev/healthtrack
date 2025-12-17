# 🧪 Manual Testing Commands for HealthTrack

This guide provides step-by-step curl commands to manually test all endpoints.

---

## 📋 Prerequisites

1. ✅ Backend server running on `http://localhost:5000`
2. ✅ Database updated with new schema
3. ✅ `.env` file configured

---

## 🗄️ Step 1: Update Database (REQUIRED FIRST)

```bash
# Open MySQL
mysql -u root -p

# Run these commands:
USE healthtrack;
source healthtrack-backend/update-database-schema.sql;

# Verify admin user
SELECT id, email, name, role FROM users WHERE role = 'admin';
```

**Expected Output:**
```
+----+-------+---------------+-------+
| id | email | name          | role  |
+----+-------+---------------+-------+
|  1 | admin | Administrator | admin |
+----+-------+---------------+-------+
```

---

## 🚀 Step 2: Start Backend Server

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

## 🧪 Step 3: Test Backend Endpoints

### Test 1: User Registration ✅

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "test123456",
    "name": "Test User"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "testuser@example.com",
    "name": "Test User"
  },
  "message": "Registration successful! Welcome to HealthTrack."
}
```

**✅ Success Criteria:**
- Status code: 201
- `success: true`
- Token received
- User object returned

**❌ If Failed:**
- Check if email already exists
- Verify database connection
- Check password length (min 6 characters)

---

### Test 2: Admin Login ✅

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin",
    "password": "admin"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin",
    "name": "Administrator",
    "role": "admin"
  },
  "message": "Login successful! Welcome back."
}
```

**✅ Success Criteria:**
- Status code: 200
- `success: true`
- Token received
- User role is "admin"

**❌ If Failed:**
- Verify database was updated (Step 1)
- Check if admin user exists with email "admin"
- Verify password is "admin"

**📝 SAVE THIS TOKEN - You'll need it for admin endpoints!**

---

### Test 3: Regular User Login ✅

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "testuser@example.com",
    "password": "test123456"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "testuser@example.com",
    "name": "Test User",
    "role": "user"
  },
  "message": "Login successful! Welcome back."
}
```

**✅ Success Criteria:**
- Status code: 200
- User role is "user" (not admin)

**📝 SAVE THIS TOKEN - You'll need it for user endpoints!**

---

### Test 4: Get Current User ✅

Replace `YOUR_USER_TOKEN` with the token from Test 1 or Test 3:

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "user": {
    "id": 2,
    "email": "testuser@example.com",
    "name": "Test User",
    "role": "user",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**✅ Success Criteria:**
- Status code: 200
- User details returned

---

### Test 5: Admin Statistics (Admin Only) ✅

Replace `YOUR_ADMIN_TOKEN` with the token from Test 2:

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

**✅ Success Criteria:**
- Status code: 200
- Statistics object returned
- Numbers make sense

**❌ If Failed:**
- Verify you're using ADMIN token (not user token)
- Check if admin user has role "admin"

---

### Test 6: Get All Users (Admin Only) ✅

```bash
curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN"
```

**Expected Response:**
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "email": "admin",
      "name": "Administrator",
      "role": "admin",
      "created_at": "2024-01-15T10:00:00.000Z",
      "total_activities": 0,
      "last_activity_date": null
    },
    {
      "id": 2,
      "email": "testuser@example.com",
      "name": "Test User",
      "role": "user",
      "created_at": "2024-01-15T10:30:00.000Z",
      "total_activities": 0,
      "last_activity_date": null
    }
  ]
}
```

**✅ Success Criteria:**
- Status code: 200
- Array of users returned
- Both admin and regular users shown

---

### Test 7: Create Activity ✅

Replace `YOUR_USER_TOKEN` with any valid token:

```bash
curl -X POST http://localhost:5000/api/activities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "type": "Running",
    "duration": 30,
    "date": "2024-01-15",
    "calories": 300,
    "notes": "Morning run in the park"
  }'
```

**Expected Response:**
```json
{
  "id": 1,
  "user_id": 2,
  "type": "Running",
  "duration": 30,
  "date": "2024-01-15",
  "calories": 300,
  "notes": "Morning run in the park",
  "created_at": "2024-01-15T10:45:00.000Z"
}
```

**✅ Success Criteria:**
- Status code: 201
- Activity created with ID
- All fields returned

---

### Test 8: Get Activities ✅

```bash
curl -X GET http://localhost:5000/api/activities \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

**Expected Response:**
```json
[
  {
    "id": 1,
    "user_id": 2,
    "type": "Running",
    "duration": 30,
    "date": "2024-01-15",
    "calories": 300,
    "notes": "Morning run in the park",
    "created_at": "2024-01-15T10:45:00.000Z"
  }
]
```

**✅ Success Criteria:**
- Status code: 200
- Array of activities returned
- Only user's own activities shown

---

### Test 9: Update Activity ✅

Replace `ACTIVITY_ID` with the ID from Test 7:

```bash
curl -X PUT http://localhost:5000/api/activities/ACTIVITY_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -d '{
    "type": "Running",
    "duration": 45,
    "date": "2024-01-15",
    "calories": 450,
    "notes": "Extended morning run"
  }'
```

**Expected Response:**
```json
{
  "message": "Activity updated successfully"
}
```

**✅ Success Criteria:**
- Status code: 200
- Success message returned

---

### Test 10: Delete Activity ✅

```bash
curl -X DELETE http://localhost:5000/api/activities/ACTIVITY_ID \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

**Expected Response:**
```json
{
  "message": "Activity deleted successfully"
}
```

**✅ Success Criteria:**
- Status code: 200
- Success message returned

---

## 🔒 Security Tests

### Test 11: Unauthorized Access (Should Fail) ❌

```bash
curl -X GET http://localhost:5000/api/admin/statistics
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Access token required"
}
```

**✅ Success Criteria:**
- Status code: 401
- Access denied

---

### Test 12: Non-Admin Access to Admin Endpoint (Should Fail) ❌

Use a REGULAR USER token (not admin):

```bash
curl -X GET http://localhost:5000/api/admin/statistics \
  -H "Authorization: Bearer YOUR_USER_TOKEN"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Access denied. Admin privileges required."
}
```

**✅ Success Criteria:**
- Status code: 403
- Access denied for non-admin

---

### Test 13: Invalid Token (Should Fail) ❌

```bash
curl -X GET http://localhost:5000/api/activities \
  -H "Authorization: Bearer invalid_token_here"
```

**Expected Response:**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

**✅ Success Criteria:**
- Status code: 403
- Invalid token rejected

---

## 📊 Test Results Summary

After running all tests, fill in this checklist:

### Backend Endpoints
- [ ] User Registration (Test 1)
- [ ] Admin Login (Test 2)
- [ ] Regular User Login (Test 3)
- [ ] Get Current User (Test 4)
- [ ] Admin Statistics (Test 5)
- [ ] Get All Users (Test 6)
- [ ] Create Activity (Test 7)
- [ ] Get Activities (Test 8)
- [ ] Update Activity (Test 9)
- [ ] Delete Activity (Test 10)

### Security
- [ ] Unauthorized Access Blocked (Test 11)
- [ ] Non-Admin Access Blocked (Test 12)
- [ ] Invalid Token Rejected (Test 13)

---

## 🌐 Frontend Testing

After backend tests pass, test the frontend:

### Start Frontend

```bash
cd healthtrack-frontend
npm start
```

Browser opens at `http://localhost:3000`

### Test Registration Flow

1. Navigate to `/dashboard`
2. Click "Don't have an account? Register here"
3. Fill in:
   - Name: `Frontend Test User`
   - Email: `frontend@example.com`
   - Password: `test123456`
4. Click "Register"

**✅ Expected:**
- Success alert appears
- Automatically logged in
- Redirected to dashboard
- Can see activity form

### Test Login Flow

1. Logout (if logged in)
2. Navigate to `/dashboard`
3. Fill in:
   - Email: `frontend@example.com`
   - Password: `test123456`
4. Click "Login"

**✅ Expected:**
- Success alert appears
- Logged in
- Dashboard shows

### Test Admin Login

1. Logout (if logged in)
2. Navigate to `/dashboard`
3. Notice blue box with admin credentials
4. Fill in:
   - Email: `admin`
   - Password: `admin`
5. Click "Login"

**✅ Expected:**
- Success alert appears
- Logged in as admin
- Dashboard shows

### Test Activity Management

1. Login as any user
2. Fill in activity form:
   - Type: `Cycling`
   - Duration: `60`
   - Date: Today's date
   - Calories: `500`
   - Notes: `Test activity`
3. Click "Add Activity"

**✅ Expected:**
- Activity appears in list
- Can edit activity
- Can delete activity

---

## 🐛 Troubleshooting

### Issue: "User not found" for admin

**Solution:**
```bash
mysql -u root -p
USE healthtrack;
SELECT * FROM users WHERE email = 'admin';
# If empty, run:
source healthtrack-backend/update-database-schema.sql;
```

### Issue: "Database connection failed"

**Solution:**
- Check `.env` file exists
- Verify DB_USER and DB_PASSWORD
- Ensure MySQL is running
- Verify database `healthtrack` exists

### Issue: "Invalid token"

**Solution:**
- Check JWT_SECRET is set in `.env`
- Get a fresh token by logging in again
- Ensure token is copied correctly (no extra spaces)

### Issue: CORS errors in browser

**Solution:**
- Verify backend is running on port 5000
- Check frontend is running on port 3000
- Restart both servers

---

## ✅ All Tests Passed?

If all tests pass:

1. ✅ Admin login works
2. ✅ Registration works
3. ✅ All endpoints work
4. ✅ Security is enforced

**Next Steps:**
- Complete email configuration (QUICK_START_CHECKLIST.md Step 1)
- Deploy to Railway (Step 5)
- Deploy to Vercel (Step 6)
- Take screenshots (Step 7)
- Complete project report (Step 8)

---

**Good luck with testing! 🚀**
