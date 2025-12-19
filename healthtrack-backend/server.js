require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activities');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const authenticateToken = require('./middleware/auth');

const app = express();

/* ===== CORS (SAFE FOR EXPRESS 5) ===== */
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://healthtrack-dun.vercel.app'
  ],
  credentials: true
}));

/* ===== Middleware ===== */
app.use(express.json());

/* ===== Health ===== */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

/* ===== Root ===== */
app.get('/', (req, res) => {
  res.json({ message: 'HealthTrack API running' });
});

/* ===== Routes ===== */
app.use('/api', authRoutes);
app.use('/api', activityRoutes);
app.use('/api', analyticsRoutes);
app.use('/api/admin', authenticateToken, adminRoutes);

/* ===== 404 (NO STAR) ===== */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/* ===== Crash visibility ===== */
process.on('uncaughtException', (err) => {
  console.error('🔥 Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('🔥 Unhandled Rejection:', reason);
});

/* ===== Start ===== */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
