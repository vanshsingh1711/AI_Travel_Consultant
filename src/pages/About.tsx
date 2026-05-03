import { PageHeader } from '../components/PageHeader'

export function About() {
  return (
    <div>
      <PageHeader
        title="About Us"
        subtitle="We believe in traveling light, smart, and with purpose. Our AI-powered consultants craft the perfect journey tailored to your unique preferences."
      />
      
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#A6D5FA]/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0a3d5c]">
                Our Story
              </span>
              <h2 className="font-heading mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl">
                Redefining the modern travel experience
              </h2>
              <p className="mt-6 text-slate-600 leading-relaxed text-lg">
                Founded with a vision to make travel planning effortless, TravelLIGHT combines the expertise of seasoned travel agents with cutting-edge AI technology. We scour the globe for the finest boutique hotels, authentic local experiences, and hidden gems so you don't have to.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed text-lg">
                Our curated marketplace is designed for the modern traveler who values quality over quantity, experiences over possessions, and a seamless journey from start to finish.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/heroimage0.jpg" alt="Travel" className="rounded-2xl aspect-[4/5] object-cover mt-8" />
              <img src="/images/heroimage9.jpg" alt="Travel" className="rounded-2xl aspect-[4/5] object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
