-- Users table (for authentication)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'scholar', 'partner', 'mentor')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Board Members table
CREATE TABLE board_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    affiliation VARCHAR(255),
    image_url VARCHAR(500),
    expertise TEXT[], -- Array of expertise areas
    email VARCHAR(255),
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scholars table
CREATE TABLE scholars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    institution VARCHAR(255),
    degree_level VARCHAR(50) CHECK (degree_level IN ('undergraduate', 'masters', 'phd', 'postdoc')),
    field_of_study VARCHAR(255),
    country VARCHAR(100),
    phone VARCHAR(50),
    bio TEXT,
    profile_image_url VARCHAR(500),
    research_interests TEXT[],
    linkedin_url VARCHAR(500),
    twitter_url VARCHAR(500),
    website_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'alumni', 'suspended')),
    joined_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners table
CREATE TABLE partners (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    full_name VARCHAR(500),
    type VARCHAR(100) NOT NULL,
    description TEXT,
    logo_url VARCHAR(500),
    website_url VARCHAR(500),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    partnership_since DATE,
    partnership_focus VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Research Projects table
CREATE TABLE research_projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    lead_scholar_id INTEGER REFERENCES scholars(id),
    status VARCHAR(50) DEFAULT 'ongoing' CHECK (status IN ('planned', 'ongoing', 'completed', 'suspended')),
    start_date DATE,
    end_date DATE,
    funding_amount DECIMAL(15, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Project Collaborators (many-to-many relationship)
CREATE TABLE project_collaborators (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES research_projects(id) ON DELETE CASCADE,
    scholar_id INTEGER REFERENCES scholars(id) ON DELETE CASCADE,
    role VARCHAR(100),
    joined_date DATE DEFAULT CURRENT_DATE,
    UNIQUE(project_id, scholar_id)
);

-- Mentorship Relationships
CREATE TABLE mentorships (
    id SERIAL PRIMARY KEY,
    mentor_id INTEGER REFERENCES users(id),
    mentee_id INTEGER REFERENCES scholars(id),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended')),
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    focus_areas TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Events/Workshops table
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    event_type VARCHAR(100) CHECK (event_type IN ('workshop', 'conference', 'seminar', 'training', 'webinar')),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP,
    location VARCHAR(255),
    is_virtual BOOLEAN DEFAULT false,
    max_participants INTEGER,
    registration_deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event Registrations
CREATE TABLE event_registrations (
    id SERIAL PRIMARY KEY,
    event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
    scholar_id INTEGER REFERENCES scholars(id) ON DELETE CASCADE,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attendance_status VARCHAR(50) DEFAULT 'registered' CHECK (attendance_status IN ('registered', 'attended', 'absent', 'cancelled')),
    UNIQUE(event_id, scholar_id)
);

-- Publications table
CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    abstract TEXT,
    publication_type VARCHAR(100) CHECK (publication_type IN ('journal_article', 'conference_paper', 'book_chapter', 'book', 'thesis', 'report')),
    journal_name VARCHAR(255),
    publication_date DATE,
    doi VARCHAR(255),
    url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Publication Authors (many-to-many)
CREATE TABLE publication_authors (
    id SERIAL PRIMARY KEY,
    publication_id INTEGER REFERENCES publications(id) ON DELETE CASCADE,
    scholar_id INTEGER REFERENCES scholars(id) ON DELETE CASCADE,
    author_order INTEGER,
    UNIQUE(publication_id, scholar_id)
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(500),
    message TEXT NOT NULL,
    submission_type VARCHAR(100) CHECK (submission_type IN ('general', 'partnership', 'mentorship', 'scholarship')),
    status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_scholars_user_id ON scholars(user_id);
CREATE INDEX idx_scholars_country ON scholars(country);
CREATE INDEX idx_scholars_status ON scholars(status);
CREATE INDEX idx_partners_type ON partners(type);
CREATE INDEX idx_research_projects_status ON research_projects(status);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_start_date ON events(start_date);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_board_members_updated_at BEFORE UPDATE ON board_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_scholars_updated_at BEFORE UPDATE ON scholars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_projects_updated_at BEFORE UPDATE ON research_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mentorships_updated_at BEFORE UPDATE ON mentorships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();