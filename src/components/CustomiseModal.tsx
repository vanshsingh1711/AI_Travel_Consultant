import { useState, useEffect, useRef } from 'react'
import {
  X, Wallet, Palmtree, Clock, Utensils, Plane, Train,
  Bus, Mountain, Milestone, Waves, ArrowRight,
  Zap, Wind, Landmark, Moon, Heart, Music2, Baby, ChevronRight
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface CustomiseModalProps {
  isOpen: boolean
  onClose: () => void
  baseState: {
    origin: string
    destination: string
    startDate: string
    endDate: string
    adults: number
    children: number
    infants: number
  }
}

const CYCLING_ICONS = [
  { Icon: Plane,     label: 'Flights'    },
  { Icon: Train,     label: 'Trains'     },
  { Icon: Bus,       label: 'Road Trips' },
  { Icon: Mountain,  label: 'Treks'      },
  { Icon: Waves,     label: 'Beaches'    },
  { Icon: Milestone, label: 'Roadways'   },
]

const VIBES = [
  { id: 'Adventure',         Icon: Zap,      bg: 'from-orange-500 to-amber-400',   ring: '#f97316' },
  { id: 'Relaxation',        Icon: Wind,     bg: 'from-cyan-500 to-sky-400',       ring: '#06b6d4' },
  { id: 'Cultural Heritage', Icon: Landmark, bg: 'from-violet-500 to-purple-400',  ring: '#8b5cf6' },
  { id: 'Spiritual',         Icon: Moon,     bg: 'from-indigo-600 to-indigo-400',  ring: '#6366f1' },
  { id: 'Romantic',          Icon: Heart,    bg: 'from-rose-500 to-pink-400',      ring: '#ec4899' },
  { id: 'Party',             Icon: Music2,   bg: 'from-amber-500 to-yellow-400',   ring: '#f59e0b' },
  { id: 'Family-Friendly',   Icon: Baby,     bg: 'from-emerald-500 to-teal-400',   ring: '#10b981' },
]

const PACINGS = [
  {
    id: 'Relaxed',
    label: 'Leisurely',
    tagline: 'Slow & Savour',
    desc: 'Slow mornings, long café stops, and space to wander without a clock.',
    bars: 1,
    accent: '#34d399',
  },
  {
    id: 'Balanced',
    label: 'Balanced',
    tagline: 'Best of Both',
    desc: 'A curated mix of highlights and breathing room — the classic holiday.',
    bars: 2,
    accent: '#31A8FF',
  },
  {
    id: 'Action-Packed',
    label: 'Intensive',
    tagline: 'Full Throttle',
    desc: 'Every hour is planned. For those who sleep when they\'re home.',
    bars: 3,
    accent: '#f97316',
  },
]

const DIETS = [
  { id: 'No Restrictions', label: 'No Restrictions' },
  { id: 'Vegetarian',      label: 'Vegetarian'      },
  { id: 'Vegan',           label: 'Vegan'           },
  { id: 'Halal',           label: 'Halal'           },
  { id: 'Gluten-Free',     label: 'Gluten-Free'     },
  { id: 'Jain',            label: 'Jain'            },
]

const keyframes = `
  @keyframes modalFlyIn {
    0%   { opacity: 0; transform: translateY(70px) scale(0.94); }
    55%  { opacity: 1; transform: translateY(-6px) scale(1.01); }
    75%  { transform: translateY(3px) scale(0.995); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes iconSwap {
    0%   { opacity: 0; transform: translateY(10px) scale(0.7); }
    20%  { opacity: 1; transform: translateY(0) scale(1); }
    80%  { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(0.7); }
  }
  @keyframes floatPlane {
    0%   { transform: translateX(-10%) translateY(0px) rotate(-10deg); opacity:0; }
    15%  { opacity: 0.18; }
    85%  { opacity: 0.18; }
    100% { transform: translateX(110%) translateY(-12px) rotate(8deg); opacity:0; }
  }
  @keyframes shimmerSlide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes stepIn {
    from { opacity: 0; transform: translateX(8px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`

const SectionLabel = ({ icon: Icon, label }: { icon: any; label: string }) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px flex-1 bg-gradient-to-r from-slate-100 to-transparent" />
    <div className="flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 text-slate-400" />
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {label}
      </span>
    </div>
    <div className="h-px flex-1 bg-gradient-to-l from-slate-100 to-transparent" />
  </div>
)

export function CustomiseModal({ isOpen, onClose, baseState }: CustomiseModalProps) {
  const navigate = useNavigate()
  const [budget, setBudget]   = useState('')
  const [vibe, setVibe]       = useState('Adventure')
  const [pacing, setPacing]   = useState('Balanced')
  const [diet, setDiet]       = useState('No Restrictions')
  const [iconIdx, setIconIdx] = useState(0)
  const [visible, setVisible] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => setVisible(true), 10)
      intervalRef.current = setInterval(() => {
        setIconIdx(prev => (prev + 1) % CYCLING_ICONS.length)
      }, 1800)
    } else {
      setVisible(false)
      document.body.style.overflow = 'unset'
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      document.body.style.overflow = 'unset'
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleGenerate = () => {
    navigate('/itinerary', { state: { ...baseState, customise: true, budget, vibe, pacing, diet } })
    onClose()
  }

  const { Icon: CycleIcon, label: cycleLabel } = CYCLING_ICONS[iconIdx]
  const activeVibe = VIBES.find(v => v.id === vibe)!
  const activePacing = PACINGS.find(p => p.id === pacing)!

  return (
    <>
      <style>{keyframes}</style>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ animation: 'overlayIn 0.3s ease forwards', backgroundColor: 'rgba(5,15,30,0.72)', backdropFilter: 'blur(10px)' }}
        onClick={onClose}
      >
        {/* Panel */}
        <div
          className="relative flex w-full flex-col overflow-hidden bg-white sm:max-w-[680px] max-h-[97vh] sm:max-h-[90vh] rounded-t-[2rem] sm:rounded-[2rem]"
          style={{
            animation: visible ? 'modalFlyIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px -20px rgba(0,0,0,0.6), 0 -4px 60px rgba(49,168,255,0.15)',
          }}
          onClick={e => e.stopPropagation()}
        >

          {/* ── Header ─────────────────────────────────── */}
          <div
            className="relative flex-shrink-0 overflow-hidden"
            style={{ background: 'linear-gradient(145deg, #060e1c 0%, #0c2544 45%, #0f3460 100%)' }}
          >
            {/* floating plane bg */}
            <Plane
              className="pointer-events-none absolute top-1/2 h-16 w-16 -translate-y-1/2 text-white"
              aria-hidden
              style={{ animation: 'floatPlane 5s ease-in-out infinite' }}
            />

            {/* radial glow */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 80% 40%, rgba(49,168,255,0.18) 0%, transparent 70%)' }}
              aria-hidden
            />

            <div className="relative z-10 px-7 pt-8 pb-6">
              {/* top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  {/* cycling badge */}
                  <div
                    className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      backdropFilter: 'blur(16px)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                    }}
                  >
                    <CycleIcon
                      className="h-6 w-6 text-white"
                      key={iconIdx}
                      style={{ animation: 'iconSwap 1.8s ease-in-out forwards' }}
                    />
                  </div>

                  <div>
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/40 mb-0.5"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      <span
                        key={`lbl-${iconIdx}`}
                        style={{ animation: 'iconSwap 1.8s ease-in-out forwards', display: 'inline-block' }}
                      >
                        {cycleLabel}
                      </span>
                      {' '}· Personalised Planning
                    </p>
                    <h2
                      className="text-3xl font-bold leading-none text-white"
                      style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.02em' }}
                    >
                      Build Your<br />
                      <span className="italic text-cyan-300">Perfect</span> Journey
                    </h2>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-white/40 transition-all hover:bg-white/10 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* route strip */}
              <div className="mt-5 flex items-center gap-2 flex-wrap">
                <span
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white/80"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {baseState.origin || 'Origin'}
                </span>
                <div className="flex items-center gap-1 text-white/30">
                  <div className="h-px w-3 bg-current" />
                  <ArrowRight className="h-3 w-3" />
                </div>
                <span
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white/80"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {baseState.destination || 'Destination'}
                </span>
                {baseState.startDate && (
                  <span
                    className="rounded-lg px-3 py-1.5 text-xs font-semibold text-cyan-300/70"
                    style={{
                      background: 'rgba(49,168,255,0.08)',
                      border: '1px solid rgba(49,168,255,0.15)',
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {baseState.startDate} → {baseState.endDate}
                  </span>
                )}
              </div>
            </div>

            {/* bottom fade into white */}
            <div className="h-6" style={{ background: 'linear-gradient(to bottom, transparent, white)' }} />
          </div>

          {/* ── Scrollable Body ────────────────────────── */}
          <div
            className="flex-1 overflow-y-auto px-6 sm:px-8 pb-4"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >

            {/* ── Budget ── */}
            <div className="mt-6">
              <SectionLabel icon={Wallet} label="Budget Ceiling" />
              <div className="relative">
                <span
                  className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="50,000"
                  value={budget}
                  onChange={e => setBudget(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full rounded-2xl border border-slate-150 bg-slate-50/80 py-4 pl-11 pr-5 text-2xl font-bold text-neutral-900 outline-none transition-all placeholder:text-slate-200 focus:border-[#31A8FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(49,168,255,0.1)]"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '-0.01em' }}
                />
                {budget && (
                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-500 bg-emerald-50 rounded-lg px-2 py-1">
                    Hard Cap
                  </span>
                )}
              </div>
              <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                Leave blank for AI-optimized pricing. When set, accommodation, transport and activities are strictly bounded.
              </p>
            </div>

            {/* ── Vibe ── */}
            <div className="mt-7">
              <SectionLabel icon={Palmtree} label="Travel Vibe" />
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {VIBES.map(({ id, Icon, bg, ring }) => {
                  const active = vibe === id
                  return (
                    <button
                      key={id}
                      onClick={() => setVibe(id)}
                      className="group relative overflow-hidden rounded-2xl p-0.5 transition-all duration-200"
                      style={{
                        background: active ? `linear-gradient(135deg, ${ring}80, ${ring}30)` : 'transparent',
                        boxShadow: active ? `0 0 0 2px ${ring}, 0 4px 20px ${ring}30` : '0 0 0 1.5px #e2e8f0',
                      }}
                    >
                      <div
                        className={`relative flex flex-col items-start gap-2 rounded-[14px] p-3.5 transition-all duration-200 ${active ? 'bg-white/90' : 'bg-white group-hover:bg-slate-50'}`}
                      >
                        {/* icon chip */}
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${bg}`}
                        >
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span
                          className="text-left text-[13px] font-semibold leading-tight text-slate-800"
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                          {id}
                        </span>
                        {active && (
                          <div
                            className="absolute right-2 top-2 h-2 w-2 rounded-full"
                            style={{ background: ring }}
                          />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Pacing ── */}
            <div className="mt-7">
              <SectionLabel icon={Clock} label="Pacing Preference" />
              <div className="grid gap-3 sm:grid-cols-3">
                {PACINGS.map(p => {
                  const active = pacing === p.id
                  return (
                    <button
                      key={p.id}
                      onClick={() => setPacing(p.id)}
                      className="group relative flex flex-col items-start gap-3 rounded-2xl p-4 text-left transition-all duration-200"
                      style={{
                        border: active ? `2px solid ${p.accent}` : '2px solid #f1f5f9',
                        background: active ? `linear-gradient(145deg, ${p.accent}10, white)` : 'white',
                        boxShadow: active ? `0 4px 20px ${p.accent}20` : 'none',
                      }}
                    >
                      {/* rhythm bars */}
                      <div className="flex gap-1">
                        {[1, 2, 3].map(b => (
                          <div
                            key={b}
                            className="rounded-full transition-all duration-300"
                            style={{
                              height: b <= p.bars ? (active ? '14px' : '10px') : '6px',
                              width: '4px',
                              background: b <= p.bars ? (active ? p.accent : '#cbd5e1') : '#f1f5f9',
                              transitionDelay: `${b * 30}ms`,
                            }}
                          />
                        ))}
                      </div>

                      <div>
                        <p
                          className="text-base font-bold leading-none"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            color: active ? p.accent : '#1e293b',
                            fontSize: '18px',
                          }}
                        >
                          {p.label}
                        </p>
                        <p
                          className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider"
                          style={{
                            fontFamily: "'DM Mono', monospace",
                            color: active ? `${p.accent}99` : '#94a3b8',
                          }}
                        >
                          {p.tagline}
                        </p>
                      </div>

                      <p className="text-xs leading-relaxed text-slate-500">{p.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── Diet ── */}
            <div className="mt-7 mb-4">
              <SectionLabel icon={Utensils} label="Dietary Preferences" />
              <div className="flex flex-wrap gap-2">
                {DIETS.map(({ id, label }) => {
                  const active = diet === id
                  return (
                    <button
                      key={id}
                      onClick={() => setDiet(id)}
                      className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200"
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        background: active ? '#0a3d5c' : '#f8fafc',
                        color: active ? '#ffffff' : '#64748b',
                        border: active ? '1.5px solid #0a3d5c' : '1.5px solid #e2e8f0',
                        boxShadow: active ? '0 4px 12px rgba(10,61,92,0.25)' : 'none',
                      }}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
              <p className="mt-2.5 text-[11px] text-slate-400">
                Applied to every restaurant and street-food suggestion in your itinerary.
              </p>
            </div>

          </div>

          {/* ── Footer CTA ─────────────────────────────── */}
          <div
            className="flex-shrink-0 px-6 sm:px-8 py-5"
            style={{ borderTop: '1px solid #f1f5f9', background: 'white' }}
          >
            <button
              onClick={handleGenerate}
              className="group relative w-full overflow-hidden rounded-2xl py-4 font-bold text-white transition-all duration-300 hover:scale-[1.015] active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, #060e1c 0%, #0c2d58 50%, #1a6bc7 100%)',
                boxShadow: '0 8px 40px rgba(10,61,92,0.5), 0 2px 8px rgba(0,0,0,0.2)',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {/* shimmer */}
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                  animation: 'shimmerSlide 1.2s linear infinite',
                }}
                aria-hidden
              />
              <span className="relative flex items-center justify-center gap-3 text-base">
                <Plane className="h-5 w-5 -rotate-45 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5" />
                <span>
                  Generate My Custom Itinerary
                </span>
                <ChevronRight className="h-4 w-4 opacity-50 transition-transform group-hover:translate-x-1" />
              </span>
            </button>

            {/* summary line */}
            <div
              className="mt-3 flex items-center justify-center gap-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {budget && <span className="text-emerald-500">₹{parseInt(budget).toLocaleString()} cap</span>}
              <span style={{ color: activeVibe.ring }}>{vibe}</span>
              <span style={{ color: activePacing.accent }}>{activePacing.tagline}</span>
              <span>{diet}</span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
