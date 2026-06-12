import React from 'react'
import { motion } from 'framer-motion';
import ProgressRing from '../components/ProgressRing';
import { playClick } from '../utils/sound';

const MENU = [
  {
    id: 'profil',
    icon: '👩‍🏫',
    label: 'Profil Pengajar',
    sub: 'Kenali gurumu',
    color: 'from-violet-400 to-purple-500',
    shadow: 'shadow-purple-200',
  },
  {
    id: 'petunjuk',
    icon: '📖',
    label: 'Petunjuk',
    sub: 'Cara menggunakan',
    color: 'from-sky-400 to-blue-500',
    shadow: 'shadow-blue-200',
  },
  {
    id: 'tujuan',
    icon: '🎯',
    label: 'Tujuan Pembelajaran',
    sub: 'Yang akan dipelajari',
    color: 'from-amber-400 to-orange-500',
    shadow: 'shadow-orange-200',
  },
  {
    id: 'materi',
    icon: '📚',
    label: 'Materi',
    sub: '4 jenis rambu lalu lintas',
    color: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-indigo-200',
  },
  {
    id: 'galeri',
    icon: '🖼️',
    label: 'Galeri Rambu',
    sub: '17 rambu interaktif',
    color: 'from-teal-400 to-green-500',
    shadow: 'shadow-green-200',
  },
  {
    id: 'game',
    icon: '🎮',
    label: 'Game Tebak Rambu',
    sub: '10 soal + skor langsung',
    color: 'from-pink-400 to-rose-500',
    shadow: 'shadow-red-200',
  },
  {
    id: 'quiz',
    icon: '📝',
    label: 'Quiz Akhir',
    sub: '10 soal pilihan ganda',
    color: 'from-yellow-400 to-amber-500',
    shadow: 'shadow-yellow-200',
  },
  {
    id: 'hasil',
    icon: '🏆',
    label: 'Hasil Belajar',
    sub: 'Lihat nilai & badge',
    color: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-emerald-200',
  },
];

// Section yang menambah progress %
const PROGRESS_MAP = {
  materi: 20,
  galeri: 20,
  game:   30,
  quiz:   30,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
};

export default function DashboardScreen({ onNavigate, progress }) {
  const totalProgress = Object.entries(PROGRESS_MAP).reduce(
    (sum, [key, val]) => (progress[key] ? sum + val : sum),
    0
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

      {/* ── Hero Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-5 mb-6 shadow-xl shadow-blue-200 relative overflow-hidden"
      >
        {/* Dekorasi lingkaran */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full" />

        {/* Baris atas: ikon + judul + ring */}
        <div className="relative flex items-center gap-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="text-5xl flex-shrink-0"
          >
            🚦
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="fredoka text-2xl text-white leading-tight">
              Belajar Rambu
              <br />
              Lalu Lintas
            </div>
            <div className="text-blue-100 text-sm font-bold mt-1">
              SD Kelas 4 · Tema 4
            </div>
          </div>

          <div className="flex-shrink-0 text-center">
            <div className="relative inline-flex items-center justify-center">
              <ProgressRing pct={totalProgress} size={60} color="#facc15" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="fredoka text-white text-sm">{totalProgress}%</span>
              </div>
            </div>
            <div className="text-blue-200 text-xs font-bold mt-0.5">Progress</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mt-4">
          <div className="flex justify-between text-xs text-blue-200 font-bold mb-1.5">
            <span>Progress Belajarmu</span>
            <span>{totalProgress}% selesai</span>
          </div>
          <div className="h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            />
          </div>
          {/* Titik +% per seksi */}
          <div className="flex justify-between mt-2">
            {Object.entries(PROGRESS_MAP).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    progress[key] ? 'bg-yellow-300' : 'bg-white/30'
                  }`}
                />
                <span
                  className={`text-xs font-bold ${
                    progress[key] ? 'text-yellow-200' : 'text-blue-300'
                  }`}
                >
                  +{val}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Label Menu ── */}
      <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3 px-1">
        Menu Pembelajaran
      </div>

      {/* ── Grid Kartu Menu ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {MENU.map((m) => {
          const done = progress[m.id];
          return (
            <motion.div
              key={m.id}
              variants={item}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { playClick(); onNavigate(m.id); }}
              className={`menu-card p-4 relative overflow-hidden ${m.shadow}`}
            >
              {/* Garis warna atas */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${m.color} rounded-t-3xl`}
              />

              {/* Badge centang jika sudah selesai */}
              {done && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                  ✓
                </div>
              )}

              {/* Ikon */}
              <div
                className={`w-12 h-12 bg-gradient-to-br ${m.color} rounded-2xl flex items-center justify-center text-2xl mb-3 shadow-md`}
              >
                {m.icon}
              </div>

              {/* Label */}
              <div className="fredoka text-base text-slate-800 leading-tight mb-1">
                {m.label}
              </div>
              <div className="text-xs text-slate-400 font-semibold leading-snug">
                {m.sub}
              </div>

              {/* Mini progress bar (hanya untuk seksi yang punya poin) */}
              {PROGRESS_MAP[m.id] && (
                <div className="mt-2.5 flex items-center gap-1.5">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${m.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: done ? '100%' : '0%' }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    />
                  </div>
                  <span
                    className={`text-xs font-extrabold ${
                      done ? 'text-green-500' : 'text-slate-300'
                    }`}
                  >
                    {done ? '✓' : `+${PROGRESS_MAP[m.id]}%`}
                  </span>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Footer hint ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-slate-400 font-semibold mt-6"
      >
        Klik kartu untuk mulai belajar 👆
      </motion.p>
    </div>
  );
}