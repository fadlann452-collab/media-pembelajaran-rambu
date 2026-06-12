import { motion } from "framer-motion";

export default function ProfilPengajarScreen({
  onHome,
  onGuru,
  onDosen,
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-6">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl p-6 text-white mb-6"
        >
          <h1 className="text-3xl font-bold mb-2">
            👨‍🏫 Profil Pengajar
          </h1>

          <p className="text-indigo-100">
            Kenali guru dan dosen yang terlibat dalam pengembangan media pembelajaran ini.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <div className="text-6xl text-center mb-3">
              👨‍🏫
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              Profil Guru
            </h2>

            <p className="text-slate-600 text-center mb-5">
              Informasi guru pengampu mata pelajaran.
            </p>

            <button
              onClick={onGuru}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl"
            >
              Lihat Profil Guru
            </button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-lg p-6"
          >
            <div className="text-6xl text-center mb-3">
              👨‍🎓
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              Profil Dosen
            </h2>

            <p className="text-slate-600 text-center mb-5">
              Informasi dosen pembimbing media pembelajaran.
            </p>

            <button
              onClick={onDosen}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl"
            >
              Lihat Profil Dosen
            </button>
          </motion.div>

        </div>

        <button
          onClick={onHome}
          className="mt-6 w-full bg-slate-200 hover:bg-slate-300 py-3 rounded-xl font-bold"
        >
          🏠 Kembali ke Beranda
        </button>

      </div>
    </div>
  );
}