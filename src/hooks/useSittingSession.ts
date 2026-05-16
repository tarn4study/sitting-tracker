import { useState, useEffect, useRef } from 'react';
import { SittingStatus, Session, TaskType } from '../types';
import { SESSION_LIMIT_SECONDS, MAX_HISTORY_ITEMS } from '../constants/tasks';

export const useSittingSession = () => {
  const [status, setStatus] = useState<SittingStatus>('standing');
  const [selectedTask, setSelectedTask] = useState<TaskType>('work');
  const [timer, setTimer] = useState(0);
  const [history, setHistory] = useState<Session[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem('sitHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error('Failed to parse history from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    if (status === 'sitting') {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          const next = prev + 1;
          if (next === SESSION_LIMIT_SECONDS) {
            setShowAlert(true);
          }
          return next;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status]);

  const toggleStatus = () => {
    if (status === 'sitting') {
      // Fallback for crypto.randomUUID() which requires a Secure Context (HTTPS or localhost)
      const generateId = () => {
        if (typeof crypto !== 'undefined' && crypto.randomUUID) {
          return crypto.randomUUID();
        }
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
      };

      const newSession: Session = {
        id: generateId(),
        task: selectedTask,
        duration: timer,
        timestamp: Date.now(),
        status: 'sitting'
      };
      const updatedHistory = [newSession, ...history].slice(0, MAX_HISTORY_ITEMS);
      setHistory(updatedHistory);
      localStorage.setItem('sitHistory', JSON.stringify(updatedHistory));
      setTimer(0);
      setStatus('standing');
    } else {
      setStatus('sitting');
      setShowAlert(false);
    }
  };

  const deleteSession = (id: string) => {
    const updatedHistory = history.filter(session => session.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem('sitHistory', JSON.stringify(updatedHistory));
  };

  return {
    status,
    selectedTask,
    setSelectedTask,
    timer,
    history,
    showAlert,
    setShowAlert,
    toggleStatus,
    deleteSession
  };
};
