  const mysql = require('mysql');
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  // Add this debug log here
  console.log('Attempting DB connection with user:', process.env.DB_USER, 'password:', process.env.DB_PASSWORD ? 'provided' : 'none');
  db.connect(err => {
    if (err) {
      console.error('DB Connection Failed:', err.message);
      throw err;
    }
    console.log('MySQL connected successfully');
  });
  module.exports = db;
  