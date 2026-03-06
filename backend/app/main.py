# Backend Starter Template
# Save as: backend/app/main.py

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import httpx

# Import visa rules data
from app.data import get_visa_rules, get_available_countries, VISA_RULES_DB

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
    start_year: float
    end_year: float
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
        Load visa framework rules from data module
        """
        return VISA_RULES_DB
    
    async def generate_pathway(self, intake_data: IntakeData) -> List[TimelinePhase]:
        """
        Generate migration pathway timeline based on user profile
        """
        
        country_code = intake_data.target_country
        
        if country_code not in self.visa_rules:
            raise HTTPException(status_code=400, detail=f"Country {country_code} not supported yet")
        
        country_rules = self.visa_rules[country_code]
        
        # Select best pathway based on user profile
        pathway_key = self._select_best_pathway(intake_data, country_rules)
        pathway = country_rules["pathways"][pathway_key]
        
        # Generate timeline phases
        timeline = []
        current_year = 0
        
        for i, phase_data in enumerate(pathway["phases"]):
            # Calculate duration (convert months to years)
            duration_months_raw = phase_data.get("duration_months", 12)
            
            # Handle both int and string durations (e.g., "1-6" means 1-6 months)
            if isinstance(duration_months_raw, str):
                # Parse range like "1-6" or "6-8"
                if "-" in duration_months_raw:
                    parts = duration_months_raw.split("-")
                    # Take the midpoint of the range
                    duration_months = (int(parts[0]) + int(parts[1])) / 2
                else:
                    duration_months = int(duration_months_raw)
            else:
                duration_months = duration_months_raw
            
            duration_years = round(duration_months / 12, 1) if duration_months > 0 else 0
            
            # Calculate years
            start_year = current_year
            end_year = round(current_year + duration_years, 1) if duration_years > 0 else current_year
            
            # Determine risk level based on phase requirements
            risk_level = self._calculate_risk_level(phase_data, i, len(pathway["phases"]))
            
            # Extract key constraints
            requirements = phase_data.get("requirements", [])
            if isinstance(requirements, dict):
                key_constraints = [f"{k}: {v}" for k, v in requirements.items()]
            elif isinstance(requirements, list):
                key_constraints = requirements
            else:
                key_constraints = [str(requirements)]
            
            # Generate explanation using AI
            explanation = await self._generate_phase_explanation(
                phase_data, intake_data, pathway
            )
            
            timeline.append(TimelinePhase(
                phase_name=phase_data["name"],
                start_year=start_year,
                end_year=end_year,
                visa_or_status=phase_data.get("status", phase_data.get("name", "Processing")),
                risk_level=risk_level,
                key_constraints=key_constraints[:3],  # Limit to 3 main constraints
                explanation=explanation
            ))
            
            current_year = end_year
            
        return timeline
    
    def _select_best_pathway(self, intake_data: IntakeData, country_rules: Dict) -> str:
        """
        Select the most suitable pathway based on user profile
        """
        age = intake_data.age_bracket
        education = intake_data.education_level
        goal = intake_data.migration_goal
        
        pathways = country_rules["pathways"]
        
        # Selection logic based on profile
        if goal == "study" or age in ["18-24", "25-34"] and education in ["high_school", "bachelors"]:
            # Prefer study route for younger applicants or those seeking study
            if "study_route" in pathways or "study_permit" in pathways:
                return "study_route" if "study_route" in pathways else "study_permit"
        
        if education in ["masters", "phd"] and age in ["25-34", "35-44"]:
            # Prefer direct skilled migration for highly educated
            if "express_entry" in pathways:
                return "express_entry"
            if "eu_blue_card" in pathways:
                return "eu_blue_card"
            if "skilled_independent" in pathways:
                return "skilled_independent"
        
        # Default to first available pathway
        return list(pathways.keys())[0]
    
    def _calculate_risk_level(self, phase_data: Dict, phase_index: int, total_phases: int) -> str:
        """
        Calculate risk level for a phase
        """
        # Early phases (job search, applications) - higher risk
        if phase_index < total_phases // 2:
            return "amber"
        
        # Later phases (PR, citizenship) - lower risk
        if "Permanent" in phase_data.get("name", "") or "Citizenship" in phase_data.get("name", ""):
            return "green"
        
        # Check for success rate indicators
        success_rate = phase_data.get("success_rate", "")
        if success_rate and isinstance(success_rate, str):
            percentage = int(success_rate.rstrip("%"))
            if percentage >= 75:
                return "green"
            elif percentage >= 50:
                return "amber"
            else:
                return "red"
        
        return "amber"
    
    async def _generate_phase_explanation(
        self, 
        phase_data: Dict, 
        intake_data: IntakeData,
        pathway: Dict
    ) -> str:
        """
        Generate human-readable explanation for a phase
        """
        
        duration_months = phase_data.get("duration_months", 12)
        requirements = phase_data.get("requirements", [])
        costs = phase_data.get("costs", "N/A")
        
        prompt = f"""
        Explain this migration phase in 2-3 sentences for someone with this profile:
        - Age: {intake_data.age_bracket}
        - Education: {intake_data.education_level}
        - Profession: {intake_data.profession_category}
        - Goal: {intake_data.migration_goal}
        
        Phase: {phase_data['name']}
        Duration: {duration_months} months
        Requirements: {requirements}
        Costs: {costs}
        
        Be informative, encouraging, and specific to their profile. Never promise outcomes.
        """
        
        try:
            explanation = await ai_client.chat_completion([
                {"role": "user", "content": prompt}
            ], temperature=0.6, max_tokens=200)
            return explanation.strip()
        except Exception as e:
            # Fallback to template explanation
            duration_years = round(duration_months / 12, 1)
            return f"During this {phase_data['name']} phase, you'll need to meet specific requirements over approximately {duration_years} years. The typical costs are {costs}."

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
    import traceback
    
    try:
        timeline = await simulator.generate_pathway(data.intake_data)
        
        return SimulationResponse(
            simulation_id=str(uuid.uuid4()),
            target_country=data.intake_data.target_country,
            timeline=timeline,
            generated_at=datetime.now()
        )
    except Exception as e:
        print(f"ERROR in simulate_pathway: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

@app.get("/api/countries")
async def get_countries():
    """
    Get list of supported countries with details
    """
    countries = []
    flags = {"CA": "🇨🇦", "DE": "🇩🇪", "AU": "🇦🇺"}
    
    for code, rules in VISA_RULES_DB.items():
        countries.append({
            "code": code,
            "name": rules["country_name"],
            "flag": flags.get(code, "🌍"),
            "description": rules["description"],
            "pathways_count": len(rules["pathways"])
        })
    
    return {"countries": countries}

# =============================================================================
# RUN SERVER
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
