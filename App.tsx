import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Menu, X, Github, Linkedin, Mail, ArrowRight, Code, Zap, Layers, Globe, ChevronDown, Send, Check } from 'lucide-react';
import { ApiIntegrationDemo, AutomationDemo, CustomAppDemo, InfoSiteDemo } from './components/AnimatedDemos';
import { ResumeContent } from './components/ResumeData';

// --- Shared Components ---

const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}> = ({ children, variant = 'primary', className = '', onClick, type = "button" }) => {
  const baseStyle = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm";
  const variants = {
    primary: "bg-primary hover:bg-sky-500 text-white shadow-lg shadow-sky-500/20",
    secondary: "bg-surface hover:bg-slate-700 text-white border border-slate-700",
    outline: "bg-transparent border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white"
  };

  return (
    <button type={type} onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Resume', path: '/resume' },
  ];

  const SocialLinks = () => (
    <div className="flex items-center gap-4 border-l border-slate-700 pl-4 ml-2">
        <a href="https://github.com/tshoemake" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Github size={18} />
        </a>
        <a href="https://linkedin.com/in/timshoemake" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={18} />
        </a>
    </div>
  );

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section - Larger icon size */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                 <img src="https://timshoemake.io/wp-content/uploads/2017/07/shoemaker_repair_blue@2x-2.png" alt="Tim Shoemake Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TimShoemake<span className="text-primary">.io</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
                {links.map(link => (
                <Link 
                    key={link.name} 
                    to={link.path}
                    className={`text-sm font-medium transition-colors ${location.pathname === link.path ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                >
                    {link.name}
                </Link>
                ))}
            </div>
            
            <SocialLinks />

            <Link to="/contact">
                <Button variant="primary" className="py-2 px-5 text-xs ml-2">Let's Talk</Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-300" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-slate-800 absolute w-full px-6 py-4 flex flex-col gap-4 shadow-2xl">
          {links.map(link => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-slate-300 py-2 hover:text-primary border-b border-slate-800/50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="py-2">
            Contact Me
          </Link>
          <div className="flex gap-6 py-2">
             <a href="https://github.com/timshoemake" target="_blank" rel="noreferrer" className="text-slate-400"><Github /></a>
             <a href="https://linkedin.com/in/timshoemake" target="_blank" rel="noreferrer" className="text-slate-400"><Linkedin /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-background border-t border-slate-800 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Tim Shoemake. All rights reserved.
      </div>
      <div className="flex items-center gap-2 text-sm text-slate-600">
        Built with React, Tailwind &amp; Love
      </div>
    </div>
  </footer>
);

// --- Background Component ---

const DistortedCodeBackground: React.FC = () => {
    // Generate a long string of code-like text
    const codeSnippet = `
  import { Future } from '@timshoemake/core';
  import { AI, Cloud, Scale } from 'modern-stack';
  
  class SolutionArchitect extends Engineer {
    constructor() {
      super();
      this.skills = ['React', 'Node', 'C#', 'AWS'];
      this.passion = true;
    }
  
    async buildNextBigThing(requirements) {
      const architecture = await this.design(requirements);
      const production = await this.deploy(architecture);
      return production.scale(Infinity);
    }
  }
  
  // Optimizing business logic...
  // Integrating API endpoints...
  // Automating workflows...
  `.repeat(15);
  
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* Layer 1: Base dark code */}
        <div 
            className="absolute -top-[20%] -left-[10%] w-[130%] text-slate-800/20 text-[10px] sm:text-xs font-mono leading-4 whitespace-pre transform -rotate-[8deg] blur-[0.5px]"
        >
            {codeSnippet}
        </div>
        
        {/* Layer 2: Highlighted code (primary color) with blur */}
        <div 
            className="absolute -top-[10%] -left-[5%] w-[130%] text-primary/5 text-[12px] sm:text-sm font-mono leading-6 whitespace-pre transform -rotate-[5deg] blur-[1px]"
        >
            {codeSnippet}
        </div>
  
        {/* Vignette/Fade Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>
    );
  };

// --- Page Components ---

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section - Redesigned Background */}
      <section className="relative pt-36 pb-24 px-6 overflow-hidden bg-background">
        
        <DistortedCodeBackground />

        {/* Content */}
        <div className="max-w-4xl mx-auto text-left space-y-8 relative z-10">
            
            <div className="flex justify-center mb-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-primary text-xs font-medium shadow-sm">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Available for contract work
                </div>
            </div>

            {/* Terminal Card */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-lg shadow-2xl p-6 md:p-8 font-mono overflow-hidden relative group">
                {/* Window Controls */}
                <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 text-sm md:text-base">
                        <span className="text-green-400 font-bold">guest@portfolio:~$</span>
                        <span className="text-slate-300 typing-effect">./initialize_profile.sh --role=engineer</span>
                    </div>

                    <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-700 delay-300 fill-mode-backwards">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Tim Shoemake</h1>
                        <h2 className="text-xl md:text-2xl text-primary font-semibold mb-4">Senior AI/Software Engineer</h2>
                        <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl">
                            Creating intelligent solutions that scale, adapt, and deliver. <span className="inline-block w-2.5 h-5 bg-slate-400 animate-pulse align-middle ml-1"></span>
                        </p>
                    </div>
                </div>

                <div className="absolute top-0 right-0 p-8 opacity-10 md:opacity-20 pointer-events-none">
                     <Code size={120} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/services">
                 <Button className="w-full sm:w-auto">View My Services <ArrowRight size={16} /></Button>
              </Link>
              <Link to="/resume">
                 <Button variant="secondary" className="w-full sm:w-auto">View Resume</Button>
              </Link>
            </div>
            
            {/* Social Proof / Tech Stack */}
            <div className="pt-8 border-t border-slate-800/50 mt-12 text-center">
                <p className="text-xs text-slate-500 font-mono mb-4 uppercase tracking-widest">Trusted Technologies</p>
                <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                   {['.NET Core', 'React', 'AWS', 'Azure', 'SQL Server', 'TypeScript', 'Node.js'].map(tech => (
                       <span key={tech} className="text-sm font-semibold text-slate-300">{tech}</span>
                   ))}
                </div>
            </div>
        </div>
      </section>

      {/* Featured Service Preview (Bento Grid) */}
      <section className="px-6 max-w-7xl mx-auto w-full">
         <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Services</h2>
            <p className="text-slate-400">Transforming manual processes into efficient, automated code.</p>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 group relative bg-surface rounded-2xl p-8 border border-slate-800 hover:border-slate-600 transition-all overflow-hidden">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-6">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">API Integrations</h3>
                    <p className="text-slate-400 mb-6 max-w-md">Seamlessly connect your tools. I build reliable pipelines that move data between GitHub, Slack, Jira, Salesforce, and custom endpoints.</p>
                    <ApiIntegrationDemo />
                </div>
            </div>
            
             <div className="group relative bg-surface rounded-2xl p-8 border border-slate-800 hover:border-slate-600 transition-all">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center text-secondary mb-6">
                        <Layers size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Business Automation</h3>
                    <p className="text-slate-400 mb-6">Automate complex business logic across platforms.</p>
                    <AutomationDemo />
                </div>
            </div>

            <div className="group relative bg-surface rounded-2xl p-8 border border-slate-800 hover:border-slate-600 transition-all">
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent mb-6">
                        <Code size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Custom Apps</h3>
                    <p className="text-slate-400 mb-6">Full-stack web applications: Home inspection software, financial integrations, custom e-signature platforms and more.</p>
                    <CustomAppDemo />
                </div>
            </div>

            <div className="lg:col-span-2 group relative bg-surface rounded-2xl p-8 border border-slate-800 hover:border-slate-600 transition-all">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-500 mb-6">
                            <Globe size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Business Landing Pages</h3>
                        <p className="text-slate-400 mb-6">High-performance sites designed to convert. I build fast, SEO-optimized landing pages that generate leads and grow your business. Showcasing work for <a href="https://crossfit601.com" className="text-primary hover:underline">CrossFit 601</a>, <a href="https://mapinme.com" className="text-primary hover:underline">MapInMe</a>, and <a href="https://ser247.com" className="text-primary hover:underline">SER247</a>.</p>
                        <Link to="/contact"><span className="text-primary hover:text-white transition-colors cursor-pointer font-medium text-sm flex items-center gap-1">Start a project <ArrowRight size={14} /></span></Link>
                    </div>
                    <InfoSiteDemo />
                </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl p-12 text-center border border-slate-700/50 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to streamline your workflow?</h2>
                <p className="text-slate-300 mb-8 max-w-xl mx-auto">Whether you need a complex API integration or a simple landing page, I bring engineering rigor to every project.</p>
                <Link to="/contact">
                    <Button className="mx-auto px-8 py-3 text-base">Get in Touch</Button>
                </Link>
             </div>
        </div>
      </section>
    </div>
  );
};

const ServicesPage: React.FC = () => {
    return (
        <div className="pt-32 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Services</h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    I offer specialized engineering services tailored to modern business needs. 
                    Proprietary examples can be discussed in private, but here are the concepts I implement.
                </p>
            </div>

            <div className="space-y-20">
                {/* Service 1 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <ApiIntegrationDemo />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Zap className="text-primary" /> API Integrations
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            I architect secure middleware that bridges the gap between your SaaS tools. 
                            Seamlessly connect platforms like GitHub and Slack to create meaningful event pipelines.
                        </p>
                        <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Webhook verification & security</li>
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Event transformation (e.g. Commit -&gt; Notification)</li>
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Reliable delivery & retry logic</li>
                        </ul>
                    </div>
                </div>

                 {/* Service 2 */}
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Layers className="text-secondary" /> Business Process Automation
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Automate complex business logic across platforms. Instead of manual data entry, 
                            let systems talk to each other.
                        </p>
                        <p className="text-sm text-slate-400 border-l-2 border-slate-700 pl-4 mb-10 italic">
                            Example: A Zendesk ticket tagged "Escalate" automatically creates a Jira issue, 
                            routes it to the correct engineering team, and syncs status updates back to support.
                        </p>
                    </div>
                     <div>
                        <AutomationDemo />
                    </div>
                </div>

                {/* Service 3 */}
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="order-2 md:order-1">
                        <CustomAppDemo />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Code className="text-accent" /> Custom Web Applications
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            When off-the-shelf software doesn't fit, I build custom React/.NET applications tailored to your industry. 
                            Specializing in replacing legacy paper processes or expensive SaaS with owned software.
                        </p>
                         <ul className="space-y-2 mb-6">
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Home Inspection Software</li>
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Financial Integrations</li>
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Custom E-Signature Platforms (Docusign Alternative)</li>
                            <li className="flex items-center gap-2 text-sm text-slate-300"><Check size={16} className="text-green-500" /> Insurance Claims Dashboards</li>
                        </ul>
                    </div>
                </div>

                 {/* Service 4 */}
                 <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                            <Globe className="text-green-500" /> Business Landing Pages
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            I build sites that don't just look good—they convert. Using modern web standards, I ensure your business has a high-performance, SEO-ready digital presence that captures leads and drives growth.
                        </p>
                        <p className="text-sm text-primary">Recent work: <a href="https://ser247.com" target="_blank" rel="noreferrer" className="underline hover:text-white">SER247.com</a></p>
                    </div>
                     <div>
                        <InfoSiteDemo />
                    </div>
                </div>
            </div>
        </div>
    );
}

const ResumePage: React.FC = () => (
    <div className="pt-24 px-4 pb-20">
        <ResumeContent />
    </div>
);

const ContactPage: React.FC = () => {
    const [topic, setTopic] = useState('Integration');
    const [submitted, setSubmitted] = useState(false);

    // Update: Handle Netlify form submission via AJAX
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const myForm = e.currentTarget;
        const formData = new FormData(myForm);
        
        // Convert FormData to URLSearchParams for x-www-form-urlencoded
        const searchParams = new URLSearchParams();
        for (const pair of formData.entries()) {
            searchParams.append(pair[0], pair[1] as string);
        }

        try {
            await fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: searchParams.toString(),
            });
            setSubmitted(true);
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Sorry, there was an issue sending your message. Please try again or email me directly.");
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-6 pt-20">
                <div className="bg-surface border border-green-500/30 p-8 rounded-2xl text-center max-w-md w-full animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Check size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Message Sent!</h2>
                    <p className="text-slate-400 mb-6">Thanks for reaching out. I'll get back to you regarding your {topic} inquiry shortly.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-32 px-6 pb-20">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-white mb-4">Let's work together</h1>
                    <p className="text-slate-400">Tell me about your project or idea.</p>
                </div>

                <form 
                    onSubmit={handleSubmit} 
                    className="bg-surface border border-slate-800 p-8 rounded-2xl shadow-xl space-y-6"
                    name="contact"
                    method="post"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                >
                    {/* Netlify Hidden Fields */}
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="hidden" name="bot-field" />

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">What can I help you with?</label>
                        <div className="relative">
                            <select 
                                name="topic" // Added name
                                value={topic} 
                                onChange={(e) => setTopic(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="Integration">API Integration</option>
                                <option value="Automation">Business Process Automation</option>
                                <option value="Custom App">Custom Web Application</option>
                                <option value="Website">Informational Website</option>
                                <option value="Other">Other Inquiry</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-3.5 text-slate-500 pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Name</label>
                            <input required type="text" name="name" placeholder="Jane Doe" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Email</label>
                            <input required type="email" name="email" placeholder="jane@company.com" className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Message</label>
                        <textarea required name="message" rows={5} placeholder="Tell me a bit more about what you need..." className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"></textarea>
                    </div>

                    <Button type="submit" className="w-full justify-center py-3 text-base group">
                        Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </form>
            </div>
        </div>
    );
};

// --- Main App Component ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col font-sans selection:bg-primary/30 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;