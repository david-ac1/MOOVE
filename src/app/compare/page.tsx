import Link from "next/link";

export default function ComparePage() {
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
        .cow-patch-bg::before {
            content: "";
            position: absolute;
            inset: 0;
            background: 
                radial-gradient(circle at 15% 25%, #e9ecef 80px, transparent 100px),
                radial-gradient(circle at 85% 65%, #e9ecef 120px, transparent 140px),
                radial-gradient(circle at 45% 85%, #e9ecef 60px, transparent 80px);
            z-index: -1;
            opacity: 0.6;
        }
        .pop-bubble {
            filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));
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
                        <Link className="text-slate-500 hover:text-black font-bold text-sm transition-colors" href="#">Cost Calc</Link>
                        <Link className="text-slate-500 hover:text-black font-bold text-sm transition-colors" href="#">Community</Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <button className="bg-slate-100 p-2.5 rounded-xl hover:bg-slate-200 transition-colors">
                        <span className="material-symbols-outlined text-[22px]">search</span>
                    </button>
                    <div className="h-10 w-10 flex items-center justify-center bg-slate-200 text-slate-500 rounded-xl border-2 border-black overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                        <span className="material-symbols-outlined">person</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 px-4 md:px-12 lg:px-24 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 relative">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-[#FF5C00]/10 text-[#FF5C00] px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5C00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5C00]"></span>
                            </span>
                            Live Comparisons
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-black leading-tight tracking-tight mb-4">
                            The Smart Way <br /><span className="text-[#FF5C00] italic">to Migration.</span>
                        </h1>
                        <p className="text-slate-600 text-lg font-medium max-w-lg leading-relaxed">
                            Compare global pathways with AI precision. We've mapped the bureaucracy so you don't have to.
                        </p>
                    </div>
                    <div className="relative group pop-bubble">
                        <div className="absolute -top-24 right-0 md:right-auto md:-left-12 w-48 bg-black text-white p-5 rounded-3xl rounded-bl-none shadow-2xl border-2 border-[#FF5C00]/20 transform hover:scale-105 transition-all">
                            <p className="text-sm font-bold leading-tight">Same goal. <br />Different road. 🐮</p>
                            <div className="absolute -bottom-4 left-0 w-8 h-8 bg-black" style={{ clipPath: "polygon(0 0, 0% 100%, 100% 0)" }}></div>
                        </div>
                        <div className="w-20 h-20 bg-white border-[3px] border-black text-black rounded-3xl flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform group-hover:rotate-6 transition-all cursor-help relative overflow-hidden">
                            <svg className="w-12 h-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                                <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                                <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                                <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <div className="comparison-card glass-card rounded-3xl p-8 hover:bg-white flex flex-col group border-2 border-transparent hover:border-black/5">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-12 rounded-xl bg-slate-200 overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110 flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">flag</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Success Rate</span>
                                <span className="text-2xl font-black text-black">94%</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-black mb-1">Germany</h3>
                            <p className="text-[#FF5C00] font-bold text-sm tracking-tight uppercase">Skilled Worker Track</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-black/10 transition-colors">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">Low Risk</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-black/10 transition-colors">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processing</span>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black uppercase">6-9 Months</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-[#FF5C00] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                            Simulate Pathway
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>

                    <div className="comparison-card active bg-black text-white rounded-3xl p-8 flex flex-col">
                        <div className="absolute top-0 right-0 p-4">
                            <span className="bg-[#FF5C00] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/20">Recommended</span>
                        </div>
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-12 rounded-xl bg-slate-800 overflow-hidden border-2 border-white/20 shadow-lg flex items-center justify-center text-white/50">
                                <span className="material-symbols-outlined">flag</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Success Rate</span>
                                <span className="text-2xl font-black text-white">82%</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-white mb-1">Canada</h3>
                            <p className="text-[#00F0FF] font-bold text-sm tracking-tight uppercase">Express Entry (FSW)</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Risk Level</span>
                                <span className="px-3 py-1 bg-amber-400/20 text-amber-400 rounded-full text-[10px] font-black uppercase">Moderate</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl border border-white/5">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Processing</span>
                                <span className="px-3 py-1 bg-[#00F0FF]/20 text-[#00F0FF] rounded-full text-[10px] font-black uppercase">4-6 Months</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full py-4 bg-white text-black rounded-2xl font-extrabold text-sm hover:bg-[#00F0FF] transition-all active:scale-95 flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Selected Path
                        </button>
                    </div>

                    <div className="comparison-card glass-card rounded-3xl p-8 hover:bg-white flex flex-col group border-2 border-transparent hover:border-black/5">
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-16 h-12 rounded-xl bg-slate-200 overflow-hidden border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] transition-transform group-hover:scale-110 flex items-center justify-center text-slate-400">
                                <span className="material-symbols-outlined">flag</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Success Rate</span>
                                <span className="text-2xl font-black text-black">98%</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-3xl font-black text-black mb-1">Netherlands</h3>
                            <p className="text-[#FF5C00] font-bold text-sm tracking-tight uppercase">Highly Skilled Migrant</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-black/10 transition-colors">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Risk Level</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">Low Risk</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-black/10 transition-colors">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Processing</span>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase">2-4 Weeks</span>
                            </div>
                        </div>
                        <button className="mt-auto w-full py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-[#FF5C00] transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg">
                            Simulate Pathway
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>

                <div className="bg-white border-[3px] border-black rounded-[3rem] p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C00]/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
                        <div className="lg:w-2/3 w-full">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-4xl font-black text-black">Canada Deep-Dive</h2>
                                <span className="bg-black text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-tight">Express Entry 2024</span>
                            </div>
                            <div className="bg-slate-50 rounded-[2.5rem] p-10 border-2 border-black/5 mb-8">
                                <div className="flex justify-between items-center mb-12">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-white mb-3 rotate-6 shadow-lg">
                                            <span className="material-symbols-outlined text-2xl">description</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 01</span>
                                        <span className="text-sm font-bold">ITA Prep</span>
                                    </div>
                                    <div className="h-[3px] flex-1 bg-slate-200 mx-4 relative rounded-full">
                                        <div className="absolute top-0 left-0 h-full bg-[#FF5C00] w-1/2 rounded-full"></div>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                                            <span className="material-symbols-outlined text-2xl">flight_takeoff</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 02</span>
                                        <span className="text-sm font-bold text-slate-400">Arrival</span>
                                    </div>
                                    <div className="h-[3px] flex-1 bg-slate-200 mx-4 rounded-full"></div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mb-3 shadow-inner">
                                            <span className="material-symbols-outlined text-2xl">home_pin</span>
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Step 03</span>
                                        <span className="text-sm font-bold text-slate-400">PR Approval</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600 bg-white p-5 rounded-2xl border-2 border-black/5 inline-flex shadow-sm">
                                    <span className="material-symbols-outlined text-[#FF5C00]">info</span>
                                    <span className="text-sm font-bold tracking-tight">Currently at "ITA Received" stage. Estimated 120 days until next milestone.</span>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-1/3 grid grid-cols-1 gap-6 w-full">
                            <div className="bg-slate-50 p-7 rounded-[2rem] border-2 border-transparent hover:border-black transition-all cursor-default shadow-sm group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#FF5C00] group-hover:scale-110 transition-transform">trending_up</span>
                                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Prob. of Success</span>
                                </div>
                                <div className="text-4xl font-black text-black mb-3">82%</div>
                                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
                                    <div className="bg-[#FF5C00] h-full w-[82%] rounded-full"></div>
                                </div>
                            </div>
                            <div className="bg-slate-50 p-7 rounded-[2rem] border-2 border-transparent hover:border-black transition-all cursor-default shadow-sm group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#FF5C00] group-hover:scale-110 transition-transform">payments</span>
                                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Total Est. Cost</span>
                                </div>
                                <div className="text-4xl font-black text-black mb-1">$12,400</div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Includes all fees &amp; medicals</p>
                            </div>
                            <div className="bg-slate-50 p-7 rounded-[2rem] border-2 border-transparent hover:border-black transition-all cursor-default shadow-sm group">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="material-symbols-outlined text-[#FF5C00] group-hover:scale-110 transition-transform">work</span>
                                    <span className="text-xs font-black uppercase text-slate-500 tracking-wider">Avg. IT Salary</span>
                                </div>
                                <div className="text-4xl font-black text-black mb-1">$85k <span className="text-lg font-bold text-slate-400">CAD</span></div>
                                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    +12% vs Current Market
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="mt-20 border-t-2 border-black/5 bg-white/40 backdrop-blur-md px-12 py-16">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <Link href="/" className="flex items-center gap-4">
                        <div className="size-12 flex items-center justify-center bg-black rounded-2xl shadow-xl transform -rotate-3 transition-transform hover:rotate-0 text-white">
                            <svg className="w-10 h-10 p-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                                <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                                <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                                <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                        </div>
                        <div>
                            <span className="font-black text-2xl tracking-tighter">Moove</span>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-none">Global Freedom</p>
                        </div>
                    </Link>
                    <div className="flex gap-12">
                        <Link className="text-sm font-bold text-slate-500 hover:text-black transition-colors" href="#">Terms</Link>
                        <Link className="text-sm font-bold text-slate-500 hover:text-black transition-colors" href="#">Privacy</Link>
                        <Link className="text-sm font-bold text-slate-500 hover:text-black transition-colors" href="#">Contact</Link>
                    </div>
                    <div className="flex flex-col items-center md:items-end gap-1">
                        <p className="text-xs font-black text-black/80 uppercase tracking-widest">© 2024 Moove. Built for the bold.</p>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">System Operational</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
