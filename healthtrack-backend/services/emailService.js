const nodemailer = require('nodemailer');
const db = require('../db');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Log email to database
const logEmail = (userId, emailType, subject, body, status = 'sent') => {
  const query = 'INSERT INTO email_notifications (user_id, email_type, subject, body, status) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [userId, emailType, subject, body, status], (err) => {
    if (err) {
      console.error('Failed to log email:', err);
    }
  });
};

// Send welcome email
const sendWelcomeEmail = async (email, name, userId) => {
  try {
    const transporter = createTransporter();
    
    const subject = 'Welcome to HealthTrack! 🏃‍♂️';
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .features { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .feature-item { margin: 15px 0; padding-left: 25px; position: relative; }
          .feature-item:before { content: "✓"; position: absolute; left: 0; color: #667eea; font-weight: bold; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏃‍♂️ Welcome to HealthTrack!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name || 'there'}! 👋</h2>
            <p>Thank you for joining HealthTrack - your personal health and fitness companion!</p>
            
            <p>We're excited to help you on your journey to a healthier lifestyle. With HealthTrack, you can:</p>
            
            <div class="features">
              <div class="feature-item">Track your daily activities and workouts</div>
              <div class="feature-item">Monitor your nutrition and calorie intake</div>
              <div class="feature-item">Set and achieve your fitness goals</div>
              <div class="feature-item">Visualize your progress with detailed analytics</div>
              <div class="feature-item">Stay motivated with achievements and milestones</div>
            </div>
            
            <p style="text-align: center;">
              <a href="http://localhost:3000/dashboard" class="button">Get Started Now</a>
            </p>
            
            <p><strong>Quick Tips to Get Started:</strong></p>
            <ol>
              <li>Log your first activity from the dashboard</li>
              <li>Set your daily goals in settings</li>
              <li>Check out the analytics page to track your progress</li>
            </ol>
            
            <p>If you have any questions or need help, feel free to reach out to our support team.</p>
            
            <p>Happy tracking! 💪</p>
            
            <p>Best regards,<br>The HealthTrack Team</p>
          </div>
          <div class="footer">
            <p>© 2024 HealthTrack. All rights reserved.</p>
            <p>You received this email because you signed up for HealthTrack.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `HealthTrack <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlBody
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
    
    // Log to database
    logEmail(userId, 'welcome', subject, htmlBody, 'sent');
    
    return { success: true, message: 'Welcome email sent successfully' };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    logEmail(userId, 'welcome', subject, '', 'failed');
    return { success: false, error: error.message };
  }
};

// Send activity reminder email
const sendActivityReminderEmail = async (email, name, userId) => {
  try {
    const transporter = createTransporter();
    
    const subject = 'Time to Log Your Activity! 🎯';
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Don't Forget to Track!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name || 'there'}! 👋</h2>
            <p>We noticed you haven't logged any activities today. Consistency is key to reaching your fitness goals!</p>
            
            <p>Take a moment to log your activities and keep your streak going. Every step counts! 💪</p>
            
            <p style="text-align: center;">
              <a href="http://localhost:3000/dashboard" class="button">Log Activity Now</a>
            </p>
            
            <p>Remember: Small daily improvements lead to stunning long-term results!</p>
            
            <p>Keep up the great work!</p>
            
            <p>Best regards,<br>The HealthTrack Team</p>
          </div>
          <div class="footer">
            <p>© 2024 HealthTrack. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `HealthTrack <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlBody
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Reminder email sent to ${email}`);
    
    // Log to database
    logEmail(userId, 'reminder', subject, htmlBody, 'sent');
    
    return { success: true, message: 'Reminder email sent successfully' };
  } catch (error) {
    console.error('Error sending reminder email:', error);
    logEmail(userId, 'reminder', subject, '', 'failed');
    return { success: false, error: error.message };
  }
};

// Send goal achievement email
const sendGoalAchievementEmail = async (email, name, userId, goalDetails) => {
  try {
    const transporter = createTransporter();
    
    const subject = '🎉 Congratulations! Goal Achieved!';
    const htmlBody = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .achievement { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; border: 2px solid #10b981; }
          .button { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Amazing Achievement!</h1>
          </div>
          <div class="content">
            <h2>Congratulations ${name || 'there'}! 🏆</h2>
            <p>You've reached an incredible milestone!</p>
            
            <div class="achievement">
              <h3>${goalDetails || 'Your Fitness Goal'}</h3>
              <p style="font-size: 48px; margin: 20px 0;">🏆</p>
              <p><strong>Keep up the fantastic work!</strong></p>
            </div>
            
            <p>Your dedication and consistency are truly inspiring. This achievement is a testament to your commitment to a healthier lifestyle!</p>
            
            <p style="text-align: center;">
              <a href="http://localhost:3000/analytics" class="button">View Your Progress</a>
            </p>
            
            <p>Ready for the next challenge? Set a new goal and keep pushing forward! 💪</p>
            
            <p>Proud of you!</p>
            
            <p>Best regards,<br>The HealthTrack Team</p>
          </div>
          <div class="footer">
            <p>© 2024 HealthTrack. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: `HealthTrack <${process.env.EMAIL_USER}>`,
      to: email,
      subject: subject,
      html: htmlBody
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Achievement email sent to ${email}`);
    
    // Log to database
    logEmail(userId, 'achievement', subject, htmlBody, 'sent');
    
    return { success: true, message: 'Achievement email sent successfully' };
  } catch (error) {
    console.error('Error sending achievement email:', error);
    logEmail(userId, 'achievement', subject, '', 'failed');
    return { success: false, error: error.message };
  }
};

// Test email configuration
const testEmailConfiguration = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Email service is ready to send emails');
    return true;
  } catch (error) {
    console.error('❌ Email service configuration error:', error.message);
    return false;
  }
};

module.exports = {
  sendWelcomeEmail,
  sendActivityReminderEmail,
  sendGoalAchievementEmail,
  testEmailConfiguration
};
