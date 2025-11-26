import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Dumbbell, 
  Activity, 
  Clock, 
  Info, 
  Target,
  Zap,
  Youtube,
  Image as ImageIcon,
  Check,
  Trophy
} from 'lucide-react';

// --- DATA ---
const workoutData = [
  {
    day: 1,
    title: "Push A",
    subtitle: "Lengthened Bias",
    focus: "Chest, Shoulders, Triceps",
    mechanism: "Stretch-Mediated Hypertrophy",
    description: "Focus on loading muscles at long lengths to trigger greater IGF-1 release.",
    exercises: [
      {
        name: "Incline Barbell Bench Press",
        variant: "30° Low-Incline with Dead-Stop",
        muscles: "Upper Chest, Front Delt",
        sets: 3,
        reps: "6–10",
        tempo: "3-1-X-0",
        rest: "3-4m",
        note: "Pause at bottom. 30° angle maximizes upper chest.",
        type: "Compound",
        searchQuery: "low incline barbell bench press 30 degrees form"
      },
      {
        name: "Weighted Dips",
        variant: "V-Bar with Forward Lean",
        muscles: "Lower Chest, Anterior Delt",
        sets: 3,
        reps: "8–12",
        tempo: "3-1-1-0",
        rest: "2-3m",
        note: "Lean torso 45° forward. Upright biases triceps too much.",
        type: "Compound",
        searchQuery: "weighted chest dips forward lean form"
      },
      {
        name: "Cable Fly",
        variant: "Lengthened Partials",
        muscles: "Chest (Sternal)",
        sets: 3,
        reps: "12–15",
        tempo: "2-2-1-0",
        rest: "1.5m",
        note: "Only perform bottom 50% of ROM. Do not bring hands together.",
        type: "Isolation",
        searchQuery: "cable fly lengthened partials hypertrophy"
      },
      {
        name: "Overhead Cable Extension",
        variant: "Cross-Body Dual Cable",
        muscles: "Triceps (Long Head)",
        sets: 4,
        reps: "10–15",
        tempo: "3-1-1-0",
        rest: "2m",
        note: "Arm must be overhead to stretch the long head.",
        type: "Isolation",
        searchQuery: "cross body overhead cable tricep extension"
      },
      {
        name: "Lateral Raise",
        variant: "Behind-the-Back Cable",
        muscles: "Side Delts",
        sets: 4,
        reps: "12–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        note: "Cable behind back creates pre-stretch.",
        type: "Isolation",
        searchQuery: "behind the back cable lateral raise"
      }
    ]
  },
  {
    day: 2,
    title: "Pull A",
    subtitle: "Vertical Plane",
    focus: "Back Width, Biceps",
    mechanism: "Vertical Pull Strength",
    description: "Developing the V-Taper by targeting Lower Lats and initiating Bicep growth.",
    exercises: [
      {
        name: "Single-Arm Iliac Lat Pulldown",
        variant: "Neutral Grip, Single Arm",
        muscles: "Lower Lats (Iliac)",
        sets: 3,
        reps: "8–12",
        tempo: "3-0-1-1",
        rest: "2m",
        note: "Pull elbow to hip pocket. Slight side crunch.",
        type: "Compound",
        searchQuery: "single arm iliac lat pulldown form"
      },
      {
        name: "Weighted Pull-Up",
        variant: "Neutral Grip Dead-Hang",
        muscles: "Lats, Biceps",
        sets: 3,
        reps: "6–10",
        tempo: "2-1-1-0",
        rest: "3m",
        note: "Start from complete dead hang every rep.",
        type: "Compound",
        searchQuery: "neutral grip weighted pull up dead hang form"
      },
      {
        name: "Chest-Supported T-Bar Row",
        variant: "Wide-Grip",
        muscles: "Upper Back, Rear Delts",
        sets: 3,
        reps: "10–12",
        tempo: "2-0-1-2",
        rest: "2m",
        note: "Flare elbows 45-60°. 2s squeeze at contraction.",
        type: "Compound",
        searchQuery: "chest supported t bar row wide grip form"
      },
      {
        name: "Bayesian Cable Curl",
        variant: "Single-Arm Low-Cable",
        muscles: "Biceps (Long Head)",
        sets: 4,
        reps: "10–15",
        tempo: "3-1-1-0",
        rest: "1.5m",
        note: "Face away from cable, arm behind torso.",
        type: "Isolation",
        searchQuery: "bayesian cable curl form"
      },
      {
        name: "Reverse Pec Deck",
        variant: "Pronated Grip",
        muscles: "Rear Delts",
        sets: 3,
        reps: "15–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        note: "Pure horizontal movement to minimize traps.",
        type: "Isolation",
        searchQuery: "reverse pec deck rear delt fly form"
      }
    ]
  },
  {
    day: 3,
    title: "Legs A",
    subtitle: "Quad Dominant",
    focus: "Quads, Calves",
    mechanism: "Knee Dominant",
    description: "Maximizing Quadriceps Femoris hypertrophy via deep knee flexion.",
    exercises: [
      {
        name: "High-Bar Back Squat",
        variant: "Heel-Elevated",
        muscles: "Quads, Glutes",
        sets: 3,
        reps: "5–8",
        tempo: "3-0-X-0",
        rest: "3-4m",
        note: "Upright torso. Heel elevation allows greater knee travel.",
        type: "Compound",
        searchQuery: "high bar squat heel elevated form"
      },
      {
        name: "Bulgarian Split Squat",
        variant: "Upright Torso",
        muscles: "Quads, Glute Medius",
        sets: 3,
        reps: "8–12",
        tempo: "2-1-1-0",
        rest: "2-3m",
        note: "Keep torso upright to bias quads.",
        type: "Unilateral",
        searchQuery: "bulgarian split squat quad focus form"
      },
      {
        name: "Leg Extension",
        variant: "Seated",
        muscles: "Rectus Femoris",
        sets: 3,
        reps: "15–20",
        tempo: "2-0-1-2",
        rest: "1.5m",
        note: "Hard 2s squeeze at the top.",
        type: "Isolation",
        searchQuery: "leg extension perfect form hypertrophy"
      },
      {
        name: "Standing Calf Raise",
        variant: "Smith Machine",
        muscles: "Calves",
        sets: 4,
        reps: "10–15",
        tempo: "3-2-X-1",
        rest: "2m",
        note: "2s pause at bottom is non-negotiable.",
        type: "Isolation",
        searchQuery: "smith machine calf raise deep stretch form"
      }
    ]
  },
  {
    day: 4,
    title: "Push B",
    subtitle: "Shortened Bias",
    focus: "Chest, Shoulders",
    mechanism: "Metabolic Stress",
    description: "Focus on peak contraction and metabolic accumulation (The Pump).",
    exercises: [
      {
        name: "Flat Dumbbell Bench Press",
        variant: "Slight Pronation",
        muscles: "Chest",
        sets: 3,
        reps: "8–12",
        tempo: "2-1-1-1",
        rest: "2-3m",
        note: "Converge hands at top for peak contraction.",
        type: "Compound",
        searchQuery: "flat dumbbell bench press hypertrophy form"
      },
      {
        name: "Seated Overhead Press",
        variant: "Back Supported",
        muscles: "Front Delts",
        sets: 3,
        reps: "8–12",
        tempo: "2-0-1-0",
        rest: "2-3m",
        note: "Seated position removes core limiters.",
        type: "Compound",
        searchQuery: "seated dumbbell shoulder press form"
      },
      {
        name: "Tricep Pushdown",
        variant: "Rope Attachment",
        muscles: "Triceps",
        sets: 3,
        reps: "12–15",
        tempo: "2-0-1-1",
        rest: "1.5m",
        note: "Pull rope apart at bottom.",
        type: "Isolation",
        searchQuery: "tricep rope pushdown form"
      },
      {
        name: "Lateral Raise Dropset",
        variant: "Strict to Cheating",
        muscles: "Side Delts",
        sets: 4,
        reps: "15 + Max",
        tempo: "2-0-1-0",
        rest: "1.5m",
        note: "15 strict reps, then use leg drive.",
        type: "Metabolic",
        searchQuery: "lateral raise partials hypertrophy"
      }
    ]
  },
  {
    day: 5,
    title: "Pull B",
    subtitle: "Horizontal Plane",
    focus: "Back Thickness",
    mechanism: "Upper Back Density",
    description: "Building upper back density and addressing forearm development.",
    exercises: [
      {
        name: "Pendlay Row",
        variant: "Explosive Barbell",
        muscles: "Upper Back, Lats",
        sets: 3,
        reps: "6–10",
        tempo: "1-0-X-0",
        rest: "3m",
        note: "Reset bar on floor each rep. Explosive.",
        type: "Compound",
        searchQuery: "pendlay row perfect form"
      },
      {
        name: "Close-Grip Pulldown",
        variant: "Mag-Grip / Parallel",
        muscles: "Lats, Brachialis",
        sets: 3,
        reps: "10–12",
        tempo: "3-1-1-0",
        rest: "2m",
        note: "Targets muscle belly of lats.",
        type: "Compound",
        searchQuery: "close grip lat pulldown form"
      },
      {
        name: "Kelso Shrug",
        variant: "Incline Bench",
        muscles: "Traps",
        sets: 4,
        reps: "12–15",
        tempo: "2-1-1-2",
        rest: "1.5m",
        note: "Retract scapula back and down.",
        type: "Isolation",
        searchQuery: "kelso shrug incline bench form"
      },
      {
        name: "Hammer Curl",
        variant: "Cross-Body",
        muscles: "Brachialis",
        sets: 3,
        reps: "8–12",
        tempo: "3-0-1-0",
        rest: "2m",
        note: "Targets the muscle underneath the bicep.",
        type: "Isolation",
        searchQuery: "cross body hammer curls form"
      },
      {
        name: "Face Pull",
        variant: "Cable Rotation",
        muscles: "Rear Delt, Cuff",
        sets: 4,
        reps: "15–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        note: "Pull to forehead, hands end behind head.",
        type: "Prehab",
        searchQuery: "face pull correct form"
      }
    ]
  },
  {
    day: 6,
    title: "Legs B",
    subtitle: "Posterior Chain",
    focus: "Hamstrings, Glutes",
    mechanism: "Hip Dominant",
    description: "Hypertrophy of Hamstrings and Glutes via hip extension.",
    exercises: [
      {
        name: "Romanian Deadlift",
        variant: "Barbell with Straps",
        muscles: "Hamstrings, Glutes",
        sets: 3,
        reps: "6–10",
        tempo: "3-1-1-0",
        rest: "3m",
        note: "Push hips back until flexibility runs out.",
        type: "Compound",
        searchQuery: "romanian deadlift rdl perfect form"
      },
      {
        name: "Leg Curl",
        variant: "Seated Machine",
        muscles: "Hamstrings",
        sets: 4,
        reps: "10–15",
        tempo: "3-0-1-0",
        rest: "2m",
        note: "Seated is superior to lying for hypertrophy.",
        type: "Isolation",
        searchQuery: "seated leg curl optimal form"
      },
      {
        name: "Hip Thrust",
        variant: "Barbell",
        muscles: "Glutes",
        sets: 3,
        reps: "8–12",
        tempo: "2-0-1-2",
        rest: "2.5m",
        note: "Highest peak contraction for glutes.",
        type: "Compound",
        searchQuery: "barbell hip thrust form guide"
      },
      {
        name: "High Step-Up",
        variant: "Dumbbell",
        muscles: "Glutes (Lengthened)",
        sets: 2,
        reps: "10–12",
        tempo: "3-0-1-0",
        rest: "2m",
        note: "Do not push off with non-working leg.",
        type: "Unilateral",
        searchQuery: "glute focused step up form"
      }
    ]
  },
  {
    day: 7,
    title: "Structural Integrity",
    subtitle: "The Gap Day",
    focus: "Neck, Abs, Forearms",
    mechanism: "Prehab & Aesthetics",
    description: "Training smaller, neglected muscle groups and injury prevention.",
    exercises: [
      {
        name: "Neck Complex",
        variant: "Flexion & Extension",
        muscles: "Neck",
        sets: 3,
        reps: "15–20",
        tempo: "Controlled",
        rest: "1.5m",
        note: "Thick neck is key for aesthetic power look.",
        type: "Isolation",
        searchQuery: "neck training for hypertrophy safety"
      },
      {
        name: "Forearm Complex",
        variant: "Wrist Curl & Ext",
        muscles: "Forearms",
        sets: 3,
        reps: "15–20",
        tempo: "Controlled",
        rest: "1.5m",
        note: "Target both underside and topside.",
        type: "Isolation",
        searchQuery: "forearm hypertrophy workout form"
      },
      {
        name: "Abdominal Complex",
        variant: "Leg Raise / Crunch",
        muscles: "Abs",
        sets: 3,
        reps: "10–15",
        tempo: "Controlled",
        rest: "1.5m",
        note: "Focus on curling the pelvis.",
        type: "Isolation",
        searchQuery: "hanging leg raise perfect form abs"
      },
      {
        name: "Soleus Isolation",
        variant: "Seated Calf Raise",
        muscles: "Soleus",
        sets: 3,
        reps: "20–25",
        tempo: "Controlled",
        rest: "1.5m",
        note: "Bent knee isolates the soleus.",
        type: "Isolation",
        searchQuery: "seated calf raise soleus form"
      }
    ]
  }
];

// --- COMPONENTS ---

const TempoBadge = ({ tempo }) => (
  <div className="flex items-center gap-1 bg-gray-800/80 px-2 py-1 rounded text-xs font-mono text-gray-200 border border-gray-600">
    <Clock size={12} />
    <span>{tempo}</span>
  </div>
);

const MuscleBadge = ({ muscle }) => (
  <div className="flex items-center gap-1 bg-blue-900/40 px-2 py-1 rounded text-xs font-medium text-blue-200 border border-blue-700">
    <Activity size={12} />
    <span>{muscle}</span>
  </div>
);

// We forward ref to the Card so the parent can scroll to it
const ExerciseCard = React.forwardRef(({ exercise, index, dayId, isCompleted, onToggle }, ref) => {
  
  // Format index (01, 02...)
  const formattedIndex = (index + 1).toString().padStart(2, '0');

  // Video/Image Links - USING STANDARD ANCHOR TAGS FOR IOS COMPATIBILITY
  const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.searchQuery)}`;
  const imageUrl = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(exercise.searchQuery)}`;

  return (
    <div 
      ref={ref}
      className={`
      relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 border
      ${isCompleted 
        ? 'bg-green-950/20 border-green-800/50 opacity-90' 
        : 'bg-gray-900 border-gray-700 hover:border-blue-500/50'}
    `}>
      
      {/* HEADER BAR: Serial # + Exercise Name + Checkbox */}
      <div className={`
        flex justify-between items-center p-3 border-b
        ${isCompleted ? 'bg-green-900/10 border-green-800/30' : 'bg-black/20 border-gray-800'}
      `}>
        
        {/* Left: Serial + Name */}
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="text-xl font-black text-gray-600 select-none shrink-0">
            {formattedIndex}
          </span>
          <h3 className={`text-base md:text-lg font-bold truncate ${isCompleted ? 'text-green-100' : 'text-white'}`}>
            {exercise.name}
          </h3>
        </div>

        {/* Right: Checkbox */}
        <button 
          onClick={onToggle}
          className={`
            shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-200 ml-2
            ${isCompleted 
              ? 'bg-green-600 border-green-500 text-white shadow-[0_0_15px_rgba(22,163,74,0.5)] scale-110' 
              : 'bg-gray-800 border-gray-600 text-gray-400 hover:bg-gray-700'}
          `}
        >
          {isCompleted ? <Check size={18} strokeWidth={3} /> : <div className="w-4 h-4 rounded-full border-2 border-gray-500" />}
        </button>
      </div>

      <div className="p-4 relative z-0">
        
        {/* Sub-Header: Variant & Category (Moved down as requested) */}
        <div className="mb-4 flex flex-col gap-1">
           <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold border
              ${exercise.type === 'Compound' ? 'bg-purple-900/30 text-purple-300 border-purple-800' : 
                exercise.type === 'Isolation' ? 'bg-amber-900/30 text-amber-300 border-amber-800' : 
                'bg-blue-900/30 text-blue-300 border-blue-800'}`}>
              {exercise.type}
            </span>
            <span className="text-sm text-gray-300 font-medium leading-tight">
              {exercise.variant}
            </span>
           </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <MuscleBadge muscle={exercise.muscles} />
          <TempoBadge tempo={exercise.tempo} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-black/40 rounded-lg p-2 border border-gray-700">
          <div className="text-center">
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide font-bold">Sets</span>
            <span className="text-lg font-bold text-white">{exercise.sets}</span>
          </div>
          <div className="text-center border-l border-gray-700">
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide font-bold">Reps</span>
            <span className="text-lg font-bold text-white">{exercise.reps}</span>
          </div>
          <div className="text-center border-l border-gray-700">
            <span className="block text-[10px] text-gray-400 uppercase tracking-wide font-bold">Rest</span>
            <span className="text-lg font-bold text-white">{exercise.rest}</span>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-blue-900/10 rounded-lg p-3 border border-blue-800/40 mb-4">
          <div className="flex gap-2 items-start">
            <Info className="w-4 h-4 text-blue-300 mt-0.5 shrink-0" />
            <p className="text-xs md:text-sm text-gray-300 italic leading-relaxed">
              {exercise.note}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions - USING A HREF INSTEAD OF BUTTON ONCLICK */}
      <div className="bg-black/20 p-3 border-t border-gray-800 grid grid-cols-2 gap-3">
        <a 
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-900/30 text-gray-300 text-xs font-bold py-2 rounded border border-gray-700 hover:border-red-500/50 transition-all no-underline"
        >
          <Youtube size={16} className="text-red-500" />
          Watch Demo
        </a>
        <a 
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-blue-900/30 text-gray-300 text-xs font-bold py-2 rounded border border-gray-700 hover:border-blue-500/50 transition-all no-underline"
        >
          <ImageIcon size={16} className="text-blue-400" />
          View Form
        </a>
      </div>
    </div>
  );
});

export default function NaturalHypertrophyApp() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState({});
  const itemRefs = useRef([]); // Store refs for auto-scrolling

  // Load progress
  useEffect(() => {
    const saved = localStorage.getItem('workoutProgress');
    if (saved) {
      setCompletedExercises(JSON.parse(saved));
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('workoutProgress', JSON.stringify(completedExercises));
  }, [completedExercises]);

  const currentWorkout = workoutData.find(w => w.day === selectedDay);
  const dayProgress = currentWorkout.exercises.filter((_, idx) => completedExercises[`${selectedDay}-${idx}`]).length;
  const totalExercises = currentWorkout.exercises.length;
  const isDayComplete = dayProgress === totalExercises;

  // Grand Celebration Effect
  useEffect(() => {
    if (isDayComplete && totalExercises > 0) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22c55e', '#3b82f6', '#ffffff']
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#22c55e', '#3b82f6', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isDayComplete, totalExercises]);

  const toggleExercise = (day, index) => {
    const key = `${day}-${index}`;
    const isNowComplete = !completedExercises[key];
    
    setCompletedExercises(prev => ({
      ...prev,
      [key]: isNowComplete
    }));

    if (isNowComplete) {
      // Small pop for single exercise
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        disableForReducedMotion: true
      });

      // Auto-scroll to next exercise if it exists
      if (index < currentWorkout.exercises.length - 1) {
        setTimeout(() => {
          itemRefs.current[index + 1]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }, 300); // Small delay for visual feedback
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-30 shadow-xl backdrop-blur-md bg-opacity-90">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
              <Dumbbell className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white leading-tight tracking-tight">
                Hypertrophy<span className="text-blue-500">Architect</span>
              </h1>
              <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider font-semibold">
                Version 7.0 • iOS Optimized
              </p>
            </div>
          </div>
          
          {/* Day Progress Indicator */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300">
              <span>{dayProgress}/{totalExercises}</span>
              <Trophy size={14} className={isDayComplete ? "text-yellow-400 animate-pulse" : "text-gray-600"} />
            </div>
            <div className="w-20 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${(dayProgress / totalExercises) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Day Selector */}
        <div className="mb-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {workoutData.map((day) => (
              <button
                key={day.day}
                onClick={() => {
                  setSelectedDay(day.day);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-xl min-w-[85px] transition-all duration-200 border active:scale-95
                  ${selectedDay === day.day 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/50 scale-105' 
                    : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:bg-gray-800'}
                `}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70">Day</span>
                <span className="text-2xl font-bold leading-none">{day.day}</span>
                <span className="text-[10px] mt-1 truncate max-w-[75px]">{day.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Workout Info Card */}
        <div className="mb-6 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex flex-wrap items-center gap-2">
                  {currentWorkout.title}
                  <span className="text-xs md:text-sm bg-gray-800 text-gray-200 px-3 py-1 rounded-full border border-gray-600 font-bold whitespace-nowrap">
                    {currentWorkout.subtitle}
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-gray-900/60 p-3 rounded-lg border border-gray-700">
                  <Target className="text-red-500 mt-1 shrink-0" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wide block mb-0.5">Focus</span>
                    <p className="text-sm text-white font-medium leading-snug">{currentWorkout.focus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-gray-900/60 p-3 rounded-lg border border-gray-700">
                  <Zap className="text-yellow-500 mt-1 shrink-0" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wide block mb-0.5">Mechanism</span>
                    <p className="text-sm text-white font-medium leading-snug">{currentWorkout.mechanism}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" />
              Workout Protocol
            </h3>
            <span className="text-xs text-gray-400 bg-gray-900 px-3 py-1 rounded-full border border-gray-800 font-medium">
              {dayProgress} / {totalExercises} Complete
            </span>
          </div>

          <div className="grid gap-6">
            {currentWorkout.exercises.map((exercise, idx) => (
              <ExerciseCard 
                key={`${selectedDay}-${idx}`} // Force re-render on day change to reset refs properly
                ref={el => itemRefs.current[idx] = el}
                exercise={exercise} 
                index={idx}
                dayId={selectedDay}
                isCompleted={!!completedExercises[`${selectedDay}-${idx}`]}
                onToggle={() => toggleExercise(selectedDay, idx)}
              />
            ))}
          </div>

          {isDayComplete && (
            <div className="mt-8 p-6 bg-green-900/20 border border-green-800 rounded-xl text-center animate-bounce-in">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
              <h3 className="text-xl font-bold text-green-100">Workout Complete!</h3>
              <p className="text-green-300 text-sm">Great job. Rest up for tomorrow.</p>
            </div>
          )}
        </div>

        {/* Legend / Info Footer */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-gray-400 text-sm">
          <h4 className="font-bold text-gray-200 mb-4 text-center md:text-left">Reading the Tempo (e.g., 3-1-X-0)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">1. Eccentric</span>
              <span className="text-xs text-gray-300">Lowering (3s)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">2. Stretch</span>
              <span className="text-xs text-gray-300">Pause Bottom (1s)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">3. Concentric</span>
              <span className="text-xs text-gray-300">Lift Fast (X)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">4. Contract</span>
              <span className="text-xs text-gray-300">Pause Top (0s)</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}