import { useRef, useState } from 'react'

export default function MouseTrackCard({ children, className = '', glowColor = 'rgba(99, 102, 241, 0.15)' }) {
  const cardRef = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      background: `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 60%), rgba(255, 255, 255, 0.06)`,
    })
  }

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      background: 'rgba(255, 255, 255, 0.06)',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glass-card transition-all duration-300 ease-out ${className}`}
      style={{
        ...style,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
