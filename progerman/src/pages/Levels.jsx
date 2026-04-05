import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { BookOpen, Award, Lock, ChevronRight, CheckCircle } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'

const levels = [
  {
    id: 'a1', label: 'A1', name: 'Beginner', color: '#22c55e',
    desc: 'Start your German journey. Learn greetings, numbers, basic grammar, and everyday expressions.',
    lessons: 45, completed: 12, unlocked: true,
    topics: ['Greetings', 'Numbers', 'Family', 'Food & Drink', 'Daily Routine'],
  },
  {
    id: 'a2', label: 'A2', name: 'Elementary', color: '#3b82f6',
    desc: 'Build on basics. Handle everyday situations, describe your environment, and use past tense.',
    lessons: 50, completed: 0, unlocked: true,
    topics: ['Shopping', 'Travel', 'Health', 'Past Tense', 'Directions'],
  },
  {
    id: 'b1', label: 'B1', name: 'Intermediate', color: '#f97316',
    desc: 'Express opinions, understand main points of clear texts, and handle most travel situations.',
    lessons: 55, completed: 0, unlocked: false,
    topics: ['Work & Career', 'Media', 'Konjunktiv II', 'Passive Voice', 'Relative Clauses'],
  },
  {
    id: 'b2', label: 'B2', name: 'Upper Intermediate', color: '#a855f7',
    desc: 'Understand complex texts, interact fluently with native speakers, and produce detailed arguments.',
    lessons: 55, completed: 0, unlocked: false,
    topics: ['Politics', 'Science', 'Subjunctive', 'Academic Writing', 'Debate'],
  },
  {
    id: 'c1', label: 'C1', name: 'Advanced', color: '#ef4444',
    desc: 'Understand demanding texts, express yourself fluently for academic and professional purposes.',
    lessons: 50, completed: 0, unlocked: false,
    topics: ['Literature', 'Philosophy', 'Advanced Grammar', 'Idiomatic Expressions', 'Formal Writing'],
  },
  {
    id: 'c2', label: 'C2', name: 'Mastery', color: '#eab308',
    desc: 'Understand virtually everything. Summarize and reconstruct arguments from multiple sources.',
    lessons: 45, completed: 0, unlocked: false,
    topics: ['Nuanced Expression', 'Academic Discourse', 'Native-level Idioms', 'Complex Argumentation'],
  },
]

export default function Levels() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.level-item', {
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.2,
      })
      gsap.from('.levels-title', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <Navbar />
      <div ref={ref} className="page-content max-w-4xl mx-auto sm:px-6">
        <div className="levels-title mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Choose your <span className="gradient-text-accent">Level</span>
          </h1>
          <p className="text-text-secondary">Follow the CEFR path from beginner to mastery</p>
        </div>

        {/* Level Path */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border-glass hidden sm:block" />

          <div className="space-y-5">
            {levels.map((level, i) => {
              const progress = level.completed > 0 ? Math.round((level.completed / level.lessons) * 100) : 0

              return (
                <MouseTrackCard
                  key={level.id}
                  className={`level-item p-6 sm:p-7 relative ${!level.unlocked ? 'opacity-60' : ''}`}
                  glowColor={`${level.color}20`}
                >
                  <Link
                    to={level.unlocked ? `/levels/${level.id}/lessons` : '#'}
                    className={`block ${!level.unlocked ? 'pointer-events-none' : ''}`}
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      {/* Level Badge */}
                      <div
                        className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-extrabold relative"
                        style={{ background: `${level.color}15`, border: `2px solid ${level.color}40`, color: level.color }}
                      >
                        {level.unlocked ? level.label : <Lock size={24} />}
                        {level.completed === level.lessons && (
                          <CheckCircle size={20} className="absolute -top-1 -right-1 text-success bg-bg-primary rounded-full" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-xl font-bold" style={{ color: level.unlocked ? level.color : undefined }}>
                            {level.name}
                          </h3>
                          {level.unlocked && (
                            <ChevronRight size={20} className="text-text-muted shrink-0" />
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mb-3">{level.desc}</p>

                        {/* Topic tags */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {level.topics.slice(0, 4).map((topic) => (
                            <span
                              key={topic}
                              className="text-xs px-2.5 py-1 rounded-lg border"
                              style={{ borderColor: `${level.color}30`, color: `${level.color}cc`, background: `${level.color}08` }}
                            >
                              {topic}
                            </span>
                          ))}
                          {level.topics.length > 4 && (
                            <span className="text-xs px-2.5 py-1 rounded-lg text-text-muted">
                              +{level.topics.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Progress */}
                        <div className="flex items-center gap-4 text-xs text-text-muted">
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={14} />
                            <span>{level.completed}/{level.lessons} lessons</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Award size={14} />
                            <span>Goethe {level.label}</span>
                          </div>
                          {progress > 0 && (
                            <div className="flex-1 max-w-[120px]">
                              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div
                                  className="h-full rounded-full"
                                  style={{ width: `${progress}%`, background: level.color }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </MouseTrackCard>
              )
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
