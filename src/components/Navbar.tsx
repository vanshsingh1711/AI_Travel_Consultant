import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Support', path: '/support' },
  { name: 'Contact', path: '/contact' },
]

export function Navbar({ isTransparent = false }: { isTransparent?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navClasses = isTransparent
    ? 'border border-white/25 bg-white/15 text-white shadow-lg backdrop-blur-xl'
    : 'border border-slate-200 bg-white/90 text-slate-900 shadow-sm backdrop-blur-xl'

  const linkClasses = isTransparent
    ? 'text-white/95 hover:text-white'
    : 'text-slate-600 hover:text-[#31A8FF]'

  const menuBgClasses = isTransparent
    ? 'border border-white/25 bg-white/15 text-white backdrop-blur-xl'
    : 'border border-slate-200 bg-white text-slate-900 shadow-lg'

  return (
    <div className={`relative z-50 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${isTransparent ? '' : 'pt-6'}`}>
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full px-4 py-3 md:px-8 ${navClasses}`}
        aria-label="Primary"
      >
        <Link to="/" className={`flex items-center gap-3 ${isTransparent ? 'text-white' : 'text-slate-900'}`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#0a1628] text-sm font-bold text-white">
            TL
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight">
            TravelLIGHT
          </span>
        </Link>
        <ul className={`hidden items-center gap-7 text-sm font-medium lg:flex ${linkClasses}`}>
          {navLinks.map((l) => (
            <li key={l.name}>
              <Link to={l.path} className="transition">
                {l.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl lg:hidden ${
              isTransparent
                ? 'border border-white/30 bg-white/10 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-900'
            }`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <a
            href="/#stay"
            className="rounded-xl bg-[#31A8FF] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1e96eb] sm:px-5"
          >
            Book Now
          </a>
        </div>
      </nav>
      {menuOpen ? (
        <div className={`mt-3 rounded-2xl p-4 lg:hidden ${menuBgClasses}`}>
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((l) => (
              <li key={l.name}>
                <Link
                  to={l.path}
                  className="block py-1"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
