import React from 'react'
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';

const GOALS = [
  { icon: '🔍', text: 'Menjelaskan pengertian rambu lalu lintas dengan benar',       color: 'bg-blue-50 border-blue-200'   },
  { icon: '⚠️', text: 'Mengenal dan memahami jenis-jenis rambu peringatan',           color: 'bg-yellow-50 border-yellow-200'},
  { icon: '🚫', text: 'Memahami rambu larangan dan konsekuensi melanggarnya',         color: 'bg-red-50 border-red-200'     },
  { icon: '🔵', text: 'Mengetahui fungsi rambu perintah di jalan raya',               color: 'bg-blue-50 border-blue-200'   },
  { icon: '🟢', text: 'Membaca dan memanfaatkan informasi dari rambu petunjuk',       color: 'bg-green-50 border-green-200' },
  { icon: '🎯', text: 'Mematuhi rambu lalu lintas demi keselamatan bersama',          color: 'bg-purple-50 border-purple-200'},
];

export default function TujuanScreen({ onHome }) {
  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Tujuan Pembelajaran" subtitle="Yang akan kamu pelajari" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-5 mb-5 text-center shadow-lg shadow-orange-200"
        >
          <div className="text-4xl mb-2">🎯</div>
          <div className="fredoka text-2xl text-white">Tujuan Pembelajaran</div>
          <p className="text-orange-100 text-sm mt-1">Setelah belajar, kamu akan mampu...</p>
        </motion.div>

        <div className="space-y-3 mb-5">
          {GOALS.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.09 }}
              className={`${g.color} border-2 rounded-2xl p-4 flex items-center gap-4`}
            >
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                {g.icon}
              </div>
              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase">Tujuan {i + 1}</span>
                <p className="text-sm font-bold text-slate-700 leading-snug mt-0.5">{g.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 mb-5 text-center"
        >
          <p className="text-indigo-800 font-bold text-sm">
            📋 Tujuan Pembelajaran — Fase B Kelas 4<br />
            <span className="text-indigo-600 font-semibold">Bahasa Indonesia: Menjelaskan Simbol Lalu Lintas</span>
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHome}
          className="btn-next w-full justify-center"
        >
          🏠 Kembali ke Beranda
        </motion.button>
      </div>
    </div>
  );
}