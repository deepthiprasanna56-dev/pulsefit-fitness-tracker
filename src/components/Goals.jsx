import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Trophy, 
  Flame, 
  Footprints, 
  Dumbbell, 
  Droplet, 
  Clock, 
  X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialGoals } from '../data/goalsData';

export default function Goals({ onGoalUpdated }) {
  const [goals, setGoals] = useState(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Activity');
  const [newTarget, setNewTarget] = useState('');
  const [newUnit, setNewUnit] = useState('steps');
  const [newBadge, setNewBadge] = useState('Weekly');

  const toggleComplete = (id) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const nextState = !g.completed;
          if (nextState) {
            confetti({
              particleCount: 65,
              spread: 60,
              origin: { y: 0.7 },
            });
            onGoalUpdated(`Goal "${g.title}" marked as completed! 🏆`);
          }
          return {
            ...g,
            completed: nextState,
            current: nextState ? g.target : g.current,
          };
        }
        return g;
      })
    );
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newTarget) return;

    const newGoalItem = {
      id: `g-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      current: 0,
      target: Number(newTarget),
      unit: newUnit,
      daysLeft: '7 days left',
      badge: newBadge,
      color: 'emerald',
      completed: false,
    };

    setGoals([newGoalItem, ...goals]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewTarget('');
    onGoalUpdated(`New goal "${newGoalItem.title}" created successfully!`);
  };

  const completedCount = goals.filter((g) => g.completed).length;

  return (
    <section id="goals" className="py-20 bg-slate-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Target className="w-3.5 h-3.5" />
              Target Milestones & Commitment
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Personalized Fitness Goals
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Set milestones, hold yourself accountable, and track real-time completion rates as you conquer new physical peaks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-2 rounded-xl border border-emerald-500/20 flex items-center gap-1.5">
              <Trophy className="w-4 h-4" />
              {completedCount} of {goals.length} Achieved
            </span>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Create New Goal</span>
            </button>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const percent = Math.min(100, Math.round((goal.current / goal.target) * 100));

            return (
              <div
                key={goal.id}
                className={`p-6 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  goal.completed
                    ? 'bg-slate-900/90 border-emerald-500/40'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-900 text-slate-400 border border-slate-800">
                      {goal.badge} • {goal.category}
                    </span>

                    <button
                      onClick={() => toggleComplete(goal.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        goal.completed
                          ? 'text-emerald-400 hover:text-emerald-300'
                          : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
                    >
                      {goal.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold mb-2 ${goal.completed ? 'text-emerald-300 line-through' : 'text-white'}`}>
                    {goal.title}
                  </h3>

                  {/* Metric Counters */}
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl font-black text-white">
                      {typeof goal.current === 'number' ? goal.current.toLocaleString() : goal.current}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {typeof goal.target === 'number' ? goal.target.toLocaleString() : goal.target} {goal.unit}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 mb-3 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-700 ${
                        goal.completed
                          ? 'bg-emerald-400'
                          : percent >= 75
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>

                {/* Footer status */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                  <span className={`font-semibold ${goal.completed ? 'text-emerald-400' : 'text-slate-400'}`}>
                    {percent}% Completed
                  </span>
                  <span className="text-slate-500">{goal.daysLeft}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Add New Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-400" />
                <span>Create New Fitness Goal</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Burn 4,000 kcal, Run 20 km..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm focus:border-emerald-500 outline-none"
                  >
                    <option value="Activity">Activity / Steps</option>
                    <option value="Cardio & Burn">Cardio & Burn</option>
                    <option value="Strength">Strength Training</option>
                    <option value="Wellness">Wellness / Water</option>
                    <option value="Recovery">Recovery</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Frequency
                  </label>
                  <select
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 text-sm focus:border-emerald-500 outline-none"
                  >
                    <option value="Daily">Daily Goal</option>
                    <option value="Weekly">Weekly Goal</option>
                    <option value="Monthly">Monthly Milestone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Target Number
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 10000"
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-1">
                    Unit
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="steps, kcal, km, sessions"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md transition-all"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
