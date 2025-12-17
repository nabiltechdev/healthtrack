const mysql = require('mysql');

// Railway provides MYSQL* variables, fallback to DB_* for local development
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306
});

console.log('Attempting DB connection...');
console.log('Host:', process.env.MYSQLHOST || process.env.DB_HOST);
console.log('User:', process.env.MYSQLUSER || process.env.DB_USER);
console.log('Database:', process.env.MYSQLDATABASE || process.env.DB_NAME);

db.connect(err => {
  if (err) {
    console.error('DB Connection Failed:', err.message);
    throw err;
  }
  console.log('MySQL connected successfully');
});

module.exports = db;
  