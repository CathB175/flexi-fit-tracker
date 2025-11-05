import React, { useState } from 'react';
import type { WorkoutData, WorkoutCategory, Workout } from '../types';
import { parseCsv } from '../utils/csvParser';

interface DataManagerProps {
  currentData: WorkoutData;
  onSave: (newData: WorkoutData) => void;
  onReset: () => void;
}

const DataManager: React.FC<DataManagerProps> = ({ currentData, onSave, onReset }) => {
  const [categoriesCsv, setCategoriesCsv] = useState('');
  const [workoutsCsv, setWorkoutsCsv] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleFileRead = (file: File, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const reader = new FileReader();
    reader.onload = (e) => setter(e.target?.result as string);
    reader.onerror = () => setError(`Error reading file: ${file.name}`);
    reader.readAsText(file);
  };

  const handleProcessAndSave = () => {
    setError(null);
    if (!categoriesCsv || !workoutsCsv) {
      setError('Please upload both categories.csv and workouts.csv files.');
      return;
    }

    try {
      const categoriesData = parseCsv(categoriesCsv, 'categories.csv');
      const workoutsData = parseCsv(workoutsCsv, 'workouts.csv');

      // Basic validation
      if (!categoriesData.every(c => c.id && c.name && c.description)) {
        throw new Error('Categories CSV is missing required columns: id, name, description.');
      }
      if (!workoutsData.every(w => w.id && w.name && w.category && w.info && w.duration)) {
         throw new Error('Workouts CSV is missing required columns: id, name, category, info, duration.');
      }
      
      const newCategories: WorkoutCategory[] = categoriesData.map(c => ({
        id: c.id,
        name: c.name,
        description: c.description,
      }));
      
      const newWorkouts: Workout[] = workoutsData.map(w => ({
        id: w.id,
        name: w.name,
        category: w.category,
        info: w.info,
        link: w.link || undefined,
        duration: parseInt(w.duration, 10),
        notes: w.notes || undefined,
        equipment: w.equipment || undefined,
        cycle: w.cycle ? parseInt(w.cycle, 10) : undefined,
        session: w.session ? parseInt(w.session, 10) : undefined,
      }));
      
      onSave({ categories: newCategories, workouts: newWorkouts });

    } catch (e: any)
{
      setError(`Failed to process CSV files: ${e.message}`);
    }
  };
  
  const handleExport = () => {
    const jsonString = JSON.stringify(currentData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flexifit_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-brand-primary mb-4">Manage Your Workout Data</h2>
        <p className="text-gray-300 mb-4">
          Here, you can replace the entire workout library by uploading two CSV files. This is perfect for customizing your routines. You can edit these files in any spreadsheet software.
        </p>
        <div className="space-y-2 text-sm bg-gray-900 p-4 rounded-md border border-gray-700">
            <p><strong className="text-white">categories.csv columns:</strong> <code className="text-brand-light">id,name,description</code></p>
            <p><strong className="text-white">workouts.csv columns:</strong> <code className="text-brand-light">id,name,category,info,duration,link,cycle,session,notes,equipment</code> (last 4 are optional)</p>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <div>
          <label className="block text-lg font-medium text-white mb-2">1. Upload Categories CSV</label>
          <input type="file" accept=".csv" onChange={e => e.target.files && handleFileRead(e.target.files[0], setCategoriesCsv)} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-secondary"/>
        </div>
        <div>
          <label className="block text-lg font-medium text-white mb-2">2. Upload Workouts CSV</label>
          <input type="file" accept=".csv" onChange={e => e.target.files && handleFileRead(e.target.files[0], setWorkoutsCsv)} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-secondary"/>
        </div>
        
        {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-md">{error}</p>}
        
        <button onClick={handleProcessAndSave} className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-secondary transition-colors text-lg">
          Process and Save Data
        </button>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg space-y-4">
        <h3 className="text-xl font-bold text-white">Advanced Options</h3>
         <button onClick={handleExport} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
          Export Current Data as JSON
        </button>
        <button onClick={onReset} className="w-full bg-red-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
          Reset to Default Workouts
        </button>
      </div>
    </div>
  );
};

export default DataManager;
