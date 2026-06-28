import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong, playWin } from '../utils/sound';

// ──────────────────────────────────────────────────────────────────
// DATA  —  8 rambu + 8 fungsi benar + 2 jebakan (distractor)
// ──────────────────────────────────────────────────────────────────
const PAIRS = [
  { id:1, rambu:'Rumah Sakit',      shape:'square',     color:'#22c55e', symbol:'🏥', fungsi:'Menunjukkan lokasi fasilitas kesehatan terdekat'   },
  { id:2, rambu:'Dilarang Masuk',   shape:'circle',     color:'#ef4444', symbol:'—',  fungsi:'Melarang kendaraan masuk dari arah ini'             },
  { id:3, rambu:'Wajib Lurus',      shape:'circle-cmd', color:'#3b82f6', symbol:'↑',  fungsi:'Mengharuskan kendaraan berjalan lurus ke depan'     },
  { id:4, rambu:'Tikungan Tajam',   shape:'triangle',   color:'#f59e0b', symbol:'↱',  fungsi:'Memperingatkan adanya tikungan berbahaya di depan'  },
  { id:5, rambu:'SPBU',             shape:'square',     color:'#22c55e', symbol:'⛽', fungsi:'Menunjukkan lokasi pengisian bahan bakar kendaraan' },
  { id:6, rambu:'Dilarang Parkir',  shape:'circle',     color:'#ef4444', symbol:'P',  fungsi:'Melarang kendaraan berhenti dan parkir di area ini' },
  { id:7, rambu:'Wajib Belok Kiri', shape:'circle-cmd', color:'#3b82f6', symbol:'↰',  fungsi:'Mewajibkan kendaraan berbelok ke arah kiri'          },
  { id:8, rambu:'Jalan Licin',      shape:'triangle',   color:'#f59e0b', symbol:'〰', fungsi:'Memperingatkan bahwa jalan di depan sangat licin'   },
];

// 2 fungsi jebakan — tidak punya pasangan, tidak perlu dicocokkan
const DISTRACTORS = [
  { id:'d1', fungsi:'Menunjukkan lokasi pelabuhan feri dan kapal laut' },
  { id:'d2', fungsi:'Mewajibkan pengemudi menggunakan helm proyek'      },
];

// ──────────────────────────────────────────────────────────────────
// HELPERS
// ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ──────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ──────────────────────────────────────────────────────────────────
export default function AktivitasFungsi({ onBack, onComplete }) {

  // Gabung 8 fungsi benar + 2 jebakan, kocok sekali saat mount
  const allFungsi = useMemo(() => shuffle([
    ...PAIRS.map(p => ({ id: p.id,  text: p.fungsi, isDistractor: false })),
    ...DISTRACTORS.map(d => ({ id: d.id, text: d.fungsi, isDistractor: true  })),
  ]), []);

  const [selectedRambu, setSelectedRambu] = useState(null);
  // matched : Set<pairId>  — hanya pasangan yang benar
  const [matched,       setMatched]       = useState(new Set());
  // matchOrder : { pairId → urutan 1-based } untuk badge nomor
  const [matchOrder,    setMatchOrder]    = useState({});
  // wrongFlash : { rambuId, fungsiId } untuk animasi salah
  const [wrongFlash,    setWrongFlash]    = useState(null);
  // justMatched : pairId yang BARU saja dicocokkan (animasi tersambung)
  const [justMatched,   setJustMatched]   = useState(null);
  const [wrongCount,    setWrongCount]    = useState(0);
  const [noRambuHint,   setNoRambuHint]   = useState(false);
  const [showSuccess,   setShowSuccess]   = useState(false);

  const score = matched.size;
  const total = PAIRS.length; // 8
  const pct   = Math.round((score / total) * 100);
  const acc   = (score + wrongCount) > 0
    ? Math.round((score / (score + wrongCount)) * 100)
    : 100;

  // ── Klik Rambu ───────────────────────────────────────────────
  function handlePickRambu(id) {
    if (matched.has(id)) return;
    setSelectedRambu(s => s === id ? null : id);
  }

  // ── Klik Fungsi (atau Distractor) ───────────────────────────
  function handlePickFungsi(f) {
    // Sudah dicocokkan dengan benar → abaikan
    if (!f.isDistractor && matched.has(f.id)) return;

    // Belum pilih rambu
    if (!selectedRambu) {
      setNoRambuHint(true);
      setTimeout(() => setNoRambuHint(false), 1600);
      return;
    }

    const isCorrect = !f.isDistractor && selectedRambu === f.id;

    if (isCorrect) {
      // ✅ BENAR — animasi tersambung
      playCorrect();
      const nm = new Set(matched); nm.add(f.id);
      const no = { ...matchOrder, [f.id]: score + 1 };
      setMatched(nm);
      setMatchOrder(no);
      setJustMatched(f.id);
      setSelectedRambu(null);
      setTimeout(() => setJustMatched(null), 1100);
      if (nm.size === total) {
        setTimeout(() => { playWin(); setShowSuccess(true); }, 700);
      }
    } else {
      // ❌ SALAH — animasi guncang merah
      playWrong();
      setWrongCount(c => c + 1);
      setWrongFlash({ rambuId: selectedRambu, fungsiId: f.id });
      setSelectedRambu(null);
      setTimeout(() => setWrongFlash(null), 900);
    }
  }

  // ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Top Bar ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 bg-white text-blue-600 font-extrabold
                       text-sm px-4 py-2 rounded-full shadow-sm border-2 border-blue-100
                       hover:bg-blue-50 transition-all cursor-pointer"
          >
            ← Kembali
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-extrabold text-slate-800 text-sm truncate"
                 style={{ fontFamily:"'Fredoka One',cursive" }}>
              Aktivitas 2: Fungsi Rambu
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {score}/{total} pasangan benar · {DISTRACTORS.length} fungsi jebakan
            </div>
          </div>
          <span className="text-xl">🔗</span>
        </div>
      </div>

      {/* ── Konten Utama ─────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-4 py-5 pb-28">

        {/* ── Header Progress ── */}
        <motion.div
          initial={{ opacity:0, y:-12 }}
          animate={{ opacity:1, y:0 }}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-4 mb-4
                     shadow-lg shadow-blue-200"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl text-white"
                 style={{ fontFamily:"'Fredoka One',cursive" }}>
              🔗 Cocokkan Fungsi Rambu
            </div>
            <div className="bg-white/25 rounded-full px-3 py-1 text-white font-extrabold text-sm">
              {score}/{total}
            </div>
          </div>

          <p className="text-blue-100 text-xs font-semibold mb-3">
            <strong className="text-white">Pilih rambu</strong> di kiri →{' '}
            <strong className="text-white">pilih fungsinya</strong> di kanan.
            Hati-hati, ada <strong className="text-white">2 fungsi jebakan</strong>!
          </p>

          {/* Segmented progress bar 8 kotak */}
          <div className="flex gap-1.5 mb-1">
            {PAIRS.map(p => (
              <motion.div
                key={p.id}
                className="flex-1 h-3 rounded-full transition-colors duration-500"
                animate={{ backgroundColor: matched.has(p.id) ? '#fff' : 'rgba(255,255,255,0.3)' }}
              />
            ))}
          </div>
          <div className="flex justify-between text-blue-200 text-[11px] font-bold">
            <span>{pct}% selesai</span>
            <span>Akurasi: {acc}%</span>
          </div>
        </motion.div>

        {/* ── Toast: belum pilih rambu ── */}
        <AnimatePresence>
          {noRambuHint && (
            <motion.div key="no-rambu"
              initial={{ opacity:0, y:-8, scale:0.97 }}
              animate={{ opacity:1, y:0,  scale:1    }}
              exit={{    opacity:0, scale:0.97        }}
              className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-2.5 mb-3 text-center"
            >
              <p className="text-yellow-700 font-extrabold text-sm">
                ⚠️ Pilih rambu di kolom kiri dulu ya!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Toast: rambu sedang dipilih ── */}
        <AnimatePresence>
          {selectedRambu && (
            <motion.div key="sel-hint"
              initial={{ opacity:0, y:-8, scale:0.97 }}
              animate={{ opacity:1, y:0,  scale:1    }}
              exit={{    opacity:0, scale:0.97        }}
              className="bg-blue-50 border-2 border-blue-300 rounded-2xl p-2.5 mb-3 text-center"
            >
              <p className="text-blue-700 font-extrabold text-sm">
                ✋ Kamu memilih{' '}
                <span className="bg-blue-200 px-2 py-0.5 rounded-full">
                  {PAIRS.find(p => p.id === selectedRambu)?.rambu}
                </span>
                {' '}— Sekarang pilih fungsinya di kanan!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Dua Kolom ── */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          {/* ─── Kolom Kiri: 8 Rambu ─── */}
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider
                            text-center mb-2.5">
              🚦 Rambu
            </div>
            <div className="space-y-2">
              {PAIRS.map(pair => {
                const isMatched  = matched.has(pair.id);
                const isSelected = selectedRambu === pair.id;
                const isWrong    = wrongFlash?.rambuId === pair.id;
                const isNew      = justMatched === pair.id;
                const pairNum    = matchOrder[pair.id];

                return (
                  <motion.div
                    key={pair.id}
                    animate={
                      isNew
                        ? { scale:[1,1.09,1.04,1],
                            boxShadow:['0 0 0px rgba(34,197,94,0)',
                                       '0 0 22px rgba(34,197,94,0.75)',
                                       '0 0 14px rgba(34,197,94,0.4)',
                                       '0 0  0px rgba(34,197,94,0)'] }
                        : isWrong
                        ? { x:[0,-7,7,-7,7,0] }
                        : {}
                    }
                    transition={{ duration: isNew ? 0.65 : 0.42 }}
                    whileHover={!isMatched ? { scale:1.03 } : {}}
                    whileTap={!isMatched   ? { scale:0.97 } : {}}
                    onClick={() => handlePickRambu(pair.id)}
                    className={`
                      relative bg-white rounded-2xl p-2.5 text-center border-2
                      transition-colors duration-300
                      ${isMatched  ? 'border-green-400 bg-green-50 cursor-default'
                      : isSelected ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100 cursor-pointer'
                      : isWrong    ? 'border-red-400 bg-red-50 cursor-pointer'
                      :              'border-slate-200 hover:border-blue-300 cursor-pointer hover:shadow-md'}
                    `}
                  >
                    {/* Badge nomor pasangan */}
                    {isMatched && pairNum && (
                      <motion.div
                        initial={{ scale:0 }}
                        animate={{ scale:1 }}
                        transition={{ type:'spring', stiffness:300 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full
                                   flex items-center justify-center text-white text-[9px]
                                   font-extrabold shadow z-10"
                      >
                        {pairNum}
                      </motion.div>
                    )}

                    <div className="flex justify-center mb-1">
                      <RambuSVG
                        shape={pair.shape}
                        color={pair.color}
                        symbol={pair.symbol}
                        size={44}
                      />
                    </div>

                    <div className={`text-[11px] font-extrabold leading-tight
                                    ${isMatched ? 'text-green-700' : 'text-slate-700'}`}>
                      {pair.rambu}
                    </div>

                    {isMatched && (
                      <motion.div
                        initial={{ scale:0 }}
                        animate={{ scale:1 }}
                        className="text-green-500 text-xs font-extrabold mt-0.5"
                      >
                        ✓ Cocok!
                      </motion.div>
                    )}

                    {isSelected && (
                      <div className="text-blue-500 text-xs font-extrabold mt-0.5 animate-pulse">
                        Dipilih ✋
                      </div>
                    )}

                    {isWrong && (
                      <div className="text-red-500 text-xs font-extrabold mt-0.5">
                        ❌ Belum Tepat
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ─── Kolom Kanan: 10 Fungsi (8 benar + 2 jebakan, dikocok) ─── */}
          <div>
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wider
                            text-center mb-2.5">
              📋 Fungsi
            </div>
            <div className="space-y-2">
              {allFungsi.map(f => {
                const isMatched = !f.isDistractor && matched.has(f.id);
                const isWrong   = wrongFlash?.fungsiId === f.id;
                const isNew     = !f.isDistractor && justMatched === f.id;
                const canPick   = !!selectedRambu && !isMatched;
                const pairNum   = f.isDistractor ? null : matchOrder[f.id];

                return (
                  <motion.div
                    key={f.id}
                    animate={
                      isNew
                        ? { scale:[1,1.09,1.04,1],
                            boxShadow:['0 0 0px rgba(34,197,94,0)',
                                       '0 0 22px rgba(34,197,94,0.75)',
                                       '0 0 14px rgba(34,197,94,0.4)',
                                       '0 0  0px rgba(34,197,94,0)'] }
                        : isWrong
                        ? { x:[0,-7,7,-7,7,0] }
                        : {}
                    }
                    transition={{ duration: isNew ? 0.65 : 0.42 }}
                    whileHover={canPick ? { scale:1.02, x:2 } : {}}
                    whileTap={canPick   ? { scale:0.97 }       : {}}
                    onClick={() => handlePickFungsi(f)}
                    className={`
                      relative bg-white rounded-2xl p-2.5 min-h-[70px] flex items-center
                      border-2 transition-colors duration-300
                      ${isMatched  ? 'border-green-400 bg-green-50 cursor-default'
                      : isWrong    ? 'border-red-400 bg-red-50 cursor-pointer'
                      : canPick    ? 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer hover:shadow-md'
                      :              'border-slate-200 cursor-default'}
                    `}
                  >
                    {/* Badge nomor pasangan — sama dengan di rambu = visual "terhubung" */}
                    {isMatched && pairNum && (
                      <motion.div
                        initial={{ scale:0 }}
                        animate={{ scale:1 }}
                        transition={{ type:'spring', stiffness:300 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-green-500 rounded-full
                                   flex items-center justify-center text-white text-[9px]
                                   font-extrabold shadow z-10"
                      >
                        {pairNum}
                      </motion.div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className={`text-[11px] font-bold leading-snug
                                    ${isMatched ? 'text-green-700'
                                    : isWrong   ? 'text-red-700'
                                    :             'text-slate-700'}`}>
                        {isMatched && (
                          <span className="text-green-500 font-extrabold mr-1">✓</span>
                        )}
                        {isWrong && (
                          <span className="text-red-500 font-extrabold mr-1">❌</span>
                        )}
                        {f.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Statistik ── */}
        {(score > 0 || wrongCount > 0) && (
          <motion.div
            initial={{ opacity:0, y:8 }}
            animate={{ opacity:1, y:0 }}
            className="flex gap-2.5 mb-4"
          >
            {[
              ['✅', 'Cocok',    score,      'bg-green-50  border-green-200  text-green-700' ],
              ['❌', 'Salah',    wrongCount, 'bg-red-50    border-red-200    text-red-700'   ],
              ['⭐', 'Akurasi',  `${acc}%`,  'bg-yellow-50 border-yellow-200 text-yellow-700'],
            ].map(([ic, l, v, cls]) => (
              <div key={l} className={`flex-1 ${cls} border-2 rounded-2xl p-2.5 text-center`}>
                <div className="text-lg">{ic}</div>
                <div className="text-base font-extrabold leading-none"
                     style={{ fontFamily:"'Fredoka One',cursive" }}>
                  {v}
                </div>
                <div className="text-[10px] font-extrabold opacity-70">{l}</div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Panel Pasangan Tersambung ── */}
        {score > 0 && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            className="bg-white rounded-2xl shadow-md p-3 mb-4"
          >
            <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              🔗 Pasangan Tersambung ({score}/{total})
            </div>
            <div className="space-y-1.5">
              {PAIRS.filter(p => matched.has(p.id))
                .sort((a, b) => matchOrder[a.id] - matchOrder[b.id])
                .map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity:0, x:-8 }}
                    animate={{ opacity:1, x:0 }}
                    className="flex items-center gap-2 bg-green-50 border border-green-200
                               rounded-xl px-3 py-1.5"
                  >
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center
                                     justify-center text-white text-[9px] font-extrabold
                                     flex-shrink-0">
                      {matchOrder[p.id]}
                    </span>
                    <div className="flex-shrink-0">
                      <RambuSVG shape={p.shape} color={p.color} symbol={p.symbol} size={22} />
                    </div>
                    <span className="text-[11px] font-extrabold text-green-800 flex-shrink-0">
                      {p.rambu}
                    </span>
                    <span className="text-green-400 text-xs flex-shrink-0">══</span>
                    <span className="text-[10px] font-semibold text-green-700 leading-snug">
                      {p.fungsi}
                    </span>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

      </div>

      {/* ──────────────────────────────────────────────────────────
          MODAL SUKSES
      ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{    opacity:0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale:0.6, opacity:0 }}
              animate={{ scale:1,   opacity:1 }}
              exit={{    scale:0.8, opacity:0 }}
              transition={{ type:'spring', stiffness:220, damping:18 }}
              className="bg-white rounded-3xl p-7 text-center max-w-sm w-full shadow-2xl"
            >
              <motion.div
                animate={{ rotate:[0,12,-12,0], scale:[1,1.15,1] }}
                transition={{ repeat:Infinity, duration:1.8 }}
                className="text-6xl mb-3"
              >
                🔗
              </motion.div>

              <div className="text-2xl text-blue-600 mb-1"
                   style={{ fontFamily:"'Fredoka One',cursive" }}>
                Semua Tersambung!
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Kamu berhasil mencocokkan semua rambu dengan fungsinya!
                Keren banget 🎉
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-3 text-center">
                  <div className="text-3xl text-green-600 font-extrabold"
                       style={{ fontFamily:"'Fredoka One',cursive" }}>
                    {total}/{total}
                  </div>
                  <div className="text-xs font-extrabold text-green-700">Pasangan Benar</div>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-3 text-center">
                  <div className="text-3xl text-yellow-600 font-extrabold"
                       style={{ fontFamily:"'Fredoka One',cursive" }}>
                    {acc}%
                  </div>
                  <div className="text-xs font-extrabold text-yellow-700">Akurasi</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3 mb-5 text-left
                              space-y-1.5 max-h-44 overflow-y-auto">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase
                                tracking-widest mb-1.5">
                  Pasangan yang Tersambung
                </div>
                {PAIRS.map(p => (
                  <div key={p.id} className="flex items-start gap-1.5 text-xs">
                    <span className="text-green-500 font-extrabold flex-shrink-0 mt-0.5">✓</span>
                    <span className="font-extrabold text-slate-700 flex-shrink-0">{p.rambu}</span>
                    <span className="text-slate-400 flex-shrink-0">→</span>
                    <span className="text-slate-600 font-semibold leading-snug">{p.fungsi}</span>
                  </div>
                ))}
                <div className="pt-1 border-t border-slate-200 mt-1">
                  <div className="text-[10px] text-slate-400 font-semibold italic">
                    ⚡ {DISTRACTORS.length} fungsi jebakan tidak memiliki pasangan
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale:1.04 }}
                whileTap={{  scale:0.96 }}
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white
                           font-extrabold px-8 py-3.5 rounded-full shadow-lg text-base"
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
