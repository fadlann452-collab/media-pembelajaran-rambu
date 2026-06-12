import React from 'react';
import { motion } from 'framer-motion';
import unuLogo from '../assets/unu.png';
import mbkmLogo from '../assets/mbkm2.png';
import tutwuriLogo from '../assets/tutwuri.png';

const features = [

];

export default function LandingScreen({ onStart }) {
return ( <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">

```
  {/* Dekorasi */}
  <div className="absolute top-8 left-8 text-5xl opacity-20">☁️</div>
  <div className="absolute top-20 right-10 text-5xl opacity-20">🚦</div>
  <div className="absolute bottom-20 left-10 text-5xl opacity-20">🚗</div>
  <div className="absolute bottom-10 right-20 text-4xl opacity-20">🛵</div>

  <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col items-center text-center">

    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-4 mb-6 flex-wrap"
    >
      <img
        src={mbkmLogo}
        alt=" "
        className="h-8 object-contain"
      />

      <img
        src={unuLogo}
        alt=" "
        className="h-8 object-contain"
      />

      <img
        src={tutwuriLogo}
        alt=" "
        className="h-8 object-contain"
      />
    </motion.div>

    {/* Hero */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="text-8xl mb-2"
      >
        🚦
      </motion.div>

      <h1 className="fredoka text-4xl md:text-6xl text-blue-800 leading-tight mb-3">
        RAMBULAS
        <br />
        
      </h1>

      <div className="inline-block bg-yellow-400 text-yellow-900 font-extrabold px-4 py-2 rounded-full text-sm mb-4">
        🎒Multimedia Pembelajaran Rambu Lalu Lintas
      </div>

      <p className="max-w-xl mx-auto text-slate-600 text-base md:text-lg leading-relaxed">
        Ayo mengenal berbagai rambu lalu lintas dengan cara yang
        menyenangkan melalui materi, galeri interaktif, game, dan quiz.
      </p>
    </motion.div>

    {/* Maskot */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-3xl shadow-lg p-4 mt-6 max-w-md"
    >
      <div className="text-3xl mb-2"></div>
      <p className="text-slate-700 font-semibold">
        Oleh: Astriani Naila Putri  || 242221096
        <br />
        Dosen Pengampu: Dr.Wahyu Purwaningsih M,Pd
      </p>
      <p className="text-sm text-slate-500 mt-1">
        ------
      </p>
    </motion.div>

    {/* Feature Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 w-full max-w-3xl">
      {features.map((f) => (
        <motion.div
          key={f.label}
          whileHover={{
            scale: 1.05,
          }}
          className={`${f.color} border-2 rounded-2xl p-4`}
        >
          <div className="text-3xl mb-2">{f.icon}</div>
          <div className={`font-extrabold text-sm ${f.text}`}>
            {f.label}
          </div>
        </motion.div>
      ))}
    </div>

    {/* Tombol */}
    <motion.button
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onStart}
      className="mt-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-extrabold text-xl px-20 py-7 rounded-2xl shadow-xl"
    >
      🚀 Mulai Belajar
    </motion.button>

    {/* Footer */}
    <div className="mt-10 text-center">
      <p className="text-sm font-bold text-slate-900">
       Pendidikan Guru Sekolah Dasar <br />Fakultas Ilmu Pendidikan <br />Universitas Nahdlatul Ulama Yogyakarta
      </p>

      <p className="text-xs text-slate-500 mt-1">
        Media Pembelajaran Interaktif Rambu Lalu Lintas
      </p>
    </div>
  </div>
</div>

);
}
