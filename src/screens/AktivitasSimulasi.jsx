import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong, playWin } from '../utils/sound';

// ─────────────────────────────────────────
// DATA 5 SKENARIO BERKENDARA
// ─────────────────────────────────────────
const SKENARIO = [
  {
    id: 1,
    ilustrasi: '🚲',
    latar: 'from-sky-400 to-blue-500',
    situasi:
      'Kamu sedang mengendarai sepeda bersama teman sepulang sekolah.',
    melihat: 'Di ujung jalan kamu melihat rambu ini:',
    rambu: {
      shape: 'circle',
      color: '#ef4444',
      symbol: '—',
      name: 'Dilarang Masuk',
      jenis: 'Rambu Larangan',
    },
    pertanyaan: 'Apa yang harus kamu lakukan?',
    pilihan: [
      { text: 'Tetap masuk, tidak ada polisi yang melihat',  correct: false },
      { text: 'Cari jalan lain yang diperbolehkan',         correct: true  },
      { text: 'Berhenti dan menunggu di tengah jalan',       correct: false },
      { text: 'Memutar balik sembarangan tanpa melihat',    correct: false },
    ],
    penjelasan:
      'Rambu Dilarang Masuk berarti TIDAK BOLEH masuk dari arah tersebut. Kamu harus mencari jalan alternatif yang diperbolehkan. Melanggar rambu ini berbahaya dan melanggar hukum!',
  },
  {
    id: 2,
    ilustrasi: '🚗',
    latar: 'from-emerald-400 to-teal-500',
    situasi:
      'Papa mengendarai mobil dan kamu ikut di kursi belakang. Kalian melewati jalan pegunungan.',
    melihat: 'Papa melihat rambu ini di tepi jalan:',
    rambu: {
      shape: 'triangle',
      color: '#f59e0b',
      symbol: '↱',
      name: 'Tikungan Kanan Tajam',
      jenis: 'Rambu Peringatan',
    },
    pertanyaan: 'Apa yang seharusnya Papa lakukan?',
    pilihan: [
      { text: 'Mempercepat agar cepat melewati tikungan',             correct: false },
      { text: 'Membunyikan klakson keras-keras',                       correct: false },
      { text: 'Mengurangi kecepatan dan berhati-hati di tikungan',    correct: true  },
      { text: 'Menutup mata dan berharap tidak ada kendaraan lain',   correct: false },
    ],
    penjelasan:
      'Rambu Tikungan Tajam adalah peringatan bahwa jalan di depan sangat berliku dan berbahaya. Pengemudi HARUS mengurangi kecepatan agar dapat melewati tikungan dengan aman!',
  },
  {
    id: 3,
    ilustrasi: '🛵',
    latar: 'from-violet-400 to-purple-500',
    situasi:
      'Mama memboncengmu dengan motor. Kalian tiba di sebuah persimpangan jalan yang ramai.',
    melihat: 'Di persimpangan ada rambu ini:',
    rambu: {
      shape: 'circle-cmd',
      color: '#3b82f6',
      symbol: '↑',
      name: 'Wajib Jalan Lurus',
      jenis: 'Rambu Perintah',
    },
    pertanyaan: 'Bolehkah Mama belok ke kanan menuju pasar?',
    pilihan: [
      { text: 'Boleh, karena jalannya terlihat kosong',              correct: false },
      { text: 'Boleh, kalau sedang terburu-buru',                    correct: false },
      { text: 'Tidak boleh, harus lurus sesuai rambu',               correct: true  },
      { text: 'Boleh belok kiri saja untuk memutar',                 correct: false },
    ],
    penjelasan:
      'Rambu Wajib Lurus berarti SEMUA kendaraan HARUS berjalan lurus. Tidak boleh belok ke mana pun di persimpangan ini. Mama harus cari rute lain untuk ke pasar!',
  },
  {
    id: 4,
    ilustrasi: '🚶',
    latar: 'from-amber-400 to-orange-500',
    situasi:
      'Kamu sedang berjalan kaki menuju taman bermain bersama adik. Kalian melewati tepi jalan raya.',
    melihat: 'Kamu melihat rambu ini di papan dekat jalan:',
    rambu: {
      shape: 'square',
      color: '#22c55e',
      symbol: '🏥',
      name: 'Rumah Sakit',
      jenis: 'Rambu Petunjuk',
    },
    pertanyaan: 'Informasi apa yang diberikan rambu ini untukmu?',
    pilihan: [
      { text: 'Dilarang bermain di sekitar sini',                        correct: false },
      { text: 'Menunjukkan arah menuju rumah sakit terdekat',            correct: true  },
      { text: 'Wajib periksa kesehatan sebelum lewat',                   correct: false },
      { text: 'Ada bahaya penyakit di jalan ini',                        correct: false },
    ],
    penjelasan:
      'Rambu Rumah Sakit adalah rambu petunjuk yang memberikan informasi lokasi fasilitas kesehatan. Sangat berguna jika ada yang membutuhkan pertolongan darurat!',
  },
  {
    id: 5,
    ilustrasi: '🚌',
    latar: 'from-pink-400 to-rose-500',
    situasi:
      'Bus sekolahmu melewati jalan dalam kota yang padat. Pak Sopir adalah pengemudi yang bertanggung jawab.',
    melihat: 'Pak Sopir melihat rambu ini di pinggir jalan:',
    rambu: {
      shape: 'circle',
      color: '#ef4444',
      symbol: '40',
      name: 'Batas Kecepatan 40',
      jenis: 'Rambu Larangan',
    },
    pertanyaan: 'Berapa kecepatan maksimum yang boleh ditempuh bus di sini?',
    pilihan: [
      { text: '80 km/jam karena bus besar dan kuat',                   correct: false },
      { text: '40 km/jam sesuai yang tertulis di rambu',               correct: true  },
      { text: 'Sesuka hati Pak Sopir karena sudah pengalaman',         correct: false },
      { text: 'Lebih dari 40 km/jam asal jalan terlihat sepi',         correct: false },
    ],
    penjelasan:
      'Rambu Batas Kecepatan 40 berarti kendaraan TIDAK BOLEH melebihi 40 km/jam. Aturan ini berlaku untuk SEMUA kendaraan termasuk bus. Pak Sopir yang baik selalu mematuhi rambu!',
  },
];

// ─────────────────────────────────────────
// Komponen Kartu Skenario
// ─────────────────────────────────────────
function SkenarioCard({ q, idx, total, onPick, picked }) {
  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Latar skenario */}
      <div className={`bg-gradient-to-br ${q.latar} rounded-3xl p-5 shadow-lg`}>
        <div className="flex items-start gap-4">
          <div className="text-5xl flex-shrink-0 bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center">
            {q.ilustrasi}
          </div>
          <div>
            <div
              className="text-base text-white mb-1 leading-snug"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Skenario {idx + 1} dari {total}
            </div>
            <p className="text-white/90 text-sm font-semibold leading-relaxed">
              {q.situasi}
            </p>
            <p className="text-white font-extrabold text-sm mt-2">{q.melihat}</p>
          </div>
        </div>
      </div>

      {/* Kartu Rambu */}
      <div className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-5">
        <div className="flex-shrink-0">
          <RambuSVG
            shape={q.rambu.shape}
            color={q.rambu.color}
            symbol={q.rambu.symbol}
            size={88}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-extrabold text-slate-400 uppercase tracking-wide mb-0.5">
            {q.rambu.jenis}
          </div>
          <div
            className="text-lg text-slate-800 leading-tight"
            style={{ fontFamily: "'Fredoka One', cursive" }}
          >
            {q.rambu.name}
          </div>
        </div>
      </div>

      {/* Pertanyaan */}
      <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-3.5 text-center">
        <p className="text-yellow-800 font-extrabold text-base">{q.pertanyaan}</p>
      </div>

      {/* Pilihan jawaban */}
      <div className="space-y-2.5">
        {q.pilihan.map((p, i) => {
          const letter = 'ABCD'[i];
          let cls = 'w-full text-left bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-700 transition-all duration-200 cursor-pointer hover:bg-blue-50 hover:border-blue-300';

          if (picked !== null) {
            if (p.correct)
              cls = 'w-full text-left bg-green-50 border-2 border-green-400 text-green-800 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-200 cursor-default';
            else if (i === picked && !p.correct)
              cls = 'w-full text-left bg-red-50 border-2 border-red-400 text-red-800 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-200 cursor-default';
            else
              cls = 'w-full text-left bg-slate-50 border-2 border-slate-200 text-slate-400 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-200 cursor-default opacity-60';
          }

          return (
            <motion.button
              key={i}
              whileHover={picked === null ? { x: 5 } : {}}
              whileTap={picked === null ? { scale: 0.98 } : {}}
              onClick={() => picked === null && onPick(i)}
              disabled={picked !== null}
              className={cls}
            >
              <span
                className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-extrabold mr-3 flex-shrink-0 ${
                  picked !== null && p.correct
                    ? 'bg-green-200 text-green-700'
                    : picked === i && !p.correct
                    ? 'bg-red-200 text-red-700'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {letter}
              </span>
              {p.text}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {picked !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`rounded-2xl p-4 border-2 ${
              q.pilihan[picked].correct
                ? 'bg-green-50 border-green-300'
                : 'bg-red-50 border-red-300'
            }`}
          >
            <p
              className={`font-extrabold text-base mb-1 ${
                q.pilihan[picked].correct ? 'text-green-700' : 'text-red-700'
              }`}
            >
              {q.pilihan[picked].correct
                ? '🎉 Keputusan yang tepat!'
                : '❌ Kurang tepat!'}
            </p>
            <p className="text-sm text-slate-600 font-semibold leading-relaxed">
              {q.penjelasan}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// Komponen Hasil Akhir
// ─────────────────────────────────────────
function HasilSimulasi({ scores, onComplete, onBack }) {
  const total   = SKENARIO.length;
  const correct = scores.filter(Boolean).length;
  const pct     = Math.round((correct / total) * 100);

  const badge =
    pct >= 90 ? { icon: '🏆', label: 'Juara Rambu!',       color: 'from-yellow-400 to-orange-400', msg: 'Luar biasa! Kamu pengendara yang sangat patuh!' }
  : pct >= 70 ? { icon: '🥈', label: 'Pengemudi Hebat!',    color: 'from-slate-400 to-slate-500',   msg: 'Bagus! Kamu sudah memahami aturan berkendara.' }
  : pct >= 50 ? { icon: '🥉', label: 'Pengemudi Pemula',    color: 'from-orange-400 to-amber-400',  msg: 'Lumayan! Pelajari lagi rambu-rambunya ya!' }
  :             { icon: '📚', label: 'Terus Semangat!',      color: 'from-indigo-400 to-purple-400', msg: 'Jangan menyerah! Ulangi materinya dan coba lagi!' };

  const ringColor =
    pct >= 90 ? '#22c55e' : pct >= 70 ? '#3b82f6' : pct >= 50 ? '#f97316' : '#ef4444';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      {/* Badge Hero */}
      <div
        className={`bg-gradient-to-br ${badge.color} rounded-3xl p-6 text-center shadow-xl relative overflow-hidden`}
      >
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/15 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/15 rounded-full" />

        <motion.div
          animate={{ scale: [1, 1.12, 1], rotate: [0, 8, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="text-6xl mb-2 relative"
        >
          {badge.icon}
        </motion.div>
        <div
          className="text-2xl text-white mb-1"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          {badge.label}
        </div>
        <p className="text-white/85 text-sm font-semibold">{badge.msg}</p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-3 gap-3">
        {[
          ['✅', 'Benar',   correct,      'bg-green-50  border-green-200  text-green-700'],
          ['❌', 'Salah',   total-correct, 'bg-red-50    border-red-200    text-red-700'  ],
          ['⭐', 'Skor',    `${pct}%`,    'bg-yellow-50 border-yellow-200 text-yellow-700'],
        ].map(([ic, l, v, cls]) => (
          <div key={l} className={`${cls} border-2 rounded-2xl p-3 text-center`}>
            <div className="text-2xl mb-0.5">{ic}</div>
            <div
              className="text-xl"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              {v}
            </div>
            <div className="text-xs font-extrabold opacity-70">{l}</div>
          </div>
        ))}
      </div>

      {/* Progress bar visual */}
      <div className="bg-white rounded-2xl shadow-md p-4">
        <div className="flex justify-between text-xs font-extrabold text-slate-500 mb-2">
          <span>Hasil Simulasi</span>
          <span style={{ color: ringColor }}>{pct}%</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: ringColor }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Rincian skenario */}
      <div className="bg-white rounded-3xl shadow-md p-4">
        <div className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
          Rincian Skenario
        </div>
        <div className="space-y-2.5">
          {SKENARIO.map((s, i) => (
            <div
              key={s.id}
              className={`flex items-start gap-3 p-3 rounded-2xl ${
                scores[i] ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}
            >
              <span className="text-base flex-shrink-0 mt-0.5">
                {scores[i] ? '✅' : '❌'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-lg">{s.ilustrasi}</span>
                  <span className="text-xs font-extrabold text-slate-500">
                    Skenario {i + 1}
                  </span>
                  <span
                    className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      scores[i]
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {s.rambu.name}
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700 leading-snug line-clamp-2">
                  {s.situasi}
                </p>
                {!scores[i] && (
                  <p className="text-xs text-green-700 font-semibold mt-1 leading-snug">
                    💡 {s.penjelasan}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sertifikat mini */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-5 text-center">
        <div className="text-3xl mb-2">🎓</div>
        <div
          className="text-indigo-800 text-lg mb-1"
          style={{ fontFamily: "'Fredoka One', cursive" }}
        >
          Sertifikat Aktivitas Selesai
        </div>
        <p className="text-indigo-600 text-xs font-bold">
          Kamu telah menyelesaikan Aktivitas 3 — Simulasi Berkendara
        </p>
        <div className="mt-3 flex justify-center gap-2 flex-wrap">
          {[badge.icon + ' ' + badge.label, `Skor ${pct}%`, `${correct}/${total} Benar`].map(
            (t) => (
              <span
                key={t}
                className="bg-indigo-100 text-indigo-700 text-xs font-extrabold px-3 py-1 rounded-full"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>

      {/* Tombol aksi */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onComplete}
        className="w-full inline-flex items-center justify-center gap-2 bg-green-500 text-white font-extrabold text-base px-7 py-3.5 rounded-full shadow-md shadow-green-200 transition-all duration-200 cursor-pointer border-none"
      >
        ✅ Aktivitas 3 Selesai — Kembali ke Menu
      </motion.button>

      <button
        onClick={onBack}
        className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-extrabold text-sm px-5 py-3 rounded-full hover:bg-slate-200 transition-all duration-200 cursor-pointer border-none"
      >
        ← Kembali ke Menu Aktivitas
      </button>
    </motion.div>
  );
}

// ─────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────
export default function AktivitasSimulasi({ onBack, onComplete }) {
  const [idx,    setIdx]    = useState(0);
  const [picked, setPicked] = useState(null);   // index pilihan yang dipilih
  const [scores, setScores] = useState([]);     // array boolean hasil tiap skenario
  const [done,   setDone]   = useState(false);  // semua skenario selesai

  const total = SKENARIO.length;
  const q     = SKENARIO[idx];

  function handlePick(pIdx) {
    if (picked !== null) return;
    const correct  = q.pilihan[pIdx].correct;
    setPicked(pIdx);
    correct ? playCorrect() : playWrong();

    const newScores = [...scores, correct];
    setScores(newScores);

    setTimeout(() => {
      if (idx < total - 1) {
        setIdx((i) => i + 1);
        setPicked(null);
      } else {
        setDone(true);
        playWin();
      }
    }, 2200);
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
            <div
              className="font-extrabold text-slate-800 text-sm truncate"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Aktivitas 3: Simulasi Berkendara
            </div>
            <div className="text-xs text-slate-400 font-semibold">
              {done
                ? 'Semua skenario selesai!'
                : `Skenario ${idx + 1} dari ${total}`}
            </div>
          </div>
          <span className="text-xl">🛣️</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5 pb-28">

        {done ? (
          /* ── Halaman Hasil ── */
          <HasilSimulasi
            scores={scores}
            onComplete={onComplete}
            onBack={onBack}
          />
        ) : (
          <>
            {/* ── Progress Bar Skenario ── */}
            <div className="mb-5">
              <div className="flex justify-between text-xs font-extrabold text-slate-400 mb-1.5">
                <span>Progress Simulasi</span>
                <span>{Math.round((idx / total) * 100)}%</span>
              </div>
              <div className="flex gap-1.5">
                {SKENARIO.map((_, i) => (
                  <motion.div
                    key={i}
                    className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                      i < idx
                        ? 'bg-green-400'
                        : i === idx
                        ? 'bg-blue-400'
                        : 'bg-slate-200'
                    }`}
                    animate={i === idx ? { opacity: [0.6, 1, 0.6] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                ))}
              </div>
              <div className="flex gap-1.5 mt-1">
                {SKENARIO.map((s, i) => (
                  <div key={i} className="flex-1 text-center">
                    <span className="text-xs">{i < idx ? (scores[i] ? '✅' : '❌') : i === idx ? '🔵' : '○'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Kartu Skenario ── */}
            <AnimatePresence mode="wait">
              <SkenarioCard
                key={idx}
                q={q}
                idx={idx}
                total={total}
                onPick={handlePick}
                picked={picked}
              />
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}