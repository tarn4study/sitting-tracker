import { motion } from 'motion/react';
import { SittingStatus } from '../../types';

interface CharacterProps {
  status: SittingStatus;
}

export const Character = ({ status }: CharacterProps) => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center" id="character-container">
      <motion.div
        animate={{
          y: status === 'sitting' ? [0, 5, 0] : [0, -10, 0],
          scale: status === 'sitting' ? [1, 1.05, 1] : [1, 1.1, 1],
        }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-24 h-24 bg-white rounded-full border-4 border-[#FFB6C1] flex items-center justify-center shadow-lg relative overflow-hidden"
      >
        <img
          src="/image.png"
          alt="Character Placeholder"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        animate={{ scale: status === 'sitting' ? [1, 1.2, 1] : [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-2 w-16 h-2 bg-black/10 rounded-full blur-sm"
      />
    </div>
  );
};
