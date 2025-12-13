const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// GET /api/analytics/overview - Get overall statistics
router.get('/analytics/overview', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      COUNT(*) as totalActivities,
      COUNT(DISTINCT date) as days_logged,
      COUNT(DISTINCT category) as categories_used,
      SUM(CASE WHEN calories IS NOT NULL THEN 1 ELSE 0 END) as activities_with_nutrition,
      SUM(COALESCE(calories, 0)) as totalCalories,
      SUM(COALESCE(protein, 0)) as totalProtein,
      SUM(COALESCE(carbs, 0)) as totalCarbs,
      SUM(COALESCE(fat, 0)) as totalFat,
      AVG(COALESCE(calories, 0)) as avg_calories_per_activity,
      SUM(COALESCE(water_ml, 0)) as total_water,
      MAX(date) as last_activity_date,
      MIN(date) as first_activity_date,
      DATEDIFF(MAX(date), MIN(date)) + 1 as days_since_first,
      SUM(CASE WHEN date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) THEN 1 ELSE 0 END) as thisWeek,
      SUM(CASE WHEN date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) THEN 1 ELSE 0 END) as thisMonth
    FROM activities
    WHERE user_id = ?
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// GET /api/analytics/streak - Get current streak
router.get('/analytics/streak', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT DISTINCT date 
    FROM activities 
    WHERE user_id = ? 
    ORDER BY date DESC 
    LIMIT 365
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.json({ current_streak: 0, longest_streak: 0 });
    }
    
    // Calculate current streak
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < results.length; i++) {
      const activityDate = new Date(results[i].date);
      activityDate.setHours(0, 0, 0, 0);
      
      const expectedDate = new Date(today);
      expectedDate.setDate(today.getDate() - i);
      
      if (activityDate.getTime() === expectedDate.getTime()) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    // Calculate longest streak
    let longestStreak = 1;
    let tempStreak = 1;
    
    for (let i = 0; i < results.length - 1; i++) {
      const current = new Date(results[i].date);
      const next = new Date(results[i + 1].date);
      const diffDays = Math.floor((current - next) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        tempStreak++;
        longestStreak = Math.max(longestStreak, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    
    res.json({ 
      currentStreak: currentStreak, 
      longestStreak: longestStreak,
      total_days_logged: results.length
    });
  });
});

// GET /api/analytics/by-category - Get activities grouped by category
router.get('/analytics/by-category', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      category,
      COUNT(*) as count,
      SUM(COALESCE(calories, 0)) as total_calories,
      AVG(COALESCE(calories, 0)) as avg_calories
    FROM activities
    WHERE user_id = ?
    GROUP BY category
    ORDER BY count DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/analytics/by-date - Get activities grouped by date
router.get('/analytics/by-date', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { days = 30 } = req.query; // Default to last 30 days
  
  const query = `
    SELECT 
      date,
      COUNT(*) as activity_count,
      SUM(COALESCE(calories, 0)) as total_calories,
      SUM(COALESCE(protein, 0)) as total_protein,
      SUM(COALESCE(carbs, 0)) as total_carbs,
      SUM(COALESCE(fat, 0)) as total_fat,
      SUM(COALESCE(water_ml, 0)) as total_water
    FROM activities
    WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY date
    ORDER BY date ASC
  `;
  
  db.query(query, [userId, parseInt(days)], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/analytics/by-time - Get activities grouped by time of day
router.get('/analytics/by-time', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      HOUR(time) as hour,
      COUNT(*) as count
    FROM activities
    WHERE user_id = ? AND time IS NOT NULL
    GROUP BY HOUR(time)
    ORDER BY hour ASC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Fill in missing hours with 0
    const hourlyData = Array(24).fill(0).map((_, i) => ({ hour: i, count: 0 }));
    results.forEach(row => {
      hourlyData[row.hour].count = row.count;
    });
    
    res.json(hourlyData);
  });
});

// GET /api/analytics/nutrition-summary - Get nutrition summary
router.get('/analytics/nutrition-summary', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { days = 7 } = req.query;
  
  const query = `
    SELECT 
      date,
      SUM(COALESCE(calories, 0)) as total_calories,
      SUM(COALESCE(protein, 0)) as total_protein,
      SUM(COALESCE(carbs, 0)) as total_carbs,
      SUM(COALESCE(fat, 0)) as total_fat,
      SUM(COALESCE(water_ml, 0)) as total_water
    FROM activities
    WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY date
    ORDER BY date DESC
  `;
  
  db.query(query, [userId, parseInt(days)], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Calculate averages
    const totals = results.reduce((acc, day) => ({
      calories: acc.calories + day.total_calories,
      protein: acc.protein + day.total_protein,
      carbs: acc.carbs + day.total_carbs,
      fat: acc.fat + day.total_fat,
      water: acc.water + day.total_water
    }), { calories: 0, protein: 0, carbs: 0, fat: 0, water: 0 });
    
    const daysCount = results.length || 1;
    
    res.json({
      daily_data: results,
      averages: {
        avg_calories: Math.round(totals.calories / daysCount),
        avg_protein: Math.round(totals.protein / daysCount),
        avg_carbs: Math.round(totals.carbs / daysCount),
        avg_fat: Math.round(totals.fat / daysCount),
        avg_water: Math.round(totals.water / daysCount)
      },
      totals
    });
  });
});

// GET /api/analytics/weekly-comparison - Compare current week vs previous weeks
router.get('/analytics/weekly-comparison', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      YEARWEEK(date, 1) as week,
      COUNT(*) as activity_count,
      SUM(COALESCE(calories, 0)) as total_calories
    FROM activities
    WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 12 WEEK)
    GROUP BY YEARWEEK(date, 1)
    ORDER BY week DESC
    LIMIT 12
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/analytics/monthly-summary - Get monthly summary
router.get('/analytics/monthly-summary', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      DATE_FORMAT(date, '%Y-%m') as month,
      COUNT(*) as activity_count,
      COUNT(DISTINCT date) as days_active,
      SUM(COALESCE(calories, 0)) as total_calories,
      AVG(COALESCE(calories, 0)) as avg_calories
    FROM activities
    WHERE user_id = ? AND date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
    GROUP BY DATE_FORMAT(date, '%Y-%m')
    ORDER BY month DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/analytics/top-activities - Get most logged activities
router.get('/analytics/top-activities', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { limit = 10 } = req.query;
  
  const query = `
    SELECT 
      details,
      category,
      COUNT(*) as count,
      AVG(COALESCE(calories, 0)) as avg_calories
    FROM activities
    WHERE user_id = ?
    GROUP BY details, category
    ORDER BY count DESC
    LIMIT ?
  `;
  
  db.query(query, [userId, parseInt(limit)], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/analytics/mood-trends - Get mood trends (if mood tracking is used)
router.get('/analytics/mood-trends', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT 
      mood,
      COUNT(*) as count,
      DATE(MAX(date)) as last_logged
    FROM activities
    WHERE user_id = ? AND mood IS NOT NULL
    GROUP BY mood
    ORDER BY count DESC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
