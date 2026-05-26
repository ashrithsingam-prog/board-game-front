import { useState, useEffect } from 'react';
import { Star, Quote, RefreshCw } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const avatarColors = [
  'from-pink-500 to-rose-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-purple-500 to-violet-600',
  'from-cyan-500 to-sky-600',
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={star <= rating ? 'text-accent-amber fill-accent-amber' : 'text-gray-600'}
        />
      ))}
    </div>
  );
}

/* Skeleton card shown while loading */
function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 animate-pulse">
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-3.5 h-3.5 rounded-full bg-white/10" />
        ))}
      </div>
      <div className="space-y-2 mb-6">
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="h-3 bg-white/10 rounded w-4/6" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white/10" />
        <div className="space-y-1.5">
          <div className="h-3 bg-white/10 rounded w-24" />
          <div className="h-2.5 bg-white/10 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:3000/api/reviews');
      if (!res.ok) throw new Error(`Failed to load reviews (${res.status})`);
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.reviews ?? []);
    } catch (err) {
      setError(err.message || 'Could not load reviews.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="relative py-24 sm:py-32" ref={ref}>
      <div className="absolute top-0 right-0 w-80 h-80 bg-accent-purple/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-amber/5 rounded-full blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-accent-amber text-sm font-semibold tracking-widest uppercase">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            What Our <span className="gradient-text">Guests Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Don't just take our word for it — hear from the adventurers who've gathered around our tables.
          </p>
          <div className="section-divider w-24 mx-auto mt-8" />
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-10">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchReviews}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-accent-amber/30 hover:text-accent-amber transition-all duration-300"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Reviews Grid */}
        {!isLoading && !error && reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={review._id || review.id || index}
                className={`glass-card rounded-2xl p-6 relative ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote icon */}
                <Quote size={40} className="absolute top-4 right-4 text-white/5" />

                {/* Stars */}
                <StarRating rating={review.rating ?? 5} />

                {/* Review text */}
                <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">
                  "{review.text || review.review || review.comment || ''}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                      avatarColors[index % avatarColors.length]
                    } flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {review.avatar || getInitials(review.name)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{review.name}</p>
                    <p className="text-gray-500 text-xs">{review.date || ''}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && reviews.length === 0 && (
          <p className="text-center text-gray-500 text-sm">No reviews yet — be the first!</p>
        )}
      </div>
    </section>
  );
}
