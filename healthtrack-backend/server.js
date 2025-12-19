require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const authenticateToken = require('./middleware/auth');

const app = express();

// ===== CORS Configuration =====
const allowedOrigins = [
  'http://localhost:3000', // React dev
  'http://localhost:5000', // backend dev
  'https://healthtrack-dun.vercel.app' // Vercel frontend
];

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://healthtrack-dun.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Handle preflight OPTIONS requests globally
app.options('*', cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ===== Middleware =====
app.use(express.json()); // parse JSON body

// ===== Health check =====
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'healthtrack-backend'
  });
});

// ===== Root endpoint =====
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

// ===== Routes =====
app.use('/api', authRoutes);
app.use('/api', activityRoutes);
app.use('/api', analyticsRoutes);
// app.use('/api/admin', authenticateToken, adminRoutes);

// ===== Error handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message
  });
});

// ===== 404 handler =====
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("🔥 UNHANDLED REJECTION:", reason);
});