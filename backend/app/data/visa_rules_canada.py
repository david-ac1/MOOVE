# Visa Rules Data for Canada
# Source: IRCC official guidelines (simplified for MVP)

CANADA_VISA_RULES = {
    "country_code": "CA",
    "country_name": "Canada",
    "description": "Canada offers multiple immigration pathways through Express Entry, Provincial Nominee Programs, and study-to-PR routes.",
    
    "pathways": {
        "express_entry": {
            "name": "Express Entry (Federal Skilled Worker)",
            "duration_years": "1-2",
            "requirements": {
                "education": ["bachelors", "masters", "phd"],
                "age_preference": ["25-34", "35-44"],
                "language": "CLB 7+ (IELTS 6.0+)",
                "work_experience": "1+ years skilled work",
                "funds_required": "CAD $13,310 for single applicant"
            },
            "phases": [
                {
                    "name": "Express Entry Profile",
                    "duration_months": 1,
                    "requirements": ["Language test", "ECA for foreign credentials", "CRS score calculation"],
                    "costs": "CAD $300-500"
                },
                {
                    "name": "Invitation to Apply (ITA)",
                    "duration_months": "1-6",
                    "requirements": ["CRS score 470-500+", "Profile in pool"],
                    "success_rate": "60%"
                },
                {
                    "name": "PR Application",
                    "duration_months": "6-8",
                    "requirements": ["Medical exam", "Police clearance", "Proof of funds"],
                    "costs": "CAD $1,365 + $515 (spouse)"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "PR Card valid 5 years"
                }
            ],
            "timeline_total": "12-18 months",
            "success_factors": ["High CRS score (education, age, language, work exp)", "Job offer (+50-200 CRS points)", "Provincial nomination (+600 points)"]
        },
        
        "study_permit": {
            "name": "Study Permit → Post-Graduation Work Permit → PR",
            "duration_years": "4-6",
            "requirements": {
                "education": ["high_school", "bachelors"],
                "age_preference": ["18-24", "25-34"],
                "language": "IELTS 6.5+ for university",
                "funds_required": "CAD $20,000-35,000/year (tuition + living)"
            },
            "phases": [
                {
                    "name": "Study Permit",
                    "duration_months": "2-4",
                    "requirements": ["University acceptance letter", "Proof of funds", "GIC $10,200"],
                    "costs": "CAD $150"
                },
                {
                    "name": "Study in Canada",
                    "duration_months": "24-48",
                    "requirements": ["Full-time enrollment", "Maintain grades"],
                    "costs": "CAD $15,000-35,000/year tuition"
                },
                {
                    "name": "Post-Graduation Work Permit (PGWP)",
                    "duration_months": "6-36",
                    "requirements": ["Graduate from DLI", "Apply within 180 days"],
                    "work_permit_length": "Equal to study duration (max 3 years)"
                },
                {
                    "name": "Express Entry (Canadian Experience Class)",
                    "duration_months": "12-18",
                    "requirements": ["1 year Canadian work experience", "CRS score boost"],
                    "success_rate": "85%"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "PR Card"
                }
            ],
            "timeline_total": "4-6 years",
            "success_factors": ["Study in high-demand field (tech, healthcare)", "Gain Canadian work experience", "Improve language scores"]
        },
        
        "provincial_nominee": {
            "name": "Provincial Nominee Program (PNP)",
            "duration_years": "1-3",
            "requirements": {
                "education": ["bachelors", "masters", "trades"],
                "age_preference": ["25-34", "35-44", "45-54"],
                "language": "CLB 5+ (varies by province)",
                "work_experience": "Varies by province and stream"
            },
            "provinces": {
                "ontario": "Ontario Immigrant Nominee Program (OINP) - Tech Draw",
                "british_columbia": "BC PNP - Tech Pilot",
                "alberta": "Alberta Advantage Immigration Program"
            },
            "phases": [
                {
                    "name": "Provincial Nomination",
                    "duration_months": "3-6",
                    "requirements": ["Meet province criteria", "Job offer (some streams)", "Intent to reside"],
                    "costs": "CAD $0-1,500"
                },
                {
                    "name": "Federal PR Application",
                    "duration_months": "12-18",
                    "requirements": ["Provincial nomination certificate", "Medical/police", "Proof of funds"],
                    "costs": "CAD $1,365 + $515 (spouse)"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": 0,
                    "status": "PR Card"
                }
            ],
            "timeline_total": "18-30 months",
            "success_factors": ["Target in-demand occupations", "Consider smaller provinces (faster)", "Job offer significantly helps"]
        }
    },
    
    "citizenship": {
        "name": "Canadian Citizenship",
        "requirements": {
            "pr_years": 3,
            "physical_presence": "1,095 days in 5 years",
            "language": "CLB 4 (basic)",
            "knowledge_test": "Canadian citizenship test",
            "age_range": "18-54 must pass test"
        },
        "process": {
            "application_time": "12-24 months",
            "oath_ceremony": "Final step",
            "dual_citizenship": "Allowed"
        },
        "costs": "CAD $630"
    },
    
    "risk_factors": [
        {
            "risk": "CRS Score Competition",
            "severity": "high",
            "mitigation": "Improve language scores, get Canadian education/work experience, obtain LMIA job offer"
        },
        {
            "risk": "Processing Delays",
            "severity": "medium",
            "mitigation": "Submit complete application, respond quickly to requests, use IRCC web form for inquiries"
        },
        {
            "risk": "Policy Changes",
            "severity": "medium",
            "mitigation": "Stay updated on IRCC announcements, have backup plan (PNP, study)"
        },
        {
            "risk": "Funds Requirement",
            "severity": "medium",
            "mitigation": "Save early, explore scholarship options for study route"
        }
    ],
    
    "advantages": [
        "Strong economy and job market (especially tech)",
        "High quality of life and healthcare",
        "Pathway to citizenship in 3 years",
        "Dual citizenship allowed",
        "Family sponsorship options"
    ],
    
    "points_system": {
        "name": "Comprehensive Ranking System (CRS)",
        "max_score": 1200,
        "factors": {
            "age": {"25-29": 110, "30-34": 105, "35-39": 99, "40-44": 90, "45+": "decreasing"},
            "education": {"phd": 150, "masters": 135, "bachelors": 120, "diploma": 90},
            "language": {"CLB 9+": 128, "CLB 8": 116, "CLB 7": 102},
            "work_experience": {"3+ years": 50, "5+ years": 80},
            "job_offer": {"LMIA": 50, "arranged_employment": 200},
            "provincial_nomination": 600
        },
        "typical_cutoff": "470-500 points",
        "strategy": "Aim for 500+ to be competitive"
    }
}
