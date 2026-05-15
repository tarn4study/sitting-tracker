import React from 'react';
import { motion } from 'motion/react';
import { useSittingSession } from './hooks/useSittingSession';
import { Character } from './components/ui/Character';
import { TaskButton } from './components/ui/TaskButton';
import { HistorySidebar } from './components/HistorySidebar';
import { AlertPopup } from './components/AlertPopup';
import { TASKS, SESSION_LIMIT_SECONDS } from './constants/tasks';
import { formatTime } from './utils/time';

export default function App() {
  const {
    status,
    selectedTask,
    setSelectedTask,
    timer,
    history,
    showAlert,
    setShowAlert,
    toggleStatus,
    deleteSession
  } = useSittingSession();

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#5D4E56] font-sans flex flex-col p-6 md:p-10 overflow-hidden relative border-[12px] border-white">
      {/* Header Section */}
      <header className="flex justify-between items-start mb-8 w-full max-w-6xl mx-auto">
        <div className="flex gap-6 items-center">
          <Character status={status} />
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#FF6B8B] uppercase italic">SIT BUDDY</h1>
            <p className="text-base md:text-lg font-bold opacity-70">Taking care of your back, one sit at a time!</p>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8 flex-1 max-w-6xl w-full mx-auto min-h-0">
        {/* Main Control Panel */}
        <main className="flex-[1.5] flex flex-col gap-6">
          {/* Timer Display Card */}
          <div className="bg-white rounded-[48px] p-8 md:p-12 shadow-xl flex flex-col items-center justify-center border-b-[8px] border-pink-200 relative">
            <div className="text-[10px] font-black bg-[#FFD93D] text-[#8B6E00] px-4 py-1 rounded-full absolute -top-3 uppercase tracking-tighter border-2 border-white shadow-sm">
              {status === 'sitting' ? 'Active Sitting Session' : 'Ready to Sit?'}
            </div>
            <div className="text-7xl md:text-8xl font-black tracking-widest tabular-nums text-[#5D4E56]">
              {formatTime(timer)}
            </div>
            <div className="w-full h-4 bg-pink-50 rounded-full mt-8 overflow-hidden border-2 border-pink-100 max-w-md">
              <motion.div
                animate={{ width: `${Math.min((timer / SESSION_LIMIT_SECONDS) * 100, 100)}%` }}
                className="h-full bg-[#FF8DA1] rounded-full shadow-[0_0_12px_rgba(255,141,161,0.5)]"
              />
            </div>
          </div>

          {/* Task Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TASKS.map((task) => {
              const props = {
                type: task.type,
                label: task.label,
                emoji: task.emoji,
                isSelected: selectedTask === task.type,
                onClick: () => setSelectedTask(task.type)
              };
              return <TaskButton key={task.type} {...props} />;
            })}
          </div>

          {/* Major Actions */}
          <div className="flex gap-6 mt-auto">
            <motion.button
              whileHover={{ scale: 1.02, y: 4 }}
              whileTap={{ scale: 0.98, y: 8 }}
              onClick={() => status === 'standing' && toggleStatus()}
              disabled={status === 'sitting'}
              className={`flex-1 bg-[#4ADE80] text-white text-3xl font-black py-8 rounded-[40px] shadow-[0_12px_0_#22C55E] border-4 border-white uppercase italic tracking-wider transition-all ${status === 'sitting' ? 'opacity-30 grayscale cursor-not-allowed shadow-none translate-y-3' : ''}`}
            >
              SIT
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, y: 4 }}
              whileTap={{ scale: 0.98, y: 8 }}
              onClick={() => status === 'sitting' && toggleStatus()}
              disabled={status === 'standing'}
              className={`flex-1 bg-[#FB7185] text-white text-3xl font-black py-8 rounded-[40px] shadow-[0_12px_0_#E11D48] border-4 border-white uppercase italic tracking-wider transition-all ${status === 'standing' ? 'opacity-30 grayscale cursor-not-allowed shadow-none translate-y-3' : ''}`}
            >
              STAND
            </motion.button>
          </div>
        </main>

        <HistorySidebar history={history} onDelete={deleteSession} />
      </div>

      <AlertPopup isVisible={showAlert} onClose={() => setShowAlert(false)} />

      {/* Footer Status */}
      <footer className="mt-8 flex justify-between items-center bg-white/40 px-8 py-3 rounded-2xl w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_#4ADE80]"></div>
          <span className="text-[10px] font-black uppercase opacity-50 tracking-widest">A long sit make a man sick.</span>
        </div>
        <div className="text-[10px] font-black uppercase opacity-50 tracking-widest tabular-nums">
          Keep it up! (๑•ᴗ•๑)
        </div>
      </footer>
    </div>
  );
}
