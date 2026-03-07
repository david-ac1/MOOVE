// Frontend API Client for Moove Backend
// Connects Next.js frontend to FastAPI backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
console.log('🔧 API Client initialized with base URL:', API_BASE_URL);

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

export interface PathwayComparison {
  country_code: string;
  country_name: string;
  pathway_name: string;
  success_rate: number;
  risk_level: 'low' | 'moderate' | 'high';
  processing_time: string;
  key_advantages: string[];
  key_challenges: string[];
  estimated_cost_usd: number;
  is_recommended: boolean;
  fit_score: number;
}

export interface ComparisonResponse {
  session_id: string;
  intake_data: {
    passport: string;
    age_bracket: string;
    education_level: string;
    profession_category: string;
    migration_goal: string;
    target_country: string;
    time_horizon_years: number;
  };
  comparisons: PathwayComparison[];
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
    getSession: async (sessionId: string): Promise<{
      session_id: string;
      created_at: string;
      simulation_ready: boolean;
      messages: Array<{ role: string; content: string; timestamp: string }>;
    }> => {
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
   * Generate simulation from an intake session
   */
  simulateFromSession: async (sessionId: string): Promise<SimulationResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/simulate/from-session/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Failed to generate simulation');
    }
    return res.json();
  },

  /**
   * Get all simulations for a session
   */
  getSimulationsBySession: async (sessionId: string): Promise<{ simulations: SimulationResponse[] }> => {
    const res = await fetch(`${API_BASE_URL}/api/simulations/session/${sessionId}`);
    if (!res.ok) throw new Error('Failed to get simulations');
    return res.json();
  },

  /**
   * Get a specific simulation by ID
   */
  getSimulation: async (simulationId: string): Promise<SimulationResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/simulation/${simulationId}`);
    if (!res.ok) throw new Error('Failed to get simulation');
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

  /**
   * Get personalized pathway comparisons from session
   */
  comparePathwaysFromSession: async (sessionId: string): Promise<ComparisonResponse> => {
    const res = await fetch(`${API_BASE_URL}/api/compare/from-session/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Unknown error' }));
      throw new Error(error.detail || 'Failed to generate comparisons');
    }
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
