import { PlaceholderImage } from './PlaceholderImage'

export function Gallery() {
  return (
    <section className="bg-[#E6F4FA] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#b8dff5] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0a3d5c]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0a3d5c]" />
            Gallery
          </span>
          <h2 className="font-heading mx-auto mt-4 max-w-3xl text-3xl font-semibold leading-tight text-neutral-900 md:text-4xl lg:text-5xl">
            Make Your Tour More Pleasure
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-4 md:flex-row md:items-stretch">
          {/* Col 1 — single landscape, vertically centered */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            <img src="public/images/heroimage.jpg" alt="…" className="aspect-[4/3] w-full rounded-2xl md:rounded-[1.25rem]" />
          </div>

          {/* Col 2 — two stacked */}
          <div className="flex flex-1 flex-col gap-4">
          <img src="public/images/image2.jpg" alt="…" className="aspect-video w-full rounded-2xl md:rounded-[1.25rem]" />
            <img src="public/images/heroimage9.jpg" alt="…" className="aspect-video w-full rounded-2xl md:rounded-[1.25rem]" />
          </div>

          {/* Col 3 — tall center */}
          <div className="flex flex-[1.15] flex-col">
           
            <img src="public/images/image5.jpg" alt="…" className="min-h-[280px] w-full flex-1 rounded-2xl md:min-h-[420px] md:rounded-[1.25rem]" />
          </div>

          {/* Col 4 — two stacked */}
          <div className="flex flex-1 flex-col gap-4">
          <img src="public/images/image3.jpg" alt="…" className="aspect-video w-full rounded-2xl md:rounded-[1.25rem]" />
            <img src="public/images/image4.jpg" alt="…" className="aspect-video w-full rounded-2xl md:rounded-[1.25rem]" />
          </div>

          {/* Col 5 — single landscape, centered */}
          <div className="flex flex-1 flex-col justify-center gap-4">
            <img src="public/images/heroimage0.jpg" alt="…" className="aspect-[4/3] w-full rounded-2xl md:rounded-[1.25rem]" />
          </div>
        </div>
      </div>
    </section>
  )
}
