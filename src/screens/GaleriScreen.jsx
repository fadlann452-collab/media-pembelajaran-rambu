import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import RambuSVG from '../components/RambuSVG';
import data from '../data/RambuData.json';

const TYPE = {
  warning:     { label: 'Peringatan', badge: 'bg-yellow-100 text-yellow-800', border: 'border-yellow-300', bg: 'bg-yellow-50' },
  prohibition: { label: 'Larangan',   badge: 'bg-red-100 text-red-800',       border: 'border-red-300',    bg: 'bg-red-50'    },
  command:     { label: 'Perintah',   badge: 'bg-blue-100 text-blue-800',     border: 'border-blue-300',   bg: 'bg-blue-50'   },
  info:        { label: 'Petunjuk',   badge: 'bg-green-100 text-green-800',   border: 'border-green-300',  bg: 'bg-green-50'  },
};

const FILTERS = [
  { id: 'all',         label: 'Semua',      icon: '🗂️', active: 'bg-indigo-500 text-white border-indigo-500',      inactive: 'bg-white text-slate-500 border-slate-200'  },
  { id: 'warning',     label: 'Peringatan', icon: '⚠️', active: 'bg-yellow-400 text-yellow-900 border-yellow-400', inactive: 'bg-white text-slate-500 border-yellow-200' },
  { id: 'prohibition', label: 'Larangan',   icon: '🚫', active: 'bg-red-500 text-white border-red-500',            inactive: 'bg-white text-slate-500 border-red-200'    },
  { id: 'command',     label: 'Perintah',   icon: '🔵', active: 'bg-blue-500 text-white border-blue-500',           inactive: 'bg-white text-slate-500 border-blue-200'   },
  { id: 'info',        label: 'Petunjuk',   icon: '🟢', active: 'bg-green-500 text-white border-green-500',         inactive: 'bg-white text-slate-500 border-green-200'  },
];

export default function GaleriScreen({ onHome, onMarkDone }) {
  const [filter, setFilter]     = useState('all');
  const [selected, setSelected] = useState(null);
  const [viewed, setViewed]     = useState(new Set());

  const list = filter === 'all' ? data.rambuList : data.rambuList.filter(r => r.type === filter);
  const sel  = data.rambuList.find(r => r.id === selected);

  function pick(id) {
    setSelected(selected === id ? null : id);
    setViewed(v => { const n = new Set(v); n.add(id); return n; });
  }

  const pct       = Math.round((viewed.size / data.rambuList.length) * 100);
  const allViewed = viewed.size >= data.rambuList.length;

  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Galeri Rambu Interaktif" subtitle="Klik rambu untuk melihat keterangannya" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-5 mb-5 shadow-lg shadow-purple-200"
        >
          <div className="fredoka text-2xl text-white text-center mb-1">🖼️ Galeri Rambu</div>
          <p className="text-purple-100 text-xs text-center mb-3">Klik tiap rambu untuk tahu artinya!</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2.5 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-white font-extrabold text-sm flex-shrink-0">
              {viewed.size}/{data.rambuList.length}
            </span>
          </div>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {FILTERS.map(f => (
            <motion.button
              key={f.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => { setFilter(f.id); setSelected(null); }}
              className={`flex-shrink-0 flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-extrabold border-2 transition-all duration-200 ${
                filter === f.id ? f.active : f.inactive
              }`}
            >
              {f.icon} {f.label}
            </motion.button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          <AnimatePresence>
            {list.map(r => {
              const cfg        = TYPE[r.type];
              const isSelected = selected === r.id;
              const isViewed   = viewed.has(r.id);
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ y: -3, scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => pick(r.id)}
                  className="rambu-card relative"
                  style={isSelected ? { borderColor: r.color } : {}}
                >
                  {isViewed && !isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-[9px] font-extrabold">
                      ✓
                    </div>
                  )}
                  <div className="flex justify-center mb-2">
                    <RambuSVG shape={r.shape} color={r.color} symbol={r.symbol} size={60} />
                  </div>
                  <div className="text-[11px] font-extrabold text-slate-700 leading-tight mb-1">{r.name}</div>
                  <div className={`${cfg.badge} badge-chip`}>{cfg.label}</div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {sel && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className={`${TYPE[sel.type].bg} border-2 ${TYPE[sel.type].border} rounded-3xl p-4 mb-4`}
            >
              <div className="flex items-start gap-4">
                <RambuSVG shape={sel.shape} color={sel.color} symbol={sel.symbol} size={68} />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-extrabold uppercase tracking-wide mb-0.5 ${TYPE[sel.type].badge.split(' ')[1]}`}>
                    Rambu {TYPE[sel.type].label}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-base leading-tight mb-2">{sel.name}</h3>
                  <div className="text-xs font-extrabold text-slate-500 uppercase mb-0.5">Arti</div>
                  <p className="text-sm text-slate-700 font-semibold leading-relaxed mb-2">{sel.desc}</p>
                  <div className="text-xs font-extrabold text-slate-500 uppercase mb-0.5">Fungsi</div>
                  <p className="text-sm text-slate-600 font-semibold leading-relaxed">{sel.fungsi}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="w-full text-right text-xs text-slate-400 hover:text-slate-600 font-bold mt-2">
                Tutup ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {allViewed && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onMarkDone}
              className="btn-action bg-green-500 text-white w-full justify-center shadow-green-200 mb-3"
            >
              ✅ Galeri Selesai! Tandai & Kembali
            </motion.button>
          )}
        </AnimatePresence>

        <button onClick={onHome} className="btn-back w-full justify-center">
          🏠 Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}