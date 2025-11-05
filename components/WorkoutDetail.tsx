import React, { useState } from 'react';
import type { Workout, WorkoutSession } from '../types';
import WorkoutLogForm from './WorkoutLogForm';

interface WorkoutDetailProps {
  workout: Workout;
  logs: WorkoutSession[];
  addLog: (workoutId: string, session: Omit<WorkoutSession, 'id'>) => void;
}

const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const WorkoutDetail: React.FC<WorkoutDetailProps> = ({ workout, logs, addLog }) => {
  const [showLogForm, setShowLogForm] = useState(false);

  const handleLogSubmit = (session: Omit<WorkoutSession, 'id'>) => {
    addLog(workout.id, session);
    setShowLogForm(false);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-brand-primary mb-2">{workout.name}</h2>
        <div className="flex items-center gap-2 text-gray-300 mb-4 text-lg">
            <ClockIcon />
            <span className="font-semibold">{workout.duration} minutes (planned)</span>
        </div>
        <p className="text-gray-300 mb-4">{workout.info}</p>
        {workout.link && (
          <a
            href={workout.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-light hover:text-brand-primary font-semibold transition-colors"
          >
            <LinkIcon/>
            Find on YouTube/App
          </a>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Log a New Session</h3>
        {showLogForm ? (
          <WorkoutLogForm 
            onSubmit={handleLogSubmit} 
            onCancel={() => setShowLogForm(false)} 
            plannedDuration={workout.duration}
          />
        ) : (
          <button
            onClick={() => setShowLogForm(true)}
            className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors"
          >
            Log Workout
          </button>
        )}
      </div>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Completion History</h3>
        {logs.length > 0 ? (
          <ul className="space-y-4">
            {logs.map(log => (
              <li key={log.id} className="border-b border-gray-700 pb-4">
                <p className="font-semibold text-brand-light">{formatDate(log.date)}</p>
                <p className="text-gray-300">Duration: {log.duration} minutes</p>
                {log.notes && <p className="text-gray-400 mt-2 italic">Notes: "{log.notes}"</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">You haven't logged this workout yet.</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutDetail;
