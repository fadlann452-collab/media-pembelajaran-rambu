import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';

const MENU = [
  {
    id: 'aktivitas-cocokkan',
    icon: '🧩',
    title: 'Cocokkan Jenis Rambu',
    desc: 'Pilih jenis rambu yang benar'
  },
  {
    id: 'aktivitas-fungsi',
    icon: '🎯',
    title: 'Fungsi Rambu',
    desc: 'Tebak fungsi dari rambu'
  },
  {
    id: 'aktivitas-simulasi',
    icon: '🚗',
    title: 'Simulasi Berkendara',
    desc: 'Pilih tindakan yang tepat'
  }
];

export default function AktivitasScreen({
  onHome,
  onNavigate
}) {
  return (
    <div className="min-h-screen">
      <TopBar
        onHome={onHome}
        title="Aktivitas Interaktif"
        subtitle="Belajar sambil bermain"
      />

      <div className="max-w-2xl mx-auto px-4 py-6">

        <div className="grid gap-4">

          {MENU.map(item => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(item.id)}
              className="bg-white rounded-3xl p-5 shadow text-left"
            >
              <div className="text-4xl mb-2">
                {item.icon}
              </div>

              <div className="font-extrabold text-lg">
                {item.title}
              </div>

              <div className="text-sm text-slate-500">
                {item.desc}
              </div>
            </motion.button>
            
          ))}
        <button
          onClick={onHome}
          className="mt-6 w-full bg-slate-200 hover:bg-slate-300 py-3 rounded-xl font-bold"
        >
          🏠 Kembali ke Beranda
        </button>
        </div>
      </div>
    </div>
  );
}