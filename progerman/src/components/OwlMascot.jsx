import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function OwlMascot({ size = 60, animate = true, mood = 'happy' }) {
  const owlRef = useRef(null)
  const leftEyeRef = useRef(null)
  const rightEyeRef = useRef(null)

  useEffect(() => {
    if (!animate) return

    // Blink animation
    const blink = () => {
      const tl = gsap.timeline()
      tl.to([leftEyeRef.current, rightEyeRef.current], {
        scaleY: 0.1,
        duration: 0.1,
        ease: 'power2.in',
      })
      tl.to([leftEyeRef.current, rightEyeRef.current], {
        scaleY: 1,
        duration: 0.1,
        ease: 'power2.out',
      })
    }

    const interval = setInterval(blink, 3000 + Math.random() * 2000)

    // Gentle floating
    gsap.to(owlRef.current, {
      y: -3,
      duration: 2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    return () => clearInterval(interval)
  }, [animate])

  // Eye tracking mouse
  useEffect(() => {
    if (!animate) return
    const handleMouse = (e) => {
      const owl = owlRef.current
      if (!owl) return
      const rect = owl.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / window.innerWidth
      const dy = (e.clientY - cy) / window.innerHeight
      gsap.to([leftEyeRef.current, rightEyeRef.current], {
        x: dx * 2,
        y: dy * 2,
        duration: 0.3,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [animate])

  const s = size
  const colors = {
    body: '#6366f1',
    bodyDark: '#4f46e5',
    belly: '#818cf8',
    eye: '#f8fafc',
    pupil: '#1e1b4b',
    beak: '#eab308',
    hat: '#1e1b4b',
    hatBand: '#ef4444',
    cheek: mood === 'happy' ? 'rgba(244, 114, 182, 0.3)' : 'transparent',
  }

  return (
    <svg
      ref={owlRef}
      width={s}
      height={s}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* Body */}
      <ellipse cx="50" cy="60" rx="30" ry="32" fill={colors.body} />
      <ellipse cx="50" cy="65" rx="22" ry="22" fill={colors.belly} opacity="0.3" />

      {/* Ears/Tufts */}
      <path d="M25 35 L20 15 L35 30 Z" fill={colors.body} />
      <path d="M75 35 L80 15 L65 30 Z" fill={colors.body} />

      {/* Graduation Hat */}
      <rect x="28" y="12" width="44" height="6" rx="1" fill={colors.hat} />
      <polygon points="50,2 28,14 72,14" fill={colors.hat} />
      <rect x="46" y="8" width="8" height="6" rx="1" fill={colors.hat} />
      <line x1="70" y1="14" x2="78" y2="22" stroke={colors.hatBand} strokeWidth="2" />
      <circle cx="79" cy="24" r="3" fill={colors.hatBand} />

      {/* Eyes */}
      <circle cx="38" cy="48" r="12" fill={colors.eye} />
      <circle cx="62" cy="48" r="12" fill={colors.eye} />

      {/* Pupils */}
      <g ref={leftEyeRef} style={{ transformOrigin: '38px 48px' }}>
        <circle cx="39" cy="48" r="6" fill={colors.pupil} />
        <circle cx="41" cy="46" r="2" fill="white" />
      </g>
      <g ref={rightEyeRef} style={{ transformOrigin: '62px 48px' }}>
        <circle cx="63" cy="48" r="6" fill={colors.pupil} />
        <circle cx="65" cy="46" r="2" fill="white" />
      </g>

      {/* Beak */}
      <polygon points="50,55 45,60 55,60" fill={colors.beak} />

      {/* Cheeks */}
      <circle cx="30" cy="58" r="5" fill={colors.cheek} />
      <circle cx="70" cy="58" r="5" fill={colors.cheek} />

      {/* Feet */}
      <ellipse cx="40" cy="90" rx="8" ry="3" fill={colors.beak} />
      <ellipse cx="60" cy="90" rx="8" ry="3" fill={colors.beak} />

      {/* Wings */}
      <path d="M20 55 Q10 65 18 80 Q22 70 25 60 Z" fill={colors.bodyDark} />
      <path d="M80 55 Q90 65 82 80 Q78 70 75 60 Z" fill={colors.bodyDark} />

      {/* Smile */}
      {mood === 'happy' && (
        <path d="M44 64 Q50 70 56 64" stroke={colors.bodyDark} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      )}
    </svg>
  )
}
