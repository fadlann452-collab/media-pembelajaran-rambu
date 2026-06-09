/**
 * Komponen SVG untuk menggambar rambu lalu lintas
 * Tidak memerlukan file gambar eksternal
 */
import React from 'react';
export default function RambuSVG({ shape, color, symbol, size = 80 }) {
  const s = size;
  const h = s / 2;

  // Rambu Peringatan - Segitiga Kuning
  if (shape === 'triangle') {
    const pts = `${h},${s * 0.06} ${s * 0.96},${s * 0.94} ${s * 0.04},${s * 0.94}`;
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
        <polygon points={pts} fill={color || '#f59e0b'} stroke="#e07b00" strokeWidth={s * 0.03} />
        <polygon
          points={`${h},${s * 0.18} ${s * 0.85},${s * 0.86} ${s * 0.15},${s * 0.86}`}
          fill="none"
          stroke="white"
          strokeWidth={s * 0.025}
        />
        <text
          x={h}
          y={s * 0.76}
          textAnchor="middle"
          fill="#7c3f00"
          fontSize={symbol && symbol.length > 1 ? s * 0.28 : s * 0.42}
          fontWeight="bold"
          fontFamily="sans-serif"
          dominantBaseline="middle"
        >
          {symbol || '!'}
        </text>
      </svg>
    );
  }

  // Rambu Larangan - Lingkaran Merah
  if (shape === 'circle') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
        <circle cx={h} cy={h} r={s * 0.46} fill="white" stroke="#ef4444" strokeWidth={s * 0.09} />
        {symbol === '—' || !symbol ? (
          <rect
            x={s * 0.2}
            y={h - s * 0.08}
            width={s * 0.6}
            height={s * 0.16}
            fill="#ef4444"
            rx={s * 0.07}
          />
        ) : (
          <text
            x={h}
            y={h}
            textAnchor="middle"
            fill="#ef4444"
            fontSize={symbol.length > 2 ? s * 0.24 : s * 0.32}
            fontWeight="bold"
            fontFamily="sans-serif"
            dominantBaseline="middle"
          >
            {symbol}
          </text>
        )}
        {/* Garis coret untuk larangan parkir */}
        {symbol === 'P' && (
          <line
            x1={s * 0.25}
            y1={s * 0.75}
            x2={s * 0.75}
            y2={s * 0.25}
            stroke="#ef4444"
            strokeWidth={s * 0.08}
          />
        )}
      </svg>
    );
  }

  // Rambu Perintah - Lingkaran Biru
  if (shape === 'circle-cmd') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
        <circle cx={h} cy={h} r={s * 0.46} fill="#3b82f6" />
        <text
          x={h}
          y={h}
          textAnchor="middle"
          fill="white"
          fontSize={symbol && symbol.length > 1 ? s * 0.3 : s * 0.42}
          fontFamily="sans-serif"
          dominantBaseline="middle"
        >
          {symbol || '↑'}
        </text>
      </svg>
    );
  }

  // Rambu Petunjuk - Persegi Hijau
  if (shape === 'square') {
    return (
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
        <rect
          x={s * 0.06}
          y={s * 0.06}
          width={s * 0.88}
          height={s * 0.88}
          fill="#22c55e"
          rx={s * 0.12}
        />
        <text
          x={h}
          y={h}
          textAnchor="middle"
          fill="white"
          fontSize={symbol && symbol.length > 1 ? s * 0.28 : s * 0.38}
          fontWeight="bold"
          fontFamily="sans-serif"
          dominantBaseline="middle"
        >
          {symbol || 'P'}
        </text>
      </svg>
    );
  }

  // Fallback
  return (
    <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
      <circle cx={h} cy={h} r={s * 0.46} fill={color || '#94a3b8'} />
      <text x={h} y={h} textAnchor="middle" fill="white" fontSize={s * 0.35} dominantBaseline="middle">
        {symbol || '?'}
      </text>
    </svg>
  );
}