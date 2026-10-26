import React from 'react';
import { 
  Footprints, 
  Flame, 
  Clock, 
  Heart, 
  Droplets, 
  Moon, 
  Plus, 
  Minus, 
  TrendingUp, 
  Sparkles, 
  Check, 
  ChevronRight,
  BatteryCharging
} from 'lucide-react';

export default function Dashboard({ stats, onUpdateStats, onQuickLogOpen }) {
  const stepTarget = 10000;
  const calorieTarget = 800;
  const workoutTarget = 60;
  const waterTarget = 3000; // ml

  const stepPercent = Math.min(100, Math.round((stats.steps / stepTarget) * 100));
  const caloriePercent = Math.min(100, Math.round((stats.calories / calorieTarget) * 100));
  const workoutPercent = Math.min(100, Math.round((stats.workoutMinutes / workoutTarget) * 100));
  const waterPercent = Math.min(100, Math.round((stats.water / waterTarget) * 100));

  const handleWaterAdd = (amount) => {
    const newWater = Math.max(0, stats.water + amount);
    onUpdateStats({ water: newWater }, amount > 0 ? `Added ${amount}ml of water 💧` : `Removed ${Math.abs(amount)}ml of water`);
  };

  return (
    <section id="dashboard" className="py-20 bg-slate-900/60 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Real-Time Biometrics
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Fitness Command Center
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
              Track daily steps, active caloric output, cardiovascular pulse, workout volume, and hydration status in one unified dashboard.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onQuickLogOpen}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/40"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Log Daily Activity</span>
            </button>
          </div>
        </div>

        {/* Top 4 Key Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Card 1: Daily Steps */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Steps</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Footprints className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-3xl font-black text-white tracking-tight">
                {stats.steps.toLocaleString()}
              </span>
              <span className="text-xs font-medium text-slate-400">
                / {stepTarget.toLocaleString()}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${stepPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-emerald-400 font-semibold">{stepPercent}% achieved</span>
              <span>~{((stats.steps * 0.75) / 1000).toFixed(1)} km walked</span>
            </div>
          </div>

          {/* Card 2: Calories Burned */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories Burned</span>
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-3xl font-black text-white tracking-tight">
                {stats.calories}
              </span>
              <span className="text-xs font-medium text-slate-400">
                / {calorieTarget} kcal
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-rose-500 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${caloriePercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-semibold">{caloriePercent}% of daily burn</span>
              <span>Basal: ~1,850 kcal</span>
            </div>
          </div>

          {/* Card 3: Workout Duration */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Workout Time</span>
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-3xl font-black text-white tracking-tight">
                {stats.workoutMinutes} <span className="text-lg font-bold text-slate-400">m</span>
              </span>
              <span className="text-xs font-medium text-slate-400">
                / {workoutTarget} mins
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full transition-all duration-700"
                style={{ width: `${workoutPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="text-cyan-400 font-semibold">{workoutPercent}% completed</span>
              <span>2 Sessions logged</span>
            </div>
          </div>

          {/* Card 4: Heart Rate Pulse */}
          <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 hover:border-rose-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Resting Heart Rate</span>
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center group-hover:scale-110 transition-transform animate-pulse">
                <Heart className="w-5 h-5 fill-rose-500/20" />
              </div>
            </div>

            <div className="flex items-baseline justify-between mb-3">
              <span className="text-3xl font-black text-white tracking-tight">
                {stats.heartRate} <span className="text-base font-medium text-slate-400">BPM</span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                Normal / Optimal
              </span>
            </div>

            {/* Animated Heart Rhythm SVG Line */}
            <div className="h-8 flex items-center mb-2 overflow-hidden">
              <svg className="w-full h-8 text-rose-400" viewBox="0 0 200 40" fill="none">
                <path
                  d="M0 20 L40 20 L50 20 L58 6 L66 34 L74 12 L82 26 L90 20 L130 20 L138 8 L146 32 L154 16 L162 20 L200 20"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Peak today: 142 BPM</span>
              <span>Zone 2 Cardio target</span>
            </div>
          </div>

        </div>

        {/* Secondary Row: Interactive Hydration Tracker & Recovery Sleep */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Hydration Tracker */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Interactive Water Intake Tracker</h3>
                  <p className="text-xs text-slate-400">Stay hydrated to maintain cellular performance</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/20">
                  {stats.water} / {waterTarget} ml ({waterPercent}%)
                </span>
              </div>
            </div>

            <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Visual Water Bottle Fill */}
              <div className="md:col-span-4 flex flex-col items-center justify-center">
                <div className="relative w-20 h-36 rounded-2xl border-2 border-cyan-500/40 bg-slate-900/90 overflow-hidden flex flex-col justify-end p-1 shadow-inner">
                  <div
                    className="w-full bg-gradient-to-t from-cyan-600 via-cyan-400 to-teal-300 rounded-xl transition-all duration-500 opacity-80"
                    style={{ height: `${Math.max(5, waterPercent)}%` }}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-lg font-black text-white drop-shadow">
                      {(stats.water / 1000).toFixed(2)}L
                    </span>
                    <span className="text-[10px] text-cyan-200 font-semibold drop-shadow">
                      {waterPercent}% Goal
                    </span>
                  </div>
                </div>
              </div>

              {/* Water logging quick action buttons */}
              <div className="md:col-span-8 space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Drinking water helps transport oxygen to muscles, prevents cramping, and optimizes metabolic rate. Log your glasses below:
                </p>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => handleWaterAdd(250)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/30 transition-all hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    +250ml Glass
                  </button>

                  <button
                    onClick={() => handleWaterAdd(500)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-all hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    +500ml Bottle
                  </button>

                  <button
                    onClick={() => handleWaterAdd(750)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 transition-all hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    +750ml Shaker
                  </button>

                  <button
                    onClick={() => handleWaterAdd(-250)}
                    disabled={stats.water <= 0}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-40 transition-all"
                    title="Undo 250ml"
                  >
                    <Minus className="w-3.5 h-3.5" />
                    -250ml
                  </button>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${waterPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recovery, Sleep & Readiness Score */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                    <Moon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Sleep & Body Battery</h3>
                    <p className="text-xs text-slate-400">Circadian recovery index</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                  88% Optimal
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Last Night's Sleep</span>
                  <p className="text-xl font-extrabold text-white mt-1">7h 45m</p>
                  <p className="text-[11px] text-emerald-400 font-medium mt-0.5">Deep: 2h 10m (28%)</p>
                </div>

                <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 font-medium">Training Readiness</span>
                  <p className="text-xl font-extrabold text-emerald-400 mt-1">Prime</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">HRV: 68 ms (High)</p>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BatteryCharging className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-medium">Ready for high-intensity training today</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold">100%</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
