import Link from "next/link";

export default function Header() {
    return (
        <header className="relative z-50">
            <nav className="flex items-center justify-between px-6 md:px-20 py-8">
                <Link href="/" className="flex items-center gap-4">
                    <div className="size-12 flex items-center justify-center text-navy-logo">
                        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <rect fill="currentColor" height="25" rx="4" width="40" x="30" y="40"></rect>
                            <rect fill="currentColor" height="18" rx="3" width="18" x="65" y="32"></rect>
                            <path d="M68 32 L65 25 M80 32 L83 25" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                            <rect fill="currentColor" height="10" rx="1" width="6" x="35" y="65"></rect>
                            <rect fill="currentColor" height="10" rx="1" width="6" x="59" y="65"></rect>
                            <path d="M30 45 C15 35 15 20 35 30 M30 52 C10 45 10 30 35 42" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
                        </svg>
                    </div>
                    <h2 className="text-charcoal text-2xl font-[900] tracking-tighter">MOOVE</h2>
                </Link>
                <div className="hidden md:flex flex-1 justify-end items-center gap-10">
                    <div className="flex items-center gap-8">
                        <Link className="text-charcoal/60 text-sm font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors" href="/simulator">Product</Link>
                        <Link className="text-charcoal/60 text-sm font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors" href="#">Community</Link>
                        <Link className="text-charcoal/60 text-sm font-bold uppercase tracking-[0.2em] hover:text-primary transition-colors" href="#">Marketplace</Link>
                    </div>
                    <div className="flex gap-4">
                        <button className="px-7 py-3 bg-white border-2 border-charcoal text-charcoal rounded-xl text-sm font-black hover:bg-charcoal hover:text-white transition-all">
                            LOG IN
                        </button>
                        <Link href="/intake" className="px-7 py-3 bg-primary text-white rounded-xl text-sm font-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
