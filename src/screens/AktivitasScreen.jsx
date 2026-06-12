import React from 'react';
import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';

export default function AktivitasScreen({ onHome, onMarkDone }) {
  return (
    <div className="min-h-screen">
      <TopBar
        onHome={onHome}
        title="Aktivitas Interaktif"
        subtitle="Belajar sambil bermain"
      />

      <div className="max-w-2xl mx-auto px-4 py-6">

        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl p-5 text-white mb-5"
        >
          <h2 className="fredoka text-2xl mb-2">
            🎯 Aktivitas Belajar
          </h2>

          <p className="text-sm">
            Yuk latihan mengenali rambu lalu lintas dengan berbagai permainan seru!
          </p>
        </motion.div>

        <div className="space-y-3">

          <div className="bg-white rounded-3xl p-4 shadow">
            <div className="text-xl mb-2">🔗</div>
            <h3 className="font-bold">
              Cocokkan Nama Rambu
            </h3>
            <p className="text-sm text-slate-500">
              Hubungkan nama rambu dengan gambar yang sesuai.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow">
            <div className="text-xl mb-2">📦</div>
            <h3 className="font-bold">
              Kelompokkan Rambu
            </h3>
            <p className="text-sm text-slate-500">
              Pisahkan rambu peringatan, larangan, perintah, dan petunjuk.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow">
            <div className="text-xl mb-2">🧠</div>
            <h3 className="font-bold">
              Memory Card
            </h3>
            <p className="text-sm text-slate-500">
              Temukan pasangan kartu rambu yang sama.
            </p>
          </div>

        </div>

        <button
          onClick={onMarkDone}
          className="btn-next w-full justify-center mt-5"
        >
          ✅ Aktivitas Selesai
        </button>

      </div>
    </div>
  );
}