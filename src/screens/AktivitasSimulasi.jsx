import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import { playCorrect, playWrong, playWin } from '../utils/sound';

const DATA = [
  {
    id: 1,
    emoji: '🚫',
    title: 'Dilarang Masuk',
    situation:
      'Kamu sedang bersepeda dan melihat rambu Dilarang Masuk.',
    answer: 'Cari jalan lain',
    options: [
      'Tetap masuk',
      'Cari jalan lain',
      'Ngebut',
      'Berhenti di tengah jalan'
    ]
  },

  {
    id: 2,
    emoji: '🚦',
    title: 'Lampu Merah',
    situation:
      'Saat berkendara kamu melihat lampu lalu lintas berwarna merah.',
    answer: 'Berhenti',
    options: [
      'Tetap jalan',
      'Ngebut',
      'Berhenti',
      'Belok sembarangan'
    ]
  },

  {
    id: 3,
    emoji: '🚂',
    title: 'Perlintasan Kereta',
    situation:
      'Kamu melihat rambu perlintasan kereta api di depan.',
    answer: 'Lebih waspada',
    options: [
      'Ngebut',
      'Lebih waspada',
      'Parkir',
      'Putar balik'
    ]
  },

  {
    id: 4,
    emoji: '🚶',
    title: 'Jalur Pejalan Kaki',
    situation:
      'Ada pejalan kaki yang akan menyeberang di zebra cross.',
    answer: 'Memberi jalan',
    options: [
      'Ngebut',
      'Membunyikan klakson terus',
      'Memberi jalan',
      'Menyalip'
    ]
  },

  {
    id: 5,
    emoji: '🏥',
    title: 'Rumah Sakit',
    situation:
      'Kamu melihat rambu petunjuk rumah sakit.',
    answer: 'Mengetahui lokasi rumah sakit',
    options: [
      'Tempat parkir',
      'Mengetahui lokasi rumah sakit',
      'SPBU',
      'Terminal'
    ]
  }
];

export default function AktivitasSimulasi({
  onHome,
  onMarkDone
}) {

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
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

    }, 1800);
  }

  if (done) {

    const pct = Math.round(
      (score / DATA.length) * 100
    );

    return (
      <div className="min-h-screen">

        <TopBar
          onHome={onHome}
          title="Simulasi Berkendara"
          subtitle="Hasil Aktivitas"
        />

        <div className="max-w-2xl mx-auto px-4 py-6">

          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-center text-white shadow-xl">

            <div className="text-7xl mb-4">
              🚗
            </div>

            <h2 className="fredoka text-3xl mb-3">
              Simulasi Selesai!
            </h2>

            <div className="text-6xl fredoka">
              {score}/{DATA.length}
            </div>

            <div className="mt-2 text-blue-100 font-bold">
              {pct}% benar
            </div>

            <div className="mt-5 bg-white/20 rounded-2xl p-4">

              {pct >= 80 && (
                <p className="font-bold">
                  🏆 Hebat! Kamu sudah paham cara
                  berlalu lintas dengan baik.
                </p>
              )}

              {pct >= 60 && pct < 80 && (
                <p className="font-bold">
                  👍 Bagus! Tinggal sedikit lagi.
                </p>
              )}

              {pct < 60 && (
                <p className="font-bold">
                  📚 Yuk pelajari lagi materinya.
                </p>
              )}

            </div>

            <button
              onClick={onMarkDone}
              className="mt-6 bg-white text-blue-600 font-extrabold px-6 py-3 rounded-2xl"
            >
              ✅ Selesai Aktivitas
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
        title="Simulasi Berkendara"
        subtitle={`Kasus ${idx + 1} dari ${DATA.length}`}
      />

      <div className="max-w-2xl mx-auto px-4 py-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 mb-5">

          <div className="text-center text-7xl mb-4">
            {item.emoji}
          </div>

          <h2 className="text-center font-extrabold text-xl mb-3">
            {item.title}
          </h2>

          <p className="text-center text-slate-600 font-semibold">
            {item.situation}
          </p>

        </div>

        <div className="space-y-3">

          {item.options.map(option => {

            let cls =
              'w-full p-4 rounded-2xl border-2 font-bold text-left';

            if (picked) {

              if (option === item.answer)
                cls +=
                  ' bg-green-50 border-green-400 text-green-700';

              else if (option === picked)
                cls +=
                  ' bg-red-50 border-red-400 text-red-700';

              else
                cls +=
                  ' bg-slate-50 border-slate-200';

            } else {

              cls +=
                ' bg-white border-slate-200 hover:border-blue-400';

            }

            return (
              <motion.button
                key={option}
                whileHover={!picked ? { x: 5 } : {}}
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
                ? '🎉 Tindakan yang tepat!'
                : `❌ Jawaban yang benar: ${item.answer}`}
            </motion.div>

          )}

        </AnimatePresence>

      </div>
    </div>
  );
}