import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const PESAN = {
    dashboard: "Halo teman-teman! Ayo belajar rambu lalu lintas bersama Rambu! 🚦",
    profil: "Kenali dulu gurumu ya, teman teman!👩‍🏫",
    petunjuk: "Baca petunjuknya dulu biar belajarnya makin seru!📖",
    tujuan: "ini yang akan kita pelajari hari ini, Yuk semangat!🎯",
    materi: "Simak materinya baik-baik ya! Nanti ada game seru!📚",
    galeri: "Klik tiap rambu untuk tahu artinya!🖼️",
    game: "Tunjukkan kehebatanmu! Tebak rambunya!🎮",
    quiz: "Ini soal terakhir. Kerjakan dengan teliti ya!📝",
    hasil: "Selamat! Kamu sudah menyelesaikan pembelajaran hari ini!🏆",
};

export default function Maskot({ screen }) {
    const [visible, setVisible] = useState(true);
    const [pesan, setPesan] = useState(PESAN[screen] || PESAN.dashboard);

    useEffect(() => {
        setVisible(false);
        const t = setTimeout(() => {
            setPesan(PESAN[screen] || PESAN.dashboard);
            setVisible(true);
        }, 200);

        // Return function untuk cleanup
        return () => {
            clearTimeout(t);
        };
    }, [screen]);

    return (
        <div className="fixed bottom-5 right-4 z-50 flex flex-col items-end gap-2 pointer-events-none">
            <AnimatePresence>
                {visible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 8 }}
                        className="bg-white rounded-2xl rounded-br-sm shadow-lg border-2 border-blue-100 px-3.5 py-2.5 max-w-[200px] pointer-events-auto"
                    >
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">{pesan}</p>
                        <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-r-0 border-t-8 border-l-transparent border-t-white" style={{ filter: 'drop-shadow(0 2px 0 #bfdbfe)' }} />
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="w-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-200 border-4 border-white text-2xl pointer-events-auto cursor-pointer"
                onClick={() => setVisible(v => !v)}
                title="Si Rambu"
            >
                🚦
            </motion.div>
            <div className="fredoka text-xs text-blue-600 font-bold text-center">Si Rambu</div>
        </div>
    );
}