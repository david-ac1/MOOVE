"""
Database configuration and connection management
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL (SQLite for local dev, PostgreSQL for production)
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./moove.db")

# Render.com uses postgres:// but SQLAlchemy 1.4+ requires postgresql://
# Convert if needed
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create engine
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
    pool_pre_ping=True  # Helps with connection issues in production
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

def get_db():
    """
    Dependency for FastAPI endpoints to get database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """
    Initialize database (create tables)
    """
    Base.metadata.create_all(bind=engine)
