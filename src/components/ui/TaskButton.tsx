import React from 'react';
import { motion } from 'motion/react';
import { TaskType } from '../../types';

interface TaskButtonProps {
  key?: React.Key;
  type: TaskType;
  emoji: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const TaskButton = ({ 
  type, 
  emoji, 
  label, 
  isSelected, 
  onClick 
}: TaskButtonProps) => {
  const getColors = () => {
    switch (type) {
      case 'work': return isSelected ? 'bg-blue-100 border-blue-400 text-blue-500' : 'bg-white border-blue-100 text-blue-300 hover:bg-blue-50';
      case 'read': return isSelected ? 'bg-purple-100 border-purple-400 text-purple-500' : 'bg-white border-purple-100 text-purple-300 hover:bg-purple-50';
      case 'game': return isSelected ? 'bg-[#FFEDF2] border-[#FF8DA1] text-[#FF8DA1]' : 'bg-white border-pink-100 text-pink-300 hover:bg-pink-50';
      case 'relax': return isSelected ? 'bg-green-100 border-green-400 text-green-500' : 'bg-white border-green-100 text-green-300 hover:bg-green-50';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-4 shadow-sm ${getColors()} ${isSelected ? 'shadow-inner scale-105' : ''}`}
      id={`task-btn-${type}`}
    >
      <div className={`text-3xl mb-1 ${isSelected ? 'scale-110' : ''}`}>
        {emoji}
      </div>
      <span className="font-black text-sm uppercase tracking-tight">{label}</span>
    </motion.button>
  );
};
