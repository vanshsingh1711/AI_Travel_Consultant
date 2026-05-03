import { Navbar } from '../components/Navbar'
import { RouteMapSection } from '../components/RouteMapSection'
import { AlertTriangle, TrendingDown, CheckCircle2, Calendar, ChevronDown, Clock, CloudSun, CreditCard, MapPin, Moon, Plane, Sun, Sunset, Ticket, Train, Wallet, Info, Footprints, Bus, Loader2, Mountain } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const iconMap: Record<string, any> = {
  Sun: <Sun className="h-5 w-5 text-amber-500" />,
  Sunset: <Sunset className="h-5 w-5 text-orange-500" />,
  Moon: <Moon className="h-5 w-5 text-indigo-500" />,
  Clock: <Clock className="h-4 w-4" />,
  Footprints: <Footprints className="h-4 w-4" />,
  Train: <Train className="h-4 w-4" />,
  Plane: <Plane className="h-6 w-6 text-[#31A8FF]" />,
  Bus: <Bus className="h-4 w-4 text-[#31A8FF]" />,
  TrainBig: <Train className="h-6 w-6 text-[#31A8FF]" />,
  BusBig: <Bus className="h-6 w-6 text-[#31A8FF]" />,
}

const loadingIcons = [Plane, Train, Bus, Mountain]

export function ItineraryPage() {
  const location = useLocation()
  const [openDay, setOpenDay] = useState<number | null>(1)
  const [tripData, setTripData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [iconIndex, setIconIndex] = useState(0)

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (loading) {
      interval = setInterval(() => {
        setIconIndex((prev) => (prev + 1) % loadingIcons.length)
      }, 800)
    }
    return () => clearInterval(interval)
  }, [loading])

  useEffect(() => {
    const fetchItinerary = async () => {
      try {
        setLoading(true)
        const state = location.state || {
          origin: "New York",
          destination: "Kyoto",
          startDate: "2026-10-15",
          endDate: "2026-10-20",
          adults: 2,
          children: 0,
          infants: 0
        }

        const response = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(state)
        })

        if (!response.ok) {
          throw new Error("Failed to generate itinerary.")
        }

        const data = await response.json()
        setTripData(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItinerary()
  }, [location.state])

  if (loading) {
    const CurrentLoadingIcon = loadingIcons[iconIndex]
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <div className="bg-white border-b border-slate-200">
          <Navbar isTransparent={false} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="relative flex items-center justify-center h-24 w-24">
            <Loader2 className="h-20 w-20 animate-spin text-[#31A8FF]/20 absolute" />
            <CurrentLoadingIcon className="h-8 w-8 text-[#0a3d5c] transition-all duration-500 ease-in-out" />
          </div>
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mt-8">Consulting the AI...</h2>
          <p className="text-slate-500 mt-2 text-center max-w-md">Analyzing weather patterns, checking transit routes, and securing the best boutique experiences for your trip.</p>
        </div>
      </div>
    )
  }

  if (error || !tripData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar isTransparent={false} />
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-red-600">Oops!</h2>
            <p className="text-slate-600 mt-2">{error || "Something went wrong."}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar Container */}
      <div className="bg-white border-b border-slate-200">
        <Navbar isTransparent={false} />
      </div>

      {/* SECTION 1: Trip Summary (Hero) */}
      <section className="bg-[#00233D] pt-16 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(49,168,255,0.15),transparent_50%)]" />
        
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#A6D5FA] border border-white/10">
            AI-Generated Itinerary
          </span>
          <h1 className="font-heading mt-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            {tripData.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-[#8eb4c9] leading-relaxed">
            {tripData.overview}
          </p>
        </div>
      </section>

      {/* Floating Metrics Bar */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <Wallet className="h-6 w-6 text-[#31A8FF] mb-2" />
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Est. Cost</p>
            <p className="text-lg font-bold text-neutral-900 mt-1">{tripData.metrics.cost}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center border-l border-slate-100">
            <Calendar className="h-6 w-6 text-[#31A8FF] mb-2" />
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Dates</p>
            <p className="text-sm font-bold text-neutral-900 mt-1">{tripData?.metrics?.dates || 'TBD'}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center md:border-l border-slate-100">
            <MapPin className="h-6 w-6 text-[#31A8FF] mb-2" />
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Destination</p>
            <p className="text-sm font-bold text-neutral-900 mt-1">{tripData?.metrics?.destination || 'TBD'}</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 text-center border-l border-slate-100">
            <CloudSun className="h-6 w-6 text-[#31A8FF] mb-2" />
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Weather</p>
            <p className="text-sm font-bold text-neutral-900 mt-1">{tripData?.metrics?.weather || 'TBD'}</p>
          </div>
        </div>
      </div>

      {/* Budget Warning Banner — shown when budget is infeasible */}
      {tripData?.budgetAnalysis?.isBudgetFeasible === false && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
          <div className="flex items-start gap-4 rounded-2xl border-2 border-red-200 bg-red-50 p-5">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-red-100">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-red-700">Budget Too Low</p>
              <p className="mt-1 text-sm text-red-600 leading-relaxed">
                {tripData.budgetAnalysis.budgetWarning}
              </p>
              {tripData.budgetAnalysis.minimumBudget && (
                <p className="mt-2 text-sm font-bold text-red-700">
                  Minimum realistic budget: <span className="text-red-500">{tripData.budgetAnalysis.minimumBudget}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cost Savings Panel — shown when budget was set and is feasible */}
      {tripData?.budgetAnalysis?.isBudgetFeasible === true &&
        (tripData?.budgetAnalysis?.costSavings || []).length > 0 && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="h-5 w-5 text-emerald-600" />
              <p className="font-bold text-emerald-700">Where the AI Cut Costs for You</p>
            </div>
            <div className="flex flex-col gap-2">
              {(tripData.budgetAnalysis.costSavings || []).map((s: any, i: number) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">{s.category}: </span>
                    <span className="text-sm text-emerald-800">{s.saving}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 flex flex-col gap-24">
        
        {/* SECTION 2: Day-by-Day Itinerary */}
        <section>
          <div className="mb-10">
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Your Daily Itinerary</h2>
            <p className="text-slate-600 mt-2">Chronological plan optimized for minimal transit and maximum enjoyment.</p>
          </div>

          <div className="flex flex-col gap-4">
            {(tripData?.days || []).map((day: any) => {
              const isOpen = openDay === day.day
              return (
                <div key={day.day} className={`rounded-3xl border transition-all duration-300 ${isOpen ? 'border-[#31A8FF] shadow-md bg-white' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                  <button 
                    onClick={() => setOpenDay(isOpen ? null : day.day)}
                    className="w-full flex items-center justify-between p-6 sm:p-8 text-left"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl ${isOpen ? 'bg-[#31A8FF] text-white' : 'bg-[#f0f7fb] text-[#31A8FF]'}`}>
                        <span className="text-xs font-bold uppercase">Day</span>
                        <span className="text-xl font-bold">{day.day}</span>
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-semibold text-neutral-900">{day.title}</h3>
                    </div>
                    <ChevronDown className={`h-6 w-6 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-8 sm:px-8 relative">
                        {/* Timeline line */}
                        <div className="absolute left-[54px] sm:left-[62px] top-4 bottom-4 w-px bg-slate-200" />
                        
                        <div className="flex flex-col gap-8 relative z-10">
                          {(day?.activities || []).map((activity: any, idx: number) => (
                            <div key={idx} className="flex gap-6 sm:gap-8">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white shadow-[0_0_0_4px_white] border border-slate-100">
                                {iconMap[activity.iconName] || <Sun className="h-5 w-5 text-amber-500" />}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                  <h4 className="text-lg font-bold text-neutral-900">{activity.title}</h4>
                                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                                    {activity.timeOfDay}
                                  </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed mb-4">{activity.description}</p>
                                
                                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium">
                                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {activity.duration}</span>
                                  <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" /> {activity.cost}</span>
                                </div>

                                {activity.transit && (
                                  <div className="mt-6 flex items-center gap-2 rounded-xl bg-[#f0f7fb] px-4 py-3 text-sm font-semibold text-[#0a3d5c]">
                                    {iconMap[activity.transitIconName] || <Clock className="h-4 w-4" />}
                                    {activity.transit}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* SECTION 3: Route Map */}
        <RouteMapSection routeMap={tripData?.routeMap} />

        {/* SECTION 4: Bookings & Logistics */}
        <section>
          <div className="mb-10">
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Bookings & Logistics</h2>
            <p className="text-slate-600 mt-2">Recommended options based on your preferences and dates.</p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            
            {/* Hotels */}
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#31A8FF]" /> Accommodation
              </h3>
              {(tripData?.logistics?.hotels || []).map((hotel: any, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
                  <img 
                    src={hotel.image || '/images/image2.jpg'} 
                    alt={hotel.name} 
                    className="h-48 sm:h-auto sm:w-40 object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/image2.jpg' }}
                  />
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#31A8FF]">{hotel.type}</span>
                    <h4 className="mt-1 text-lg font-bold text-neutral-900">{hotel.name}</h4>
                    <p className="mt-2 text-sm font-medium text-slate-500">{hotel.price}</p>
                    <a href={hotel.bookingLink} className="mt-4 inline-block w-full sm:w-auto text-center rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800">
                      Book Now
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Transport */}
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-lg text-neutral-900 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-[#31A8FF]" /> Transport
              </h3>
              {(tripData?.logistics?.transport || []).map((ticket: any, idx: number) => (
                <div key={idx} className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0f7fb]">
                    {iconMap[ticket.iconName] || <Plane className="h-6 w-6 text-[#31A8FF]" />}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{ticket.type}</span>
                    <h4 className="mt-1 text-lg font-bold text-neutral-900">{ticket.route}</h4>
                    <p className="text-sm font-medium text-slate-600">{ticket.airline}</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-bold text-neutral-900">{ticket.price}</span>
                    <a href="#" className="mt-1 text-sm font-bold text-[#31A8FF] hover:underline">Select</a>
                  </div>
                </div>
              ))}

              <div className="mt-2 rounded-2xl bg-[#f0f7fb] p-5 flex gap-4 border border-[#A6D5FA]">
                <Info className="h-5 w-5 shrink-0 text-[#0a3d5c] mt-0.5" />
                <p className="text-sm text-[#0a3d5c] leading-relaxed">
                  <strong>Local Transit Tip:</strong> The AI has optimized transit paths, but we highly recommend researching multi-day transit passes at your destination to save money!
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 4: Financial Breakdown */}
        <section>
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold text-neutral-900">Financial Breakdown</h2>
            <p className="text-slate-600 mt-2">Transparent estimation of your total trip cost.</p>
          </div>

          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm flex flex-col md:flex-row items-center gap-10">
            <div className="h-64 w-64 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={tripData?.finance || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(tripData?.finance || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `₹${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex-1 w-full flex flex-col gap-4">
              {(tripData?.finance || []).map((item: any, idx: number) => {
                const total = (tripData?.finance || []).reduce((sum: number, curr: any) => sum + (curr.value || 0), 0)
                const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="font-medium text-slate-700">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold text-neutral-900">₹{(item.value || 0).toLocaleString()}</span>
                      <span className="text-xs font-semibold text-slate-400">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
              <div className="mt-4 border-t border-slate-100 pt-4 flex items-center justify-between">
                <span className="font-bold text-slate-900">Total Estimated</span>
                <span className="text-xl font-bold text-[#31A8FF]">{tripData?.metrics?.cost || 'TBD'}</span>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
