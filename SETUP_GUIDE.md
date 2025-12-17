# 🚀 HealthTrack Setup Guide - Phase 2 Implementation

## 📋 Prerequisites Checklist

- [x] Node.js installed (v14+)
- [x] MySQL installed and running
- [x] Git initialized
- [ ] Gmail account for email notifications
- [ ] Railway account (for deployment)

---

## 🔧 Step 1: Database Setup

### 1.1 Update Database Schema

Run the following SQL script in your MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Select your database
USE healthtrack;

# Run the update script
source healthtrack-backend/update-database-schema.sql
```

This will:
- Add `name` and `role` columns to users table
- Create admin user (email: admin, password: admin)
- Create email_notifications table
- Create activity_logs table
- Create admin statistics views

### 1.2 Verify Admin User

```sql
SELECT * FROM users WHERE role = 'admin';
```

You should see the admin user with email 'admin'.

---

## 📧 Step 2: Email Configuration

### 2.1 Set Up Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security" in the left sidebar
3. Enable "2-Step Verification" if not already enabled
4. Go to "App passwords": https://myaccount.google.com/apppasswords
5. Select "Mail" and "Other (Custom name)"
6. Enter "HealthTrack" as the name
7. Click "Generate"
8. **Copy the 16-character password** (you'll need this next)

### 2.2 Update .env File

Open `healthtrack-backend/.env` and add/update these lines:

```env
# Email Configuration
EMAIL_USER=82310010@students.liu.edu.lb
EMAIL_PASSWORD=your-16-character-app-password-here
```

**Important:** Replace `your-16-character-app-password-here` with the password you generated in step 2.1

### 2.3 Test Email Configuration

```bash
cd healthtrack-backend
node -e "require('./services/emailService').testEmailConfiguration()"
```

You should see: ✅ Email service is ready to send emails

---

## 🔄 Step 3: Update Frontend for New Auth Endpoints

The backend now has separate `/api/auth/register` and `/api/auth/login` endpoints.

### 3.1 Update Frontend API Calls

You'll need to update the frontend to use:
- `POST /api/auth/register` for registration
- `POST /api/auth/login` for login

The response format now includes a `success` field:

```javascript
{
  success: true,
  token: "...",
  user: { id, email, name, role },
  message: "..."
}
```

---

## 🎨 Step 4: Create Admin Panel Frontend (Optional)

Create a new page `healthtrack-frontend/src/pages/AdminPanel.js` to display:
- User statistics
- Recent activities
- User management
- System analytics

---

## 🚀 Step 5: Test the New Features

### 5.1 Test Registration with Email

```bash
# Start backend
cd healthtrack-backend
npm start

# In another terminal, test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'
```

Check your email (82310010@students.liu.edu.lb) - you should receive a welcome email!

### 5.2 Test Admin Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin","password":"admin"}'
```

Save the token from the response.

### 5.3 Test Admin Endpoints

```bash
# Replace YOUR_TOKEN with the token from step 5.2
curl -X GET http://localhost:5000/api/admin/statistics \
  -H "Authorization: Bearer YOUR_TOKEN"

curl -X GET http://localhost:5000/api/admin/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📦 Step 6: Install Dependencies

Make sure all dependencies are installed:

```bash
# Backend
cd healthtrack-backend
npm install

# Frontend
cd ../healthtrack-frontend
npm install
```

---

## 🏃 Step 7: Run the Application

### Terminal 1 - Backend
```bash
cd healthtrack-backend
npm start
```

### Terminal 2 - Frontend
```bash
cd healthtrack-frontend
npm start
```

The application should now be running with:
- ✅ Separate registration and login endpoints
- ✅ Enhanced validation
- ✅ Admin panel backend
- ✅ Email notifications
- ✅ Admin user (email: admin, password: admin)

---

## 🔐 Security Notes

1. **Change the admin password immediately** after first login
2. **Never commit .env file** to Git (it's already in .gitignore)
3. **Use strong JWT_SECRET** in production
4. **Keep your Gmail App Password secure**

---

## 🐛 Troubleshooting

### Email not sending?
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Look for errors in backend console

### Database errors?
- Ensure MySQL is running
- Verify database credentials in .env
- Check if all tables exist

### Admin endpoints returning 403?
- Verify you're using admin user token
- Check if role field exists in users table
- Ensure token includes role information

---

## 📝 Next Steps

1. ✅ Database schema updated
2. ✅ Email service configured
3. ✅ Admin endpoints created
4. ⏳ Create admin panel frontend
5. ⏳ Deploy to Railway
6. ⏳ Create project report
7. ⏳ Add UI screenshots

---

## 🆘 Need Help?

If you encounter any issues:
1. Check the console logs for errors
2. Verify all environment variables are set
3. Ensure MySQL is running
4. Test each endpoint individually

---

**Last Updated:** ${new Date().toLocaleDateString()}
**Version:** 2.0 - Phase 2 Implementation
