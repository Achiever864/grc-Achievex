-- Donations table
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(100) UNIQUE NOT NULL,
    donor_name VARCHAR(255) NOT NULL,
    donor_email VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'NGN',
    payment_method VARCHAR(50) CHECK (payment_method IN ('paga', 'bank_transfer', 'paypal')),
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed', 'cancelled')),
    transaction_id VARCHAR(255),
    paga_reference VARCHAR(255),
    paga_transaction_id VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Donation receipts/confirmations
CREATE TABLE donation_receipts (
    id SERIAL PRIMARY KEY,
    donation_id INTEGER REFERENCES donations(id) ON DELETE CASCADE,
    receipt_number VARCHAR(100) UNIQUE NOT NULL,
    receipt_url VARCHAR(500),
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_donations_reference ON donations(reference);
CREATE INDEX idx_donations_email ON donations(donor_email);
CREATE INDEX idx_donations_status ON donations(payment_status);
CREATE INDEX idx_donations_created_at ON donations(created_at);

-- Add trigger for updated_at
CREATE TRIGGER update_donations_updated_at 
    BEFORE UPDATE ON donations 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();