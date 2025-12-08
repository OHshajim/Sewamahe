import { useState } from 'react';
import { Menu, X, Video, Shield, Clock, DollarSign, Users, CheckCircle, ArrowRight, Star, MessageSquare, Zap, Globe, CreditCard } from 'lucide-react';

export const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Experts', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Pricing', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const features = [
    {
      icon: <Video className="h-8 w-8" />,
      title: 'HD Video Calls',
      description: 'Crystal-clear, secure video consultations with industry experts',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Private',
      description: 'End-to-end encryption for all your conversations',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Instant Connect',
      description: 'Get matched with experts in less than 60 seconds',
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Flexible Payments',
      description: 'Pay per minute or choose package deals',
    },
  ];

  const rules = [
    'All experts are verified professionals',
    '24/7 customer support available',
    'Money-back guarantee if unsatisfied',
    'Secure payment processing',
    'Session recordings available upon request',
  ];

  const paymentOptions = [
    { icon: <CreditCard />, name: 'Credit/Debit Cards' },
    { icon: <Globe />, name: 'Digital Wallets' },
    { icon: <DollarSign />, name: 'Bank Transfer' },
    { icon: <Zap />, name: 'Cryptocurrency' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <MessageSquare className="h-8 w-8 text-black" />
                <span className="ml-2 text-2xl font-bold text-black">Sewamahe</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-black px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:block">
              <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-black"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-black block px-3 py-2 text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full mt-4 bg-black text-white px-6 py-3 rounded-lg font-medium">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect with{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Experts
              </span>{' '}
              Instantly
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Secure, high-quality video consultations with verified professionals across all industries. 
              Get the guidance you need, when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Start Free Consultation <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium text-lg hover:border-black transition-colors">
                Browse Experts
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <div className="text-gray-600 mt-2">Verified Experts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-gray-600 mt-2">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">98%</div>
              <div className="text-gray-600 mt-2">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">60s</div>
              <div className="text-gray-600 mt-2">Avg. Connect Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Sewamahe?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're revolutionizing how people access professional expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-black rounded-lg flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple & Transparent Process
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get expert advice in just three easy steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Choose Expert</h3>
              <p className="text-gray-600">
                Browse our directory of verified professionals and select based on ratings, expertise, and availability
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Book & Pay</h3>
              <p className="text-gray-600">
                Select your preferred time slot and make secure payment with our flexible options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect & Learn</h3>
              <p className="text-gray-600">
                Join the secure HD video call and get the expert guidance you need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Guidelines */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Commitment to Quality
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We ensure the best experience for both users and consultants
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Flexible Payment Options
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Choose from multiple secure payment methods
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {paymentOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl p-6 text-center hover:bg-gray-800 transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-4 text-white">
                  {option.icon}
                </div>
                <div className="font-medium">{option.name}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-300 mb-6">
              Instant balance top-ups • No hidden fees • Secure transactions
            </p>
            <button className="bg-white text-black px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors">
              View Pricing Plans
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Connect with Experts?
          </h2>
          <p className="text-gray-300 text-xl mb-10">
            Join thousands who have found the guidance they need through Sewamahe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-3 rounded-lg font-medium text-lg hover:bg-gray-100 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-white/10 transition-colors">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-8 w-8" />
                <span className="ml-2 text-2xl font-bold">Sewamahe</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Connecting you with experts through secure, high-quality video consultations.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-lg mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Experts</a></li>
                  <li><a href="#" className="hover:text-white">Categories</a></li>
                  <li><a href="#" className="hover:text-white">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Careers</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                  <li><a href="#" className="hover:text-white">Terms</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Sewamahe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};