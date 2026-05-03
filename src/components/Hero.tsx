import {
  Calendar,
  ChevronDown,
  MapPin,
  Search,
  PlaneTakeoff,
  Users,
  Loader2
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from './Navbar'
import { CustomiseModal } from './CustomiseModal'

const AutocompleteField = ({ label, placeholder, icon: Icon, value, onChange, onErrorChange, className = '' }: any) => {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isError = hasSearched && results.length === 0 && value.length >= 3;

  useEffect(() => {
    if (onErrorChange) {
      onErrorChange(isError);
    }
  }, [isError, onErrorChange])

  useEffect(() => {
    if (!isFocused || value.length < 3) {
      setResults([])
      setHasSearched(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/cities?query=${encodeURIComponent(value)}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data)
          setHasSearched(true)
        } else {
          // If RapidAPI rate limits (500/429), allow the user to bypass the block
          setResults([{ city: value, country: '(Click to bypass API limit)' }])
          setHasSearched(true)
        }
      } catch (err) {
        setResults([{ city: value, country: '(Click to bypass API limit)' }])
        setHasSearched(true)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [value, isFocused])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`flex min-w-0 items-start gap-3 rounded-xl px-3 py-2 md:border-r md:border-slate-100 relative transition-colors ${className} ${isError ? 'bg-red-50/50 ring-1 ring-red-400' : ''}`} ref={dropdownRef}>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${isError ? 'text-red-400' : 'text-[#31A8FF]'}`} />
      <div className="min-w-0 w-full">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <div className="mt-0.5 flex w-full items-center justify-between gap-2">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange(e.target.value)
              setIsFocused(true)
            }}
            onFocus={() => setIsFocused(true)}
            className="w-full truncate bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>
      
      {isFocused && value.length >= 3 && (
        <div className="absolute top-full left-0 z-50 mt-2 w-[120%] min-w-[250px] overflow-hidden rounded-xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.12)] ring-1 ring-slate-200">
          {loading ? (
            <div className="p-4 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#31A8FF]" /> Searching...
            </div>
          ) : hasSearched && results.length === 0 ? (
            <div className="p-4 text-center text-sm text-slate-500">
              No city named "{value}"
            </div>
          ) : results.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto py-1">
              {results.map((cityObj, idx) => (
                <li 
                  key={idx}
                  className="cursor-pointer px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  onClick={() => {
                    onChange(`${cityObj.city}, ${cityObj.country}`)
                    setIsFocused(false)
                  }}
                >
                  <div className="text-sm font-semibold text-slate-900">{cityObj.city}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{cityObj.country}</div>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  )
}

export function Hero() {
  const navigate = useNavigate()
  const [travellerOpen, setTravellerOpen] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  
  const [originError, setOriginError] = useState(false)
  const [destinationError, setDestinationError] = useState(false)
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const isSearchDisabled = originError || destinationError || origin.length < 3 || destination.length < 3

  const totalTravellers = adults + children + infants
  return (
    <header className="relative min-h-[100svh] pb-28 pt-6 md:pb-36">
      {/* Background — replace with real hero photo */}
      <div
        className="absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('public/images/heroimage.jpg')`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.12),transparent_50%)]" />
      </div>

      <div className="absolute top-6 left-0 right-0 z-50">
        <Navbar isTransparent={true} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 md:pt-24">

        <div className="mx-auto mt-8 max-w-4xl px-2 text-center md:mt-12">
          <h1 className="font-heading text-4xl font-bold leading-tight tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            EXPLORE{' '}
            <span className="relative inline-block px-2">
              <span
                className="absolute inset-0 -skew-x-2 rounded-sm bg-cyan-400/35"
                aria-hidden
              />
              <span className="relative">THE WORLD</span>
            </span>{' '}
            IN YOUR WAY.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            Beaches, villages, stays, rentals and authentic local experiences
            all in one curated travel marketplace — guided by your AI travel
            consultant.
          </p>
        </div>

        <div className="relative z-20 mx-auto mt-10 max-w-[75rem] px-1 md:mt-14">
          <div className="flex flex-col gap-4 rounded-2xl border border-white/40 bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm md:flex-row md:items-stretch md:rounded-3xl md:p-3 md:pr-2">
            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              
              {/* Origin */}
              <AutocompleteField 
                label="Origin"
                placeholder="Where from?"
                icon={PlaneTakeoff}
                value={origin}
                onChange={setOrigin}
                onErrorChange={setOriginError}
              />

              {/* Destination */}
              <AutocompleteField 
                label="Destination"
                placeholder="Where to?"
                icon={MapPin}
                value={destination}
                onChange={setDestination}
                onErrorChange={setDestinationError}
                className="lg:border-r lg:border-slate-100"
              />

              {/* Travel Dates */}
              <div className="flex min-w-0 items-start gap-3 rounded-xl px-3 py-2 md:border-r md:border-slate-100">
                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-[#31A8FF]" />
                <div className="min-w-0 w-full">
                  <p className="text-xs font-medium text-slate-500">Travel Dates</p>
                  <div className="mt-0.5 flex w-full items-center gap-2">
                    <input
                      type="text"
                      placeholder="Start date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.value === '' ? (e.target.type = 'text') : null)}
                      className="w-full min-w-0 bg-transparent text-[13px] font-semibold text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                    />
                    <span className="text-xs font-bold text-slate-300">-</span>
                    <input
                      type="text"
                      placeholder="End date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => (e.target.value === '' ? (e.target.type = 'text') : null)}
                      className="w-full min-w-0 bg-transparent text-[13px] font-semibold text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Travellers */}
              <div className="relative flex min-w-0 items-start gap-3 rounded-xl px-3 py-2">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-[#31A8FF]" />
                <div className="min-w-0 w-full">
                  <p className="text-xs font-medium text-slate-500">Travellers</p>
                  <button
                    type="button"
                    onClick={() => setTravellerOpen(!travellerOpen)}
                    className="mt-0.5 flex w-full items-center justify-between gap-2 text-left text-sm font-semibold text-slate-800 outline-none"
                  >
                    <span className="truncate">{totalTravellers} Traveller{totalTravellers !== 1 ? 's' : ''}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${travellerOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {travellerOpen && (
                    <div className="absolute left-0 top-full z-50 mt-4 w-72 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:-left-1/2 lg:left-0">
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Adults</p>
                          <p className="text-xs text-slate-500">Ages 13 or above</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setAdults(Math.max(1, adults - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">-</button>
                          <span className="w-4 text-center text-sm font-semibold">{adults}</span>
                          <button type="button" onClick={() => setAdults(adults + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">+</button>
                        </div>
                      </div>
                      
                      <div className="mb-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Children</p>
                          <p className="text-xs text-slate-500">Ages 2–12</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setChildren(Math.max(0, children - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">-</button>
                          <span className="w-4 text-center text-sm font-semibold">{children}</span>
                          <button type="button" onClick={() => setChildren(children + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">+</button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-800">Infants</p>
                          <p className="text-xs text-slate-500">Under 2</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setInfants(Math.max(0, infants - 1))} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">-</button>
                          <span className="w-4 text-center text-sm font-semibold">{infants}</span>
                          <button type="button" onClick={() => setInfants(infants + 1)} className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">+</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex shrink-0 flex-col sm:flex-row gap-3">
              <button
                type="button"
                disabled={isSearchDisabled}
                onClick={() => navigate('/itinerary', { state: { origin, destination, startDate, endDate, adults, children, infants } })}
                className={`flex items-center justify-center gap-2 rounded-full px-8 py-3.5 font-semibold text-white shadow-md transition md:px-10 ${isSearchDisabled ? 'bg-slate-300 cursor-not-allowed shadow-none' : 'bg-[#31A8FF] hover:bg-[#1e96eb]'}`}
              >
                <Search className="h-5 w-5" />
                Search
              </button>
              
              <button 
                disabled={isSearchDisabled}
                className={`magic-btn w-full sm:w-auto ${isSearchDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
                onClick={() => setIsModalOpen(true)}
              >
                <div className="dots_border"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="sparkle">
                  <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"></path>
                  <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"></path>
                  <path className="path" strokeLinejoin="round" strokeLinecap="round" stroke="black" fill="black" d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"></path>
                </svg>
                <span className="text_button">Customise Trip</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wavy divider */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] text-white">
        <svg
          className="block h-[72px] w-full md:h-[100px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Modal */}
      <CustomiseModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        baseState={{ origin, destination, startDate, endDate, adults, children, infants }}
      />
    </header>
  )
}
