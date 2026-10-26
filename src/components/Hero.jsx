import React from 'react';
import {
  Flame,
  Footprints,
  Heart,
  Award,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  Activity,
  Sparkles,
} from 'lucide-react';

export default function Hero({ stats }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-slate-950 pt-24 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* ── Background glows (capped to viewport) ── */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-80 w-[min(360px,80vw)] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-[min(400px,80vw)] rounded-full bg-emerald-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">

          {/* ── Left: Copy + CTAs ── */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-slate-900/90 px-3.5 py-1.5 shadow-inner backdrop-blur-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Next-Gen Fitness & Health Suite
              </span>
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Elevate Your Physique.{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Track Every Pulse.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base lg:mx-0">
              Achieve peak fitness with real-time biometric tracking, high-yield workout routines,
              precision macro meal planning, and interactive BMI diagnostics.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <button
                onClick={() => scrollTo('workouts')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/25 transition-all hover:-translate-y-0.5 hover:from-emerald-300 hover:to-cyan-300 hover:shadow-emerald-500/40 sm:w-auto"
              >
                <Zap className="h-4 w-4 fill-slate-950 stroke-[2.5]" />
                Explore Workouts
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => scrollTo('dashboard')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/90 px-6 py-3.5 text-sm font-semibold text-slate-200 shadow-lg shadow-black/20 transition-all hover:border-slate-600 hover:bg-slate-800 sm:w-auto"
              >
                <Activity className="h-4 w-4 text-cyan-400" />
                Live Dashboard
              </button>

              <button
                onClick={() => scrollTo('bmi')}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium text-slate-400 transition-colors hover:text-emerald-400"
              >
                BMI Calculator →
              </button>
            </div>

            {/* Feature ticks */}
            <div className="mx-auto grid max-w-lg grid-cols-2 gap-3 pt-2 text-left sm:grid-cols-3 lg:mx-0">
              {['Daily Steps & Kcal', 'Guided Exercises', 'Macro Meal Plans'].map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  <span className="text-xs font-medium text-slate-300">{f}</span>
                </div>
              ))}
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start">
              <div className="flex -space-x-2 shrink-0">
                {[
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face&auto=format',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face&auto=format',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face&auto=format',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face&auto=format',
                ].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border-2 border-slate-900 object-cover" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-bold text-amber-400">★ 4.9/5</span>
                <span className="ml-1.5 text-slate-400">· 25,000+ active athletes</span>
              </div>
            </div>
          </div>

          {/* ── Right: HD image + live stats card ── */}
          <div className="lg:col-span-6 w-full min-w-0">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-emerald-950/40 border border-slate-700/60">

              {/* HD athlete photo */}
              <div className="relative h-56 sm:h-72 w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=85&fit=crop&auto=format"
                  alt="Fitness athlete training"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90" />

                {/* Overlay stats row on photo */}
                <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-4">
                  <div className="flex items-center gap-1.5 rounded-xl border border-emerald-500/40 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
                    <Footprints className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-black text-white">{stats.steps.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400">steps</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/40 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
                    <Flame className="h-4 w-4 text-amber-400" />
                    <span className="text-xs font-black text-white">{stats.calories}</span>
                    <span className="text-[10px] text-slate-400">kcal</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
                    <Heart className="h-4 w-4 animate-pulse text-rose-400" />
                    <span className="text-xs font-black text-white">{stats.heartRate}</span>
                    <span className="text-[10px] text-slate-400">bpm</span>
                  </div>
                </div>
              </div>

              {/* Live biometrics panel */}
              <div className="bg-slate-900/95 px-5 py-5 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Today's Biometric Pulse</p>
                      <p className="text-[11px] text-slate-400">Syncing live activity</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>

                {/* Step ring + workout mins */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Step progress ring */}
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                    <div className="relative h-14 w-14 shrink-0">
                      <svg className="h-14 w-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" stroke="#1e293b" strokeWidth="5" fill="none" />
                        <circle
                          cx="28" cy="28" r="22"
                          stroke="#10b981" strokeWidth="5" fill="none"
                          strokeLinecap="round"
                          strokeDasharray={138.2}
                          strokeDashoffset={138.2 - (138.2 * Math.min(1, stats.steps / 10000))}
                          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[11px] font-black text-white">
                          {Math.round((stats.steps / 10000) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-400">Steps Goal</p>
                      <p className="text-base font-black text-white">{(stats.steps / 1000).toFixed(1)}k</p>
                      <p className="text-[10px] text-slate-500">of 10,000</p>
                    </div>
                  </div>

                  {/* Workout time */}
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-400">Workout</p>
                      <p className="text-base font-black text-white">{stats.workoutMinutes}<span className="text-xs font-normal text-slate-400"> m</span></p>
                      <p className="text-[10px] text-slate-500">Active today</p>
                    </div>
                  </div>
                </div>

                {/* Streak badge */}
                <div className="flex items-center justify-between rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-transparent p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-emerald-500 p-1.5 text-slate-950">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">14-Day Workout Streak!</p>
                      <p className="text-[11px] text-slate-300">Top 5% of active users</p>
                    </div>
                  </div>
                  <span className="text-sm font-black text-emerald-400">🔥 14d</span>
                </div>

              </div>
            </div>

            {/* Floating trend badge — only on lg+ so no overflow risk */}
            <div className="hidden lg:flex absolute -top-4 -right-4 items-center gap-2.5 rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-xl backdrop-blur-md animate-float">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400">Weekly Gain</p>
                <p className="text-xs font-bold text-emerald-400">+14% Performance</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
