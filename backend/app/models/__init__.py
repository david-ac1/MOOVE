"""
Database models for Moove application
"""
from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class IntakeSession(Base):
    """
    Stores intake conversation sessions
    """
    __tablename__ = "intake_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Collected data (stored as JSON)
    collected_data = Column(JSON, default=dict)
    
    # Status
    simulation_ready = Column(Integer, default=0)  # 0 = not ready, 1 = ready
    
    # Relationships
    messages = relationship("ConversationMessage", back_populates="session", cascade="all, delete-orphan")
    simulations = relationship("Simulation", back_populates="session", cascade="all, delete-orphan")

class ConversationMessage(Base):
    """
    Stores individual messages in intake conversations
    """
    __tablename__ = "conversation_messages"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(100), ForeignKey("intake_sessions.session_id"), nullable=False)
    role = Column(String(20), nullable=False)  # "user" or "assistant"
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
    
    # Relationship
    session = relationship("IntakeSession", back_populates="messages")

class Simulation(Base):
    """
    Stores generated migration simulations
    """
    __tablename__ = "simulations"
    
    id = Column(Integer, primary_key=True, index=True)
    simulation_id = Column(String(100), unique=True, index=True, nullable=False)
    session_id = Column(String(100), ForeignKey("intake_sessions.session_id"), nullable=True)
    
    # Input data
    passport = Column(String(10))
    age_bracket = Column(String(20))
    education_level = Column(String(50))
    profession_category = Column(String(100))
    migration_goal = Column(String(50))
    target_country = Column(String(10), nullable=False)
    time_horizon_years = Column(Integer)
    
    # Metadata
    created_at = Column(DateTime, default=datetime.utcnow)
    generated_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    session = relationship("IntakeSession", back_populates="simulations")
    timeline_phases = relationship("TimelinePhase", back_populates="simulation", cascade="all, delete-orphan")

class TimelinePhase(Base):
    """
    Stores individual phases of a migration timeline
    """
    __tablename__ = "timeline_phases"
    
    id = Column(Integer, primary_key=True, index=True)
    simulation_id = Column(String(100), ForeignKey("simulations.simulation_id"), nullable=False)
    
    # Phase details
    phase_name = Column(String(200), nullable=False)
    start_year = Column(Float, nullable=False)
    end_year = Column(Float, nullable=False)
    visa_or_status = Column(String(200))
    risk_level = Column(String(20))  # "green", "amber", "red"
    
    # Requirements and explanation
    key_constraints = Column(JSON, default=list)  # List of string constraints
    explanation = Column(Text)
    
    # Order in timeline
    phase_order = Column(Integer, nullable=False)
    
    # Relationship
    simulation = relationship("Simulation", back_populates="timeline_phases")
