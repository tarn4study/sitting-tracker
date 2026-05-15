import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface AlertPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AlertPopup = ({ isVisible, onClose }: AlertPopupProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -50, x: 20, scale: 0.5, opacity: 0 }}
          animate={{ 
            y: [0, -10, 0],
            x: 0, 
            scale: 1, 
            opacity: 1 
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            default: {
              type: "spring",
              stiffness: 300,
              damping: 15
            }
          }}
          exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.2 } }}
          className="fixed top-10 right-10 w-80 bg-[#FFD93D] p-6 rounded-3xl rounded-tr-none shadow-2xl border-4 border-white flex gap-4 z-50 overflow-hidden"
        >
          <div className="w-12 h-12 bg-white rounded-full flex-shrink-0 flex items-center justify-center text-2xl shadow-inner border-2 border-[#8B6E00]/20">⚠️</div>
          <div className="relative">
            <button 
              onClick={onClose}
              className="absolute -top-4 -right-4 p-2 text-[#8B6E00] hover:scale-110 transition-transform"
            >
              <X size={20} />
            </button>
            <p className="font-black text-[#8B6E00] leading-tight text-lg mb-1 italic uppercase tracking-tighter">HEY YOU!</p>
            <p className="font-bold text-[#5D4E56] text-sm leading-snug">
              You've been sitting for 25 minutes! Time to stand up and stretch those legs!
            </p>
          </div>
          <motion.div 
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute inset-0 bg-white/10 pointer-events-none"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
