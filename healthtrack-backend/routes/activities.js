const express = require('express');
const db = require('../db');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// GET /api/activities (Fetch user's activities with search and filter)
router.get('/activities', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const { search, category, startDate, endDate, sortBy = 'date', order = 'DESC' } = req.query;
  
  let query = 'SELECT * FROM activities WHERE user_id = ?';
  const params = [userId];
  
  // Add search filter
  if (search) {
    query += ' AND (details LIKE ? OR notes LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }
  
  // Add category filter
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  
  // Add date range filter
  if (startDate) {
    query += ' AND date >= ?';
    params.push(startDate);
  }
  if (endDate) {
    query += ' AND date <= ?';
    params.push(endDate);
  }
  
  // Add sorting
  const validSortFields = ['date', 'time', 'type', 'category', 'calories'];
  const validOrders = ['ASC', 'DESC'];
  const sortField = validSortFields.includes(sortBy) ? sortBy : 'date';
  const sortOrder = validOrders.includes(order.toUpperCase()) ? order.toUpperCase() : 'DESC';
  
  query += ` ORDER BY ${sortField} ${sortOrder}`;
  if (sortField !== 'time') {
    query += ', time DESC';
  }
  
  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/activities/:id (Get single activity)
router.get('/activities/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;
  
  db.query('SELECT * FROM activities WHERE id = ? AND user_id = ?', [activityId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    
    res.json(results[0]);
  });
});

// POST /api/activities (Add new activity with enhanced fields)
router.post('/activities', authenticateToken, (req, res) => {
  const { 
    type, 
    details, 
    date, 
    time,
    calories,
    protein,
    carbs,
    fat,
    water_ml,
    notes,
    mood,
    category,
    subcategory
  } = req.body;
  const userId = req.user.id;
  
  // Validate required fields
  if (!type || !date) {
    return res.status(400).json({ message: 'Type and date are required' });
  }
  
  const activityData = {
    type,
    details,
    date,
    time: time || null,
    user_id: userId,
    calories: calories || null,
    protein: protein || null,
    carbs: carbs || null,
    fat: fat || null,
    water_ml: water_ml || null,
    notes: notes || null,
    mood: mood || null,
    category: category || 'General',
    subcategory: subcategory || null
  };
  
  db.query('INSERT INTO activities SET ?', activityData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ 
      id: result.insertId, 
      ...activityData,
      message: 'Activity added successfully'
    });
  });
});

// PUT /api/activities/:id (Edit/Update activity)
router.put('/activities/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;
  const {
    type,
    details,
    date,
    time,
    calories,
    protein,
    carbs,
    fat,
    water_ml,
    notes,
    mood,
    category,
    subcategory
  } = req.body;
  
  // First check if activity belongs to user
  db.query('SELECT * FROM activities WHERE id = ? AND user_id = ?', [activityId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found or you do not have permission to edit it' });
    }
    
    // Build update object with only provided fields
    const updates = {};
    if (type !== undefined) updates.type = type;
    if (details !== undefined) updates.details = details;
    if (date !== undefined) updates.date = date;
    if (time !== undefined) updates.time = time;
    if (calories !== undefined) updates.calories = calories;
    if (protein !== undefined) updates.protein = protein;
    if (carbs !== undefined) updates.carbs = carbs;
    if (fat !== undefined) updates.fat = fat;
    if (water_ml !== undefined) updates.water_ml = water_ml;
    if (notes !== undefined) updates.notes = notes;
    if (mood !== undefined) updates.mood = mood;
    if (category !== undefined) updates.category = category;
    if (subcategory !== undefined) updates.subcategory = subcategory;
    
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No valid fields to update' });
    }
    
    // Update the activity
    db.query('UPDATE activities SET ? WHERE id = ? AND user_id = ?', [updates, activityId, userId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ 
        message: 'Activity updated successfully',
        id: activityId,
        ...updates
      });
    });
  });
});

// DELETE /api/activities/:id (Delete activity)
router.delete('/activities/:id', authenticateToken, (req, res) => {
  const userId = req.user.id;
  const activityId = req.params.id;
  
  // First check if the activity belongs to the user
  db.query('SELECT * FROM activities WHERE id = ? AND user_id = ?', [activityId, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    if (results.length === 0) {
      return res.status(404).json({ message: 'Activity not found or you do not have permission to delete it' });
    }
    
    // Delete the activity (tags will be deleted automatically due to CASCADE)
    db.query('DELETE FROM activities WHERE id = ? AND user_id = ?', [activityId, userId], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Activity deleted successfully' });
    });
  });
});

// GET /api/activities/categories/list - Get all available categories
router.get('/activities/categories/list', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const query = `
    SELECT * FROM activity_categories 
    WHERE is_custom = FALSE OR user_id = ?
    ORDER BY is_custom ASC, category_name ASC
  `;
  
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET /api/activities/categories/:id/subcategories - Get subcategories for a category
router.get('/activities/categories/:id/subcategories', authenticateToken, (req, res) => {
  const categoryId = req.params.id;
  
  db.query('SELECT * FROM activity_subcategories WHERE category_id = ?', [categoryId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
