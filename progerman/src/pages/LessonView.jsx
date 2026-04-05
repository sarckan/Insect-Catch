import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import gsap from 'gsap'
import { ChevronLeft, ChevronRight, Volume2, Check, X, RotateCcw, Award } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import OwlMascot from '../components/OwlMascot'

const lessonContent = {
  'a1-1': {
    title: 'Greetings & Introductions',
    level: 'A1',
    color: '#22c55e',
    exercises: [
      {
        type: 'vocab',
        word: 'Hallo',
        translation: 'Hello',
        example: 'Hallo, wie geht es Ihnen?',
        exampleTranslation: 'Hello, how are you?',
      },
      {
        type: 'vocab',
        word: 'Guten Morgen',
        translation: 'Good morning',
        example: 'Guten Morgen! Schönes Wetter heute.',
        exampleTranslation: 'Good morning! Nice weather today.',
      },
      {
        type: 'vocab',
        word: 'Auf Wiedersehen',
        translation: 'Goodbye',
        example: 'Auf Wiedersehen! Bis morgen!',
        exampleTranslation: 'Goodbye! See you tomorrow!',
      },
      {
        type: 'quiz',
        question: 'How do you say "Good evening" in German?',
        options: ['Guten Morgen', 'Guten Abend', 'Gute Nacht', 'Guten Tag'],
        correct: 1,
      },
      {
        type: 'quiz',
        question: 'What does "Wie heißen Sie?" mean?',
        options: ['How are you?', 'Where are you from?', 'What is your name?', 'How old are you?'],
        correct: 2,
      },
      {
        type: 'fillblank',
        sentence: 'Ich ___ Max.',
        answer: 'heiße',
        hint: 'I am called Max.',
      },
      {
        type: 'quiz',
        question: 'Complete: "Mein Name ___ Anna."',
        options: ['bin', 'ist', 'hat', 'heißt'],
        correct: 1,
      },
    ],
  },
}

// Fallback content
const defaultLesson = lessonContent['a1-1']

export default function LessonView() {
  const { lessonId } = useParams()
  const lesson = lessonContent[lessonId] || defaultLesson
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [fillAnswer, setFillAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const cardRef = useRef(null)

  const exercise = lesson.exercises[currentIndex]
  const progress = ((currentIndex + 1) / lesson.exercises.length) * 100

  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { opacity: 0, x: 30, scale: 0.97 },
      { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
    )
  }, [currentIndex])

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'de-DE'
    utterance.rate = 0.85
    speechSynthesis.speak(utterance)
  }

  const checkAnswer = () => {
    setShowResult(true)
    if (exercise.type === 'quiz' && selectedAnswer === exercise.correct) {
      setScore((s) => s + 1)
    } else if (exercise.type === 'fillblank' && fillAnswer.trim().toLowerCase() === exercise.answer.toLowerCase()) {
      setScore((s) => s + 1)
    }
  }

  const nextExercise = () => {
    if (currentIndex < lesson.exercises.length - 1) {
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
      setFillAnswer('')
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const isCorrect =
    exercise.type === 'quiz'
      ? selectedAnswer === exercise.correct
      : exercise.type === 'fillblank'
        ? fillAnswer.trim().toLowerCase() === exercise.answer.toLowerCase()
        : true

  if (finished) {
    const total = lesson.exercises.filter((e) => e.type !== 'vocab').length
    return (
      <PageTransition>
        <Navbar />
        <div className="page-content max-w-lg mx-auto sm:px-6 text-center">
          <OwlMascot size={100} mood="happy" />
          <h1 className="text-3xl font-extrabold mt-6 mb-2">
            {score >= total * 0.7 ? 'Ausgezeichnet!' : 'Gut gemacht!'}
          </h1>
          <p className="text-text-secondary mb-6">
            You scored {score}/{total} on this lesson
          </p>
          <div className="glass-card p-6 mb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award size={24} className="text-level-c2" />
              <span className="text-2xl font-extrabold text-level-c2">+{score * 10} XP</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full transition-all duration-1000"
                style={{ width: `${(score / total) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setCurrentIndex(0); setScore(0); setFinished(false); setSelectedAnswer(null); setFillAnswer(''); setShowResult(false) }}
              className="px-6 py-3 border border-border-glass rounded-xl text-text-secondary hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <RotateCcw size={16} /> Retry
            </button>
            <Link
              to="/levels/a1/lessons"
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all flex items-center gap-2"
            >
              Next Lesson <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <Navbar />
      <div className="page-content max-w-2xl mx-auto sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to={`/levels/a1/lessons`} className="flex items-center gap-1 text-sm text-text-muted hover:text-text-primary transition-colors">
            <ChevronLeft size={16} /> Back
          </Link>
          <span className="text-sm text-text-muted">{currentIndex + 1}/{lesson.exercises.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-8">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: lesson.color }}
          />
        </div>

        {/* Exercise Card */}
        <div ref={cardRef} className="glass-card p-6 sm:p-8">
          {exercise.type === 'vocab' && (
            <div className="text-center">
              <button
                onClick={() => speak(exercise.word)}
                className="inline-flex items-center gap-2 mb-4 text-text-muted hover:text-accent transition-colors"
              >
                <Volume2 size={20} />
                <span className="text-xs">Listen</span>
              </button>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-2" style={{ color: lesson.color }}>
                {exercise.word}
              </h2>
              <p className="text-xl text-text-secondary mb-6">{exercise.translation}</p>
              <div className="glass-card p-4 text-left inline-block">
                <p className="text-sm text-text-primary italic mb-1">"{exercise.example}"</p>
                <p className="text-xs text-text-muted">{exercise.exampleTranslation}</p>
              </div>
            </div>
          )}

          {exercise.type === 'quiz' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-6">{exercise.question}</h2>
              <div className="space-y-3">
                {exercise.options.map((opt, i) => {
                  let borderColor = 'rgba(255,255,255,0.08)'
                  let bg = 'transparent'
                  if (showResult && i === exercise.correct) {
                    borderColor = '#22c55e'
                    bg = 'rgba(34, 197, 94, 0.1)'
                  } else if (showResult && i === selectedAnswer && i !== exercise.correct) {
                    borderColor = '#ef4444'
                    bg = 'rgba(239, 68, 68, 0.1)'
                  } else if (selectedAnswer === i && !showResult) {
                    borderColor = '#6366f1'
                    bg = 'rgba(99, 102, 241, 0.1)'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => !showResult && setSelectedAnswer(i)}
                      disabled={showResult}
                      className="w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center gap-3"
                      style={{ borderColor, background: bg }}
                    >
                      <span className="w-8 h-8 rounded-lg border border-inherit flex items-center justify-center text-sm font-bold text-text-muted shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="text-text-primary">{opt}</span>
                      {showResult && i === exercise.correct && <Check size={18} className="ml-auto text-success" />}
                      {showResult && i === selectedAnswer && i !== exercise.correct && <X size={18} className="ml-auto text-error" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {exercise.type === 'fillblank' && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Fill in the blank</h2>
              <p className="text-text-muted text-sm mb-6">{exercise.hint}</p>
              <p className="text-2xl font-bold mb-6">
                {exercise.sentence.split('___').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <input
                        type="text"
                        value={fillAnswer}
                        onChange={(e) => setFillAnswer(e.target.value)}
                        disabled={showResult}
                        className={`inline-block w-32 mx-1 px-3 py-1 text-center border-b-2 bg-transparent outline-none text-accent font-bold ${
                          showResult
                            ? isCorrect ? 'border-success' : 'border-error'
                            : 'border-accent'
                        }`}
                        placeholder="..."
                      />
                    )}
                  </span>
                ))}
              </p>
              {showResult && !isCorrect && (
                <p className="text-sm text-error">Correct answer: <strong className="text-success">{exercise.answer}</strong></p>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between mt-6">
          {exercise.type === 'vocab' ? (
            <div className="w-full flex justify-end">
              <button
                onClick={nextExercise}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all flex items-center gap-2"
              >
                Continue <ChevronRight size={16} />
              </button>
            </div>
          ) : !showResult ? (
            <div className="w-full flex justify-end">
              <button
                onClick={checkAnswer}
                disabled={selectedAnswer === null && fillAnswer === ''}
                className="px-6 py-3 bg-accent hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
              >
                Check Answer
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                {isCorrect ? (
                  <>
                    <Check size={20} className="text-success" />
                    <span className="text-success font-bold">Correct!</span>
                  </>
                ) : (
                  <>
                    <X size={20} className="text-error" />
                    <span className="text-error font-bold">Not quite</span>
                  </>
                )}
              </div>
              <button
                onClick={nextExercise}
                className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-xl transition-all flex items-center gap-2"
              >
                {currentIndex < lesson.exercises.length - 1 ? 'Next' : 'Finish'} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
