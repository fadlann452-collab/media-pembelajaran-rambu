import React from 'react'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import ProgressRing from '../components/ProgressRing';
import data from '../data/rambuData.json';
import { playWin } from '../utils/sound';

function Confetti() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    color: ['#60a5fa', '#facc15', '#4ade80', '#f472b6', '#a78bfa'][i % 5],
    size: 6 + Math.random() * 8,
  }));
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {items.map(c => (
        <motion.div
          key={c.id}
          initial={{ y: -20, x: `${c.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '100vh', opacity: 0, rotate: 360 }}
          transition={{ duration: 2 + Math.random(), delay: c.delay, ease: 'easeIn' }}
          className="absolute rounded-sm"
          style={{ width: c.size, height: c.size, background: c.color }}
        />
      ))}
    </div>
  );
}

export default function HasilScreen({ answers, onHome, onRetry }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const total   = data.quizQuestions.length;
  const correct = data.quizQuestions.filter(q => answers[q.id] === q.answer).length;
  const pct     = Math.round((correct / total) * 100);
  const badge   = data.badges.find(b => pct >= b.minScore) || data.badges[data.badges.length - 1];

  useEffect(() => {
    playWin();
    if (pct >= 70) setShowConfetti(true);
  }, []);

  const ringColor = pct >= 90 ? '#22c55e' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f97316' : '#ef4444';

  return (
    <div className="min-h-screen">
      {showConfetti && <Confetti />}
      <TopBar onHome={onHome} title="Hasil Belajar" subtitle="Quiz Akhir Rambu Lalu Lintas" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 mb-5 text-center shadow-xl shadow-orange-200 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/15 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/15 rounded-full" />
          <motion.div
            animate={{ scale: [1, 1.12, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="text-6xl mb-2 relative"
          >
            {badge.icon}
          </motion.div>
          <div className="fredoka text-3xl text-white mb-1">{badge.label}</div>
          <p className="text-orange-100 text-sm font-semibold">{badge.message}</p>
        </motion.div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-1 bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center"
          >
            <div className="relative">
              <ProgressRing pct={pct} size={72} color={ringColor} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="fredoka text-slate-800 text-lg">{pct}%</span>
              </div>
            </div>
            <div className="text-xs font-extrabold text-slate-500 mt-1">Skor</div>
          </motion.div>

          <div className="col-span-2 grid grid-cols-2 gap-3">
            {[
              { label: 'Benar',      val: correct,         color: 'text-green-600', bg: 'bg-green-50 border-green-200',  ic: '✅' },
              { label: 'Salah',      val: total - correct, color: 'text-red-600',   bg: 'bg-red-50 border-red-200',      ic: '❌' },
              { label: 'Total Soal', val: total,           color: 'text-blue-600',  bg: 'bg-blue-50 border-blue-200',    ic: '📝' },
              { label: 'Nilai',      val: pct,             color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200',  ic: '⭐' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15 + i * 0.07 }}
                className={`${s.bg} border-2 rounded-2xl p-3 text-center`}
              >
                <div className="text-lg">{s.ic}</div>
                <div className={`fredoka text-xl ${s.color}`}>{s.val}</div>
                <div className="text-xs font-extrabold text-slate-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-md p-4 mb-5"
        >
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
            Rincian Jawaban
          </div>
          <div className="space-y-2">
            {data.quizQuestions.map((q, i) => {
              const isCorrect = answers[q.id] === q.answer;
              return (
                <div key={q.id} className={`flex items-start gap-2.5 p-2.5 rounded-xl ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                  <span className="text-sm flex-shrink-0 mt-0.5">{isCorrect ? '✅' : '❌'}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-2">
                      <span className="text-slate-400 font-semibold mr-1">S{i + 1}.</span>
                      {q.question}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs text-green-700 font-semibold mt-0.5">
                        Jawaban: {q.options[q.answer]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="btn-back flex-1 justify-center"
          >
            🔄 Ulangi Quiz
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onHome}
            className="btn-next flex-1 justify-center"
          >
            🏠 Ke Beranda
          </motion.button>
        </div>
      </div>
    </div>
  );
}