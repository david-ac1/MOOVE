// Frontend API Client for Moove Backend
// Connects Next.js frontend to FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Type definitions
export interface IntakeSession {
  session_id: string;
  message: string;
}

export interface AgentResponse {
  response: string;
  simulation_ready: boolean;
  session_id: string;
}

export interface TimelinePhase {
  phase_name: string;
  start_year: number;
  end_year: number;
  visa_or_status: string;
  risk_level: 'green' | 'amber' | 'red';
  key_constraints: string[];
  explanation: string;
}

export interface SimulationResponse {
  simulation_id: string;
  target_country: string;
  timeline: TimelinePhase[];
  generated_at: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

// API client
export const api = {
  /**
   * Health check endpoint
   */
  health: async (): Promise<{ service: string; status: string; version: string }> => {
    const res = await fetch(`${API_BASE_URL}/`);
    if (!res.ok) throw new Error('API health check failed');
    return res.json();
  },

  /**
   * Intake agent endpoints
   */
  intake: {
    /**
     * Start a new intake conversation session
     */
    start: async (): Promise<IntakeSession> => {
      const res = await fetch(`${API_BASE_URL}/api/intake/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (!res.ok) throw new Error('Failed to start intake session');
      return res.json();
    },

    /**
     * Send a message to the AI agent
     */
    sendMessage: async (sessionId: string, message: string): Promise<AgentResponse> => {
      const res = await fetch(`${API_BASE_URL}/api/intake/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message }),
      });
      if (!res.ok) throw new Error('Failed to send message');
      return res.json();
    },

    /**
     * Get session history
     */
    getSession: async (sessionId: string): Promise<any> => {
      const res = await fetch(`${API_BASE_URL}/api/intake/session/${sessionId}`);
      if (!res.ok) throw new Error('Failed to get session');
      return res.json();
    },
  },

  /**
   * Simulation endpoints
   */
  simulate: async (intakeData: {
    passport: string;
    age_bracket: string;
    education_level: string;
    profession_category: string;
    migration_goal: string;
    target_country: string;
    time_horizon_years: number;
  }): Promise<SimulationResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/simulate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ intake_data: intakeData }),
    });
    if (!res.ok) throw new Error('Failed to generate simulation');
    return res.json();
  },

  /**
   * Get list of supported countries
   */
  getCountries: async (): Promise<{ countries: Country[] }> => {
    const res = await fetch(`${API_BASE_URL}/api/countries`);
    if (!res.ok) throw new Error('Failed to get countries');
    return res.json();
  },
};

// Helper function to check if backend is available
export const checkBackendHealth = async (): Promise<boolean> => {
  try {
    await api.health();
    return true;
  } catch {
    return false;
  }
};
