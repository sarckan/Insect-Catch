import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { User, Mail, Globe, Award, Flame, BookOpen, Brain, Clock, ChevronRight, Settings, LogOut } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'
import OwlMascot from '../components/OwlMascot'

const achievements = [
  { icon: '🔥', title: 'Week Warrior', desc: '7-day streak', unlocked: true },
  { icon: '📚', title: 'Bookworm', desc: '50 lessons completed', unlocked: true },
  { icon: '🎯', title: 'Sharpshooter', desc: '100% on a quiz', unlocked: true },
  { icon: '💪', title: 'A1 Master', desc: 'Complete A1 level', unlocked: false },
  { icon: '🏆', title: 'Goethe Ready', desc: 'Pass mock exam', unlocked: false },
  { icon: '🌟', title: 'Vocab King', desc: 'Learn 500 words', unlocked: false },
]

const weeklyActivity = [
  { day: 'Mon', xp: 45 },
  { day: 'Tue', xp: 30 },
  { day: 'Wed', xp: 60 },
  { day: 'Thu', xp: 20 },
  { day: 'Fri', xp: 55 },
  { day: 'Sat', xp: 40 },
  { day: 'Sun', xp: 0 },
]

const maxXp = Math.max(...weeklyActivity.map((d) => d.xp))

export default function Profile() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.profile-card', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.2,
      })

      // Animate bars
      gsap.from('.activity-bar', {
        scaleY: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
        transformOrigin: 'bottom',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <Navbar />
      <div ref={ref} className="page-content max-w-4xl mx-auto sm:px-6">
        {/* Profile Header */}
        <MouseTrackCard className="profile-card p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-3xl bg-accent/15 border-2 border-accent/30 flex items-center justify-center">
              <OwlMascot size={60} animate={false} />
            </div>
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight mb-1">Student User</h1>
              <p className="text-text-secondary text-sm mb-3">Learning German since January 2026</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-text-muted">
                <div className="flex items-center gap-1.5">
                  <Mail size={14} /> user@example.com
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={14} /> English
                </div>
              </div>
            </div>
            <button className="p-2.5 rounded-xl border border-border-glass text-text-muted hover:text-text-primary hover:bg-white/5 transition-all">
              <Settings size={20} />
            </button>
          </div>
        </MouseTrackCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Flame, label: 'Streak', value: '12 days', color: '#f97316' },
            { icon: BookOpen, label: 'Lessons', value: '34', color: '#3b82f6' },
            { icon: Brain, label: 'Words', value: '247', color: '#a855f7' },
            { icon: Clock, label: 'Study Time', value: '18h 30m', color: '#22c55e' },
          ].map((stat, i) => (
            <MouseTrackCard key={i} className="profile-card p-5 text-center" glowColor={`${stat.color}15`}>
              <stat.icon size={22} className="mx-auto mb-2" style={{ color: stat.color }} />
              <div className="text-xl font-extrabold text-text-primary">{stat.value}</div>
              <div className="text-xs text-text-muted mt-1">{stat.label}</div>
            </MouseTrackCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity */}
          <MouseTrackCard className="profile-card p-6">
            <h3 className="font-bold text-text-primary mb-4">Weekly Activity</h3>
            <div className="flex items-end justify-between gap-2 h-32">
              {weeklyActivity.map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-full flex justify-center">
                    <div
                      className="activity-bar w-8 rounded-lg"
                      style={{
                        height: `${Math.max(8, (day.xp / maxXp) * 100)}%`,
                        background: day.xp > 0 ? 'linear-gradient(to top, #6366f1, #a855f7)' : 'rgba(255,255,255,0.05)',
                        minHeight: '8px',
                      }}
                    />
                  </div>
                  <span className="text-xs text-text-muted">{day.day}</span>
                </div>
              ))}
            </div>
          </MouseTrackCard>

          {/* Level Progress */}
          <MouseTrackCard className="profile-card p-6">
            <h3 className="font-bold text-text-primary mb-4">Level Progress</h3>
            <div className="space-y-4">
              {[
                { label: 'A1', progress: 35, color: '#22c55e' },
                { label: 'A2', progress: 0, color: '#3b82f6' },
                { label: 'B1', progress: 0, color: '#f97316' },
              ].map((level) => (
                <div key={level.label}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-bold" style={{ color: level.color }}>{level.label}</span>
                    <span className="text-text-muted">{level.progress}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${level.progress}%`, background: level.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </MouseTrackCard>
        </div>

        {/* Achievements */}
        <div className="mt-6">
          <h3 className="font-bold text-text-primary mb-4 profile-card">Achievements</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <MouseTrackCard
                key={i}
                className={`profile-card p-4 text-center ${!a.unlocked ? 'opacity-40' : ''}`}
              >
                <span className="text-3xl mb-2 block">{a.icon}</span>
                <h4 className="font-bold text-sm text-text-primary">{a.title}</h4>
                <p className="text-xs text-text-muted mt-0.5">{a.desc}</p>
              </MouseTrackCard>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 text-sm text-text-muted hover:text-error border border-border-glass rounded-xl hover:border-error/30 hover:bg-error/5 transition-all"
          >
            <LogOut size={16} />
            Sign Out
          </Link>
        </div>
      </div>
    </PageTransition>
  )
}
