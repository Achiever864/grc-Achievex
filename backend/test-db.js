require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

async function testConnection() {
  try {
    console.log("Testing database connection...");
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_NAME:", process.env.DB_NAME);
    console.log("DB_PORT:", process.env.DB_PORT);

    const result = await pool.query("SELECT NOW()");
    console.log("✅ Database connected successfully!");
    console.log("Current time from database:", result.rows[0].now);

    // Test if tables exist
    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log("\n📋 Tables in database:");
    tables.rows.forEach((row) => {
      console.log("  -", row.table_name);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  }
}

testConnection();
