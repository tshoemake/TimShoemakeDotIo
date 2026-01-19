import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { X, ChevronDown, Send, Check } from 'lucide-react';
import { isContactOpen, closeContact } from '../stores/contactStore';
import Button from './Button';

declare global {
  interface Window {
    grecaptcha: any;
    onRecaptchaLoad: () => void;
  }
}

const ContactModal: React.FC = () => {
  const isOpen = useStore(isContactOpen);
  const [topic, setTopic] = useState('Integration');
  const [submitted, setSubmitted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const recaptchaWidgetId = useRef<number | null>(null);

  // Load reCAPTCHA script
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.grecaptcha) {
      window.onRecaptchaLoad = () => setRecaptchaReady(true);
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    } else if (window.grecaptcha) {
      setRecaptchaReady(true);
    }
  }, []);

  // Render reCAPTCHA widget when modal opens
  useEffect(() => {
    if (isOpen && recaptchaReady && recaptchaRef.current && recaptchaWidgetId.current === null) {
      try {
        // Site key is set via Netlify environment variable at build time
        const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // fallback is Google's test key
        recaptchaWidgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          theme: 'dark',
        });
      } catch (e) {
        // Widget might already be rendered
      }
    }
  }, [isOpen, recaptchaReady]);

  // Reset reCAPTCHA when modal closes
  useEffect(() => {
    if (!isOpen && recaptchaWidgetId.current !== null && window.grecaptcha) {
      try {
        window.grecaptcha.reset(recaptchaWidgetId.current);
      } catch (e) {}
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSubmitted(false);
      closeContact();
    }, 200);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get reCAPTCHA response
    const recaptchaResponse = window.grecaptcha?.getResponse(recaptchaWidgetId.current);
    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    const myForm = e.currentTarget;
    const formData = new FormData(myForm);
    formData.append('g-recaptcha-response', recaptchaResponse);

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
      alert("Sorry, there was an issue sending your message.");
    }
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:p-6 transition-opacity duration-200 ${isOpen && !isClosing ? 'opacity-100' : 'opacity-0'}`}>
      {/* Backdrop with Blur */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative bg-surface border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-full transition-all duration-200 transform ${isOpen && !isClosing ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
          <div>
            <h2 className="text-xl font-bold text-white">Let's work together</h2>
            <p className="text-xs text-slate-400 mt-1">Tell me about your project.</p>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          {submitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-slate-400 mb-6 text-sm">Thanks for reaching out. I'll get back to you regarding your {topic} inquiry shortly.</p>
              <Button onClick={handleClose} variant="outline" className="mx-auto">Close</Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              name="contact"
              method="post"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact" />
              <input type="hidden" name="bot-field" />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Topic</label>
                <div className="relative">
                  <select
                    name="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg p-3 appearance-none focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</label>
                  <input required type="text" name="name" placeholder="Jane Doe" className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                  <input required type="email" name="email" placeholder="jane@company.com" className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message</label>
                <textarea required name="message" rows={4} placeholder="How can I help you?" className="w-full bg-slate-900 border border-slate-700 text-white text-sm rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-600 resize-none"></textarea>
              </div>

              {/* reCAPTCHA widget */}
              <div className="flex justify-center">
                <div ref={recaptchaRef}></div>
              </div>

              <Button type="submit" className="w-full justify-center py-3 text-sm group mt-2">
                Send Message <Send size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
