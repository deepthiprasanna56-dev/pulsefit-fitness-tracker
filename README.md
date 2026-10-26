# PulseFit — Modern Fitness & Health Tracker

> A high-performance, responsive web application for comprehensive fitness tracking, real-time biometric monitoring, guided workout regimens, macronutrient meal planning, and interactive BMI diagnostics.

Built with **React 19**, **Vite**, **Tailwind CSS**, and **Lucide React**.

---

## 🌟 Key Features

### 1. 🧭 Sticky Modern Navbar
- Responsive glassmorphism header with active section indicator.
- Smooth scroll navigation to all primary sections.
- Mobile drawer menu with slide-in animation.
- Quick **"Log Activity"** and **"Start Workout"** action buttons.

### 2. ⚡ High-Impact Hero Section
- Dynamic energetic hero banner with high-contrast typography and glowing accents.
- Live animated biometric widgets:
  - Daily step counter with radial progress ring.
  - Heart rate monitor badge with pulsing heartbeat.
  - Calorie burn tracker with flame badge.
  - 14-day consistency streak indicator.
- Direct CTA links and verified athlete community proof.

### 3. 📊 Fitness Biometrics Command Center (Dashboard)
- **Daily Steps**: Real-time counter with target comparison (10,000 steps) and distance walked.
- **Active Caloric Burn**: Metabolic output vs basal rate.
- **Workout Duration**: Session timing and target tracking.
- **Cardiovascular Monitor**: 74 BPM resting rate with animated electrocardiogram waveform.
- **Interactive Hydration Tracker**: Real-time bottle fill graphic with quick `+250ml`, `+500ml`, `+750ml`, and undo buttons.
- **Recovery & Readiness**: 88% optimal body battery score with sleep stage metrics.

### 4. 🏋️‍♂️ Curated Workout Regimens & Interactive Runner
- Filter by categories: **All Workouts**, **Cardio**, **Strength Training**, **Yoga & Mobility**, **HIIT & Burn**.
- Filter by difficulty: **Beginner**, **Intermediate**, **Advanced**.
- Live search bar by exercise name or targeted muscle group.
- **Workout Details Cards**:
  - Exercise title, category, thumbnail, duration, calorie burn, equipment, and targeted muscle tags.
  - Progress bar and one-click completion toggle.
- **Interactive Workout Runner (Modal)**:
  - Guided sequence checklist with interactive checkboxes.
  - Built-in interval timer with Start, Pause, Reset, and +1 Min buttons.
  - **"Finish & Log Workout"** button that credits burned calories and minutes directly to the dashboard with celebratory confetti!

### 5. 📈 Visual Progress & Trend Analytics
- **Weekly Volume Bar Chart**: Mon – Sun step and calorie breakdown with interactive hover tooltips and daily targets.
- **Weight & Body Fat Trajectory**: 4-week progression table tracking lean body mass changes.
- **Unlocked Milestone Badges**: Showcase for achievements like "100k Steps Legend", "Hydration Dynamo", and "HIIT Century Burn".

### 6. ⚖️ Interactive BMI Diagnostics
- Instant toggle between **Metric (cm, kg)** and **Imperial (ft/in, lbs)** units.
- Real-time sliders for Height, Weight, and Age with Gender selection.
- **Visual BMI Gauge**: Underweight (<18.5), Normal Weight (18.5–24.9), Overweight (25–29.9), and Obese (30+).
- Tailored health advice, optimal weight range calculator, and caloric recommendations.

### 7. 🥗 Macronutrient Meal Plans & Fueling
- Daily macro targets: Calories, Protein (g), Carbohydrates (g), and Healthy Fats (g) with animated progress bars.
- Filter by diet: **All Meals**, **High Protein**, **Balanced Energy**, **Low Carb / Keto**, and **Plant-Based**.
- Expandable ingredient lists and preparation time.
- **"Log Meal"** button that updates daily macro counts in real time.

### 8. 🎯 Personalized Goals Tracker
- Track target milestones with visual completion percentages.
- Interactive toggle to mark goals complete with celebration confetti.
- **"Create New Goal"** modal with category, frequency, target number, and custom units.

### 9. 💬 Contact & Support
- Interactive contact form with input validation and instant confirmation toast.
- Direct support channels: toll-free phone, email, and 24/7 coach availability.
- Expandable FAQ accordion addressing common fitness and tracking questions.

### 10. 📱 100% Fully Responsive
- Tailored for all viewport sizes:
  - Mobile Phones (320px+)
  - Tablets (768px+)
  - Laptops (1024px+)
  - Desktops & Ultrawide Displays (1440px+)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Component-driven declarative UI |
| **Vite 8** | Ultra-fast HMR and build pipeline |
| **Tailwind CSS v4** | Utility-first styling with modern design system |
| **Lucide React** | Clean, lightweight icon suite |
| **Canvas Confetti** | Celebratory animations on workout/goal completion |

---

## 📁 Project Folder Structure

```
pulsefit-fitness-tracker/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── BMICalculator.jsx    # Metric & Imperial BMI gauge & guidance
│   │   ├── Contact.jsx          # Inquiry form & FAQ accordion
│   │   ├── Dashboard.jsx        # Biometrics, step rings, water tracker
│   │   ├── Footer.jsx           # Links, newsletter, social channels
│   │   ├── Goals.jsx            # Fitness milestones & goal creation
│   │   ├── Hero.jsx             # Energetic banner with floating badges
│   │   ├── Navbar.jsx           # Glassmorphic header & mobile drawer
│   │   ├── Nutrition.jsx        # Macro progress bars & meal cards
│   │   ├── Progress.jsx         # Weekly charts, weight trend & badges
│   │   ├── QuickLogModal.jsx    # Instant activity increment drawer
│   │   ├── Toast.jsx            # Dynamic toast feedback notifications
│   │   ├── WorkoutModal.jsx     # Interactive timer & routine runner
│   │   └── Workouts.jsx         # Filterable routines & category tabs
│   ├── data/
│   │   ├── goalsData.js         # Initial goals & FAQs
│   │   ├── nutritionData.js     # Chef-curated meals & macro targets
│   │   ├── progressData.js      # Chart data points & milestones
│   │   └── workoutData.js       # Exercises, routines & steps
│   ├── App.jsx                  # Main application container & state
│   ├── index.css                # Tailwind imports, scrollbar & animations
│   └── main.jsx                 # Vite application mount
├── index.html                   # HTML template & typography links
├── netlify.toml                 # Netlify deployment configuration
├── vercel.json                  # Vercel deployment configuration
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/pulsefit-fitness-tracker.git

# Navigate into project directory
cd pulsefit-fitness-tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be live at `http://localhost:5173`.

### Production Build
```bash
# Generate optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment

### Deploy to Netlify
1. Fork or push this repository to your GitHub account.
2. Sign in to [Netlify](https://www.netlify.com).
3. Click **"Add new site"** -> **"Import an existing project"** -> Select your repository.
4. Build settings will be auto-detected via `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **"Deploy site"**.

### Deploy to Vercel
1. Sign in to [Vercel](https://vercel.com).
2. Click **"Add New..."** -> **"Project"** -> Select your repository.
3. Vercel automatically detects the Vite preset (`vercel.json`).
4. Click **"Deploy"**.

---

## 📄 License
MIT License. Open-source for personal and commercial usage.
