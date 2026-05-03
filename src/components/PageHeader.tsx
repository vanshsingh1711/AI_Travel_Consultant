import { Navbar } from '../components/Navbar'

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="relative bg-[#f0f7fb] pt-6 pb-20 md:pb-28">
      <div className="absolute top-6 left-0 right-0 z-50">
        <Navbar isTransparent={false} />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center pt-24 md:pt-32">
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-wide text-[#00233D] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  )
}
