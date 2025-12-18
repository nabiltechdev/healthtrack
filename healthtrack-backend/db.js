const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
});

console.log("🔌 Attempting DB connection...");
console.log("Host:", process.env.MYSQLHOST);
console.log("User:", process.env.MYSQLUSER);
console.log("Database:", process.env.MYSQLDATABASE);

db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL connected successfully");
});

module.exports = db;
