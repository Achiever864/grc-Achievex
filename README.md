# Graduate Research Clinic

A pan-African non-profit organization platform for empowering scholars and researchers.

## Project Structure

```
grc/
├── frontend/     # React + Vite frontend application
├── backend/      # Node.js + Express backend API
└── README.md     # This file
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/grc.git
cd grc
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your actual credentials

# Create PostgreSQL database
createdb graduate_research_clinic

# Run migrations
psql -U postgres -d graduate_research_clinic -f migrations/001_initial_schema.sql
psql -U postgres -d graduate_research_clinic -f migrations/002_newsletter_schema.sql
psql -U postgres -d graduate_research_clinic -f migrations/003_donations_schema.sql

# Start development server
npm run dev
```

Backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env if needed

# Start development server
npm run dev
```

Frontend will run on http://localhost:5173

## Running in Production

### Backend (Production)

```bash
cd backend
npm start
```

### Frontend (Production)

```bash
cd frontend
npm run build
# Serve the dist/ folder with nginx or similar
```

## Environment Variables

See `.env.example` files in both `frontend/` and `backend/` directories for required configuration.

## API Documentation

API runs on port 5000 with the following main endpoints:

- `/api/health` - Health check
- `/api/newsletter/*` - Newsletter subscriptions
- `/api/donations/*` - Donation management

## Technologies Used

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Wouter (routing)

### Backend

- Node.js
- Express
- PostgreSQL
- Brevo (email)
- Paga (payments)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
