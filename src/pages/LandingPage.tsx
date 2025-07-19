import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Camera, Calendar, Shield, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100">
      {/* Hero Section */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-emerald-600" />
              <h1 className="ml-2 text-xl font-bold text-slate-900">
                Star<span className="text-emerald-600">dog</span>walker Cardiff
              </h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 font-medium transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Trusted Dog Walking in{' '}
                <span className="text-emerald-600">Splott & Adamsdown</span>
              </h2>
              <p className="mt-6 text-xl text-slate-600 leading-relaxed">
                Professional, personal dog walking services in your local Cardiff neighborhood. 
                Book walks, track your pet's adventures, and enjoy peace of mind with our 
                detailed walk journals and real-time updates.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Book Your First Walk
                </Link>
                <button className="border-2 border-slate-300 text-slate-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-slate-400 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-emerald-200 to-orange-200 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Happy dog in Cardiff park"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-slate-900">5.0</span>
                  <span className="text-slate-600">Local Reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Why Choose Stardogwalker Cardiff?
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We're not just another dog walking service - we're your local neighbors who 
              understand the unique character of Splott and Adamsdown.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-200 transition-colors">
                <Calendar className="h-8 w-8 text-emerald-600" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Easy Scheduling</h4>
              <p className="text-slate-600">
                Book walks in seconds with our mobile-first app. See real-time availability 
                and get instant confirmations.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Camera className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Walk Journals</h4>
              <p className="text-slate-600">
                Receive detailed updates with photos from every walk. See where your dog 
                explored and how much fun they had.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-slate-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-slate-200 transition-colors">
                <Shield className="h-8 w-8 text-slate-600" />
              </div>
              <h4 className="text-xl font-semibold text-slate-900 mb-2">Trusted & Local</h4>
              <p className="text-slate-600">
                Fully insured, local dog walker who knows every park and pathway in 
                your neighborhood.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Areas Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Serving Your Local Area
            </h3>
            <p className="text-xl text-slate-600">
              We know the best spots for dogs in Splott and Adamsdown
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-2xl font-semibold text-slate-900 mb-4">Splott</h4>
              <p className="text-slate-600 mb-4">
                From Splott Park to the Taff Trail, your dog will love exploring the 
                green spaces and riverside walks that make this area special.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>• Splott Park - Safe off-leash areas</li>
                <li>• Taff Trail - Scenic riverside walks</li>
                <li>• Local streets - Familiar neighborhood routes</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-2xl font-semibold text-slate-900 mb-4">Adamsdown</h4>
              <p className="text-slate-600 mb-4">
                Tree-lined streets and close proximity to Roath Park make Adamsdown 
                perfect for varied and interesting dog walks.
              </p>
              <ul className="text-slate-600 space-y-2">
                <li>• Roath Park access - Large open spaces</li>
                <li>• Clifton Street - Quiet residential walks</li>
                <li>• Local recreation grounds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Give Your Dog the Best Walks in Cardiff?
          </h3>
          <p className="text-xl text-emerald-100 mb-8">
            Join our community of happy pets and satisfied owners in Splott and Adamsdown.
          </p>
          <Link
            to="/register"
            className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block"
          >
            Get Started Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-emerald-400" />
                <h4 className="ml-2 text-lg font-semibold">Stardogwalker Cardiff</h4>
              </div>
              <p className="text-slate-300">
                Professional dog walking services in Splott & Adamsdown, Cardiff.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Service Areas</h4>
              <ul className="text-slate-300 space-y-2">
                <li>Splott</li>
                <li>Adamsdown</li>
                <li>Central Cardiff</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-slate-300">hello@stardogwalker.com</p>
              <p className="text-slate-300">+44 7123 456789</p>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Stardogwalker Cardiff. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;