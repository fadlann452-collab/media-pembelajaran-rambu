import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import LandingScreen from './screens/LandingScreen';

import Maskot from './components/Maskot';
import DashboardScreen from './screens/DashboardScreen';
import ProfilPengajarScreen from './screens/ProfilPengajarScreen';
import ProfilDosenScreen from './screens/ProfilDosenScreen';
import ProfilGuruScreen from './screens/ProfilGuruScreen';
import PetunjukScreen from './screens/PetunjukScreen';
import TujuanScreen from './screens/TujuanScreen';
import MateriScreen from './screens/MateriScreen';
import GaleriScreen from './screens/GaleriScreen';
import AktivitasScreen from './screens/AktivitasScreen';
import AktivitasCocokkan from './screens/AktivitasCocokkan';
import AktivitasFungsi from './screens/AktivitasFungsi';
import AktivitasSimulasi from './screens/AktivitasSimulasi';
import GameScreen from './screens/GameScreen';
import QuizScreen from './screens/QuizScreen';
import HasilScreen from './screens/HasilScreen';

import bgMusic from './assets/audio/kids.mp3';

const SLIDE = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.18,
    },
  },
};

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [progress, setProgress] = useState({});
  const [quizAnswers, setQuizAnswers] = useState({});

  const [musicOn, setMusicOn] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(bgMusic);

    audioRef.current.loop = true;
    audioRef.current.volume = 0.1;

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (musicOn) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [musicOn]);

  function goHome() {
    setScreen('dashboard');
  }

  function markDone(section) {
    setProgress((p) => ({
      ...p,
      [section]: true,
    }));

    goHome();
  }

  function onQuizFinish(answers) {
    setQuizAnswers(answers);

    setProgress((p) => ({
      ...p,
      quiz: true,
    }));

    setScreen('hasil');
  }

  const screens = {
    landing: (
      <LandingScreen
      onStart={() => setScreen('dashboard')}
      />
    ),
    
    dashboard: (
      <DashboardScreen
        progress={progress}
        onNavigate={setScreen}
      />
    ),

    profil: (
      <ProfilPengajarScreen
        onHome={goHome}
        onGuru={() => setScreen('profilguru')}
        onDosen={() => setScreen('profildosen')}
      />
    ),

    profilguru: (
      <ProfilGuruScreen
        onHome={goHome}
        onBack={() => setScreen('profil')}
      />
    ),

    profildosen: (
      <ProfilDosenScreen
        onHome={goHome}
        onBack={() => setScreen('profil')}
      />
    ),

    petunjuk: (
      <PetunjukScreen
        onHome={goHome}
      />
    ),

    tujuan: (
      <TujuanScreen
        onHome={goHome}
      />
    ),

    materi: (
      <MateriScreen
        onHome={goHome}
        onMarkDone={() => markDone('materi')}
      />
    ),

    galeri: (
      <GaleriScreen
        onHome={goHome}
        onMarkDone={() => markDone('galeri')}
      />
    ),

    aktivitas: (
      <AktivitasScreen
        onHome={goHome}
        onMarkDone={() => markDone('aktivitas')}
      />
    ),

    aktivitas_cocokkan: (
      <AktivitasCocokkan
        onHome={() => setScreen('aktivitas')}
      />
    ),

    aktivitas_fungsi: (
      <AktivitasFungsi
        onHome={() => setScreen('aktivitas')}
      />
    ),

    aktivitas_simulasi: (
      <AktivitasSimulasi
        onHome={() => setScreen('aktivitas')}
        onMarkDone={() => markDone('aktivitas')}
      />
    ),

    game: (
      <GameScreen
        onHome={goHome}
        onMarkDone={() => markDone('game')}
      />
    ),

    quiz: (
      <QuizScreen
        onHome={goHome}
        onFinish={onQuizFinish}
      />
    ),

    hasil: (
      <HasilScreen
        answers={quizAnswers}
        onHome={goHome}
        onRetry={() => setScreen('quiz')}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Tombol Musik */}
      <button
        onClick={() => setMusicOn(!musicOn)}
        className="
          fixed
          bottom-4
          left-4
          z-[999]
          bg-white
          shadow-lg
          rounded-full
          px-4
          py-3
          text-lg
          hover:scale-105
          transition
        "
      >
        {musicOn ? '🔊' : '🔇'}
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={SLIDE}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {screens[screen] ?? screens.dashboard}
        </motion.div>
      </AnimatePresence>

      <Maskot screen={screen} />
    </div>
  );
}