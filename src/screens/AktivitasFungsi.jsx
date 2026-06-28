import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong } from '../utils/sound';

// ─────────────────────────────────────────
// DATA PASANGAN RAMBU ↔ FUNGSI
// ─────────────────────────────────────────
const PAIRS = [
  {
    id: 1,
    rambu:  'Rumah Sakit',
    shape:  'square',
    color:  '#22c55e',
    symbol: '🏥',
    fungsi: 'Menunjukkan lokasi fasilitas kesehatan terdekat',
  },
  {
    id: 2,
    rambu:  'Dilarang Masuk',
    shape:  'circle',
    color:  '#ef4444',
    symbol: '—',
    fungsi: 'Melarang kendaraan masuk dari arah ini',
  },
  {
    id: 3,
    rambu:  'Wajib Lurus',
    shape:  'circle-cmd',
    color:  '#3b82f6',
    symbol: '↑',
    fungsi: 'Mengharuskan kendaraan berjalan lurus ke depan',
  },
  {
    id: 4,
    rambu:  'Tikungan Tajam',
    shape:  'triangle',
    color:  '#f59e0b',
    symbol: '↱',
    fungsi: 'Memperingatkan adanya tikungan berbahaya di depan',
  },
  {
    id: 5,
    rambu:  'SPBU',
    shape:  'square',
    color:  '#22c55e',
    symbol: '⛽',
    fungsi: 'Menunjukkan lokasi pengisian bahan bakar kendaraan',
  },
  {
    id: 6,
    rambu:  'Dilarang Parkir',
    shape:  'circle',
    color:  '#ef4444',
    symbol: 'P',
    fungsi: 'Melarang kendaraan berhenti dan parkir di area ini',
  },
   {
    id: 7,
    rambu:  'Perlintasan Kereta Api',
    shape:  'triangle',
    color:  '#f59e0b',
    symbol: '🚂',
    fungsi: 'Memperingatkan pengemudi untuk berhenti sebelum menyeberangi rel.',
  },
];
// DATA JEBAKAN
const DECOY_FUNCTIONS = [
  {
    id: 8,
    fungsi: 'Menunjukkan lokasi pelabuhan feri',
  },
  {
    id: 9,
    fungsi: 'Wajib menggunakan helm proyek',
  },
];

// Shuffle helper (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─────────────────────────────────────────
export default function AktivitasFungsi({ onBack, onComplete }) {
  // Kartu fungsi dikocok sekali saat mount
  const shuffledFungsi = useMemo(
  () =>
    shuffle([
      ...PAIRS.map((p) => ({
        id: p.id,
        text: p.fungsi,
      })),
      ...DECOY_FUNCTIONS.map((d) => ({
        id: d.id,
        text: d.fungsi,
      })),
    ]),
  []
);

  // selectedRambu : id pair yang rambu-nya dipilih
  const [selectedRambu, setSelectedRambu] = useState(null);
  // matched        : Set of pair id yang sudah cocok dengan benar
  const [matched,       setMatched]       = useState(new Set());
  // wrongFlash     : { rambuId, fungsiId } untuk animasi salah
  const [wrongFlash,    setWrongFlash]    = useState(null);
  const [showSuccess,   setShowSuccess]   = useState(false);
  // attemptCount untuk statistik
  const [attempts,      setAttempts]      = useState(0);

  const score = matched.size; 
  const total = PAIRS.length;

  // ── Klik kartu Rambu (kiri) ───────────
  function handlePickRambu(pairId) {
    if (matched.has(pairId)) return; // sudah cocok, skip
    setSelectedRambu((prev) => (prev === pairId ? null : pairId));
  }

  // ── Klik kartu Fungsi (kanan) ─────────
  function handlePickFungsi(fungsiId) {
    if (!selectedRambu)        return; // belum pilih rambu
    if (matched.has(fungsiId)) return; // sudah cocok, skip

    setAttempts((a) => a + 1);

    if (selectedRambu === fungsiId) {
      // ✅ Cocok!
      playCorrect();
      navigator.vibrate?.(100);
      const newMatched = new Set(matched);
      newMatched.add(fungsiId);
      setMatched(newMatched);
      setSelectedRambu(null);

      if (newMatched.size === total) {
        setTimeout(() => setShowSuccess(true), 450);
      }
    } else {
      // ❌ Tidak cocok
      playWrong();
      setWrongFlash({ rambuId: selectedRambu, fungsiId });
      setSelectedRambu(null);
      setTimeout(() => setWrongFlash(null), 900);
    }
  }

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const progressPercent = Math.round(
  (matched.size / PAIRS.length) * 100
  );

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
            <div
              className="font-extrabold text-slate-800 text-sm truncate"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Aktivitas 2: Fungsi Rambu
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {score}/{total} pasangan cocok
            </div>
          </div>
          <span className="text-xl">🔗</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 pb-28">

        {/* ── Header Instruksi ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-4 mb-5 shadow-lg shadow-blue-200"
        >
          <div
            className="text-xl text-white mb-1"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            🔗 Cocokkan Fungsi Rambu
          </div>
          <p className="text-blue-100 text-sm font-semibold">
            <strong className="text-white">Pilih rambu</strong> di kolom kiri,
            lalu <strong className="text-white">pilih fungsi</strong> yang sesuai di kolom kanan!
          </p>
          {/* Dots progress */}
          <div className="flex gap-1.5 mt-3">
            {PAIRS.map((p) => (
              <div
                key={p.id}
                className={`flex-1 h-2.5 rounded-full transition-all duration-300 ${
                  matched.has(p.id) ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <div className="mt-3 bg-white/20 rounded-full h-3 overflow-hidden">
          <div
              className="bg-white h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="text-white text-xs font-bold mt-1">
            {progressPercent}% selesai
        </div>
        </motion.div>

        {/* ── Hint bar ── */}
        <AnimatePresence>
          {selectedRambu && (
            <motion.div
              key="hint"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              className="bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-3 mb-4 text-center"
            >
              <p className="text-indigo-700 font-extrabold text-sm">
                Rambu{' '}
                <span className="bg-indigo-200 px-2 py-0.5 rounded-full">
                  {PAIRS.find((p) => p.id === selectedRambu)?.rambu}
                </span>{' '}
                dipilih — Sekarang pilih fungsinya di kanan!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Two-Column Matching ── */}
        <div className="grid grid-cols-2 gap-3 mb-6">

          {/* ─── Kolom Kiri: Rambu ─── */}
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider text-center mb-2.5">
              🚦 Rambu
            </div>
            <div className="space-y-2.5">
              {PAIRS.map((pair) => {
                const isMatched   = matched.has(pair.id);
                const isSelected  = selectedRambu === pair.id;
                const isWrong     = wrongFlash?.rambuId === pair.id;

                return (
                  <motion.div
                    key={pair.id}
                    animate={isWrong ? { x: [0, -7, 7, -7, 7, 0] } : {}}
                    transition={{ duration: 0.42 }}
                    whileHover={!isMatched ? { scale: 1.03 } : {}}
                    whileTap={!isMatched ? { scale: 0.97 } : {}}
                    onClick={() => handlePickRambu(pair.id)}
                    className={`
                      bg-white rounded-2xl p-3 text-center border-2 transition-all duration-200
                      ${isMatched
                        ? 'border-green-400 bg-green-50 cursor-default'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100 cursor-pointer'
                        : isWrong
                        ? 'border-red-400 bg-red-50 cursor-pointer'
                        : 'border-slate-200 hover:border-blue-300 cursor-pointer hover:shadow-md'
                      }
                    `}
                  >
                    <div className="flex justify-center mb-1.5">
                      <RambuSVG
                        shape={pair.shape}
                        color={pair.color}
                        symbol={pair.symbol}
                        size={46}
                      />
                    </div>
                    <div className="text-xs font-extrabold text-slate-700 leading-tight">
                      {pair.rambu}
                    </div>

                    {isMatched && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-1 text-green-500 text-xs font-extrabold"
                      >
                        ✓ Cocok!
                      </motion.div>
                    )}

                    {isSelected && (
                      <div className="mt-1 text-blue-500 text-xs font-extrabold animate-pulse">
                        Dipilih ✋
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ─── Kolom Kanan: Fungsi (dikocok) ─── */}
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider text-center mb-2.5">
              📋 Fungsi
            </div>
            <div className="space-y-2.5">
              {shuffledFungsi.map((f) => {
                const isMatched  = matched.has(f.id);
                const isWrong    = wrongFlash?.fungsiId === f.id;
                const canPick    = !!selectedRambu && !isMatched;

                return (
                  <motion.div
                    key={f.id}
                    animate={isWrong ? { x: [0, -7, 7, -7, 7, 0] } : {}}
                    transition={{ duration: 0.42 }}
                    whileHover={canPick ? { scale: 1.03 } : {}}
                    whileTap={canPick ? { scale: 0.97 } : {}}
                    onClick={() => handlePickFungsi(f.id)}
                    className={`
                      bg-white rounded-2xl p-3 min-h-[82px] flex items-center border-2
                      transition-all duration-200
                      ${isMatched
                        ? 'border-green-400 bg-green-50 cursor-default'
                        : isWrong
                        ? 'border-red-400 bg-red-50 cursor-pointer'
                        : canPick
                        ? 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer hover:shadow-md'
                        : 'border-slate-200 cursor-default'
                      }
                    `}
                  >
                    <p
                      className={`text-xs font-bold leading-relaxed ${
                        isMatched ? 'text-green-700' : 'text-slate-700'
                      }`}
                    >
                      {isMatched && (
                        <span className="text-green-500 font-extrabold mr-1">✓</span>
                      )}
                      {f.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Statistik kecil ── */}
        {attempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 mb-4"
          >
            {[
              ['✅', 'Cocok',    score,       'bg-green-50 border-green-200 text-green-700'],
              ['🔁', 'Percobaan', attempts,    'bg-blue-50 border-blue-200 text-blue-700'],
              ['⭐', 'Akurasi',  `${accuracy}%`, 'bg-yellow-50 border-yellow-200 text-yellow-700'],
            ].map(([ic, l, v, cls]) => (
              <div key={l} className={`flex-1 ${cls} border-2 rounded-2xl p-2.5 text-center`}>
                <div className="text-lg">{ic}</div>
                <div
                  className="text-lg font-extrabold leading-none"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  {v}
                </div>
                <div className="text-[11px] font-extrabold opacity-70">{l}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
      {/* Pasangan Berhasil */}
{matchedPairs.length > 0 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-8"
  >
    <div
      className="text-lg text-slate-700 mb-4"
      style={{ fontFamily: "'Fredoka One', cursive" }}
    >
      🎉 Pasangan Berhasil
    </div>

    <div className="space-y-4">
      {matchedPairs.map((pair) => (
        <motion.div
          key={pair.id}
          layout
          className="bg-green-50 border-2 border-green-300 rounded-3xl p-4"
        >
          {/* Rambu */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl px-4 py-2 shadow-sm font-bold text-green-700">
              {pair.rambu}
            </div>
          </div>

          {/* Garis */}
          <div className="flex flex-col items-center my-2">
            <span className="text-green-500 text-xl">│</span>
            <span className="text-green-500 text-xl">▼</span>
          </div>

          {/* Fungsi */}
          <div className="flex justify-center">
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm text-center text-sm text-slate-700">
              {pair.fungsi}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

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
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="text-6xl mb-3"
              >
                🔗
              </motion.div>

              <div
                className="text-2xl text-blue-600 mb-1"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Semua Cocok!
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Kamu berhasil mencocokkan semua rambu dengan fungsinya yang benar!
              </p>

              {/* Skor accuracy */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3 text-center">
                  <div
                    className="text-3xl text-green-600"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
                    {total}/{total}
                  </div>
                  <div className="text-xs font-extrabold text-green-700">Pasangan Benar</div>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 text-center">
                  <div
                    className="text-3xl text-yellow-600"
                    style={{ fontFamily: "'Fredoka One', cursive" }}
                  >
                    {accuracy}%
                  </div>
                  <div className="text-xs font-extrabold text-yellow-700">Akurasi</div>
                </div>
              </div>

              {/* Daftar pasangan */}
              <div className="bg-slate-50 rounded-2xl p-3 mb-5 text-left space-y-1.5 max-h-40 overflow-y-auto">
                {PAIRS.map((p) => (
                  <div key={p.id} className="flex items-start gap-2 text-xs">
                    <span className="text-green-500 font-extrabold mt-0.5 flex-shrink-0">✓</span>
                    <span className="font-extrabold text-slate-700">{p.rambu}</span>
                    <span className="text-slate-400 font-semibold leading-snug">→ {p.fungsi}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-extrabold px-8 py-3.5 rounded-full shadow-lg text-base"
              >
                Lanjut ke Aktivitas 3 →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}