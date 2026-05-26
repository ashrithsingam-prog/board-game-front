import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Games from './components/Games';
import Booking from './components/Booking';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <Hero />
      <Games />
      <Booking />
      <Reviews />
      <Gallery />
      <Footer />
    </div>
  );
}
