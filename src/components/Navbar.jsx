import { useState, useEffect } from 'react';
import { Menu, X, Dice5 } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Games', href: '#games' },
  { name: 'Book', href: '#booking' },
  { name: 'Reviews', href: '#reviews' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass shadow-lg shadow-black/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Dice5
                size={36}
                className="text-accent-amber group-hover:text-accent-amber-light transition-colors duration-300"
              />
              <div className="absolute inset-0 bg-accent-amber/20 blur-xl rounded-full group-hover:bg-accent-amber/40 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold font-heading tracking-wider text-white">
                Board Game Night
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent-amber/70">
                Café & Lounge
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-accent-amber transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-accent-amber to-accent-purple group-hover:w-3/4 transition-all duration-300" />
              </a>
            ))}
            <a
              href="#booking"
              className="ml-4 px-6 py-2.5 bg-gradient-to-r from-accent-amber to-amber-600 text-dark-900 font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-accent-amber/30 hover:scale-105 transition-all duration-300"
            >
              Book a Table
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-accent-amber transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass rounded-2xl p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-accent-amber hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setIsOpen(false)}
              className="block mt-2 px-4 py-3 bg-gradient-to-r from-accent-amber to-amber-600 text-dark-900 font-semibold text-sm rounded-xl text-center"
            >
              Book a Table
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
