import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopBar from '../components/TopBar';
import RambuSVG from '../components/RambuSVG';
import { playCorrect, playWrong, playWin } from '../utils/sound';

// ── Data ──────────────────────────────────────────────────────────────────────

const TAHAP1 = [
  { id: 1, shape: 'circle', color: '#ef4444', symbol: '—', name: 'Dilarang Masuk', answer: 'Larangan' },
  { id: 2, shape: 'triangle', color: '#f59e0b', symbol: '↱', name: 'Tikungan Kanan', answer: 'Peringatan' },
  { id: 3, shape: 'square', color: '#22c55e', symbol: '🏥', name: 'Rumah Sakit', answer: 'Petunjuk' },
  { id: 4, shape: 'circle-cmd', color: '#3b82f6', symbol: '↑', name: 'Wajib Lurus', answer: 'Perintah' }
]