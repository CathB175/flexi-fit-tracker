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

const EquipmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
        <path d="M14 12h8"></path><path d="M2 12h2"></path><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M12 12a6 6 0 0 1-6-6h0a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v0"></path><path d="M12 12a6 6 0 0 1-6 6h0a6 6 0 0 1 6 6h0a6 6 0 0 1 6-6v0"></path>
    </svg>
);

// Fix: Update NoteIcon to accept a className prop to fix a type error.
const NoteIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={['text-gray-400', className].filter(Boolean).join(' ')}>
        <path d="M8 6h8c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z"></path><path d="M16 4h2a2 2 0 0 1 2 2v2"></path><path d="M8 4H6a2 2 0 0 0-2 2v2"></path><path d="M16 20h2a2 2 0 0 0 2-2v-2"></path><path d="M8 20H6a2 2 0 0 1-2-2v-2"></path>
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
        <p className="text-gray-300 mb-4">{workout.info}</p>
        
        <div className="space-y-3 border-t border-gray-700 pt-4 mt-4">
            <div className="flex items-center gap-3 text-gray-300">
                <ClockIcon />
                <span className="font-semibold">{workout.duration} minutes (planned)</span>
            </div>
            {workout.equipment && (
                 <div className="flex items-center gap-3 text-gray-300">
                    <EquipmentIcon />
                    <span className="font-semibold">{workout.equipment}</span>
                </div>
            )}
            {workout.notes && (
                 <div className="flex items-start gap-3 text-gray-300">
                    <NoteIcon className="flex-shrink-0 mt-0.5" />
                    <span className="italic">"{workout.notes}"</span>
                </div>
            )}
        </div>
        
        {workout.link && (
          <a
            href={workout.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-light hover:text-brand-primary font-semibold transition-colors mt-4"
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
