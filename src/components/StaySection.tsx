import { Bed, Heart, MapPin, ParkingCircle, Users, Wifi } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const filters = ['All', 'Hotel', 'Villas', 'Boutique', 'Luxury']

const properties = [
  {
    id: 'villa-aegean-blue',
    title: 'Villa Aegean Blue',
    location: 'Old Town, Chora',
    locationIcon: 'pin' as const,
    rating: '5',
    reviews: '98',
    tags: ['Cube Verified', 'Wind-Protected', 'Sea View'],
    image: '/images/heroimage0.jpg',
  },
  {
    id: 'naxos-boutique-suites',
    title: 'Naxos Boutique Suites',
    location: '2 Beds',
    locationIcon: 'bed' as const,
    rating: '5',
    reviews: '98',
    tags: ['Cube Verified', 'Wind-Protected', 'Heritage'],
    image: '/images/image2.jpg',
  },
  {
    id: 'cycladic-hideaway',
    title: 'Cycladic Hideaway',
    location: '2 Beds',
    locationIcon: 'bed' as const,
    rating: '5',
    reviews: '98',
    tags: ['Cube Verified', 'Wind-Protected', 'Private Pool'],
    image: '/images/image3.jpg',
  },
]

export function StaySection() {
  const [active, setActive] = useState('All')

  return (
    <section
      id="stay"
      className="bg-white py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#A6D5FA]/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0a3d5c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0a3d5c]" />
            Stay
          </span>
          <h2 className="font-heading mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl lg:text-5xl">
            Find Your Sanctuary
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 md:text-lg">
            Boutique Hotels, Private Villas, and Heritage Homes
          </p>
        </div>

        <div className="relative mt-10">
          <div className="scrollbar-hide -mx-4 flex justify-start gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:justify-center md:overflow-visible md:px-0">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  active === f
                    ? 'bg-[#A6D5FA] text-neutral-900'
                    : 'text-neutral-800 hover:bg-slate-100'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {properties.map((p) => (
            <article
              key={p.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="aspect-[4/3] w-full object-cover"
                />
                <button
                  type="button"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                  aria-label="Save property"
                >
                  <Heart className="h-5 w-5 text-neutral-900" strokeWidth={1.75} />
                </button>
              </div>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-neutral-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    {p.locationIcon === 'pin' ? (
                      <MapPin className="h-4 w-4 text-[#31A8FF]" />
                    ) : (
                      <Bed className="h-4 w-4 text-[#31A8FF]" />
                    )}
                    {p.location}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    ★ {p.rating}{' '}
                    <span className="font-normal text-slate-500">
                      ({p.reviews})
                    </span>
                  </span>
                </div>
                <h3 className="font-heading mt-3 text-xl font-semibold text-neutral-900 md:text-2xl">
                  {p.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600 md:text-sm">
                  <span className="flex items-center gap-1.5">
                    <Bed className="h-4 w-4" />2 Beds
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    4 Guests
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Wifi className="h-4 w-4" />
                    Wi-Fi
                  </span>
                  <span className="flex items-center gap-1.5">
                    <ParkingCircle className="h-4 w-4" />
                    Parking
                  </span>
                </div>
                <Link
                  to={`/package/${p.id}`}
                  className="mt-6 block w-full rounded-xl bg-[#31A8FF] py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#1e96eb] hover:shadow-lg"
                >
                  Explore Now
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
