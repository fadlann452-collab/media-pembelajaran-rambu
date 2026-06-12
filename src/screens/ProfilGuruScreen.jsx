import React from 'react'
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import guruPhoto from '../assets/guru2.png';

export default function ProfilGuruScreen({ onHome, onBack }) {
  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Profil Guru" subtitle="Mengenal Ibu/Bapak Guru" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 mb-5 text-center shadow-lg shadow-purple-200 relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <motion.img
            src={guruPhoto}
            alt="Foto Guru"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-32 h-32 object-cover rounded-full mx-auto mb-3 border-4 border-purple-300 shadow-xl bg-white p-1"
          />
          <div className="fredoka text-2xl text-white">Astriani Naila Putri</div>
          <div className="text-purple-200 text-sm font-bold mt-1">Guru Kelas 4 SD Nusantara</div>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {['📍 Yogyakarta', '🎓 S1 PGSD', '⭐ 10 Tahun Mengajar'].map(t => (
              <div key={t} className="bg-white/20 rounded-full px-3 py-1 text-xs font-bold text-white">{t}</div>
            ))}
          </div>    
        </motion.div>

        {[
          {
            icon: '💬', title: 'Profile',
            color: 'bg-blue-50 border-blue-200', text: 'text-blue-800',
            body: 'Nama saya Astriani. Saya lahir di Jakarta, pada tanggal 14 Juni 2006. Saat ini saya merupakan mahasiswa Program Studi PGSD di universitas nahdlatul ulama Yogyakarta. Saya memiliki minat dalam bidang pendidikan, khususnya pembelajaran kreatif dan pendidikan inklusi. Sejak kecil, saya memiliki ketertarikan untuk belajar dan membantu orang lain. Hal tersebut membuat saya tertarik menjadi seorang pendidik di masa depan. Selama menempuh pendidikan, saya aktif mengikuti berbagai kegiatan akademik maupun organisasi untuk mengembangkan kemampuan diri. Saya memiliki cita-cita menjadi guru yang kreatif, sabar, dan mampu memberikan pembelajaran yang menyenangkan bagi peserta didik. Saya percaya bahwa pendidikan merupakan salah satu cara untuk membantu menciptakan masa depan yang lebih baik.',
          },
          {
            icon: '📋', title: 'Mata Pelajaran',
            color: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800',
            body: 'Fase B Kelas 4 "Bahasa Indonesia: Belajar Rambu Lalu Lintas',
          },
          {
            icon: '🎯', title: 'Capaian Pembelajaran',
            color: 'bg-green-50 border-green-200', text: 'text-green-800',
            body: 'Peserta didik mampu mengidentifikasi makna simbol atau petunjuk di lingkungan sekitar, termasuk simbol/rambu lalu lintas, serta menjelaskan fungsinya dalam kehidupan sehari-hari ',
          },
          {
            icon: '📅', title: 'Alokasi Waktu',
            color: 'bg-red-50 border-red-200', text: 'text-red-800',
            body: '2 × 35 menit (1 pertemuan). Media ini dapat digunakan sebagai penguatan materi di dalam maupun luar kelas.',
          },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${c.color} border-2 rounded-2xl p-4 mb-3`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{c.icon}</span>
              <div>
                <div className={`font-extrabold ${c.text} mb-1`}>{c.title}</div>
                <p className={`text-sm ${c.text} font-semibold leading-relaxed opacity-80`}>{c.body}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <button
          onClick={onBack}
          className="btn-back w-full justify-center mt-2"
        >
        ← Kembali ke Profil Pengajar
        </button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onHome}
          className="btn-next w-full justify-center mt-2"
        >
          🏠 Kembali ke Beranda
        </motion.button>
      </div>
    </div>
  );
}