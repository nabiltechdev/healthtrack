# ⚡ Quick Start Checklist - HealthTrack Phase 2

## 🎯 Complete These Steps in Order

---

## ✅ Step 1: Configure Email Service (5 minutes)

### 1.1 Get Gmail App Password
- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Enable 2-Step Verification if not enabled
- [ ] Generate App Password for "HealthTrack"
- [ ] Copy the 16-character password

### 1.2 Update .env File
- [ ] Open `healthtrack-backend/.env`
- [ ] Add these lines:
```env
EMAIL_USER=82310010@students.liu.edu.lb
EMAIL_PASSWORD=your-16-character-password-here
FRONTEND_URL=http://localhost:3000
```
- [ ] Save the file

---

## ✅ Step 2: Update Database (5 minutes)

### 2.1 Run Update Script
```bash
# Open MySQL
mysql -u root -p

# Select database
USE healthtrack;

# Run update script
source healthtrack-backend/update-database-schema.sql
```

### 2.2 Verify Changes
```sql
-- Check if admin user exists
SELECT * FROM users WHERE role = 'admin';

-- Check if new columns exist
DESCRIBE users;

-- Check if new tables exist
SHOW TABLES;
```

Expected results:
- [ ] Admin user exists (email: admin)
- [ ] Users table has 'name' and 'role' columns
- [ ] email_notifications table exists
- [ ] activity_logs table exists

---

## ✅ Step 3: Test Backend (10 minutes)

### 3.1 Start Backend
```bash
cd healthtrack-backend
npm start
```

### 3.2 Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

Expected:
- [ ] Status 201
- [ ] Token received
- [ ] Welcome email sent to 82310010@students.liu.edu.lb

### 3.3 Test Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"admin"}'
```

Expected:
- [ ] Status 200
- [ ] Token received
- [ ] User role is "admin"

### 3.4 Test Admin Endpoint
```bash
# Replace YOUR_TOKEN with token from step 3.3
curl -X GET http://localhost:5000/api/admin/statistics \
  -H "Authorization: Bearer YOUR_TOKEN"
```

Expected:
- [ ] Status 200
- [ ] Statistics returned

---

## ✅ Step 4: Update Frontend (15 minutes)

### 4.1 Update API Endpoints

**File: `healthtrack-frontend/src/App.js`**

Find the `handleLogin` function and update it to use the new endpoint:

```javascript
const handleLogin = async (email, password) => {
  try {
    // Changed from /api/login to /api/auth/login
    const res = await axios.post('http://localhost:5000/api/auth/login', { 
      email, 
      password 
    });
    
    // Handle new response format
    if (res.data.success) {
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      fetchActivities(token);
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Login failed');
  }
};
```

### 4.2 Add Registration Function

Add this function to `App.js`:

```javascript
const handleRegister = async (email, password, name) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', { 
      email, 
      password,
      name 
    });
    
    if (res.data.success) {
      const { token, user } = res.data;
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      fetchActivities(token);
      alert('Registration successful! Check your email for welcome message.');
    }
  } catch (err) {
    alert(err.response?.data?.message || 'Registration failed');
  }
};
```

### 4.3 Test Frontend
- [ ] Start frontend: `npm start`
- [ ] Try registering a new user
- [ ] Try logging in
- [ ] Check if activities load
- [ ] Test all CRUD operations

---

## ✅ Step 5: Deploy to Railway (30 minutes)

Follow `DEPLOYMENT_GUIDE.md` for detailed steps:

- [ ] Create Railway account
- [ ] Create new project
- [ ] Add MySQL database
- [ ] Deploy backend
- [ ] Configure environment variables
- [ ] Import database schema
- [ ] Test deployed API

**Backend URL:** _________________

---

## ✅ Step 6: Deploy to Vercel (15 minutes)

- [ ] Create Vercel account
- [ ] Import project
- [ ] Configure build settings
- [ ] Add environment variable: `REACT_APP_API_URL`
- [ ] Deploy
- [ ] Test deployed frontend

**Frontend URL:** _________________

---

## ✅ Step 7: Take Screenshots (20 minutes)

Create a `screenshots/` folder and capture:

- [ ] Home page
- [ ] Registration form
- [ ] Login form
- [ ] Dashboard with activities
- [ ] Add activity form
- [ ] Edit activity modal
- [ ] Analytics page with charts
- [ ] Admin panel (if implemented)
- [ ] Mobile responsive view
- [ ] Welcome email in inbox
- [ ] Database tables in MySQL

---

## ✅ Step 8: Create Project Report (2 hours)

- [ ] Open `PROJECT_REPORT_TEMPLATE.md`
- [ ] Fill in all sections
- [ ] Add screenshots
- [ ] Add code snippets
- [ ] Review for completeness
- [ ] Export as PDF

---

## ✅ Step 9: Update README (15 minutes)

Add to `README.md`:

```markdown
## 🌐 Live Demo

- **Frontend:** https://your-frontend.vercel.app
- **Backend API:** https://your-backend.railway.app

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Dashboard
![Dashboard](screenshots/dashboard.png)

### Analytics
![Analytics](screenshots/analytics.png)

## 👤 Test Credentials

- **Admin:** email: `admin`, password: `admin`
- **Regular User:** Register your own account
```

---

## ✅ Step 10: Final Checks (15 minutes)

### Code Quality
- [ ] No console errors in browser
- [ ] No errors in backend logs
- [ ] All features working
- [ ] Responsive on mobile
- [ ] Email notifications working

### Documentation
- [ ] README updated with live links
- [ ] Screenshots added
- [ ] Project report completed
- [ ] All guides reviewed

### Submission
- [ ] GitHub repository updated
- [ ] All commits pushed
- [ ] Project report PDF ready
- [ ] Live demo links working
- [ ] Group contribution statement prepared

---

## 📊 Progress Tracker

**Estimated Time:** 3-4 hours total

- [ ] Step 1: Email Configuration (5 min)
- [ ] Step 2: Database Update (5 min)
- [ ] Step 3: Backend Testing (10 min)
- [ ] Step 4: Frontend Update (15 min)
- [ ] Step 5: Railway Deployment (30 min)
- [ ] Step 6: Vercel Deployment (15 min)
- [ ] Step 7: Screenshots (20 min)
- [ ] Step 8: Project Report (2 hours)
- [ ] Step 9: README Update (15 min)
- [ ] Step 10: Final Checks (15 min)

**Total Progress:** _____ / 10 steps completed

---

## 🆘 Quick Troubleshooting

### Email not sending?
```bash
# Test email configuration
cd healthtrack-backend
node -e "require('./services/emailService').testEmailConfiguration()"
```

### Database errors?
```bash
# Check if MySQL is running
mysql -u root -p -e "SELECT 1"

# Verify database exists
mysql -u root -p -e "SHOW DATABASES LIKE 'healthtrack'"
```

### Backend not starting?
```bash
# Check for port conflicts
netstat -ano | findstr :5000

# Reinstall dependencies
cd healthtrack-backend
rm -rf node_modules
npm install
```

### Frontend not connecting?
- Check if backend is running
- Verify API URL in frontend
- Check browser console for CORS errors

---

## 📞 Need Help?

Refer to these guides:
- **Setup:** `SETUP_GUIDE.md`
- **Deployment:** `DEPLOYMENT_GUIDE.md`
- **Assessment:** `PROJECT_ASSESSMENT_AND_RECOMMENDATIONS.md`
- **Summary:** `IMPLEMENTATION_SUMMARY.md`

---

## 🎉 Completion

Once all steps are checked:

✅ **Your project is ready for submission!**

**Expected Grade:** 85-95/100 (with bonus: 95-105/100)

**Good luck! 🚀**

---

**Last Updated:** ${new Date().toLocaleDateString()}
