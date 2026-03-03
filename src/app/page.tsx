import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative px-6 md:px-20 py-12 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-12 order-2 lg:order-1 relative z-10">
            <div className="flex items-center gap-6 group">
              <div className="size-24 bg-white rounded-[2rem] premium-shadow border-2 border-charcoal/5 flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-transform duration-500 text-navy-logo p-4">
                <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                  <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                  <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                  <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                  <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                  <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                </svg>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                  <span className="size-1.5 bg-primary rounded-full animate-pulse"></span>
                  V2.0 Now Live
                </div>
                <p className="text-charcoal font-black text-2xl italic tracking-tight">"Ready to moove?"</p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <h1 className="text-charcoal text-7xl md:text-9xl font-[900] leading-[0.85] tracking-tighter">
                Map your <span className="text-primary italic">future</span> before it happens.
              </h1>
              <p className="text-charcoal/70 text-xl md:text-3xl leading-snug font-medium max-w-xl">
                The world's first AI-powered migration simulator. High-fidelity planning for humans moving across borders.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button className="w-full sm:w-auto flex min-w-[300px] cursor-pointer items-center justify-center rounded-2xl h-20 px-12 bg-primary text-white text-2xl font-[900] shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all uppercase tracking-tight">
                Simulate My Pathway
              </button>
              <div className="flex items-center gap-3 px-8 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-charcoal/5">
                <span className="text-charcoal/40 font-black text-xs tracking-widest uppercase">TRUSTED BY 50K+ USERS</span>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t-4 border-charcoal/5">
              <div className="flex -space-x-4">
                <div className="size-14 rounded-2xl border-4 border-off-white bg-slate-300 shadow-sm"></div>
                <div className="size-14 rounded-2xl border-4 border-off-white bg-slate-400 shadow-sm"></div>
                <div className="size-14 rounded-2xl border-4 border-off-white bg-slate-500 shadow-sm"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-charcoal text-xl">#1 Product of the Day</span>
                <span className="text-sm font-bold text-charcoal/40 uppercase tracking-widest">Global Migration Category</span>
              </div>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative z-10 glass-panel rounded-[3rem] border-2 border-white shadow-2xl p-10 overflow-hidden premium-shadow">
              <div className="flex items-center justify-between mb-12">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-accent-blue uppercase tracking-[0.4em] mb-1">PRO SIMULATOR</span>
                  <h3 className="text-3xl font-[900] text-charcoal tracking-tight">Global Mobility Suite</h3>
                </div>
                <div className="size-14 rounded-full bg-charcoal flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">settings</span>
                </div>
              </div>

              <div className="space-y-10 relative">
                <div className="absolute left-8 top-6 bottom-6 w-1.5 bg-charcoal/5 rounded-full"></div>

                <div className="relative z-10 flex gap-8 items-center">
                  <div className="size-16 rounded-[1.25rem] bg-charcoal flex items-center justify-center text-white shadow-xl shadow-charcoal/20">
                    <span className="material-symbols-outlined text-3xl">fingerprint</span>
                  </div>
                  <div className="flex-1 p-6 rounded-[2rem] bg-white border border-charcoal/5 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-black text-base text-charcoal">Bio-Data Scan</h4>
                      <span className="px-3 py-1 rounded-lg bg-green-500 text-white text-[10px] font-black uppercase tracking-wider">VERIFIED</span>
                    </div>
                    <div className="h-2.5 w-full bg-charcoal/5 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-accent-blue"></div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex gap-8 items-center translate-x-6">
                  <div className="size-20 rounded-[1.5rem] bg-accent-blue flex items-center justify-center text-white shadow-2xl shadow-accent-blue/30 ring-8 ring-white/50">
                    <span className="material-symbols-outlined text-4xl">flight_takeoff</span>
                  </div>
                  <div className="flex-1 p-8 rounded-[2.5rem] bg-charcoal text-white shadow-2xl">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-black text-xl">Entry Clearance</h4>
                      <span className="text-[10px] font-black text-accent-blue tracking-widest uppercase">IN PROGRESS</span>
                    </div>
                    <p className="text-white/50 text-sm mb-6 font-medium">ETA: 48 Business Hours</p>
                    <div className="flex gap-2">
                      <div className="h-2 w-16 bg-accent-blue rounded-full"></div>
                      <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                      <div className="h-2 w-16 bg-white/10 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex gap-8 items-center opacity-40 grayscale">
                  <div className="size-16 rounded-[1.25rem] bg-white border-2 border-dashed border-charcoal/20 flex items-center justify-center text-charcoal">
                    <span className="material-symbols-outlined text-3xl">home_work</span>
                  </div>
                  <div className="flex-1 p-6 rounded-[2rem] bg-white/40 border border-white/50">
                    <h4 className="font-bold text-base text-charcoal">Settlement Portal</h4>
                  </div>
                </div>
              </div>

              <div className="mt-14 pt-10 border-t-2 border-charcoal/5 grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-charcoal/5">
                  <div className="text-[10px] font-black text-charcoal/30 uppercase tracking-[0.2em] mb-2">RISK SCORE</div>
                  <div className="text-4xl font-[900] text-charcoal tracking-tighter">0.04<span className="text-base font-black text-green-500 ml-1">↓</span></div>
                </div>
                <div className="bg-charcoal p-6 rounded-3xl">
                  <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">SUCCESS %</div>
                  <div className="text-4xl font-[900] text-accent-blue tracking-tighter">99.8</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-16 -left-16 size-64 bg-primary/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-16 -right-16 size-80 bg-accent-blue/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 z-20 bg-white border-2 border-charcoal p-6 rounded-3xl shadow-2xl rotate-12 hidden xl:block">
              <div className="text-center">
                <div className="text-3xl font-[900] text-charcoal">100%</div>
                <div className="text-[10px] font-black text-charcoal/40 uppercase tracking-tighter">Secure Data</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="py-32 px-6 md:px-20 bg-charcoal text-white relative overflow-hidden">
        <div className="cow-spots-dark absolute inset-0 opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-24">
            <div className="max-w-3xl">
              <h2 className="text-primary text-sm font-black uppercase tracking-[0.5em] mb-6">THE MOOVE ENGINE</h2>
              <h3 className="text-6xl md:text-8xl font-[900] tracking-tighter leading-[0.9] mb-8">
                ENGINEERED FOR <br /><span className="italic underline decoration-primary underline-offset-[12px]">BOLD</span>.
              </h3>
              <p className="text-white/60 text-2xl font-medium max-w-xl">
                We've automated the complex variables of global relocation so you can focus on the destination.
              </p>
            </div>
            <div className="flex flex-col items-center p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 min-w-[320px]">
              <span className="text-5xl font-[900] mb-2">12,482</span>
              <span className="text-[11px] font-black tracking-[0.3em] uppercase text-white/40">Upvotes This Week</span>
              <button className="mt-8 w-full py-5 px-12 bg-primary text-white font-black text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform flex items-center justify-center gap-3">
                <span className="material-symbols-outlined">arrow_upward</span>
                UPVOTE ON PH
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group p-12 rounded-[3rem] border-2 border-white/5 hover:border-primary transition-all bg-white/[0.03]">
              <div className="size-20 rounded-2xl bg-primary flex items-center justify-center text-white mb-10 group-hover:rotate-12 transition-transform shadow-2xl shadow-primary/30">
                <span className="material-symbols-outlined text-4xl">route</span>
              </div>
              <h4 className="text-3xl font-[900] mb-6 tracking-tight">Pathway Engine</h4>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                Proprietary algorithms that analyze 15,000+ visa pathways in milliseconds.
              </p>
            </div>

            <div className="group p-12 rounded-[3rem] border-2 border-white/5 hover:border-accent-blue transition-all bg-white/[0.03]">
              <div className="size-20 rounded-2xl bg-accent-blue flex items-center justify-center text-white mb-10 group-hover:rotate-12 transition-transform shadow-2xl shadow-accent-blue/30">
                <span className="material-symbols-outlined text-4xl">shield_person</span>
              </div>
              <h4 className="text-3xl font-[900] mb-6 tracking-tight">Risk Shield</h4>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                Predictive modeling for regulatory shifts. Never be caught off guard by policy changes.
              </p>
            </div>

            <div className="group p-12 rounded-[3rem] border-2 border-white/5 hover:border-white transition-all bg-white/[0.03]">
              <div className="size-20 rounded-2xl bg-white flex items-center justify-center text-charcoal mb-10 group-hover:rotate-12 transition-transform shadow-2xl">
                <span className="material-symbols-outlined text-4xl">currency_exchange</span>
              </div>
              <h4 className="text-3xl font-[900] mb-6 tracking-tight">Cost Optimizer</h4>
              <p className="text-white/50 text-lg leading-relaxed font-medium">
                Real-time cost projections including taxes, legal fees, and cost of living.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
