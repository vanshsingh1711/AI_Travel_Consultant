import { Plane, Train, Bus, Car, CheckCircle2, ArrowRight, MapPin, Clock, Ruler, Route, Navigation } from 'lucide-react'

const modeIcon: Record<string, any> = {
  Train:   <Train  className="h-4 w-4" />,
  TrainBig:<Train  className="h-4 w-4" />,
  Bus:     <Bus    className="h-4 w-4" />,
  Flight:  <Plane  className="h-4 w-4" />,
  Plane:   <Plane  className="h-4 w-4" />,
  Car:     <Car    className="h-4 w-4" />,
}

const modeColor: Record<string, string> = {
  Train:   '#31A8FF',
  TrainBig:'#31A8FF',
  Bus:     '#10b981',
  Flight:  '#8b5cf6',
  Plane:   '#8b5cf6',
  Car:     '#f97316',
}

interface RouteOption {
  mode: string
  iconName: string
  name: string
  duration: string
  price: string
  recommended?: boolean
}

interface RouteLeg {
  from: string
  to: string
  distanceKm: number
  options: RouteOption[]
}

interface AltRoute {
  label: string
  summary: string
  totalDuration: string
}

interface RouteMapProps {
  routeMap?: {
    totalDistance?: string
    totalDuration?: string
    legs?: RouteLeg[]
    alternativeRoutes?: AltRoute[]
  }
}

export function RouteMapSection({ routeMap }: RouteMapProps) {
  if (!routeMap || !routeMap.legs || routeMap.legs.length === 0) return null

  const legs = routeMap.legs
  const altRoutes = routeMap.alternativeRoutes || []

  return (
    <section>
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="font-heading text-3xl font-bold text-neutral-900">Route Map</h2>
          <p className="mt-2 text-slate-500">Optimal path from origin to destination with all transport alternatives.</p>
        </div>
        {/* Summary chips */}
        <div className="hidden sm:flex flex-col items-end gap-2">
          {routeMap.totalDistance && (
            <span className="flex items-center gap-1.5 rounded-full bg-[#EBF5FF] px-3 py-1.5 text-xs font-bold text-[#0a3d5c]">
              <Ruler className="h-3.5 w-3.5" /> {routeMap.totalDistance}
            </span>
          )}
          {routeMap.totalDuration && (
            <span className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              <Clock className="h-3.5 w-3.5" /> {routeMap.totalDuration}
            </span>
          )}
        </div>
      </div>

      {/* Tree Map */}
      <div className="relative rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">

        {legs.map((leg, idx) => (
          <div key={idx} className="relative">
            {/* Origin node */}
            <div className="flex items-center gap-4">
              <div className="relative flex flex-col items-center">
                <div
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#31A8FF] bg-white shadow-md shadow-blue-200"
                >
                  {idx === 0 ? (
                    <Navigation className="h-5 w-5 text-[#31A8FF]" />
                  ) : (
                    <MapPin className="h-5 w-5 text-[#31A8FF]" />
                  )}
                </div>
                {/* Connector going down — only draw if more content below */}
                <div className="w-0.5 flex-1 bg-gradient-to-b from-[#31A8FF] to-slate-200" style={{ minHeight: '40px' }} />
              </div>

              <div className="pb-2">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  {idx === 0 ? 'Start' : `Waypoint ${idx}`}
                </p>
                <h3 className="text-xl font-bold text-neutral-900">{leg.from}</h3>
              </div>
            </div>

            {/* Transport Options Cards */}
            <div className="ml-5 border-l-2 border-dashed border-slate-200 pl-8 pb-4">
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
                <Route className="h-3.5 w-3.5" />
                {leg.distanceKm ? `${leg.distanceKm} km to ${leg.to}` : `To ${leg.to}`}
              </p>

              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {(leg.options || []).map((opt, oIdx) => {
                  const color = modeColor[opt.iconName] || modeColor[opt.mode] || '#64748b'
                  return (
                    <div
                      key={oIdx}
                      className={`relative flex flex-col gap-2 rounded-2xl border-2 p-4 transition-all ${
                        opt.recommended
                          ? 'border-[#31A8FF] bg-[#f0f7ff] shadow-md shadow-blue-100'
                          : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}
                    >
                      {opt.recommended && (
                        <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full bg-[#31A8FF] px-2.5 py-0.5 text-[10px] font-bold text-white shadow">
                          <CheckCircle2 className="h-3 w-3" /> Best Pick
                        </span>
                      )}

                      {/* Mode pill */}
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-8 w-8 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${color}18`, color }}
                        >
                          {modeIcon[opt.iconName] || modeIcon[opt.mode] || <Car className="h-4 w-4" />}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color }}>
                            {opt.mode}
                          </p>
                          <p className="text-xs font-semibold text-slate-700 leading-tight">{opt.name}</p>
                        </div>
                      </div>

                      {/* Stats row */}
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2">
                        <span className="flex items-center gap-1 text-xs font-medium text-slate-500">
                          <Clock className="h-3.5 w-3.5" /> {opt.duration}
                        </span>
                        <span className="text-sm font-bold text-neutral-900">{opt.price}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}

        {/* Final Destination node */}
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-50 shadow-md shadow-emerald-100">
            <MapPin className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-500">Destination</p>
            <h3 className="text-xl font-bold text-neutral-900">
              {legs[legs.length - 1]?.to}
            </h3>
          </div>
        </div>
      </div>

      {/* Alternative Routes */}
      {altRoutes.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500">
            <ArrowRight className="h-4 w-4" /> Alternative Routes
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {altRoutes.map((alt, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-slate-400">
                  <Route className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{alt.label}</p>
                  <p className="mt-0.5 text-sm text-slate-500 leading-relaxed">{alt.summary}</p>
                  {alt.totalDuration && (
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-slate-400">
                      <Clock className="h-3 w-3" /> {alt.totalDuration} total
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
