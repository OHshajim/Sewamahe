import Navigation from '@/components/Navbar';
import Hero from '@/pages/home/components/Hero';
import Footer from '@/components/Footer';
import Features from './components/Features';
import Rules from './components/Rules';
import Payment from './components/Payment';

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Rules/>
      <Payment/>
      <Footer/>
    </div>
  );
};