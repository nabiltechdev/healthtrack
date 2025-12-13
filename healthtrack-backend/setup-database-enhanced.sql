-- ============================================
-- HEALTHTRACK ENHANCED DATABASE SCHEMA
-- Run this in phpMyAdmin to add new features
-- ============================================

-- Create users table (if not exists)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drop and recreate activities table with enhanced fields
DROP TABLE IF EXISTS activities;
CREATE TABLE activities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(100) NOT NULL,
  details TEXT,
  date DATE NOT NULL,
  time TIME,
  user_id INT,
  
  -- Nutrition tracking fields
  calories INT DEFAULT NULL,
  protein DECIMAL(10,2) DEFAULT NULL,
  carbs DECIMAL(10,2) DEFAULT NULL,
  fat DECIMAL(10,2) DEFAULT NULL,
  water_ml INT DEFAULT NULL,
  
  -- Enhanced tracking fields
  notes TEXT,
  mood VARCHAR(50),
  category VARCHAR(100) DEFAULT 'General',
  subcategory VARCHAR(100),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_date (user_id, date),
  INDEX idx_category (category),
  INDEX idx_date (date)
);

-- Create goals table
CREATE TABLE IF NOT EXISTS goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  goal_type VARCHAR(50) NOT NULL, -- 'daily_activities', 'weekly_calories', 'monthly_streak', 'water_intake'
  target_value INT NOT NULL,
  current_value INT DEFAULT 0,
  start_date DATE NOT NULL,
  end_date DATE,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'failed'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_status (user_id, status),
  INDEX idx_dates (start_date, end_date)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  achievement_type VARCHAR(50) NOT NULL, -- 'first_activity', '7_day_streak', '30_activities', '100_activities', 'nutrition_master'
  achievement_name VARCHAR(100) NOT NULL,
  achievement_description TEXT,
  earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_achievement (user_id, achievement_type),
  INDEX idx_user (user_id)
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id INT AUTO_INCREMENT PRIMARY KEY,
  activity_id INT NOT NULL,
  tag_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (activity_id) REFERENCES activities(id) ON DELETE CASCADE,
  INDEX idx_activity (activity_id),
  INDEX idx_tag_name (tag_name)
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNIQUE NOT NULL,
  theme VARCHAR(20) DEFAULT 'light', -- 'light', 'dark'
  daily_calorie_goal INT DEFAULT 2000,
  daily_protein_goal INT DEFAULT 50,
  daily_carbs_goal INT DEFAULT 250,
  daily_fat_goal INT DEFAULT 70,
  daily_water_goal INT DEFAULT 2000, -- in ml
  daily_activity_goal INT DEFAULT 3,
  timezone VARCHAR(50) DEFAULT 'UTC',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create activity_categories table (predefined categories)
CREATE TABLE IF NOT EXISTS activity_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(100) NOT NULL UNIQUE,
  color_code VARCHAR(7) DEFAULT '#3B82F6', -- Hex color
  icon_name VARCHAR(50),
  is_custom BOOLEAN DEFAULT FALSE,
  user_id INT DEFAULT NULL, -- NULL for system categories, user_id for custom
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);

-- Insert default activity categories
INSERT INTO activity_categories (category_name, color_code, icon_name, is_custom) VALUES
('Exercise', '#10B981', 'FaDumbbell', FALSE),
('Meal', '#F59E0B', 'FaUtensils', FALSE),
('Sleep', '#8B5CF6', 'FaBed', FALSE),
('Meditation', '#EC4899', 'FaSpa', FALSE),
('Water', '#06B6D4', 'FaTint', FALSE),
('Work', '#6366F1', 'FaBriefcase', FALSE),
('Social', '#F97316', 'FaUsers', FALSE),
('Other', '#6B7280', 'FaEllipsisH', FALSE);

-- Create activity_subcategories table
CREATE TABLE IF NOT EXISTS activity_subcategories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  subcategory_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES activity_categories(id) ON DELETE CASCADE,
  INDEX idx_category (category_id)
);

-- Insert default subcategories for Exercise
INSERT INTO activity_subcategories (category_id, subcategory_name)
SELECT id, 'Cardio' FROM activity_categories WHERE category_name = 'Exercise'
UNION ALL
SELECT id, 'Strength' FROM activity_categories WHERE category_name = 'Exercise'
UNION ALL
SELECT id, 'Yoga' FROM activity_categories WHERE category_name = 'Exercise'
UNION ALL
SELECT id, 'Sports' FROM activity_categories WHERE category_name = 'Exercise'
UNION ALL
SELECT id, 'Walking' FROM activity_categories WHERE category_name = 'Exercise'
UNION ALL
SELECT id, 'Running' FROM activity_categories WHERE category_name = 'Exercise';

-- Insert default subcategories for Meal
INSERT INTO activity_subcategories (category_id, subcategory_name)
SELECT id, 'Breakfast' FROM activity_categories WHERE category_name = 'Meal'
UNION ALL
SELECT id, 'Lunch' FROM activity_categories WHERE category_name = 'Meal'
UNION ALL
SELECT id, 'Dinner' FROM activity_categories WHERE category_name = 'Meal'
UNION ALL
SELECT id, 'Snack' FROM activity_categories WHERE category_name = 'Meal';

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- View for user activity statistics
CREATE OR REPLACE VIEW user_activity_stats AS
SELECT 
  user_id,
  COUNT(*) as total_activities,
  COUNT(DISTINCT date) as days_logged,
  SUM(CASE WHEN calories IS NOT NULL THEN 1 ELSE 0 END) as activities_with_nutrition,
  SUM(COALESCE(calories, 0)) as total_calories,
  AVG(COALESCE(calories, 0)) as avg_calories,
  MAX(date) as last_activity_date,
  MIN(date) as first_activity_date
FROM activities
GROUP BY user_id;

-- View for daily activity summary
CREATE OR REPLACE VIEW daily_activity_summary AS
SELECT 
  user_id,
  date,
  COUNT(*) as activity_count,
  SUM(COALESCE(calories, 0)) as total_calories,
  SUM(COALESCE(protein, 0)) as total_protein,
  SUM(COALESCE(carbs, 0)) as total_carbs,
  SUM(COALESCE(fat, 0)) as total_fat,
  SUM(COALESCE(water_ml, 0)) as total_water
FROM activities
GROUP BY user_id, date
ORDER BY date DESC;

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Uncomment below to insert sample data for testing
/*
-- Insert a test user
INSERT INTO users (email, password) VALUES ('test@example.com', '$2a$10$abcdefghijklmnopqrstuvwxyz');

-- Insert user settings for test user
INSERT INTO user_settings (user_id) VALUES (1);

-- Insert sample activities
INSERT INTO activities (type, details, date, time, user_id, category, calories) VALUES
('Exercise', 'Morning run 5km', CURDATE(), '07:00:00', 1, 'Exercise', 300),
('Meal', 'Healthy breakfast', CURDATE(), '08:00:00', 1, 'Meal', 450),
('Water', 'Drank 500ml water', CURDATE(), '09:00:00', 1, 'Water', 0);
*/

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Additional indexes for better query performance
CREATE INDEX idx_activities_user_category ON activities(user_id, category);
CREATE INDEX idx_activities_date_range ON activities(date, user_id);
CREATE INDEX idx_goals_user_type ON goals(user_id, goal_type);

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

SELECT 'Database schema enhanced successfully! All tables created.' AS Status;
