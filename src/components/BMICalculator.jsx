import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Scale, 
  Ruler, 
  Heart, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  
  // Metric states
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(72);

  // Imperial states
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightLbs, setWeightLbs] = useState(158);

  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(26);

  // Calculate BMI
  const bmiData = useMemo(() => {
    let hMeters = 0;
    let wKg = 0;

    if (unit === 'metric') {
      hMeters = heightCm / 100;
      wKg = weightKg;
    } else {
      const totalInches = heightFt * 12 + Number(heightIn);
      hMeters = totalInches * 0.0254;
      wKg = weightLbs * 0.45359237;
    }

    if (hMeters <= 0 || wKg <= 0) {
      return { bmi: 0, category: 'Unknown', color: 'slate', minWeight: 0, maxWeight: 0 };
    }

    const bmiVal = parseFloat((wKg / (hMeters * hMeters)).toFixed(1));

    // Healthy weight range (BMI 18.5 to 24.9)
    const minW = parseFloat((18.5 * hMeters * hMeters).toFixed(1));
    const maxW = parseFloat((24.9 * hMeters * hMeters).toFixed(1));

    let category = '';
    let color = '';
    let description = '';
    let advice = '';

    if (bmiVal < 18.5) {
      category = 'Underweight';
      color = 'text-sky-400 bg-sky-500/10 border-sky-500/30';
      description = 'Your BMI indicates you may be below the optimal weight range for your height.';
      advice = 'Focus on progressive resistance training to build lean muscle mass alongside a slight caloric surplus rich in healthy fats and proteins.';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      category = 'Normal / Healthy Weight';
      color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      description = 'Outstanding! Your BMI falls directly within the ideal, healthy medical range.';
      advice = 'Maintain your momentum with a balanced mix of Zone-2 cardio, functional strength workouts, and mindful nutrient-dense meals.';
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      category = 'Overweight';
      color = 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      description = 'Your BMI is slightly elevated above the standard range.';
      advice = 'Incorporate 30–45 minutes of daily cardio intervals, aim for a steady 300–500 kcal deficit, and elevate your daily step goal to 10,000 steps.';
    } else {
      category = 'Obese Range';
      color = 'text-rose-400 bg-rose-500/10 border-rose-500/30';
      description = 'Your BMI is significantly elevated, which may increase cardiovascular and metabolic risks.';
      advice = 'Prioritize low-impact aerobic activity (swimming, cycling, walking), adopt a whole-food low-glycemic meal plan, and consult with a healthcare professional.';
    }

    // Gauge needle percentage (clamped between 15 and 35 BMI)
    const gaugePercent = Math.min(100, Math.max(0, ((bmiVal - 15) / (35 - 15)) * 100));

    return {
      bmi: bmiVal,
      category,
      color,
      description,
      advice,
      minWeight: unit === 'metric' ? `${minW} kg` : `${(minW * 2.20462).toFixed(1)} lbs`,
      maxWeight: unit === 'metric' ? `${maxW} kg` : `${(maxW * 2.20462).toFixed(1)} lbs`,
      gaugePercent,
    };
  }, [unit, heightCm, weightKg, heightFt, heightIn, weightLbs]);

  return (
    <section id="bmi" className="py-20 bg-slate-950 relative border-t border-slate-800/80 w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Calculator className="w-3.5 h-3.5" />
            Biometric Health Diagnostics
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Interactive BMI Calculator
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Discover your Body Mass Index, determine your prime healthy weight range, and get actionable fitness guidance tailored to your body.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            {/* Unit Toggle & Gender */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Measurement Unit</label>
                <div className="flex items-center gap-1 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setUnit('metric')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      unit === 'metric'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Metric (cm, kg)
                  </button>
                  <button
                    onClick={() => setUnit('imperial')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      unit === 'imperial'
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Imperial (ft, lbs)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Gender</label>
                <div className="flex items-center gap-1 mt-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setGender('male')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      gender === 'male' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      gender === 'female' ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            {/* Height Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-emerald-400" />
                  <span>Height</span>
                </label>
                <span className="text-sm font-black text-white">
                  {unit === 'metric' ? `${heightCm} cm` : `${heightFt} ft ${heightIn} in`}
                </span>
              </div>

              {unit === 'metric' ? (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>100 cm</span>
                    <span>165 cm</span>
                    <span>200 cm</span>
                    <span>230 cm</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-slate-400">Feet</label>
                    <input
                      type="number"
                      min="3"
                      max="7"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400">Inches</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-cyan-400" />
                  <span>Weight</span>
                </label>
                <span className="text-sm font-black text-white">
                  {unit === 'metric' ? `${weightKg} kg` : `${weightLbs} lbs`}
                </span>
              </div>

              {unit === 'metric' ? (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="35"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>35 kg</span>
                    <span>70 kg</span>
                    <span>110 kg</span>
                    <span>180 kg</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="range"
                    min="80"
                    max="400"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>80 lbs</span>
                    <span>160 lbs</span>
                    <span>250 lbs</span>
                    <span>400 lbs</span>
                  </div>
                </div>
              )}
            </div>

            {/* Age Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">Age: {age} years</label>
              </div>
              <input
                type="range"
                min="14"
                max="90"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
            </div>

          </div>

          {/* Result Card & Visual Gauge */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            
            {/* Top result score */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Your Body Mass Index</span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-black text-white tracking-tight">{bmiData.bmi}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${bmiData.color}`}>
                    {bmiData.category}
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right bg-slate-950 p-3 rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Optimal Weight Target</span>
                <span className="text-sm font-bold text-emerald-400">
                  {bmiData.minWeight} – {bmiData.maxWeight}
                </span>
              </div>
            </div>

            {/* BMI Visual Gauge Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                <span>Under (&lt;18.5)</span>
                <span className="text-emerald-400">Normal (18.5-24.9)</span>
                <span className="text-amber-400">Over (25-29.9)</span>
                <span className="text-rose-400">Obese (30+)</span>
              </div>

              {/* Gradient Track */}
              <div className="relative w-full h-3.5 rounded-full overflow-hidden bg-slate-800">
                <div className="w-full h-full bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 to-rose-500 opacity-90" />
              </div>

              {/* Indicator pointer */}
              <div className="relative w-full h-4">
                <div
                  className="absolute -top-1 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                  style={{ left: `${bmiData.gaugePercent}%` }}
                >
                  <div className="w-3 h-3 bg-white rotate-45 rounded-sm shadow-md" />
                </div>
              </div>
            </div>

            {/* Description & Action Advice */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">Personalized Health Assessment</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{bmiData.description}</p>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
                <strong className="text-emerald-300">Pro Recommendation: </strong>
                {bmiData.advice}
              </p>
            </div>

            {/* Reference Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-[11px]">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-sky-400 font-bold block">&lt; 18.5</span>
                <span className="text-slate-400">Underweight</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-emerald-500/20">
                <span className="text-emerald-400 font-bold block">18.5 – 24.9</span>
                <span className="text-slate-300 font-medium">Optimal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-amber-400 font-bold block">25 – 29.9</span>
                <span className="text-slate-400">Overweight</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-rose-400 font-bold block">30.0 +</span>
                <span className="text-slate-400">Obese</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
