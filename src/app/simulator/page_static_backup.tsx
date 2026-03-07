import Link from "next/link";

export default function SimulatorPage() {
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
                            <Link className="text-sm font-semibold text-slate-500 hover:text-[#0f49bd] transition-colors" href="#">Global Policy</Link>
                            <Link className="text-sm font-semibold text-slate-500 hover:text-[#0f49bd] transition-colors" href="#">Concierge</Link>
                        </nav>

                        <div className="flex items-center gap-6">
                            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>

                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-xs font-bold text-slate-900 leading-tight">Alex Sterling</p>
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider leading-tight">Pro Plan</p>
                                </div>
                                <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white fintech-shadow flex items-center justify-center bg-slate-200">
                                    <span className="material-symbols-outlined text-slate-400">person</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

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
                            <h1 className="text-4xl font-black tracking-tight text-slate-900">Premium Migration Simulator</h1>
                            <p className="text-lg text-slate-500 font-medium">Visualizing a 10-year strategic residency trajectory to Canada.</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-1 rounded-2xl bg-white p-1.5 fintech-shadow border border-slate-100">
                                <button className="flex items-center gap-2 rounded-xl bg-slate-50 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 transition-all">
                                    <span className="material-symbols-outlined !text-lg text-[#0f49bd]">public</span>
                                    Canada
                                </button>
                                <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all">
                                    <span className="material-symbols-outlined !text-lg text-slate-400">flight_takeoff</span>
                                    From India
                                </button>
                            </div>
                            <button className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                                <span className="material-symbols-outlined !text-lg">download</span>
                                Export Strategy
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-8 space-y-10">
                            <div className="relative overflow-hidden rounded-[32px] bg-white p-10 fintech-shadow-lg border border-white">
                                <div className="flex items-center justify-between mb-16">
                                    <div>
                                        <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
                                            <div className="h-8 w-1.5 rounded-full bg-[#0f49bd]"></div>
                                            Path Projections
                                        </h3>
                                        <p className="text-sm font-medium text-slate-400 mt-1">Multi-stage probability modeling</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <span className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 glow-green"></span> Optimal
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

                                    <div className="relative flex justify-between min-w-[900px] px-8">
                                        <div className="group relative flex flex-col items-center">
                                            <div className="absolute -top-16 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">Stage 01: Years 0-2</div>
                                            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-2xl glow-green transition-all group-hover:scale-110 group-hover:-rotate-6 cursor-pointer ring-4 ring-white">
                                                <span className="material-symbols-outlined !text-2xl">work</span>
                                            </div>
                                            <div className="mt-8 w-56 text-center bg-[#fcfcfd] p-6 rounded-3xl border border-slate-100 fintech-shadow group-hover:border-emerald-200 transition-colors">
                                                <div className="inline-flex mb-3 items-center rounded-lg bg-emerald-500 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                                                    SECURE
                                                </div>
                                                <p className="text-base font-extrabold text-slate-900 leading-tight">Temp Work Visa</p>
                                                <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">LMIA Sponsorship with verified tech employer.</p>
                                            </div>
                                        </div>

                                        <div className="group relative flex flex-col items-center">
                                            <div className="absolute -top-16 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">Stage 02: Years 2-5</div>
                                            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-2xl glow-amber transition-all group-hover:scale-110 group-hover:-rotate-6 cursor-pointer ring-4 ring-white">
                                                <span className="material-symbols-outlined !text-2xl">history_edu</span>
                                            </div>
                                            <div className="mt-8 w-56 text-center bg-[#fcfcfd] p-6 rounded-3xl border border-slate-100 fintech-shadow group-hover:border-amber-200 transition-colors">
                                                <div className="inline-flex mb-3 items-center rounded-lg bg-amber-500 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                                                    SENSITIVE
                                                </div>
                                                <p className="text-base font-extrabold text-slate-900 leading-tight">Skilled Extension</p>
                                                <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">Depends on continuous employment policy shifts.</p>
                                            </div>
                                        </div>

                                        <div className="group relative flex flex-col items-center">
                                            <div className="absolute -top-16 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">Stage 03: Years 5-8</div>
                                            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-2xl glow-green transition-all group-hover:scale-110 group-hover:-rotate-6 cursor-pointer ring-4 ring-white">
                                                <span className="material-symbols-outlined !text-2xl">verified_user</span>
                                            </div>
                                            <div className="mt-8 w-56 text-center bg-[#fcfcfd] p-6 rounded-3xl border border-slate-100 fintech-shadow group-hover:border-emerald-200 transition-colors">
                                                <div className="inline-flex mb-3 items-center rounded-lg bg-emerald-500 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                                                    HIGH PROB
                                                </div>
                                                <p className="text-base font-extrabold text-slate-900 leading-tight">PR Status</p>
                                                <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">Express Entry transition via CEC stream.</p>
                                            </div>
                                        </div>

                                        <div className="group relative flex flex-col items-center">
                                            <div className="absolute -top-16 px-4 py-1.5 rounded-full bg-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-200">Goal: Year 10</div>
                                            <div className="z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500 text-white shadow-2xl glow-rose transition-all group-hover:scale-110 group-hover:-rotate-6 cursor-pointer ring-4 ring-white">
                                                <span className="material-symbols-outlined !text-2xl">flag</span>
                                            </div>
                                            <div className="mt-8 w-56 text-center bg-[#fcfcfd] p-6 rounded-3xl border border-slate-100 fintech-shadow group-hover:border-rose-200 transition-colors">
                                                <div className="inline-flex mb-3 items-center rounded-lg bg-rose-500 px-3 py-1 text-[10px] font-black text-white uppercase tracking-wider">
                                                    CRITICAL
                                                </div>
                                                <p className="text-base font-extrabold text-slate-900 leading-tight">Citizenship</p>
                                                <p className="mt-2 text-xs font-medium text-slate-400 leading-relaxed">Quota monitoring required for final naturalization.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="rounded-[32px] bg-white p-8 fintech-shadow border border-white">
                                    <h4 className="mb-6 text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined !text-lg text-[#0f49bd]">analytics</span>
                                        Approval Forecast
                                    </h4>
                                    <div className="flex items-center gap-8">
                                        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-[8px] border-emerald-50">
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-3xl font-black text-slate-900 leading-none">84</span>
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase">%</span>
                                            </div>
                                            <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                                                <circle className="text-emerald-500" cx="50" cy="50" fill="transparent" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset="46" strokeLinecap="round" strokeWidth="8"></circle>
                                            </svg>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-bold text-slate-900">Strong Profile Alignment</p>
                                            <p className="text-xs text-slate-400 font-medium leading-relaxed">Comparing your data against 12,400 successful applicants in NOC 2173 category.</p>
                                            <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[10px] font-bold text-emerald-600">UP +4% VS LAST MONTH</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[32px] bg-white p-8 fintech-shadow border border-white">
                                    <h4 className="mb-6 text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <span className="material-symbols-outlined !text-lg text-[#0f49bd]">query_stats</span>
                                        Market Volatility
                                    </h4>
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] font-bold">
                                                <span className="text-slate-500 uppercase">Immigration Quotas</span>
                                                <span className="text-emerald-600">LOW RISK</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100">
                                                <div className="h-full w-[85%] rounded-full bg-emerald-500"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] font-bold">
                                                <span className="text-slate-500 uppercase">Economic Sentiment</span>
                                                <span className="text-amber-600">NEUTRAL</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100">
                                                <div className="h-full w-[52%] rounded-full bg-amber-500"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between text-[11px] font-bold">
                                                <span className="text-slate-500 uppercase">Political Stability</span>
                                                <span className="text-rose-600">HIGH RISK</span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-slate-100">
                                                <div className="h-full w-[30%] rounded-full bg-rose-500"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="lg:col-span-4">
                            <div className="sticky top-28 space-y-8">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-black text-slate-900">Pathway Intelligence</h3>
                                    <span className="material-symbols-outlined text-slate-400">info</span>
                                </div>

                                <div className="rounded-[32px] bg-white p-6 fintech-shadow border border-white group hover:border-[#0f49bd]/20 transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 rounded-2xl bg-blue-50 text-[#0f49bd]">
                                            <span className="material-symbols-outlined">id_card</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-slate-900">Rank 12</p>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase">+2 Positions</p>
                                        </div>
                                    </div>
                                    <h4 className="text-sm font-extrabold text-slate-900 mb-2">Global Access Quotient</h4>
                                    <p className="text-xs text-slate-400 font-medium leading-relaxed">Your Indian passport combined with upcoming H1B tenure boosts your security tier score to A-.</p>
                                </div>

                                <div className="rounded-[32px] bg-white p-6 fintech-shadow border border-white">
                                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Critical Signals</h4>
                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white fintech-shadow text-amber-500">
                                                <span className="material-symbols-outlined !text-xl">warning</span>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-extrabold text-slate-900">Tech Quota Warning</p>
                                                <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">15% reduction predicted in EE tech draws for 2026.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white fintech-shadow text-emerald-500">
                                                <span className="material-symbols-outlined !text-xl">bolt</span>
                                            </div>
                                            <div>
                                                <p className="text-[13px] font-extrabold text-slate-900">Regional Fast-track</p>
                                                <p className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">NOC 2173 remains priority for Atlantic provinces.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-[32px] bg-white p-6 fintech-shadow border border-white overflow-hidden relative">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-extrabold text-slate-900">Top Settlement Hub</h4>
                                        <div className="px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-black uppercase">Toronto</div>
                                    </div>
                                    <div className="relative h-40 w-full overflow-hidden rounded-2xl bg-slate-100 border border-slate-100">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="h-6 w-6 animate-ping rounded-full bg-[#0f49bd]/20"></div>
                                                <div className="absolute inset-0 h-6 w-6 rounded-full bg-[#0f49bd] border-4 border-white shadow-lg"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl fintech-shadow border border-white/50">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase">Employment Match</span>
                                                <span className="text-[10px] font-black text-slate-900">92%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full w-[92%] bg-[#0f49bd] rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full rounded-2xl bg-slate-900 py-4 text-sm font-black text-white shadow-2xl hover:bg-slate-800 transition-all hover:translate-y-[-2px] active:translate-y-0">
                                    Book Strategic Consultation
                                </button>
                            </div>
                        </aside>
                    </div>
                </main>

                <footer className="mt-20 border-t border-slate-200 py-10 px-12 bg-white/50">
                    <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <Link href="/" className="flex items-center gap-4 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white relative">
                                <div className="size-6 flex items-center justify-center text-white">
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
                            <span className="text-sm font-black tracking-tight uppercase">Moove Intelligence</span>
                        </Link>
                        <div className="flex gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                            <Link className="hover:text-[#0f49bd] transition-colors" href="#">Data Privacy</Link>
                            <Link className="hover:text-[#0f49bd] transition-colors" href="#">Terms of Service</Link>
                            <Link className="hover:text-[#0f49bd] transition-colors" href="#">Policy Change Log</Link>
                        </div>
                        <p className="text-[11px] font-bold text-slate-400">© 2024 MOOVE AI. ALL RIGHTS RESERVED.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}
