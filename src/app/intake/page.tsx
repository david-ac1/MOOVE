'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export default function IntakePage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulationReady, setSimulationReady] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start intake session on component mount
    startSession();
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startSession = async () => {
    try {
      setIsLoading(true);
      console.log('🔵 Starting intake session...');
      console.log('🔵 API URL:', process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001');
      const session = await api.intake.start();
      console.log('✅ Session started:', session);
      setSessionId(session.session_id);
      // Store session ID in localStorage for simulator page
      localStorage.setItem('intake_session_id', session.session_id);
      setMessages([{
        role: 'assistant',
        content: session.message,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('❌ Failed to start session - Full error:', error);
      console.error('❌ Error message:', error instanceof Error ? error.message : String(error));
      console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      setMessages([{
        role: 'assistant',
        content: '❌ Unable to connect to the server. Please try again later.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || !sessionId || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Add user message to UI immediately
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);

    try {
      const response = await api.intake.sendMessage(sessionId, userMessage);
      
      // Add AI response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.response,
        timestamp: new Date()
      }]);

      setSimulationReady(response.simulation_ready);
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const progressPercentage = Math.min((messages.filter(m => m.role === 'user').length / 8) * 100, 100);

  const handleViewSimulation = () => {
    if (sessionId) {
      window.location.href = `/simulator?session_id=${sessionId}`;
    }
  };

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
          {simulationReady ? (
            <button 
              onClick={handleViewSimulation}
              className="flex min-w-[140px] cursor-pointer items-center justify-center gap-2 rounded-2xl h-12 px-6 bg-green-500 text-white text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all animate-pulse">
              <span>See Pathways</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          ) : (
            <button 
              onClick={startSession}
              className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-2xl h-12 px-6 bg-black text-white text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] border-2 border-black hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <span>Restart</span>
            </button>
          )}
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
              <span className="text-xs font-black text-black">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white border-2 border-black h-5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-green-500 h-full rounded-full border-r-2 border-black transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </aside>

        <div className="flex-1 flex overflow-hidden bg-slate-50">
          <section className="flex-1 flex flex-col overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 2px, transparent 2px)", backgroundSize: "30px 30px" }}></div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="max-w-2xl mx-auto w-full flex flex-col gap-6 relative z-10">
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    {msg.role === 'assistant' && (
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
                    )}
                    <div className={`flex-1 ${msg.role === 'user' ? 'ml-auto max-w-md' : ''}`}>
                      <div className={`rounded-3xl px-8 py-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        msg.role === 'assistant' 
                          ? 'bg-white' 
                          : 'bg-black text-white ml-auto'
                      }`}>
                        <p className="text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      </div>
                    </div>
                    {msg.role === 'user' && (
                      <div className="size-16 rounded-[2rem] bg-slate-900 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-white text-3xl">person</span>
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-6 items-start">
                    <div className="size-16 rounded-[2rem] bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
                      <div className="animate-spin">
                        <span className="material-symbols-outlined text-navy-logo">sync</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="rounded-3xl px-8 py-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                        <p className="text-base leading-relaxed text-slate-400">Thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Container */}
            <div className="border-t-4 border-black bg-white p-6 relative z-10">
              <div className="max-w-2xl mx-auto w-full">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      disabled={isLoading || !sessionId}
                      placeholder="Type your message here..."
                      rows={2}
                      className="w-full px-6 py-4 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] focus:translate-y-[-2px] transition-all resize-none text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !sessionId || !input.trim()}
                    className="size-16 rounded-2xl bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <span className="material-symbols-outlined text-3xl">send</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Press Enter to send • Shift + Enter for new line
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
