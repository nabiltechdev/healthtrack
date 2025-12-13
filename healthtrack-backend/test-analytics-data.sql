-- ============================================
-- COMPREHENSIVE ANALYTICS TEST DATA
-- This file adds extensive test data to verify all analytics endpoints
-- ============================================

-- Note: Replace user_id = 1 with your actual test user ID
SET @test_user_id = 1;

-- ============================================
-- CLEAR EXISTING TEST DATA (Optional)
-- ============================================
-- Uncomment below if you want to start fresh
-- DELETE FROM activities WHERE user_id = @test_user_id;
-- DELETE FROM goals WHERE user_id = @test_user_id;
-- DELETE FROM achievements WHERE user_id = @test_user_id;

-- ============================================
-- INSERT DIVERSE ACTIVITIES FOR ANALYTICS
-- ============================================

-- Activities from the past 90 days with various patterns
-- This creates a realistic dataset for testing all analytics endpoints

-- Week 1: High activity (7 days streak) - Days 89-83
INSERT INTO activities (type, details, date, time, user_id, category, calories, protein, carbs, fat, water_ml, mood, notes) VALUES
('Exercise', 'Morning run 5km', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '07:00:00', @test_user_id, 'Exercise', 350, 0, 0, 0, 0, 'Energetic', 'Great start'),
('Meal', 'Protein smoothie', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '08:00:00', @test_user_id, 'Meal', 280, 25, 35, 8, 0, 'Happy', 'Delicious'),
('Water', 'Morning hydration', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '09:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL),
('Meal', 'Chicken salad', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '12:30:00', @test_user_id, 'Meal', 450, 35, 40, 15, 0, 'Satisfied', 'Healthy'),
('Exercise', 'Evening yoga', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '18:00:00', @test_user_id, 'Exercise', 150, 0, 0, 0, 0, 'Relaxed', 'Stress relief'),
('Meal', 'Grilled salmon', DATE_SUB(CURDATE(), INTERVAL 89 DAY), '19:00:00', @test_user_id, 'Meal', 520, 42, 30, 22, 0, 'Happy', 'Omega-3 rich'),

('Exercise', 'Gym workout', DATE_SUB(CURDATE(), INTERVAL 88 DAY), '06:30:00', @test_user_id, 'Exercise', 400, 0, 0, 0, 0, 'Motivated', NULL),
('Meal', 'Oatmeal', DATE_SUB(CURDATE(), INTERVAL 88 DAY), '08:00:00', @test_user_id, 'Meal', 320, 12, 55, 8, 0, 'Happy', NULL),
('Water', 'Morning water', DATE_SUB(CURDATE(), INTERVAL 88 DAY), '09:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),
('Meal', 'Turkey sandwich', DATE_SUB(CURDATE(), INTERVAL 88 DAY), '13:00:00', @test_user_id, 'Meal', 380, 28, 45, 12, 0, 'Satisfied', NULL),

('Meditation', 'Morning meditation', DATE_SUB(CURDATE(), INTERVAL 87 DAY), '06:00:00', @test_user_id, 'Meditation', 0, 0, 0, 0, 0, 'Calm', NULL),
('Exercise', 'Cycling 10km', DATE_SUB(CURDATE(), INTERVAL 87 DAY), '07:00:00', @test_user_id, 'Exercise', 380, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Greek yogurt', DATE_SUB(CURDATE(), INTERVAL 87 DAY), '08:30:00', @test_user_id, 'Meal', 290, 18, 42, 9, 0, 'Happy', NULL),
('Meal', 'Quinoa bowl', DATE_SUB(CURDATE(), INTERVAL 87 DAY), '12:30:00', @test_user_id, 'Meal', 480, 38, 52, 14, 0, 'Satisfied', NULL),
('Exercise', 'Swimming', DATE_SUB(CURDATE(), INTERVAL 87 DAY), '17:00:00', @test_user_id, 'Exercise', 320, 0, 0, 0, 0, 'Refreshed', NULL),

('Exercise', 'Morning walk', DATE_SUB(CURDATE(), INTERVAL 86 DAY), '06:30:00', @test_user_id, 'Exercise', 180, 0, 0, 0, 0, 'Peaceful', NULL),
('Meal', 'Scrambled eggs', DATE_SUB(CURDATE(), INTERVAL 86 DAY), '08:00:00', @test_user_id, 'Meal', 340, 22, 38, 14, 0, 'Satisfied', NULL),
('Meal', 'Sushi lunch', DATE_SUB(CURDATE(), INTERVAL 86 DAY), '13:00:00', @test_user_id, 'Meal', 420, 24, 62, 8, 0, 'Happy', NULL),
('Exercise', 'Pilates', DATE_SUB(CURDATE(), INTERVAL 86 DAY), '18:00:00', @test_user_id, 'Exercise', 200, 0, 0, 0, 0, 'Relaxed', NULL),

('Exercise', 'HIIT workout', DATE_SUB(CURDATE(), INTERVAL 85 DAY), '06:00:00', @test_user_id, 'Exercise', 450, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Protein pancakes', DATE_SUB(CURDATE(), INTERVAL 85 DAY), '08:00:00', @test_user_id, 'Meal', 380, 28, 48, 12, 0, 'Happy', NULL),
('Meal', 'Burrito bowl', DATE_SUB(CURDATE(), INTERVAL 85 DAY), '12:30:00', @test_user_id, 'Meal', 520, 32, 58, 20, 0, 'Satisfied', NULL),
('Water', 'Afternoon water', DATE_SUB(CURDATE(), INTERVAL 85 DAY), '15:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),

('Exercise', 'Basketball', DATE_SUB(CURDATE(), INTERVAL 84 DAY), '10:00:00', @test_user_id, 'Exercise', 480, 0, 0, 0, 0, 'Excited', NULL),
('Meal', 'Breakfast burrito', DATE_SUB(CURDATE(), INTERVAL 84 DAY), '11:30:00', @test_user_id, 'Meal', 450, 24, 52, 18, 0, 'Satisfied', NULL),
('Water', 'Post-workout', DATE_SUB(CURDATE(), INTERVAL 84 DAY), '12:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 800, 'Neutral', NULL),
('Meal', 'Pizza and salad', DATE_SUB(CURDATE(), INTERVAL 84 DAY), '14:00:00', @test_user_id, 'Meal', 520, 22, 64, 22, 0, 'Happy', NULL),

('Meditation', 'Sunday meditation', DATE_SUB(CURDATE(), INTERVAL 83 DAY), '08:00:00', @test_user_id, 'Meditation', 0, 0, 0, 0, 0, 'Peaceful', NULL),
('Exercise', 'Yoga flow', DATE_SUB(CURDATE(), INTERVAL 83 DAY), '09:00:00', @test_user_id, 'Exercise', 220, 0, 0, 0, 0, 'Relaxed', NULL),
('Meal', 'Avocado toast', DATE_SUB(CURDATE(), INTERVAL 83 DAY), '11:00:00', @test_user_id, 'Meal', 420, 16, 48, 22, 0, 'Happy', NULL),
('Social', 'Coffee with friends', DATE_SUB(CURDATE(), INTERVAL 83 DAY), '15:00:00', @test_user_id, 'Social', 150, 4, 20, 6, 0, 'Happy', NULL);

-- ============================================
-- RECENT ACTIVITIES (Last 30 days)
-- ============================================

INSERT INTO activities (type, details, date, time, user_id, category, calories, protein, carbs, fat, water_ml, mood, notes) VALUES
-- 30 days ago
('Exercise', 'Morning jog', DATE_SUB(CURDATE(), INTERVAL 30 DAY), '07:00:00', @test_user_id, 'Exercise', 300, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Healthy breakfast', DATE_SUB(CURDATE(), INTERVAL 30 DAY), '08:30:00', @test_user_id, 'Meal', 350, 20, 45, 12, 0, 'Happy', NULL),
('Water', 'Morning water', DATE_SUB(CURDATE(), INTERVAL 30 DAY), '10:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL),

-- 29 days ago
('Exercise', 'Gym session', DATE_SUB(CURDATE(), INTERVAL 29 DAY), '06:30:00', @test_user_id, 'Exercise', 420, 0, 0, 0, 0, 'Motivated', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 29 DAY), '12:00:00', @test_user_id, 'Meal', 480, 32, 52, 18, 0, 'Satisfied', NULL),

-- 28 days ago
('Exercise', 'Swimming', DATE_SUB(CURDATE(), INTERVAL 28 DAY), '17:00:00', @test_user_id, 'Exercise', 350, 0, 0, 0, 0, 'Refreshed', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 28 DAY), '19:00:00', @test_user_id, 'Meal', 520, 38, 48, 22, 0, 'Happy', NULL),

-- Skip day 27 (gap in streak)

-- 26 days ago
('Exercise', 'Running', DATE_SUB(CURDATE(), INTERVAL 26 DAY), '07:00:00', @test_user_id, 'Exercise', 380, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 26 DAY), '08:00:00', @test_user_id, 'Meal', 320, 18, 42, 10, 0, 'Happy', NULL),
('Water', 'Hydration', DATE_SUB(CURDATE(), INTERVAL 26 DAY), '10:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),

-- 25 days ago
('Exercise', 'Yoga', DATE_SUB(CURDATE(), INTERVAL 25 DAY), '18:00:00', @test_user_id, 'Exercise', 180, 0, 0, 0, 0, 'Relaxed', NULL),
('Meal', 'Healthy dinner', DATE_SUB(CURDATE(), INTERVAL 25 DAY), '19:30:00', @test_user_id, 'Meal', 440, 35, 40, 16, 0, 'Satisfied', NULL);

-- ============================================
-- LAST 7 DAYS (Current Streak)
-- ============================================

INSERT INTO activities (type, details, date, time, user_id, category, calories, protein, carbs, fat, water_ml, mood, notes) VALUES
-- 7 days ago
('Exercise', 'Morning run', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '06:30:00', @test_user_id, 'Exercise', 340, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Breakfast smoothie', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '08:00:00', @test_user_id, 'Meal', 280, 22, 38, 8, 0, 'Happy', NULL),
('Water', 'Morning hydration', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '09:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '12:30:00', @test_user_id, 'Meal', 450, 30, 48, 16, 0, 'Satisfied', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '19:00:00', @test_user_id, 'Meal', 520, 40, 45, 20, 0, 'Happy', NULL),

-- 6 days ago
('Exercise', 'Gym workout', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '07:00:00', @test_user_id, 'Exercise', 400, 0, 0, 0, 0, 'Motivated', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '08:30:00', @test_user_id, 'Meal', 360, 24, 42, 12, 0, 'Happy', NULL),
('Water', 'Hydration', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '10:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '13:00:00', @test_user_id, 'Meal', 480, 32, 52, 18, 0, 'Satisfied', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '19:30:00', @test_user_id, 'Meal', 500, 38, 48, 20, 0, 'Happy', NULL),

-- 5 days ago
('Meditation', 'Morning meditation', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '06:00:00', @test_user_id, 'Meditation', 0, 0, 0, 0, 0, 'Calm', NULL),
('Exercise', 'Cycling', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '07:00:00', @test_user_id, 'Exercise', 360, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '08:30:00', @test_user_id, 'Meal', 340, 20, 44, 11, 0, 'Happy', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '12:30:00', @test_user_id, 'Meal', 460, 28, 50, 17, 0, 'Satisfied', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '19:00:00', @test_user_id, 'Meal', 510, 36, 46, 19, 0, 'Happy', NULL),

-- 4 days ago
('Exercise', 'Swimming', DATE_SUB(CURDATE(), INTERVAL 4 DAY), '17:00:00', @test_user_id, 'Exercise', 330, 0, 0, 0, 0, 'Refreshed', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 4 DAY), '08:00:00', @test_user_id, 'Meal', 320, 18, 40, 10, 0, 'Happy', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 4 DAY), '13:00:00', @test_user_id, 'Meal', 440, 30, 48, 15, 0, 'Satisfied', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 4 DAY), '19:30:00', @test_user_id, 'Meal', 490, 34, 44, 18, 0, 'Happy', NULL),

-- 3 days ago
('Exercise', 'Morning walk', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '06:30:00', @test_user_id, 'Exercise', 200, 0, 0, 0, 0, 'Peaceful', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '08:00:00', @test_user_id, 'Meal', 350, 22, 42, 12, 0, 'Happy', NULL),
('Water', 'Hydration', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '10:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '12:30:00', @test_user_id, 'Meal', 470, 32, 50, 16, 0, 'Satisfied', NULL),
('Exercise', 'Evening yoga', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '18:00:00', @test_user_id, 'Exercise', 170, 0, 0, 0, 0, 'Relaxed', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '19:30:00', @test_user_id, 'Meal', 500, 36, 46, 19, 0, 'Happy', NULL),

-- 2 days ago
('Exercise', 'HIIT workout', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '06:00:00', @test_user_id, 'Exercise', 440, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '08:00:00', @test_user_id, 'Meal', 370, 26, 44, 13, 0, 'Happy', NULL),
('Water', 'Morning hydration', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '09:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '13:00:00', @test_user_id, 'Meal', 490, 34, 52, 18, 0, 'Satisfied', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '19:00:00', @test_user_id, 'Meal', 520, 40, 48, 20, 0, 'Happy', NULL),

-- Yesterday
('Exercise', 'Morning run', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '07:00:00', @test_user_id, 'Exercise', 350, 0, 0, 0, 0, 'Energetic', NULL),
('Meal', 'Breakfast', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '08:30:00', @test_user_id, 'Meal', 360, 24, 42, 12, 0, 'Happy', NULL),
('Water', 'Morning water', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '10:00:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL),
('Meal', 'Lunch', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '12:30:00', @test_user_id, 'Meal', 480, 32, 50, 17, 0, 'Satisfied', NULL),
('Exercise', 'Evening walk', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '18:00:00', @test_user_id, 'Exercise', 180, 0, 0, 0, 0, 'Relaxed', NULL),
('Meal', 'Dinner', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '19:30:00', @test_user_id, 'Meal', 510, 38, 46, 19, 0, 'Happy', NULL),

-- Today
('Exercise', 'Morning workout', CURDATE(), '06:30:00', @test_user_id, 'Exercise', 380, 0, 0, 0, 0, 'Motivated', NULL),
('Meal', 'Breakfast', CURDATE(), '08:00:00', @test_user_id, 'Meal', 340, 20, 40, 11, 0, 'Happy', NULL),
('Water', 'Morning hydration', CURDATE(), '09:30:00', @test_user_id, 'Water', 0, 0, 0, 0, 600, 'Neutral', NULL),
('Meal', 'Lunch', CURDATE(), '12:30:00', @test_user_id, 'Meal', 460, 30, 48, 16, 0, 'Satisfied', NULL),
('Water', 'Afternoon water', CURDATE(), '15:30:00', @test_user_id, 'Water', 0, 0, 0, 0, 500, 'Neutral', NULL);

-- ============================================
-- ADD SAMPLE GOALS
-- ============================================

INSERT INTO goals (user_id, goal_type, target_value, current_value, start_date, end_date, status, description) VALUES
(@test_user_id, 'daily_activities', 5, 3, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 30 DAY), 'active', 'Log at least 5 activities per day'),
(@test_user_id, 'weekly_calories', 14000, 8500, DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), DATE_ADD(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY), INTERVAL 7 DAY), 'active', 'Consume 14000 calories this week'),
(@test_user_id, 'monthly_streak', 30, 7, DATE_FORMAT(CURDATE(), '%Y-%m-01'), LAST_DAY(CURDATE()), 'active', 'Log activities for 30 consecutive days'),
(@test_user_id, 'water_intake', 2000, 1100, CURDATE(), CURDATE(), 'active', 'Drink 2000ml of water today');

-- ============================================
-- ADD SAMPLE ACHIEVEMENTS
-- ============================================

INSERT INTO achievements (user_id, achievement_type, achievement_name, achievement_description) VALUES
(@test_user_id, 'first_activity', 'First Step', 'Logged your first activity'),
(@test_user_id, '7_day_streak', 'Week Warrior', 'Maintained a 7-day logging streak'),
(@test_user_id, '30_activities', 'Getting Started', 'Logged 30 activities'),
(@test_user_id, 'nutrition_master', 'Nutrition Tracker', 'Logged nutrition data for 20 activities');

-- ============================================
-- VERIFICATION QUERIES
-- Test these queries to verify the data
-- ============================================

-- Check total activities
SELECT COUNT(*) as total_activities FROM activities WHERE user_id = @test_user_id;

-- Check activities by category
SELECT category, COUNT(*) as count FROM activities WHERE user_id = @test_user_id GROUP BY category;

-- Check recent activities (last 7 days)
SELECT DATE(date) as activity_date, COUNT(*) as count 
FROM activities 
WHERE user_id = @test_user_id AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY DATE(date)
ORDER BY activity_date DESC;

-- Check nutrition summary
SELECT 
  SUM(calories) as total_calories,
  AVG(calories) as avg_calories,
  SUM(protein) as total_protein,
  SUM(carbs) as total_carbs,
  SUM(fat) as total_fat,
  SUM(water_ml) as total_water
FROM activities 
WHERE user_id = @test_user_id AND date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY);

-- Check mood distribution
SELECT mood, COUNT(*) as count 
FROM activities 
WHERE user_id = @test_user_id AND mood IS NOT NULL 
GROUP BY mood 
ORDER BY count DESC;

-- Check goals
SELECT * FROM goals WHERE user_id = @test_user_id;

-- Check achievements
SELECT * FROM achievements WHERE user_id = @test_user_id;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT 'Test data inserted successfully! You can now test all analytics endpoints.' AS Status;
SELECT CONCAT('Total activities inserted: ', COUNT(*)) AS Summary FROM activities WHERE user_id = @test_user_id;
