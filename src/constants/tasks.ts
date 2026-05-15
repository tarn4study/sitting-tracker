import { TaskType } from '../types';

export const TASKS: { type: TaskType; label: string; emoji: string }[] = [
  { type: 'work', label: 'Work', emoji: '💻' },
  { type: 'read', label: 'Read', emoji: '📚' },
  { type: 'game', label: 'Game', emoji: '🎮' },
  { type: 'relax', label: 'Relax', emoji: '🍵' },
];

export const SESSION_LIMIT_SECONDS = 1500; // 25 minutes
export const MAX_HISTORY_ITEMS = 50;
