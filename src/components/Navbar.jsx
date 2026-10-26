import React, { useState, useEffect } from 'react';
import { Activity, Menu, X, Flame, Dumbbell, ChevronRight } from 'lucide-react';

export default function Navbar({ activeSection, onQuickLogOpen }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Workouts', href: '#workouts' },
    { name: 'Nutrition', href: '#nutrition' },
    { name: 'Progress', href: '#progress' },
    { name: 'BMI', href: '#bmi' },
    { name: 'Goals', href: '#goals' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 68, behavior: 'smooth' });
  };

  return (
    <>
      {/* ── Fixed header ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl py-2'
            : 'bg-slate-950/80 backdrop-blur-sm border-b border-slate-900/80 py-3'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Brand */}
            <a href="#home" onClick={(e) => scrollTo(e, '#home')} className="flex shrink-0 items-center gap-2">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 shadow-md shadow-emerald-500/20">
                <Activity className="h-4 w-4 stroke-[2.5] text-slate-950" />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                Pulse<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Fit</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-colors duration-150 xl:text-sm ${
                      active ? 'bg-emerald-500/10 font-semibold text-emerald-400' : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {active && <span className="absolute bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400" />}
                  </a>
                );
              })}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <button
                onClick={onQuickLogOpen}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-700"
              >
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                Log Activity
              </button>
              <a
                href="#workouts"
                onClick={(e) => scrollTo(e, '#workouts')}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:-translate-y-px hover:shadow-emerald-500/40"
              >
                <Dumbbell className="h-3.5 w-3.5 stroke-[2.5]" />
                Start Workout
              </a>
            </div>

            {/* Mobile controls */}
            <div className="flex shrink-0 items-center gap-1 lg:hidden">
              <button onClick={onQuickLogOpen} className="rounded-lg border border-slate-800 bg-slate-900 p-2 sm:hidden" aria-label="Log activity">
                <Flame className="h-4 w-4 text-amber-400" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5 text-emerald-400" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer (portal-like, outside header to avoid stacking) ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[56px] z-40 max-h-[calc(100vh-56px)] overflow-y-auto border-b border-slate-800 bg-slate-950/98 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      active
                        ? 'border border-emerald-500/30 bg-emerald-500/10 font-semibold text-emerald-400'
                        : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    {link.name}
                    <ChevronRight className="h-4 w-4 text-slate-500" />
                  </a>
                );
              })}

              <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
                <button
                  onClick={() => { setMobileMenuOpen(false); onQuickLogOpen(); }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm font-semibold text-slate-200"
                >
                  <Flame className="h-4 w-4 text-amber-400" />
                  Quick Log Activity
                </button>
                <a
                  href="#workouts"
                  onClick={(e) => scrollTo(e, '#workouts')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-3 text-sm font-bold text-slate-950 shadow-lg"
                >
                  <Dumbbell className="h-4 w-4 stroke-[2.5]" />
                  Explore Workouts
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
