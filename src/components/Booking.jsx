import { useState } from 'react';
import { Calendar, Users, Clock, Send, CheckCircle } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM',
  '8:00 PM', '9:00 PM', '10:00 PM',
];

export default function Booking() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    people: '2',
    date: '',
    time: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('http://127.0.0.1:3000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          people: formData.people,
          time: formData.time,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || `Booking failed (${res.status})`);
      }

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', people: '2', date: '', time: '' });
      }, 3000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking" className="relative py-24 sm:py-32" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-amber/5 rounded-full blur-[150px]" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="text-accent-amber text-sm font-semibold tracking-widest uppercase">
            Reserve Your Spot
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mt-3 mb-5">
            Book a <span className="gradient-text">Table</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Secure your gaming spot and we'll have your favorite games and snacks ready when you arrive.
          </p>
          <div className="section-divider w-24 mx-auto mt-8" />
        </div>

        {/* Booking Form */}
        <div
          className={`glass-card rounded-3xl p-8 sm:p-10 ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        >
          {isSubmitted ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                <CheckCircle size={40} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Booking Confirmed!</h3>
              <p className="text-gray-400">
                We'll have your table and games ready. See you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="booking-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <input
                      id="booking-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="w-full px-5 py-3.5 bg-dark-700/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-accent-amber/50 focus:ring-2 focus:ring-accent-amber/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Number of People */}
                <div>
                  <label htmlFor="booking-people" className="block text-sm font-medium text-gray-300 mb-2">
                    <Users size={14} className="inline mr-2 text-accent-amber/70" />
                    Number of People
                  </label>
                  <select
                    id="booking-people"
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                    className="w-full px-5 py-3.5 bg-dark-700/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-amber/50 focus:ring-2 focus:ring-accent-amber/20 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={n} className="bg-dark-700">
                        {n} {n === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label htmlFor="booking-date" className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar size={14} className="inline mr-2 text-accent-amber/70" />
                    Date
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-5 py-3.5 bg-dark-700/50 border border-white/10 rounded-xl text-white focus:outline-none focus:border-accent-amber/50 focus:ring-2 focus:ring-accent-amber/20 transition-all duration-300 cursor-pointer"
                  />
                </div>

                {/* Time Selector */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    <Clock size={14} className="inline mr-2 text-accent-amber/70" />
                    Select Time
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time: slot })}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                          formData.time === slot
                            ? 'bg-gradient-to-r from-accent-amber to-amber-600 text-dark-900 shadow-lg shadow-accent-amber/20'
                            : 'bg-dark-700/50 border border-white/10 text-gray-400 hover:border-accent-amber/30 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                id="booking-submit"
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 py-4 bg-gradient-to-r from-accent-amber to-amber-600 text-dark-900 font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-accent-amber/30 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <Send size={20} />
                )}
                {isLoading ? 'Booking...' : 'Book My Table'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
