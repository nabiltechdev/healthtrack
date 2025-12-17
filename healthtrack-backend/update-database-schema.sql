-- ============================================
-- DATABASE SCHEMA UPDATES FOR PHASE 2
-- Run this to add new fields and admin user
-- ============================================

-- Add name column to users table
ALTER TABLE users ADD COLUMN name VARCHAR(255) DEFAULT NULL;

-- Add role column to users table
ALTER TABLE users ADD COLUMN role VARCHAR(20) DEFAULT 'user';

-- Create index on role for faster queries
CREATE INDEX idx_user_role ON users(role);

-- Insert admin user (email: admin@healthtrack.com, password: admin)
-- Password hash for 'admin' using bcrypt with salt rounds 10
INSERT INTO users (email, password, name, role) 
VALUES ('admin@healthtrack.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator', 'admin')
ON DUPLICATE KEY UPDATE role = 'admin';

-- ============================================
-- ADMIN STATISTICS VIEWS
-- ============================================

-- View for admin dashboard statistics
CREATE OR REPLACE VIEW admin_statistics AS
SELECT 
  (SELECT COUNT(*) FROM users) as total_users,
  (SELECT COUNT(*) FROM users WHERE role = 'admin') as total_admins,
  (SELECT COUNT(*) FROM activities) as total_activities,
  (SELECT COUNT(DISTINCT user_id) FROM activities) as active_users,
  (SELECT COUNT(*) FROM activities WHERE DATE(created_at) = CURDATE()) as activities_today,
  (SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURDATE()) as new_users_today;

-- View for user activity summary (for admin)
CREATE OR REPLACE VIEW user_activity_summary AS
SELECT 
  u.id,
  u.email,
  u.name,
  u.role,
  u.created_at as registered_at,
  COUNT(a.id) as total_activities,
  MAX(a.created_at) as last_activity_date,
  SUM(COALESCE(a.calories, 0)) as total_calories_logged
FROM users u
LEFT JOIN activities a ON u.id = a.user_id
GROUP BY u.id, u.email, u.name, u.role, u.created_at
ORDER BY u.created_at DESC;

-- ============================================
-- EMAIL NOTIFICATIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS email_notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_type VARCHAR(50) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'sent',
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_email ON email_notifications(user_id, email_type);
CREATE INDEX idx_sent_at ON email_notifications(sent_at);

-- ============================================
-- ACTIVITY LOGS TABLE (for admin tracking)
-- ============================================

CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_action ON activity_logs(user_id, action);
CREATE INDEX idx_created_at ON activity_logs(created_at);

-- ============================================
-- COMPLETION MESSAGE
-- ============================================

SELECT 'Database schema updated successfully! Admin user created with credentials: email=admin@healthtrack.com, password=admin' AS Status;
