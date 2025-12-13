-- Sample activities for user 82310010@students.liu.edu.lb (user_id = 10)
-- This will populate the analytics dashboard with realistic data

-- Clear existing activities for this user (optional - remove if you want to keep existing data)
-- DELETE FROM activities WHERE user_id = 10;

-- Insert 20 diverse activities over the past 2 weeks
INSERT INTO activities (user_id, type, category, details, date, time, duration, calories, protein, carbs, fat, water, mood, notes, created_at) VALUES

-- Week 1 Activities (7-14 days ago)
(10, 'Morning Run', 'Exercise', '5km run in the park', DATE_SUB(CURDATE(), INTERVAL 14 DAY), '07:00:00', 30, 350, 0, 0, 0, 0, 'energetic', 'Great morning workout!', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(10, 'Breakfast', 'Meal', 'Oatmeal with fruits', DATE_SUB(CURDATE(), INTERVAL 14 DAY), '08:00:00', 15, 320, 12, 58, 8, 500, 'happy', 'Healthy start to the day', DATE_SUB(NOW(), INTERVAL 14 DAY)),
(10, 'Gym Session', 'Exercise', 'Weight training - Upper body', DATE_SUB(CURDATE(), INTERVAL 13 DAY), '18:00:00', 60, 280, 0, 0, 0, 0, 'motivated', 'New personal record on bench press!', DATE_SUB(NOW(), INTERVAL 13 DAY)),
(10, 'Lunch', 'Meal', 'Grilled chicken with vegetables', DATE_SUB(CURDATE(), INTERVAL 13 DAY), '13:00:00', 20, 450, 35, 25, 15, 300, 'satisfied', 'Delicious and nutritious', DATE_SUB(NOW(), INTERVAL 13 DAY)),

(10, 'Morning Meditation', 'Meditation', 'Mindfulness practice', DATE_SUB(CURDATE(), INTERVAL 12 DAY), '06:30:00', 20, 0, 0, 0, 0, 0, 'calm', 'Feeling centered and peaceful', DATE_SUB(NOW(), INTERVAL 12 DAY)),
(10, 'Cycling', 'Exercise', '10km bike ride', DATE_SUB(CURDATE(), INTERVAL 12 DAY), '17:00:00', 45, 400, 0, 0, 0, 0, 'energetic', 'Beautiful weather for cycling', DATE_SUB(NOW(), INTERVAL 12 DAY)),
(10, 'Dinner', 'Meal', 'Salmon with quinoa', DATE_SUB(CURDATE(), INTERVAL 12 DAY), '19:30:00', 25, 520, 40, 35, 22, 400, 'happy', 'Omega-3 rich meal', DATE_SUB(NOW(), INTERVAL 12 DAY)),

(10, 'Night Sleep', 'Sleep', '8 hours of quality sleep', DATE_SUB(CURDATE(), INTERVAL 11 DAY), '22:00:00', 480, 0, 0, 0, 0, 0, 'rested', 'Woke up refreshed', DATE_SUB(NOW(), INTERVAL 11 DAY)),
(10, 'Water Intake', 'Water', 'Hydration throughout the day', DATE_SUB(CURDATE(), INTERVAL 11 DAY), '12:00:00', 0, 0, 0, 0, 0, 2000, 'good', 'Staying hydrated', DATE_SUB(NOW(), INTERVAL 11 DAY)),
(10, 'Team Meeting', 'Work', 'Project planning session', DATE_SUB(CURDATE(), INTERVAL 11 DAY), '10:00:00', 90, 0, 0, 0, 0, 0, 'focused', 'Productive meeting', DATE_SUB(NOW(), INTERVAL 11 DAY)),

(10, 'Yoga Class', 'Exercise', 'Vinyasa flow', DATE_SUB(CURDATE(), INTERVAL 10 DAY), '07:30:00', 60, 180, 0, 0, 0, 0, 'relaxed', 'Great flexibility workout', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(10, 'Brunch', 'Meal', 'Eggs benedict with avocado', DATE_SUB(CURDATE(), INTERVAL 10 DAY), '11:00:00', 30, 580, 25, 42, 28, 250, 'satisfied', 'Weekend treat!', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(10, 'Coffee with Friends', 'Social', 'Catch up at cafe', DATE_SUB(CURDATE(), INTERVAL 10 DAY), '15:00:00', 120, 150, 2, 20, 5, 200, 'happy', 'Great conversation', DATE_SUB(NOW(), INTERVAL 10 DAY)),

-- Week 2 Activities (1-7 days ago)
(10, 'Morning Jog', 'Exercise', '3km easy run', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '06:45:00', 20, 220, 0, 0, 0, 0, 'energetic', 'Easy recovery run', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(10, 'Smoothie Bowl', 'Meal', 'Berry smoothie with granola', DATE_SUB(CURDATE(), INTERVAL 7 DAY), '08:30:00', 10, 380, 15, 65, 12, 300, 'refreshed', 'Perfect post-workout meal', DATE_SUB(NOW(), INTERVAL 7 DAY)),
(10, 'Swimming', 'Exercise', '30 laps in pool', DATE_SUB(CURDATE(), INTERVAL 6 DAY), '18:30:00', 45, 320, 0, 0, 0, 0, 'accomplished', 'Full body workout', DATE_SUB(NOW(), INTERVAL 6 DAY)),

(10, 'Meditation Session', 'Meditation', 'Evening mindfulness', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '20:00:00', 15, 0, 0, 0, 0, 0, 'peaceful', 'Stress relief', DATE_SUB(NOW(), INTERVAL 5 DAY)),
(10, 'Lunch Meeting', 'Meal', 'Sushi platter', DATE_SUB(CURDATE(), INTERVAL 5 DAY), '12:30:00', 45, 420, 28, 55, 10, 200, 'satisfied', 'Business lunch', DATE_SUB(CURDATE(), INTERVAL 5 DAY)),
(10, 'HIIT Workout', 'Exercise', 'High intensity interval training', DATE_SUB(CURDATE(), INTERVAL 4 DAY), '17:00:00', 30, 380, 0, 0, 0, 0, 'exhausted', 'Pushed my limits!', DATE_SUB(NOW(), INTERVAL 4 DAY)),

(10, 'Dinner Party', 'Social', 'Friends gathering', DATE_SUB(CURDATE(), INTERVAL 3 DAY), '19:00:00', 180, 650, 30, 70, 35, 400, 'joyful', 'Amazing evening with friends', DATE_SUB(NOW(), INTERVAL 3 DAY)),
(10, 'Morning Walk', 'Exercise', 'Nature trail walk', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '07:00:00', 40, 150, 0, 0, 0, 0, 'calm', 'Peaceful morning', DATE_SUB(NOW(), INTERVAL 2 DAY)),
(10, 'Healthy Snack', 'Meal', 'Greek yogurt with nuts', DATE_SUB(CURDATE(), INTERVAL 2 DAY), '15:30:00', 5, 220, 18, 15, 12, 100, 'good', 'Perfect afternoon snack', DATE_SUB(NOW(), INTERVAL 2 DAY)),

(10, 'Gym - Leg Day', 'Exercise', 'Lower body strength training', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '18:00:00', 55, 300, 0, 0, 0, 0, 'tired', 'Intense leg workout', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(10, 'Protein Shake', 'Meal', 'Post-workout shake', DATE_SUB(CURDATE(), INTERVAL 1 DAY), '19:15:00', 5, 180, 30, 20, 3, 500, 'recovered', 'Recovery nutrition', DATE_SUB(NOW(), INTERVAL 1 DAY)),

-- Today's activities
(10, 'Morning Stretch', 'Exercise', 'Full body stretching routine', CURDATE(), '06:30:00', 15, 50, 0, 0, 0, 0, 'flexible', 'Great way to start the day', NOW()),
(10, 'Breakfast', 'Meal', 'Whole grain toast with eggs', CURDATE(), '08:00:00', 15, 340, 20, 38, 14, 300, 'energized', 'Balanced breakfast', NOW()),
(10, 'Water Break', 'Water', 'Morning hydration', CURDATE(), '10:00:00', 0, 0, 0, 0, 0, 1000, 'refreshed', 'Staying hydrated', NOW());

-- Summary of inserted data:
-- Total activities: 27
-- Categories covered: Exercise (10), Meal (9), Meditation (2), Sleep (1), Water (2), Work (1), Social (2)
-- Date range: Past 14 days to today
-- Includes: Calories, macros, water intake, moods, and detailed notes
-- This will show:
--   - Active streak (14 days)
--   - Diverse category breakdown
--   - Nutrition tracking
--   - Multiple insights triggered
