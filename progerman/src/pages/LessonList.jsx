import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, Play, Lock, CheckCircle, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'

const levelData = {
  a1: {
    label: 'A1', name: 'Beginner', color: '#22c55e',
    lessons: [
      { id: 'a1-1', title: 'Greetings & Introductions', desc: 'Hallo! Learn how to greet and introduce yourself', duration: '15 min', completed: true, free: true },
      { id: 'a1-2', title: 'Numbers 1-100', desc: 'Count in German and use numbers in context', duration: '12 min', completed: true, free: true },
      { id: 'a1-3', title: 'The German Alphabet', desc: 'Pronunciation guide including umlauts (ä, ö, ü, ß)', duration: '10 min', completed: true, free: true },
      { id: 'a1-4', title: 'Articles: der, die, das', desc: 'Master the three genders in German', duration: '20 min', completed: false, free: false },
      { id: 'a1-5', title: 'Personal Pronouns', desc: 'ich, du, er, sie, es — and formal Sie', duration: '15 min', completed: false, free: false },
      { id: 'a1-6', title: 'Present Tense (Präsens)', desc: 'Regular verb conjugation in present tense', duration: '25 min', completed: false, free: false },
      { id: 'a1-7', title: 'Family & Relationships', desc: 'Describe your family members', duration: '18 min', completed: false, free: false },
      { id: 'a1-8', title: 'Food & Drink', desc: 'Order at a restaurant, discuss meals', duration: '20 min', completed: false, free: false },
      { id: 'a1-9', title: 'Days, Months & Time', desc: 'Tell the time and talk about schedules', duration: '15 min', completed: false, free: false },
      { id: 'a1-10', title: 'Accusative Case', desc: 'Introduction to den, die, das — object case', duration: '25 min', completed: false, free: false },
      { id: 'a1-11', title: 'Daily Routine', desc: 'Describe your typical day with separable verbs', duration: '20 min', completed: false, free: false },
      { id: 'a1-12', title: 'A1 Goethe Mock Exam', desc: 'Full practice test in Goethe A1 format', duration: '60 min', completed: false, free: false },
    ],
  },
  a2: { label: 'A2', name: 'Elementary', color: '#3b82f6', lessons: [] },
  b1: { label: 'B1', name: 'Intermediate', color: '#f97316', lessons: [] },
  b2: { label: 'B2', name: 'Upper Intermediate', color: '#a855f7', lessons: [] },
  c1: { label: 'C1', name: 'Advanced', color: '#ef4444', lessons: [] },
  c2: { label: 'C2', name: 'Mastery', color: '#eab308', lessons: [] },
}

export default function LessonList() {
  const { levelId } = useParams()
  const level = levelData[levelId] || levelData.a1
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lesson-item', {
        opacity: 0,
        y: 20,
        stagger: 0.06,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <Navbar />
      <div ref={ref} className="page-content max-w-3xl mx-auto sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <Link to="/levels" className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors mb-4">
            <ChevronLeft size={16} /> Back to Levels
          </Link>
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-extrabold"
              style={{ background: `${level.color}15`, border: `2px solid ${level.color}40`, color: level.color }}
            >
              {level.label}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: level.color }}>
                {level.name}
              </h1>
              <p className="text-text-secondary text-sm">{level.lessons.length} lessons</p>
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="space-y-3">
          {level.lessons.map((lesson, i) => (
            <Link key={lesson.id} to={`/lesson/${lesson.id}`}>
              <MouseTrackCard
                className="lesson-item p-4 sm:p-5 group cursor-pointer flex items-center gap-4"
                glowColor={`${level.color}15`}
              >
                {/* Number / Status */}
                <div
                  className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold"
                  style={{
                    background: lesson.completed ? `${level.color}20` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${lesson.completed ? `${level.color}40` : 'rgba(255,255,255,0.08)'}`,
                    color: lesson.completed ? level.color : 'var(--color-text-muted)',
                  }}
                >
                  {lesson.completed ? <CheckCircle size={18} /> : i + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-text-primary truncate">{lesson.title}</h3>
                    {lesson.free && (
                      <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-success/15 text-success border border-success/30">
                        FREE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 truncate">{lesson.desc}</p>
                </div>

                {/* Duration & Arrow */}
                <div className="shrink-0 flex items-center gap-3 text-text-muted">
                  <div className="hidden sm:flex items-center gap-1 text-xs">
                    <Clock size={12} />
                    {lesson.duration}
                  </div>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </MouseTrackCard>
            </Link>
          ))}

          {level.lessons.length === 0 && (
            <div className="glass-card p-12 text-center">
              <Lock size={40} className="mx-auto text-text-muted mb-4" />
              <h3 className="text-lg font-bold text-text-primary mb-2">Coming Soon</h3>
              <p className="text-text-secondary text-sm">Lessons for {level.name} level are being prepared.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
