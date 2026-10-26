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
  ChevronRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Workouts({ 
  workouts, 
  onSelectWorkout, 
  onToggleComplete 
}) {
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

  const filteredWorkouts = workouts.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesDifficulty = filterDifficulty === 'all' || item.difficulty === filterDifficulty;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetMuscles.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyBadge = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Intermediate':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Advanced':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleQuickToggle = (e, workout) => {
    e.stopPropagation();
    if (!workout.completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
    onToggleComplete(workout.id);
  };

  return (
    <section id="workouts" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Dumbbell className="w-3.5 h-3.5" />
              Comprehensive Training Protocols
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Curated Workout Regimens
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Target specific muscle groups, burn fat, improve endurance, and boost flexibility with step-by-step guidance.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>
              {workouts.filter((w) => w.completed).length} of {workouts.length} completed
            </span>
          </div>
        </div>

        {/* Filter Controls: Category Tabs + Search + Difficulty */}
        <div className="space-y-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Difficulty Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search workouts by name or muscle (e.g. Quads, Tabata, Core)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 text-xs sm:text-sm focus:outline-none focus:border-emerald-500/60"
              >
                {difficulties.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff === 'all' ? 'All Difficulties' : diff}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Workouts Grid */}
        {filteredWorkouts.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Dumbbell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No workouts match your filter</h3>
            <p className="text-xs text-slate-400 mt-1">Try resetting your search query or category filters.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setFilterDifficulty('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => {
              return (
                <div
                  key={workout.id}
                  onClick={() => onSelectWorkout(workout)}
                  className={`group relative bg-slate-900/90 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 shadow-xl cursor-pointer overflow-hidden flex flex-col justify-between ${
                    workout.completed
                      ? 'border-emerald-500/40 hover:border-emerald-500'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Top card accent line */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${workout.color || 'from-emerald-400 to-cyan-400'}`} />

                  <div className="p-6 space-y-4">
                    {/* Category & Difficulty Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{workout.thumbnail}</span>
                        <div>
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {workout.categoryName}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getDifficultyBadge(
                          workout.difficulty
                        )}`}
                      >
                        {workout.difficulty}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        {workout.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {workout.description}
                      </p>
                    </div>

                    {/* Core metrics: Duration & Burn */}
                    <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-800/80">
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                        <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{workout.duration} Mins</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
                        <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>

                    {/* Target Muscles */}
                    <div className="flex flex-wrap gap-1.5">
                      {workout.targetMuscles.slice(0, 3).map((muscle, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-950 text-slate-300 border border-slate-800"
                        >
                          {muscle}
                        </span>
                      ))}
                      {workout.targetMuscles.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] text-slate-500">
                          +{workout.targetMuscles.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Progress Indicator */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">Progress</span>
                        <span className={workout.completed ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                          {workout.completed ? '100% (Completed)' : `${workout.progress}%`}
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            workout.completed ? 'bg-emerald-400' : 'bg-cyan-400'
                          }`}
                          style={{ width: `${workout.completed ? 100 : workout.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => handleQuickToggle(e, workout)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        workout.completed
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                      title={workout.completed ? 'Mark as Incomplete' : 'Quick mark as completed'}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${workout.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                      <span>{workout.completed ? 'Done' : 'Mark Done'}</span>
                    </button>

                    <button
                      onClick={() => onSelectWorkout(workout)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-sm transition-all"
                    >
                      <Play className="w-3 h-3 fill-slate-950" />
                      <span>Start Routine</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
