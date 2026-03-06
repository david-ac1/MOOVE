# Visa Rules Data for Australia  
# Source: Department of Home Affairs (simplified for MVP)

AUSTRALIA_VISA_RULES = {
    "country_code": "AU",
    "country_name": "Australia",
    "description": "Australia uses a points-based system for skilled migration, with pathways through General Skilled Migration, employer sponsorship, and study.",
    
    "pathways": {
        "skilled_independent": {
            "name": "Skilled Independent Visa (Subclass 189)",
            "duration_years": "1-3",
            "requirements": {
                "education": ["bachelors", "masters", "phd"],
                "age_preference": ["25-34", "35-44"],
                "language": "English IELTS 6.0+ (7.0+ competitive)",
                "skills_assessment": "Required for nominated occupation",
                "points_minimum": 65
            },
            "phases": [
                {
                    "name": "Skills Assessment",
                    "duration_months": "2-4",
                    "requirements": ["Occupation on MLTSSL", "Assessment from relevant authority", "Work experience verification"],
                    "costs": "AUD $300-1,050 (varies by assessing authority)"
                },
                {
                    "name": "Expression of Interest (EOI)",
                    "duration_months": "1-12",
                    "requirements": ["SkillSelect profile", "65+ points", "Under 45 years"],
                    "competitive_points": "80-85 points for invitation"
                },
                {
                    "name": "Invitation to Apply",
                    "duration_months": "0-12",
                    "requirements": ["High points score", "Occupation in demand"],
                    "valid_for": "60 days to lodge application"
                },
                {
                    "name": "Visa Application",
                    "duration_months": "6-12",
                    "requirements": ["Health examination", "Police clearance", "Financial evidence"],
                    "costs": "AUD $4,640"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "Unrestricted work and residence",
                    "travel": "5-year travel facility"
                }
            ],
            "timeline_total": "12-36 months",
            "success_factors": ["High points (aim for 85+)", "In-demand occupation", "Superior English (8 each IELTS band)", "Strong work experience"]
        },
        
        "skilled_nominated": {
            "name": "Skilled Nominated Visa (Subclass 190)",
            "duration_years": "1-2",
            "requirements": {
                "education": ["bachelors", "masters", "phd"],
                "age_preference": ["25-34", "35-44"],
                "language": "English IELTS 6.0+",
                "points_minimum": 65,
                "state_nomination": "Required"
            },
            "phases": [
                {
                    "name": "Skills Assessment & EOI",
                    "duration_months": "2-4",
                    "requirements": ["Skills assessment", "65+ points"],
                    "costs": "AUD $300-1,050"
                },
                {
                    "name": "State Nomination",
                    "duration_months": "1-6",
                    "requirements": ["Apply to state/territory", "Meet state criteria", "Commitment to live in state"],
                    "bonus_points": "+5 points",
                    "costs": "AUD $200-300 (state fee)"
                },
                {
                    "name": "Visa Application",
                    "duration_months": "6-12",
                    "requirements": ["State nomination", "Health/character checks"],
                    "costs": "AUD $4,640"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "PR with initial state residence requirement (usually 2 years)"
                }
            ],
            "timeline_total": "12-24 months",
            "success_factors": ["Target states with lower competition (SA, Tasmania, NT)", "Occupations on state lists", "Consider regional areas"]
        },
        
        "employer_sponsored": {
            "name": "Temporary Skill Shortage (TSS 482) → Permanent (186)",
            "duration_years": "3-5",
            "requirements": {
                "education": ["bachelors", "diploma", "relevant"],
                "age_preference": ["25-34", "35-44", "Under 45 for PR"],
                "language": "English IELTS 5.0+ (TSS), 6.0+ (PR)",
                "work_experience": "2+ years in occupation",
                "employer_sponsor": "Required"
            },
            "phases": [
                {
                    "name": "Job Offer & TSS Visa (482)",
                    "duration_months": "3-6",
                    "requirements": ["Approved sponsor", "Nomination", "Genuine position"],
                    "costs": "AUD $1,455 (Short-term) or $3,035 (Medium-term)",
                    "duration": "2 years (Short-term) or 4 years (Medium-term)"
                },
                {
                    "name": "Work on TSS Visa",
                    "duration_months": "36",
                    "requirements": ["Work for sponsoring employer", "Maintain employment"],
                    "pathway": "Medium-term stream allows PR pathway after 3 years"
                },
                {
                    "name": "Employer Nomination Scheme (ENS 186)",
                    "duration_months": "6-12",
                    "requirements": ["3 years with employer", "Under 45 years", "English 6.0+", "Skills assessment"],
                    "costs": "AUD $4,640"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "Unrestricted PR"
                }
            ],
            "timeline_total": "4-5 years",
            "success_factors": ["Strong employer relationship", "Medium-term TSS visa (not short-term)", "Skills in MLTSSL occupations"]
        },
        
        "study_route": {
            "name": "Student Visa → Temporary Graduate → PR",
            "duration_years": "5-8",
            "requirements": {
                "education": ["high_school", "bachelors"],
                "age_preference": ["18-24", "25-34"],
                "language": "English IELTS 5.5-6.5 (study), 6.0+ (PR)",
                "funds_required": "AUD $24,505/year + tuition"
            },
            "phases": [
                {
                    "name": "Student Visa (Subclass 500)",
                    "duration_months": "1-3",
                    "requirements": ["University offer (CoE)", "Genuine Temporary Entrant", "Financial capacity", "Health insurance (OSHC)"],
                    "costs": "AUD $710"
                },
                {
                    "name": "Study in Australia",
                    "duration_months": "24-48",
                    "requirements": ["Full-time enrollment", "Course progress"],
                    "tuition": "AUD $20,000-45,000/year",
                    "work_allowed": "48 hours/fortnight during semester, unlimited during breaks"
                },
                {
                    "name": "Temporary Graduate Visa (485)",
                    "duration_months": "24-48",
                    "requirements": ["Australian qualification", "Apply within 6 months of completion"],
                    "duration": "2-4 years (4 years for Masters/PhD in regional areas)",
                    "costs": "AUD $1,895"
                },
                {
                    "name": "Gain Work Experience",
                    "duration_months": "12-24",
                    "requirements": ["Work in skilled occupation", "Build points for PR"],
                    "strategy": "Gain Australian work experience (+5-20 points)"
                },
                {
                    "name": "Skilled Migration PR (189/190)",
                    "duration_months": "12-24",
                    "requirements": ["Points (usually 80-85)", "Skills assessment", "Under 45"],
                    "costs": "AUD $4,640"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "PR"
                }
            ],
            "timeline_total": "6-8 years",
            "success_factors": ["Study in high-points fields (engineering, IT, health)", "Target regional universities (+5 points)", "Gain Australian work experience", "Superior English (20 points for 8.0+ IELTS)"]
        }
    },
    
    "citizenship": {
        "name": "Australian Citizenship",
        "requirements": {
            "pr_years": 4,
            "physical_presence": "Must have been in Australia for 4 years including 12 months as PR, and not absent for more than 12 months total",
            "language": "Basic English",
            "knowledge_test": "Australian citizenship test",
            "character_requirements": "Good character"
        },
        "process": {
            "application_time": "12-24 months",
            "ceremony": "Required",
            "dual_citizenship": "Allowed",
            "costs": "AUD $490"
        }
    },
    
    "risk_factors": [
        {
            "risk": "High Points Competition",
            "severity": "high",
            "mitigation": "Aim for 85+ points, superior English, Australian work experience/study"
        },
        {
            "risk": "Age Limits",
            "severity": "high",
            "mitigation": "Apply before 45, plan early if older"
        },
        {
            "risk": "Occupation Ceiling",
            "severity": "medium",
            "mitigation": "Check occupation ceilings, consider state nomination, look at less competitive occupations"
        },
        {
            "risk": "High Cost of Living",
            "severity": "high",
            "mitigation": "Save funds, consider regional areas (lower costs + migration benefits)"
        },
        {
            "risk": "Skills Assessment Rejection",
            "severity": "medium",
            "mitigation": "Ensure qualifications match requirements, get RPL if needed, use migration agent"
        }
    ],
    
    "advantages": [
        "High quality of life and safety",
        "Strong economy and wages",
        "Excellent weather and beaches",
        "Multicultural society",
        "Path to citizenship in 4 years",
        "Dual citizenship allowed"
    ],
    
    "points_system": {
        "name": "SkillSelect Points Test",
        "minimum_score": 65,
        "competitive_score": "80-90",
        "factors": {
            "age": {"25-32": 30, "33-39": 25, "40-44": 15, "45+": 0},
            "english": {"Superior (8.0+)": 20, "Proficient (7.0+)": 10, "Competent (6.0+)": 0},
            "education": {"PhD": 20, "Masters/Bachelors": 15, "Diploma": 10},
            "work_experience_overseas": {"8+ years": 15, "5-7 years": 10, "3-4 years": 5},
            "work_experience_australia": {"8+ years": 20, "5-7 years": 15, "3-4 years": 10, "1-2 years": 5},
            "state_nomination": 5,
            "regional_study": 5,
            "partner_skills": 10,
            "professional_year": 5,
            "community_language": 5
        },
        "strategy": "Max points from Australian experience (work + study) and English"
    },
    
    "occupation_lists": {
        "MLTSSL": "Medium and Long-term Strategic Skills List (189 eligible)",
        "STSOL": "Short-term Skilled Occupation List (190, 482 eligible)",
        "ROL": "Regional Occupation List (regional visas)",
        "check": "Use www.homeaffairs.gov.au/trav/work/work/skills-assessment-and-assessing-authorities/skilled-occupations-lists"
    }
}
