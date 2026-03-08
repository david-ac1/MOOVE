# 🌍 Moove

**AI-Powered Migration Pathway Simulator**

> Map your future before it happens. The world's first AI-powered migration simulator for high-fidelity planning of cross-border journeys.

[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-Gradient%E2%84%A2%20AI-0080FF?style=flat&logo=digitalocean)](https://www.digitalocean.com/products/ai-ml)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.0-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.12+-blue?style=flat&logo=python)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

**Moove** helps users visualize and compare long-term migration journeys (5–15 years) for work, study, permanent residency, or citizenship. It focuses on simulation and education, **not** legal advice or guarantees.

### What Moove IS:
✅ Educational  
✅ Exploratory  
✅ Comparative  
✅ Timeline-based  

### What Moove IS NOT:
❌ Legal advice  
❌ A decision engine  
❌ Document processing  
❌ Migration consultancy replacement  

**Primary Goal:** "I want to understand what my migration journey could look like over time, what risks exist, and how alternative countries or pathways compare — before committing."

---

## 🌊 Powered by DigitalOcean Gradient™ AI

> **🏆 Hackathon Project:** This application is built for the DigitalOcean Hackathon and **requires** DigitalOcean Gradient™ AI to function.

**Moove uses DigitalOcean Gradient™ AI for:**
- 🤖 Conversational intake agent interactions
- 🧠 Migration pathway analysis and recommendations
- 📊 Timeline generation and risk assessment
- 💡 Smart alternative pathway suggestions

**Setup Guide:** See [DIGITALOCEAN_SETUP.md](DIGITALOCEAN_SETUP.md) for detailed configuration instructions.

**Fallback:** Anthropic Claude API can be used for local testing, but DigitalOcean Gradient™ AI is required for production deployment and hackathon submission.

---

## ✨ Features

### 🤖 AI-Powered Intake Agent
- Conversational AI agent conducts structured interviews
- Collects normalized data: passport, age, education, profession, goals
- No free-text essays - all inputs are structured
- **Powered by DigitalOcean Gradient™ AI** (required for production)
- Anthropic Claude fallback available for local development

### 📊 Migration Timeline Simulator
- Multi-year migration pathway visualization (5–15 years)
- Phase-by-phase breakdown with:
  - Duration estimates
  - Requirements and eligibility criteria
  - Risk indicators and warnings
  - Cost estimates
  - Success probability scores

### 🔄 Alternative Pathway Comparison
- Compare multiple countries side-by-side
- Risk-adjusted pathway analysis
- Probability-weighted timelines
- Inline recommendations

### 🎨 Modern UI/UX
- Clean, professional design
- Responsive across all devices
- Real-time updates
- Interactive timeline visualization

---

## 🛠 Tech Stack

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **UI Components:** Custom React components
- **State Management:** React Hooks

### Backend
- **Framework:** FastAPI 0.115.0
- **Language:** Python 3.12+
- **Database:** PostgreSQL with SQLAlchemy 2.0
- **Migrations:** Alembic 1.14.0
- **AI Integration:** DigitalOcean Gradient™ AI (primary) / Anthropic Claude (dev fallback)
- **Validation:** Pydantic 2.10

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Render / DigitalOcean
- **Database:** PostgreSQL (Render Managed)
- **CI/CD:** GitHub Actions (optional)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn/pnpm
- **Python** 3.12+
- **PostgreSQL** (for production) or SQLite (for development)
- **API Keys:**
  - **DigitalOcean Gradient™ AI API key** (REQUIRED for production/hackathon)
  - Anthropic API key (optional, for local testing only)

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/moove.git
cd moove
```

### 2. Setup Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows PowerShell:
.\venv\Scripts\Activate.ps1
# Windows CMD:
venv\Scripts\activate.bat
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp ../.env.example .env

# Edit .env and add your API keys
# Required:
# - DATABASE_URL (or use default SQLite)
# - GRADIENT_AGENT_ACCESS_KEY (DigitalOcean Gradient AI - REQUIRED)
# - CORS_ORIGINS (default: http://localhost:3000)
# Optional for local dev:
# - ANTHROPIC_API_KEY (fallback for testing)

# Run database migrations
alembic upgrade head

# Start backend server
uvicorn app.main:app --reload --port 8000
```

**Backend will be available at:** `http://localhost:8000`  
**API Docs:** `http://localhost:8000/docs`

### 3. Setup Frontend

```bash
# From project root
npm install
# or
yarn install
# or
pnpm install

# Create environment file
cp .env.example .env.local

# Edit .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

**Frontend will be available at:** `http://localhost:3000`

### 4. Verify Installation

1. Open `http://localhost:3000` in your browser
2. Check backend health: `http://localhost:8000` (should show operational status)
3. View API docs: `http://localhost:8000/docs`

---

## 📁 Project Structure

```
moove/
├── backend/                    # FastAPI backend
│   ├── alembic/               # Database migrations
│   │   └── versions/          # Migration files
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py            # FastAPI app entry point
│   │   ├── database.py        # SQLAlchemy configuration
│   │   ├── models.py          # Database models
│   │   ├── agents/            # AI agent logic
│   │   ├── api/
│   │   │   └── routes/        # API route handlers
│   │   ├── data/              # Visa rules database
│   │   │   ├── visa_rules_australia.py
│   │   │   ├── visa_rules_canada.py
│   │   │   └── visa_rules_germany.py
│   │   ├── models/            # Pydantic models
│   │   └── services/          # AI services
│   │       ├── gradient_ai.py
│   │       └── mock_ai.py
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── runtime.txt
│   └── README.md
│
├── src/                       # Next.js frontend
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   ├── globals.css        # Global styles
│   │   ├── intake/            # Intake agent page
│   │   ├── simulator/         # Timeline simulator page
│   │   └── compare/           # Pathway comparison page
│   ├── components/
│   │   └── shared/            # Shared components
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   └── lib/
│       └── api.ts             # API client utilities
│
├── public/                    # Static assets
│   └── test-backend.html      # Backend test page
│
├── moove-screens/             # UI mockups/prototypes
│
├── .env.example               # Environment template
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── package.json               # Frontend dependencies
├── render.yaml                # Render deployment config
├── vercel.json                # Vercel deployment config
│
├── prd.md                     # Product requirements
├── DEPLOYMENT.md              # Deployment guide
├── QUICK_START.md             # Quick start guide
├── TESTING_GUIDE.md           # Testing instructions
├── PROGRESS.md                # Development progress
└── README.md                  # This file
```

---

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:8000`
- **Production:** `https://your-backend-url.onrender.com`

### Endpoints

#### Health Check
```http
GET /
Response: 200 OK
{
  "service": "Moove API",
  "status": "operational",
  "version": "1.0.0"
}
```

#### Start Intake Session
```http
POST /api/intake/start
Request Body: { "user_id": "optional_string" }
Response: 200 OK
{
  "session_id": "uuid",
  "agent_message": "string",
  "status": "active"
}
```

#### Send Message to Intake Agent
```http
POST /api/intake/message
Request Body: {
  "session_id": "uuid",
  "user_message": "string"
}
Response: 200 OK
{
  "agent_message": "string",
  "data_collected": {...},
  "is_complete": false
}
```

#### Generate Timeline Simulation
```http
POST /api/simulate/generate
Request Body: {
  "session_id": "uuid",
  "target_country": "australia|canada|germany",
  "time_horizon_years": 10
}
Response: 200 OK
{
  "simulation_id": "uuid",
  "timeline": [...],
  "risk_score": 0.0-1.0,
  "total_duration_months": 120
}
```

#### Compare Pathways
```http
POST /api/simulate/compare
Request Body: {
  "session_id": "uuid",
  "countries": ["australia", "canada"]
}
Response: 200 OK
{
  "comparison_id": "uuid",
  "pathways": [...]
}
```

### Interactive API Documentation
- **Swagger UI:** Visit `/docs` on your backend server
- **ReDoc:** Visit `/redoc` on your backend server

---

## 🌐 Deployment

### Quick Deploy

**Frontend (Vercel):**
1. Push code to GitHub
2. Import repository on Vercel
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

**Backend (Render):**
1. Connect GitHub repository
2. Render auto-detects `render.yaml`
3. Add environment variables:
   - `GRADIENT_AGENT_ACCESS_KEY` (DigitalOcean Gradient AI)
   - `GRADIENT_AGENT_ENDPOINT`
   - `CORS_ORIGINS`
4. Deploy

### Detailed Guides
- See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment instructions
- See [QUICK_START.md](QUICK_START.md) for 30-minute setup guide
- See [DIGITALOCEAN_SETUP.md](DIGITALOCEAN_SETUP.md) for **DigitalOcean Gradient™ AI setup** (REQUIRED)

> ⚠️ **Hackathon Requirement:** This project MUST use DigitalOcean Gradient™ AI to be eligible for judging. See [DIGITALOCEAN_SETUP.md](DIGITALOCEAN_SETUP.md) for setup instructions.

---

## 🔐 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```bash
# Database
DATABASE_URL=sqlite:///./moove.db  # Development
# DATABASE_URL=postgresql://user:pass@host:5432/moove  # Production

# DigitalOcean Gradient™ AI (REQUIRED for production/hackathon)
GRADIENT_AGENT_ENDPOINT=https://your-agent-url.gradient.ai
GRADIENT_AGENT_ACCESS_KEY=your-gradient-access-key
DIGITALOCEAN_GRADIENT_API_KEY=dop_v1_...

# Anthropic Claude (OPTIONAL - local development/testing only)
# ANTHROPIC_API_KEY=sk-ant-...

# CORS
CORS_ORIGINS=http://localhost:3000,https://your-app.vercel.app

# Optional
ENVIRONMENT=development
LOG_LEVEL=INFO
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
pytest --cov=app tests/
```

### Frontend Tests
```bash
npm run test
# or
yarn test
```

### Manual Testing
- Use `public/test-backend.html` for backend API testing
- See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing procedures

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Keep commits atomic and well-described

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For questions, issues, or contributions:
- Open an issue on GitHub
- Check [PROGRESS.md](PROGRESS.md) for development status
- Review [prd.md](prd.md) for product requirements

---

## 🙏 Acknowledgments

- **AI Powered by [DigitalOcean Gradient™ AI](https://www.digitalocean.com/products/ai-ml)**
- Built with [Next.js](https://nextjs.org/) and [FastAPI](https://fastapi.tiangolo.com/)
- Deployed on [Vercel](https://vercel.com/) and [Render](https://render.com/)
- Migration data compiled from official government sources

---

**Made with ❤️ for people planning their next move**
