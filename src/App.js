import React, { useState } from 'react';
import { 
  Dumbbell, 
  Activity, 
  Clock, 
  Info, 
  Target,
  Zap,
  BookOpen,
  Youtube,
  Image as ImageIcon
} from 'lucide-react';

const workoutData = [
  {
    day: 1,
    title: "Push A",
    subtitle: "Lengthened Bias",
    focus: "Chest, Shoulders, Triceps",
    mechanism: "Stretch-Mediated Hypertrophy",
    description: "Focus on loading muscles at long lengths to trigger greater IGF-1 release and titin-related signaling.",
    exercises: [
      {
        name: "Incline Barbell Bench Press",
        variant: "30° Low-Incline with Dead-Stop",
        muscles: "Pectoralis Major (Clavicular), Front Delt, Triceps",
        sets: 3,
        reps: "6–10",
        tempo: "3-1-X-0",
        rest: "3-4m",
        rpe: "8-9",
        note: "Pause at bottom to eliminate myotatic reflex. 30° angle maximizes upper chest activation.",
        type: "Compound",
        searchQuery: "low incline barbell bench press 30 degrees form"
      },
      {
        name: "Weighted Dips",
        variant: "V-Bar with Forward Lean",
        muscles: "Pectoralis Major (Costal), Anterior Delt",
        sets: 3,
        reps: "8–12",
        tempo: "3-1-1-0",
        rest: "2-3m",
        rpe: "9",
        note: "Lean torso 45° forward. Upright torso shifts load to triceps too much.",
        type: "Compound",
        searchQuery: "weighted chest dips forward lean form"
      },
      {
        name: "Cable Fly",
        variant: "Lengthened Partials",
        muscles: "Pectoralis Major (Sternal)",
        sets: 3,
        reps: "12–15",
        tempo: "2-2-1-0",
        rest: "1.5m",
        rpe: "10",
        note: "Only perform bottom 50% of ROM. Do not bring hands together.",
        type: "Isolation",
        searchQuery: "cable fly lengthened partials hypertrophy"
      },
      {
        name: "Overhead Cable Extension",
        variant: "Cross-Body Dual Cable",
        muscles: "Triceps Brachii (Long Head)",
        sets: 4,
        reps: "10–15",
        tempo: "3-1-1-0",
        rest: "2m",
        rpe: "9",
        note: "Arm must be overhead to stretch the long head bi-articular muscle.",
        type: "Isolation",
        searchQuery: "cross body overhead cable tricep extension"
      },
      {
        name: "Lateral Raise",
        variant: "Behind-the-Back Cable (Cuff)",
        muscles: "Lateral Deltoid",
        sets: 4,
        reps: "12–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        rpe: "10",
        note: "Cable behind back creates pre-stretch. Use cuff to remove grip limit.",
        type: "Isolation",
        searchQuery: "behind the back cable lateral raise"
      }
    ]
  },
  {
    day: 2,
    title: "Pull A",
    subtitle: "Vertical Plane & Iliac Bias",
    focus: "Back Width, Biceps, Rear Delts",
    mechanism: "Vertical Pull Strength & Stretch",
    description: "Developing the V-Taper by targeting Lower Lats and initiating Bicep growth via stretch.",
    exercises: [
      {
        name: "Single-Arm Iliac Lat Pulldown",
        variant: "Neutral Grip, Single Arm",
        muscles: "Iliac Latissimus Dorsi (Lower Lats)",
        sets: 3,
        reps: "8–12",
        tempo: "3-0-1-1",
        rest: "2m",
        rpe: "9",
        note: "Pull elbow to hip pocket. Slight side crunch into working side.",
        type: "Compound",
        searchQuery: "single arm iliac lat pulldown form"
      },
      {
        name: "Weighted Pull-Up",
        variant: "Neutral Grip Dead-Hang",
        muscles: "Global Lats, Teres Major, Biceps",
        sets: 3,
        reps: "6–10",
        tempo: "2-1-1-0",
        rest: "3m",
        rpe: "9",
        note: "Start from complete dead hang every rep.",
        type: "Compound",
        searchQuery: "neutral grip weighted pull up dead hang form"
      },
      {
        name: "Chest-Supported T-Bar Row",
        variant: "Wide-Grip",
        muscles: "Mid-Traps, Rhomboids, Rear Delts",
        sets: 3,
        reps: "10–12",
        tempo: "2-0-1-2",
        rest: "2m",
        rpe: "9",
        note: "Flare elbows 45-60°. 2s squeeze at contraction is critical.",
        type: "Compound",
        searchQuery: "chest supported t bar row wide grip form"
      },
      {
        name: "Bayesian Cable Curl",
        variant: "Single-Arm Low-Cable",
        muscles: "Biceps Brachii (Long Head)",
        sets: 4,
        reps: "10–15",
        tempo: "3-1-1-0",
        rest: "1.5m",
        rpe: "10",
        note: "Face away from cable, arm behind torso to maximally stretch long head.",
        type: "Isolation",
        searchQuery: "bayesian cable curl form"
      },
      {
        name: "Reverse Pec Deck",
        variant: "Pronated Grip (Palms Down)",
        muscles: "Posterior Deltoid",
        sets: 3,
        reps: "15–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        rpe: "10",
        note: "Pure horizontal abduction to minimize trap involvement.",
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
    mechanism: "Knee Dominant Movements",
    description: "Maximizing Quadriceps Femoris hypertrophy via deep knee flexion.",
    exercises: [
      {
        name: "High-Bar Back Squat",
        variant: "Heel-Elevated",
        muscles: "Quadriceps, Glutes",
        sets: 3,
        reps: "5–8",
        tempo: "3-0-X-0",
        rest: "3-4m",
        rpe: "8-9",
        note: "Upright torso. Heel elevation allows greater knee travel.",
        type: "Compound",
        searchQuery: "high bar squat heel elevated form"
      },
      {
        name: "Bulgarian Split Squat",
        variant: "Dumbbell with Upright Torso",
        muscles: "Quadriceps, Glute Medius",
        sets: 3,
        reps: "8–12",
        tempo: "2-1-1-0",
        rest: "2-3m",
        rpe: "9",
        note: "Keep torso upright to bias quads. Lean forward biases glutes.",
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
        rpe: "10",
        note: "Only way to fully shorten Rectus Femoris. Hard 2s squeeze.",
        type: "Isolation",
        searchQuery: "leg extension perfect form hypertrophy"
      },
      {
        name: "Standing Calf Raise",
        variant: "Smith Machine",
        muscles: "Gastrocnemius",
        sets: 4,
        reps: "10–15",
        tempo: "3-2-X-1",
        rest: "2m",
        rpe: "10",
        note: "2s pause at bottom is non-negotiable to kill tendon elasticity.",
        type: "Isolation",
        searchQuery: "smith machine calf raise deep stretch form"
      }
    ]
  },
  {
    day: 4,
    title: "Push B",
    subtitle: "Shortened Bias",
    focus: "Chest, Shoulders, Triceps",
    mechanism: "Metabolic Stress / Pump",
    description: "Focus on peak contraction and metabolic accumulation to drive cellular swelling.",
    exercises: [
      {
        name: "Flat Dumbbell Bench Press",
        variant: "Slight Pronation at Top",
        muscles: "Pectoralis Major (Sternal/Costal)",
        sets: 3,
        reps: "8–12",
        tempo: "2-1-1-1",
        rest: "2-3m",
        rpe: "9",
        note: "Converge hands at top for peak contraction.",
        type: "Compound",
        searchQuery: "flat dumbbell bench press hypertrophy form"
      },
      {
        name: "Seated Overhead Press",
        variant: "Dumbbell, Back Supported",
        muscles: "Anterior Deltoid",
        sets: 3,
        reps: "8–12",
        tempo: "2-0-1-0",
        rest: "2-3m",
        rpe: "9",
        note: "Seated position removes core limiters, isolating delts.",
        type: "Compound",
        searchQuery: "seated dumbbell shoulder press form"
      },
      {
        name: "Tricep Pushdown",
        variant: "Rope Attachment",
        muscles: "Triceps (Lateral/Medial Heads)",
        sets: 3,
        reps: "12–15",
        tempo: "2-0-1-1",
        rest: "1.5m",
        rpe: "10",
        note: "Pull rope apart at bottom to supinate wrists.",
        type: "Isolation",
        searchQuery: "tricep rope pushdown form"
      },
      {
        name: "Lateral Raise Dropset",
        variant: "Strict to Cheating",
        muscles: "Lateral Deltoid",
        sets: 4,
        reps: "15 + AMRAP",
        tempo: "2-0-1-0",
        rest: "1.5m",
        rpe: "10+",
        note: "15 strict reps, then immediately use leg drive for partials.",
        type: "Metabolic",
        searchQuery: "lateral raise partials hypertrophy"
      }
    ]
  },
  {
    day: 5,
    title: "Pull B",
    subtitle: "Horizontal Plane",
    focus: "Back Thickness, Forearms",
    mechanism: "Thoracic Lat Bias",
    description: "Building upper back density and addressing forearm development.",
    exercises: [
      {
        name: "Pendlay Row",
        variant: "Explosive Barbell",
        muscles: "Thoracic Lats, Traps, Rhomboids",
        sets: 3,
        reps: "6–10",
        tempo: "1-0-X-0",
        rest: "3m",
        rpe: "8-9",
        note: "Reset bar on floor each rep. Explosive concentric.",
        type: "Compound",
        searchQuery: "pendlay row perfect form"
      },
      {
        name: "Close-Grip Pulldown",
        variant: "Mag-Grip / Parallel",
        muscles: "Thoracic Lats, Brachialis",
        sets: 3,
        reps: "10–12",
        tempo: "3-1-1-0",
        rest: "2m",
        rpe: "9",
        note: "Targets muscle belly of lats.",
        type: "Compound",
        searchQuery: "close grip lat pulldown form"
      },
      {
        name: "Kelso Shrug",
        variant: "Incline Bench Dumbbell",
        muscles: "Mid & Lower Traps",
        sets: 4,
        reps: "12–15",
        tempo: "2-1-1-2",
        rest: "1.5m",
        rpe: "9",
        note: "Prone on incline. Retract scapula back and down.",
        type: "Isolation",
        searchQuery: "kelso shrug incline bench form"
      },
      {
        name: "Hammer Curl",
        variant: "Cross-Body Dumbbell",
        muscles: "Brachialis, Brachioradialis",
        sets: 3,
        reps: "8–12",
        tempo: "3-0-1-0",
        rest: "2m",
        rpe: "9",
        note: "Targets the muscle underneath the bicep to push it up.",
        type: "Isolation",
        searchQuery: "cross body hammer curls form"
      },
      {
        name: "Face Pull",
        variant: "Cable with External Rotation",
        muscles: "Rear Delt, Rotator Cuff",
        sets: 4,
        reps: "15–20",
        tempo: "2-0-1-1",
        rest: "1.5m",
        rpe: "8",
        note: "Prehab. Pull to forehead, hands end behind head.",
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
    mechanism: "Hip Dominant Movements",
    description: "Hypertrophy of Hamstrings and Glutes via hip extension.",
    exercises: [
      {
        name: "Romanian Deadlift (RDL)",
        variant: "Barbell with Straps",
        muscles: "Hamstrings, Glutes, Erectors",
        sets: 3,
        reps: "6–10",
        tempo: "3-1-1-0",
        rest: "3m",
        rpe: "8",
        note: "Push hips back until flexibility runs out. Do not round back.",
        type: "Compound",
        searchQuery: "romanian deadlift rdl perfect form"
      },
      {
        name: "Leg Curl",
        variant: "Seated Machine",
        muscles: "Hamstrings (Bi-articular)",
        sets: 4,
        reps: "10–15",
        tempo: "3-0-1-0",
        rest: "2m",
        rpe: "10",
        note: "Seated is 1.5x better than lying due to hip flexion stretch.",
        type: "Isolation",
        searchQuery: "seated leg curl optimal form"
      },
      {
        name: "Hip Thrust",
        variant: "Barbell",
        muscles: "Gluteus Maximus (Shortened)",
        sets: 3,
        reps: "8–12",
        tempo: "2-0-1-2",
        rest: "2.5m",
        rpe: "9",
        note: "Highest peak contraction for glutes. Hard squeeze.",
        type: "Compound",
        searchQuery: "barbell hip thrust form guide"
      },
      {
        name: "High Step-Up",
        variant: "Dumbbell",
        muscles: "Gluteus Maximus (Lengthened)",
        sets: 2,
        reps: "10–12",
        tempo: "3-0-1-0",
        rest: "2m",
        rpe: "8",
        note: "Use high box. Do not push off with non-working leg.",
        type: "Unilateral",
        searchQuery: "glute focused step up form"
      }
    ]
  },
  {
    day: 7,
    title: "Structural Integrity",
    subtitle: "The Gap Day",
    focus: "Neck, Abs, Rotator Cuff, Forearms",
    mechanism: "Prehab & Aesthetics",
    description: "Training smaller, neglected muscle groups and injury prevention.",
    exercises: [
      {
        name: "Neck Complex",
        variant: "Flexion & Extension",
        muscles: "Sternocleidomastoid, Splenius",
        sets: 3,
        reps: "15–20",
        tempo: "Controlled",
        rest: "1.5m",
        rpe: "8",
        note: "Thick neck is key for aesthetic power look.",
        type: "Isolation",
        searchQuery: "neck training for hypertrophy safety"
      },
      {
        name: "Forearm Complex",
        variant: "Wrist Curl & Extension",
        muscles: "Flexors, Extensors",
        sets: 3,
        reps: "15–20",
        tempo: "Controlled",
        rest: "1.5m",
        rpe: "9",
        note: "Target both underside and topside of forearm.",
        type: "Isolation",
        searchQuery: "forearm hypertrophy workout form"
      },
      {
        name: "Abdominal Complex",
        variant: "Hanging Leg Raise / Cable Crunch",
        muscles: "Rectus Abdominis",
        sets: 3,
        reps: "10–15",
        tempo: "Controlled",
        rest: "1.5m",
        rpe: "9",
        note: "Focus on curling the pelvis, not just lifting legs.",
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
        rpe: "9",
        note: "Bent knee isolates the soleus (slow twitch).",
        type: "Isolation",
        searchQuery: "seated calf raise soleus form"
      }
    ]
  }
];

const TempoBadge = ({ tempo }) => (
  <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-xs font-mono text-gray-400 border border-gray-700">
    <Clock size={12} />
    <span>{tempo}</span>
  </div>
);

const MuscleBadge = ({ muscle }) => (
  <div className="flex items-center gap-1 bg-gray-800 px-2 py-1 rounded text-xs font-medium text-blue-400 border border-blue-900/30">
    <Activity size={12} />
    <span>{muscle}</span>
  </div>
);

const ExerciseCard = ({ exercise, index }) => {
  const openVideo = () => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.searchQuery)}`;
    window.open(url, '_blank');
  };

  const openImages = () => {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(exercise.searchQuery)}`;
    window.open(url, '_blank');
  };

  const formattedIndex = (index + 1).toString().padStart(2, '0');

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg group flex flex-col h-full relative">
      
      {/* Serial Number */}
      <div className="absolute top-3 right-3 z-10">
        <span className="text-3xl md:text-4xl font-bold text-gray-800/50 group-hover:text-blue-900/40 transition-colors select-none">
          {formattedIndex}
        </span>
      </div>

      <div className="p-4 md:p-5 flex-grow relative z-0">
        <div className="flex justify-between items-start mb-3 pr-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                {exercise.name}
              </h3>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold bg-blue-900/30 text-blue-400 border border-blue-900/50">
                {exercise.type}
              </span>
            </div>
            <p className="text-sm text-gray-400 font-medium leading-tight">{exercise.variant}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <MuscleBadge muscle={exercise.muscles} />
          <TempoBadge tempo={exercise.tempo} />
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4 bg-gray-950 rounded-lg p-2 border border-gray-800">
          <div className="text-center">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wide">Sets</span>
            <span className="text-lg font-bold text-white">{exercise.sets}</span>
          </div>
          <div className="text-center border-l border-gray-800">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wide">Reps</span>
            <span className="text-lg font-bold text-white">{exercise.reps}</span>
          </div>
          <div className="text-center border-l border-gray-800">
            <span className="block text-[10px] text-gray-500 uppercase tracking-wide">Rest</span>
            <span className="text-lg font-bold text-white">{exercise.rest}</span>
          </div>
        </div>

        <div className="bg-blue-900/5 rounded-lg p-3 border border-blue-900/20 mb-4">
          <div className="flex gap-2 items-start">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-300 italic leading-relaxed">
              {exercise.note}
            </p>
          </div>
        </div>
      </div>

      {/* Visual Reference Actions - Optimized for Mobile Taps */}
      <div className="bg-gray-950 p-3 border-t border-gray-800 grid grid-cols-2 gap-3">
        <button 
          onClick={openVideo}
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-blue-900/20 text-blue-400 text-sm font-bold py-3 md:py-2 rounded-lg transition-colors border border-gray-800 hover:border-blue-500/50 active:bg-blue-900/30"
        >
          <Youtube size={18} />
          Watch Demo
        </button>
        <button 
          onClick={openImages}
          className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-gray-300 text-sm font-bold py-3 md:py-2 rounded-lg transition-colors border border-gray-800 hover:border-gray-600 active:bg-gray-800/80"
        >
          <ImageIcon size={18} />
          View Form
        </button>
      </div>
    </div>
  );
};

export default function NaturalHypertrophyApp() {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentWorkout = workoutData.find(w => w.day === selectedDay);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-20 shadow-xl backdrop-blur-md bg-opacity-90">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg shadow-blue-500/20 shadow-lg">
              <Dumbbell className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white leading-tight">Hypertrophy<span className="text-blue-500">Architect</span></h1>
              <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">Natural Science Protocol</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              <BookOpen size={14} />
              Protocol Details
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Day Selector - Optimized for touch scrolling */}
        <div className="mb-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {workoutData.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`
                  flex flex-col items-center justify-center p-3 rounded-xl min-w-[85px] transition-all duration-200 border active:scale-95
                  ${selectedDay === day.day 
                    ? 'bg-blue-600 text-white border-blue-500 shadow-blue-900/50 shadow-lg scale-105' 
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

        {/* Workout Header Info */}
        <div className="mb-6 animate-fade-in">
          <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col gap-2 mb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex flex-wrap items-center gap-2">
                  {currentWorkout.title}
                  <span className="text-xs md:text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full border border-gray-700 font-medium whitespace-nowrap">
                    {currentWorkout.subtitle}
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-gray-800/50">
                  <Target className="text-red-500 mt-1 shrink-0" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Focus</span>
                    <p className="text-sm text-gray-200 leading-snug">{currentWorkout.focus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-gray-800/50">
                  <Zap className="text-yellow-500 mt-1 shrink-0" size={16} />
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wide block mb-0.5">Mechanism</span>
                    <p className="text-sm text-gray-200 leading-snug">{currentWorkout.mechanism}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Activity className="text-blue-500" />
              Workout Protocol
            </h3>
            <span className="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded border border-gray-800">
              {currentWorkout.exercises.length} Exercises
            </span>
          </div>

          <div className="grid gap-4">
            {currentWorkout.exercises.map((exercise, idx) => (
              <ExerciseCard key={idx} exercise={exercise} index={idx} />
            ))}
          </div>
        </div>

        {/* Legend / Info Footer */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-gray-500 text-sm">
          <h4 className="font-bold text-gray-300 mb-4 text-center md:text-left">Reading the Tempo (e.g., 3-1-X-0)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">1. Eccentric</span>
              <span className="text-xs">Lowering (3s)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">2. Stretch</span>
              <span className="text-xs">Pause Bottom (1s)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">3. Concentric</span>
              <span className="text-xs">Lift Fast (X)</span>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg border border-gray-800 text-center md:text-left">
              <span className="text-blue-400 font-bold block mb-1 text-xs uppercase">4. Contract</span>
              <span className="text-xs">Pause Top (0s)</span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}