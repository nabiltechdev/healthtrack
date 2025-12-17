const express = require('express');
const db = require('../db');
const router = express.Router();

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

// GET all users (Admin only)
router.get('/users', isAdmin, (req, res) => {
  const query = `
    SELECT 
      u.id,
      u.email,
      u.name,
      u.role,
      u.created_at,
      COUNT(a.id) as total_activities,
      MAX(a.created_at) as last_activity_date
    FROM users u
    LEFT JOIN activities a ON u.id = a.user_id
    GROUP BY u.id, u.email, u.name, u.role, u.created_at
    ORDER BY u.created_at DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false,
        error: 'Failed to fetch users' 
      });
    }
    
    res.json({ 
      success: true,
      users: results 
    });
  });
});

// GET single user details (Admin only)
router.get('/users/:id', isAdmin, (req, res) => {
  const userId = req.params.id;
  
  const userQuery = 'SELECT id, email, name, role, created_at FROM users WHERE id = ?';
  const activitiesQuery = 'SELECT * FROM activities WHERE user_id = ? ORDER BY date DESC LIMIT 10';
  
  db.query(userQuery, [userId], (err, userResults) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    if (userResults.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    db.query(activitiesQuery, [userId], (err, activityResults) => {
      if (err) {
        return res.status(500).json({ 
          success: false,
          error: 'Database error' 
        });
      }
      
      res.json({ 
        success: true,
        user: userResults[0],
        recentActivities: activityResults 
      });
    });
  });
});

// GET admin dashboard statistics
router.get('/statistics', isAdmin, (req, res) => {
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM users) as total_users,
      (SELECT COUNT(*) FROM users WHERE role = 'admin') as total_admins,
      (SELECT COUNT(*) FROM activities) as total_activities,
      (SELECT COUNT(DISTINCT user_id) FROM activities) as active_users,
      (SELECT COUNT(*) FROM activities WHERE DATE(created_at) = CURDATE()) as activities_today,
      (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()) as new_users_today,
      (SELECT COUNT(*) FROM users WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)) as new_users_week,
      (SELECT COUNT(*) FROM activities WHERE DATE(created_at) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)) as activities_week
  `;
  
  db.query(statsQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
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

// GET activity distribution by type
router.get('/activities/distribution', isAdmin, (req, res) => {
  const query = `
    SELECT 
      type,
      COUNT(*) as count,
      SUM(COALESCE(calories, 0)) as total_calories
    FROM activities
    GROUP BY type
    ORDER BY count DESC
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    res.json({ 
      success: true,
      distribution: results 
    });
  });
});

// GET recent activities across all users
router.get('/activities/recent', isAdmin, (req, res) => {
  const limit = req.query.limit || 20;
  
  const query = `
    SELECT 
      a.*,
      u.email as user_email,
      u.name as user_name
    FROM activities a
    JOIN users u ON a.user_id = u.id
    ORDER BY a.created_at DESC
    LIMIT ?
  `;
  
  db.query(query, [parseInt(limit)], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    res.json({ 
      success: true,
      activities: results 
    });
  });
});

// UPDATE user role (Admin only)
router.put('/users/:id/role', isAdmin, (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  
  if (!role || !['user', 'admin'].includes(role)) {
    return res.status(400).json({ 
      success: false,
      message: 'Invalid role. Must be "user" or "admin"' 
    });
  }
  
  // Prevent admin from demoting themselves
  if (parseInt(userId) === req.user.id && role === 'user') {
    return res.status(400).json({ 
      success: false,
      message: 'You cannot demote yourself from admin' 
    });
  }
  
  db.query('UPDATE users SET role = ? WHERE id = ?', [role, userId], (err, result) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'User role updated successfully' 
    });
  });
});

// DELETE user (Admin only)
router.delete('/users/:id', isAdmin, (req, res) => {
  const userId = req.params.id;
  
  // Prevent admin from deleting themselves
  if (parseInt(userId) === req.user.id) {
    return res.status(400).json({ 
      success: false,
      message: 'You cannot delete your own account' 
    });
  }
  
  db.query('DELETE FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'User deleted successfully' 
    });
  });
});

// DELETE activity (Admin only)
router.delete('/activities/:id', isAdmin, (req, res) => {
  const activityId = req.params.id;
  
  db.query('DELETE FROM activities WHERE id = ?', [activityId], (err, result) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false,
        message: 'Activity not found' 
      });
    }
    
    res.json({ 
      success: true,
      message: 'Activity deleted successfully' 
    });
  });
});

// GET user growth data (for charts)
router.get('/analytics/user-growth', isAdmin, (req, res) => {
  const days = req.query.days || 30;
  
  const query = `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as new_users
    FROM users
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;
  
  db.query(query, [parseInt(days)], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    res.json({ 
      success: true,
      data: results 
    });
  });
});

// GET activity trends (for charts)
router.get('/analytics/activity-trends', isAdmin, (req, res) => {
  const days = req.query.days || 30;
  
  const query = `
    SELECT 
      DATE(created_at) as date,
      COUNT(*) as activity_count,
      COUNT(DISTINCT user_id) as active_users
    FROM activities
    WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY DATE(created_at)
    ORDER BY date ASC
  `;
  
  db.query(query, [parseInt(days)], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        error: 'Database error' 
      });
    }
    
    res.json({ 
      success: true,
      data: results 
    });
  });
});

module.exports = router;
