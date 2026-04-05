import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { BookOpen, ChevronRight, ChevronDown, Search } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Navbar from '../components/Navbar'
import MouseTrackCard from '../components/MouseTrackCard'

const grammarTopics = [
  {
    id: 'articles',
    title: 'Articles (Artikel)',
    level: 'A1',
    color: '#22c55e',
    desc: 'Learn the three genders: der, die, das',
    content: {
      explanation: 'German has three grammatical genders: masculine (der), feminine (die), and neuter (das). The plural article is always "die".',
      table: {
        headers: ['Case', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Nominative', 'der', 'die', 'das', 'die'],
          ['Accusative', 'den', 'die', 'das', 'die'],
          ['Dative', 'dem', 'der', 'dem', 'den'],
          ['Genitive', 'des', 'der', 'des', 'der'],
        ],
      },
      examples: [
        { de: 'Der Mann liest ein Buch.', en: 'The man reads a book.' },
        { de: 'Ich sehe den Mann.', en: 'I see the man.' },
        { de: 'Ich gebe dem Mann das Buch.', en: 'I give the man the book.' },
      ],
      tips: [
        'Words ending in -ung, -heit, -keit are always feminine (die)',
        'Words ending in -chen, -lein are always neuter (das)',
        'Days, months, seasons are masculine (der)',
      ],
    },
  },
  {
    id: 'present-tense',
    title: 'Present Tense (Präsens)',
    level: 'A1',
    color: '#22c55e',
    desc: 'Regular and irregular verb conjugation',
    content: {
      explanation: 'In German, verbs change their endings based on the subject. Most verbs follow a regular pattern.',
      table: {
        headers: ['Pronoun', 'machen (to do)', 'sprechen (to speak)', 'sein (to be)'],
        rows: [
          ['ich', 'mache', 'spreche', 'bin'],
          ['du', 'machst', 'sprichst', 'bist'],
          ['er/sie/es', 'macht', 'spricht', 'ist'],
          ['wir', 'machen', 'sprechen', 'sind'],
          ['ihr', 'macht', 'sprecht', 'seid'],
          ['sie/Sie', 'machen', 'sprechen', 'sind'],
        ],
      },
      examples: [
        { de: 'Ich mache meine Hausaufgaben.', en: 'I do my homework.' },
        { de: 'Er spricht Deutsch.', en: 'He speaks German.' },
        { de: 'Wir sind Studenten.', en: 'We are students.' },
      ],
      tips: [
        'Remove -en from infinitive to get the stem: mach-en → mach-',
        'Irregular verbs change their stem vowel in du/er forms',
        'Sein, haben, werden are completely irregular — memorize them!',
      ],
    },
  },
  {
    id: 'accusative',
    title: 'Accusative Case (Akkusativ)',
    level: 'A1',
    color: '#22c55e',
    desc: 'Direct objects and accusative prepositions',
    content: {
      explanation: 'The accusative case is used for direct objects (the thing being acted upon) and after certain prepositions.',
      table: {
        headers: ['', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Definite', 'den', 'die', 'das', 'die'],
          ['Indefinite', 'einen', 'eine', 'ein', 'keine'],
        ],
      },
      examples: [
        { de: 'Ich sehe den Hund.', en: 'I see the dog.' },
        { de: 'Er kauft einen Computer.', en: 'He buys a computer.' },
        { de: 'Wir haben keine Zeit.', en: 'We have no time.' },
      ],
      tips: [
        'Only masculine articles change in accusative: der → den, ein → einen',
        'Prepositions für, durch, gegen, ohne, um always take accusative',
        'Ask "Wen?" (whom?) or "Was?" (what?) to find the direct object',
      ],
    },
  },
  {
    id: 'dative',
    title: 'Dative Case (Dativ)',
    level: 'A2',
    color: '#3b82f6',
    desc: 'Indirect objects and dative prepositions',
    content: {
      explanation: 'The dative case marks the indirect object — the person or thing that receives the direct object.',
      table: {
        headers: ['', 'Masculine', 'Feminine', 'Neuter', 'Plural'],
        rows: [
          ['Definite', 'dem', 'der', 'dem', 'den (+n)'],
          ['Indefinite', 'einem', 'einer', 'einem', 'keinen (+n)'],
        ],
      },
      examples: [
        { de: 'Ich gebe dem Kind ein Buch.', en: 'I give the child a book.' },
        { de: 'Er hilft der Frau.', en: 'He helps the woman.' },
        { de: 'Wir fahren mit dem Auto.', en: 'We drive with the car.' },
      ],
      tips: [
        'Prepositions mit, von, zu, aus, bei, nach, seit always take dative',
        'Add -n to plural nouns in dative (den Kindern)',
        'Verbs like helfen, danken, gehören always take dative',
      ],
    },
  },
]

export default function Grammar() {
  const [expanded, setExpanded] = useState(null)
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  const filtered = grammarTopics.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.desc.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.grammar-header', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' })
      gsap.from('.grammar-item', {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.2,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id)
  }

  return (
    <PageTransition>
      <Navbar />
      <div ref={ref} className="page-content max-w-4xl mx-auto sm:px-6">
        <div className="grammar-header mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            <span className="gradient-text-accent">Grammar</span> Reference
          </h1>
          <p className="text-text-secondary">Interactive grammar rules with tables, examples, and tips</p>
        </div>

        {/* Search */}
        <div className="grammar-header relative mb-8">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search grammar topics..."
            className="w-full pl-11 pr-4 py-3 bg-white/5 border border-border-glass rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        {/* Topics */}
        <div className="space-y-4">
          {filtered.map((topic) => (
            <div key={topic.id} className="grammar-item">
              <MouseTrackCard
                className={`p-5 sm:p-6 cursor-pointer ${expanded === topic.id ? 'ring-1 ring-accent/30' : ''}`}
                glowColor={`${topic.color}15`}
              >
                <div onClick={() => toggleExpand(topic.id)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${topic.color}15`, border: `1px solid ${topic.color}30` }}
                      >
                        <BookOpen size={18} style={{ color: topic.color }} />
                      </div>
                      <div>
                        <h3 className="font-bold text-text-primary">{topic.title}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold" style={{ color: topic.color }}>{topic.level}</span>
                          <span className="text-xs text-text-muted">· {topic.desc}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronDown
                      size={20}
                      className={`text-text-muted transition-transform duration-300 shrink-0 ${expanded === topic.id ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {expanded === topic.id && topic.content && (
                  <div className="mt-6 pt-6 border-t border-border-glass space-y-6">
                    {/* Explanation */}
                    <p className="text-text-secondary leading-relaxed">{topic.content.explanation}</p>

                    {/* Table */}
                    {topic.content.table && (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              {topic.content.table.headers.map((h, i) => (
                                <th key={i} className="text-left px-3 py-2 text-text-muted font-semibold border-b border-border-glass">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {topic.content.table.rows.map((row, i) => (
                              <tr key={i} className="border-b border-border-glass/50">
                                {row.map((cell, j) => (
                                  <td key={j} className={`px-3 py-2.5 ${j === 0 ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Examples */}
                    {topic.content.examples && (
                      <div>
                        <h4 className="text-sm font-bold text-text-primary mb-3">Examples</h4>
                        <div className="space-y-2">
                          {topic.content.examples.map((ex, i) => (
                            <div key={i} className="glass-card p-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                              <span className="text-text-primary text-sm font-medium">{ex.de}</span>
                              <span className="text-text-muted text-xs italic">{ex.en}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Tips */}
                    {topic.content.tips && (
                      <div>
                        <h4 className="text-sm font-bold text-text-primary mb-3">Tips</h4>
                        <ul className="space-y-2">
                          {topic.content.tips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                              <span className="text-accent mt-0.5">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </MouseTrackCard>
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  )
}
