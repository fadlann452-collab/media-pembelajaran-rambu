import React from 'react'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';

const TABS = [
  { id: 'pengertian', label: 'Pengertian', icon: '📖', grad: 'from-indigo-500 to-purple-500', btn: 'bg-indigo-500' },
  { id: 'peringatan', label: 'Peringatan', icon: '⚠️', grad: 'from-yellow-400 to-orange-400', btn: 'bg-yellow-500' },
  { id: 'larangan',   label: 'Larangan',   icon: '🚫', grad: 'from-red-500 to-rose-500',      btn: 'bg-red-500'    },
  { id: 'perintah',   label: 'Perintah',   icon: '🔵', grad: 'from-blue-500 to-sky-500',       btn: 'bg-blue-500'   },
  { id: 'petunjuk',   label: 'Petunjuk',   icon: '🟢', grad: 'from-green-500 to-teal-500',    btn: 'bg-green-500'  },
];

function InfoBox({ color, children }) {
  return <div className={`${color} rounded-2xl p-4 mb-3`}>{children}</div>;
}

function ExGrid({ items, bg }) {
  return (
    <div className="grid grid-cols-3 gap-2 mt-3">
      {items.map(([sym, label, sub]) => (
        <div key={label} className={`${bg} rounded-xl p-3 text-center`}>
          <div className="text-xl mb-0.5">{sym}</div>
          <div className="text-xs font-extrabold leading-tight">{label}</div>
          {sub && <div className="text-xs opacity-70 mt-0.5">{sub}</div>}
        </div>
      ))}
    </div>
  );
}

const CONTENT = {
  pengertian: (
    <div className="space-y-3">
      <div className="text-center text-4xl py-2">🛣️</div>
      <p className="text-slate-600 text-sm leading-relaxed">
        <strong className="text-slate-800">Rambu lalu lintas</strong> adalah tanda-tanda yang
        dipasang di pinggir atau di atas jalan untuk memberikan informasi, peringatan, larangan,
        dan perintah kepada para pengguna jalan.
      </p>
      <InfoBox color="bg-blue-50 border-2 border-blue-200">
        <p className="font-extrabold text-blue-800 mb-2">🌟 Fungsi Rambu Lalu Lintas</p>
        <ul className="space-y-1 text-sm text-blue-700 font-semibold">
          {['Menjaga keselamatan pengguna jalan','Mengatur kelancaran arus lalu lintas','Mencegah terjadinya kecelakaan','Memberikan informasi arah & fasilitas'].map(f => (
            <li key={f} className="flex items-start gap-2"><span className="text-blue-400 mt-0.5">✔</span>{f}</li>
          ))}
        </ul>
      </InfoBox>
      <InfoBox color="bg-amber-50 border-2 border-amber-200">
        <p className="font-extrabold text-amber-800 mb-2">📌 4 Jenis Rambu</p>
        <div className="grid grid-cols-2 gap-2">
          {[['⚠️','Peringatan','bg-yellow-100 text-yellow-800'],['🚫','Larangan','bg-red-100 text-red-800'],['🔵','Perintah','bg-blue-100 text-blue-800'],['🟢','Petunjuk','bg-green-100 text-green-800']].map(([ic,l,cls]) => (
            <div key={l} className={`${cls} rounded-xl p-2 text-center text-xs font-extrabold`}>{ic} {l}</div>
          ))}
        </div>
      </InfoBox>
      <InfoBox color="bg-green-50 border-2 border-green-200">
        <p className="text-xs font-extrabold text-green-700">👮 Dibuat oleh <strong>Dinas Perhubungan</strong> — Semua pengguna jalan <strong>WAJIB</strong> mematuhinya!</p>
      </InfoBox>
    </div>
  ),
  peringatan: (
    <div className="space-y-3">
      <InfoBox color="bg-yellow-50 border-2 border-yellow-300">
        <div className="flex gap-3 items-start">
          <span className="text-3xl">⚠️</span>
          <div>
            <p className="font-extrabold text-yellow-800 mb-1">Ciri Rambu Peringatan</p>
            <ul className="text-xs text-yellow-700 font-bold space-y-0.5">
              <li>• Bentuk: <strong>Segitiga sama sisi</strong></li>
              <li>• Warna dasar: <strong>Kuning / Oranye</strong></li>
              <li>• Tepi: <strong>Merah</strong></li>
              <li>• Gambar: <strong>Hitam / Coklat tua</strong></li>
            </ul>
          </div>
        </div>
      </InfoBox>
      <p className="text-slate-600 text-sm leading-relaxed">
        Rambu peringatan memberitahu pengemudi bahwa ada <strong>bahaya atau kondisi khusus</strong> di
        jalan di depan. Kurangi kecepatan dan tingkatkan kewaspadaan!
      </p>
      <ExGrid bg="bg-yellow-50 text-yellow-800 border-2 border-yellow-200" items={[
        ['↱','Tikungan Tajam','Kurangi kecepatan'],
        ['〰','Jalan Licin','Jangan ngerem mendadak'],
        ['✚','Persimpangan','Waspada kendaraan'],
        ['🚂','Rel Kereta','Berhenti & lihat'],
        ['↘','Turunan Curam','Pakai gigi rendah'],
        ['↗','Tanjakan Curam','Tambah tenaga'],
      ]} />
    </div>
  ),
  larangan: (
    <div className="space-y-3">
      <InfoBox color="bg-red-50 border-2 border-red-300">
        <div className="flex gap-3 items-start">
          <span className="text-3xl">🚫</span>
          <div>
            <p className="font-extrabold text-red-800 mb-1">Ciri Rambu Larangan</p>
            <ul className="text-xs text-red-700 font-bold space-y-0.5">
              <li>• Bentuk: <strong>Lingkaran</strong></li>
              <li>• Warna dasar: <strong>Putih</strong></li>
              <li>• Tepi: <strong>Merah</strong></li>
              <li>• Gambar/tulisan: <strong>Merah atau Hitam</strong></li>
            </ul>
          </div>
        </div>
      </InfoBox>
      <p className="text-slate-600 text-sm leading-relaxed">
        Rambu larangan memberitahu hal yang <strong>TIDAK BOLEH</strong> dilakukan. Melanggarnya
        bisa kena <strong>tilang</strong> dan membahayakan keselamatan!
      </p>
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-2.5">
        <p className="text-xs font-extrabold text-red-700">⚠️ Melanggar rambu larangan = melanggar hukum!</p>
      </div>
      <ExGrid bg="bg-red-50 text-red-800 border-2 border-red-200" items={[
        ['—','Dilarang Masuk','Tidak boleh masuk'],
        ['P','Dilarang Parkir','Tidak boleh berhenti'],
        ['40','Batas Kecepatan','Maks 40 km/jam'],
        ['↱','Dilarang Belok','Tidak boleh belok'],
        ['⤢','Dilarang Menyalip','Tidak boleh salip'],
        ['⊘','Dilarang Putar','Tidak boleh balik arah'],
      ]} />
    </div>
  ),
  perintah: (
    <div className="space-y-3">
      <InfoBox color="bg-blue-50 border-2 border-blue-300">
        <div className="flex gap-3 items-start">
          <span className="text-3xl">🔵</span>
          <div>
            <p className="font-extrabold text-blue-800 mb-1">Ciri Rambu Perintah</p>
            <ul className="text-xs text-blue-700 font-bold space-y-0.5">
              <li>• Bentuk: <strong>Lingkaran</strong></li>
              <li>• Warna dasar: <strong>Biru</strong></li>
              <li>• Gambar: <strong>Putih</strong></li>
              <li>• Tidak ada tepi berwarna</li>
            </ul>
          </div>
        </div>
      </InfoBox>
      <p className="text-slate-600 text-sm leading-relaxed">
        Rambu perintah <strong>mewajibkan</strong> pengemudi melakukan sesuatu.
        Harus dipatuhi <strong>tanpa pengecualian</strong>!
      </p>
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-2.5">
        <p className="text-xs font-extrabold text-blue-700">
          💡 Bedanya: Perintah = HARUS dilakukan · Larangan = TIDAK BOLEH dilakukan
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[['↰','Wajib Kiri'],['↑','Wajib Lurus'],['↱','Wajib Kanan'],['🚶','Pejalan Kaki'],['🚲','Jalur Sepeda'],['↩','Putar Balik']].map(([sym, label]) => (
          <div key={label} className="bg-blue-500 rounded-xl p-3 text-center">
            <div className="text-xl mb-0.5">{sym}</div>
            <div className="text-xs font-extrabold text-white leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
  petunjuk: (
    <div className="space-y-3">
      <InfoBox color="bg-green-50 border-2 border-green-300">
        <div className="flex gap-3 items-start">
          <span className="text-3xl">🟢</span>
          <div>
            <p className="font-extrabold text-green-800 mb-1">Ciri Rambu Petunjuk</p>
            <ul className="text-xs text-green-700 font-bold space-y-0.5">
              <li>• Bentuk: <strong>Persegi / Persegi Panjang</strong></li>
              <li>• Warna dasar: <strong>Hijau atau Biru</strong></li>
              <li>• Gambar/tulisan: <strong>Putih</strong></li>
            </ul>
          </div>
        </div>
      </InfoBox>
      <p className="text-slate-600 text-sm leading-relaxed">
        Rambu petunjuk memberikan <strong>informasi berguna</strong> bagi pengguna jalan
        seperti arah, lokasi fasilitas, nama kota, dan jarak tempuh.
      </p>
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2.5">
        <p className="text-xs font-extrabold text-green-700">
          ✅ Rambu petunjuk tidak melarang atau memerintah — hanya memberi informasi!
        </p>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[['🏥','Rumah Sakit'],['⛽','SPBU'],['P','Parkir'],['🍽','Rest Area'],['🏨','Hotel'],['🚔','Kantor Polisi']].map(([sym, label]) => (
          <div key={label} className="bg-green-500 rounded-xl p-3 text-center">
            <div className="text-xl mb-0.5">{sym}</div>
            <div className="text-xs font-extrabold text-white leading-tight">{label}</div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export default function MateriScreen({ onHome, onMarkDone }) {
  const [tab, setTab]   = useState('pengertian');
  const [read, setRead] = useState(new Set());
  const activeTab = TABS.find(t => t.id === tab);

  function handleTab(id) {
    setTab(id);
    setRead(r => { const n = new Set(r); n.add(id); return n; });
  }

  const allRead = TABS.every(t => read.has(t.id));

  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} title="Materi Pembelajaran" subtitle="Klik semua tab untuk selesai" />
      <div className="max-w-2xl mx-auto px-4 py-6 pb-28">

        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-gradient-to-r ${activeTab.grad} rounded-3xl p-5 mb-5 text-center shadow-lg transition-all duration-500`}
        >
          <div className="fredoka text-2xl text-white">📚 Materi Rambu Lalu Lintas</div>
          <p className="text-white/80 text-sm mt-1">Buka semua tab untuk melanjutkan!</p>
          <div className="flex justify-center gap-2 mt-3">
            {TABS.map(t => (
              <div key={t.id} className={`w-2 h-2 rounded-full transition-all duration-300 ${read.has(t.id) ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar">
          {TABS.map(t => (
            <motion.button
              key={t.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleTab(t.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-extrabold border-2 transition-all duration-200 ${
                tab === t.id
                  ? `${t.btn} text-white border-transparent shadow-md`
                  : read.has(t.id)
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {read.has(t.id) && tab !== t.id ? '✓' : t.icon} {t.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="bg-white rounded-3xl shadow-md p-5 mb-5 min-h-[360px]"
          >
            {CONTENT[tab]}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {allRead && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onMarkDone}
              className="btn-action bg-green-500 text-white w-full justify-center shadow-green-200 mb-3"
            >
              ✅ Materi Selesai! Tandai & Kembali ke Beranda
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