import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { dogsAPI, walksAPI } from '../services/api';
import { Calendar, Clock, MapPin, Heart, Send } from 'lucide-react';

const BookWalkPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedDogId = searchParams.get('dogId');
  const isWalker = user?.role === 'walker';
  
  const [formData, setFormData] = useState({
    dogId: preselectedDogId || '',
    date: '',
    time: '',
    duration: '30',
    notes: '',
    pickupAddress: 'Splott Road, Cardiff CF24 2AA'
  });
  const [loading, setLoading] = useState(false);

  const [dogs, setDogs] = useState<any[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const loadDogs = async () => {
      try {
        const dogsData = await dogsAPI.getAll();
        setDogs(dogsData);
      } catch (error) {
        console.error('Failed to load dogs:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadDogs();
  }, []);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await walksAPI.create({
        dogId: formData.dogId,
        date: formData.date,
        startTime: formData.time,
        duration: parseInt(formData.duration),
        pickupAddress: formData.pickupAddress,
        specialNotes: formData.notes
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to create walk:', error);
      // You could add error handling here
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {isWalker ? 'Schedule a Walk' : 'Book a Walk'}
          </h1>
          <p className="text-slate-600 mt-2">
            {isWalker 
              ? 'Create a new walk appointment for a client dog'
              : 'Schedule a walk for your dog with Sarah'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
          {/* Dog Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              {isWalker ? 'Select Client Dog *' : 'Select Dog *'}
            </label>
            <div className="grid grid-cols-1 gap-3">
              {dogs.map((dog) => (
                <label
                  key={dog.id}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-colors ${
                    formData.dogId === dog.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="dogId"
                    value={dog.id}
                    checked={formData.dogId === dog.id}
                    onChange={handleChange}
                    className="sr-only"
                    required
                  />
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-slate-600" />
                    <div>
                      <div className="font-medium text-slate-900">{dog.name}</div>
                      <div className="text-sm text-slate-600">{dog.breed}</div>
                      {isWalker && (
                        <div className="text-xs text-emerald-600">Client Dog</div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-2">
              Date *
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="date"
                id="date"
                name="date"
                required
                min={minDate}
                value={formData.date}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-slate-700 mb-2">
              Preferred Time *
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                id="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 appearance-none"
              >
                <option value="">Select a time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
              Walk Duration *
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: '30', label: '30 minutes', price: '£15' },
                { value: '45', label: '45 minutes', price: '£20' },
                { value: '60', label: '1 hour', price: '£25' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`cursor-pointer p-4 rounded-xl border-2 transition-colors text-center ${
                    formData.duration === option.value 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="duration"
                    value={option.value}
                    checked={formData.duration === option.value}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="font-medium text-slate-900">{option.label}</div>
                  <div className="text-sm text-emerald-600 font-semibold">{option.price}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Pickup Address */}
          <div>
            <label htmlFor="pickupAddress" className="block text-sm font-medium text-slate-700 mb-2">
              Pickup Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                id="pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter pickup address"
              />
            </div>
          </div>

          {/* Special Notes */}
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-slate-700 mb-2">
              Special Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Any special instructions, medication reminders, or preferences for this walk..."
            />
          </div>

          {/* Service Area Note */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-emerald-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-emerald-900">Service Areas</h4>
                <p className="text-sm text-emerald-800 mt-1">
                  We provide dog walking services in Splott and Adamsdown areas of Cardiff. 
                  Additional travel charges may apply for locations outside these areas.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 text-white rounded-xl transition-colors disabled:opacity-50 flex items-center ${
                isWalker 
                  ? 'bg-orange-600 hover:bg-orange-700' 
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <Send className="h-4 w-4 mr-2" />
              {loading 
                ? (isWalker ? 'Scheduling...' : 'Booking...') 
                : (isWalker ? 'Schedule Walk' : 'Send Request')
              }
            </button>
          </div>
        </form>

        {/* Booking Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-medium text-blue-900 mb-2">
            {isWalker ? 'Scheduling Process' : 'Booking Process'}
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            {isWalker ? (
              <>
                <li>• Walk will be added to your calendar immediately</li>
                <li>• Client will receive automatic confirmation</li>
                <li>• You can modify details up to 2 hours before the walk</li>
                <li>• Remember to log the walk journal after completion</li>
              </>
            ) : (
              <>
                <li>• Your walk request will be sent to Sarah for confirmation</li>
                <li>• You'll receive a response within 24 hours</li>
                <li>• Payment is handled separately after the walk</li>
                <li>• You can cancel or reschedule up to 12 hours before the walk</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookWalkPage;