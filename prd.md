Project: Moove
1. Product Overview

Moove is an AI-powered migration pathway simulator that helps users visualize and compare long-term migration journeys (5–15 years) for purposes such as work, study, permanent residency, or citizenship.

Moove focuses on simulation and education, not advice or guarantees.

Moove IS:

Educational

Exploratory

Comparative

Timeline-based

Moove IS NOT:

Legal advice

A decision engine

A document-processing platform

A migration consultancy replacement

2. Primary User Goal

“I want to understand what my migration journey could look like over time, what risks exist, and how alternative countries or pathways compare — before committing.”

3. Core User Flow (MVP)

User lands on Moove

User starts a simulation

AI agent conducts a structured intake

System normalizes inputs

Simulation engine generates a multi-year migration timeline

User explores alternative pathways

Timeline updates dynamically

Constraints

No user accounts

No data persistence

No login wall

4. MVP Feature Scope (Strict)
INCLUDED ✅

Agent-led structured intake

Timeline simulation (5–10 years minimum)

Risk indicators per phase

Inline alternative pathway comparison

One primary country + 1–2 alternatives

EXCLUDED ❌

User authentication

Document uploads

Case-specific legal advice

Broad multi-country coverage

Personalized recommendations

5. Intake Schema (Explicit)

The agent MUST collect the following structured inputs:

Field	Type	Notes
passport	enum	Single or multiple passports
age_bracket	enum	e.g. 18–24, 25–34, 35–44
education_level	enum	High school, Bachelor’s, Master’s, PhD
profession_category	enum	Normalized skill categories
migration_goal	enum	Study, Work, PR, Citizenship
target_country	enum	Selected primary destination
time_horizon_years	number	5, 10, or 15

No free-text essays.
All inputs must be normalized before simulation.

6. Agent Design
Role

The agent acts as a structured interviewer and explainer.

It does not act as:

An advisor

A recommender

A decision-maker

Responsibilities

Ask intake questions in conversational form

Ensure all required fields are collected

Trigger simulation engine

Explain why a timeline looks the way it does

Prohibited Language

The agent MUST NOT use:

“You should…”

“I recommend…”

“This guarantees…”

“Your best option is…”

Tone must remain neutral and informational.

7. Simulation Engine (Core Logic)
Inputs

Normalized intake schema

Selected pathway type

Time horizon

Outputs

Ordered list of timeline phases

Duration per phase

Risk level per phase

Constraint explanations

Logic Characteristics

Deterministic rules where possible

AI used for synthesis and explanation only

No probabilistic promises

8. Timeline Phase Object (Formal Output Model)

Each timeline is composed of Timeline Phase Objects:

Field	Type
phase_name	string
start_year	number
end_year	number
visa_or_status	string
risk_level	enum (green, amber, red)
key_constraints	array of strings
explanation	string

This object is the API contract between backend and frontend.

9. Risk Model
Risk Level	Meaning
Green	Stable, rule-based
Amber	Conditional, quota or policy dependent
Red	High uncertainty or external dependency

Risk levels are informational only.

10. Data Sources (MVP)
Required

Static visa framework definitions (hardcoded or config-based)

Optional

Read-only summaries of recent migration policy changes

Used for annotations, not decisions

No real-time eligibility determination.

11. Failure States & Edge Cases

The system MUST handle the following explicitly:

Unsupported country
→ Display: “This destination is not yet supported.”

No viable simulated pathway
→ Display explanation of constraints causing failure.

Incomplete intake data
→ Agent requests missing fields before simulation.

No silent failures.

12. Technical Architecture (High-Level)
Frontend

React / Next.js

Conversational intake UI

Interactive timeline visualization

Inline alternative pathway selector

Backend

Stateless API service

Endpoints for:

Intake normalization

Pathway simulation

AI Layer

One primary agent

Optional helper agent for policy summarization

13. Non-Goals (Explicit)

Not a migration platform

Not a document workflow

Not an optimization engine

Not a mobile-first product

Not guaranteeing outcomes

14. Demo Success Criteria (Hackathon)

A judge should be able to:

Understand the product in under 10 seconds

Complete an intake in under 1 minute

View a full 10-year timeline

Switch pathways and see live updates

Believe the system could ship

15. Post-Hackathon (Out of Scope)

Saved profiles

Country packs

Employer sponsorship flows

Regional comparisons

Account systems