import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ current, total, label }) {
  const pct = Math.round((current / total) * 100);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-white/80">
          {label || `Langkah ${current} dari ${total}`}
        </span>
        <span className="text-xs font-extrabold text-white bg-white/20 px-2 py-0.5 rounded-full">
          {pct}%
        </span>
      </div>
      <div className="h-3 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}