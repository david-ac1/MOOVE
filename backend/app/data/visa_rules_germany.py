# Visa Rules Data for Germany
# Source: German Federal Office for Migration and Refugees (simplified for MVP)

GERMANY_VISA_RULES = {
    "country_code": "DE",
    "country_name": "Germany",
    "description": "Germany offers the EU Blue Card for highly skilled workers, job seeker visas, and pathways through study or freelancing.",
    
    "pathways": {
        "eu_blue_card": {
            "name": "EU Blue Card (Highly Skilled Workers)",
            "duration_years": "3-5",
            "requirements": {
                "education": ["bachelors", "masters", "phd"],
                "age_preference": ["25-34", "35-44", "45-54"],
                "language": "German B1 or English (job-dependent)",
                "salary_threshold": "€45,300/year (€41,041.80 for shortage occupations)",
                "job_offer": "Required before application"
            },
            "phases": [
                {
                    "name": "Job Search",
                    "duration_months": "3-12",
                    "requirements": ["German or English language", "LinkedIn/XING profile", "Target companies"],
                    "costs": "€0"
                },
                {
                    "name": "EU Blue Card Application",
                    "duration_months": "1-3",
                    "requirements": ["Job contract", "University degree recognition", "Health insurance"],
                    "costs": "€100"
                },
                {
                    "name": "Temporary Residence (Blue Card)",
                    "duration_months": "48",
                    "requirements": ["Maintain employment", "Pay into social security"],
                    "renewal": "Can extend if still employed"
                },
                {
                    "name": "Permanent Residence (Niederlassungserlaubnis)",
                    "duration_months": "21-33",
                    "requirements": ["33 months with B1 German OR 21 months with B2 German", "60 months pension contributions", "Employment"],
                    "status": "Unrestricted work authorization"
                }
            ],
            "timeline_total": "3-5 years to PR",
            "success_factors": ["Tech/engineering/healthcare fields", "German language (B2 = faster PR)", "Major cities (Berlin, Munich, Frankfurt)"]
        },
        
        "job_seeker_visa": {
            "name": "Job Seeker Visa → EU Blue Card",
            "duration_years": "0.5-1",
            "requirements": {
                "education": ["bachelors", "masters", "phd"],
                "age_preference": ["25-34", "35-44"],
                "language": "German A1-B1 (recommended)",
                "funds_required": "€5,400-6,000 for 6 months"
            },
            "phases": [
                {
                    "name": "Job Seeker Visa Application",
                    "duration_months": 1,
                    "requirements": ["Proof of qualifications", "Blocked account €5,400", "Travel insurance"],
                    "costs": "€75"
                },
                {
                    "name": "Job Search in Germany",
                    "duration_months": "3-6",
                    "requirements": ["Network actively", "Apply to jobs", "Learn German"],
                    "allowed_stay": "6 months",
                    "work_allowed": "No (unless internship/trial work negotiated)"
                },
                {
                    "name": "Job Offer & Blue Card Conversion",
                    "duration_months": "1-2",
                    "requirements": ["Job contract", "Salary threshold met"],
                    "costs": "€100"
                },
                {
                    "name": "EU Blue Card (as above)",
                    "duration_months": "48+",
                    "see": "eu_blue_card pathway"
                }
            ],
            "timeline_total": "6-12 months to Blue Card, then 3-5 years to PR",
            "success_factors": ["Strong technical skills", "Interview preparation", "German language helps significantly"]
        },
        
        "study_route": {
            "name": "Study → Job Seeker → Blue Card → PR",
            "duration_years": "5-8",
            "requirements": {
                "education": ["high_school", "bachelors"],
                "age_preference": ["18-24", "25-34"],
                "language": "German B2-C1 (for German-taught programs) or English",
                "funds_required": "€11,208/year (blocked account)"
            },
            "phases": [
                {
                    "name": "Student Visa",
                    "duration_months": "2-4",
                    "requirements": ["University admission", "Blocked account €11,208", "Health insurance"],
                    "costs": "€75"
                },
                {
                    "name": "Study in Germany",
                    "duration_months": "24-48",
                    "requirements": ["Enrollment", "Pass exams"],
                    "tuition": "€0-3,000/year (public universities)",
                    "work_allowed": "20 hours/week during semester"
                },
                {
                    "name": "Job Seeker Permit (Post-Study)",
                    "duration_months": "12-18",
                    "requirements": ["Graduate degree", "Apply within graduation"],
                    "allowed_stay": "18 months to find job",
                    "work_allowed": "Yes (full-time)"
                },
                {
                    "name": "EU Blue Card",
                    "duration_months": "48",
                    "requirements": ["Job matching qualification", "Salary threshold"],
                    "costs": "€100"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": "21-33",
                    "requirements": ["German B1/B2", "Employment", "Pension contributions"]
                }
            ],
            "timeline_total": "6-8 years",
            "success_factors": ["Study in high-demand field (STEM)", "Learn German during studies", "Network with companies for job placement"]
        },
        
        "freelance_visa": {
            "name": "Freelance Visa (Self-Employment)",
            "duration_years": "3-5",
            "requirements": {
                "education": ["bachelors", "masters", "portfolio"],
                "age_preference": ["25-34", "35-44", "45-54"],
                "language": "German A2-B1 (helpful)",
                "profession": "Creative fields, IT, consulting",
                "clients": "Must show client contracts or strong portfolio"
            },
            "phases": [
                {
                    "name": "Freelance Visa Application",
                    "duration_months": "2-4",
                    "requirements": ["Business plan", "Client letters of intent", "Health insurance", "Proof of funds"],
                    "costs": "€100"
                },
                {
                    "name": "Self-Employment",
                    "duration_months": "36",
                    "requirements": ["Register business (Gewerbeanmeldung)", "File taxes", "Maintain income"],
                    "renewal": "Every 1-3 years based on success"
                },
                {
                    "name": "Permanent Residence",
                    "duration_months": "60",
                    "requirements": ["5 years self-employed", "German B1", "Pension contributions", "Financial stability"]
                }
            ],
            "timeline_total": "5 years to PR",
            "success_factors": ["Strong client base", "Financial stability", "German language proficiency", "Registration with professional associations"]
        }
    },
    
    "citizenship": {
        "name": "German Citizenship",
        "requirements": {
            "pr_years": 8,
            "reduced_years": "6-7 years with integration course or exceptional integration",
            "language": "German B1",
            "knowledge_test": "Citizenship test (Einbürgerungstest)",
            "renounce_citizenship": "Usually required (exceptions for EU/Swiss, or if difficult)"
        },
        "process": {
            "application_time": "9-18 months",
            "costs": "€255 (€51 for children under 16)"
        },
        "dual_citizenship_update_2024": "New law allows dual citizenship more broadly"
    },
    
    "risk_factors": [
        {
            "risk": "Salary Threshold",
            "severity": "medium",
            "mitigation": "Target high-paying sectors (tech, engineering), negotiate salary above €45,300"
        },
        {
            "risk": "German Language Barrier",
            "severity": "high",
            "mitigation": "Start learning early, aim for B2 for faster PR track"
        },
        {
            "risk": "Bureaucracy & Appointments",
            "severity": "high",
            "mitigation": "Book Ausländerbehörde appointments early, use online services, consider relocation services"
        },
        {
            "risk": "Housing Market (Major Cities)",
            "severity": "high",
            "mitigation": "Consider smaller cities, temporary housing first, start search early"
        },
        {
            "risk": "Qualification Recognition",
            "severity": "medium",
            "mitigation": "Use anabin database to check university recognition, get ZAB statement of comparability"
        }
    ],
    
    "advantages": [
        "Strong economy and job market (especially engineering/tech)",
        "Low/no tuition for university",
        "Central location in Europe (Schengen access)",
        "Excellent healthcare and social services",
        "Path to EU citizenship"
    ],
    
    "shortage_occupations": [
        "Software developers",
        "Engineers (mechanical, electrical, civil)",
        "Healthcare professionals (doctors, nurses)",
        "Data scientists / AI specialists",
        "Skilled trades (electricians, plumbers)"
    ]
}
