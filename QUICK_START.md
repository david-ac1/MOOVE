# 🚀 Quick Start Guide
## Get Moove Running in 30 Minutes

This guide gets you from zero to working prototype fast.

---

## ⚡ Prerequisites

- Python 3.11+
- Node.js 20+
- Git
- DigitalOcean account (or create one)
- 30 minutes of focused time

---

## 📦 Step 1: Setup Backend (10 min)

### Create Backend Folder
```powershell
# From moove root directory
mkdir backend
cd backend
```

### Setup Python Environment
```powershell
# Create virtual environment
python -m venv venv

# Activate (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Activate (Windows CMD)
venv\Scripts\activate.bat

# Activate (Mac/Linux)
source venv/bin/activate
```

### Install Dependencies
```powershell
# Copy requirements file
Copy-Item ..\backend-requirements.txt .\requirements.txt

# Install
pip install -r requirements.txt
```

### Setup Project Structure
```powershell
# Create folders
mkdir app
mkdir app\api
mkdir app\api\routes
mkdir app\agents
mkdir app\services
mkdir app\models
mkdir app\data

# Create __init__.py files
New-Item app\__init__.py
New-Item app\api\__init__.py
New-Item app\api\routes\__init__.py
New-Item app\agents\__init__.py
New-Item app\services\__init__.py
New-Item app\models\__init__.py
```

### Copy Starter Code
```powershell
# Copy the starter backend
Copy-Item ..\backend-starter.py .\app\main.py
```

### Setup Environment Variables
```powershell
# Copy template
Copy-Item ..\.env.example .\.env

# Edit .env and add your keys
# For quick testing, you can use Anthropic API key
# Get one at: https://console.anthropic.com/
```

### Run Backend
```powershell
# Start server
uvicorn app.main:app --reload --port 8000

# You should see:
# INFO:     Uvicorn running on http://127.0.0.1:8000
```

### Test Backend
```powershell
# In a new terminal, test the health check
curl http://localhost:8000

# Expected response:
# {"service":"Moove API","status":"operational","version":"1.0.0"}
```

**✅ Backend is running!**

---

## 🎨 Step 2: Connect Frontend (10 min)

### Create API Client
```powershell
# From moove root directory
cd src
mkdir lib
```

Create `src/lib/api.ts`:
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = {
  intake: {
    start: async () => {
      const res = await fetch(`${API_BASE_URL}/api/intake/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      return res.json();
    },
    
    sendMessage: async (sessionId: string, message: string) => {
      const res = await fetch(`${API_BASE_URL}/api/intake/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message }),
      });
      return res.json();
    },
  },
  
  simulate: async (intakeData: any) => {
    const res = await fetch(`${API_BASE_URL}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intake_data: intakeData }),
    });
    return res.json();
  },
};
```

### Update Environment Variables
Create `.env.local` in root:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Start Frontend
```powershell
# From moove root
npm run dev

# Opens at http://localhost:3000
```

**✅ Frontend is running!**

---

## 🧪 Step 3: Test Integration (10 min)

### Test the Agent
1. Open http://localhost:3000/intake
2. You should see the chat interface
3. Click one of the response buttons or type a message
4. The AI agent should respond (currently will use fallback responses)

### Test the Simulator
1. Complete the intake conversation
2. When agent says it's ready, click "Generate Simulation"
3. Should redirect to simulator page with timeline

### Common Issues

**Backend won't start:**
```powershell
# Check Python version
python --version  # Should be 3.11+

# Check if port 8000 is in use
netstat -ano | findstr :8000

# Kill process if needed (Windows)
taskkill /PID <PID> /F
```

**Frontend can't connect to backend:**
```powershell
# Check .env.local exists
Get-Content .env.local

# Verify backend is running
curl http://localhost:8000

# Check browser console for CORS errors
```

**AI responses not working:**
```powershell
# Check .env has API key
Get-Content backend\.env | Select-String "ANTHROPIC"

# Test API key directly
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY" \
  -H "anthropic-version: 2023-06-01"
```

---

## 🎯 Next Steps

Now that basics work:

1. **Get DigitalOcean Setup** (Day 1 in DAY_BY_DAY_TASKS.md)
   - Create account at digitalocean.com
   - Get $200 free credits
   - Setup managed PostgreSQL
   - Deploy to App Platform

2. **Integrate Gradient™ AI** (Day 3 in DAY_BY_DAY_TASKS.md)
   - Replace Anthropic with DigitalOcean Gradient™ AI
   - Follow: https://docs.digitalocean.com/products/ai/

3. **Build Visa Rules** (Day 5 in DAY_BY_DAY_TASKS.md)
   - Add Canada, Germany, Australia pathways
   - Create visa_rules.json
   - Implement matching logic

4. **Polish UI** (Days 8-10 in DAY_BY_DAY_TASKS.md)
   - Connect all pages to real data
   - Add loading states
   - Improve error handling

---

## 📚 Resources

**Documentation:**
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Next.js Docs](https://nextjs.org/docs)
- [DigitalOcean Gradient™ AI](https://docs.digitalocean.com/products/ai/)

**Reference Files:**
- `IMPLEMENTATION_PLAN.md` - Full technical plan
- `DAY_BY_DAY_TASKS.md` - Detailed daily tasks
- `prd.md` - Product requirements

**Getting Help:**
- Hackathon Discord/Slack
- DigitalOcean Community
- Stack Overflow

---

## 🏆 Success Criteria

You're on track if:
- ✅ Backend responds to API calls
- ✅ Frontend loads without errors
- ✅ Agent can respond to messages
- ✅ Simulation generates placeholder timeline

**You're 20% done. Keep going!** 🚀

---

## 💡 Pro Tips

**Development Workflow:**
1. Keep both terminals open (backend + frontend)
2. Test after every major change
3. Commit to Git frequently
4. Deploy early, deploy often

**Time Savers:**
- Use GitHub Copilot for boilerplate
- Copy-paste from backend-starter.py
- Don't write tests until core works
- Use hardcoded data initially

**Avoid These:**
- Don't over-engineer
- Don't add features not in PRD
- Don't wait until last day to deploy
- Don't skip documentation

Happy building! 🐮
