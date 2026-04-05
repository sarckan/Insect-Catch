import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BookOpen, Brain, Mic, Award, Globe, Users, Zap, GraduationCap, Star, ChevronRight, Check, Headphones, PenTool, MessageSquare } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'
import OwlMascot from '../components/OwlMascot'

gsap.registerPlugin(ScrollTrigger)

const levels = [
  { id: 'a1', label: 'A1', name: 'Beginner', color: '#22c55e', desc: 'Start your German journey with basics' },
  { id: 'a2', label: 'A2', name: 'Elementary', color: '#3b82f6', desc: 'Build everyday conversation skills' },
  { id: 'b1', label: 'B1', name: 'Intermediate', color: '#f97316', desc: 'Express yourself with confidence' },
  { id: 'b2', label: 'B2', name: 'Upper Intermediate', color: '#a855f7', desc: 'Handle complex topics fluently' },
  { id: 'c1', label: 'C1', name: 'Advanced', color: '#ef4444', desc: 'Near-native proficiency' },
  { id: 'c2', label: 'C2', name: 'Mastery', color: '#eab308', desc: 'Complete mastery of German' },
]

const features = [
  { icon: BookOpen, title: 'Structured Lessons', desc: 'Curriculum aligned with Goethe exam standards from A1 to C2', color: '#6366f1' },
  { icon: Brain, title: 'Spaced Repetition', desc: 'Smart algorithm ensures you never forget what you learn', color: '#a855f7' },
  { icon: Mic, title: 'Pronunciation', desc: 'Record your voice and get feedback from native teachers', color: '#22c55e' },
  { icon: GraduationCap, title: 'Goethe Exam Prep', desc: 'Mock tests and exercises in real exam format', color: '#f97316' },
  { icon: Headphones, title: 'Listening Practice', desc: 'Train your ear with native speaker audio', color: '#3b82f6' },
  { icon: PenTool, title: 'Writing Exercises', desc: 'Practice writing with AI-powered feedback', color: '#ef4444' },
  { icon: MessageSquare, title: 'Grammar Deep Dive', desc: 'Master every grammar rule with interactive exercises', color: '#eab308' },
  { icon: Globe, title: 'Multilingual Support', desc: 'Learn in English, Turkish, Russian, and more', color: '#06b6d4' },
]

const pricingTiers = [
  {
    name: 'Basic',
    price: '9.99',
    period: '/month',
    desc: 'Essential learning tools',
    features: ['All lessons & exercises', 'Spaced repetition', 'Grammar reference', 'Progress tracking', 'Text-to-speech'],
    color: '#3b82f6',
    popular: false,
  },
  {
    name: 'Medium',
    price: '19.99',
    period: '/month',
    desc: 'Enhanced learning experience',
    features: ['Everything in Basic', 'Pronunciation review by teachers', 'Goethe exam mock tests', 'Video lessons + PDFs', 'Priority support'],
    color: '#a855f7',
    popular: true,
  },
  {
    name: 'Pro',
    price: '39.99',
    period: '/month',
    desc: 'Full immersion with teacher support',
    features: ['Everything in Medium', 'Live video sessions with teachers', '1-on-1 pronunciation coaching', 'Custom study plans', 'Classroom features'],
    color: '#eab308',
    popular: false,
  },
]

export default function Landing() {
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const levelsRef = useRef(null)
  const pricingRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation - letter by letter
      const heroTitle = heroRef.current?.querySelector('.hero-title')
      if (heroTitle) {
        const text = heroTitle.textContent
        heroTitle.textContent = ''
        text.split('').forEach((char) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.display = 'inline-block'
          span.style.opacity = '0'
          heroTitle.appendChild(span)
        })
        gsap.to(heroTitle.children, {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
        })
        gsap.from(heroTitle.children, {
          y: 30,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.3,
        })
      }

      // Hero subtitle and CTA
      gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.8,
      })
      gsap.from('.hero-cta', {
        opacity: 0,
        y: 20,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)',
        delay: 1.0,
      })
      gsap.from('.hero-mascot', {
        opacity: 0,
        scale: 0,
        rotation: -20,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.5,
      })

      // Stats counter animation
      gsap.from('.stat-number', {
        textContent: 0,
        duration: 2,
        ease: 'power1.out',
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
      })

      // Features stagger
      gsap.from('.feature-card', {
        opacity: 0,
        y: 40,
        scale: 0.95,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 75%',
        },
      })

      // Section titles
      gsap.utils.toArray('.section-title').forEach((title) => {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
          },
        })
      })

      // Levels cards
      gsap.from('.level-card', {
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: levelsRef.current,
          start: 'top 75%',
        },
      })

      // Pricing cards
      gsap.from('.pricing-card', {
        opacity: 0,
        y: 50,
        stagger: 0.15,
        duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: pricingRef.current,
          start: 'top 75%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <PageTransition>
      <Navbar transparent />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-gradient-animated overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-level-b2/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
          <div className="hero-mascot inline-block mb-6">
            <OwlMascot size={100} mood="happy" />
          </div>

          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Master German
          </h1>

          <p className="hero-subtitle text-lg sm:text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            From <span className="text-level-a1 font-semibold">A1</span> to <span className="text-level-c2 font-semibold">C2</span>.
            Interactive lessons, Goethe exam prep, and native teacher support —
            all in one beautifully designed platform.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="group px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] flex items-center gap-2"
            >
              Start Learning Free
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 text-text-secondary hover:text-text-primary font-semibold text-lg rounded-full border border-border-glass hover:border-border-glass-hover transition-all duration-300 hover:bg-white/5"
            >
              Sign In
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-text-muted text-sm">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-level-c2" />
              <span>Goethe Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-accent" />
              <span>10,000+ Learners</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-level-a1" />
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-bounce">
          <span className="text-xs">Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-text-muted rounded-full flex justify-center pt-1">
            <div className="w-1 h-2 bg-text-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 sm:py-20 border-y border-border-glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {[
            { number: '6', label: 'CEFR Levels', suffix: '' },
            { number: '500', label: 'Lessons', suffix: '+' },
            { number: '10000', label: 'Vocabulary', suffix: '+' },
            { number: '50', label: 'Native Teachers', suffix: '+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold gradient-text-accent">
                <span className="stat-number">{stat.number}</span>{stat.suffix}
              </div>
              <div className="text-text-muted text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Everything you need to <span className="gradient-text-accent">master German</span>
            </h2>
            <p className="section-title text-text-secondary text-lg max-w-2xl mx-auto">
              A complete learning ecosystem designed for serious learners
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {features.map((feature, i) => (
              <MouseTrackCard
                key={i}
                className="feature-card p-6 sm:p-7"
                glowColor={`${feature.color}20`}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                >
                  <feature.icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">{feature.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
              </MouseTrackCard>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section ref={levelsRef} id="levels" className="py-20 sm:py-28 border-t border-border-glass">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Your path from <span className="text-level-a1">A1</span> to <span className="text-level-c2">C2</span>
            </h2>
            <p className="section-title text-text-secondary text-lg max-w-2xl mx-auto">
              Structured curriculum aligned with CEFR and Goethe Institute standards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {levels.map((level, i) => (
              <MouseTrackCard
                key={level.id}
                className="level-card p-6 sm:p-7 group cursor-pointer"
                glowColor={`${level.color}20`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="text-2xl font-extrabold px-4 py-1.5 rounded-xl"
                    style={{ color: level.color, background: `${level.color}15`, border: `1px solid ${level.color}30` }}
                  >
                    {level.label}
                  </div>
                  <ChevronRight
                    size={20}
                    className="text-text-muted group-hover:text-text-primary group-hover:translate-x-1 transition-all"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: level.color }}>{level.name}</h3>
                <p className="text-sm text-text-secondary">{level.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-text-muted">
                  <BookOpen size={14} />
                  <span>40+ Lessons</span>
                  <span className="mx-1">·</span>
                  <Award size={14} />
                  <span>Goethe Prep</span>
                </div>
              </MouseTrackCard>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} id="pricing" className="py-20 sm:py-28 border-t border-border-glass">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Simple, transparent <span className="gradient-text-accent">pricing</span>
            </h2>
            <p className="section-title text-text-secondary text-lg max-w-2xl mx-auto">
              Start with 3 free lessons per level. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {pricingTiers.map((tier, i) => (
              <MouseTrackCard
                key={i}
                className={`pricing-card p-7 sm:p-8 relative ${tier.popular ? 'ring-2 ring-accent' : ''}`}
                glowColor={`${tier.color}20`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1" style={{ color: tier.color }}>{tier.name}</h3>
                <p className="text-sm text-text-muted mb-4">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-text-primary">${tier.price}</span>
                  <span className="text-text-muted text-sm">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-text-secondary">
                      <Check size={16} style={{ color: tier.color }} className="shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? 'bg-accent text-white hover:bg-accent-hover hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
                      : 'border border-border-glass text-text-primary hover:bg-white/5 hover:border-border-glass-hover'
                  }`}
                >
                  Get Started
                </Link>
              </MouseTrackCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28 border-t border-border-glass">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <OwlMascot size={80} mood="happy" />
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mt-6 mb-4">
            Ready to start your <span className="gradient-text-accent">German journey</span>?
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            Join thousands of learners mastering German with ProGerman. Your first 3 lessons are completely free.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)]"
          >
            Start Learning Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-glass py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <OwlMascot size={28} animate={false} />
                <span className="font-bold text-text-primary">ProGerman</span>
              </div>
              <p className="text-sm text-text-muted">Master German from A1 to C2 with expert guidance.</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Learn</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><Link to="/levels" className="hover:text-text-primary transition-colors">All Levels</Link></li>
                <li><Link to="/vocabulary" className="hover:text-text-primary transition-colors">Vocabulary</Link></li>
                <li><Link to="/grammar" className="hover:text-text-primary transition-colors">Grammar</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition-colors">Goethe Exam Guide</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-text-muted">
                <li><a href="#" className="hover:text-text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-text-primary transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border-glass text-center text-sm text-text-muted">
            &copy; 2026 ProGerman. All rights reserved.
          </div>
        </div>
      </footer>
    </PageTransition>
  )
}
