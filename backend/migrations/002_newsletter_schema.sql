-- Newsletter Subscribers table
CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced', 'complained')),
    subscription_source VARCHAR(100) DEFAULT 'website',
    brevo_contact_id VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP,
    last_email_sent_at TIMESTAMP,
    preferences JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Campaigns table (for tracking sent newsletters)
CREATE TABLE newsletter_campaigns (
    id SERIAL PRIMARY KEY,
    campaign_id VARCHAR(100) UNIQUE,
    subject VARCHAR(500) NOT NULL,
    content TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'cancelled')),
    sent_at TIMESTAMP,
    total_recipients INTEGER DEFAULT 0,
    opened_count INTEGER DEFAULT 0,
    clicked_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Activity Log
CREATE TABLE email_activity_log (
    id SERIAL PRIMARY KEY,
    subscriber_id INTEGER REFERENCES newsletter_subscribers(id) ON DELETE CASCADE,
    campaign_id INTEGER REFERENCES newsletter_campaigns(id),
    event_type VARCHAR(50) CHECK (event_type IN ('sent', 'delivered', 'opened', 'clicked', 'bounced', 'complained', 'unsubscribed')),
    event_data JSONB DEFAULT '{}',
    occurred_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX idx_email_activity_subscriber_id ON email_activity_log(subscriber_id);
CREATE INDEX idx_email_activity_campaign_id ON email_activity_log(campaign_id);
CREATE INDEX idx_email_activity_event_type ON email_activity_log(event_type);

-- Add trigger for updated_at
CREATE TRIGGER update_newsletter_subscribers_updated_at 
    BEFORE UPDATE ON newsletter_subscribers 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_newsletter_campaigns_updated_at 
    BEFORE UPDATE ON newsletter_campaigns 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();