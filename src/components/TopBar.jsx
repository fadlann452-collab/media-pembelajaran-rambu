import React from 'react'
import { motion } from 'framer-motion';
import {playClick} from '../utils/sound';
import unuLogo from '../assets/unu.png';
import mbkmLogo from '../assets/mbkm.png';
import tutwuriLogo from '../assets/tutwuri.png';

export default function TopBar ({onHome, title, subtitle}) {
    return (
        <motion.div
        initial={{opacity: 0, y: -10}}
        animate={{ opacity:1, y:0}}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-smborder-b border-slate-100 shadow-sw"
        >
        <div className="max-w-2x1 mx-auto px-4 py-3 flex items-centergap-3"> 
            <button
                onClick={() => {playClick(); onHome(); }}
                className="btn-home flex-shrink-0"
                >
                    🏠 Beranda
                </button>
                <div className="flex-1 min-w-0 text-center">
                    <div className="fredoka text-base text-slate-800 truncate leading-none">{title}</div>
                     {subtitle && <div className="text-xs text-slate-400 dont-semibold mt-0.5 truncate">{subtitle}</div>}
                </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                    <img src={unuLogo} alt=" " className="h-8 md:h-10 w-auto" />
                    <img src={mbkmLogo} alt=" " className="h-8 md:h-10 w-auto" />
                    <img src={tutwuriLogo} alt=" " className="h-8 md:h-10 w-auto" />
                </div>
            </div>
        </motion.div>
    );
}