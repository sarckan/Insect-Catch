import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'

const categories = ['All', 'Greetings', 'Family', 'Food', 'Travel', 'Numbers', 'Colors', 'Body', 'Professions']

const vocabData = [
  { word: 'der Hund', article: 'der', translation: 'dog', category: 'Animals', example: 'Der Hund ist groß.', gender: 'masculine' },
  { word: 'die Katze', article: 'die', translation: 'cat', category: 'Animals', example: 'Die Katze schläft.', gender: 'feminine' },
  { word: 'das Haus', article: 'das', translation: 'house', category: 'Home', example: 'Das Haus ist schön.', gender: 'neuter' },
  { word: 'die Familie', article: 'die', translation: 'family', category: 'Family', example: 'Meine Familie ist groß.', gender: 'feminine' },
  { word: 'der Vater', article: 'der', translation: 'father', category: 'Family', example: 'Mein Vater arbeitet.', gender: 'masculine' },
  { word: 'die Mutter', article: 'die', translation: 'mother', category: 'Family', example: 'Meine Mutter kocht.', gender: 'feminine' },
  { word: 'das Brot', article: 'das', translation: 'bread', category: 'Food', example: 'Ich esse Brot.', gender: 'neuter' },
  { word: 'der Kaffee', article: 'der', translation: 'coffee', category: 'Food', example: 'Ich trinke Kaffee.', gender: 'masculine' },
  { word: 'die Schule', article: 'die', translation: 'school', category: 'Education', example: 'Ich gehe zur Schule.', gender: 'feminine' },
  { word: 'das Buch', article: 'das', translation: 'book', category: 'Education', example: 'Das Buch ist interessant.', gender: 'neuter' },
  { word: 'sprechen', article: '', translation: 'to speak', category: 'Verbs', example: 'Ich spreche Deutsch.', gender: 'verb' },
  { word: 'lernen', article: '', translation: 'to learn', category: 'Verbs', example: 'Wir lernen Deutsch.', gender: 'verb' },
]

const genderColors = {
  masculine: { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6', label: 'der' },
  feminine: { bg: 'rgba(239, 68, 68, 0.1)', border: 'rgba(239, 68, 68, 0.3)', text: '#ef4444', label: 'die' },
  neuter: { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e', label: 'das' },
  verb: { bg: 'rgba(168, 85, 247, 0.1)', border: 'rgba(168, 85, 247, 0.3)', text: '#a855f7', label: 'verb' },
}

export default function Vocabulary() {
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [search, setSearch] = useState('')
  const [view, setView] = useState('cards') // 'cards' | 'list'
  const cardRef = useRef(null)
  const ref = useRef(null)

  const filteredVocab = vocabData.filter((v) =>
    v.word.toLowerCase().includes(search.toLowerCase()) ||
    v.translation.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.vocab-header', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      gsap.from('.vocab-content', { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out', delay: 0.2 })
    }, ref)
    return () => ctx.revert()
  }, [])

  const flipCard = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateY: flipped ? 0 : 180,
        duration: 0.6,
        ease: 'power2.inOut',
      })
    }
    setFlipped(!flipped)
  }

  const nextCard = () => {
    if (flipped) flipCard()
    setTimeout(() => {
      setCurrentCard((c) => (c + 1) % filteredVocab.length)
      gsap.fromTo(cardRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }, flipped ? 300 : 0)
  }

  const prevCard = () => {
    if (flipped) flipCard()
    setTimeout(() => {
      setCurrentCard((c) => (c - 1 + filteredVocab.length) % filteredVocab.length)
      gsap.fromTo(cardRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    }, flipped ? 300 : 0)
  }

  const speak = (text) => {
    const u = new SpeechSynthesisUtterance(text)
    u.lang = 'de-DE'
    u.rate = 0.85
    speechSynthesis.speak(u)
  }

  const card = filteredVocab[currentCard] || vocabData[0]
  const gc = genderColors[card.gender]

  return (
    <PageTransition>
      <Navbar />
      <div ref={ref} className="page-content max-w-4xl mx-auto sm:px-6">
        <div className="vocab-header mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            <span className="gradient-text-accent">Vocabulary</span>
          </h1>
          <p className="text-text-secondary">Master German words with flashcards and spaced repetition</p>
        </div>

        {/* Controls */}
        <div className="vocab-content flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentCard(0) }}
              placeholder="Search words..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-border-glass rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('cards')}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${view === 'cards' ? 'bg-accent text-white' : 'border border-border-glass text-text-secondary hover:bg-white/5'}`}
            >
              Flashcards
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${view === 'list' ? 'bg-accent text-white' : 'border border-border-glass text-text-secondary hover:bg-white/5'}`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Gender Legend */}
        <div className="vocab-content flex flex-wrap gap-3 mb-8">
          {Object.entries(genderColors).map(([key, val]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ background: val.text }} />
              <span className="text-text-muted font-medium">{val.label} <span className="capitalize">({key})</span></span>
            </div>
          ))}
        </div>

        {view === 'cards' ? (
          /* Flashcard View */
          <div className="flex flex-col items-center">
            <div
              ref={cardRef}
              onClick={flipCard}
              className="w-full max-w-md h-72 sm:h-80 cursor-pointer"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Front */}
              <div
                className="absolute inset-0 rounded-[28px] p-8 flex flex-col items-center justify-center border"
                style={{
                  background: gc.bg,
                  borderColor: gc.border,
                  backfaceVisibility: 'hidden',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <span className="text-xs font-bold px-3 py-1 rounded-lg mb-4" style={{ color: gc.text, background: `${gc.text}20`, border: `1px solid ${gc.border}` }}>
                  {gc.label}
                </span>
                <button onClick={(e) => { e.stopPropagation(); speak(card.word) }} className="mb-3 text-text-muted hover:text-accent transition-colors">
                  <Volume2 size={22} />
                </button>
                <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: gc.text }}>
                  {card.word}
                </h2>
                <p className="text-sm text-text-muted mt-4">Tap to flip</p>
              </div>

              {/* Back */}
              <div
                className="absolute inset-0 rounded-[28px] p-8 flex flex-col items-center justify-center border"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  borderColor: 'rgba(255,255,255,0.08)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4">
                  {card.translation}
                </h2>
                <div className="glass-card p-4 text-center">
                  <p className="text-sm italic text-text-secondary">"{card.example}"</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-6 mt-8">
              <button onClick={prevCard} className="w-12 h-12 rounded-full border border-border-glass flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all">
                <ChevronLeft size={20} />
              </button>
              <span className="text-text-muted text-sm font-medium">
                {currentCard + 1} / {filteredVocab.length}
              </span>
              <button onClick={nextCard} className="w-12 h-12 rounded-full border border-border-glass flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/5 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filteredVocab.map((vocab, i) => {
              const g = genderColors[vocab.gender]
              return (
                <div
                  key={i}
                  className="glass-card p-4 flex items-center gap-4 group cursor-pointer"
                  onClick={() => speak(vocab.word)}
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold"
                    style={{ background: g.bg, border: `1px solid ${g.border}`, color: g.text }}
                  >
                    {g.label}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text-primary text-sm">{vocab.word}</h3>
                    <p className="text-xs text-text-muted">{vocab.translation}</p>
                  </div>
                  <Volume2 size={16} className="text-text-muted group-hover:text-accent transition-colors shrink-0" />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
