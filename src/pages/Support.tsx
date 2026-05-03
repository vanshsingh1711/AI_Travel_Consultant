import { PageHeader } from '../components/PageHeader'
import { BookOpen, CreditCard, LifeBuoy, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const supportCategories = [
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Managing Bookings",
    description: "Learn how to modify, cancel, or view your upcoming reservations."
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Payments & Refunds",
    description: "Information about payment methods, receipts, and our refund policy."
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Destination Guides",
    description: "Read curated guides for your next trip, prepared by our experts."
  },
  {
    icon: <LifeBuoy className="h-6 w-6" />,
    title: "Account & Security",
    description: "Manage your profile, reset passwords, and update security settings."
  }
]

export function Support() {
  return (
    <div>
      <PageHeader
        title="Help Center"
        subtitle="How can we help you today? Search our guides or browse categories below."
      />
      
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="mx-auto max-w-2xl text-center mb-16">
            <input 
              type="text" 
              placeholder="Search for articles, guides, or questions..." 
              className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-4 text-lg outline-none shadow-sm transition focus:border-[#31A8FF] focus:ring-2 focus:ring-[#31A8FF]/20"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {supportCategories.map((cat, idx) => (
              <a 
                key={idx} 
                href="#"
                className="group flex flex-col items-center text-center rounded-3xl border border-slate-100 bg-white p-8 transition hover:border-[#31A8FF]/30 hover:shadow-lg hover:shadow-[#31A8FF]/5"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0f7fb] text-[#31A8FF] transition group-hover:scale-110 group-hover:bg-[#31A8FF] group-hover:text-white">
                  {cat.icon}
                </div>
                <h3 className="font-heading text-xl font-semibold text-neutral-900">{cat.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{cat.description}</p>
              </a>
            ))}
          </div>

          <div className="mt-24 rounded-3xl bg-[#00233D] px-8 py-12 text-center md:px-12 md:py-16">
            <h2 className="font-heading text-3xl font-semibold text-white">Still need help?</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#8eb4c9]">
              If you couldn't find the answers you're looking for, our support team is available 24/7 to assist you with any inquiries.
            </p>
            <Link 
              to="/contact" 
              className="mt-8 inline-block rounded-xl bg-[#31A8FF] px-8 py-3.5 font-bold text-white transition hover:bg-[#1e96eb]"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}
