# Moove Backend API

AI-powered migration pathway simulator backend built with FastAPI.

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Virtual environment activated

### Setup

```powershell
# Install dependencies
.\venv\Scripts\pip.exe install -r requirements.txt

# Copy environment file
Copy-Item ..\.env.example .\.env

# Edit .env and add your API keys:
# - ANTHROPIC_API_KEY (for testing)
# - DIGITALOCEAN_GRADIENT_API_KEY (production)
```

### Run Development Server

```powershell
# From backend directory
.\venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

Server will start at: `http://localhost:8000`

### API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 📋 Available Endpoints

### Health Check
```
GET /
Response: {"service": "Moove API", "status": "operational", "version": "1.0.0"}
```

### Intake Agent
```
POST /api/intake/start
Create new conversation session

POST /api/intake/message
Send message to AI agent

GET /api/intake/session/{session_id}
Get conversation history
```

### Simulation
```
POST /api/simulate
Generate migration pathway timeline

GET /api/countries
List supported countries
```

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── api/
│   │   └── routes/          # API route handlers
│   ├── agents/              # AI agent implementations
│   ├── services/            # Business logic
│   ├── models/              # Data models
│   └── data/                # Visa rules & static data
├── venv/                    # Virtual environment
├── requirements.txt         # Python dependencies
└── .env                     # Environment variables (not in git)
```

## 🔑 Environment Variables

Required:
- `ANTHROPIC_API_KEY` - Claude API key (development/testing)
- `DIGITALOCEAN_GRADIENT_API_KEY` - Production AI service

Optional:
- `DATABASE_URL` - PostgreSQL connection string
- `DEBUG` - Enable debug mode
- `CORS_ORIGINS` - Allowed origins for CORS

## 🧪 Testing

```powershell
# Test health endpoint
Invoke-WebRequest -Uri "http://localhost:8000" -UseBasicParsing

# Test agent conversation start
Invoke-WebRequest -Uri "http://localhost:8000/api/intake/start" -Method POST -UseBasicParsing
```

## 📝 Next Steps

1. Add DigitalOcean Gradient™ AI integration
2. Implement database persistence
3. Complete visa rules for 3+ countries
4. Add automated tests
5. Deploy to DigitalOcean App Platform

## 🔗 Links

- [API Documentation](http://localhost:8000/docs)
- [Project Planning](../IMPLEMENTATION_PLAN.md)
- [Day-by-Day Tasks](../DAY_BY_DAY_TASKS.md)
