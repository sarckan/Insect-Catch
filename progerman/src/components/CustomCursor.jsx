import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if ('ontouchstart' in window) return

    const cursor = cursorRef.current
    const dot = dotRef.current

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      })
    }

    const handleMouseEnter = () => cursor.classList.add('hovering')
    const handleMouseLeave = () => cursor.classList.remove('hovering')

    document.addEventListener('mousemove', moveCursor)

    const interactables = document.querySelectorAll('a, button, [data-hover]')
    interactables.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    // Re-observe for dynamic elements
    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll('a, button, [data-hover]')
      newInteractables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      observer.disconnect()
      interactables.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  )
}
