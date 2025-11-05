import { useState, useEffect } from 'react';
import type { WorkoutData } from '../types';
import { DEFAULT_WORKOUT_DATA } from '../constants';

const DATA_STORAGE_KEY = 'flexiFitWorkoutData';

export const useAppData = () => {
  const [workoutData, setWorkoutData] = useState<WorkoutData>(DEFAULT_WORKOUT_DATA);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(DATA_STORAGE_KEY);
      if (storedData) {
        setWorkoutData(JSON.parse(storedData));
      } else {
        // If no data is stored, initialize with defaults
        localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(DEFAULT_WORKOUT_DATA));
      }
    } catch (error) {
      console.error("Failed to load workout data from localStorage", error);
    }
  }, []);

  const updateWorkoutData = (newData: WorkoutData) => {
    try {
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(newData));
      setWorkoutData(newData);
    } catch (error) {
      console.error("Failed to save workout data to localStorage", error);
    }
  };
  
  const resetToDefault = () => {
    try {
      localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(DEFAULT_WORKOUT_DATA));
      setWorkoutData(DEFAULT_WORKOUT_DATA);
    } catch (error) {
      console.error("Failed to reset workout data in localStorage", error);
    }
  };

  return { workoutData, setWorkoutData: updateWorkoutData, resetToDefault };
};
