import { useState, useEffect, useCallback } from 'react';
import type { WorkoutLog, WorkoutSession, Workout, WorkoutProgress } from '../types';

const LOCAL_STORAGE_KEY = 'flexiFitWorkoutLogs';

export const useWorkoutData = (allWorkouts: Workout[]) => {
  const [logs, setLogs] = useState<WorkoutLog>({});

  useEffect(() => {
    try {
      const storedLogs = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedLogs) {
        setLogs(JSON.parse(storedLogs));
      }
    } catch (error) {
      console.error("Failed to load workout logs from localStorage", error);
    }
  }, []);

  const saveLogs = (newLogs: WorkoutLog) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newLogs));
      setLogs(newLogs);
    } catch (error) {
      console.error("Failed to save workout logs to localStorage", error);
    }
  };

  const addLog = (workoutId: string, session: Omit<WorkoutSession, 'id'>) => {
    const newSession: WorkoutSession = { ...session, id: new Date().toISOString() };
    const newLogs = { ...logs };
    const workoutLogs = newLogs[workoutId] || [];
    newLogs[workoutId] = [...workoutLogs, newSession].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    saveLogs(newLogs);
  };

  const getWorkoutProgress = useCallback((workout: Workout): WorkoutProgress => {
    const workoutLogs = logs[workout.id] || [];
    const lastCompleted = workoutLogs.length > 0 ? workoutLogs[0].date : undefined;
    
    let isNext = false;
    if (workout.category === 'hiit') {
      const allHiitWorkouts = allWorkouts
        .filter(w => w.category === 'hiit' && w.cycle !== undefined && w.session !== undefined)
        .sort((a, b) => (a.cycle! * 10 + a.session!) - (b.cycle! * 10 + b.session!));
      
      let lastCompletedHiitIndex = -1;
      
      for(let i = allHiitWorkouts.length - 1; i >= 0; i--) {
        if((logs[allHiitWorkouts[i].id] || []).length > 0) {
          lastCompletedHiitIndex = i;
          break;
        }
      }
      
      const nextWorkoutIndex = lastCompletedHiitIndex + 1;
      if (nextWorkoutIndex < allHiitWorkouts.length) {
        isNext = allHiitWorkouts[nextWorkoutIndex].id === workout.id;
      }

      // If no HIIT has been done, the first one is next.
      if (lastCompletedHiitIndex === -1 && workout.cycle === 1 && workout.session === 1) {
        isNext = true;
      }
    }

    return {
      isNext,
      lastCompleted,
      totalCompletions: workoutLogs.length,
    };
  }, [logs, allWorkouts]);

  return { logs, addLog, getWorkoutProgress };
};
