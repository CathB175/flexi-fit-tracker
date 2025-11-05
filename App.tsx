import React, { useState, useMemo } from 'react';
import { useWorkoutData } from './hooks/useWorkoutData';
import { useAppData } from './hooks/useAppData';
import type { WorkoutCategory, ViewState } from './types';
import Header from './components/Header';
import CategoryCard from './components/CategoryCard';
import WorkoutList from './components/WorkoutList';
import WorkoutDetail from './components/WorkoutDetail';
import DataManager from './components/DataManager';
import CostAdvisory from './components/CostAdvisory';

export default function App() {
  const { workoutData, setWorkoutData, resetToDefault } = useAppData();
  const { logs, addLog, getWorkoutProgress } = useWorkoutData(workoutData.workouts);
  const [view, setView] = useState<ViewState>({ type: 'home' });

  const handleSelectCategory = (category: WorkoutCategory) => {
    setView({ type: 'category', categoryId: category.id });
  };

  const handleSelectWorkout = (workoutId: string) => {
    setView({ type: 'detail', workoutId: workoutId });
  };

  const handleBack = () => {
    if (view.type === 'detail') {
      const workout = workoutData.workouts.find(w => w.id === view.workoutId);
      if (workout) {
        setView({ type: 'category', categoryId: workout.category });
        return;
      }
    }
    setView({ type: 'home' });
  };

  const currentCategory = useMemo(() => {
    if (view.type === 'category') {
      return workoutData.categories.find(c => c.id === view.categoryId);
    }
    if (view.type === 'detail') {
      const workout = workoutData.workouts.find(w => w.id === view.workoutId);
      return workoutData.categories.find(c => c.id === workout?.category);
    }
    return undefined;
  }, [view, workoutData]);
  
  const currentWorkout = useMemo(() => {
    if (view.type === 'detail') {
      return workoutData.workouts.find(w => w.id === view.workoutId);
    }
    return undefined;
  }, [view, workoutData]);

  const renderContent = () => {
    switch (view.type) {
      case 'home':
        return (
          <>
            <h2 className="text-2xl font-bold text-brand-primary mb-4">What do you fancy doing?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workoutData.categories.map(category => (
                <CategoryCard key={category.id} category={category} onClick={() => handleSelectCategory(category)} />
              ))}
            </div>
            <CostAdvisory />
          </>
        );
      case 'category':
        return currentCategory ? (
          <WorkoutList
            category={currentCategory}
            allWorkouts={workoutData.workouts}
            onSelectWorkout={handleSelectWorkout}
            getWorkoutProgress={getWorkoutProgress}
          />
        ) : <p>Category not found.</p>;
      case 'detail':
        return currentWorkout ? (
            <WorkoutDetail 
                workout={currentWorkout} 
                logs={logs[currentWorkout.id] || []}
                addLog={addLog}
            />
        ) : <p>Workout not found.</p>;
      case 'settings':
        return (
          <DataManager
            currentData={workoutData}
            onSave={(newData) => {
              setWorkoutData(newData);
              alert('Your workout data has been updated!');
              setView({ type: 'home' });
            }}
            onReset={() => {
              if (window.confirm('Are you sure you want to reset all workout data to the original defaults? This cannot be undone.')) {
                resetToDefault();
                alert('Workout data has been reset to default.');
                setView({ type: 'home' });
              }
            }}
          />
        );
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header 
        title={currentCategory?.name || (view.type === 'settings' ? 'Manage Data' : "Flexi-Fit Tracker")} 
        showBack={view.type !== 'home'} 
        onBack={handleBack}
        showSettings={view.type === 'home'}
        onGoToSettings={() => setView({ type: 'settings'})}
      />
      <main className="p-4 pb-20 max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
}
