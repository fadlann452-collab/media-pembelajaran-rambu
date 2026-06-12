import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong, playWin } from '../utils/sound';

const DATA = [
  {
    id: 1,
    shape: 'square',
    color: '#22c55e',
    symbol: '🏥',
    answer: 'Menunjukkan lokasi rumah sakit',
    options: [
      'Menunjukkan lokasi rumah sakit',
      'Tempat parkir',
      'SPBU',
      'Sekolah'
    ]
  },

  {
    id: 2,
    shape: 'square',
    color: '#22c55e',
    symbol: '⛽',
    answer: 'Menunjukkan lokasi SPBU',
    options: [
      'Rumah sakit',
      'Menunjukkan lokasi SPBU',
      'Terminal',
      'Rest Area'
    ]
  },

  {
    id: 3,
    shape: 'circle',
    color: '#ef4444',
    symbol: '—',
    answer: 'Melarang kendaraan masuk',
    options: [
      'Wajib berhenti',
      'Melarang kendaraan masuk',
      'Boleh masuk',
      'Jalan satu arah'
    ]
  },

  {
    id: 4,
    shape: 'circle-cmd',
    color: '#3b82f6',
    symbol: '↑',
    answer: 'Memerintahkan kendaraan berjalan lurus',
    options: [
      'Belok kiri',
      'Belok kanan',
      'Memerintahkan kendaraan berjalan lurus',
      'Putar balik'
    ]
  }
];

export default function AktivitasFungsi({ onHome }) {

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
      playCorrect();
      setScore(s => s + 1);
    } else {
      playWrong();
    }

    setTimeout(() => {

      if (idx < DATA.length - 1) {
        setIdx(i => i + 1);
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
          title="Fungsi Rambu"
          subtitle="Hasil Aktivitas"
        />

        <div className="max-w-2xl mx-auto px-4 py-6">

          <div className="bg-white rounded-3xl p-8 shadow-lg text-center">

            <div className="text-6xl mb-3">
              🎯
            </div>

            <h2 className="fredoka text-3xl mb-3">
              Aktivitas Selesai
            </h2>

            <div className="text-5xl fredoka text-green-500">
              {score}/{DATA.length}
            </div>

            <button
              onClick={onHome}
              className="btn-next w-full justify-center mt-6"
            >
              Kembali
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
        title="Tebak Fungsi Rambu"
        subtitle={`Soal ${idx + 1} dari ${DATA.length}`}
      />

      <div className="max-w-2xl mx-auto px-4 py-6">

        <div className="bg-white rounded-3xl p-6 shadow-md mb-5">

          <div className="flex justify-center mb-4">

            <RambuSVG
              shape={item.shape}
              color={item.color}
              symbol={item.symbol}
              size={120}
            />

          </div>

          <p className="text-center font-extrabold text-lg">
            Apa fungsi rambu ini?
          </p>

        </div>

        <div className="space-y-3">

          {item.options.map(opt => {

            let cls =
              'w-full p-4 rounded-2xl border-2 font-bold text-left';

            if (picked) {

              if (opt === item.answer)
                cls += ' bg-green-50 border-green-400';

              else if (opt === picked)
                cls += ' bg-red-50 border-red-400';

              else
                cls += ' bg-slate-50 border-slate-200';

            } else {

              cls +=
                ' bg-white border-slate-200 hover:border-blue-400';

            }

            return (
              <button
                key={opt}
                onClick={() => choose(opt)}
                disabled={picked}
                className={cls}
              >
                {opt}
              </button>
            );
          })}
        </div>

        <AnimatePresence>

          {picked && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`mt-4 p-4 rounded-2xl text-center font-bold ${
                picked === item.answer
                  ? 'bg-green-50 border-2 border-green-300 text-green-700'
                  : 'bg-red-50 border-2 border-red-300 text-red-700'
              }`}
            >
              {picked === item.answer
                ? '🎉 Jawaban Benar!'
                : `❌ Jawaban yang benar adalah: ${item.answer}`}
            </motion.div>

          )}

        </AnimatePresence>

      </div>
    </div>
  );
}