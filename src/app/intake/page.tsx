import Link from "next/link";

export default function IntakePage() {
    return (
        <div className="layout-container flex h-screen flex-col bg-white text-slate-900">
            <header className="flex items-center justify-between whitespace-nowrap border-b-4 border-black bg-white px-8 py-4 z-20">
                <Link href="/" className="flex items-center gap-4">
                    <div className="relative group">
                        <div className="size-12 flex items-center justify-center rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden text-navy-logo">
                            <svg className="w-10 h-10 object-contain p-1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                                <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                                <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                                <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                                <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                            </svg>
                        </div>
                        <div className="absolute -top-1 -right-2 bg-black text-white rounded-full p-0.5 border border-white">
                            <span className="material-symbols-outlined text-[12px] font-black">flutter_dash</span>
                        </div>
                    </div>
                    <div className="flex flex-col -gap-1">
                        <h2 className="text-black text-2xl font-black leading-none tracking-tighter">MOOVE</h2>
                        <span className="text-[9px] font-extrabold uppercase tracking-[0.3em] text-slate-400">Migration Intelligence</span>
                    </div>
                </Link>
                <div className="flex flex-1 justify-end gap-6 items-center">
                    <nav className="hidden md:flex items-center gap-10">
                        <Link className="text-black text-sm font-black hover:text-[#ff4500] transition-colors" href="#">HOW IT WORKS</Link>
                        <Link className="text-black text-sm font-black hover:text-[#ff4500] transition-colors" href="/simulator">PATHWAYS</Link>
                        <Link className="text-black text-sm font-black hover:text-[#ff4500] transition-colors" href="#">PRICING</Link>
                    </nav>
                    <div className="h-8 w-px bg-black/10"></div>
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-2xl h-12 px-6 bg-black text-white text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <span>Save Progress</span>
                    </button>
                    <div className="bg-slate-200 rounded-2xl size-11 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center">
                        <span className="material-symbols-outlined text-slate-400">person</span>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden">
                <aside className="w-72 border-r-4 border-black bg-white p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-3 px-5 py-4 rounded-3xl bg-black text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                        <span className="material-symbols-outlined">chat_bubble</span>
                        <p className="text-sm font-black uppercase tracking-tight">Intake Chat</p>
                    </div>
                    <Link href="/simulator">
                        <div className="flex items-center gap-3 px-5 py-4 rounded-3xl text-black font-extrabold hover:bg-slate-50 transition-colors cursor-pointer border-2 border-transparent hover:border-black">
                            <span className="material-symbols-outlined">route</span>
                            <p className="text-sm uppercase tracking-tight">Simulations</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-3 px-5 py-4 rounded-3xl text-black font-extrabold hover:bg-slate-50 transition-colors cursor-pointer border-2 border-transparent hover:border-black">
                        <span className="material-symbols-outlined">account_circle</span>
                        <p className="text-sm uppercase tracking-tight">Profile</p>
                    </div>
                    <div className="mt-auto p-6 rounded-[2rem] bg-slate-50 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[10px] font-black text-black uppercase tracking-widest">Progress</span>
                            <span className="text-xs font-black text-black">Step 1/4</span>
                        </div>
                        <div className="w-full bg-white border-2 border-black h-5 rounded-full overflow-hidden p-0.5">
                            <div className="bg-green-500 h-full rounded-full border-r-2 border-black" style={{ width: "25%" }}></div>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 flex overflow-hidden bg-slate-50">
                    <section className="flex-1 flex flex-col overflow-y-auto relative">
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

                        <div className="max-w-2xl mx-auto w-full py-16 px-8 flex flex-col gap-14 relative z-10">
                            <div className="flex gap-6 items-start">
                                <div className="size-16 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0 overflow-hidden relative text-navy-logo">
                                    <svg className="w-10 h-10 object-contain" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                                        <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                                        <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                                        <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                                        <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                                        <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                                    </svg>
                                    <div className="absolute bottom-0 right-0 bg-green-500 size-4 border-2 border-black rounded-full"></div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[10px] font-black text-black uppercase tracking-[0.25em] ml-1 opacity-50">MOOVE AGENT • ONLINE</span>
                                    <div className="bg-white p-7 rounded-[2.5rem] rounded-tl-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                                        <p className="text-black font-bold text-xl leading-relaxed">
                                            Hey! I'm your Moove strategist. Ready to find your dream destination?
                                            <br /><br />
                                            First off, <span className="bg-yellow-300 px-2 py-0.5 rounded-lg border-2 border-black">what's your current citizenship?</span>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-24 flex flex-wrap gap-4">
                                <button className="px-8 py-4 rounded-3xl bg-black text-white font-black text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex items-center gap-3 hover:translate-y-[-2px] transition-transform">
                                    <span className="material-symbols-outlined text-xl text-green-500">check_circle</span> NIGERIA
                                </button>
                                <button className="px-8 py-4 rounded-3xl bg-white text-black border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">INDIA</button>
                                <button className="px-8 py-4 rounded-3xl bg-white text-black border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">PHILIPPINES</button>
                                <button className="px-8 py-4 rounded-3xl bg-white text-black border-2 border-black font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">BRAZIL</button>
                                <button className="px-8 py-4 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-400 text-slate-500 font-black text-sm hover:border-black hover:text-black hover:bg-white transition-all">OTHER...</button>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className="size-16 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0 overflow-hidden relative text-navy-logo">
                                    <svg className="w-10 h-10 object-contain" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                                        <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                                        <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                                        <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                                        <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                                        <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                                    </svg>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <span className="text-[10px] font-black text-black uppercase tracking-[0.25em] ml-1 opacity-50">MOOVE AGENT</span>
                                    <div className="bg-white p-7 rounded-[2.5rem] rounded-tl-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black">
                                        <p className="text-black font-bold text-xl leading-relaxed">
                                            Got it. And what's your <span className="bg-green-500/20 px-2 py-0.5 rounded-lg border-2 border-black">highest level of completed education?</span> This is huge for your eligibility score.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-24 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="p-6 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-5 cursor-pointer hover:bg-slate-50 transition-colors group">
                                    <div className="size-14 rounded-2xl bg-black flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">school</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-base font-black text-black uppercase truncate">Master's Degree</p>
                                        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Post-Graduate</p>
                                    </div>
                                    <div className="ml-auto text-green-500">
                                        <span className="material-symbols-outlined text-4xl">check_circle</span>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[2rem] bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-5 cursor-pointer group">
                                    <div className="size-14 rounded-2xl bg-slate-100 border-2 border-black flex items-center justify-center text-black shrink-0 group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">history_edu</span>
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-base font-black text-black uppercase truncate">Bachelor's Degree</p>
                                        <p className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Undergraduate</p>
                                    </div>
                                    <div className="ml-auto text-slate-200">
                                        <span className="material-symbols-outlined text-4xl">circle</span>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-24 flex flex-col gap-8 max-w-md">
                                <label className="text-xs font-black text-black uppercase tracking-[0.3em]">How old are you?</label>
                                <div className="bg-white p-8 rounded-[2.5rem] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black flex flex-col gap-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-5xl font-black text-black tracking-tighter">28</span>
                                        <span className="text-xs font-black bg-black text-white px-3 py-1 rounded-full uppercase">Optimal Age</span>
                                    </div>
                                    <input className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer border-2 border-black" max="65" min="18" type="range" defaultValue="28" />
                                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        <span>18 years</span>
                                        <span>65 years</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="w-[440px] border-l-4 border-black bg-charcoal p-10 flex flex-col gap-10 text-white relative">
                        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 0)", backgroundSize: "30px 30px" }}></div>

                        <div className="relative z-10 flex items-center justify-between">
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase">YOUR PROFILE</h3>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                                <div className="size-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">Live Score</span>
                            </div>
                        </div>

                        <div className="relative z-10 space-y-8">
                            <div className="group">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Citizenship</p>
                                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 text-green-500 text-[10px] font-black uppercase border border-green-500/30">
                                        <span className="size-2 rounded-full bg-green-500"></span> High Potential
                                    </span>
                                </div>
                                <div className="flex items-center gap-5 bg-white/5 p-5 rounded-[2rem] border-2 border-white/10 hover:border-green-500/50 hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="size-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black shrink-0">
                                        <span className="material-symbols-outlined text-2xl font-bold">public</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black tracking-tight">NIGERIA</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Tier 2</p>
                                    </div>
                                    <button className="ml-auto opacity-40 hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">edit_square</span>
                                    </button>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Education</p>
                                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase border border-amber-500/30">
                                        <span className="size-2 rounded-full bg-amber-400"></span> Mid Risk
                                    </span>
                                </div>
                                <div className="flex items-center gap-5 bg-white/5 p-5 rounded-[2rem] border-2 border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="size-14 rounded-2xl bg-white text-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black shrink-0">
                                        <span className="material-symbols-outlined text-2xl font-bold">school</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black tracking-tight">MASTER'S</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">STEM Field</p>
                                    </div>
                                    <button className="ml-auto opacity-40 hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">edit_square</span>
                                    </button>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-3 px-1">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">Preferred Destination</p>
                                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase border border-red-500/30">
                                        <span className="size-2 rounded-full bg-red-400"></span> High Competition
                                    </span>
                                </div>
                                <div className="flex items-center gap-5 bg-white/5 p-5 rounded-[2rem] border-2 border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all cursor-pointer">
                                    <div className="size-14 rounded-2xl bg-green-500 text-black flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black shrink-0">
                                        <span className="material-symbols-outlined text-2xl font-bold">location_on</span>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black tracking-tight">CANADA</p>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Express Entry</p>
                                    </div>
                                    <button className="ml-auto opacity-40 hover:opacity-100 transition-opacity">
                                        <span className="material-symbols-outlined text-white">edit_square</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto relative z-10 p-8 rounded-[2.5rem] bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">READINESS SCORE</p>
                                    <div className="flex items-end gap-2">
                                        <span className="text-6xl font-black leading-none tracking-tighter">642</span>
                                        <span className="text-lg font-bold text-slate-400 mb-1">/ 1200</span>
                                    </div>
                                </div>
                                <div className="size-16 rounded-full border-4 border-slate-100 flex items-center justify-center relative">
                                    <svg className="size-14 transform -rotate-90">
                                        <circle className="text-slate-100" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="6"></circle>
                                        <circle className="text-green-500" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150" strokeDashoffset="65" strokeLinecap="round" strokeWidth="6"></circle>
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">54%</span>
                                </div>
                            </div>
                            <Link href="/simulator">
                                <button className="w-full py-5 rounded-2xl bg-black text-white font-black text-sm uppercase tracking-widest hover:translate-y-[-2px] hover:shadow-xl transition-all flex items-center justify-center gap-3">
                                    <span className="material-symbols-outlined text-xl">rocket_launch</span> Analyze Pathway
                                </button>
                            </Link>
                            <p className="text-center mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Updating based on your last answer...</p>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
