import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong, playWin } from '../utils/sound';

const DATA = [
  {
    id: 1,
    shape: 'circle',
    color: '#ef4444',
    symbol: '—',
    name: 'Dilarang Masuk',
    answer: 'Larangan'
  },
  {
    id: 2,
    shape: 'triangle',
    color: '#f59e0b',
    symbol: '↱',
    name: 'Tikungan Kanan',
    answer: 'Peringatan'
  },
  {
    id: 3,
    shape: 'square',
    color: '#22c55e',
    symbol: '🏥',
    name: 'Rumah Sakit',
    answer: 'Petunjuk'
  },
  {
    id: 4,
    shape: 'circle-cmd',
    color: '#3b82f6',
    symbol: '↑',
    name: 'Wajib Lurus',
    answer: 'Perintah'
  }
];

const OPTIONS = [
  'Peringatan',
  'Larangan',
  'Perintah',
  'Petunjuk'
];

export default function AktivitasCocokkan({ onHome, onBack }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [done, setDone] = useState(false);

  const item = DATA[idx];

  function choose(option) {
    if (picked) return;

    setPicked(option);

    const correct = option === item.answer;

    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
    }

    setTimeout(() => {
      if (idx < DATA.length - 1) {
        setIdx((i) => i + 1);
        setPicked(null);
      } else {
        setDone(true);
        playWin();
      }
    }, 1500);
  }

  if (done) {
    return (
      <div className="min-h-screen">
        <TopBar
          onHome={onHome}
          title="Aktivitas Cocokkan"
          subtitle="Hasil Aktivitas"
        />

        <div className="max-w-2xl mx-auto px-4 py-6">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

            <div className="text-6xl mb-3">
              🎉
            </div>

            <h2 className="fredoka text-3xl mb-2">
              Aktivitas Selesai!
            </h2>

            <p className="text-slate-500 mb-4">
              Skor kamu
            </p>

            <div className="text-5xl fredoka text-indigo-600">
              {score}/{DATA.length}
            </div>

            <button
              onClick={onHome, onBack}
              className="btn-next w-full justify-center mt-6"
            >
              ✅ Kembali ke Aktivitas
            </button>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">

      <TopBar
        onHome={onHome}
        title="Cocokkan Jenis Rambu"
        subtitle={`Soal ${idx + 1} dari ${DATA.length}`}
      />

      <div className="max-w-2xl mx-auto px-4 py-6">

        <div className="bg-white rounded-3xl shadow-md p-6 mb-5">

          <div className="flex justify-center mb-4">
            <RambuSVG
              shape={item.shape}
              color={item.color}
              symbol={item.symbol}
              size={120}
            />
          </div>

          <h2 className="text-center font-extrabold text-lg">
            {item.name}
          </h2>

          <p className="text-center text-slate-500 mt-2">
            Rambu ini termasuk jenis...
          </p>

        </div>

        <div className="space-y-3">

          {OPTIONS.map((option) => {

            let cls =
              'w-full p-4 rounded-2xl border-2 text-left font-bold transition';

            if (picked) {

              if (option === item.answer) {
                cls +=
                  ' bg-green-50 border-green-400 text-green-700';
              }

              else if (option === picked) {
                cls +=
                  ' bg-red-50 border-red-400 text-red-700';
              }

              else {
                cls +=
                  ' bg-slate-50 border-slate-200';
              }

            } else {

              cls +=
                ' bg-white border-slate-200 hover:border-indigo-400';

            }

            return (
              <motion.button
                key={option}
                whileHover={!picked ? { x: 4 } : {}}
                whileTap={!picked ? { scale: 0.98 } : {}}
                disabled={picked}
                onClick={() => choose(option)}
                className={cls}
              >
                {option}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {picked && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 p-4 rounded-2xl text-center font-extrabold ${
                picked === item.answer
                  ? 'bg-green-50 border-2 border-green-300 text-green-700'
                  : 'bg-red-50 border-2 border-red-300 text-red-700'
              }`}
            >
              {picked === item.answer
                ? '🎉 Benar!'
                : `❌ Salah! Jawabannya ${item.answer}`}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}