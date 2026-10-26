import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Flame, 
  Footprints, 
  Scale, 
  Award, 
  Calendar, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { weeklyProgressData, monthlyWeightTrend, fitnessMilestones } from '../data/progressData';

export default function Progress() {
  const [activeMetric, setActiveMetric] = useState('steps'); // 'steps' | 'calories'
  const [hoveredDay, setHoveredDay] = useState(null);

  // Compute Weekly totals & averages
  const totalSteps = weeklyProgressData.reduce((acc, d) => acc + d.steps, 0);
  const avgSteps = Math.round(totalSteps / weeklyProgressData.length);
  const totalCalories = weeklyProgressData.reduce((acc, d) => acc + d.calories, 0);
  const avgCalories = Math.round(totalCalories / weeklyProgressData.length);

  const maxStepValue = Math.max(...weeklyProgressData.map((d) => d.steps), 15000);
  const maxCalorieValue = Math.max(...weeklyProgressData.map((d) => d.calories), 900);

  return (
    <section id="progress" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80 w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Progress Analytics & Trends
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Visual Progress & Performance
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Gain granular insights into your weekly volume, caloric deficit, step consistency, and body composition changes.
            </p>
          </div>

          {/* Metric switcher tabs */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveMetric('steps')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === 'steps'
                  ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Footprints className="w-3.5 h-3.5" />
              Steps Volume
            </button>
            <button
              onClick={() => setActiveMetric('calories')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMetric === 'calories'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Calorie Burn
            </button>
          </div>
        </div>

        {/* Top 3 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 shadow-lg">
            <span className="text-xs font-medium text-slate-400">Weekly Total Steps</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {totalSteps.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.4%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Daily avg: {avgSteps.toLocaleString()} steps</p>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 shadow-lg">
            <span className="text-xs font-medium text-slate-400">Active Caloric Expenditure</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {totalCalories.toLocaleString()} <span className="text-sm font-normal text-slate-400">kcal</span>
              </span>
              <span className="text-xs font-semibold text-amber-400 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +8.1%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Daily avg: {avgCalories} kcal burned</p>
          </div>

          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 shadow-lg">
            <span className="text-xs font-medium text-slate-400">Bodyweight Transformation</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                -1.9 <span className="text-sm font-normal text-slate-400">kg in 30d</span>
              </span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                Target pace
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Body fat dropped from 19.8% to 18.2%</p>
          </div>
        </div>

        {/* ── HD Motivational Banner ── */}
        <div className="relative w-full h-36 sm:h-44 rounded-2xl overflow-hidden mb-8 shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=85&fit=crop&auto=format"
            alt="Athlete tracking progress"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-950/65 flex items-center px-6 sm:px-10">
            <div className="flex items-center gap-4">
              <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 shrink-0" />
              <div>
                <p className="text-white font-black text-base sm:text-xl leading-tight">
                  Your Performance Is Trending Up 📈
                </p>
                <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                  Consistent effort compounds into extraordinary results.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Charts Grid: Bar Chart & Dual Trend Area Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Interactive Weekly Bar Chart */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {activeMetric === 'steps' ? 'Daily Step Cadence (Mon – Sun)' : 'Active Calorie Burn (Mon – Sun)'}
                  </h3>
                  <p className="text-xs text-slate-400">Hover over bars to inspect daily details</p>
                </div>
              </div>

              {hoveredDay && (
                <div className="text-right animate-fade-in">
                  <span className="text-[11px] font-bold text-slate-400">{hoveredDay.day}: </span>
                  <span className="text-xs font-black text-white">
                    {activeMetric === 'steps'
                      ? `${hoveredDay.steps.toLocaleString()} steps`
                      : `${hoveredDay.calories} kcal`}
                  </span>
                </div>
              )}
            </div>

            {/* SVG / Styled Bar Visualizer */}
            <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-6 px-2">
              {weeklyProgressData.map((d, idx) => {
                const value = activeMetric === 'steps' ? d.steps : d.calories;
                const maxValue = activeMetric === 'steps' ? maxStepValue : maxCalorieValue;
                const heightPercent = Math.min(100, Math.round((value / maxValue) * 100));
                const isGoalMet = activeMetric === 'steps' ? d.steps >= 10000 : d.calories >= 600;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                    onMouseEnter={() => setHoveredDay(d)}
                    onMouseLeave={() => setHoveredDay(null)}
                  >
                    {/* Tooltip hint on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 text-[10px] font-bold bg-slate-800 text-slate-200 px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                      {activeMetric === 'steps' ? `${(value / 1000).toFixed(1)}k` : `${value}k`}
                    </div>

                    {/* Bar Pill */}
                    <div className="w-full bg-slate-900 rounded-t-xl h-full flex flex-col justify-end p-1 overflow-hidden">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          activeMetric === 'steps'
                            ? isGoalMet
                              ? 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-125'
                              : 'bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-emerald-700 group-hover:to-teal-500'
                            : isGoalMet
                            ? 'bg-gradient-to-t from-amber-600 to-rose-500 group-hover:brightness-125'
                            : 'bg-gradient-to-t from-slate-700 to-slate-500 group-hover:from-amber-700 group-hover:to-rose-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    {/* Day label */}
                    <span className="text-xs font-semibold text-slate-400 group-hover:text-white transition-colors mt-2">
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Target Reached (10k+ steps / 600+ kcal)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span>Under Target</span>
              </div>
            </div>
          </div>

          {/* Calorie Burn vs Calorie Intake Smooth Area Trend */}
          <div className="lg:col-span-5 bg-slate-950/90 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Weight & Body Fat Trajectory</h3>
                    <p className="text-xs text-slate-400">Last 4 Weeks Progress</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  -1.9 kg
                </span>
              </div>

              {/* Step progression table */}
              <div className="space-y-3 pt-2">
                {monthlyWeightTrend.map((row, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span className="font-semibold text-slate-300">{row.week}</span>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">Weight</span>
                        <span className="font-bold text-white text-xs">{row.weight} kg</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block">Body Fat</span>
                        <span className="font-bold text-emerald-400 text-xs">{row.fatPercent}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 mt-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Current Body Weight: 76.5 kg</p>
                <p className="text-[11px] text-slate-400">Healthy rate of 0.45 kg loss per week</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            </div>
          </div>

        </div>

        {/* Milestones & Badges Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl font-bold text-white">Unlocked Milestone Badges</h3>
            </div>
            <span className="text-xs text-slate-400">4 of 8 Unlocked</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {fitnessMilestones.map((milestone) => (
              <div
                key={milestone.id}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-500/40 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{milestone.icon}</span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {milestone.level}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{milestone.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">{milestone.description}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{milestone.category}</span>
                  <span className="text-emerald-400 font-semibold">{milestone.unlockedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
