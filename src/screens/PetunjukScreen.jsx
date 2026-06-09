import React from 'react'
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';

const STEPS = [
  { no: '1', icon: '🏠', title: 'Buka Beranda',     desc: 'Di beranda ada menu kartu besar. Klik kartu yang ingin kamu pelajari.',          color: 'bg-blue-50 border-blue-200'   },
  { no: '2', icon: '📚', title: 'Pelajari Materi',  desc: 'Buka menu Materi dulu. Ada 4 jenis rambu lalu lintas yang perlu dipahami.',       color: 'bg-indigo-50 border-indigo-200'},
  { no: '3', icon: '🖼️', title: 'Lihat Galeri',     desc: 'Di Galeri, klik tiap rambu untuk melihat nama, arti, dan fungsinya.',             color: 'bg-teal-50 border-teal-200'   },
  { no: '4', icon: '🎮', title: 'Main Game',         desc: 'Uji pemahamanmu di Game Tebak Rambu. Ada 7 soal dengan gambar rambu.',            color: 'bg-pink-50 border-pink-200'   },
  { no: '5', icon: '📝', title: 'Kerjakan Quiz',     desc: 'Setelah game, kerjakan Quiz Akhir. Ada 10 soal pilihan ganda.',                   color: 'bg-yellow-50 border-yellow-200'},
  { no: '6', icon: '🏆', title: 'Lihat Hasil',       desc: 'Hasil belajarmu muncul di menu Hasil Belajar lengkap dengan badge.',              color: 'bg-green-50 border-green-200' },
];

const TIPS = [
  { icon: '🔊', text: 'Aktifkan suara untuk mendengar efek benar/salah' },
  { icon: '👆', text: 'Klik Si Rambu 🚦 di pojok kanan bawah untuk tips' },
  { icon: '🔄', text: 'Kamu bisa mengulang game dan quiz sebanyak yang kamu mau' },
  { icon: '📱', text: 'Website ini bisa dibuka di HP maupun komputer' },
];

export default function PetunjukScreen({ onHome }) {
  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Petunjuk Penggunaan" subtitle="Cara memakai media belajar ini" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-3xl p-5 mb-5 text-center shadow-lg shadow-blue-200"
        >
          <div className="text-4xl mb-2">📖</div>
          <div className="fredoka text-2xl text-white">Cara Menggunakan</div>
          <p className="text-blue-100 text-sm mt-1">Baca dulu ya sebelum mulai belajar!</p>
        </motion.div>

        <div className="mb-5">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
            Langkah-langkah Belajar
          </div>
          <div className="space-y-3">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.no}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`${s.color} border-2 rounded-2xl p-4 flex items-start gap-3`}
              >
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm flex-shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="font-extrabold text-slate-800 text-sm mb-0.5">
                    <span className="text-slate-400 font-bold mr-1">Langkah {s.no} ·</span>
                    {s.title}
                  </div>
                  <p className="text-xs text-slate-600 font-semibold leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-5"
        >
          <div className="text-xs font-extrabold text-yellow-800 uppercase tracking-widest mb-3">💡 Tips Belajar</div>
          <div className="space-y-2">
            {TIPS.map(t => (
              <div key={t.text} className="flex items-start gap-2">
                <span className="text-lg flex-shrink-0">{t.icon}</span>
                <p className="text-xs text-yellow-800 font-bold leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
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