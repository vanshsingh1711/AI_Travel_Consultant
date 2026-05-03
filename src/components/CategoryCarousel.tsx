import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState } from 'react'
import { PlaceholderImage } from './PlaceholderImage'

const categories = [
  {
    num: '01',
    title: 'Varanasi',
    subtitle: 'City of Peace, India',
    tall: true,
  },
  {
    num: '02',
    title: 'Udaipur',
    subtitle: 'City of Lakes, India',
    tall: false,
  },
  {
    num: '03',
    title: 'Kyoto',
    subtitle: 'City of Culture, Japan',
    tall: true,
  },
  {
    num: '04',
    title: 'Switzerland',
    subtitle: 'Country in Europe',
    tall: false,
  },
  {
    num: '05',
    title: 'Nainital',
    subtitle: "City in Uttarakhand, India",
    tall: true,
  },
]

export function CategoryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      dragFree: true,
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  )
  const [selected, setSelected] = useState(0)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative -mt-1 bg-[#f6f7f9] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#A6D5FA]/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0a3d5c]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0a3d5c]" />
          Explore
        </span>
        <h2 className="font-heading mt-4 text-3xl font-semibold text-neutral-900 md:text-4xl lg:text-5xl">
          Explore by Category
        </h2>
      </div>

      <div className="mt-14 overflow-hidden pl-4 md:pl-8 lg:pl-[max(2rem,calc(50vw-40rem)))]">
        <div className="overflow-hidden pb-4" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {categories.map((c) => (
              <div
                key={c.num}
                className="min-w-0 shrink-0 basis-[72vw] sm:basis-[320px] md:basis-[300px] mr-6 md:mr-8"
              >
                <article
                  className={`flex flex-col ${c.tall ? 'md:pt-0' : 'md:pt-14'}`}
                >
                  <div
                    className={`overflow-hidden rounded-2xl md:rounded-[1.25rem] ${
                      c.tall ? 'h-[340px] md:h-[400px]' : 'h-[220px] md:h-[260px]'
                    }`}
                  >
                    <img src={`/images/category/${c.title.toLowerCase()}.jpg`} alt={c.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="mt-5 text-left">
                    <p className="text-sm font-medium text-slate-400">{c.num}</p>
                    <h3 className="mt-1 text-base font-bold uppercase tracking-wide text-neutral-900 md:text-lg">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500 md:text-sm">
                      {c.subtitle}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2 md:mt-8">
        {categories.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`h-2 rounded-full transition-all ${
              i === selected ? 'w-8 bg-[#31A8FF]' : 'w-2 bg-slate-300'
            }`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
