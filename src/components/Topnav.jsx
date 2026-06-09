import React from 'react';
import { motion } from 'framer-motion';

const SCREENS = ['landing', 'tujuan', 'materi', 'galeri', 'game', 'quiz', 'hasil'];

export default function TopNav({ currentScreen, onHome }) {
  const idx = SCREENS.indexOf(currentScreen);
  if (currentScreen === 'landing') return null;

  const navItems = [
    { id: 'tujuan', label: '🎯 Tujuan', idx: 1 },
    { id: 'materi', label: '📚 Materi', idx: 2 },
    { id: 'galeri', label: '🖼 Galeri', idx: 3 },
    { id: 'game', label: '🎮 Game', idx: 4 },
    { id: 'quiz', label: '📝 Quiz', idx: 5 },
  ];

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-2xl mx-auto px-4 py-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onHome}
              className="text-2xl hover:scale-110 transition-transform"
              title="Ke Halaman Utama"
            >
              🚦
            </button>
            <div>
              <div className="fredoka text-sm font-bold text-blue-800 leading-none">
                Rambu Lalu Lintas
              </div>
              <div className="text-xs text-slate-500 font-semibold">SD Kelas 4</div>
            </div>
          </div>

          {/* Dot indicator */}
          <div className="flex gap-1.5 items-center">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                className={`rounded-full transition-all duration-300 ${
                  idx >= item.idx
                    ? 'bg-indigo-500'
                    : 'bg-slate-200'
                }`}
                animate={{
                  width: currentScreen === item.id ? 20 : 10,
                  height: 10,
                }}
              />
            ))}
          </div>
        </div>

        {/* Step pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full transition-all duration-200 ${
                currentScreen === item.id
                  ? 'bg-indigo-500 text-white shadow-md'
                  : idx > item.idx
                  ? 'bg-green-100 text-green-700'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {idx > item.idx ? '✓ ' : ''}
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}