'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api, type PathwayComparison } from '@/lib/api';

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Low Risk' };
    case 'moderate': return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Moderate' };
    case 'high': return { bg: 'bg-rose-100', text: 'text-rose-700', label: 'High Risk' };
    default: return { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Unknown' };
  }
};

export default function ComparePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams?.get('session_id');
  
  const [comparisons, setComparisons] = useState<PathwayComparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [generatingFor, setGeneratingFor] = useState<string | null>(null);

  useEffect(() => {
    loadComparisons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);

  const loadComparisons = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const sid = sessionId || localStorage.getItem('intake_session_id');
      
      if (!sid) {
        setError('No session found. Please complete the intake interview first.');
        setIsLoading(false);
        return;
      }

      console.log('🔵 Loading comparisons for session:', sid);
      const response = await api.comparePathwaysFromSession(sid);
      console.log('✅ Got comparisons:', response);
      
      setComparisons(response.comparisons);
      
    } catch (err) {
      console.error('❌ Error loading comparisons:', err);
      setError(err instanceof Error ? err.message : 'Failed to load comparisons');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePathway = async (countryCode: string) => {
    const sid = sessionId || localStorage.getItem('intake_session_id');
    if (!sid) return;

    setGeneratingFor(countryCode);

    try {
      console.log(`🔵 Generating simulation for ${countryCode} with session ${sid}...`);
      
      // Generate simulation for this specific country (overriding the original target)
      const simulation = await api.simulateFromSession(sid, countryCode);
      
      console.log(`✅ Simulation generated for ${countryCode}:`, simulation);
      console.log(`📍 Target country in simulation: ${simulation.target_country}`);
      
      // Add a small delay to ensure the database transaction is committed
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to simulator to view the new simulation with a cache-busting parameter
      window.location.href = `/simulator?session_id=${sid}&refresh=${Date.now()}`;
    } catch (err) {
      console.error('Error generating simulation:', err);
      alert(`Failed to generate simulation: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setGeneratingFor(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-[#FF5C00] mb-4"></div>
          <p className="text-lg font-bold text-slate-700">Analyzing migration pathways...</p>
          <p className="text-sm text-slate-500 mt-2">Comparing countries and requirements</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
        <div className="max-w-md text-center bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Unable to Load Comparisons</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link href="/intake" className="inline-block bg-[#FF5C00] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#e54f00] transition-colors">
            Start New Interview
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-sans bg-[#FDFCFB] text-slate-900 overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .compare-page-bg {
              background-image: 
                  radial-gradient(circle at 10% 20%, rgba(255, 92, 0, 0.03) 0%, transparent 20%),
                  radial-gradient(circle at 90% 80%, rgba(0, 240, 255, 0.03) 0%, transparent 20%);
          }
          .cow-patch-bg {
              background-color: #f8f9fa;
              background-image: radial-gradient(#dee2e6 2px, transparent 2px);
              background-size: 32px 32px;
              position: relative;
          }
          .glass-card {
              backdrop-filter: blur(12px);
              background-color: rgba(255, 255, 255, 0.8);
              border: 1px solid white;
              transition: all 300ms;
          }
          .comparison-card {
              position: relative;
              overflow: hidden;
              transition: all 300ms;
          }
          .comparison-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          }
          .comparison-card.active {
              box-shadow: 0 0 0 4px #FF5C00, 0 25px 50px -12px rgba(0, 0, 0, 0.25);
              transform: scale(1.02);
              z-index: 10;
          }
        `}} />
      <div className="absolute inset-0 cow-patch-bg compare-page-bg -z-10 pointer-events-none"></div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5 sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="size-10 flex items-center justify-center bg-black rounded-xl rotate-3 relative overflow-hidden text-white">
              <svg className="w-8 h-8 p-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
              </svg>
            </div>
            <h2 className="text-black text-2xl font-black tracking-tight">Moove</h2>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link className="text-slate-500 hover:text-black font-bold text-sm transition-colors" href="/simulator">Simulate</Link>
            <Link className="text-black font-bold text-sm border-b-2 border-[#FF5C00] pb-1" href="/compare">Pathways</Link>
            <Link className="text-slate-500 hover:text-black font-bold text-sm transition-colors" href="/intake">Interview</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={loadComparisons}
            className="bg-slate-100 p-2.5 rounded-xl hover:bg-slate-200 transition-colors"
            title="Refresh comparisons">
            <span className="material-symbols-outlined text-[22px]">refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-12 lg:px-24 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FF5C00]/10 text-[#FF5C00] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]"></span>
              </span>
              Personalized Analysis
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tight mb-4">
              Your Migration <br /><span className="text-[#FF5C00] italic">Options.</span>
            </h1>
            <p className="text-slate-600 text-lg font-medium max-w-lg leading-relaxed">
              AI-powered pathway comparisons based on your profile. These options are tailored specifically to you.
            </p>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {comparisons.map((comparison, index) => {
            const risk = getRiskColor(comparison.risk_level);
            const isRecommended = comparison.is_recommended;
            
            return (
              <div 
                key={index}
                className={`comparison-card ${isRecommended ? 'active bg-black text-white' : 'glass-card hover:bg-white'} rounded-3xl p-8 flex flex-col border-2 ${isRecommended ? '' : 'border-transparent hover:border-black/5'}`}
              >
                {isRecommended && (
                  <div className="absolute top-0 right-0 p-4">
                    <span className="bg-[#FF5C00] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/20">
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-16 h-12 rounded-xl ${isRecommended ? 'bg-slate-800 border-white/20' : 'bg-slate-200 border-black'} overflow-hidden border-2 shadow-lg flex items-center justify-center ${isRecommended ? 'text-white/50' : 'text-slate-400'}`}>
                    <span className="material-symbols-outlined">flag</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isRecommended ? 'text-slate-500' : 'text-slate-400'} mb-1`}>
                      Success Rate
                    </span>
                    <span className={`text-2xl font-black ${isRecommended ? 'text-white' : 'text-black'}`}>
                      {comparison.success_rate}%
                    </span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className={`text-3xl font-black ${isRecommended ? 'text-white' : 'text-black'} mb-1`}>
                    {comparison.country_name}
                  </h3>
                  <p className={`${isRecommended ? 'text-[#00F0FF]' : 'text-[#FF5C00]'} font-bold text-sm tracking-tight uppercase`}>
                    {comparison.pathway_name}
                  </p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className={`flex items-center justify-between p-4 ${isRecommended ? 'bg-white/10' : 'bg-slate-50'} rounded-2xl border ${isRecommended ? 'border-white/5' : 'border-slate-100'}`}>
                    <span className={`text-xs font-bold ${isRecommended ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>
                      Risk Level
                    </span>
                    <span className={`px-3 py-1 ${risk.bg} ${risk.text} rounded-full text-[10px] font-black uppercase`}>
                      {risk.label}
                    </span>
                  </div>
                  
                  <div className={`flex items-center justify-between p-4 ${isRecommended ? 'bg-white/10' : 'bg-slate-50'} rounded-2xl border ${isRecommended ? 'border-white/5' : 'border-slate-100'}`}>
                    <span className={`text-xs font-bold ${isRecommended ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>
                      Processing
                    </span>
                    <span className={`px-3 py-1 ${isRecommended ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : 'bg-blue-100 text-blue-700'} rounded-full text-[10px] font-black uppercase`}>
                      {comparison.processing_time}
                    </span>
                  </div>
                  
                  <div className={`flex items-center justify-between p-4 ${isRecommended ? 'bg-white/10' : 'bg-slate-50'} rounded-2xl border ${isRecommended ? 'border-white/5' : 'border-slate-100'}`}>
                    <span className={`text-xs font-bold ${isRecommended ? 'text-slate-400' : 'text-slate-500'} uppercase tracking-wider`}>
                      Est. Cost
                    </span>
                    <span className={`text-sm font-black ${isRecommended ? 'text-white' : 'text-black'}`}>
                      ${(comparison.estimated_cost_usd / 1000).toFixed(0)}K
                    </span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${isRecommended ? 'text-slate-500' : 'text-slate-400'} mb-3`}>
                    Key Advantages
                  </p>
                  <ul className="space-y-2">
                    {comparison.key_advantages.slice(0, 3).map((adv, i) => (
                      <li key={i} className={`text-xs ${isRecommended ? 'text-slate-300' : 'text-slate-600'} flex items-start gap-2`}>
                        <span className={isRecommended ? 'text-[#00F0FF]' : 'text-[#FF5C00]'}>✓</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <button 
                  onClick={() => handleSimulatePathway(comparison.country_code)}
                  disabled={generatingFor === comparison.country_code}
                  className={`mt-auto w-full py-4 ${isRecommended ? 'bg-white text-black hover:bg-[#00F0FF]' : 'bg-black text-white hover:bg-[#FF5C00]'} rounded-2xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-wait`}
                >
                  {generatingFor === comparison.country_code ? (
                    <>
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-current"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      {isRecommended && <span className="material-symbols-outlined text-sm">check_circle</span>}
                      Simulate Pathway
                      <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
