import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import data from '../data/RambuData.json';
import { playCorrect, playWrong } from '../utils/sound';

export default function QuizScreen({ onHome, onFinish }) {
  const [idx, setIdx]             = useState(0);
  const [selected, setSelected]   = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers]     = useState({});
  const total = data.quizQuestions.length;
  const q     = data.quizQuestions[idx];

  function confirm() {
    if (selected === null) return;
    setAnswers(a => ({ ...a, [q.id]: selected }));
    setConfirmed(true);
    selected === q.answer ? playCorrect() : playWrong();
  }

  function next() {
    const finalAnswers = { ...answers, [q.id]: selected };
    if (idx < total - 1) {
      setIdx(i => i + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      onFinish(finalAnswers);
    }
  }

  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Quiz Akhir" subtitle={`Soal ${idx + 1} dari ${total}`} />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-5 mb-5 shadow-lg shadow-yellow-200"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="fredoka text-xl text-white">📝 Quiz Akhir</div>
            <div className="bg-white/25 rounded-full px-3 py-1 text-white font-extrabold text-sm">
              {idx + 1}/{total}
            </div>
          </div>
          <div className="flex gap-1.5">
            {data.quizQuestions.map((_, i) => (
              <div key={i} className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                answers[data.quizQuestions[i].id] !== undefined ? 'bg-white'
                  : i === idx ? 'bg-yellow-200'
                  : 'bg-white/30'
              }`} />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-md p-5 mb-4"
        >
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wide mb-2">Soal {idx + 1}</div>
          <p className="text-slate-800 font-bold text-base leading-relaxed">{q.question}</p>
        </motion.div>

        <div className="space-y-2.5 mb-4">
          {q.options.map((opt, i) => {
            const letter = 'ABCD'[i];
            let cls = 'quiz-opt';
            if (confirmed) {
              if (i === q.answer) cls += ' quiz-opt-correct';
              else if (i === selected && i !== q.answer) cls += ' quiz-opt-wrong';
            } else if (i === selected) cls += ' quiz-opt-selected';

            return (
              <motion.button
                key={i}
                whileHover={!confirmed ? { x: 4 } : {}}
                whileTap={!confirmed ? { scale: 0.98 } : {}}
                onClick={() => !confirmed && setSelected(i)}
                disabled={confirmed}
                className={cls}
              >
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold mr-3 flex-shrink-0 ${
                  confirmed && i === q.answer               ? 'bg-green-200 text-green-700'
                  : confirmed && i === selected && i !== q.answer ? 'bg-red-200 text-red-700'
                  : i === selected                          ? 'bg-blue-200 text-blue-700'
                  : 'bg-slate-200 text-slate-600'
                }`}>
                  {letter}
                </span>
                {opt}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {confirmed && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`rounded-2xl p-4 mb-4 ${
                selected === q.answer
                  ? 'bg-green-50 border-2 border-green-300'
                  : 'bg-red-50 border-2 border-red-300'
              }`}
            >
              <p className={`font-extrabold text-base mb-1 ${selected === q.answer ? 'text-green-700' : 'text-red-700'}`}>
                {selected === q.answer ? '🎉 Benar! Hebat sekali!' : '❌ Kurang tepat!'}
              </p>
              <p className="text-sm font-semibold text-slate-600 leading-relaxed">
                <strong>Penjelasan:</strong> {q.penjelasan}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={confirmed ? next : confirm}
          disabled={selected === null && !confirmed}
          className={`btn-action w-full justify-center ${
            confirmed          ? 'bg-blue-500 text-white shadow-blue-200'
            : selected !== null ? 'bg-yellow-400 text-yellow-900 shadow-yellow-200'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {confirmed
            ? idx < total - 1 ? 'Soal Berikutnya →' : '🏆 Lihat Hasil'
            : 'Konfirmasi Jawaban ✓'}
        </motion.button>

        <button onClick={onHome} className="btn-back w-full justify-center mt-3">
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}