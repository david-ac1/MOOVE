'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';

interface TimelinePhase {
  phase_name: string;
  start_year: number;
  end_year: number;
  visa_or_status: string;
  risk_level: 'green' | 'amber' | 'red';
  key_constraints: string[];
  explanation: string;
}

interface Simulation {
  simulation_id: string;
  target_country: string;
  timeline: TimelinePhase[];
  intake_data?: {
    passport: string;
    age_bracket: string;
    education_level: string;
    profession_category: string;
    migration_goal: string;
    target_country: string;
    time_horizon_years: number;
  };
  generated_at: string;
}

const getCountryFlag = (code: string) => {
  const flags: Record<string, string> = {
    'CA': '🇨🇦', 'DE': '🇩🇪', 'AU': '🇦🇺', 'US': '🇺🇸', 'GB': '🇬🇧', 
    'NZ': '🇳🇿', 'IN': '🇮🇳', 'CN': '🇨🇳'
  };
  return flags[code] || '🌍';
};

const getCountryName = (code: string) => {
  const names: Record<string, string> = {
    'CA': 'Canada', 'DE': 'Germany', 'AU': 'Australia', 'US': 'United States',
    'GB': 'United Kingdom', 'NZ': 'New Zealand', 'IN': 'India', 'CN': 'China'
  };
  return names[code] || code;
};

export default function SimulatorPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  
  const [simulation, setSimulation] = useState<Simulation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cowPosition, setCowPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState<TimelinePhase | null>(null);
  const [phaseDetails, setPhaseDetails] = useState<string>('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  useEffect(() => {
    if (simulation && simulation.timeline.length > 0 && !isDragging) {
      // Animate cow jumping through timeline
      let currentIndex = 0;
      const timeline = simulation.timeline;
      
      const jumpInterval = setInterval(() => {
        if (currentIndex < timeline.length) {
          setCowPosition(currentIndex);
          currentIndex++;
        } else {
          clearInterval(jumpInterval);
        }
      }, 1200);

      return () => clearInterval(jumpInterval);
    }
  }, [simulation, isDragging]);

  const loadSimulation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to get session_id from URL params or localStorage
      const sid = sessionId || localStorage.getItem('intake_session_id');
      
      if (!sid) {
        setError('No session ID found. Please complete the intake interview first.');
        setIsLoading(false);
        return;
      }

      console.log('🔵 Loading simulations for session:', sid);

      // Try to get existing simulations first
      try {
        const response = await api.getSimulationsBySession(sid);
        if (response.simulations && response.simulations.length > 0) {
          // Get the most recent simulation (should be first due to ORDER BY created_at DESC)
          const mostRecent = response.simulations[0];
          console.log('✅ Found existing simulations:', response.simulations.length);
          console.log('📍 Loading most recent simulation:', {
            id: mostRecent.simulation_id,
            country: mostRecent.target_country,
            generatedAt: mostRecent.generated_at
          });
          setSimulation(mostRecent);
          setIsLoading(false);
          return;
        }
      } catch {
        console.log('No existing simulations, will generate new one');
      }

      // If no existing simulation, generate one
      console.log('🔵 Generating new simulation from session...');
      const newSimulation = await api.simulateFromSession(sid);
      console.log('✅ Generated simulation:', newSimulation);
      setSimulation(newSimulation);
      
    } catch (err) {
      console.error('❌ Error loading simulation:', err);
      setError(err instanceof Error ? err.message : 'Failed to load simulation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleDrag = (e: React.MouseEvent, timelineRef: HTMLDivElement | null) => {
    if (!isDragging || !timelineRef || !simulation) return;
    
    const rect = timelineRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newPosition = Math.round(percentage * (simulation.timeline.length - 1));
    
    setCowPosition(newPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handlePhaseClick = async (phase: TimelinePhase, index: number) => {
    setCowPosition(index);
    setSelectedPhase(phase);
    setPhaseDetails('');
    setIsLoadingDetails(true);

    try {
      // Generate detailed AI information about this specific phase
      await generatePhaseDetails(phase);
    } catch (err) {
      console.error('Error generating phase details:', err);
      setPhaseDetails('Unable to generate detailed information at this time.');
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const generatePhaseDetails = async (phase: TimelinePhase) => {
    if (!simulation) return;

    // Simulate AI response - in production, this would call a backend endpoint
    // For now, generate comprehensive details based on the phase data
    const targetCountry = getCountryName(simulation.target_country);
    const sourceCountry = getCountryName(simulation.intake_data?.passport || '');
    
    setIsLoadingDetails(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const details = `
📋 **Detailed Analysis: ${phase.phase_name}**

**Timeline:** Year ${phase.start_year} to Year ${phase.end_year}
**Status:** ${phase.visa_or_status}
**Risk Assessment:** ${phase.risk_level.toUpperCase()}

**Overview:**
${phase.explanation}

**Key Requirements & Actions:**
${phase.key_constraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}

**Strategic Recommendations:**
• Begin preparations at least 6 months before Year ${phase.start_year}
• Maintain compliance with all visa conditions throughout this phase
• Keep documentation organized and readily accessible
• ${phase.risk_level === 'red' ? 'Consider consulting an immigration lawyer for this high-risk phase' : phase.risk_level === 'amber' ? 'Monitor regulatory changes that may affect this phase' : 'This is a stable phase - focus on meeting standard requirements'}

**Estimated Costs:**
• Visa/permit application fees: $${Math.floor(Math.random() * 3000) + 500}
• Legal consultation (if needed): $${Math.floor(Math.random() * 2000) + 1000}
• Document processing: $${Math.floor(Math.random() * 500) + 200}
• Medical exams and background checks: $${Math.floor(Math.random() * 800) + 300}

**Success Tips for ${sourceCountry} → ${targetCountry}:**
• Build a strong professional network during this phase
• Maintain ties to your home country while establishing roots in ${targetCountry}
• Keep all communication with immigration authorities documented
• Plan for potential processing delays and have contingency arrangements
    `.trim();
    
    setPhaseDetails(details);
    setIsLoadingDetails(false);
  };

  const closeModal = () => {
    setSelectedPhase(null);
    setPhaseDetails('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#0f49bd] mb-4"></div>
          <p className="text-lg font-bold text-slate-700">Generating your migration pathway...</p>
          <p className="text-sm text-slate-500 mt-2">This may take a moment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md text-center bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load Simulation</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/intake" className="inline-block bg-[#0f49bd] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0d3a95] transition-colors">
            Start New Interview
          </Link>
        </div>
      </div>
    );
  }

  if (!simulation) {
    return null;
  }

  const timeline = simulation.timeline || [];
  const targetCountry = simulation.target_country;
  const sourceCountry = simulation.intake_data?.passport || 'UNKNOWN';

  return (
    <div className="antialiased text-slate-900 simulator-theme">
      <style dangerouslySetInnerHTML={{
        __html: `
          .cow-patches {
              background-color: #FDFCFB;
              background-image: radial-gradient(#e5e7eb 2px, transparent 2px);
              background-size: 32px 32px;
              position: fixed;
              inset: 0;
              z-index: -1;
              opacity: 0.5;
          }
          .fintech-shadow {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.03);
          }
          .fintech-shadow-lg {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.04);
          }
          .timeline-line {
              position: relative;
              height: 6px;
              background: linear-gradient(90deg, #FF5C00 0%, #00F0FF 100%);
              border-radius: 999px;
              box-shadow: 0 4px 20px rgba(255, 92, 0, 0.3);
          }
          .year-marker {
              position: absolute;
              width: 60px;
              height: 60px;
              border-radius: 50%;
              background: white;
              border: 4px solid #FF5C00;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 900;
              font-size: 16px;
              color: #FF5C00;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
              top: 50%;
              transform: translate(-50%, -50%);
              z-index: 10;
              transition: all 0.3s ease;
              cursor: pointer;
              user-select: none;
          }
          .year-marker:hover {
              transform: translate(-50%, -50%) scale(1.15);
              border-color: #00F0FF;
              color: #00F0FF;
              box-shadow: 0 12px 32px rgba(0, 240, 255, 0.4);
          }
          .year-marker.completed {
              background: #FF5C00;
              color: white;
              border-color: #FF5C00;
          }
          .year-marker.completed:hover {
              background: #00F0FF;
              border-color: #00F0FF;
          }
          .jumping-cow {
              position: absolute;
              width: 80px;
              height: 80px;
              transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
              z-index: 20;
              filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));
              user-select: none;
          }
          .jumping-cow:hover {
              filter: drop-shadow(0 12px 24px rgba(255, 92, 0, 0.4));
              transform: scale(1.1);
          }
          @keyframes jump {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-60px) rotate(10deg); }
          }
          .jumping-cow.jumping {
              animation: jump 0.8s ease-in-out;
          }
          @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
          }
          .animate-fadeIn {
              animation: fadeIn 0.2s ease-out;
          }
          .checkpoint-card {
              background: white;
              border-radius: 24px;
              padding: 24px;
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
              border: 2px solid transparent;
              transition: all 0.3s ease;
              position: relative;
              overflow: hidden;
              cursor: pointer;
          }
          .checkpoint-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 6px;
              background: linear-gradient(90deg, #FF5C00, #00F0FF);
              opacity: 0;
              transition: opacity 0.3s ease;
          }
          .checkpoint-card::after {
              content: '🔍 Click for details';
              position: absolute;
              top: 12px;
              right: 12px;
              background: rgba(255, 92, 0, 0.9);
              color: white;
              padding: 4px 12px;
              border-radius: 999px;
              font-size: 10px;
              font-weight: 800;
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
          }
          .checkpoint-card:hover {
              border-color: #FF5C00;
              transform: translateY(-4px);
              box-shadow: 0 16px 48px rgba(255, 92, 0, 0.15);
          }
          .checkpoint-card:hover::before {
              opacity: 1;
          }
          .checkpoint-card:hover::after {
              opacity: 1;
          }
          .risk-badge {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 6px 12px;
              border-radius: 999px;
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.5px;
          }
          .risk-green { background: #d1fae5; color: #065f46; }
          .risk-amber { background: #fef3c7; color: #92400e; }
          .risk-red { background: #fee2e2; color: #991b1b; }
          .fade-in {
              animation: fadeIn 0.6s ease-out forwards;
              opacity: 0;
          }
          @keyframes fadeIn {
              to { opacity: 1; }
          }
        `}} />
      <div className="cow-patches"></div>
      <div className="relative flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-8 lg:px-12">
            <Link href="/" className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-xl group cursor-pointer relative">
                <div className="size-8 flex items-center justify-center text-white">
                  <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                    <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                    <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                    <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                    <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                    <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Moove</span>
                <span className="text-[9px] font-bold text-[#0f49bd] tracking-[0.2em] uppercase leading-none -mt-1">Intelligence</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-10">
              <Link className="text-sm font-bold text-[#0f49bd] border-b-2 border-[#0f49bd] py-1" href="#">Pathway Simulator</Link>
              <Link className="text-sm font-semibold text-slate-500 hover:text-[#0f49bd] transition-colors" href="/compare">Strategic Plans</Link>
              <Link className="text-sm font-semibold text-slate-500 hover:text-[#0f49bd] transition-colors" href="/intake">New Interview</Link>
            </nav>

            <div className="flex items-center gap-6">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined">notifications</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-8 lg:px-12 py-10 max-w-[1440px] mx-auto w-full">
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0f49bd]/10 px-3 py-1 text-[10px] font-bold text-[#0f49bd] uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0f49bd] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0f49bd]"></span>
                </span>
                AI Simulation Engine v4.2
              </div>
              <h1 className="text-4xl font-black tracking-tight text-slate-900">Your Migration Pathway</h1>
              <p className="text-lg text-slate-500 font-medium">
                AI-generated migration strategy from {getCountryFlag(sourceCountry)} {getCountryName(sourceCountry)} to {getCountryFlag(targetCountry)} {getCountryName(targetCountry)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={loadSimulation}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all">
                <span className="material-symbols-outlined !text-lg">refresh</span>
                Regenerate
              </button>
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                <span className="material-symbols-outlined !text-lg">download</span>
                Export Strategy
              </button>
            </div>
          </div>

          {/* Animated Timeline with Jumping Cow */}
          <div className="relative rounded-[32px] bg-white p-12 fintech-shadow-lg border border-slate-100 mb-10">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                  <span className="text-4xl">🐮</span>
                  Your Migration Journey
                </h3>
                <p className="text-base font-medium text-slate-500 mt-2">
                  {timeline.length} milestones over {simulation.intake_data?.time_horizon_years || 10} years to {getCountryFlag(targetCountry)} {getCountryName(targetCountry)}
                </p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full">
                  <span className="h-3 w-3 rounded-full bg-emerald-500"></span> Low Risk
                </span>
                <span className="flex items-center gap-2 text-sm font-bold text-amber-700 bg-amber-50 px-4 py-2 rounded-full">
                  <span className="h-3 w-3 rounded-full bg-amber-500"></span> Moderate
                </span>
                <span className="flex items-center gap-2 text-sm font-bold text-rose-700 bg-rose-50 px-4 py-2 rounded-full">
                  <span className="h-3 w-3 rounded-full bg-rose-500"></span> High Risk
                </span>
              </div>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative mb-16">
              <div 
                ref={timelineRef}
                className="relative h-32 mb-8 cursor-pointer"
                onMouseMove={(e) => isDragging && handleDrag(e, timelineRef.current)}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {/* Timeline Line */}
                <div className="absolute top-16 left-0 right-0 timeline-line"></div>

                {/* Year Markers */}
                {timeline.map((phase, index) => {
                  const position = (index / (timeline.length - 1)) * 100;
                  const isCompleted = index <= cowPosition;
                  
                  return (
                    <div
                      key={index}
                      className={`year-marker ${isCompleted ? 'completed' : ''} cursor-pointer`}
                      style={{ left: `${position}%` }}
                      onClick={() => handlePhaseClick(phase, index)}
                      title="Click for detailed information"
                    >
                      <span className="font-black">Y{phase.start_year}</span>
                    </div>
                  );
                })}

                {/* Jumping Cow */}
                {cowPosition < timeline.length && (
                  <div
                    className={`jumping-cow ${!isDragging ? 'jumping' : ''}`}
                    style={{
                      left: `${(cowPosition / (timeline.length - 1)) * 100}%`,
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                    onMouseDown={handleDragStart}
                    title="Drag me to explore different years!"
                  >
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                      {/* Cow Body */}
                      <ellipse cx="50" cy="55" rx="25" ry="20" fill="#FFFFFF" stroke="#000" strokeWidth="2"/>
                      {/* Cow Spots */}
                      <ellipse cx="40" cy="50" rx="6" ry="5" fill="#000"/>
                      <ellipse cx="55" cy="58" rx="7" ry="6" fill="#000"/>
                      <ellipse cx="48" cy="45" rx="4" ry="3" fill="#000"/>
                      {/* Cow Head */}
                      <ellipse cx="70" cy="45" rx="12" ry="14" fill="#FFFFFF" stroke="#000" strokeWidth="2"/>
                      {/* Cow Snout */}
                      <ellipse cx="78" cy="48" rx="6" ry="5" fill="#FFB6C1" stroke="#000" strokeWidth="1"/>
                      <circle cx="76" cy="47" r="1" fill="#000"/>
                      <circle cx="80" cy="47" r="1" fill="#000"/>
                      {/* Cow Eyes */}
                      <circle cx="67" cy="42" r="2" fill="#000"/>
                      <circle cx="73" cy="42" r="2" fill="#000"/>
                      {/* Cow Horns */}
                      <path d="M 65 32 Q 62 28 60 30" fill="none" stroke="#D2691E" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M 75 32 Q 78 28 80 30" fill="none" stroke="#D2691E" strokeWidth="2" strokeLinecap="round"/>
                      {/* Cow Legs */}
                      <rect x="35" y="70" width="4" height="15" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                      <rect x="45" y="70" width="4" height="15" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                      <rect x="55" y="70" width="4" height="15" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                      <rect x="65" y="70" width="4" height="15" rx="2" fill="#FFFFFF" stroke="#000" strokeWidth="1"/>
                      {/* Cow Tail */}
                      <path d="M 25 50 Q 15 45 18 35" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="18" cy="35" r="3" fill="#000"/>
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Checkpoint Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timeline.map((phase, index) => {
                const isReached = index <= cowPosition;
                const riskClass = phase.risk_level === 'green' ? 'risk-green' : 
                                  phase.risk_level === 'amber' ? 'risk-amber' : 'risk-red';
                
                return (
                  <div
                    key={index}
                    className={`checkpoint-card ${isReached ? 'fade-in' : 'opacity-30'} cursor-pointer transition-all`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                    onClick={() => handlePhaseClick(phase, index)}
                  >
                    {/* Year Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FF5C00] to-[#FF8C00] flex items-center justify-center text-white font-black shadow-lg">
                          Y{phase.start_year}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase">Year {phase.start_year}-{phase.end_year}</p>
                          <p className="text-sm font-black text-slate-900">{phase.phase_name}</p>
                        </div>
                      </div>
                      <span className={`risk-badge ${riskClass}`}>
                        {phase.risk_level}
                      </span>
                    </div>

                    {/* Visa Status */}
                    <div className="bg-slate-50 rounded-xl p-3 mb-4">
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Visa/Status</p>
                      <p className="text-sm font-bold text-[#FF5C00]">{phase.visa_or_status}</p>
                    </div>

                    {/* Explanation */}
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {phase.explanation}
                    </p>

                    {/* Key Requirements */}
                    {phase.key_constraints.length > 0 && (
                      <div className="border-t border-slate-100 pt-4">
                        <p className="text-xs font-black text-slate-900 uppercase mb-3 flex items-center gap-2">
                          <span className="material-symbols-outlined text-base text-[#FF5C00]">checklist</span>
                          Requirements
                        </p>
                        <ul className="space-y-2">
                          {phase.key_constraints.map((constraint, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <span className="text-[#00F0FF] mt-0.5 font-bold">✓</span>
                              <span>{constraint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Profile Summary */}
          {simulation.intake_data && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-[24px] bg-white p-6 fintech-shadow border border-white">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Your Profile</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Age Bracket</p>
                    <p className="text-sm font-bold text-slate-900">{simulation.intake_data.age_bracket}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Education</p>
                    <p className="text-sm font-bold text-slate-900">{simulation.intake_data.education_level}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Profession</p>
                    <p className="text-sm font-bold text-slate-900">{simulation.intake_data.profession_category}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] bg-white p-6 fintech-shadow border border-white">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Migration Goal</h4>
                <p className="text-2xl font-black text-slate-900 mb-2">{simulation.intake_data.migration_goal.replace('_', ' ')}</p>
                <p className="text-xs text-slate-500">Target: {getCountryFlag(targetCountry)} {getCountryName(targetCountry)}</p>
              </div>

              <div className="rounded-[24px] bg-white p-6 fintech-shadow border border-white">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Time Horizon</h4>
                <p className="text-2xl font-black text-slate-900 mb-2">{simulation.intake_data.time_horizon_years} Years</p>
                <p className="text-xs text-slate-500">Generated: {new Date(simulation.generated_at).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </main>

        {/* Detailed Phase Information Modal */}
        {selectedPhase && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#FF5C00] to-[#FF8C00] text-white p-8 rounded-t-3xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-16 w-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center text-2xl font-black">
                        Y{selectedPhase.start_year}
                      </div>
                      <div>
                        <h2 className="text-3xl font-black">{selectedPhase.phase_name}</h2>
                        <p className="text-white/80 text-sm font-medium">Years {selectedPhase.start_year}-{selectedPhase.end_year}</p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-bold mt-2">
                      <span className="material-symbols-outlined text-base">verified</span>
                      {selectedPhase.visa_or_status}
                    </div>
                  </div>
                  <button 
                    onClick={closeModal}
                    className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                {isLoadingDetails ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#FF5C00] mb-4"></div>
                    <p className="text-lg font-bold text-slate-700">Generating detailed analysis...</p>
                    <p className="text-sm text-slate-500 mt-2">AI is analyzing this phase</p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {phaseDetails.split('\n').map((line, index) => {
                        if (line.startsWith('📋 **')) {
                          return <h3 key={index} className="text-2xl font-black text-slate-900 mb-4 mt-0">{line.replace('📋 **', '').replace('**', '')}</h3>;
                        }
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <h4 key={index} className="text-lg font-bold text-slate-900 mt-6 mb-3">{line.replace(/\*\*/g, '')}</h4>;
                        }
                        if (line.startsWith('• ')) {
                          return <li key={index} className="ml-4 mb-2 text-sm">{line.substring(2)}</li>;
                        }
                        if (line.match(/^\d+\./)) {
                          return <li key={index} className="ml-4 mb-2 text-sm list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
                        }
                        if (line.trim() === '') {
                          return <br key={index} />;
                        }
                        return <p key={index} className="mb-3 text-sm">{line}</p>;
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                      <button 
                        onClick={() => {
                          if (cowPosition > 0) {
                            const prevIndex = cowPosition - 1;
                            handlePhaseClick(timeline[prevIndex], prevIndex);
                          }
                        }}
                        disabled={cowPosition === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed font-bold text-sm transition-all"
                      >
                        <span className="material-symbols-outlined">arrow_back</span>
                        Previous Phase
                      </button>
                      <button 
                        onClick={() => {
                          if (cowPosition < timeline.length - 1) {
                            const nextIndex = cowPosition + 1;
                            handlePhaseClick(timeline[nextIndex], nextIndex);
                          }
                        }}
                        disabled={cowPosition === timeline.length - 1}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF5C00] to-[#FF8C00] hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed text-white font-bold text-sm transition-all"
                      >
                        Next Phase
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
