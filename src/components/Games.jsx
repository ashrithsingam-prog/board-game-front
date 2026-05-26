import { useState, useEffect } from 'react';
import { Users, Clock, Star, RefreshCw, Dice5 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const tagColors = {
  Strategy: 'from-blue-500/20 to-blue-600/20 text-blue-300 border-blue-500/30',
  Classic: 'from-amber-500/20 to-amber-600/20 text-amber-300 border-amber-500/30',
  Family: 'from-green-500/20 to-green-600/20 text-green-300 border-green-500/30',
  Party: 'from-pink-500/20 to-pink-600/20 text-pink-300 border-pink-500/30',
  Word: 'from-purple-500/20 to-purple-600/20 text-purple-300 border-purple-500/30',
};

const defaultTagColor = 'from-gray-500/20 to-gray-600/20 text-gray-300 border-gray-500/30';

/* Skeleton card shown while loading */
function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-white/10 rounded w-2/3" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-5/6" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-white/10 rounded w-20" />
          <div className="h-3 bg-white/10 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export default function Games() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchGames = async () => {
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:3000/api/games');
      if (!res.ok) throw new Error(`Failed to load games (${res.status})`);
      const data = await res.json();
      setGames(Array.isArray(data) ? data : data.games ?? []);
    } catch (err) {
      setError(err.message || 'Could not load games.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <section id="games" className="relative py-24 sm:py-32" ref={ref}>
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-accent-purple/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-amber/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-accent-amber text-sm font-semibold tracking-widest uppercase">
            Our Collection
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Popular <span className="gradient-text">Games</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose from our curated library of 500+ board games, from timeless classics to modern masterpieces.
          </p>
          <div className="section-divider w-24 mx-auto mt-8" />
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center mb-10">
            <p className="text-red-400 text-sm mb-4">{error}</p>
            <button
              onClick={fetchGames}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-accent-amber/30 hover:text-accent-amber transition-all duration-300"
            >
              <RefreshCw size={14} />
              Try Again
            </button>
          </div>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Games Grid */}
        {!isLoading && !error && games.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {games.map((game, index) => (
              <div
                key={game._id || game.id || index}
                className={`glass-card rounded-2xl overflow-hidden group ${
                  isInView ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden bg-dark-700">
                  {game.image ? (
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Dice5 size={48} className="text-white/10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-800 via-transparent to-transparent" />

                  {/* Tag */}
                  {game.tag && (
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r border ${
                          tagColors[game.tag] || defaultTagColor
                        }`}
                      >
                        {game.tag}
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  {game.rating != null && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 glass px-2.5 py-1 rounded-full">
                      <Star size={12} className="text-accent-amber fill-accent-amber" />
                      <span className="text-xs font-semibold text-white">{game.rating}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent-amber transition-colors duration-300">
                    {game.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                    {game.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    {game.players && (
                      <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-accent-amber/70" />
                        <span>{game.players} Players</span>
                      </div>
                    )}
                    {game.time && (
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-accent-purple/70" />
                        <span>{game.time}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && games.length === 0 && (
          <div className="text-center py-16">
            <Dice5 size={48} className="text-white/10 mx-auto mb-4" />
            <p className="text-gray-500 text-sm">No games available right now — check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
