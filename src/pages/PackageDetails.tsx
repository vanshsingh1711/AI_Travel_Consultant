import { useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Bed, Calendar, Check, Coffee, Heart, MapPin, ParkingCircle, Star, Users, Utensils, Waves, Wifi } from 'lucide-react'

// Mock Data
const packageData: Record<string, any> = {
  'villa-aegean-blue': {
    title: 'Villa Aegean Blue',
    location: 'Old Town, Chora, Greece',
    rating: 4.9,
    reviews: 124,
    price: '₹25,000',
    guests: 6,
    bedrooms: 3,
    image: '/images/heroimage0.jpg',
    description: "Perched high above the Aegean Sea, Villa Aegean Blue offers an unparalleled blend of traditional Cycladic architecture and modern luxury. Wake up to sweeping ocean views, enjoy your morning coffee on the sun-drenched terrace, and unwind in the private infinity pool as the sun dips below the horizon. This verified sanctuary is perfectly situated just minutes away from the vibrant old town, providing both serene isolation and exciting local culture.",
    amenities: [
      { name: 'Private Infinity Pool', icon: <Waves className="h-5 w-5" /> },
      { name: 'High-speed Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
      { name: '3 Bedrooms', icon: <Bed className="h-5 w-5" /> },
      { name: 'Fully Equipped Kitchen', icon: <Utensils className="h-5 w-5" /> },
      { name: 'Free Parking', icon: <ParkingCircle className="h-5 w-5" /> },
      { name: 'Breakfast Included', icon: <Coffee className="h-5 w-5" /> },
    ]
  },
  'naxos-boutique-suites': {
    title: 'Naxos Boutique Suites',
    location: 'Naxos Town, Greece',
    rating: 4.8,
    reviews: 98,
    price: '₹18,500',
    guests: 4,
    bedrooms: 2,
    image: '/images/image2.jpg',
    description: "Step into the charm of heritage living at Naxos Boutique Suites. Located in the heart of the bustling town center, these suites are beautifully restored to maintain their historical integrity while providing state-of-the-art comforts. Perfect for couples or small families, the property features a lush central courtyard, bespoke local furnishings, and immediate access to the island's best dining and shopping experiences.",
    amenities: [
      { name: 'Courtyard Garden', icon: <Waves className="h-5 w-5" /> },
      { name: 'High-speed Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
      { name: '2 Bedrooms', icon: <Bed className="h-5 w-5" /> },
      { name: 'Mini-bar', icon: <Utensils className="h-5 w-5" /> },
      { name: 'Valet Parking', icon: <ParkingCircle className="h-5 w-5" /> },
    ]
  },
  'cycladic-hideaway': {
    title: 'Cycladic Hideaway',
    location: 'Plaka Beach, Naxos',
    rating: 5.0,
    reviews: 215,
    price: '₹32,000',
    guests: 8,
    bedrooms: 4,
    image: '/images/image3.jpg',
    description: "The ultimate private retreat. Cycladic Hideaway is a sprawling beachfront estate designed for complete relaxation. Sheltered from the wind and boasting direct access to pristine white sands, this property is the crown jewel of our collection. It features a massive outdoor entertaining area, a private chef upon request, and breathtaking panoramic views of the crystal-clear waters.",
    amenities: [
      { name: 'Private Pool & Spa', icon: <Waves className="h-5 w-5" /> },
      { name: 'High-speed Wi-Fi', icon: <Wifi className="h-5 w-5" /> },
      { name: '4 Bedrooms', icon: <Bed className="h-5 w-5" /> },
      { name: 'Chef Kitchen', icon: <Utensils className="h-5 w-5" /> },
      { name: 'Gated Parking', icon: <ParkingCircle className="h-5 w-5" /> },
      { name: 'Breakfast Included', icon: <Coffee className="h-5 w-5" /> },
    ]
  }
}

export function PackageDetails() {
  const { id } = useParams<{ id: string }>()
  
  // Fallback to the first one if ID is not found for demo purposes
  const pkg = packageData[id || ''] || packageData['villa-aegean-blue']

  return (
    <div className="bg-[#fcfdfd] min-h-screen">
      {/* Hero Section with fade into content */}
      <div className="relative h-[60vh] min-h-[500px] w-full">
        <div className="absolute top-6 left-0 right-0 z-50">
          <Navbar isTransparent={true} />
        </div>
        
        {/* Background Image & Gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pkg.image})` }}
        />
        {/* Gradient overlay that fades smoothly into the background color at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#fcfdfd] via-[#fcfdfd]/20 to-black/40" />

        {/* Floating actions */}
        <div className="absolute bottom-8 right-8 z-20 flex gap-3">
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white hover:text-rose-500 shadow-sm">
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-20 -mt-24 md:-mt-32 pb-24">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-16">
          
          {/* Left Content Area */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            
            {/* Header Info */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 mb-4">
                <span className="flex items-center gap-1 text-amber-500 bg-amber-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 fill-amber-500" />
                  {pkg.rating} ({pkg.reviews} reviews)
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#31A8FF]" />
                  {pkg.location}
                </span>
              </div>
              
              <h1 className="font-heading text-4xl font-bold text-neutral-900 md:text-5xl lg:text-6xl leading-tight">
                {pkg.title}
              </h1>

              <div className="mt-8 flex flex-wrap gap-6 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7fb] text-[#31A8FF]">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Capacity</p>
                    <p className="font-medium text-slate-800">{pkg.guests} Guests</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f7fb] text-[#31A8FF]">
                    <Bed className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Layout</p>
                    <p className="font-medium text-slate-800">{pkg.bedrooms} Bedrooms</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">About this sanctuary</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {pkg.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="rounded-3xl bg-white p-8 shadow-sm border border-slate-100">
              <h2 className="font-heading text-2xl font-bold text-neutral-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-y-6 sm:grid-cols-3">
                {pkg.amenities.map((amenity: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 text-slate-700">
                    <span className="text-[#31A8FF]">{amenity.icon}</span>
                    <span className="font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar - Sticky Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-end gap-2 mb-6 border-b border-slate-100 pb-6">
                <span className="text-3xl font-bold text-neutral-900">{pkg.price}</span>
                <span className="text-slate-500 mb-1 font-medium">/ night</span>
              </div>
              
              <div className="flex flex-col gap-4 mb-8">
                <div className="rounded-2xl border border-slate-200 p-1 relative">
                  <div className="grid grid-cols-2 divide-x divide-slate-200">
                    <div className="p-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Check-in</label>
                      <input type="date" className="w-full outline-none text-sm font-semibold mt-1 bg-transparent text-slate-800" defaultValue="2026-10-15" />
                    </div>
                    <div className="p-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Check-out</label>
                      <input type="date" className="w-full outline-none text-sm font-semibold mt-1 bg-transparent text-slate-800" defaultValue="2026-10-22" />
                    </div>
                  </div>
                  <div className="border-t border-slate-200 p-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Guests</label>
                    <select className="w-full outline-none text-sm font-semibold mt-1 bg-transparent text-slate-800 appearance-none">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                    </select>
                  </div>
                </div>
              </div>

              <button className="w-full rounded-2xl bg-[#31A8FF] py-4 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#1e96eb] hover:shadow-lg">
                Book with AI Consultant
              </button>

              <div className="mt-6 flex flex-col gap-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span className="underline">₹25,000 x 7 nights</span>
                  <span className="font-semibold text-slate-800">₹1,75,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span className="font-semibold text-slate-800">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">TravelLIGHT service fee</span>
                  <span className="font-semibold text-slate-800">₹12,000</span>
                </div>
                <div className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-base font-bold text-neutral-900">
                  <span>Total (INR)</span>
                  <span>₹1,92,000</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
