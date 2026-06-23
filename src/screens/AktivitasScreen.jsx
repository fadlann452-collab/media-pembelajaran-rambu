import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import AktivitasCocokkan from './AktivitasCocokkan';
import AktivitasFungsi from './AktivitasFungsi';
import AktivitasSimulasi from './AktivitasSimulasi';
import { playClick } from '../utils/sound';

// ────────────────────────────────────────────────
// Data kartu menu 3 aktivitas
// ────────────────────────────────────────────────
const ACTIVITIES = [
  {
    key: 'cocokkan',
    no: 1,
    icon: '🎯',
    title: 'Cocokkan Jenis Rambu',
    desc: 'Kelompokkan rambu ke kategori yang tepat!',
    mechanism: 'Drag & Drop',
    grad: 'from-orange-400 to-amber-500',
    shadow: 'shadow-orange-200',
    badge: 'bg-orange-100 text-orange-700',
    tipColor: '#f97316',
  },
  {
    key: 'fungsi',
    no: 2,
    icon: '🔗',
    title: 'Fungsi Rambu',
    desc: 'Cocokkan setiap rambu dengan fungsinya!',
    mechanism: 'Matching Card',
    grad: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    tipColor: '#3b82f6',
  },
  {
    key: 'simulasi',
    no: 3,
    icon: '🛣️',
    title: 'Simulasi Berkendara',
    desc: 'Ambil keputusan yang benar di jalan!',
    mechanism: 'Skenario Nyata',
    grad: 'from-green-400 to-teal-500',
    shadow: 'shadow-green-200',
    badge: 'bg-green-100 text-green-700',
    tipColor: '#22c55e',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, x: -24 },
  show:   { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

// ────────────────────────────────────────────────
export default function AktivitasScreen({ onHome, onMarkDone }) {
  // current: null = menu, 'cocokkan' | 'fungsi' | 'simulasi' = sub-activity
  const [current, setCurrent] = useState(null);
  const [done, setDone]       = useState({ cocokkan: false, fungsi: false, simulasi: false });

  // ── Helpers ──────────────────────────────────
  const completedCount = Object.values(done).filter(Boolean).length;
  const allDone        = completedCount === 3;
  const progressPct    = Math.round((completedCount / 3) * 100);

  function handleComplete(key) {
    const next = { ...done, [key]: true };
    setDone(next);
    setCurrent(null); // kembali ke menu aktivitas
    // Trigger parent hanya setelah SEMUA selesai
    if (next.cocokkan && next.fungsi && next.simulasi) {
      // Beri jeda agar user lihat completion state dulu
      // onMarkDone dipanggil dari tombol di bawah, bukan otomatis
    }
  }

  function isLocked(key) {
    if (key === 'cocokkan') return false;
    if (key === 'fungsi')   return !done.cocokkan;
    if (key === 'simulasi') return !done.fungsi;
    return false;
  }

  // ── Render sub-activity ────────────────────────
  if (current === 'cocokkan') {
    return (
      <AktivitasCocokkan
        onBack={() => setCurrent(null)}
        onComplete={() => handleComplete('cocokkan')}
      />
    );
  }
  if (current === 'fungsi') {
    return (
      <AktivitasFungsi
        onBack={() => setCurrent(null)}
        onComplete={() => handleComplete('fungsi')}
      />
    );
  }
  if (current === 'simulasi') {
    return (
      <AktivitasSimulasi
        onBack={() => setCurrent(null)}
        onComplete={() => handleComplete('simulasi')}
      />
    );
  }

  // ── Menu utama ────────────────────────────────
  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Aktivitas" subtitle="Latihan Interaktif Rambu" />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl p-5 mb-6 shadow-xl shadow-orange-200 relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

          <div className="relative flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-4xl flex-shrink-0"
            >🎪</motion.div>

            <div className="flex-1 min-w-0">
              <div className="fredoka text-2xl text-white leading-tight">Aktivitas Belajar</div>
              <div className="text-orange-100 text-sm font-bold mt-0.5">
                Selesaikan 3 aktivitas untuk lanjut!
              </div>
            </div>

            <div className="flex-shrink-0 text-center">
              <div className="fredoka text-3xl text-white leading-none">{completedCount}</div>
              <div className="text-orange-200 text-xs font-bold">/ 3 selesai</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="relative mt-4">
            <div className="flex justify-between text-xs text-orange-200 font-bold mb-1.5">
              <span>Progress Aktivitas</span>
              <span>{progressPct}%</span>
            </div>
            <div className="h-3 bg-white/25 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>

        {/* ── Label ── */}
        <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Pilih Aktivitas
        </div>

        {/* ── Activity Cards ── */}
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-3 mb-6">
          {ACTIVITIES.map((act) => {
            const isDone   = done[act.key];
            const locked   = isLocked(act.key);
            const prevKey  = act.no === 2 ? 'cocokkan' : act.no === 3 ? 'fungsi' : null;

            return (
              <motion.div
                key={act.key}
                variants={cardItem}
                whileHover={!locked ? { scale: 1.02, x: 4 } : {}}
                whileTap={!locked ? { scale: 0.98 } : {}}
                onClick={() => { if (!locked) { playClick(); setCurrent(act.key); } }}
                className={`bg-white rounded-3xl shadow-md p-4 flex items-center gap-4 relative overflow-hidden border-2 transition-all duration-200 ${
                  isDone  ? 'border-green-300 cursor-pointer'
                  : locked ? 'border-slate-100 opacity-55 cursor-not-allowed'
                  : 'border-transparent hover:border-blue-200 cursor-pointer'
                } ${!locked ? act.shadow : ''}`}
              >
                {/* Left color strip */}
                <div className={`absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b ${act.grad} rounded-l-3xl`} />

                {/* Icon box */}
                <div className={`w-14 h-14 bg-gradient-to-br ${act.grad} rounded-2xl flex items-center justify-center text-2xl shadow-md flex-shrink-0 ml-1`}>
                  {isDone ? '✅' : locked ? '🔒' : act.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-xs font-extrabold text-slate-400">Aktivitas {act.no}</span>
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${act.badge}`}>
                      {act.mechanism}
                    </span>
                  </div>
                  <div className="fredoka text-base text-slate-800 leading-tight">{act.title}</div>
                  <div className="text-xs text-slate-500 font-semibold mt-0.5">{act.desc}</div>

                  {/* Locked hint */}
                  {locked && prevKey && (
                    <div className="text-xs text-slate-400 font-bold mt-1">
                      🔒 Selesaikan Aktivitas {act.no - 1} dulu
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0">
                  {isDone ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring' }}
                      className="w-9 h-9 bg-green-400 rounded-full flex items-center justify-center text-white text-lg shadow-sm"
                    >✓</motion.div>
                  ) : locked ? (
                    <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 text-lg">🔒</div>
                  ) : (
                    <motion.div
                      animate={{ x: [0, 3, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-extrabold text-sm"
                    >→</motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── All Done Banner ── */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl p-5 text-center shadow-xl shadow-green-200 mb-4 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/15 rounded-full" />
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="text-5xl mb-2"
              >🏆</motion.div>
              <div className="fredoka text-2xl text-white mb-1">Semua Aktivitas Selesai!</div>
              <p className="text-green-100 text-sm font-semibold mb-4">
                Kamu sudah menyelesaikan semua latihan dengan hebat!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onMarkDone}
                className="bg-white text-green-700 font-extrabold px-8 py-3 rounded-full shadow-md text-base inline-flex items-center gap-2"
              >
                ✅ Tandai Selesai & Lanjutkan
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Home button ── */}
        <button onClick={onHome} className="btn-back w-full justify-center">
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}