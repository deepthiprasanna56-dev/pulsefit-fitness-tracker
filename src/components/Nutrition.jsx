import React, { useState } from 'react';
import { 
  Utensils, 
  Flame, 
  Dumbbell, 
  Wheat, 
  Droplet, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Sparkles, 
  Apple, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { initialNutritionMeals, mealCategories, defaultDailyMacroTarget } from '../data/nutritionData';

export default function Nutrition({ onLogMeal }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [meals, setMeals] = useState(initialNutritionMeals);
  const [expandedMealId, setExpandedMealId] = useState(null);
  const [loggedMealIds, setLoggedMealIds] = useState([]);

  // Macro target state
  const [macroTargets, setMacroTargets] = useState(defaultDailyMacroTarget);

  const filteredMeals = meals.filter(
    (meal) => selectedCategory === 'all' || meal.category === selectedCategory
  );

  const toggleExpand = (id) => {
    setExpandedMealId(expandedMealId === id ? null : id);
  };

  const handleLog = (meal) => {
    if (!loggedMealIds.includes(meal.id)) {
      setLoggedMealIds([...loggedMealIds, meal.id]);
    }
    // Update daily macros
    setMacroTargets((prev) => ({
      ...prev,
      calories: { ...prev.calories, current: prev.calories.current + meal.calories },
      protein: { ...prev.protein, current: prev.protein.current + meal.protein },
      carbs: { ...prev.carbs, current: prev.carbs.current + meal.carbs },
      fat: { ...prev.fat, current: prev.fat.current + meal.fat },
    }));

    onLogMeal(meal);
  };

  return (
    <section id="nutrition" className="py-20 bg-slate-900/40 relative border-t border-slate-800/80 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Utensils className="w-3.5 h-3.5" />
              Nutritional Precision & Fueling
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Macro Meal Plans & Diet Tracking
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
              Optimize muscle protein synthesis, support metabolic rate, and track daily caloric targets with balanced chef-curated meals.
            </p>
          </div>

          <div className="text-xs text-slate-400 bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
            <Apple className="w-4 h-4 text-emerald-400" />
            <span>Target: 2,400 kcal | 160g Protein</span>
          </div>
        </div>

        {/* Daily Macronutrient Target Status Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          {/* Calories */}
          <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calories</span>
              <Flame className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl sm:text-2xl font-black text-white">
                {macroTargets.calories.current}
              </span>
              <span className="text-[11px] text-slate-400">/ {macroTargets.calories.target} kcal</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (macroTargets.calories.current / macroTargets.calories.target) * 100)}%` }}
              />
            </div>
          </div>

          {/* Protein */}
          <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Protein</span>
              <Dumbbell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl sm:text-2xl font-black text-white">
                {macroTargets.protein.current}g
              </span>
              <span className="text-[11px] text-slate-400">/ {macroTargets.protein.target}g</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (macroTargets.protein.current / macroTargets.protein.target) * 100)}%` }}
              />
            </div>
          </div>

          {/* Carbohydrates */}
          <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Carbs</span>
              <Wheat className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl sm:text-2xl font-black text-white">
                {macroTargets.carbs.current}g
              </span>
              <span className="text-[11px] text-slate-400">/ {macroTargets.carbs.target}g</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (macroTargets.carbs.current / macroTargets.carbs.target) * 100)}%` }}
              />
            </div>
          </div>

          {/* Healthy Fats */}
          <div className="bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Healthy Fats</span>
              <Droplet className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-xl sm:text-2xl font-black text-white">
                {macroTargets.fat.current}g
              </span>
              <span className="text-[11px] text-slate-400">/ {macroTargets.fat.target}g</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-purple-400 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (macroTargets.fat.current / macroTargets.fat.target) * 100)}%` }}
              />
            </div>
          </div>

        </div>

        {/* Diet Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {mealCategories.map((cat) => {
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
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => {
            const isExpanded = expandedMealId === meal.id;
            const isLogged = loggedMealIds.includes(meal.id);

            return (
              <div
                key={meal.id}
                className="bg-slate-950/90 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  {/* Top Bar: Meal Type badge + Calories */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{meal.image}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-emerald-400 border border-slate-700">
                        {meal.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>{meal.calories} kcal</span>
                    </div>
                  </div>

                  {/* Title & Highlight */}
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">{meal.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{meal.highlight}</p>
                  </div>

                  {/* Macronutrient Pills */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-800/80 text-center">
                    <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Protein</span>
                      <span className="text-xs font-bold text-emerald-400">{meal.protein}g</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Carbs</span>
                      <span className="text-xs font-bold text-cyan-400">{meal.carbs}g</span>
                    </div>
                    <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Fats</span>
                      <span className="text-xs font-bold text-purple-400">{meal.fat}g</span>
                    </div>
                  </div>

                  {/* Prep Time & Expandable Ingredients Toggle */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" /> {meal.prepTime}
                    </span>

                    <button
                      onClick={() => toggleExpand(meal.id)}
                      className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-medium text-[11px]"
                    >
                      <span>{isExpanded ? 'Hide Ingredients' : 'View Ingredients'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Expandable Ingredients Checklist */}
                  {isExpanded && (
                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5 animate-fade-in text-xs">
                      <p className="font-semibold text-white text-[11px] mb-1">Key Ingredients:</p>
                      {meal.ingredients.map((ing, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span>{ing}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    {isLogged ? '✓ Added to Diary' : 'Nutrient-Dense'}
                  </span>

                  <button
                    onClick={() => handleLog(meal)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isLogged
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    {isLogged ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Logged</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Log Meal</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
