const pool = require("./config/database");

const recreateTables = async () => {
  try {
    // Create email_activity_log table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS email_activity_log (
          id SERIAL PRIMARY KEY,
          subscriber_id INTEGER REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
          campaign_id INTEGER,
          event_type VARCHAR(50) CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed')),
          event_data JSONB DEFAULT '{}',
          occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE INDEX IF NOT EXISTS idx_email_activity_subscriber_id ON email_activity_log(subscriber_id);
      CREATE INDEX IF NOT EXISTS idx_email_activity_event_type ON email_activity_log(event_type);
    `);

    console.log("✅ email_activity_log table created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

recreateTables();
