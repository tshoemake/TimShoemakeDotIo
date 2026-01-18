import React, { useState, useEffect } from 'react';
import { Database, GitBranch, Slack, FileJson, ArrowRight, CheckCircle2, Server, Globe, Settings, CreditCard, GitCommit, GitPullRequest, Webhook, Dumbbell, Map as MapIcon, ShieldCheck, Laptop, Smartphone, User, MousePointer2, TrendingUp } from 'lucide-react';

// Common container for demos
const DemoContainer: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <div className="w-full h-64 bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-700/50 flex flex-col overflow-hidden relative group hover:border-primary/50 transition-colors duration-300">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="p-3 border-b border-slate-800 text-xs font-mono text-muted uppercase tracking-wider flex items-center gap-2 z-10">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      {title}
    </div>
    <div className="flex-1 relative flex items-center justify-center p-4 z-10 overflow-hidden">
      {children}
    </div>
  </div>
);

// 1. API Integration Demo (GitHub -> Slack)
export const ApiIntegrationDemo: React.FC = () => {
  const [eventText, setEventText] = useState('Commit');
  
  useEffect(() => {
    const events = ['Create PR', 'Commit', 'Webhook'];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % events.length;
      setEventText(events[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DemoContainer title="Event Pipeline: GitHub -> Slack">
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Source: GitHub */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-600 relative z-10 overflow-hidden">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" className="w-10 h-10 object-contain" />
          </div>
          <span className="text-[10px] text-muted font-mono uppercase">Source</span>
        </div>

        {/* Pipeline Animation */}
        <div className="flex-1 h-[2px] bg-slate-700 relative max-w-[100px] flex items-center justify-center">
            {/* Moving dots */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-white rounded-full animate-[slideRight_2s_linear_infinite]" />
        </div>

        {/* Processor Node */}
        <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-12 h-12 bg-slate-800 rounded-lg border border-primary/50 flex items-center justify-center relative shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Webhook className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-primary animate-pulse whitespace-nowrap">{eventText}</span>
        </div>

         {/* Pipeline Animation 2 */}
         <div className="flex-1 h-[2px] bg-slate-700 relative max-w-[100px]">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-white rounded-full animate-[slideRight_2s_linear_infinite_1s]" />
        </div>

        {/* Destination: Slack */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg border border-slate-600 relative z-10 p-2">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="Slack" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-[10px] text-muted font-mono uppercase">Destination</span>
        </div>
      </div>
      <style>{`
        @keyframes slideRight {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
      `}</style>
    </DemoContainer>
  );
};

// 2. Business Automation Demo (ZigZag Layout with Text)
export const AutomationDemo: React.FC = () => {
  return (
    <DemoContainer title="Auto-Escalation Flow">
      <div className="relative w-full h-full p-4">
        {/* SVG Connections - Using viewBox to map 0-100 to percentages for Paths */}
        <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
        >
           {/* Line 1: Box 1 Right (approx 25, 8) -> Box 2 Top (approx 50, 30) 
               Path: Right -> Down
           */}
           <path d="M 25 8 H 50 V 30" stroke="#334155" strokeWidth="1" fill="none" className="animate-pulse" />
           
           {/* Line 2: Box 2 Right (approx 55, 40) -> Box 3 Top (approx 85, 45%)
               Note: Jira Box moved UP to approx 45% Y.
               Path: Right -> Down. 
               End point: X=85, Y=45 (Stopping above the box at 45%)
           */}
           <path d="M 55 40 H 85 V 45" stroke="#334155" strokeWidth="1" fill="none" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
        </svg>

        {/* Node 1: Ingest (Top Left) - Right edge at approx 25% */}
        <div className="absolute top-0 left-4 flex flex-col items-center gap-2 z-10 group">
             <div className="w-24 h-10 bg-slate-800 rounded border border-slate-600 flex items-center justify-center group-hover:border-green-500 transition-colors shadow-lg">
                  <div className="text-xs font-bold text-slate-300">Zendesk</div>
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest bg-slate-900/80 px-1 rounded">Ingest</div>
        </div>

        {/* Node 2: Transform (Center) - Center at 50,40. Width approx 12 (12%). */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 z-10">
             <div className="w-12 h-12 bg-slate-900 rounded-lg border border-primary flex flex-col items-center justify-center shadow-lg shadow-primary/20">
                  <Settings className="w-5 h-5 text-primary mb-1 animate-spin-slow" />
             </div>
             <div className="text-[9px] text-primary uppercase tracking-widest font-bold bg-slate-900/80 px-1 rounded">Logic</div>
        </div>

        {/* Node 3: Deliver (Bottom Right) - Center X approx 85% */}
        <div className="absolute top-[45%] right-4 flex flex-col items-center gap-2 z-10 group">
             <div className="w-24 h-10 bg-slate-800 rounded border border-slate-600 flex items-center justify-center group-hover:border-blue-500 transition-colors shadow-lg">
                  <div className="text-xs font-bold text-slate-300">Jira</div>
              </div>
              <div className="text-[9px] text-slate-500 uppercase tracking-widest bg-slate-900/80 px-1 rounded">Deliver</div>
        </div>
        
        {/* Moving Particles */}
        <div className="absolute w-2 h-2 bg-green-500 rounded-full blur-[1px] animate-[travel1_2.5s_linear_infinite]" />
        <div className="absolute w-2 h-2 bg-blue-500 rounded-full blur-[1px] animate-[travel2_2.5s_linear_infinite_1s]" />

        {/* Log Text Overlay */}
        <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center">
             <div className="text-[9px] font-mono text-slate-400 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Ticket #123 transformed to Jira issue #1234
             </div>
        </div>

      </div>
       <style>{`
        @keyframes travel1 {
          0% { left: 25%; top: 8%; opacity: 0; }
          10% { opacity: 1; }
          40% { left: 50%; top: 8%; }
          90% { left: 50%; top: 30%; opacity: 1; }
          100% { left: 50%; top: 30%; opacity: 0; }
        }
        @keyframes travel2 {
          0% { left: 55%; top: 40%; opacity: 0; }
          10% { opacity: 1; }
          40% { left: 85%; top: 40%; }
          90% { left: 85%; top: 45%; opacity: 1; }
          100% { left: 85%; top: 45%; opacity: 0; }
        }
        .animate-spin-slow {
            animation: spin 3s linear infinite;
        }
      `}</style>
    </DemoContainer>
  );
};

// 3. Custom App Demo (UI Builder)
export const CustomAppDemo: React.FC = () => {
    return (
        <DemoContainer title="Web Application Suite">
            <div className="w-full max-w-[240px] h-40 bg-slate-800/80 rounded-lg border border-slate-700 flex flex-col gap-0 backdrop-blur-sm relative overflow-hidden shadow-2xl transition-all hover:scale-[1.02]">
                
                {/* Navbar */}
                <div className="h-8 border-b border-slate-700 flex items-center px-3 justify-between bg-slate-900/50">
                    <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                    <div className="w-20 h-1.5 bg-slate-700 rounded-full" />
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-12 border-r border-slate-700 bg-slate-900/30 flex flex-col items-center py-3 gap-2">
                        <div className="w-6 h-6 rounded bg-slate-700/50" />
                        <div className="w-6 h-6 rounded bg-slate-700/50" />
                        <div className="w-6 h-6 rounded bg-primary/20 border border-primary/30" />
                        <div className="mt-auto w-4 h-4 rounded-full bg-slate-700/50" />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-3 flex flex-col gap-3">
                        <div className="flex gap-2">
                             <div className="flex-1 h-16 bg-slate-700/20 rounded border border-slate-700/50 p-2 flex flex-col justify-end group">
                                <div className="w-full bg-primary/40 rounded-t transition-all duration-1000 animate-[barGrow_2s_ease-in-out_infinite]" style={{ height: '40%' }} />
                             </div>
                             <div className="flex-1 h-16 bg-slate-700/20 rounded border border-slate-700/50 p-2 flex flex-col justify-end">
                                <div className="w-full bg-secondary/40 rounded-t transition-all duration-1000 animate-[barGrow_2s_ease-in-out_infinite_0.5s]" style={{ height: '70%' }} />
                             </div>
                              <div className="flex-1 h-16 bg-slate-700/20 rounded border border-slate-700/50 p-2 flex flex-col justify-end">
                                <div className="w-full bg-accent/40 rounded-t transition-all duration-1000 animate-[barGrow_2s_ease-in-out_infinite_1s]" style={{ height: '50%' }} />
                             </div>
                        </div>
                        <div className="flex-1 bg-slate-700/20 rounded border border-slate-700/50 p-2 space-y-1.5">
                             <div className="w-3/4 h-1.5 bg-slate-600/50 rounded animate-pulse" />
                             <div className="w-1/2 h-1.5 bg-slate-600/50 rounded animate-pulse delay-75" />
                             <div className="w-5/6 h-1.5 bg-slate-600/50 rounded animate-pulse delay-150" />
                        </div>
                    </div>
                </div>

                 {/* Industry Badge Overlay - Cycles */}
                 <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-600 px-3 py-1 rounded-full flex items-center gap-2 shadow-2xl animate-[slideUpFade_5s_infinite]">
                    <span className="text-[9px] text-white font-medium">Real Estate</span>
                 </div>
                 <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-600 px-3 py-1 rounded-full flex items-center gap-2 shadow-2xl animate-[slideUpFade_5s_infinite_1.66s] opacity-0">
                    <span className="text-[9px] text-white font-medium">Finance</span>
                 </div>
                 <div className="absolute bottom-2 right-2 bg-slate-900/90 border border-slate-600 px-3 py-1 rounded-full flex items-center gap-2 shadow-2xl animate-[slideUpFade_5s_infinite_3.33s] opacity-0">
                    <span className="text-[9px] text-white font-medium">Healthcare</span>
                 </div>
            </div>
             <style>{`
                @keyframes barGrow {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.2); }
                }
                @keyframes slideUpFade {
                    0% { transform: translateY(10px); opacity: 0; }
                    10% { transform: translateY(0); opacity: 1; }
                    30% { transform: translateY(0); opacity: 1; }
                    40% { transform: translateY(-10px); opacity: 0; }
                    100% { opacity: 0; }
                }
            `}</style>
        </DemoContainer>
    )
}

// 4. Lead Generation / Conversion Demo
export const InfoSiteDemo: React.FC = () => {
    const [leads, setLeads] = useState(142);
    const [step, setStep] = useState(0); 

    useEffect(() => {
        const interval = setInterval(() => {
            setStep(s => (s + 1) % 4); // 0: Idle, 1: Cursor Move, 2: Click/Submit, 3: Success
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (step === 3) {
            setLeads(l => l + 1);
        }
    }, [step]);

    return (
        <DemoContainer title="Lead Generation">
             <div className="w-full h-full flex items-center justify-center gap-4 px-4">
                 
                 {/* Lead Counter Card */}
                 <div className="w-24 h-24 bg-slate-800 rounded-lg border border-slate-700 flex flex-col items-center justify-center p-2 shadow-xl">
                     <TrendingUp className="text-green-500 w-6 h-6 mb-1" />
                     <div className="text-2xl font-bold text-white tabular-nums">{leads}</div>
                     <div className="text-[8px] text-slate-400 uppercase tracking-widest">Leads</div>
                 </div>

                 {/* Arrow */}
                 <div className="w-8 h-[2px] bg-slate-700 relative">
                     <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-2 h-2 bg-green-500 rounded-full ${step === 3 ? 'animate-[slideRight_0.5s_linear]' : 'opacity-0'}`} />
                 </div>

                 {/* Website Wireframe with Form */}
                 <div className="w-40 h-32 bg-slate-800 rounded-lg border border-slate-700 flex flex-col overflow-hidden relative shadow-2xl">
                     <div className="h-4 bg-slate-900 border-b border-slate-700 flex items-center px-2 space-x-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                     </div>
                     <div className="flex-1 p-2 flex flex-col gap-2">
                         <div className="h-2 bg-slate-700 rounded w-3/4" />
                         <div className="h-8 bg-slate-700/30 rounded border border-slate-600/50 flex items-center px-2">
                             <span className="text-[6px] text-slate-500">Enter email...</span>
                         </div>
                         <div className={`h-6 rounded flex items-center justify-center text-[8px] font-bold text-white transition-colors duration-300 ${step >= 2 ? 'bg-primary scale-95' : 'bg-primary/80'}`}>
                             Contact Me
                         </div>
                     </div>

                     {/* Cursor */}
                     <div 
                        className="absolute w-4 h-4 text-white z-20 drop-shadow-md transition-all duration-500 ease-in-out"
                        style={{
                            top: step === 0 ? '80%' : '65%',
                            left: step === 0 ? '80%' : '50%',
                            opacity: step === 3 ? 0 : 1,
                            transform: step === 2 ? 'scale(0.8)' : 'scale(1)'
                        }}
                     >
                         <MousePointer2 className="w-full h-full fill-black" />
                     </div>

                     {/* Success Overlay */}
                     <div className={`absolute inset-0 bg-slate-900/90 flex items-center justify-center transition-opacity duration-300 ${step === 3 ? 'opacity-100' : 'opacity-0'}`}>
                         <div className="flex flex-col items-center">
                            <CheckCircle2 className="text-green-500 w-8 h-8 mb-1" />
                            <span className="text-[8px] text-white">Captured!</span>
                         </div>
                     </div>
                 </div>

             </div>
        </DemoContainer>
    )
}