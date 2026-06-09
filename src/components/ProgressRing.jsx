import React, { useRef, useEffect } from 'react'

export default function ProgressRing({ radius = 45, strokeWidth = 4, progress = 0, color = '#3B82F6' }) {
  const circleRef = useRef(null)
  
  useEffect(() => {
    const circle = circleRef.current
    if (!circle) return
    
    const circumference = 2 * Math.PI * radius
    circle.style.strokeDasharray = circumference
    circle.style.strokeDashoffset = circumference * (1 - progress)
  }, [progress, radius])

  const normalizedRadius = radius + strokeWidth / 2
  const circumference = 2 * Math.PI * normalizedRadius

  return (
    <svg height={normalizedRadius * 2} width={normalizedRadius * 2}>
      <circle
        ref={circleRef}
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        r={radius}
        cx={normalizedRadius}
        cy={normalizedRadius}
        style={{
          transition: 'stroke-dashoffset 0.35s',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  )
}