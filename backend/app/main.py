# Backend Starter Template
# Save as: backend/app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import httpx

# Initialize FastAPI app
app = FastAPI(
    title="Moove API",
    description="AI-Powered Migration Pathway Simulator",
    version="1.0.0"
)

# CORS configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://moove.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# DATA MODELS
# =============================================================================

class IntakeSessionStart(BaseModel):
    user_id: Optional[str] = None

class IntakeMessage(BaseModel):
    session_id: str
    message: str

class IntakeData(BaseModel):
    passport: str
    age_bracket: str
    education_level: str
    profession_category: str
    migration_goal: str
    target_country: str
    time_horizon_years: int

class TimelinePhase(BaseModel):
    phase_name: str
    start_year: int
    end_year: int
    visa_or_status: str
    risk_level: str  # "green", "amber", "red"
    key_constraints: List[str]
    explanation: str

class SimulationRequest(BaseModel):
    intake_data: IntakeData

class SimulationResponse(BaseModel):
    simulation_id: str
    target_country: str
    timeline: List[TimelinePhase]
    generated_at: datetime

# =============================================================================
# AI CLIENT (DigitalOcean Gradient™)
# =============================================================================

# Import our AI client with Mock fallback
from app.services.gradient_ai import GradientAIClient

# Initialize AI client
ai_client = GradientAIClient()

# =============================================================================
# INTERVIEWER AGENT
# =============================================================================

INTERVIEWER_SYSTEM_PROMPT = """
You are Moove's migration pathway strategist. Your role is to conduct 
a structured interview to collect information for migration simulation.

PERSONALITY:
- Friendly but professional
- Curious and empathetic  
- Educational, not prescriptive
- Culturally sensitive

RESPONSIBILITIES:
1. Collect required fields: passport, age_bracket, education_level, 
   profession_category, migration_goal, target_country, time_horizon_years
2. Ask follow-up questions for clarity
3. Acknowledge user concerns
4. Explain why each question matters

PROHIBITED LANGUAGE (NEVER USE):
- "You should..."
- "I recommend..."
- "This guarantees..."
- "Your best option is..."

CONVERSATION FLOW:
1. Warm greeting + explain purpose
2. Ask about citizenship (can have multiple)
3. Age bracket (18-24, 25-34, 35-44, 45-54, 55+)
4. Education level (high_school, bachelors, masters, phd)
5. Current profession/field
6. Migration goal (study, work, permanent_residency, citizenship)
7. Target country preference
8. Time horizon (5, 10, or 15 years)
9. Summarize collected info + confirm
10. Say "SIMULATION_READY" when all fields collected

Keep questions conversational. One question at a time.
Use emojis sparingly but warmly.
"""

# In-memory session storage (use Redis/PostgreSQL in production)
sessions = {}

class InterviewerAgent:
    def __init__(self):
        self.system_prompt = INTERVIEWER_SYSTEM_PROMPT
        
    async def process_message(self, session_id: str, user_message: str) -> Dict[str, Any]:
        """
        Process user message and return agent response
        """
        
        # Get or create session
        if session_id not in sessions:
            sessions[session_id] = {
                "conversation_history": [],
                "collected_data": {},
                "started_at": datetime.now().isoformat()
            }
        
        session = sessions[session_id]
        
        # Add user message to history
        session["conversation_history"].append({
            "role": "user",
            "content": user_message
        })
        
        # Build messages for AI
        messages = [
            {"role": "user", "content": self.system_prompt}
        ] + session["conversation_history"]
        
        # Get AI response
        try:
            agent_response = await ai_client.chat_completion(messages)
            
            # Add agent response to history
            session["conversation_history"].append({
                "role": "assistant",
                "content": agent_response
            })
            
            # Check if simulation ready
            simulation_ready = "SIMULATION_READY" in agent_response
            
            return {
                "response": agent_response.replace("SIMULATION_READY", "").strip(),
                "simulation_ready": simulation_ready,
                "session_id": session_id
            }
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")

# Initialize agent
interviewer = InterviewerAgent()

# =============================================================================
# SIMULATION ENGINE
# =============================================================================

class SimulationEngine:
    """
    Generates timeline phases based on intake data
    """
    
    def __init__(self):
        # Load visa rules (hardcoded for MVP)
        self.visa_rules = self._load_visa_rules()
        
    def _load_visa_rules(self) -> Dict:
        """
        Load visa framework rules
        TODO: Move to JSON file or database
        """
        return {
            "CA": {
                "name": "Canada",
                "pathways": {
                    "express_entry": {
                        "phases": [
                            {
                                "phase_name": "Job Search & Work Permit",
                                "duration_years": 2,
                                "visa_or_status": "Closed Work Permit",
                                "risk_level": "amber",
                                "key_constraints": [
                                    "Need job offer from Canadian employer",
                                    "LMIA approval required",
                                    "Language test (CLB 7+)"
                                ]
                            },
                            {
                                "phase_name": "Permanent Residency Application",
                                "duration_years": 2,
                                "visa_or_status": "PR Application Processing",
                                "risk_level": "amber",
                                "key_constraints": [
                                    "1 year Canadian work experience",
                                    "CRS score 470+",
                                    "Medical exam & police clearance"
                                ]
                            },
                            {
                                "phase_name": "Permanent Resident",
                                "duration_years": 3,
                                "visa_or_status": "Permanent Resident",
                                "risk_level": "green",
                                "key_constraints": [
                                    "Maintain residency (730 days in 5 years)"
                                ]
                            },
                            {
                                "phase_name": "Citizenship Eligible",
                                "duration_years": 1,
                                "visa_or_status": "Citizenship Application",
                                "risk_level": "green",
                                "key_constraints": [
                                    "3 years as PR (1095 days)",
                                    "Language test",
                                    "Citizenship test"
                                ]
                            }
                        ]
                    }
                }
            },
            # Add more countries here
        }
    
    async def generate_pathway(self, intake_data: IntakeData) -> List[TimelinePhase]:
        """
        Generate migration pathway timeline
        """
        
        country_code = intake_data.target_country
        
        if country_code not in self.visa_rules:
            raise HTTPException(status_code=400, detail=f"Country {country_code} not supported yet")
        
        # Select pathway based on user profile (simplified for MVP)
        pathway = self.visa_rules[country_code]["pathways"]["express_entry"]
        
        # Generate timeline phases
        timeline = []
        current_year = 0
        
        for phase_template in pathway["phases"]:
            # Calculate years
            start_year = current_year
            end_year = current_year + phase_template["duration_years"]
            
            # Generate explanation using AI
            explanation = await self._generate_phase_explanation(
                phase_template, intake_data
            )
            
            timeline.append(TimelinePhase(
                phase_name=phase_template["phase_name"],
                start_year=start_year,
                end_year=end_year,
                visa_or_status=phase_template["visa_or_status"],
                risk_level=phase_template["risk_level"],
                key_constraints=phase_template["key_constraints"],
                explanation=explanation
            ))
            
            current_year = end_year
            
        return timeline
    
    async def _generate_phase_explanation(
        self, 
        phase_template: Dict, 
        intake_data: IntakeData
    ) -> str:
        """
        Generate human-readable explanation for a phase
        """
        
        prompt = f"""
        Explain this migration phase in 2-3 sentences for someone with this profile:
        - Age: {intake_data.age_bracket}
        - Education: {intake_data.education_level}
        - Profession: {intake_data.profession_category}
        - Goal: {intake_data.migration_goal}
        
        Phase: {phase_template['phase_name']}
        Status: {phase_template['visa_or_status']}
        Risk: {phase_template['risk_level']}
        
        Be informative and encouraging, but never promise outcomes.
        """
        
        try:
            explanation = await ai_client.chat_completion([
                {"role": "user", "content": prompt}
            ], temperature=0.6, max_tokens=200)
            return explanation
        except:
            # Fallback to template explanation
            return f"During this phase, you'll navigate {phase_template['phase_name']}. This typically takes {phase_template['duration_years']} years."

# Initialize simulation engine
simulator = SimulationEngine()

# =============================================================================
# API ROUTES
# =============================================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "service": "Moove API",
        "status": "operational",
        "version": "1.0.0"
    }

@app.post("/api/intake/start")
async def start_intake_session(data: IntakeSessionStart):
    """
    Initialize a new intake session
    """
    import uuid
    session_id = str(uuid.uuid4())
    
    # Create session
    sessions[session_id] = {
        "conversation_history": [],
        "collected_data": {},
        "started_at": datetime.now().isoformat()
    }
    
    # Get initial greeting from agent
    initial_message = await interviewer.process_message(
        session_id, 
        "Hello, I'm ready to start."
    )
    
    return {
        "session_id": session_id,
        "message": initial_message["response"]
    }

@app.post("/api/intake/message")
async def send_message(data: IntakeMessage):
    """
    Send message to interviewer agent
    """
    if data.session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    response = await interviewer.process_message(data.session_id, data.message)
    
    return response

@app.get("/api/intake/session/{session_id}")
async def get_session(session_id: str):
    """
    Get session state
    """
    if session_id not in sessions:
        raise HTTPException(status_code=404, detail="Session not found")
    
    return sessions[session_id]

@app.post("/api/simulate")
async def simulate_pathway(data: SimulationRequest):
    """
    Generate migration pathway simulation
    """
    import uuid
    
    timeline = await simulator.generate_pathway(data.intake_data)
    
    return SimulationResponse(
        simulation_id=str(uuid.uuid4()),
        target_country=data.intake_data.target_country,
        timeline=timeline,
        generated_at=datetime.now()
    )

@app.get("/api/countries")
async def get_countries():
    """
    Get list of supported countries
    """
    return {
        "countries": [
            {"code": "CA", "name": "Canada", "flag": "🇨🇦"},
            {"code": "DE", "name": "Germany", "flag": "🇩🇪"},
            {"code": "AU", "name": "Australia", "flag": "🇦🇺"},
        ]
    }

# =============================================================================
# RUN SERVER
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
