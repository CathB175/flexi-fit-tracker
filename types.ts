export interface WorkoutCategory {
  id: string; // More flexible for user-defined categories
  name: string;
  description: string;
}

export interface Workout {
  id: string;
  name: string;
  category: string; // Links to WorkoutCategory['id']
  info: string;
  duration: number; // in minutes
  link?: string;
  // For HIIT
  cycle?: number;
  session?: number;
}

export interface WorkoutSession {
  id:string;
  date: string; // ISO string format
  duration: number; // in minutes
  notes: string;
}

export type WorkoutLog = Record<string, WorkoutSession[]>; // key: workout.id

export type WorkoutProgress = {
  isNext: boolean;
  lastCompleted?: string;
  totalCompletions: number;
};

export type ViewState = 
  | { type: 'home' }
  | { type: 'category'; categoryId: string }
  | { type: 'detail'; workoutId: string }
  | { type: 'settings' };

export interface WorkoutData {
  categories: WorkoutCategory[];
  workouts: Workout[];
}
