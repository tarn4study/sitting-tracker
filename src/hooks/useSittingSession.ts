import { useState, useEffect, useRef } from 'react';
import { SittingStatus, Session, TaskType } from '../types';
import { SESSION_LIMIT_SECONDS, MAX_HISTORY_ITEMS } from '../constants/tasks';

export const useSittingSession = () => {
  const [status, setStatus] = useState<SittingStatus>('standing');
  const [selectedTask, setSelectedTask] = useState<TaskType>('work');
  const [timer, setTimer] = useState(0);
  const [history, setHistory] = useState<Session[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  
  // Track the timestamp when the session started
  const startTimeRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
      // Set the start time if it's not already set
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }

      timerIntervalRef.current = setInterval(() => {
        if (startTimeRef.current) {
          // Calculate elapsed time based on absolute system clock
          const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
          setTimer(elapsedSeconds);
          
          if (elapsedSeconds >= SESSION_LIMIT_SECONDS && !showAlert) {
            setShowAlert(true);
          }
        }
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      startTimeRef.current = null;
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [status, showAlert]);

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
      startTimeRef.current = null;
    } else {
      setStatus('sitting');
      setShowAlert(false);
      startTimeRef.current = Date.now();
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
