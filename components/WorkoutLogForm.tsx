import React, { useState } from 'react';
import type { WorkoutSession } from '../types';

interface WorkoutLogFormProps {
  onSubmit: (session: Omit<WorkoutSession, 'id'>) => void;
  onCancel: () => void;
  plannedDuration: number;
}

const WorkoutLogForm: React.FC<WorkoutLogFormProps> = ({ onSubmit, onCancel, plannedDuration }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date(date).toISOString(),
      duration: plannedDuration,
      notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">Date Completed</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-brand-primary focus:border-brand-primary"
          required
        />
      </div>
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-300 mb-1">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={3}
          className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white focus:ring-brand-primary focus:border-brand-primary"
          placeholder="How did it feel? Any PBs?"
        />
      </div>
      <div className="flex gap-4">
        <button type="button" onClick={onCancel} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
          Cancel
        </button>
        <button type="submit" className="w-full bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-brand-secondary transition-colors">
          Save Log
        </button>
      </div>
    </form>
  );
};

export default WorkoutLogForm;
