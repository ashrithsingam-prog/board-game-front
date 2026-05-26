import { useState } from 'react';
import { X } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const galleryItems = [
  {
    src: '/images/gallery-cafe.png',
    alt: 'Cozy cafe interior',
    caption: 'Our cozy gaming lounge',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: '/images/gallery-games.png',
    alt: 'Board game shelves',
    caption: '500+ games to choose from',
    span: '',
  },
  {
    src: '/images/gallery-drinks.png',
    alt: 'Craft cocktails',
    caption: 'Signature craft cocktails',
    span: '',
  },
  {
    src: '/images/gallery-food.png',
    alt: 'Gourmet food spread',
    caption: 'Artisan food & snacks',
    span: 'md:col-span-2',
  },
  {
    src: '/images/gallery-friends.png',
    alt: 'Friends playing board games',
    caption: 'Game night with friends',
    span: '',
  },
];

export default function Gallery() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="relative py-24 sm:py-32" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-accent-amber text-sm font-semibold tracking-widest uppercase">
            Take a Look
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Our <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Step inside our world — cozy corners, craft drinks, and unforgettable game nights.
          </p>
          <div className="section-divider w-24 mx-auto mt-8" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {galleryItems.map((item, index) => (
            <div
              key={item.src}
              onClick={() => setLightbox(item)}
              className={`relative group rounded-2xl overflow-hidden cursor-pointer ${item.span} ${
                isInView ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white font-semibold text-sm">{item.caption}</p>
              </div>
              {/* Border glow on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-accent-amber/30 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/90 backdrop-blur-xl p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full h-full object-contain rounded-2xl"
            />
            <p className="text-center text-white/80 mt-4 text-sm">{lightbox.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
