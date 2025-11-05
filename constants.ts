import type { WorkoutData } from './types';

const HIIT_WORKOUTS = Array.from({ length: 3 }, (_, cycleIndex) => 
  Array.from({ length: 5 }, (_, sessionIndex) => ({
    id: `hiit_c${cycleIndex + 1}_s${sessionIndex + 1}`,
    name: `Cycle ${cycleIndex + 1} - Workout ${sessionIndex + 1}`,
    category: 'hiit',
    info: `Beginner HIIT from The Body Coach App. Find Cycle ${cycleIndex + 1}.`,
    duration: 20,
    link: 'https://www.youtube.com/c/thebodycoachtv',
    cycle: cycleIndex + 1,
    session: sessionIndex + 1,
  }))
).flat();

const YOGA_PILATES_WORKOUTS = [
    { id: 'yoga_morning_flow', name: 'Morning Flow', category: 'yoga_pilates', info: 'Energising morning yoga session. From The Body Coach App.', duration: 15 },
    { id: 'yoga_power', name: 'Power Yoga', category: 'yoga_pilates', info: 'A challenging yoga workout to build strength. From The Body Coach App.', duration: 30 },
    { id: 'yoga_bedtime', name: 'Bedtime Yoga', category: 'yoga_pilates', info: 'A relaxing flow to wind down. From The Body Coach App.', duration: 10 },
    { id: 'pilates_core', name: 'Core Pilates', category: 'yoga_pilates', info: 'Strengthen your core with this focused Pilates routine. From The Body Coach App.', duration: 20 },
    { id: 'pilates_full_body', name: 'Full Body Pilates', category: 'yoga_pilates', info: 'A complete Pilates workout for the entire body. From The Body Coach App.', duration: 25 },
];

const SMM_WORKOUTS = [
    { id: 'smm_1', name: 'Daily Mobility Routine', category: 'smm_daily', info: 'Essential daily movements from SMM.', duration: 10 },
    { id: 'smm_2', name: 'Hip Mobility Flow', category: 'smm_daily', info: 'Focus on opening up the hips with SMM.', duration: 15 },
    { id: 'smm_stability_1', name: 'Core Stability', category: 'smm_stability', info: 'Build a solid core foundation.', duration: 15 },
    { id: 'smm_stability_2', name: 'Single Leg Stability', category: 'smm_stability', info: 'Improve balance and control.', duration: 15 },
    { id: 'smm_spf_1', name: 'Shoulder Opening', category: 'smm_spf', info: 'Relieve shoulder tension with SPF.', duration: 10 },
    { id: 'smm_spf_2', name: 'Posture Corrector', category: 'smm_spf', info: 'Exercises to improve your posture from SPF.', duration: 12 },
];

export const DEFAULT_WORKOUT_DATA: WorkoutData = {
  categories: [
    { id: 'hiit', name: 'HIIT', description: 'High-Intensity Interval Training from The Body Coach.' },
    { id: 'yoga_pilates', name: 'Yoga & Pilates', description: 'Flow and strengthen with The Body Coach.' },
    { id: 'smm_daily', name: 'SMM', description: 'Simple Mobility Method for daily movements.' },
    { id: 'smm_stability', name: 'Stability Builder', description: 'Build a solid core foundation and improve balance.' },
    { id: 'smm_spf', name: 'SPF', description: 'Shoulder and Posture Fix exercises.' },
  ],
  workouts: [
    ...HIIT_WORKOUTS,
    ...YOGA_PILATES_WORKOUTS,
    ...SMM_WORKOUTS,
  ],
};
