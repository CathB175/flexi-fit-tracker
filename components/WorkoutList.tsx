import React from 'react';
import type { WorkoutCategory, Workout, WorkoutProgress } from '../types';
import WorkoutListItem from './WorkoutListItem';

interface WorkoutListProps {
  category: WorkoutCategory;
  allWorkouts: Workout[];
  onSelectWorkout: (workoutId: string) => void;
  getWorkoutProgress: (workout: Workout) => WorkoutProgress;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ category, allWorkouts, onSelectWorkout, getWorkoutProgress }) => {
  const workouts = allWorkouts.filter(w => w.category === category.id);

  const renderWorkouts = (workoutList: Workout[]) => {
      return workoutList.map(workout => (
        <WorkoutListItem
            key={workout.id}
            workout={workout}
            progress={getWorkoutProgress(workout)}
            onClick={() => onSelectWorkout(workout.id)}
        />
    ));
  }

  const renderGroupedWorkouts = () => {
    if (category.id === 'hiit') {
        const cycles = [...new Set(workouts.map(w => w.cycle))].sort();
        return cycles.map(cycleNum => (
            <div key={`cycle-${cycleNum}`} className="mb-8">
                <h3 className="text-2xl font-bold text-brand-light mb-4 border-b-2 border-brand-secondary pb-2">Cycle {cycleNum}</h3>
                <div className="space-y-3">{renderWorkouts(workouts.filter(w => w.cycle === cycleNum))}</div>
            </div>
        ));
    }
    
    return <div className="space-y-3">{renderWorkouts(workouts)}</div>
  }

  return (
    <div>
      <p className="text-lg text-gray-300 mb-6">{category.description}</p>
      {renderGroupedWorkouts()}
    </div>
  );
};

export default WorkoutList;
