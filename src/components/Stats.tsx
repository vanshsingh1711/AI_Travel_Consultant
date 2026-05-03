import { Plane } from 'lucide-react'

const stats = [
  { value: '12', label: 'Years Experience' },
  { value: '95%', label: 'Retention Rate' },
  { value: '8k', label: 'Tour Completed' },
  { value: '19k', label: 'Happy Travelers' },
]

function DecoBalloon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M24 4C14 4 6 14 6 26c0 12 10 22 18 30 2 2 4 2 6 0 8-8 18-18 18-30C48 14 40 4 30 4h-6z"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
      <line
        x1="24"
        y1="56"
        x2="24"
        y2="62"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.35"
      />
    </svg>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-[#f0f7fb] py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 text-[#7ec8e8]"
        aria-hidden
      >
        <Plane className="absolute left-[8%] top-[12%] h-10 w-10 rotate-12 opacity-25" />
        <Plane className="absolute right-[12%] top-[18%] h-8 w-8 -rotate-6 opacity-20" />
        <DecoBalloon className="absolute left-[15%] bottom-[20%] h-14 w-10 opacity-25" />
        <DecoBalloon className="absolute right-[20%] bottom-[12%] h-12 w-9 opacity-20" />
        <svg
          className="absolute bottom-[18%] right-[8%] h-8 w-8 opacity-20"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 4 L28 16 L16 28 L4 16 Z"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-wrap items-end justify-center gap-8 px-4 md:gap-10 lg:gap-14">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`relative flex flex-col items-center ${
              i % 2 === 0 ? 'md:translate-y-6' : 'md:-translate-y-4'
            }`}
          >
            <div className="relative flex h-44 w-44 items-center justify-center md:h-48 md:w-48">
              <div className="absolute inset-0 rounded-full border-2 border-[#b8dff5]/90" />
              <span
                className="absolute right-[14%] top-[72%] h-2 w-2 rounded-full bg-[#7ec8e8]"
                aria-hidden
              />
              <div className="relative z-10 flex h-[68%] w-[68%] flex-col items-center justify-center rounded-full bg-[#b8dff5] text-center shadow-inner">
                <p className="font-heading text-3xl font-bold text-neutral-900 md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 max-w-[100px] text-center text-xs leading-snug text-neutral-800 md:text-sm">
                  {s.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
