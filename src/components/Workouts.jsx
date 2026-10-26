import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Clock,
  Play,
  CheckCircle2,
  Search,
  Filter,
  Sparkles,
  Activity,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const CATEGORY_IMAGES = {
  cardio:
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80&fit=crop&auto=format',
  strength:
    'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=700&q=80&fit=crop&auto=format',
  yoga:
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=700&q=80&fit=crop&auto=format',
  hiit:
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=700&q=80&fit=crop&auto=format',
};

const DIFFICULTY_STYLES = {
  Beginner: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Advanced: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
};

export default function Workouts({ workouts, onSelectWorkout, onToggleComplete }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'cardio', label: 'Cardio' },
    { id: 'strength', label: 'Strength Training' },
    { id: 'yoga', label: 'Yoga & Mobility' },
    { id: 'hiit', label: 'HIIT & Burn' },
  ];

  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  const filtered = workouts.filter((w) => {
    const matchCat = selectedCategory === 'all' || w.category === selectedCategory;
    const matchDiff = filterDifficulty === 'all' || w.difficulty === filterDifficulty;
    const q = searchQuery.toLowerCase();
    const matchSearch =
      w.title.toLowerCase().includes(q) ||
      w.categoryName.toLowerCase().includes(q) ||
      w.targetMuscles.some((m) => m.toLowerCase().includes(q));
    return matchCat && matchDiff && matchSearch;
  });

  const handleQuickToggle = (e, workout) => {
    e.stopPropagation();
    if (!workout.completed) confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    onToggleComplete(workout.id);
  };

  return (
    <section
      id="workouts"
      className="w-full overflow-x-hidden border-t border-slate-800/80 bg-slate-950 py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 min-w-0">

        {/* ── Section header ── */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              <Dumbbell className="h-3.5 w-3.5" />
              Comprehensive Training Protocols
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
              Curated Workout Regimens
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-400 sm:text-base">
              Target specific muscle groups, burn fat, and boost flexibility with step-by-step guidance.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-xs font-medium text-slate-400">
            <Activity className="h-4 w-4 text-emerald-400" />
            {workouts.filter((w) => w.completed).length} of {workouts.length} completed
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="mb-8 space-y-4">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'border border-slate-800 bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search + difficulty */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name or muscle group…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500/60 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="hidden h-4 w-4 shrink-0 text-slate-400 sm:block" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 px-3.5 py-2.5 text-sm text-slate-300 focus:border-emerald-500/60 focus:outline-none sm:w-auto"
              >
                {difficulties.map((d) => (
                  <option key={d} value={d}>{d === 'all' ? 'All Difficulties' : d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 py-16 text-center">
            <Dumbbell className="mx-auto mb-3 h-12 w-12 text-slate-600" />
            <h3 className="text-lg font-bold text-white">No workouts match your filter</h3>
            <p className="mt-1 text-xs text-slate-400">Try resetting your search or category filters.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setFilterDifficulty('all'); }}
              className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-400"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((workout) => (
              <div
                key={workout.id}
                onClick={() => onSelectWorkout(workout)}
                className={`group flex cursor-pointer flex-col overflow-hidden rounded-2xl border shadow-xl transition-all duration-300 hover:-translate-y-1.5 ${
                  workout.completed
                    ? 'border-emerald-500/40 bg-slate-900/90 hover:border-emerald-500'
                    : 'border-slate-800 bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                {/* HD photo banner */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[workout.category] || CATEGORY_IMAGES.cardio}
                    alt={workout.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />

                  {/* Bottom overlay: emoji + difficulty */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-2xl drop-shadow-lg">{workout.thumbnail}</span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-sm ${DIFFICULTY_STYLES[workout.difficulty] || 'bg-slate-800 text-slate-300 border-slate-700'}`}>
                      {workout.difficulty}
                    </span>
                  </div>

                  {/* Category label top-left */}
                  <span className="absolute left-3 top-3 rounded-lg border border-slate-700/60 bg-slate-950/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-sm">
                    {workout.categoryName}
                  </span>

                  {/* Completed checkmark */}
                  {workout.completed && (
                    <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
                      <CheckCircle2 className="h-4 w-4 stroke-[3]" />
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-3">
                    <h3 className="line-clamp-1 text-base font-bold text-white transition-colors group-hover:text-emerald-300">
                      {workout.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                      {workout.description}
                    </p>

                    {/* Duration / Calories row */}
                    <div className="grid grid-cols-2 gap-3 border-y border-slate-800/80 py-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <Clock className="h-4 w-4 shrink-0 text-cyan-400" />
                        {workout.duration} Mins
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <Flame className="h-4 w-4 shrink-0 text-amber-400" />
                        {workout.calories} kcal
                      </div>
                    </div>

                    {/* Muscle tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {workout.targetMuscles.slice(0, 3).map((m, i) => (
                        <span key={i} className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          {m}
                        </span>
                      ))}
                      {workout.targetMuscles.length > 3 && (
                        <span className="text-[10px] text-slate-500 px-1">+{workout.targetMuscles.length - 3}</span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-slate-400">Progress</span>
                        <span className={workout.completed ? 'font-bold text-emerald-400' : 'text-slate-400'}>
                          {workout.completed ? '100% Done ✓' : `${workout.progress}%`}
                        </span>
                      </div>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${workout.completed ? 'bg-emerald-400' : 'bg-cyan-400'}`}
                          style={{ width: `${workout.completed ? 100 : workout.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action footer */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-800/80 pt-4">
                    <button
                      onClick={(e) => handleQuickToggle(e, workout)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                        workout.completed
                          ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                      }`}
                    >
                      <CheckCircle2 className={`h-3.5 w-3.5 ${workout.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                      {workout.completed ? 'Done' : 'Mark Done'}
                    </button>

                    <button
                      onClick={() => onSelectWorkout(workout)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow-sm transition-all hover:from-emerald-300 hover:to-cyan-300"
                    >
                      <Play className="h-3 w-3 fill-slate-950" />
                      Start Routine
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
