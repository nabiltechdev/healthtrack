const bcrypt = require('bcryptjs');
const mysql = require('mysql');
require('dotenv').config();

// Create database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

async function createAdminUser() {
  try {
    // Connect to database
    db.connect((err) => {
      if (err) {
        console.error('❌ Database connection failed:', err.message);
        process.exit(1);
      }
      console.log('✅ Connected to database');
    });

    // Generate password hash for "admin"
    const password = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('\n📝 Generated password hash for "admin"');
    console.log('Hash:', hashedPassword);

    // Delete existing admin user if exists
    db.query('DELETE FROM users WHERE email = ?', ['admin'], (err) => {
      if (err) {
        console.error('❌ Error deleting old admin:', err.message);
      } else {
        console.log('✅ Deleted old admin user (if existed)');
      }

      // Insert new admin user
      const query = 'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)';
      const values = ['admin', hashedPassword, 'Administrator', 'admin'];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('❌ Error creating admin user:', err.message);
          db.end();
          process.exit(1);
        }

        console.log('✅ Admin user created successfully!');
        console.log('\n📋 Admin Credentials:');
        console.log('   Email: admin');
        console.log('   Password: admin');
        console.log('   Role: admin');
        console.log('   User ID:', result.insertId);

        // Verify the user was created
        db.query('SELECT id, email, name, role FROM users WHERE email = ?', ['admin'], (err, results) => {
          if (err) {
            console.error('❌ Error verifying admin user:', err.message);
          } else if (results.length > 0) {
            console.log('\n✅ Verification successful:');
            console.log(results[0]);
          }

          db.end();
          console.log('\n🎉 Done! You can now login with email: admin, password: admin');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    db.end();
    process.exit(1);
  }
}

// Run the script
createAdminUser();
