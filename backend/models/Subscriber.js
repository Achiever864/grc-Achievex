const pool = require("../config/database");

class Subscriber {
  // Create new subscriber
  static async create(
    email,
    firstName = null,
    lastName = null,
    source = "website",
  ) {
    const query = `
      INSERT INTO newsletter_subscribers (email, first_name, last_name, subscription_source)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [email, firstName, lastName, source];

    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  // Find subscriber by email
  static async findByEmail(email) {
    const query = "SELECT * FROM newsletter_subscribers WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  // Update subscriber status
  static async updateStatus(email, status) {
    const query = `
      UPDATE newsletter_subscribers 
      SET status = $1, 
          unsubscribed_at = CASE WHEN $1 = 'unsubscribed' THEN CURRENT_TIMESTAMP ELSE unsubscribed_at END,
          updated_at = CURRENT_TIMESTAMP
      WHERE email = $2
      RETURNING *
    `;
    const result = await pool.query(query, [status, email]);
    return result.rows[0];
  }

  // Update Brevo contact ID
  static async updateBrevoContactId(email, brevoContactId) {
    const query = `
      UPDATE newsletter_subscribers 
      SET brevo_contact_id = $1, updated_at = CURRENT_TIMESTAMP
      WHERE email = $2
      RETURNING *
    `;
    const result = await pool.query(query, [brevoContactId, email]);
    return result.rows[0];
  }

  // Get all active subscribers
  static async getAllActive() {
    const query = `
      SELECT * FROM newsletter_subscribers 
      WHERE status = 'active' 
      ORDER BY subscribed_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Get subscriber count by status
  static async getCountByStatus() {
    const query = `
      SELECT status, COUNT(*) as count 
      FROM newsletter_subscribers 
      GROUP BY status
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Log email activity
  static async logActivity(
    subscriberId,
    campaignId,
    eventType,
    eventData = {},
  ) {
    const query = `
      INSERT INTO email_activity_log (subscriber_id, campaign_id, event_type, event_data)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      subscriberId,
      campaignId,
      eventType,
      JSON.stringify(eventData),
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Subscriber;
