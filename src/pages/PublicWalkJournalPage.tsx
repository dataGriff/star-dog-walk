import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { walksAPI } from '../services/api';
import { MapPin, Calendar, Clock, Camera, Star, Heart } from 'lucide-react';

const PublicWalkJournalPage: React.FC = () => {
  const { walkId } = useParams();

  const [walkData, setWalkData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWalk = async () => {
      if (!walkId) return;
      
      try {
        const data = await walksAPI.getPublic(walkId);
        setWalkData(data);
      } catch (err) {
        setError('Walk not found or not available for public viewing');
      } finally {
        setLoading(false);
      }
    };

    loadWalk();
  }, [walkId]);

  const weatherEmoji = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    windy: '💨'
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-emerald-600" />
                <h1 className="ml-2 text-xl font-bold text-slate-900">
                  Star<span className="text-emerald-600">dog</span>walker Cardiff
                </h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !walkData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MapPin className="h-8 w-8 text-emerald-600" />
                <h1 className="ml-2 text-xl font-bold text-slate-900">
                  Star<span className="text-emerald-600">dog</span>walker Cardiff
                </h1>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-slate-900 mb-4">Walk Journal Not Found</h1>
            <p className="text-slate-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MapPin className="h-8 w-8 text-emerald-600" />
              <h1 className="ml-2 text-xl font-bold text-slate-900">
                Star<span className="text-emerald-600">dog</span>walker Cardiff
              </h1>
            </div>
            <div className="text-sm text-slate-600">
              Splott & Adamsdown, Cardiff
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* SEO-friendly title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {walkData.dog?.name}'s Walk Journal - {walkData.date}
          </h1>
          <p className="text-lg text-slate-600">
            Professional dog walking in Splott & Adamsdown, Cardiff
          </p>
        </div>

        {/* Walk Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{walkData.dog?.name}</h2>
                <p className="text-slate-600">{walkData.dog?.breed}</p>
                <p className="text-sm text-emerald-600 font-medium">Walked by Sarah Jenkins</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center text-yellow-400 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-sm text-slate-600">Owner Rating</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
            <div className="text-center">
              <Calendar className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <div className="font-medium text-slate-900">{walkData.date}</div>
              <div className="text-xs text-slate-600">Date</div>
            </div>
            <div className="text-center">
              <Clock className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <div className="font-medium text-slate-900">{walkData.startTime} - {walkData.endTime}</div>
              <div className="text-xs text-slate-600">Duration</div>
            </div>
            <div className="text-center">
              <MapPin className="h-5 w-5 text-slate-600 mx-auto mb-1" />
              <div className="font-medium text-slate-900">{walkData.route}</div>
              <div className="text-xs text-slate-600">Route</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">{weatherEmoji[walkData.weather as keyof typeof weatherEmoji]}</div>
              <div className="font-medium text-slate-900 capitalize">{walkData.weather}</div>
              <div className="text-xs text-slate-600">Weather</div>
            </div>
          </div>
        </div>

        {/* Photos Gallery */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
            <Camera className="h-5 w-5 mr-2" />
            Walk Photos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {walkData.photos?.map((photo: string, index: number) => (
              <img
                key={index}
                src={photo}
                alt={`${walkData.dog} walk photo ${index + 1}`}
                alt={`${walkData.dog?.name} walk photo ${index + 1}`}
                className="w-full h-64 object-cover rounded-xl shadow-sm hover:shadow-md transition-shadow"
              />
            ))}
          </div>
        </div>

        {/* Walk Notes */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">Walk Journal</h3>
          <div className="prose max-w-none">
            <p className="text-slate-700 leading-relaxed text-lg">{walkData.notes}</p>
          </div>
          
          {walkData.behaviorNotes && (
            <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
              <h4 className="font-medium text-emerald-900 mb-2">Behavior Notes</h4>
              <p className="text-emerald-800">{walkData.behaviorNotes}</p>
            </div>
          )}
        </div>

        {/* Owner Response */}
        {walkData.ownerResponse && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Owner's Response</h3>
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-blue-900 italic">"{walkData.ownerResponse}"</p>
            </div>
          </div>
        )}

        {/* Local SEO Content */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-emerald-900 mb-4">
            Professional Dog Walking in Splott & Adamsdown
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-emerald-800">
            <div>
              <h4 className="font-medium mb-2">Why Choose Stardogwalker Cardiff?</h4>
              <ul className="text-sm space-y-1">
                <li>• Local expertise in Splott & Adamsdown areas</li>
                <li>• Detailed walk journals with photos</li>
                <li>• Trusted, insured professional service</li>
                <li>• Personalized care for each dog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Service Areas</h4>
              <ul className="text-sm space-y-1">
                <li>• Splott Park and surrounding streets</li>
                <li>• Adamsdown residential areas</li>
                <li>• Taff Trail riverside walks</li>
                <li>• Local recreation grounds</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-emerald-200">
            <p className="text-sm text-emerald-700">
              <strong>Contact:</strong> hello@stardogwalker.com | +44 7123 456789
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="h-6 w-6 text-emerald-400" />
            <h4 className="ml-2 text-lg font-semibold">Stardogwalker Cardiff</h4>
          </div>
          <p className="text-slate-300 mb-2">
            Professional dog walking services in Splott & Adamsdown, Cardiff
          </p>
          <p className="text-slate-400 text-sm">
            &copy; 2024 Stardogwalker Cardiff. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicWalkJournalPage;