import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { Flame, BookOpen, Brain, Award, ChevronRight, Clock, TrendingUp, Target, Volume2 } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'
import OwlMascot from '../components/OwlMascot'

const recentLessons = [
  { id: 1, title: 'Greetings & Introductions', level: 'A1', progress: 75, color: '#22c55e' },
  { id: 2, title: 'Artikel: der, die, das', level: 'A1', progress: 40, color: '#22c55e' },
  { id: 3, title: 'Present Tense (Präsens)', level: 'A1', progress: 10, color: '#22c55e' },
]

const quickActions = [
  { icon: BookOpen, label: 'Vocabulary', desc: 'Practice flashcards', path: '/vocabulary', color: '#3b82f6' },
  { icon: Brain, label: 'Grammar', desc: 'Review rules', path: '/grammar', color: '#a855f7' },
  { icon: Volume2, label: 'Listening', desc: 'Audio exercises', path: '/levels', color: '#22c55e' },
  { icon: Award, label: 'Goethe Prep', desc: 'Mock exams', path: '/levels', color: '#f97316' },
]

export default function Dashboard() {
  const dashRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dash-card', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
      })

      // Animate progress rings
      gsap.from('.progress-ring-fill', {
        strokeDashoffset: 283,
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5,
      })

      // Animate streak number
      gsap.from('.streak-number', {
        textContent: 0,
        duration: 1,
        ease: 'power1.out',
        snap: { textContent: 1 },
        delay: 0.5,
      })
    }, dashRef)

    return () => ctx.revert()
  }, [])

  const dailyProgress = 65
  const circumference = 2 * Math.PI * 45
  const dashoffset = circumference - (dailyProgress / 100) * circumference

  return (
    <PageTransition>
      <Navbar />
      <div ref={dashRef} className="page-content max-w-6xl mx-auto sm:px-6">
        {/* Welcome Header */}
        <div className="dash-card flex items-center gap-4 mb-8">
          <OwlMascot size={50} mood="happy" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Guten Tag, <span className="gradient-text-accent">Learner</span>!
            </h1>
            <p className="text-text-secondary text-sm sm:text-base">Let's continue mastering German today.</p>
          </div>
        </div>

        {/* Top Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Daily Goal */}
          <MouseTrackCard className="dash-card p-5 sm:p-6 flex flex-col items-center text-center" glowColor="rgba(99, 102, 241, 0.15)">
            <div className="relative w-24 h-24 mb-3">
              <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="45"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashoffset}
                  className="progress-ring-fill"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-extrabold text-accent">{dailyProgress}%</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-text-primary">Daily Goal</p>
            <p className="text-xs text-text-muted">13/20 XP earned</p>
          </MouseTrackCard>

          {/* Streak */}
          <MouseTrackCard className="dash-card p-5 sm:p-6 flex flex-col items-center text-center" glowColor="rgba(249, 115, 22, 0.15)">
            <div className="w-16 h-16 rounded-2xl bg-warning/10 border border-warning/20 flex items-center justify-center mb-3">
              <Flame size={28} className="text-warning" />
            </div>
            <span className="streak-number text-3xl font-extrabold text-warning">12</span>
            <p className="text-sm font-semibold text-text-primary">Day Streak</p>
            <p className="text-xs text-text-muted">Keep it going!</p>
          </MouseTrackCard>

          {/* Words Learned */}
          <MouseTrackCard className="dash-card p-5 sm:p-6 flex flex-col items-center text-center" glowColor="rgba(34, 197, 94, 0.15)">
            <div className="w-16 h-16 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center mb-3">
              <TrendingUp size={28} className="text-success" />
            </div>
            <span className="text-3xl font-extrabold text-success">247</span>
            <p className="text-sm font-semibold text-text-primary">Words Learned</p>
            <p className="text-xs text-text-muted">+12 this week</p>
          </MouseTrackCard>

          {/* Current Level */}
          <MouseTrackCard className="dash-card p-5 sm:p-6 flex flex-col items-center text-center" glowColor="rgba(34, 197, 94, 0.15)">
            <div className="w-16 h-16 rounded-2xl bg-level-a1/10 border border-level-a1/20 flex items-center justify-center mb-3">
              <span className="text-xl font-extrabold text-level-a1">A1</span>
            </div>
            <p className="text-sm font-semibold text-text-primary">Current Level</p>
            <div className="w-full mt-2 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-level-a1 rounded-full" style={{ width: '35%' }} />
            </div>
            <p className="text-xs text-text-muted mt-1">35% complete</p>
          </MouseTrackCard>
        </div>

        {/* Continue Learning */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold dash-card">Continue Learning</h2>
            <Link to="/levels" className="dash-card text-sm text-accent hover:text-accent-hover transition-colors flex items-center gap-1">
              View all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentLessons.map((lesson) => (
              <MouseTrackCard
                key={lesson.id}
                className="dash-card p-5 group cursor-pointer"
                glowColor={`${lesson.color}20`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{ color: lesson.color, background: `${lesson.color}15`, border: `1px solid ${lesson.color}30` }}
                  >
                    {lesson.level}
                  </span>
                  <ChevronRight size={18} className="text-text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-text-primary mb-3">{lesson.title}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${lesson.progress}%`, background: lesson.color }}
                    />
                  </div>
                  <span className="text-xs text-text-muted font-medium">{lesson.progress}%</span>
                </div>
              </MouseTrackCard>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-bold mb-4 dash-card">Quick Practice</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <Link key={i} to={action.path}>
                <MouseTrackCard
                  className="dash-card p-5 group cursor-pointer text-center"
                  glowColor={`${action.color}20`}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${action.color}15`, border: `1px solid ${action.color}30` }}
                  >
                    <action.icon size={24} style={{ color: action.color }} />
                  </div>
                  <h3 className="font-bold text-sm text-text-primary">{action.label}</h3>
                  <p className="text-xs text-text-muted mt-1">{action.desc}</p>
                </MouseTrackCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
