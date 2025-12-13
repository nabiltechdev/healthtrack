# 🏃‍♂️ HealthTrack - Personal Health & Fitness Tracking Application

A full-stack web application for tracking personal health and fitness activities with analytics and insights.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **User Authentication**: Secure JWT-based authentication system
- **Activity Tracking**: Log and manage various health activities (running, cycling, swimming, gym, yoga, etc.)
- **Analytics Dashboard**: Visualize your fitness progress with charts and statistics
- **Search & Filter**: Easily find and filter activities by type, date, or duration
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant feedback on all CRUD operations

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MySQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **Axios** - HTTP client

## 📁 Project Structure

```
healthtrack/
├── healthtrack-backend/          # Backend API server
│   ├── middleware/               # Authentication middleware
│   │   └── auth.js
│   ├── routes/                   # API routes
│   │   ├── activities.js         # Activity CRUD operations
│   │   ├── analytics.js          # Analytics endpoints
│   │   └── auth.js               # Authentication routes
│   ├── .env                      # Environment variables
│   ├── db.js                     # Database connection
│   ├── server.js                 # Express server setup
│   ├── setup-database-enhanced.sql  # Database schema
│   ├── add-sample-data.sql       # Sample data (optional)
│   └── package.json              # Backend dependencies
│
├── healthtrack-frontend/         # Frontend React application
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   │   ├── ActivityForm.js
│   │   │   ├── ActivityList.js
│   │   │   ├── EditActivityModal.js
│   │   │   ├── Footer.js
│   │   │   ├── Navbar.js
│   │   │   ├── SearchFilter.js
│   │   │   └── ThemeToggle.js
│   │   ├── context/              # React Context
│   │   │   └── ThemeContext.js
│   │   ├── pages/                # Page components
│   │   │   ├── Home.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Analytics.js
│   │   │   ├── About.js
│   │   │   ├── Contact.js
│   │   │   └── Features.js
│   │   ├── App.js                # Main app component
│   │   └── index.js              # Entry point
│   ├── tailwind.config.js        # Tailwind configuration
│   └── package.json              # Frontend dependencies
│
├── .gitignore                    # Git ignore rules
└── README.md                     # This file
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** (v6.0.0 or higher)
- **MySQL** (v8.0 or higher)
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nabiltechdev/healthtrack.git
cd healthtrack
```

### 2. Install Backend Dependencies

```bash
cd healthtrack-backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../healthtrack-frontend
npm install
```

## ⚙️ Configuration

### 1. Setup MySQL Database

Start your MySQL server:

```bash
# Windows
net start MySQL80

# macOS/Linux
sudo systemctl start mysql
```

### 2. Create Database and Tables

```bash
# Login to MySQL
mysql -u root -p

# Run the database setup script
source healthtrack-backend/setup-database-enhanced.sql

# Optional: Add sample data
source healthtrack-backend/add-sample-data.sql
```

### 3. Configure Environment Variables

The backend already includes a `.env` file with default configuration:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=healthtrack
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
```

**Important**: Change the `JWT_SECRET` to a secure random string in production.

## 🏃 Running the Application

### Start Backend Server

```bash
cd healthtrack-backend
npm start
```

The backend server will run on `http://localhost:5000`

### Start Frontend Application

In a new terminal:

```bash
cd healthtrack-frontend
npm start
```

The frontend application will run on `http://localhost:3000`

### Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Activities
- `GET /api/activities` - Get all activities (requires auth)
- `POST /api/activities` - Create new activity (requires auth)
- `PUT /api/activities/:id` - Update activity (requires auth)
- `DELETE /api/activities/:id` - Delete activity (requires auth)

### Analytics
- `GET /api/analytics/summary` - Get activity summary (requires auth)
- `GET /api/analytics/by-type` - Get activities grouped by type (requires auth)
- `GET /api/analytics/trends` - Get activity trends (requires auth)

## 🎨 Features in Detail

### Dashboard
- View all your logged activities
- Add new activities with details (type, duration, calories, notes)
- Edit or delete existing activities
- Search and filter activities

### Analytics
- Visual charts showing activity distribution
- Total statistics (activities, duration, calories)
- Activity trends over time
- Breakdown by activity type

### Theme Toggle
- Switch between dark and light modes
- Preference saved in local storage

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- CORS configuration
- SQL injection prevention

## 🧪 Testing

### Backend Testing
```bash
cd healthtrack-backend
npm test
```

### Frontend Testing
```bash
cd healthtrack-frontend
npm test
```

## 📝 Development

### Backend Development Mode
```bash
cd healthtrack-backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development Mode
```bash
cd healthtrack-frontend
npm start  # Hot reload enabled
```

## 🐛 Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Verify database credentials in `.env`
- Check if `healthtrack` database exists

### Port Already in Use
- Backend: Change `PORT` in `.env`
- Frontend: Set `PORT=3001` in environment

### CORS Errors
- Verify backend CORS configuration
- Check frontend API base URL

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Nabil Abouyaghi**
- GitHub: [@nabiltechdev](https://github.com/nabiltechdev)
- Email: nabilabouyaghi@gmail.com

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Express.js community for the robust backend framework

## 📞 Support

For support, email nabilabouyaghi@gmail.com or open an issue in the GitHub repository.

---

**Made with ❤️ by Nabil Abouyaghi**
