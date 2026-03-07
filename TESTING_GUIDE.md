# Full Stack Integration Testing Guide

## System Status ✅

**Backend:** FastAPI + SQLAlchemy + SQLite  
**Frontend:** Next.js 16 + React 19 + TypeScript  
**AI:** Anthropic Claude Sonnet 4 (with DigitalOcean fallback)  
**Database:** SQLite (moove.db)

## Running the Full Stack

### 1. Start Backend Server
```powershell
cd C:\Users\david\Desktop\moove\backend
$env:DATABASE_URL = "sqlite:///./moove.db"
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```
Backend will be available at: **http://localhost:8001**

### 2. Start Frontend Server
```powershell
cd C:\Users\david\Desktop\moove
npm run dev
```
Frontend will be available at: **http://localhost:3000**

## Testing the Integration

### Test 1: Intake Conversation Flow
1. Open browser to: **http://localhost:3000/intake**
2. You should see the AI greeti ng message automatically
3. Type a message like: "I have a US passport and I'm 28 years old"
4. AI should respond with follow-up questions
5. Continue conversation until "Simulation Ready" appears

### Test 2: Pathway Simulation
1. Complete the intake conversation with all required info:
   - Passport/citizenship
   - Age bracket (18-24, 25-34, 35-44, 45-54, 55+)
   - Education level (high_school, bachelors, masters, phd)
   - Profession category (e.g., tech, healthcare, finance)
   - Migration goal (study, work, permanent_residence, citizenship)
   - Target country (CA, DE, AU)
   - Time horizon (5, 10, or 15 years)

2. After completion, click "See Pathways" button
3. Navigate to simulator page
4. Should display your personalized migration timeline

### Test 3: Direct API Testing

#### Backend Health Check
```powershell
Invoke-RestMethod -Uri "http://localhost:8001/"
```
Expected: `{"service":"Moove API","status":"operational","version":"1.0.0"}`

#### Start Intake Session
```powershell
$session = Invoke-RestMethod -Uri "http://localhost:8001/api/intake/start" -Method POST -Body "{}" -ContentType "application/json"
$session.session_id
```

#### Send Message
```powershell
$body = @{session_id=$session.session_id;message="I am 30 years old with a master's degree"} | ConvertTo-Json
$response = Invoke-RestMethod -Uri "http://localhost:8001/api/intake/message" -Method POST -Body $body -ContentType "application/json"
$response.response
```

#### Generate Simulation
```powershell
$body = @{intake_data=@{
  passport="US";
  age_bracket="25-34";
  education_level="masters";
  profession_category="tech";
  migration_goal="permanent_residence";
  target_country="CA";
  time_horizon_years=10
}} | ConvertTo-Json -Depth 10

$sim = Invoke-RestMethod -Uri "http://localhost:8001/api/simulate" -Method POST -Body $body -ContentType "application/json"
$sim.timeline | Format-Table phase_name, start_year, end_year, risk_level
```

#### Get Countries
```powershell
$countries = Invoke-RestMethod -Uri "http://localhost:8001/api/countries"
$countries.countries | Format-Table code, name, pathways_count
```

## Database Inspection

View database contents:
```powershell
cd C:\Users\david\Desktop\moove\backend
.\venv\Scripts\python.exe -c "
import sqlite3
conn = sqlite3.connect('moove.db')
cursor = conn.cursor()

print('=== Intake Sessions ===')
cursor.execute('SELECT session_id, created_at, simulation_ready FROM intake_sessions')
for row in cursor.fetchall():
    print(row)

print('\n=== Simulations ===')
cursor.execute('SELECT simulation_id, target_country, age_bracket, education_level FROM simulations')
for row in cursor.fetchall():
    print(row)

print('\n=== Timeline Phases (last 5) ===')
cursor.execute('SELECT simulation_id, phase_name, start_year, end_year, risk_level FROM timeline_phases ORDER BY id DESC LIMIT 5')
for row in cursor.fetchall():
    print(row)
"
```

## API Endpoints Reference

### Backend API (Port 8001)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check |
| `/api/intake/start` | POST | Start new intake session |
| `/api/intake/message` | POST | Send message to AI agent |
| `/api/intake/session/{id}` | GET | Get session details |
| `/api/simulate` | POST | Generate migration pathway |
| `/api/countries` | GET | List supported countries |

### Frontend Routes (Port 3000)

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/intake` | AI conversation intake |
| `/simulator` | Pathway simulation results |
| `/compare` | Compare pathways |

## Features Implemented

### ✅ Backend
- [x] FastAPI REST API with async support
- [x] SQLAlchemy ORM with SQLite database
- [x] Alembic database migrations
- [x] AI integration (DigitalOcean → Anthropic → Mock fallback)
- [x] Intake conversation agent with session management
- [x] Migration pathway simulation engine
- [x] Comprehensive visa rules for CA/DE/AU
- [x] Smart pathway selection based on user profile
- [x] Risk assessment for timeline phases
- [x] Data persistence (sessions, messages, simulations)

### ✅ Frontend
- [x] Next.js 16 with React Server Components
- [x] TypeScript for type safety
- [x] Tailwind CSS with custom design system
- [x] Dynamic intake page with real-time chat
- [x] API client library
- [x] State management for conversations
- [x] Progress tracking UI
- [x] Responsive design

### ✅ Integration
- [x] Frontend calling backend API
- [x] Conversation persistence
- [x] Simulation generation
- [x] Database storage working
- [x] Error handling

## Next Steps for Production

1. **Environment Configuration**
   - Create `.env.local` for frontend  with `NEXT_PUBLIC_API_URL`
   - Configure production database (PostgreSQL)
   - Set up proper CORS origins

2. **DigitalOcean Deployment**
   - Apply for DO credits (hackathon requirement)
   - Update AI client to use DO Gradient™ AI as primary
   - Deploy backend to DO App Platform
   - Deploy frontend to DO Static Sites

3. **Additional Features**
   - Connect simulator page to display saved simulations
   - Add user authentication
   - Implement comparison view
   - Add country selection UI
   - Create profile management

4. **Testing**
   - Write unit tests for API endpoints
   - Add integration tests
   - Test with multiple countries
   - Load testing for concurrent users

## Troubleshooting

### Backend won't start
- Check if port 8001 is in use: `Get-NetTCPConnection -LocalPort 8001`
- Ensure DATABASE_URL environment variable is set
-  Check virtual environment is activated

### Frontend can't connect to backend
- Verify backend is running on port 8001
- Check API_BASE_URL in `src/lib/api.ts`
- Check browser console for CORS errors
- Ensure both servers are running

### Database errors
- Delete `moove.db` and run migrations again
- Check DATABASE_URL format: `sqlite:///./moove.db`
- Verify Alembic migrations applied: `alembic current`

### AI not responding
- Check `.env` file has ANTHROPIC_API_KEY
- Verify API key is valid
- Check terminal logs for error messages

## System Requirements Met

- ✅ AI Integration (Anthropic Claude Sonnet 4)
- ✅ Database persistence (SQLite → PostgreSQL ready)
- ✅ RESTful API (FastAPI)
- ✅ Modern frontend (Next.js 16)
- ✅ TypeScript throughout
- ✅ Real-time conversation UI
- ✅ Migration pathway simulation
- ✅ Multi-country support (3 countries)
- ✅ Risk assessment
- ✅ Timeline generation
