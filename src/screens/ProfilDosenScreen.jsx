export default function ProfilDosenScreen({ onHome }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-4">
        👨‍🎓 Profil Dosen
      </h1>

      <p className="text-center mb-6">
        Data dosen akan ditambahkan di sini.
      </p>

      <button
        onClick={onHome}
        className="bg-blue-500 text-white px-5 py-3 rounded-xl"
      >
        Kembali
      </button>
    </div>
  );
}