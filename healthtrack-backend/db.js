const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST || process.env.DB_HOST,
  user: process.env.MYSQLUSER || process.env.DB_USER,
  password: process.env.MYSQLPASSWORD || process.env.DB_PASSWORD,
  database: process.env.MYSQLDATABASE || process.env.DB_NAME,
  port: process.env.MYSQLPORT || process.env.DB_PORT || 3306,
});

// Helpful startup logs (safe, no secrets)
console.log("🔌 Attempting DB connection...");
console.log("Host:", process.env.MYSQLHOST || process.env.DB_HOST);
console.log("User:", process.env.MYSQLUSER || process.env.DB_USER);
console.log("Database:", process.env.MYSQLDATABASE || process.env.DB_NAME);

// Connect to MySQL (DO NOT crash the app on failure)
db.connect((err) => {
  if (err) {
    console.error("❌ DB Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL connected successfully");
});

// Handle dropped connections (Railway-safe)
db.on("error", (err) => {
  if (err.code === "PROTOCOL_CONNECTION_LOST") {
    console.error("🔁 MySQL connection lost. Reconnecting...");
    db.connect();
  } else {
    console.error("❌ MySQL error:", err);
  }
});

module.exports = db;
