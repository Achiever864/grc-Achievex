const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

async function initDatabase() {
  try {
    const sql = fs.readFileSync(
      path.join(__dirname, "../migrations/001_initial_schema.sql"),
      "utf8",
    );

    await pool.query(sql);
    console.log("✅ Database schema created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating database schema:", error);
    process.exit(1);
  }
}

initDatabase();
