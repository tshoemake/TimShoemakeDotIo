import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Menu, X, Github, Linkedin, Terminal } from 'lucide-react';
import { openContact } from '../stores/contactStore';
import Button from './Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    setCurrentPath(window.location.pathname);

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

          {/* Logo Section */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Tim Shoemake Logo"
                  className="w-full h-full object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-10 h-10 bg-slate-800 rounded-lg border border-slate-700 flex items-center justify-center">
                  <Terminal className="text-primary w-6 h-6" />
                </div>
              )}
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TimShoemake<span className="text-primary">.io</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {links.map(link => (
                <a
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors ${currentPath === link.path ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <SocialLinks />

            <Button variant="primary" className="py-2 px-5 text-xs ml-2" onClick={openContact}>Let's Talk</Button>
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
            <a
              key={link.name}
              href={link.path}
              className="text-slate-300 py-2 hover:text-primary border-b border-slate-800/50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button onClick={() => { setIsOpen(false); openContact(); }} className="text-left text-slate-300 py-2 hover:text-primary">
            Contact Me
          </button>
          <div className="flex gap-6 py-2">
            <a href="https://github.com/timshoemake" target="_blank" rel="noreferrer" className="text-slate-400"><Github /></a>
            <a href="https://linkedin.com/in/timshoemake" target="_blank" rel="noreferrer" className="text-slate-400"><Linkedin /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
