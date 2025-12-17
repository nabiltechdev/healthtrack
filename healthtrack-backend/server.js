require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const authenticateToken = require('./middleware/auth');

const app = express();

// CORS configuration for Railway deployment
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  process.env.FRONTEND_URL,
  // Railway will provide these URLs
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('railway.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'healthtrack-backend'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'HealthTrack API is running',
    version: '2.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/login, /api/register',
      activities: '/api/activities',
      analytics: '/api/analytics',
      admin: '/api/admin'
    }
  });
});

// Register all routes
app.use('/api', authRoutes);
app.use('/api', activityRoutes);
app.use('/api', analyticsRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
