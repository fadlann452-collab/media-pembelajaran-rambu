import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import RambuSVG from '../components/RambuSVG';
import data from '../data/RambuData.json';
import { playCorrect, playWrong, playWin } from '../utils/sound';

export default function GameScreen({ onHome, onMarkDone }) {
  const [idx, setIdx]       = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore]   = useState(0);
  const [done, setDone]     = useState(false);
  const total = data.gameRambu.length;
  const q     = data.gameRambu[idx];

  function choose(opt) {
    if (picked !== null) return;
    const correct = opt === q.answer;
    setPicked(opt);
    if (correct) { setScore(s => s + 1); playCorrect(); }
    else playWrong();
    setTimeout(() => {
      if (idx < total - 1) { setIdx(i => i + 1); setPicked(null); }
      else { setDone(true); playWin(); }
    }, 1600);
  }

  function restart() { setIdx(0); setPicked(null); setScore(0); setDone(false); }

  if (done) {
    const pct = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen">
        <TopBar onHome={onHome} title="Game Tebak Rambu" subtitle="Hasil akhir game" />
        <div className="max-w-2xl mx-auto px-4 py-6 pb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-center mb-5 shadow-xl shadow-purple-200"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-6xl mb-3"
            >
              {pct >= 70 ? '🎉' : '😊'}
            </motion.div>
            <div className="fredoka text-3xl text-white mb-2">Game Selesai!</div>
            <div className="text-purple-100 text-base mb-4">Kamu mendapat skor</div>
            <div className="bg-white/20 rounded-2xl py-4 px-8 inline-block">
              <div className="fredoka text-5xl text-white">
                {score}<span className="text-2xl text-purple-200">/{total}</span>
              </div>
            </div>
            <div className="text-purple-200 text-sm mt-3 font-bold">{pct}% jawaban benar</div>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              ['🎯', 'Benar',   score,        'bg-green-50 border-green-200 text-green-700'],
              ['❌', 'Salah',   total - score, 'bg-red-50 border-red-200 text-red-700'],
              ['⭐', 'Akurasi', pct + '%',     'bg-yellow-50 border-yellow-200 text-yellow-700'],
            ].map(([ic, l, v, cls]) => (
              <div key={l} className={`${cls} border-2 rounded-2xl p-3 text-center`}>
                <div className="text-xl mb-0.5">{ic}</div>
                <div className="fredoka text-2xl">{v}</div>
                <div className="text-xs font-extrabold opacity-70">{l}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={restart} className="btn-back flex-1 justify-center">
              🔄 Main Lagi
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={onMarkDone} className="btn-next flex-1 justify-center">
              ✅ Selesai
            </motion.button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Game Tebak Rambu" subtitle={`Soal ${idx + 1} dari ${total}`} />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-5 mb-5 shadow-lg shadow-purple-200"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="fredoka text-xl text-white">🎮 Game Tebak Rambu</div>
            <div className="bg-white/20 rounded-full px-3 py-1 text-white font-extrabold text-sm">
              {score} ⭐
            </div>
          </div>
          <div className="flex gap-1.5">
            {data.gameRambu.map((_, i) => (
              <div key={i} className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                i < idx ? 'bg-white' : i === idx ? 'bg-yellow-300' : 'bg-white/30'
              }`} />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-md p-6 text-center mb-4"
        >
          <div className="flex justify-center mb-4">
            <RambuSVG shape={q.shape} color={q.color} symbol={q.symbol} size={120} />
          </div>
          <p className="text-slate-500 text-sm font-semibold italic">{q.desc}</p>
        </motion.div>

        <p className="text-center font-extrabold text-slate-700 text-base mb-4">Rambu ini bernama...?</p>

        <div className="space-y-2.5 mb-4">
          {q.options.map((opt, i) => {
            const letter = 'ABCD'[i];
            let cls = 'quiz-opt';
            if (picked !== null) {
              if (opt === q.answer) cls += ' quiz-opt-correct';
              else if (opt === picked) cls += ' quiz-opt-wrong';
            } else if (opt === picked) cls += ' quiz-opt-selected';

            return (
              <motion.button
                key={opt}
                whileHover={picked === null ? { x: 4 } : {}}
                whileTap={picked === null ? { scale: 0.98 } : {}}
                onClick={() => choose(opt)}
                disabled={picked !== null}
                className={cls}
              >
                <span className="inline-block w-7 h-7 bg-slate-200 rounded-lg text-xs font-extrabold text-slate-600 text-center leading-7 mr-3 flex-shrink-0">
                  {letter}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {picked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`rounded-2xl p-4 text-center font-extrabold text-base ${
                picked === q.answer
                  ? 'bg-green-50 border-2 border-green-300 text-green-700'
                  : 'bg-red-50 border-2 border-red-300 text-red-700'
              }`}
            >
              {picked === q.answer
                ? '🎉 Jawaban Benar! Hebat!'
                : `❌ Kurang tepat. Jawaban: ${q.answer}`}
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={onHome} className="btn-back w-full justify-center mt-4">
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}