import { PageHeader } from '../components/PageHeader'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: "How does the AI consultant work?",
    answer: "Our AI consultant uses advanced natural language processing to understand your preferences, budget, and travel style. It then queries our curated database of properties and experiences to build a tailored itinerary just for you."
  },
  {
    question: "Are the properties verified?",
    answer: "Yes! Every property listed on TravelLIGHT goes through a rigorous verification process. We ensure high standards for cleanliness, safety, and comfort, so you can book with confidence."
  },
  {
    question: "Can I cancel my booking?",
    answer: "Cancellation policies vary by property. However, most of our partners offer free cancellation up to 48 hours before your stay. Please review the specific terms during the checkout process."
  },
  {
    question: "Do you offer group bookings?",
    answer: "Absolutely. Our platform is equipped to handle bookings for large groups and corporate retreats. Simply specify the number of guests when consulting our AI, and it will find the best accommodations for your needs."
  },
  {
    question: "Is my payment information secure?",
    answer: "We use industry-standard encryption and partner with leading payment gateways to ensure your financial information is 100% secure. We never store your credit card details on our servers."
  }
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-slate-50 min-h-screen pb-20 md:pb-28">
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about booking, our AI consultant, and how we curate our properties."
      />
      
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-12 md:mt-20">
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div 
                key={idx} 
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen ? 'border-[#31A8FF] bg-white shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'}`}
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <span className="font-semibold text-neutral-900">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 text-slate-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
