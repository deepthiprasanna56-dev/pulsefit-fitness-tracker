import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, Flame, Dumbbell, Compass, HeartPulse, ChevronRight } from 'lucide-react';

export default function Navbar({ activeSection, onQuickLogOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Workouts', href: '#workouts' },
    { name: 'Nutrition', href: '#nutrition' },
    { name: 'Progress', href: '#progress' },
    { name: 'BMI Calculator', href: '#bmi' },
    { name: 'Goals', href: '#goals' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navHeight = 72;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full overflow-x-hidden ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3'
          : 'bg-slate-950/70 backdrop-blur-sm border-b border-slate-900 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                Pulse<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Fit</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 -mt-1">
                Tracker Pro
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-emerald-400 font-semibold bg-emerald-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onQuickLogOpen}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 transition-all shadow-sm"
              title="Quick Log Activity"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Log Activity</span>
            </button>

            <a
              href="#workouts"
              onClick={(e) => handleLinkClick(e, '#workouts')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <Dumbbell className="w-4 h-4 stroke-[2.5]" />
              <span>Start Workout</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onQuickLogOpen}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 sm:hidden"
              aria-label="Quick log"
            >
              <Flame className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-400" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-slate-950/98 backdrop-blur-xl border-b border-slate-800 p-6 shadow-2xl transition-all duration-200 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onQuickLogOpen();
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900 border border-slate-700 flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                Quick Log Steps / Water / Workout
              </button>
              <a
                href="#workouts"
                onClick={(e) => handleLinkClick(e, '#workouts')}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <Dumbbell className="w-4 h-4 stroke-[2.5]" />
                Explore & Start Workouts
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
