import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Dumbbell, 
  Zap, 
  Award,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WorkoutModal({ workout, onClose, onCompleteWorkout }) {
  if (!workout) return null;

  const [secondsLeft, setSecondsLeft] = useState(workout.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isDone, setIsDone] = useState(workout.completed || false);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const toggleStep = (index) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter((i) => i !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const handleFinish = () => {
    setIsRunning(false);
    setIsDone(true);
    // Fire celebratory confetti!
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#6366F1'],
    });

    onCompleteWorkout(workout.id, workout.calories, workout.duration);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header Banner */}
        <div className={`p-6 bg-gradient-to-r ${workout.color || 'from-emerald-600 to-teal-700'} text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm">
              {workout.categoryName}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-sm">
              {workout.difficulty}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{workout.title}</h2>
          <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-lg">{workout.description}</p>

          <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-white/20 text-xs font-semibold">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {workout.duration} Minutes
            </span>
            <span className="flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> {workout.calories} kcal Burn
            </span>
            <span className="flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4" /> {workout.equipment}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Interactive Interval Timer */}
          <div className="bg-slate-950/80 rounded-2xl p-5 border border-slate-800 text-center">
            <p className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-1">
              Active Workout Timer
            </p>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-wider py-2">
              {formatTime(secondsLeft)}
            </div>

            <div className="flex items-center justify-center gap-3 mt-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Timer
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start Timer
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setSecondsLeft(workout.duration * 60);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                onClick={() => setSecondsLeft((prev) => prev + 60)}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                +1 Min
              </button>
            </div>
          </div>

          {/* Targeted Muscles */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Target Muscle Groups
            </h3>
            <div className="flex flex-wrap gap-2">
              {workout.targetMuscles.map((muscle, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/80 text-emerald-300 border border-slate-700"
                >
                  {muscle}
                </span>
              ))}
            </div>
          </div>

          {/* Exercise Step Guidance & Checklist */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Workout Sequence Checklist
              </h3>
              <span className="text-xs text-slate-400">
                {completedSteps.length} of {workout.steps.length} rounds checked
              </span>
            </div>

            <div className="space-y-2.5">
              {workout.steps.map((step, idx) => {
                const isChecked = completedSteps.includes(idx);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950'
                          : 'border-slate-600 bg-slate-900'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Completion Status Alert if Done */}
          {isDone && (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
              <Award className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-emerald-300">Workout Finished! 🎉</p>
                <p className="text-xs text-slate-300">
                  Calories burned (+{workout.calories} kcal) and active duration (+{workout.duration} min) have been credited to your daily dashboard!
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>

          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 shadow-lg shadow-emerald-500/25 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isDone ? 'Update Session' : 'Finish & Log Workout'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
