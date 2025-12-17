# HealthTrack - Personal Health & Fitness Tracking Application
## CSCI426: Advanced Web Programming - Project Phase 2

**Student Name:** [Your Name]  
**Student ID:** [Your ID]  
**Email:** 82310010@students.liu.edu.lb  
**Date:** ${new Date().toLocaleDateString()}  
**GitHub Repository:** https://github.com/[your-username]/healthtrack

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Description](#project-description)
3. [Technologies Used](#technologies-used)
4. [System Architecture](#system-architecture)
5. [Database Design](#database-design)
6. [Key Features Implementation](#key-features-implementation)
7. [Code Snippets](#code-snippets)
8. [Screenshots](#screenshots)
9. [Deployment](#deployment)
10. [Challenges and Solutions](#challenges-and-solutions)
11. [Future Enhancements](#future-enhancements)
12. [Conclusion](#conclusion)

---

## 1. Executive Summary

HealthTrack is a comprehensive full-stack web application designed to help users track their health and fitness activities. The application provides an intuitive interface for logging daily activities, monitoring nutrition, setting goals, and visualizing progress through detailed analytics.

**Key Achievements:**
- ✅ Full CRUD operations on MySQL database
- ✅ Secure JWT-based authentication system
- ✅ Admin panel for system management
- ✅ Email notification system
- ✅ Responsive design for all devices
- ✅ Deployed on Railway (backend) and Vercel (frontend)

---

## 2. Project Description

### 2.1 Problem Statement

Many individuals struggle to maintain consistent health and fitness routines due to lack of proper tracking and motivation. HealthTrack addresses this by providing:

- Easy activity logging
- Progress visualization
- Goal setting and tracking
- Achievement system for motivation
- Admin oversight for system management

### 2.2 Solution Overview

HealthTrack is a modern web application that combines:
- **Backend:** Node.js with Express.js for RESTful API
- **Frontend:** React.js for dynamic user interface
- **Database:** MySQL for reliable data storage
- **Authentication:** JWT tokens for secure access
- **Notifications:** Email alerts for user engagement

---

## 3. Technologies Used

### 3.1 Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| MySQL | 8.0 | Database |
| JWT | 9.0.2 | Authentication |
| bcryptjs | 3.0.3 | Password hashing |
| Nodemailer | 6.9.x | Email service |
| CORS | 2.8.5 | Cross-origin requests |
| dotenv | 17.2.3 | Environment variables |

### 3.2 Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.x | UI library |
| React Router | 6.x | Navigation |
| Axios | 1.x | HTTP client |
| Tailwind CSS | 3.x | Styling |
| Context API | - | State management |

### 3.3 Development Tools

- **Version Control:** Git & GitHub
- **Code Editor:** Visual Studio Code
- **API Testing:** Postman / cURL
- **Database Management:** MySQL Workbench / phpMyAdmin

---

## 4. System Architecture

### 4.1 Architecture Diagram

```
┌─────────────────┐
│   React.js      │
│   Frontend      │
│  (Port 3000)    │
└────────┬────────┘
         │ HTTP/HTTPS
         │ REST API
         ▼
┌─────────────────┐
│   Express.js    │
│   Backend       │
│  (Port 5000)    │
└────────┬────────┘
         │ SQL Queries
         ▼
┌─────────────────┐
│   MySQL         │
│   Database      │
│  (Port 3306)    │
└─────────────────┘
```

### 4.2 Request Flow

1. User interacts with React frontend
2. Frontend sends HTTP request to Express backend
3. Backend validates JWT token
4. Backend queries MySQL database
5. Database returns data
6. Backend processes and sends response
7. Frontend updates UI

---

## 5. Database Design

### 5.1 Entity Relationship Diagram

```
┌──────────────┐         ┌──────────────┐
│    users     │         │  activities  │
├──────────────┤         ├──────────────┤
│ id (PK)      │────────<│ user_id (FK) │
│ email        │    1:N  │ id (PK)      │
│ password     │         │ type         │
│ name         │         │ date         │
│ role         │         │ calories     │
│ created_at   │         │ details      │
└──────────────┘         └──────────────┘
       │
       │ 1:N
       ▼
┌──────────────────┐
│ email_notifications│
├──────────────────┤
│ id (PK)          │
│ user_id (FK)     │
│ email_type       │
│ subject          │
│ sent_at          │
└──────────────────┘
```

### 5.2 Database Tables

#### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Activities Table
```sql
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(100) NOT NULL,
  details TEXT,
  date DATE NOT NULL,
  time TIME,
  calories INT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Email Notifications Table
```sql
CREATE TABLE email_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_type VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'sent',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 6. Key Features Implementation

### 6.1 User Authentication

**Registration:**
- Email validation
- Password strength checking (minimum 6 characters)
- Password hashing with bcrypt
- JWT token generation
- Welcome email sent automatically

**Login:**
- Credential verification
- Token generation with 24-hour expiry
- Role-based access control

### 6.2 CRUD Operations

**Create:** Add new health activities
**Read:** View all activities with filtering
**Update:** Edit existing activities
**Delete:** Remove activities

### 6.3 Admin Panel

- View all users and their statistics
- Monitor system-wide activity
- Manage user roles
- Delete users or activities
- View analytics and trends

### 6.4 Email Notifications

- Welcome email on registration
- Activity reminders
- Goal achievement notifications
- HTML-formatted emails with branding

### 6.5 Analytics Dashboard

- Activity distribution charts
- Calorie tracking
- Progress visualization
- Time-based trends

---

## 7. Code Snippets

### 7.1 User Registration Endpoint

```javascript
// routes/auth.js
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  // Validation
  if (!validateEmail(email)) {
    return res.status(400).json({ 
      success: false,
      message: 'Please provide a valid email address' 
    });
  }
  
  if (!validatePassword(password)) {
    return res.status(400).json({ 
      success: false,
      message: 'Password must be at least 6 characters long' 
    });
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Insert user
  db.query(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)', 
    [email, hashedPassword, name],
    (err, result) => {
      if (err) {
        return res.status(500).json({ 
          success: false,
          error: 'Failed to create user account' 
        });
      }
      
      const userId = result.insertId;
      const token = jwt.sign(
        { id: userId, email: email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' }
      );
      
      // Send welcome email
      sendWelcomeEmail(email, name, userId);
      
      res.status(201).json({ 
        success: true,
        token, 
        user: { id: userId, email, name },
        message: 'Registration successful!' 
      });
    }
  );
});
```

### 7.2 JWT Authentication Middleware

```javascript
// middleware/auth.js
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};
```

### 7.3 Admin Statistics Endpoint

```javascript
// routes/admin.js
router.get('/statistics', isAdmin, (req, res) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM users) as total_users,
      (SELECT COUNT(*) FROM activities) as total_activities,
      (SELECT COUNT(DISTINCT user_id) FROM activities) as active_users,
      (SELECT COUNT(*) FROM activities 
       WHERE DATE(created_at) = CURDATE()) as activities_today
  `;
  
  db.query(statsQuery, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch statistics' 
      });
    }
    
    res.json({ 
      success: true,
      statistics: results[0] 
    });
  });
});
```

### 7.4 Email Service

```javascript
// services/emailService.js
const sendWelcomeEmail = async (email, name, userId) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  
  const mailOptions = {
    from: `HealthTrack <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Welcome to HealthTrack! 🏃‍♂️',
    html: `
      <h1>Welcome ${name}!</h1>
      <p>Thank you for joining HealthTrack.</p>
      <a href="${process.env.FRONTEND_URL}/dashboard">
        Get Started
      </a>
    `
  };
  
  await transporter.sendMail(mailOptions);
  console.log(`Welcome email sent to ${email}`);
};
```

### 7.5 React Activity Form Component

```javascript
// components/ActivityForm.js
const ActivityForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '',
    date: new Date().toISOString().split('T')[0],
    calories: '',
    details: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      setFormData({ type: '', date: '', calories: '', details: '' });
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Activity Type"
        value={formData.type}
        onChange={(e) => setFormData({...formData, type: e.target.value})}
        required
      />
      {/* More form fields... */}
      <button type="submit">Add Activity</button>
    </form>
  );
};
```

---

## 8. Screenshots

### 8.1 Home Page
[Insert screenshot of landing page]

**Description:** The home page features a modern design with a hero section, feature highlights, and call-to-action buttons for registration and login.

### 8.2 Registration Page
[Insert screenshot of registration form]

**Description:** User-friendly registration form with email validation and password strength indicators.

### 8.3 Dashboard
[Insert screenshot of dashboard]

**Description:** Main dashboard showing user's activities, quick stats, and action buttons for adding new activities.

### 8.4 Activity List
[Insert screenshot of activity list]

**Description:** Comprehensive list of all logged activities with search and filter capabilities.

### 8.5 Analytics Page
[Insert screenshot of analytics]

**Description:** Visual representation of user's progress with charts showing activity distribution and calorie tracking.

### 8.6 Admin Panel
[Insert screenshot of admin panel]

**Description:** Admin dashboard displaying system statistics, user management, and activity monitoring.

### 8.7 Email Notification
[Insert screenshot of welcome email]

**Description:** Professional welcome email sent to new users upon registration.

### 8.8 Mobile Responsive View
[Insert screenshot of mobile view]

**Description:** Fully responsive design that works seamlessly on mobile devices.

---

## 9. Deployment

### 9.1 Backend Deployment (Railway)

**URL:** https://healthtrack-backend.up.railway.app

**Steps:**
1. Created Railway account and connected GitHub
2. Deployed backend from repository
3. Added MySQL database service
4. Configured environment variables
5. Imported database schema
6. Verified API endpoints

### 9.2 Frontend Deployment (Vercel)

**URL:** https://healthtrack.vercel.app

**Steps:**
1. Created Vercel account and connected GitHub
2. Imported frontend project
3. Configured build settings
4. Added environment variables
5. Deployed and verified functionality

### 9.3 Environment Configuration

**Backend Environment Variables:**
- DB_HOST, DB_USER, DB_PASSWORD, DB_NAME
- JWT_SECRET
- EMAIL_USER, EMAIL_PASSWORD
- PORT, NODE_ENV

**Frontend Environment Variables:**
- REACT_APP_API_URL

---

## 10. Challenges and Solutions

### 10.1 Challenge: CORS Issues

**Problem:** Frontend couldn't communicate with backend due to CORS restrictions.

**Solution:** Configured CORS middleware in Express to allow requests from frontend domain:
```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://healthtrack.vercel.app'],
  credentials: true
}));
```

### 10.2 Challenge: Email Service Configuration

**Problem:** Gmail blocking email sending attempts.

**Solution:** Set up Gmail App Password with 2-Step Verification and used it in Nodemailer configuration.

### 10.3 Challenge: JWT Token Expiration

**Problem:** Users getting logged out unexpectedly.

**Solution:** Increased token expiry to 24 hours and implemented token refresh mechanism.

### 10.4 Challenge: Database Relationships

**Problem:** Ensuring data integrity with foreign keys.

**Solution:** Implemented proper CASCADE rules and database constraints to maintain referential integrity.

---

## 11. Future Enhancements

### 11.1 Short-term Goals (1-3 months)

1. **Mobile Application**
   - Develop React Native app for iOS and Android
   - Push notifications for reminders

2. **Social Features**
   - Friend system
   - Activity sharing
   - Leaderboards

3. **Advanced Analytics**
   - Machine learning predictions
   - Personalized recommendations
   - Trend analysis

### 11.2 Long-term Goals (6-12 months)

1. **Wearable Integration**
   - Fitbit API integration
   - Apple Health sync
   - Google Fit connection

2. **Nutrition Database**
   - Food database integration
   - Barcode scanning
   - Meal planning

3. **Gamification**
   - Achievement badges
   - Challenges and competitions
   - Reward system

4. **AI Coach**
   - Personalized workout plans
   - Nutrition advice
   - Progress predictions

---

## 12. Conclusion

### 12.1 Project Summary

HealthTrack successfully demonstrates a complete full-stack web application with:
- ✅ Robust backend API with Node.js and Express
- ✅ Interactive frontend with React
- ✅ Secure authentication system
- ✅ Complete CRUD operations
- ✅ Admin panel for management
- ✅ Email notification system
- ✅ Deployed and accessible online

### 12.2 Learning Outcomes

Through this project, I gained valuable experience in:
- Full-stack web development
- RESTful API design
- Database design and optimization
- Authentication and authorization
- Email service integration
- Cloud deployment
- Version control with Git

### 12.3 Project Impact

HealthTrack provides a practical solution for individuals seeking to:
- Track their fitness journey
- Monitor nutrition intake
- Set and achieve health goals
- Visualize progress over time

### 12.4 Final Thoughts

This project demonstrates the practical application of web development concepts learned in CSCI426. The implementation of modern technologies and best practices ensures a scalable, maintainable, and user-friendly application.

---

## Appendices

### Appendix A: API Documentation

Complete API documentation available at: [GitHub Repository]/API_DOCS.md

### Appendix B: Database Schema

Full database schema available at: [GitHub Repository]/healthtrack-backend/setup-database-enhanced.sql

### Appendix C: Installation Guide

Detailed setup instructions available at: [GitHub Repository]/SETUP_GUIDE.md

### Appendix D: Deployment Guide

Step-by-step deployment guide available at: [GitHub Repository]/DEPLOYMENT_GUIDE.md

---

## References

1. Express.js Documentation: https://expressjs.com/
2. React.js Documentation: https://react.dev/
3. MySQL Documentation: https://dev.mysql.com/doc/
4. JWT.io: https://jwt.io/
5. Nodemailer Documentation: https://nodemailer.com/
6. Railway Documentation: https://docs.railway.app/
7. Vercel Documentation: https://vercel.com/docs

---

**Project Completed:** ${new Date().toLocaleDateString()}  
**Total Development Time:** [X] hours  
**Lines of Code:** [Approximately X,XXX lines]  
**GitHub Repository:** https://github.com/[your-username]/healthtrack

---

**End of Report**
