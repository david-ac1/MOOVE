'use client';

import { useState, useEffect } from 'react';
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

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'green': return { bg: 'bg-emerald-500', glow: 'glow-green', border: 'border-emerald-200', text: 'text-emerald-600', label: 'SECURE' };
    case 'amber': return { bg: 'bg-amber-500', glow: 'glow-amber', border: 'border-amber-200', text: 'text-amber-600', label: 'SENSITIVE' };
    case 'red': return { bg: 'bg-rose-500', glow: 'glow-rose', border: 'border-rose-200', text: 'text-rose-600', label: 'CRITICAL' };
    default: return { bg: 'bg-slate-500', glow: '', border: 'border-slate-200', text: 'text-slate-600', label: 'UNKNOWN' };
  }
};

const getRiskIcon = (index: number, total: number) => {
  if (index === total - 1) return 'flag';
  if (index === 0) return 'work';
  if (index / total < 0.5) return 'history_edu';
  return 'verified_user';
};

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

  useEffect(() => {
    loadSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

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
          console.log('✅ Found existing simulation:', response.simulations[0]);
          setSimulation(response.simulations[0]);
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
              background-color: #f8fafc;
              background-image: radial-gradient(#e2e8f0 20%, transparent 20%),
                                radial-gradient(#e2e8f0 20%, transparent 20%);
              background-position: 0 0, 50px 50px;
              background-size: 100px 100px;
              position: fixed;
              inset: 0;
              z-index: -1;
              opacity: 0.4;
          }
          .fintech-shadow {
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.03);
          }
          .fintech-shadow-lg {
              box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02), 0 0 0 1px rgba(0, 0, 0, 0.04);
          }
          .timeline-track {
              background: linear-gradient(90deg, #1e293b 0%, #0f172a 100%);
          }
          .glow-green { box-shadow: 0 0 15px rgba(16, 185, 129, 0.5); }
          .glow-amber { box-shadow: 0 0 15px rgba(245, 158, 11, 0.5); }
          .glow-rose { box-shadow: 0 0 15px rgba(239, 68, 68, 0.5); }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
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

          {/* Timeline */}
          <div className="relative overflow-hidden rounded-[32px] bg-white p-10 fintech-shadow-lg border border-white mb-10">
            <div className="flex items-center justify-between mb-16">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                  <div className="h-8 w-1.5 rounded-full bg-[#0f49bd]"></div>
                  Migration Timeline
                </h3>
                <p className="text-sm font-medium text-slate-400 mt-1">{timeline.length} phases over {simulation.intake_data?.time_horizon_years || 10} years</p>
              </div>
              <div className="flex gap-6">
                <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 glow-green"></span> Secure
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500 glow-amber"></span> Sensitive
                </span>
                <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500 glow-rose"></span> Critical
                </span>
              </div>
            </div>

            <div className="relative py-20 overflow-x-auto no-scrollbar">
              <div className="absolute top-1/2 left-0 h-4 w-full -translate-y-1/2 timeline-track rounded-full shadow-inner border-y border-white/10"></div>

              <div className="relative flex justify-between min-w-[900px] px-8" style={{ minWidth: `${timeline.length * 250}px` }}>
                {timeline.map((phase, index) => {
                  const colors = getRiskColor(phase.risk_level);
                  const icon = getRiskIcon(index, timeline.length);
                  const isLastPhase = index === timeline.length - 1;
                  
                  return (
                    <div key={index} className="group relative flex flex-col items-center">
                      <div className="absolute -top-16 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">
                        {isLastPhase ? 'Goal' : `Stage ${index + 1}`}: Years {phase.start_year}-{phase.end_year}
                      </div>
                      <div className={`z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${colors.bg} text-white shadow-2xl ${colors.glow} transition-all group-hover:scale-110 group-hover:-rotate-6 cursor-pointer ring-4 ring-white`}>
                        <span className="material-symbols-outlined !text-2xl">{icon}</span>
                      </div>
                      <div className={`mt-8 w-56 text-center bg-[#fcfcfd] p-6 rounded-3xl border border-slate-100 fintech-shadow group-hover:${colors.border} transition-colors`}>
                        <div className={`inline-flex mb-3 items-center rounded-lg ${colors.bg} px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider`}>
                          {colors.label}
                        </div>
                        <p className="text-base font-extrabold text-slate-900 leading-tight mb-2">{phase.phase_name}</p>
                        <p className="text-xs font-medium text-slate-600 leading-relaxed mb-3">{phase.visa_or_status}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{phase.explanation}</p>
                        
                        {phase.key_constraints.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Key Requirements:</p>
                            <ul className="text-[11px] text-slate-600 space-y-1 text-left">
                              {phase.key_constraints.slice(0, 3).map((constraint, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-[#0f49bd] mt-0.5">•</span>
                                  <span>{constraint}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
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
      </div>
    </div>
  );
}
