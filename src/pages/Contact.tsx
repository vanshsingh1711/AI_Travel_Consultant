import { PageHeader } from '../components/PageHeader'
import { Mail, MapPin, Phone } from 'lucide-react'

export function Contact() {
  return (
    <div>
      <PageHeader
        title="Contact Us"
        subtitle="Have questions about your next trip? Our team is here to help you plan the perfect getaway."
      />
      
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            
            {/* Contact Form */}
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm sm:p-10">
              <h3 className="font-heading text-2xl font-semibold text-neutral-900">Send a Message</h3>
              <form className="mt-8 flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">First Name</label>
                    <input type="text" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#31A8FF] focus:ring-1 focus:ring-[#31A8FF]" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">Last Name</label>
                    <input type="text" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#31A8FF] focus:ring-1 focus:ring-[#31A8FF]" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Email</label>
                  <input type="email" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#31A8FF] focus:ring-1 focus:ring-[#31A8FF]" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Message</label>
                  <textarea rows={4} className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#31A8FF] focus:ring-1 focus:ring-[#31A8FF]" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="mt-2 rounded-xl bg-[#31A8FF] px-8 py-3.5 font-bold text-white transition hover:bg-[#1e96eb]">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <h2 className="font-heading text-3xl font-semibold text-neutral-900">Get in touch</h2>
              <p className="mt-4 text-lg text-slate-600">
                Whether you want to curate a custom itinerary, ask about our AI consultant features, or simply say hello, we'd love to hear from you.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f7fb] text-[#31A8FF]">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">Email</h4>
                    <p className="mt-1 text-slate-600">hello@travellight.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f7fb] text-[#31A8FF]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">Phone</h4>
                    <p className="mt-1 text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0f7fb] text-[#31A8FF]">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">Office</h4>
                    <p className="mt-1 text-slate-600">123 TravelLight Ave, Suite 100<br />San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
