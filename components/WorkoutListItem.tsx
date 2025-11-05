import React from 'react';
import type { Workout, WorkoutProgress } from '../types';

interface WorkoutListItemProps {
  workout: Workout;
  progress: WorkoutProgress;
  onClick: () => void;
}

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const NextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout, progress, onClick }) => {
  const { isNext, totalCompletions } = progress;

  const getStatusBadge = () => {
    if (isNext) {
      return <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm"><NextIcon /><span>Next Up</span></div>;
    }
    if (totalCompletions > 0) {
      return <div className="flex items-center gap-2 text-brand-primary font-semibold text-sm"><CheckIcon /><span>Completed {totalCompletions}x</span></div>;
    }
    return null;
  };

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 p-4 rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors border border-gray-700 hover:border-brand-secondary"
    >
      <div>
        <h4 className="font-bold text-lg text-white">{workout.name}</h4>
        <div className="flex items-center gap-x-4 text-sm text-gray-400 mt-1">
          <p className="flex-grow">{workout.info}</p>
          <div className="flex items-center gap-1.5 whitespace-nowrap flex-shrink-0">
            <ClockIcon />
            <span>{workout.duration} min</span>
          </div>
        </div>
      </div>
      <div className="flex-shrink-0 ml-4">
        {getStatusBadge()}
      </div>
    </div>
  );
};

export default WorkoutListItem;
