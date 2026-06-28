import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong } from '../utils/sound';

// ─────────────────────────────────────────
// DATA
// ─────────────────────────────────────────
const ITEMS = [
  { id: 1, name: 'Dilarang Masuk',   shape: 'circle',     color: '#ef4444', symbol: '—',  category: 'larangan'   },
  { id: 2, name: 'Tikungan Kanan',   shape: 'triangle',   color: '#f59e0b', symbol: '↱',  category: 'peringatan' },
  { id: 3, name: 'Rumah Sakit',      shape: 'square',     color: '#22c55e', symbol: '🏥', category: 'petunjuk'   },
  { id: 4, name: 'Wajib Lurus',      shape: 'circle-cmd', color: '#3b82f6', symbol: '↑',  category: 'perintah'   },
  { id: 5, name: 'Jalan Licin',      shape: 'triangle',   color: '#f59e0b', symbol: '〰', category: 'peringatan' },
  { id: 6, name: 'Dilarang Parkir',  shape: 'circle',     color: '#ef4444', symbol: 'P',  category: 'larangan'   },
  { id: 7, name: 'Wajib Belok Kiri', shape: 'circle-cmd', color: '#3b82f6', symbol: '↰',  category: 'perintah'   },
  { id: 8, name: 'SPBU',             shape: 'square',     color: '#22c55e', symbol: '⛽', category: 'petunjuk'   },
];

const CATEGORIES = [
  { id: 'peringatan', label: 'Peringatan', icon: '⚠️',  bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-800', activeBorder: 'border-yellow-500', activeBg: 'bg-yellow-100' },
  { id: 'larangan',   label: 'Larangan',   icon: '🚫',  bg: 'bg-red-50',    border: 'border-red-400',    text: 'text-red-800',    activeBorder: 'border-red-500',    activeBg: 'bg-red-100'    },
  { id: 'perintah',   label: 'Perintah',   icon: '🔵',  bg: 'bg-blue-50',   border: 'border-blue-400',   text: 'text-blue-800',   activeBorder: 'border-blue-500',   activeBg: 'bg-blue-100'   },
  { id: 'petunjuk',   label: 'Petunjuk',   icon: '🟢',  bg: 'bg-green-50',  border: 'border-green-400',  text: 'text-green-800',  activeBorder: 'border-green-500',  activeBg: 'bg-green-100'  },
];

// ─────────────────────────────────────────
export default function AktivitasCocokkan({ onBack, onComplete }) {
  // placed  : { itemId → categoryId }  hanya item yang BENAR
  const [placed,    setPlaced]    = useState({});
  // selected: id item yang sedang dipilih
  const [selected,  setSelected]  = useState(null);
  // wrongFlash: { itemId, catId } untuk animasi salah
  const [wrongFlash, setWrongFlash] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const score     = Object.keys(placed).length;
  const total     = ITEMS.length;
  const poolItems = ITEMS.filter((i) => !placed[i.id]);

  // ── Klik item di pool ──────────────────
  function handlePickItem(id) {
    if (placed[id]) return;
    setSelected((prev) => (prev === id ? null : id));
  }

  // ── Klik zona kategori ─────────────────
  function handleDropToZone(catId) {
    if (!selected) return;
    const item = ITEMS.find((i) => i.id === selected);
    if (!item) return;

    if (item.category === catId) {
      // ✅ Benar
      playCorrect();
      const newPlaced = { ...placed, [selected]: catId };
      setPlaced(newPlaced);
      setSelected(null);
      if (Object.keys(newPlaced).length === total) {
        setTimeout(() => setShowSuccess(true), 500);
      }
    } else {
      // ❌ Salah
      playWrong();
      setWrongFlash({ itemId: selected, catId });
      setSelected(null);
      setTimeout(() => setWrongFlash(null), 900);
    }
  }

  // ── Drag & Drop (HTML5) ───────────────
  function handleDragStart(e, id) {
    e.dataTransfer.setData('itemId', id);
    setSelected(id);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleDrop(e, catId) {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData('itemId'), 10);
    if (!id) return;
    setSelected(id);
    // pakai handler yang sama
    const item = ITEMS.find((i) => i.id === id);
    if (!item) return;
    if (item.category === catId) {
      playCorrect();
      const newPlaced = { ...placed, [id]: catId };
      setPlaced(newPlaced);
      setSelected(null);
      if (Object.keys(newPlaced).length === total) {
        setTimeout(() => setShowSuccess(true), 500);
      }
    } else {
      playWrong();
      setWrongFlash({ itemId: id, catId });
      setSelected(null);
      setTimeout(() => setWrongFlash(null), 900);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top Bar ── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 bg-white text-blue-600 font-extrabold text-sm px-4 py-2 rounded-full shadow-sm border-2 border-blue-100 hover:bg-blue-50 transition-all cursor-pointer"
          >
            ← Kembali
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-slate-800 text-sm" style={{ fontFamily: "'Fredoka One', cursive" }}>
              Aktivitas 1: Cocokkan Jenis Rambu
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {score}/{total} rambu dikelompokkan
            </div>
          </div>
          <span className="text-xl">🎯</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 pb-28">

        {/* ── Instruksi Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-400 to-amber-500 rounded-3xl p-4 mb-5 shadow-lg shadow-orange-200"
        >
          <div
            className="text-xl text-white mb-1"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            🎯 Cocokkan Jenis Rambu
          </div>
          <p className="text-orange-100 text-sm font-semibold">
            <strong className="text-white">Ketuk</strong> rambu di bawah untuk memilih,
            lalu <strong className="text-white">ketuk kotak kategori</strong> yang sesuai.
            Di desktop kamu juga bisa <strong className="text-white">seret (drag)</strong> langsung!
          </p>
          {/* Dots progress */}
          <div className="flex gap-1.5 mt-3">
            {ITEMS.map((item) => (
              <div
                key={item.id}
                className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                  placed[item.id] ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Hint: item yang sedang dipilih ── */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-3 mb-4 text-center"
            >
              <p className="text-blue-700 font-extrabold text-sm">
                ✋ Memilih:{' '}
                <span className="bg-blue-200 px-2 py-0.5 rounded-full">
                  {ITEMS.find((i) => i.id === selected)?.name}
                </span>
                &nbsp;— Sekarang ketuk salah satu kotak di bawah!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 4 Zona Kategori (2×2) ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {CATEGORIES.map((cat) => {
            const itemsHere = ITEMS.filter((i) => placed[i.id] === cat.id);
            const isWrong   = wrongFlash?.catId === cat.id;
            const isActive  = !!selected; // ada item dipilih → zona jadi "aktif/clickable"

            return (
              <motion.div
                key={cat.id}
                animate={isWrong ? { x: [0, -7, 7, -7, 7, 0] } : {}}
                transition={{ duration: 0.4 }}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, cat.id)}
                onClick={() => handleDropToZone(cat.id)}
                className={`
                  rounded-2xl p-3 min-h-[110px] border-2 transition-all duration-200 relative
                  ${isWrong
                    ? 'bg-red-50 border-red-400'
                    : isActive
                    ? `${cat.activeBg} ${cat.activeBorder} cursor-pointer shadow-md`
                    : `${cat.bg} ${cat.border}`
                  }
                  ${isActive ? 'hover:scale-[1.02]' : ''}
                `}
              >
                {/* Label zona */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-lg">{cat.icon}</span>
                  <span className={`font-extrabold text-sm ${isWrong ? 'text-red-700' : cat.text}`}>
                    {cat.label}
                  </span>
                  {itemsHere.length > 0 && (
                    <span className={`ml-auto text-xs font-bold ${cat.text} opacity-60`}>
                      {itemsHere.length}✓
                    </span>
                  )}
                </div>

                {/* Item yang sudah ditempatkan di zona ini */}
                <div className="flex flex-wrap gap-2">
                  {itemsHere.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ scale: 0, rotate: -10 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <RambuSVG
                        shape={item.shape}
                        color={item.color}
                        symbol={item.symbol}
                        size={38}
                      />
                      <span className="text-[9px] font-extrabold text-slate-600 text-center leading-tight max-w-[44px]">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Hint drop jika zona kosong dan ada item dipilih */}
                {isActive && itemsHere.length === 0 && (
                  <div className="absolute inset-0 flex items-end justify-center pb-2 pointer-events-none">
                    <span className={`text-xs font-bold ${cat.text} opacity-50`}>
                      Letakkan di sini
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Pool Rambu ── */}
        <div className="bg-white rounded-3xl shadow-md p-4">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
            Rambu yang perlu dikelompokkan{' '}
            {poolItems.length > 0 ? `(${poolItems.length} tersisa)` : '— Semua selesai! 🎉'}
          </div>

          {poolItems.length === 0 ? (
            <div className="py-6 text-center">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-600 font-extrabold text-base">
                Semua rambu sudah dikelompokkan!
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {poolItems.map((item) => {
                const isSel   = selected === item.id;
                const isWrong = wrongFlash?.itemId === item.id;

                return (
                  <motion.div
                    key={item.id}
                    animate={
                      isWrong
                        ? { x: [0, -8, 8, -8, 8, 0], backgroundColor: ['#fff', '#fee2e2', '#fff'] }
                        : {}
                    }
                    transition={{ duration: 0.45 }}
                    whileHover={{ scale: 1.06, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => handlePickItem(item.id)}
                    className={`
                      flex flex-col items-center gap-1 p-2.5 rounded-2xl cursor-grab active:cursor-grabbing
                      border-2 transition-all duration-200 select-none
                      ${isSel
                        ? 'border-blue-500 bg-blue-50 shadow-xl shadow-blue-200 scale-110'
                        : isWrong
                        ? 'border-red-400 bg-red-50'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:shadow-md'
                      }
                    `}
                  >
                    {isSel && (
                      <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-extrabold shadow">
                        ✓
                      </div>
                    )}
                    <RambuSVG
                      shape={item.shape}
                      color={item.color}
                      symbol={item.symbol}
                      size={52}
                    />
                    <span className="text-xs font-extrabold text-slate-700 text-center leading-tight max-w-[64px]">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal Sukses ── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.65, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              className="bg-white rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="text-6xl mb-3"
              >
                🎉
              </motion.div>

              <div
                className="text-2xl text-green-600 mb-1"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Semua Benar!
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Hebat! Kamu berhasil mengelompokkan semua rambu ke kategori yang tepat!
              </p>

              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4 mb-5">
                <div
                  className="text-4xl text-green-600 mb-1"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  {total}/{total}
                </div>
                <div className="text-sm font-extrabold text-green-700">
                  Sempurna! ⭐⭐⭐
                </div>
              </div>

              {/* Recap */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {CATEGORIES.map((cat) => {
                  const count = ITEMS.filter((i) => placed[i.id] === cat.id).length;
                  return (
                    <div key={cat.id} className={`${cat.bg} border ${cat.border} rounded-xl p-2 text-center`}>
                      <div className="text-lg">{cat.icon}</div>
                      <div className={`text-xs font-extrabold ${cat.text}`}>{cat.label}</div>
                      <div className={`text-sm font-bold ${cat.text}`}>{count} rambu</div>
                    </div>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg text-base"
              >
                Lanjut ke Aktivitas 2 →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}