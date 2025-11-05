import React from 'react';
import type { WorkoutCategory } from '../types';

interface CategoryCardProps {
  category: WorkoutCategory;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-700 border border-gray-700 hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-1"
    >
      <h3 className="text-2xl font-bold text-brand-primary mb-2">{category.name}</h3>
      <p className="text-gray-300">{category.description}</p>
    </div>
  );
};

export default CategoryCard;
