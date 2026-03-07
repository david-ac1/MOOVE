# Backend Starter Template
# Save as: backend/app/main.py

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime
import httpx
from sqlalchemy.orm import Session

# Import visa rules data
from app.data import get_visa_rules, get_available_countries, VISA_RULES_DB

# Import database
from app.database import get_db, init_db
from app.models import IntakeSession as DBIntakeSession, ConversationMessage, Simulation as DBSimulation, TimelinePhase as DBTimelinePhase

# Initialize FastAPI app
app = FastAPI(
    title="Moove API",
    description="AI-Powered Migration Pathway Simulator",
    version="1.0.0"
)

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    init_db()
    print("✅ Database initialized")

# CORS configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins during development
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

class InterviewerAgent:
    def __init__(self):
        self.system_prompt = INTERVIEWER_SYSTEM_PROMPT
        
    async def process_message(self, session_id: str, user_message: str, db: Session) -> Dict[str, Any]:
        """
        Process user message and return agent response
        """
        
        # Get or create session in database
        db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == session_id).first()
        
        if not db_session:
            raise HTTPException(status_code=404, detail="Session not found")
        
        # Add user message to database
        user_msg = ConversationMessage(
            session_id=session_id,
            role="user",
            content=user_message
        )
        db.add(user_msg)
        db.commit()
        
        # Get conversation history
        conversation_history = db.query(ConversationMessage)\
            .filter(ConversationMessage.session_id == session_id)\
            .order_by(ConversationMessage.timestamp)\
            .all()
        
        # Build messages for AI
        messages = [{"role": "user", "content": self.system_prompt}]
        messages += [{"role": msg.role, "content": msg.content} for msg in conversation_history]
        
        # Get AI response
        try:
            agent_response = await ai_client.chat_completion(messages)
            
            # Add agent response to database
            assistant_msg = ConversationMessage(
                session_id=session_id,
                role="assistant",
                content=agent_response
            )
            db.add(assistant_msg)
            
            # Check if simulation ready
            simulation_ready = "SIMULATION_READY" in agent_response
            if simulation_ready:
                db_session.simulation_ready = 1
            
            db_session.updated_at = datetime.utcnow()
            db.commit()
            
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
    Generates timeline phases based on intake data using AI
    """
    
    def __init__(self):
        # No longer need hardcoded visa rules - AI will generate pathways for any country
        pass
    
    async def generate_pathway(self, intake_data: IntakeData) -> List[TimelinePhase]:
        """
        Generate migration pathway timeline based on user profile using AI
        """
        import json
        
        country_code = intake_data.target_country
        
        # Create a comprehensive prompt for AI to generate the pathway
        prompt = f"""
You are a migration pathway expert. Generate a realistic, detailed migration timeline for this profile:

PROFILE:
- Current Citizenship: {intake_data.passport}
- Age: {intake_data.age_bracket}
- Education: {intake_data.education_level}
- Profession: {intake_data.profession_category}
- Migration Goal: {intake_data.migration_goal}
- Target Country: {country_code}
- Time Horizon: {intake_data.time_horizon_years} years

TASK:
Generate a realistic migration pathway timeline with 3-5 phases. Each phase must include:
1. phase_name: Descriptive name (e.g., "Skilled Worker Visa", "Job Search & Application", "Permanent Residency")
2. duration_years: How many years this phase takes (decimal like 1.5 or 2.0)
3. visa_or_status: The visa type or immigration status during this phase
4. risk_level: One of "green" (secure/high success), "amber" (moderate risk), or "red" (high risk/uncertain)
5. key_constraints: List of 2-4 main requirements (e.g., "Language test IELTS 7.0", "Job offer required", "Minimum salary $60,000")
6. explanation: 2-3 sentences explaining what happens in this phase and why it matters for their profile

IMPORTANT RULES:
- Base this on REAL migration pathways for {country_code}
- Phases must be chronological and achievable within {intake_data.time_horizon_years} years
- Consider their age, education, and profession when determining feasibility
- Early phases (job search, initial visa) = amber/red risk
- Later phases (PR, citizenship) = green/amber risk
- Be realistic about timing and requirements
- If {intake_data.migration_goal} is "study", start with student visa pathway
- If goal is "work", start with work visa pathway
- If goal is "permanent_residency" or "citizenship", include progression through work/study to PR

Return ONLY valid JSON with this structure (no markdown, no extra text):
{{
  "phases": [
    {{
      "phase_name": "string",
      "duration_years": 1.5,
      "visa_or_status": "string",
      "risk_level": "green|amber|red",
      "key_constraints": ["string", "string", "string"],
      "explanation": "string"
    }}
  ]
}}
"""

        try:
            # Get AI to generate the pathway
            response = await ai_client.chat_completion([
                {"role": "user", "content": prompt}
            ], temperature=0.7, max_tokens=2000)
            
            # Parse JSON response
            pathway_data = json.loads(response.strip())
            
            # Build timeline from AI response
            timeline = []
            current_year = 0
            
            for i, phase in enumerate(pathway_data["phases"]):
                duration = phase["duration_years"]
                start_year = current_year
                end_year = round(current_year + duration, 1)
                
                timeline.append(TimelinePhase(
                    phase_name=phase["phase_name"],
                    start_year=start_year,
                    end_year=end_year,
                    visa_or_status=phase["visa_or_status"],
                    risk_level=phase["risk_level"],
                    key_constraints=phase["key_constraints"][:3],  # Limit to 3
                    explanation=phase["explanation"]
                ))
                
                current_year = end_year
            
            return timeline
            
        except json.JSONDecodeError as e:
            print(f"Failed to parse AI response: {str(e)}")
            print(f"AI Response: {response}")
            # Fallback to simple timeline
            return self._generate_fallback_pathway(intake_data)
        except Exception as e:
            print(f"Error generating pathway: {str(e)}")
            return self._generate_fallback_pathway(intake_data)
    
    def _generate_fallback_pathway(self, intake_data: IntakeData) -> List[TimelinePhase]:
        """
        Generate a simple fallback pathway if AI fails
        """
        goal = intake_data.migration_goal
        years = intake_data.time_horizon_years
        
        if goal == "study":
            return [
                TimelinePhase(
                    phase_name="Student Visa & University Enrollment",
                    start_year=0,
                    end_year=2.0,
                    visa_or_status="Student Visa",
                    risk_level="amber",
                    key_constraints=["University acceptance letter", "Proof of funds", "Language proficiency"],
                    explanation=f"Apply for a student visa to {intake_data.target_country}. You'll need to be accepted to a recognized institution and demonstrate financial capacity."
                ),
                TimelinePhase(
                    phase_name="Post-Study Work Permit",
                    start_year=2.0,
                    end_year=4.0,
                    visa_or_status="Post-Graduation Work Permit",
                    risk_level="amber",
                    key_constraints=["Complete degree", "Job search", "Valid passport"],
                    explanation="After graduation, obtain a work permit to gain professional experience. This is a critical phase for building your profile."
                ),
                TimelinePhase(
                    phase_name="Permanent Residency Application",
                    start_year=4.0,
                    end_year=years,
                    visa_or_status="Permanent Resident",
                    risk_level="green",
                    key_constraints=["Work experience", "Language test", "Clean record"],
                    explanation="With your education and work experience, apply for permanent residency through skilled migration streams."
                )
            ]
        else:
            return [
                TimelinePhase(
                    phase_name="Job Search & Visa Sponsorship",
                    start_year=0,
                    end_year=1.5,
                    visa_or_status="Work Visa (Sponsored)",
                    risk_level="amber",
                    key_constraints=["Job offer", "Employer sponsorship", "Skills assessment"],
                    explanation=f"Secure a job offer from an employer in {intake_data.target_country} willing to sponsor your work visa."
                ),
                TimelinePhase(
                    phase_name="Work Visa Period",
                    start_year=1.5,
                    end_year=4.0,
                    visa_or_status="Temporary Work Visa",
                    risk_level="amber",
                    key_constraints=["Maintain employment", "Meet visa conditions", "Build experience"],
                    explanation="Work in your sponsored role while building eligibility for permanent residency. Maintain good standing with your employer."
                ),
                TimelinePhase(
                    phase_name="Permanent Residency",
                    start_year=4.0,
                    end_year=years,
                    visa_or_status="Permanent Resident",
                    risk_level="green",
                    key_constraints=["Sufficient work experience", "Language proficiency", "Pass health/character checks"],
                    explanation="Apply for permanent residency through skilled worker programs. Your work experience will significantly strengthen your application."
                )
            ]

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
async def start_intake_session(data: IntakeSessionStart, db: Session = Depends(get_db)):
    """
    Initialize a new intake session
    """
    import uuid
    session_id = str(uuid.uuid4())
    
    # Create session in database
    db_session = DBIntakeSession(
        session_id=session_id,
        collected_data={},
        simulation_ready=0
    )
    db.add(db_session)
    db.commit()
    db.refresh(db_session)
    
    # Get initial greeting from agent
    initial_message = await interviewer.process_message(
        session_id, 
        "Hello, I'm ready to start.",
        db
    )
    
    return {
        "session_id": session_id,
        "message": initial_message["response"]
    }

@app.post("/api/intake/message")
async def send_message(data: IntakeMessage, db: Session = Depends(get_db)):
    """
    Send message to interviewer agent
    """
    # Check if session exists
    db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == data.session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    response = await interviewer.process_message(data.session_id, data.message, db)
    
    return response

@app.get("/api/intake/session/{session_id}")
async def get_session(session_id: str, db: Session = Depends(get_db)):
    """
    Get session state
    """
    db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Get conversation history
    messages = db.query(ConversationMessage)\
        .filter(ConversationMessage.session_id == session_id)\
        .order_by(ConversationMessage.timestamp)\
        .all()
    
    return {
        "session_id": db_session.session_id,
        "created_at": db_session.created_at,
        "simulation_ready": bool(db_session.simulation_ready),
        "messages": [{"role": msg.role, "content": msg.content, "timestamp": msg.timestamp} for msg in messages]
    }

@app.post("/api/simulate")
async def simulate_pathway(data: SimulationRequest, db: Session = Depends(get_db)):
    """
    Generate migration pathway simulation
    """
    import uuid
    import traceback
    
    try:
        timeline = await simulator.generate_pathway(data.intake_data)
        simulation_id = str(uuid.uuid4())
        
        # Save simulation to database
        db_simulation = DBSimulation(
            simulation_id=simulation_id,
            passport=data.intake_data.passport,
            age_bracket=data.intake_data.age_bracket,
            education_level=data.intake_data.education_level,
            profession_category=data.intake_data.profession_category,
            migration_goal=data.intake_data.migration_goal,
            target_country=data.intake_data.target_country,
            time_horizon_years=data.intake_data.time_horizon_years,
            generated_at=datetime.utcnow()
        )
        db.add(db_simulation)
        db.commit()
        
        # Save timeline phases
        for order, phase in enumerate(timeline):
            db_phase = DBTimelinePhase(
                simulation_id=simulation_id,
                phase_name=phase.phase_name,
                start_year=phase.start_year,
                end_year=phase.end_year,
                visa_or_status=phase.visa_or_status,
                risk_level=phase.risk_level,
                key_constraints=phase.key_constraints,
                explanation=phase.explanation,
                phase_order=order
            )
            db.add(db_phase)
        db.commit()
        
        return SimulationResponse(
            simulation_id=simulation_id,
            target_country=data.intake_data.target_country,
            timeline=timeline,
            generated_at=datetime.utcnow()
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

def _extract_data_from_conversation(conversation_text: str) -> Dict[str, Any]:
    """
    Fallback method to manually extract intake data from conversation text
    Uses simple keyword matching
    """
    import re
    
    data = {
        "passport": "US",  # Default
        "age_bracket": "25-34",  # Default
        "education_level": "bachelors",  # Default
        "profession_category": "professional",  # Default
        "migration_goal": "work",  # Default
        "target_country": "CA",  # Default
        "time_horizon_years": 10  # Default
    }
    
    text_lower = conversation_text.lower()
    
    # Extract country codes (look for common patterns)
    country_patterns = [
        (r'\b(canada|canadian)\b', 'CA'),
        (r'\b(germany|german)\b', 'DE'),
        (r'\b(australia|australian)\b', 'AU'),
        (r'\b(united states|usa|america|american)\b', 'US'),
        (r'\b(united kingdom|uk|britain|british)\b', 'GB'),
        (r'\b(india|indian)\b', 'IN'),
        (r'\b(argentina|argentinian)\b', 'AR'),
        (r'\b(brazil|brazilian)\b', 'BR'),
        (r'\b(japan|japanese)\b', 'JP'),
        (r'\b(china|chinese)\b', 'CN'),
    ]
    
    for pattern, code in country_patterns:
        if re.search(pattern, text_lower):
            # Check context to determine if it's passport or target
            if 'from' in text_lower or 'citizen' in text_lower or 'passport' in text_lower:
                data['passport'] = code
            if 'to' in text_lower or 'target' in text_lower or 'move' in text_lower or 'migrate' in text_lower:
                data['target_country'] = code
    
    # Extract age bracket
    if re.search(r'\b(18|19|20|21|22|23|24)\b', text_lower):
        data['age_bracket'] = '18-24'
    elif re.search(r'\b(25|26|27|28|29|30|31|32|33|34)\b', text_lower):
        data['age_bracket'] = '25-34'
    elif re.search(r'\b(35|36|37|38|39|40|41|42|43|44)\b', text_lower):
        data['age_bracket'] = '35-44'
    elif re.search(r'\b(45|46|47|48|49|50|51|52|53|54)\b', text_lower):
        data['age_bracket'] = '45-54'
    elif re.search(r'\b(5[5-9]|6[0-9]|70)\b', text_lower):
        data['age_bracket'] = '55+'
    
    # Extract education
    if 'phd' in text_lower or 'doctorate' in text_lower:
        data['education_level'] = 'phd'
    elif 'master' in text_lower or 'mba' in text_lower:
        data['education_level'] = 'masters'
    elif 'bachelor' in text_lower or 'undergraduate' in text_lower or 'degree' in text_lower:
        data['education_level'] = 'bachelors'
    elif 'high school' in text_lower or 'secondary' in text_lower:
        data['education_level'] = 'high_school'
    
    # Extract goal
    if 'study' in text_lower or 'student' in text_lower or 'university' in text_lower:
        data['migration_goal'] = 'study'
    elif 'citizen' in text_lower and ('become' in text_lower or 'get' in text_lower):
        data['migration_goal'] = 'citizenship'
    elif 'permanent' in text_lower or 'settle' in text_lower or 'pr' in text_lower:
        data['migration_goal'] = 'permanent_residency'
    else:
        data['migration_goal'] = 'work'
    
    # Extract time horizon
    if re.search(r'\b5\s*year', text_lower):
        data['time_horizon_years'] = 5
    elif re.search(r'\b15\s*year', text_lower):
        data['time_horizon_years'] = 15
    else:
        data['time_horizon_years'] = 10
    
    # Extract profession (look for common job titles)
    professions = {
        'engineer': 'Engineer',
        'developer': 'Software Developer',
        'programmer': 'Software Developer',
        'software': 'Software Developer',
        'doctor': 'Medical Doctor',
        'nurse': 'Nurse',
        'teacher': 'Teacher',
        'manager': 'Manager',
        'accountant': 'Accountant',
        'designer': 'Designer',
        'architect': 'Architect',
        'lawyer': 'Lawyer',
        'consultant': 'Consultant',
    }
    
    for keyword, profession in professions.items():
        if keyword in text_lower:
            data['profession_category'] = profession
            break
    
    return data

@app.post("/api/simulate/from-session/{session_id}")
async def simulate_from_session(session_id: str, db: Session = Depends(get_db)):
    """
    Generate a simulation by extracting intake data from conversation history
    """
    import json
    
    # Get session
    db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Check if simulation ready
    if not db_session.simulation_ready:
        raise HTTPException(status_code=400, detail="Intake not complete. Please finish the conversation first.")
    
    # Get conversation history
    messages = db.query(ConversationMessage)\
        .filter(ConversationMessage.session_id == session_id)\
        .order_by(ConversationMessage.timestamp)\
        .all()
    
    # Build conversation for AI
    conversation_text = "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
    
    # Use AI to extract structured data
    extraction_prompt = f"""Extract intake data from the conversation below and return it as valid JSON.

REQUIRED JSON FORMAT (return ONLY this, no other text):
{{
    "passport": "two-letter country code",
    "age_bracket": "18-24 or 25-34 or 35-44 or 45-54 or 55+",
    "education_level": "high_school or bachelors or masters or phd",
    "profession_category": "user's profession",
    "migration_goal": "study or work or permanent_residency or citizenship",
    "target_country": "two-letter country code",
    "time_horizon_years": 5 or 10 or 15
}}

CONVERSATION:
{conversation_text}

Return ONLY the JSON object. No explanations, no markdown, no code blocks."""
    
    try:
        extracted_json = await ai_client.chat_completion([
            {"role": "user", "content": extraction_prompt}
        ], temperature=0.1, max_tokens=300)
        
        print(f"AI Extraction Response: {extracted_json}")
        
        # Clean up response - remove markdown code blocks if present
        cleaned_json = extracted_json.strip()
        if cleaned_json.startswith("```json"):
            cleaned_json = cleaned_json[7:]  # Remove ```json
        if cleaned_json.startswith("```"):
            cleaned_json = cleaned_json[3:]  # Remove ```
        if cleaned_json.endswith("```"):
            cleaned_json = cleaned_json[:-3]  # Remove ```
        cleaned_json = cleaned_json.strip()
        
        print(f"Cleaned JSON: {cleaned_json}")
        
        # Parse the JSON
        intake_data_dict = json.loads(cleaned_json)
        intake_data = IntakeData(**intake_data_dict)
        
        # Update collected_data in session
        db_session.collected_data = intake_data_dict
        db.commit()
        
    except json.JSONDecodeError as e:
        print(f"JSON parsing error: {str(e)}")
        print(f"Raw AI response: {extracted_json}")
        
        # Fallback: Try to manually extract from conversation
        try:
            intake_data_dict = _extract_data_from_conversation(conversation_text)
            intake_data = IntakeData(**intake_data_dict)
            db_session.collected_data = intake_data_dict
            db.commit()
            print(f"Successfully extracted data using fallback method")
        except Exception as fallback_error:
            print(f"Fallback extraction also failed: {str(fallback_error)}")
            raise HTTPException(
                status_code=500, 
                detail=f"Failed to extract intake data. Please try completing the interview again. Error: {str(e)}"
            )
    except Exception as e:
        print(f"Error extracting intake data: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to extract intake data: {str(e)}")
    
    # Generate simulation
    try:
        timeline = await simulator.generate_pathway(intake_data)
        import uuid
        simulation_id = str(uuid.uuid4())
        
        # Save simulation to database
        db_simulation = DBSimulation(
            simulation_id=simulation_id,
            session_id=session_id,  # Link to session
            passport=intake_data.passport,
            age_bracket=intake_data.age_bracket,
            education_level=intake_data.education_level,
            profession_category=intake_data.profession_category,
            migration_goal=intake_data.migration_goal,
            target_country=intake_data.target_country,
            time_horizon_years=intake_data.time_horizon_years,
            generated_at=datetime.utcnow()
        )
        db.add(db_simulation)
        db.commit()
        
        # Save timeline phases
        for order, phase in enumerate(timeline):
            db_phase = DBTimelinePhase(
                simulation_id=simulation_id,
                phase_name=phase.phase_name,
                start_year=phase.start_year,
                end_year=phase.end_year,
                visa_or_status=phase.visa_or_status,
                risk_level=phase.risk_level,
                key_constraints=phase.key_constraints,
                explanation=phase.explanation,
                phase_order=order
            )
            db.add(db_phase)
        db.commit()
        
        return SimulationResponse(
            simulation_id=simulation_id,
            target_country=intake_data.target_country,
            timeline=timeline,
            generated_at=datetime.utcnow()
        )
    except Exception as e:
        print(f"Error generating simulation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to generate simulation: {str(e)}")

@app.get("/api/simulations/session/{session_id}")
async def get_simulations_by_session(session_id: str, db: Session = Depends(get_db)):
    """
    Get all simulations for a given session
    """
    # Get session
    db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Get simulations
    simulations = db.query(DBSimulation)\
        .filter(DBSimulation.session_id == session_id)\
        .order_by(DBSimulation.created_at.desc())\
        .all()
    
    if not simulations:
        return {"simulations": [], "message": "No simulations found for this session"}
    
    # Build response with timeline data
    result = []
    for sim in simulations:
        # Get timeline phases
        phases = db.query(DBTimelinePhase)\
            .filter(DBTimelinePhase.simulation_id == sim.simulation_id)\
            .order_by(DBTimelinePhase.phase_order)\
            .all()
        
        timeline = [
            TimelinePhase(
                phase_name=p.phase_name,
                start_year=p.start_year,
                end_year=p.end_year,
                visa_or_status=p.visa_or_status,
                risk_level=p.risk_level,
                key_constraints=p.key_constraints,
                explanation=p.explanation
            ) for p in phases
        ]
        
        result.append({
            "simulation_id": sim.simulation_id,
            "target_country": sim.target_country,
            "timeline": timeline,
            "intake_data": {
                "passport": sim.passport,
                "age_bracket": sim.age_bracket,
                "education_level": sim.education_level,
                "profession_category": sim.profession_category,
                "migration_goal": sim.migration_goal,
                "target_country": sim.target_country,
                "time_horizon_years": sim.time_horizon_years
            },
            "generated_at": sim.generated_at
        })
    
    return {"simulations": result}

@app.get("/api/simulation/{simulation_id}")
async def get_simulation(simulation_id: str, db: Session = Depends(get_db)):
    """
    Get a specific simulation by ID
    """
    # Get simulation
    sim = db.query(DBSimulation).filter(DBSimulation.simulation_id == simulation_id).first()
    if not sim:
        raise HTTPException(status_code=404, detail="Simulation not found")
    
    # Get timeline phases
    phases = db.query(DBTimelinePhase)\
        .filter(DBTimelinePhase.simulation_id == simulation_id)\
        .order_by(DBTimelinePhase.phase_order)\
        .all()
    
    timeline = [
        TimelinePhase(
            phase_name=p.phase_name,
            start_year=p.start_year,
            end_year=p.end_year,
            visa_or_status=p.visa_or_status,
            risk_level=p.risk_level,
            key_constraints=p.key_constraints,
            explanation=p.explanation
        ) for p in phases
    ]
    
    return {
        "simulation_id": sim.simulation_id,
        "target_country": sim.target_country,
        "timeline": timeline,
        "intake_data": {
            "passport": sim.passport,
            "age_bracket": sim.age_bracket,
            "education_level": sim.education_level,
            "profession_category": sim.profession_category,
            "migration_goal": sim.migration_goal,
            "target_country": sim.target_country,
            "time_horizon_years": sim.time_horizon_years
        },
        "generated_at": sim.generated_at
    }

@app.post("/api/compare/from-session/{session_id}")
async def compare_pathways_from_session(session_id: str, db: Session = Depends(get_db)):
    """
    Generate personalized pathway comparisons for 3-5 countries based on user profile
    """
    import json
    
    # Get session
    db_session = db.query(DBIntakeSession).filter(DBIntakeSession.session_id == session_id).first()
    if not db_session:
        raise HTTPException(status_code=404, detail="Session not found")
    
    # Check if we have collected data already
    if db_session.collected_data and len(db_session.collected_data) > 0:
        intake_data_dict = db_session.collected_data
        intake_data = IntakeData(**intake_data_dict)
    else:
        # Extract from conversation if not yet done
        messages = db.query(ConversationMessage)\
            .filter(ConversationMessage.session_id == session_id)\
            .order_by(ConversationMessage.timestamp)\
            .all()
        
        conversation_text = "\n".join([f"{msg.role}: {msg.content}" for msg in messages])
        
        extraction_prompt = f"""Extract intake data from the conversation below and return it as valid JSON.

REQUIRED JSON FORMAT (return ONLY this, no other text):
{{
    "passport": "two-letter country code",
    "age_bracket": "18-24 or 25-34 or 35-44 or 45-54 or 55+",
    "education_level": "high_school or bachelors or masters or phd",
    "profession_category": "user's profession",
    "migration_goal": "study or work or permanent_residency or citizenship",
    "target_country": "two-letter country code",
    "time_horizon_years": 5 or 10 or 15
}}

CONVERSATION:
{conversation_text}

Return ONLY the JSON object."""
        
        try:
            extracted_json = await ai_client.chat_completion([
                {"role": "user", "content": extraction_prompt}
            ], temperature=0.1, max_tokens=300)
            
            cleaned_json = extracted_json.strip()
            if cleaned_json.startswith("```json"):
                cleaned_json = cleaned_json[7:]
            if cleaned_json.startswith("```"):
                cleaned_json = cleaned_json[3:]
            if cleaned_json.endswith("```"):
                cleaned_json = cleaned_json[:-3]
            cleaned_json = cleaned_json.strip()
            
            intake_data_dict = json.loads(cleaned_json)
            intake_data = IntakeData(**intake_data_dict)
            
            db_session.collected_data = intake_data_dict
            db.commit()
        except Exception as e:
            print(f"Error extracting for comparison: {str(e)}")
            intake_data_dict = _extract_data_from_conversation(conversation_text)
            intake_data = IntakeData(**intake_data_dict)
    
    # Generate AI-powered comparisons
    comparison_prompt = f"""You are a migration expert. Generate 3 personalized country pathway comparisons for this profile:

PROFILE:
- Current Citizenship: {intake_data.passport}
- Age: {intake_data.age_bracket}
- Education: {intake_data.education_level}
- Profession: {intake_data.profession_category}
- Migration Goal: {intake_data.migration_goal}
- Preferred Target: {intake_data.target_country}

TASK:
Generate 3 alternative country options (not including {intake_data.target_country} if it's common, or include it if it's uncommon).
For each country, provide realistic migration pathway analysis.

Return ONLY valid JSON with this structure (no markdown, no extra text):
{{
  "comparisons": [
    {{
      "country_code": "two-letter code",
      "country_name": "full country name",
      "pathway_name": "e.g., Skilled Worker Track, Express Entry",
      "success_rate": 75-98 (realistic percentage),
      "risk_level": "low or moderate or high",
      "processing_time": "e.g., 4-6 months, 12-18 months",
      "key_advantages": ["advantage 1", "advantage 2", "advantage 3"],
      "key_challenges": ["challenge 1", "challenge 2"],
      "estimated_cost_usd": 5000-50000 (realistic range),
      "is_recommended": true/false (mark ONE as true based on best fit),
      "fit_score": 1-100 (how well it matches their profile)
    }}
  ]
}}

Rules:
- Be realistic about success rates and timings
- Consider their age, education, profession when scoring fit
- Mark the BEST match as is_recommended: true
- Use actual country names and real migration programs
- Ensure diversity in options (different regions, risk levels)"""

    try:
        response = await ai_client.chat_completion([
            {"role": "user", "content": comparison_prompt}
        ], temperature=0.7, max_tokens=1500)
        
        print(f"AI Comparison Response: {response}")
        
        # Clean response
        cleaned = response.strip()
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]
        if cleaned.startswith("```"):
            cleaned = cleaned[3:]
        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]
        cleaned = cleaned.strip()
        
        comparison_data = json.loads(cleaned)
        
        return {
            "session_id": session_id,
            "intake_data": intake_data_dict,
            "comparisons": comparison_data["comparisons"]
        }
        
    except Exception as e:
        print(f"Error generating comparisons: {str(e)}")
        # Fallback to default comparisons
        return {
            "session_id": session_id,
            "intake_data": intake_data_dict,
            "comparisons": [
                {
                    "country_code": "CA",
                    "country_name": "Canada",
                    "pathway_name": "Express Entry (FSW)",
                    "success_rate": 82,
                    "risk_level": "moderate",
                    "processing_time": "4-6 months",
                    "key_advantages": ["Points-based system", "PR pathway", "Strong tech market"],
                    "key_challenges": ["High competition", "Language requirements"],
                    "estimated_cost_usd": 15000,
                    "is_recommended": True,
                    "fit_score": 85
                },
                {
                    "country_code": "DE",
                    "country_name": "Germany",
                    "pathway_name": "Skilled Worker Track",
                    "success_rate": 94,
                    "risk_level": "low",
                    "processing_time": "6-9 months",
                    "key_advantages": ["EU access", "Job seeker visa", "Strong economy"],
                    "key_challenges": ["Language barrier", "Credential recognition"],
                    "estimated_cost_usd": 12000,
                    "is_recommended": False,
                    "fit_score": 78
                },
                {
                    "country_code": "AU",
                    "country_name": "Australia",
                    "pathway_name": "Skilled Independent 189",
                    "success_rate": 88,
                    "risk_level": "moderate",
                    "processing_time": "8-12 months",
                    "key_advantages": ["No job offer required", "High quality of life", "Skills in demand"],
                    "key_challenges": ["Points threshold", "Age limits", "Distance from home"],
                    "estimated_cost_usd": 20000,
                    "is_recommended": False,
                    "fit_score": 72
                }
            ]
        }

# =============================================================================
# RUN SERVER
# =============================================================================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
