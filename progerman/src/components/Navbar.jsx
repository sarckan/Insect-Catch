import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import OwlMascot from './OwlMascot'

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo('.nav-item',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power2.out', delay: 0.2 }
    )
  }, [])

  const navBg = scrolled || !transparent
    ? 'bg-bg-primary/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
    : 'bg-transparent'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 nav-item">
            <OwlMascot size={36} />
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
              <span className="text-text-primary">Pro</span>
              <span className="gradient-text-accent">German</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {isLanding ? (
              <>
                <a href="#features" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Features
                </a>
                <a href="#levels" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Levels
                </a>
                <a href="#pricing" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Pricing
                </a>
                <Link to="/login" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="nav-item ml-2 px-6 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                >
                  Get Started Free
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Dashboard
                </Link>
                <Link to="/levels" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Levels
                </Link>
                <Link to="/vocabulary" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Vocabulary
                </Link>
                <Link to="/grammar" className="nav-item px-5 py-2 text-sm tracking-wide text-text-secondary hover:text-text-primary transition-colors rounded-full hover:bg-white/5">
                  Grammar
                </Link>
                <Link to="/profile" className="nav-item ml-2 w-9 h-9 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-sm font-bold text-accent hover:bg-accent/30 transition-colors">
                  S
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-primary/95 backdrop-blur-xl border-b border-border-glass">
          <div className="px-4 py-4 space-y-2">
            {isLanding ? (
              <>
                <a href="#features" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Features</a>
                <a href="#levels" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Levels</a>
                <a href="#pricing" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Pricing</a>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Sign In</Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-center font-semibold text-white bg-accent rounded-xl">Get Started Free</Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Dashboard</Link>
                <Link to="/levels" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Levels</Link>
                <Link to="/vocabulary" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Vocabulary</Link>
                <Link to="/grammar" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Grammar</Link>
                <Link to="/profile" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/5 transition-colors">Profile</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
