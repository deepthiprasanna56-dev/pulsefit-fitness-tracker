import React from 'react';
import { 
  Play, 
  Flame, 
  Footprints, 
  Heart, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Activity, 
  Sparkles 
} from 'lucide-react';

export default function Hero({ stats }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 72;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-950 w-full">
      {/* Background Glow Accents — capped so they never cause horizontal scroll */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(600px,100vw)] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[min(400px,80vw)] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[min(450px,80vw)] h-[350px] bg-emerald-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 shadow-inner backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Next-Generation Fitness & Health Suite
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Elevate Your Physique. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Track Every Pulse.
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Achieve peak fitness with real-time biometric tracking, high-yield workout routines, precision macro meal planning, and interactive BMI diagnostics. Built for modern high performers.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => scrollTo('workouts')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950 stroke-[2.5]" />
                <span>Explore Workouts</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                onClick={() => scrollTo('dashboard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200 cursor-pointer shadow-lg shadow-black/20"
              >
                <Activity className="w-4 h-4 text-cyan-400" />
                <span>Open Live Dashboard</span>
              </button>

              <button
                onClick={() => scrollTo('bmi')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl font-medium text-xs text-slate-400 hover:text-emerald-400 hover:bg-slate-900/50 transition-colors"
              >
                <span>BMI Calculator</span>
                <span className="text-slate-600">→</span>
              </button>
            </div>

            {/* Feature Bullets & Trust metrics */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Daily Steps & Kcal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Guided Exercises</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-slate-300">Macro Meal Plans</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2 shrink-0">
                {['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'].map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <div className="text-left text-xs">
                <div className="flex flex-wrap items-center gap-1 text-amber-400 font-bold">
                  <span>★ 4.9/5 Rating</span>
                  <span className="text-slate-500 font-normal">|</span>
                  <span className="text-slate-300 font-normal">25,000+ active athletes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Dashboard Glassmorphism Card Showcase */}
          <div className="lg:col-span-5 relative overflow-hidden">
            
            {/* Main Interactive Floating Display */}
            <div className="relative mx-auto max-w-md lg:max-w-none px-4 sm:px-0">
              
              {/* Outer decorative gradient border */}
              <div className="p-1 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800/80 to-emerald-500/30 shadow-2xl shadow-emerald-950/40">
                <div className="bg-slate-900/95 backdrop-blur-xl rounded-[22px] p-6 space-y-5 border border-slate-800">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold text-white">Today's Biometric Pulse</h2>
                        <p className="text-xs text-slate-400">Syncing live activity</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>

                  {/* Circular Step Progress Ring & Quick Stats */}
                  <div className="grid grid-cols-2 gap-4 items-center bg-slate-950/60 rounded-2xl p-4 border border-slate-800/80">
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-28 h-28 flex items-center justify-center">
                        <svg className="w-28 h-28 -rotate-90 transform" viewBox="0 0 100 100">
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-slate-800"
                            strokeWidth="8"
                            stroke="currentColor"
                            fill="transparent"
                          />
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            className="text-emerald-400"
                            strokeWidth="8"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * (stats.steps / 10000))}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <Footprints className="w-4 h-4 text-emerald-400 mb-0.5" />
                          <span className="text-lg font-black text-white">{Math.round((stats.steps / 10000) * 100)}%</span>
                          <span className="text-[10px] text-slate-400 font-medium">Goal</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-slate-400 font-medium">Daily Steps</p>
                        <p className="text-2xl font-black text-white tracking-tight">
                          {stats.steps.toLocaleString()}
                        </p>
                        <p className="text-[11px] text-slate-500">Target: 10,000 steps</p>
                      </div>
                      <div className="pt-1">
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                          +1,240 vs yesterday
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dual Stat Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Flame className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-medium">Active Burn</p>
                        <p className="text-lg font-bold text-white">{stats.calories} <span className="text-xs text-slate-400 font-normal">kcal</span></p>
                      </div>
                    </div>

                    <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800/80 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 animate-pulse">
                        <Heart className="w-5 h-5 fill-rose-500/20" />
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 font-medium">Heart Rate</p>
                        <p className="text-lg font-bold text-white">{stats.heartRate} <span className="text-xs text-slate-400 font-normal">bpm</span></p>
                      </div>
                    </div>
                  </div>

                  {/* Streak & Consistency Bar */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/15 via-cyan-500/10 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">14-Day Workout Streak!</p>
                        <p className="text-[11px] text-slate-300">You're in the top 5% of active users</p>
                      </div>
                    </div>
                    <span className="text-xs font-black text-emerald-400">🔥 14d</span>
                  </div>

                </div>
              </div>

              {/* Floating Orbiting Badges — hidden on mobile to prevent overflow */}
              <div className="hidden lg:flex absolute -top-5 -right-6 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md items-center gap-2.5 animate-float">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Weekly Gain</p>
                  <p className="text-xs font-bold text-emerald-400">+14% Performance</p>
                </div>
              </div>

              <div className="hidden lg:flex absolute -bottom-4 -left-6 p-3 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Workout Time</p>
                  <p className="text-xs font-bold text-cyan-300">{stats.workoutMinutes} Mins Logged</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
