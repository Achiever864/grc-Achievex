const pool = require("../config/database");

class Donation {
  // Create new donation
  static async create({
    reference,
    donorName,
    donorEmail,
    amount,
    paymentMethod = "paga",
    metadata = {},
  }) {
    const query = `
      INSERT INTO donations (
        reference, donor_name, donor_email, amount, payment_method, metadata
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    const values = [
      reference,
      donorName,
      donorEmail,
      amount,
      paymentMethod,
      JSON.stringify(metadata),
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Find donation by reference
  static async findByReference(reference) {
    const query = "SELECT * FROM donations WHERE reference = $1";
    const result = await pool.query(query, [reference]);
    return result.rows[0];
  }

  // Update donation status
  static async updateStatus(reference, status, transactionData = {}) {
    const query = `
      UPDATE donations 
      SET 
        payment_status = $1,
        paga_reference = $2,
        paga_transaction_id = $3,
        completed_at = CASE WHEN $1 = 'success' THEN CURRENT_TIMESTAMP ELSE completed_at END,
        metadata = metadata || $4::jsonb,
        updated_at = CURRENT_TIMESTAMP
      WHERE reference = $5
      RETURNING *
    `;
    const values = [
      status,
      transactionData.pagaReference || null,
      transactionData.transactionId || null,
      JSON.stringify(transactionData),
      reference,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  // Get all donations
  static async getAll(limit = 50, offset = 0) {
    const query = `
      SELECT * FROM donations 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;
    const result = await pool.query(query, [limit, offset]);
    return result.rows;
  }

  // Get donations by email
  static async getByEmail(email) {
    const query = `
      SELECT * FROM donations 
      WHERE donor_email = $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [email]);
    return result.rows;
  }

  // Get donation statistics
  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total_donations,
        SUM(amount) as total_amount,
        COUNT(CASE WHEN payment_status = 'success' THEN 1 END) as successful_donations,
        SUM(CASE WHEN payment_status = 'success' THEN amount ELSE 0 END) as total_received
      FROM donations
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }
}

module.exports = Donation;
