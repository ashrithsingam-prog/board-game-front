import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.png"
          alt="Board Game Night Cafe interior"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/80 via-dark-900/60 to-dark-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/50 to-transparent" />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-amber/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Floating dice decorations */}
      <div className="absolute top-20 right-20 text-accent-amber/20 animate-float hidden lg:block">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="#0a0a0f" />
          <circle cx="15.5" cy="8.5" r="1.5" fill="#0a0a0f" />
          <circle cx="12" cy="12" r="1.5" fill="#0a0a0f" />
          <circle cx="8.5" cy="15.5" r="1.5" fill="#0a0a0f" />
          <circle cx="15.5" cy="15.5" r="1.5" fill="#0a0a0f" />
        </svg>
      </div>
      <div className="absolute bottom-32 left-16 text-accent-purple/15 animate-float hidden lg:block" style={{ animationDelay: '1.5s' }}>
        <svg width="45" height="45" viewBox="0 0 24 24" fill="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="#0a0a0f" />
          <circle cx="15.5" cy="15.5" r="1.5" fill="#0a0a0f" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-8 border border-accent-amber/20">
            <Sparkles size={14} className="text-accent-amber" />
            <span className="text-xs font-medium tracking-widest uppercase text-accent-amber/90">
              Est. 2018 · Open Late · 500+ Games
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="block text-white">Board Game</span>
            <span className="block gradient-text mt-2">Night Café</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Where strategy meets espresso. Gather your party, roll the dice, and
            enjoy craft drinks in our cozy gaming lounge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              id="hero-book-table"
              href="#booking"
              className="group relative px-10 py-4 bg-gradient-to-r from-accent-amber to-amber-600 text-dark-900 font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent-amber/30 hover:scale-105"
            >
              <span className="relative z-10">Book a Table</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-accent-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              id="hero-explore-games"
              href="#games"
              className="px-10 py-4 border border-white/20 text-white font-semibold text-lg rounded-full hover:bg-white/10 hover:border-accent-amber/40 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Games
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#games" className="text-white/40 hover:text-accent-amber transition-colors">
          <ChevronDown size={28} />
        </a>
      </div>
    </section>
  );
}
