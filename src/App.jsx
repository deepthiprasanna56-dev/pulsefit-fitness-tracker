import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import WorkoutModal from './components/WorkoutModal';
import Progress from './components/Progress';
import BMICalculator from './components/BMICalculator';
import Nutrition from './components/Nutrition';
import Goals from './components/Goals';
import Contact from './components/Contact';
import Footer from './components/Footer';
import QuickLogModal from './components/QuickLogModal';
import Toast from './components/Toast';
import { initialWorkouts } from './data/workoutData';

export default function App() {
  const [stats, setStats] = useState({
    steps: 8420,
    calories: 610,
    workoutMinutes: 52,
    heartRate: 74,
    water: 2250,
  });

  const [workouts, setWorkouts] = useState(initialWorkouts);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeSection, setActiveSection] = useState('home');

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, title = 'Activity Updated', type = 'success') => {
    setToast({ message, title, type });
  };

  // Scroll spy to detect active section
  useEffect(() => {
    const sections = ['home', 'dashboard', 'workouts', 'nutrition', 'progress', 'bmi', 'goals', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update biometric stats
  const handleUpdateStats = (updatedFields, message) => {
    setStats((prev) => ({ ...prev, ...updatedFields }));
    if (message) {
      showToast(message, 'Dashboard Synced', 'info');
    }
  };

  // Complete workout from modal
  const handleCompleteWorkout = (workoutId, calBurn, durationMin) => {
    setWorkouts((prev) =>
      prev.map((w) => (w.id === workoutId ? { ...w, completed: true, progress: 100 } : w))
    );

    setStats((prev) => ({
      ...prev,
      calories: prev.calories + calBurn,
      workoutMinutes: prev.workoutMinutes + durationMin,
    }));

    showToast(
      `Great effort! Burned +${calBurn} kcal and logged +${durationMin} mins to your daily totals.`,
      'Workout Completed! 🎉',
      'success'
    );
  };

  // Quick toggle workout completion from card
  const handleToggleWorkout = (workoutId) => {
    setWorkouts((prev) =>
      prev.map((w) => {
        if (w.id === workoutId) {
          const nextState = !w.completed;
          if (nextState) {
            setStats((s) => ({
              ...s,
              calories: s.calories + w.calories,
              workoutMinutes: s.workoutMinutes + w.duration,
            }));
            showToast(`Marked "${w.title}" as completed! (+${w.calories} kcal)`, 'Workout Finished', 'success');
          } else {
            setStats((s) => ({
              ...s,
              calories: Math.max(0, s.calories - w.calories),
              workoutMinutes: Math.max(0, s.workoutMinutes - w.duration),
            }));
            showToast(`Marked "${w.title}" as incomplete`, 'Updated', 'info');
          }
          return { ...w, completed: nextState, progress: nextState ? 100 : 0 };
        }
        return w;
      })
    );
  };

  // Meal logged handler
  const handleLogMeal = (meal) => {
    showToast(
      `Added "${meal.name}" (${meal.calories} kcal, ${meal.protein}g protein) to your daily nutrition diary!`,
      'Meal Logged 🥗',
      'success'
    );
  };

  // Quick Log modal submission
  const handleQuickLogSubmit = ({ steps, calories, workoutMinutes, water }) => {
    setStats((prev) => ({
      ...prev,
      steps: prev.steps + steps,
      calories: prev.calories + calories,
      workoutMinutes: prev.workoutMinutes + workoutMinutes,
      water: prev.water + water,
    }));

    showToast(
      `Logged: +${steps.toLocaleString()} steps, +${calories} kcal, +${workoutMinutes}m workout, +${water}ml water!`,
      'Activity Saved ⚡',
      'success'
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans antialiased">
      {/* Navigation Bar */}
      <Navbar
        activeSection={activeSection}
        onQuickLogOpen={() => setQuickLogOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero stats={stats} />

        {/* Dashboard Section */}
        <Dashboard
          stats={stats}
          onUpdateStats={handleUpdateStats}
          onQuickLogOpen={() => setQuickLogOpen(true)}
        />

        {/* Workouts Section */}
        <Workouts
          workouts={workouts}
          onSelectWorkout={(w) => setSelectedWorkout(w)}
          onToggleComplete={handleToggleWorkout}
        />

        {/* Nutrition Section */}
        <Nutrition onLogMeal={handleLogMeal} />

        {/* Progress & Trends Section */}
        <Progress />

        {/* BMI Calculator Section */}
        <BMICalculator />

        {/* Goals Section */}
        <Goals onGoalUpdated={(msg) => showToast(msg, 'Goals Updated', 'success')} />

        {/* Contact Section */}
        <Contact onSubmitMessage={(msg) => showToast(msg, 'Inquiry Sent', 'success')} />
      </main>

      {/* Footer */}
      <Footer onSubscribe={(msg) => showToast(msg, 'Newsletter Joined', 'success')} />

      {/* Workout Detail & Runner Modal */}
      {selectedWorkout && (
        <WorkoutModal
          workout={selectedWorkout}
          onClose={() => setSelectedWorkout(null)}
          onCompleteWorkout={handleCompleteWorkout}
        />
      )}

      {/* Quick Activity Logger Modal */}
      <QuickLogModal
        isOpen={quickLogOpen}
        onClose={() => setQuickLogOpen(false)}
        onLog={handleQuickLogSubmit}
      />

      {/* Interactive Toast Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
