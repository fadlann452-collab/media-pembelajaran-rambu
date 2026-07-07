import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';

// ─────────────────────────────────────────────────────────────────
// Data konten (mudah diedit tanpa menyentuh JSX)
// ─────────────────────────────────────────────────────────────────
const IDENTITAS = [
  { icon: '📚', label: 'Mata Pelajaran', value: 'Pendidikan Pancasila'       },
  { icon: '🏫', label: 'Jenjang',        value: 'Sekolah Dasar (SD)'         },
  { icon: '👦', label: 'Kelas',          value: 'IV (Empat)'                 },
  { icon: '📖', label: 'Topik',          value: 'Mengenal Rambu Lalu Lintas' },
  { icon: '📅', label: 'Semester',       value: 'Genap'                      },
];

const TUJUAN = [
  'Mengenal jenis-jenis rambu lalu lintas',
  'Memahami fungsi setiap rambu',
  'Mengidentifikasi rambu di lingkungan sekitar',
  'Menunjukkan perilaku tertib berlalu lintas',
];

const KOMPETENSI = [
  { label: 'Berpikir Kritis',        icon: '🧠', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { label: 'Literasi Visual',         icon: '👁️', color: 'bg-blue-100   text-blue-700   border-blue-200'   },
  { label: 'Kesadaran Keselamatan',   icon: '🦺', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { label: 'Pengambilan Keputusan',   icon: '⚡', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
];

const MEDIA = [
  { icon: '📖', label: 'Materi Interaktif'             },
  { icon: '🖼️', label: 'Galeri Rambu'                  },
  { icon: '🎯', label: 'Aktivitas Mencocokkan'          },
  { icon: '🔗', label: 'Aktivitas Fungsi Rambu'         },
  { icon: '🛣️', label: 'Simulasi Situasi Berkendara'    },
  { icon: '🎮', label: 'Game Tebak Rambu'               },
  { icon: '📝', label: 'Quiz Evaluasi'                  },
];

// ─────────────────────────────────────────────────────────────────
// Animasi helper
// ─────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 18 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay, ease: 'easeOut' },
});

// ─────────────────────────────────────────────────────────────────
// KOMPONEN UTAMA
// ─────────────────────────────────────────────────────────────────
export default function InformasiPembelajaranScreen({ onHome }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <TopBar
        onHome={onHome}
        title="Informasi Pembelajaran"
        subtitle="Detail materi yang akan dipelajari"
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-28 space-y-4">

        {/* ── Hero Header ─────────────────────────────────── */}
        <motion.div
          {...fadeUp(0)}
          className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-3xl p-5
                     shadow-xl shadow-cyan-200 relative overflow-hidden"
        >
          <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

          <div className="relative flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="text-5xl flex-shrink-0"
            >
              📋
            </motion.div>
            <div>
              <div
                className="text-2xl text-white leading-tight"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Informasi Pembelajaran
              </div>
              <p className="text-cyan-100 text-sm font-semibold mt-0.5">
                Rambu Lalu Lintas · SD Kelas IV
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── Card 1: Identitas Pembelajaran ──────────────── */}
        <motion.div
          {...fadeUp(0.08)}
          className="bg-white rounded-3xl shadow-md p-5 border-2 border-slate-100"
        >
          {/* Label kartu */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-base">
              🏷️
            </div>
            <span
              className="text-base text-slate-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Identitas Pembelajaran
            </span>
          </div>

          {/* Tabel identitas */}
          <div className="space-y-2.5">
            {IDENTITAS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
                className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2.5"
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-xs font-extrabold text-slate-400 w-28 flex-shrink-0">
                  {item.label}
                </span>
                <span className="text-sm font-extrabold text-slate-700 leading-snug">
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Card 2: Capaian Pembelajaran ────────────────── */}
        <motion.div
          {...fadeUp(0.16)}
          className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl shadow-md
                     p-5 border-2 border-purple-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-200 rounded-xl flex items-center justify-center text-base">
              🎯
            </div>
            <span
              className="text-base text-purple-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Capaian Pembelajaran
            </span>
          </div>

          <div className="bg-white/70 rounded-2xl p-4 border border-purple-200">
            <p className="text-sm font-semibold text-purple-900 leading-relaxed">
              Peserta didik mampu <strong>mengenali berbagai jenis rambu lalu lintas</strong>,
              memahami fungsi setiap rambu, serta{' '}
              <strong>menerapkan perilaku tertib berlalu lintas</strong>{' '}
              dalam kehidupan sehari-hari.
            </p>
          </div>
        </motion.div>

        {/* ── Card 3: Tujuan Umum ──────────────────────────── */}
        <motion.div
          {...fadeUp(0.22)}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-md
                     p-5 border-2 border-green-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-200 rounded-xl flex items-center justify-center text-base">
              ✅
            </div>
            <span
              className="text-base text-green-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Tujuan Umum
            </span>
          </div>

          <p className="text-xs font-extrabold text-green-700 mb-3 uppercase tracking-wide">
            Setelah mempelajari materi ini, peserta didik mampu:
          </p>

          <div className="space-y-2">
            {TUJUAN.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="flex items-start gap-3 bg-white/70 rounded-xl px-3.5 py-2.5
                           border border-green-200"
              >
                <span className="w-5 h-5 bg-green-400 rounded-full flex items-center
                                 justify-center text-white text-[10px] font-extrabold
                                 flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-green-900 leading-snug">{t}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Card 4: Alokasi Waktu ────────────────────────── */}
        <motion.div
          {...fadeUp(0.30)}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-md
                     p-5 border-2 border-amber-200"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-amber-200 rounded-xl flex items-center justify-center text-base">
              ⏰
            </div>
            <span
              className="text-base text-amber-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Alokasi Waktu
            </span>
          </div>

          <div className="flex items-center gap-4 bg-white/70 rounded-2xl px-5 py-4
                          border border-amber-200">
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="text-4xl flex-shrink-0"
            >
              ⏱️
            </motion.div>
            <div>
              <div
                className="text-2xl text-amber-700 leading-none"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                2 × 35 Menit
              </div>
              <div className="text-xs font-extrabold text-amber-600 mt-0.5 uppercase tracking-wide">
                1 Pertemuan
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Card 5: Kompetensi yang Dilatih ──────────────── */}
        <motion.div
          {...fadeUp(0.36)}
          className="bg-white rounded-3xl shadow-md p-5 border-2 border-slate-100"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center text-base">
              🧠
            </div>
            <span
              className="text-base text-slate-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Kompetensi yang Dilatih
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {KOMPETENSI.map((k, i) => (
              <motion.div
                key={k.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.38 + i * 0.08, type: 'spring', stiffness: 240 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2
                            font-extrabold text-sm ${k.color} cursor-default`}
              >
                <span className="text-base">{k.icon}</span>
                {k.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Card 6: Media Pembelajaran ───────────────────── */}
        <motion.div
          {...fadeUp(0.44)}
          className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-3xl shadow-md
                     p-5 border-2 border-cyan-200"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-cyan-200 rounded-xl flex items-center justify-center text-base">
              💻
            </div>
            <span
              className="text-base text-cyan-800"
              style={{ fontFamily: "'Fredoka One', cursive" }}
            >
              Media Pembelajaran
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {MEDIA.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.46 + i * 0.06 }}
                className="flex items-center gap-2.5 bg-white/70 rounded-xl px-3.5 py-2.5
                           border border-cyan-200"
              >
                <span className="text-lg flex-shrink-0">{m.icon}</span>
                <span className="text-xs font-extrabold text-cyan-900 leading-snug">
                  {m.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Tombol Kembali ───────────────────────────────── */}
        <motion.div {...fadeUp(0.52)}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onHome}
            className="w-full inline-flex items-center justify-center gap-2 bg-blue-500
                       text-white font-extrabold text-base px-7 py-3.5 rounded-full
                       shadow-md shadow-blue-200 hover:bg-blue-600 transition-all
                       duration-200 cursor-pointer border-none"
          >
            🏠 Kembali ke Beranda
          </motion.button>
        </motion.div>

      </div>
    </div>
  );
}