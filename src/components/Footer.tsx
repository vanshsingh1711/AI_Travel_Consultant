import { Link } from 'react-router-dom'

const websiteLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const securityLinks = [
  { name: 'FAQ', path: '/faq' },
  { name: 'Support', path: '/support' }
]

const contactLinks = [
  { name: 'Terms & Conditions', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Cookie Policy', path: '/cookies' },
]

export function Footer() {
  return (
    <footer className="relative text-white">
      <div className="relative -mt-px bg-[#f0f7fb]">
        <svg
          className="block h-[48px] w-full text-[#00233D] md:h-[64px]"
          viewBox="0 0 1440 56"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,28 C320,8 560,48 720,32 C920,12 1120,52 1440,24 L1440,56 L0,56 Z"
          />
        </svg>
      </div>
      <div className="bg-[#00233D] pb-2 pt-10 md:pt-16">
      <div className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <h3 className="text-sm font-semibold text-white">Website Page</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#8eb4c9]">
              {websiteLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.path} className="transition hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Security</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#8eb4c9]">
              {securityLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.path} className="transition hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-[#8eb4c9]">
              {contactLinks.map((l) => (
                <li key={l.name}>
                  <Link to={l.path} className="transition hover:text-white">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Subscribe Our Newsletter
            </h3>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-stretch"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="min-w-0 flex-1 rounded-xl border border-white/30 bg-[#001a2e] px-4 py-3 text-sm text-white placeholder:text-[#8eb4c9] focus:border-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#00233D] transition hover:bg-slate-100"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8eb4c9] text-sm text-[#8eb4c9] transition hover:border-white hover:text-white"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8eb4c9] text-sm text-[#8eb4c9] transition hover:border-white hover:text-white"
                aria-label="Instagram"
              >
                in
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#8eb4c9] text-xs font-semibold text-[#8eb4c9] transition hover:border-white hover:text-white"
                aria-label="YouTube"
              >
                ▶
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className="relative bg-[#00233D] mt-4 pb-6 pt-8 md:mt-8 md:pb-10">
        <p
          className="pointer-events-none select-none text-center font-heading text-[clamp(2.5rem,12vw,8rem)] font-semibold leading-none tracking-tight text-[#0a3349]"
          style={{
            textShadow:
              '1px 1px 0 rgba(255,255,255,0.06), -1px -1px 0 rgba(0,0,0,0.35)',
          }}
        >
          TRAVEL LIGHT
        </p>
      </div>
    </footer>
  )
}
