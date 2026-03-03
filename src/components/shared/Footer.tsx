import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-off-white py-20 px-6 md:px-20 border-t-[12px] border-charcoal">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
                <Link href="/" className="flex items-center gap-4">
                    <div className="size-10 flex items-center justify-center text-navy-logo">
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                            <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                            <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                            <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                            <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                            <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                        </svg>
                    </div>
                    <h2 className="text-charcoal text-2xl font-[900] tracking-tighter uppercase">MOOVE.AI</h2>
                </Link>
                <div className="flex gap-12">
                    <Link className="text-sm font-black text-charcoal/40 hover:text-primary uppercase tracking-[0.3em] transition-colors" href="#">Careers</Link>
                    <Link className="text-sm font-black text-charcoal/40 hover:text-primary uppercase tracking-[0.3em] transition-colors" href="#">Legal</Link>
                    <Link className="text-sm font-black text-charcoal/40 hover:text-primary uppercase tracking-[0.3em] transition-colors" href="#">API</Link>
                </div>
                <div className="flex gap-6">
                    <div className="size-14 rounded-2xl border-2 border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-2xl">public</span>
                    </div>
                    <div className="size-14 rounded-2xl border-2 border-charcoal/10 flex items-center justify-center hover:bg-charcoal hover:text-white transition-all cursor-pointer">
                        <span className="material-symbols-outlined text-2xl">alternate_email</span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-16 border-t border-charcoal/5 flex flex-col md:flex-row justify-between text-[11px] font-black text-charcoal/20 uppercase tracking-[0.4em]">
                <p>© 2024 MOOVE SIMULATION SYSTEMS CORP.</p>
                <p>MADE WITH ❤️ FOR THE BORDERLESS</p>
            </div>
        </footer>
    );
}
