import React, { useState } from 'react';
import { 
  X, 
  Footprints, 
  Flame, 
  Clock, 
  Droplets, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

export default function QuickLogModal({ isOpen, onClose, onLog }) {
  if (!isOpen) return null;

  const [stepsToAdd, setStepsToAdd] = useState('1500');
  const [caloriesToAdd, setCaloriesToAdd] = useState('180');
  const [minutesToAdd, setMinutesToAdd] = useState('25');
  const [waterToAdd, setWaterToAdd] = useState('500');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLog({
      steps: Number(stepsToAdd) || 0,
      calories: Number(caloriesToAdd) || 0,
      workoutMinutes: Number(minutesToAdd) || 0,
      water: Number(waterToAdd) || 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Quick Log Daily Activity</h3>
              <p className="text-xs text-slate-400">Instantly increment your live biometric stats</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
              <Footprints className="w-4 h-4 text-emerald-400" />
              <span>Add Steps</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="100"
                value={stepsToAdd}
                onChange={(e) => setStepsToAdd(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
              />
              <span className="text-xs text-slate-400 shrink-0">steps</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Add Active Calories</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                step="20"
                value={caloriesToAdd}
                onChange={(e) => setCaloriesToAdd(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
              />
              <span className="text-xs text-slate-400 shrink-0">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Workout</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="5"
                  value={minutesToAdd}
                  onChange={(e) => setMinutesToAdd(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                />
                <span className="text-xs text-slate-400 shrink-0">mins</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-1">
                <Droplets className="w-4 h-4 text-blue-400" />
                <span>Water</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={waterToAdd}
                  onChange={(e) => setWaterToAdd(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                />
                <span className="text-xs text-slate-400 shrink-0">ml</span>
              </div>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-md transition-all cursor-pointer"
            >
              Update Dashboard
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
