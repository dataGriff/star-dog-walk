import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { walksAPI } from '../services/api';
import { Calendar, Clock, MapPin, Camera, Heart, Send, Star, ExternalLink } from 'lucide-react';

const WalkJournalPage: React.FC = () => {
  const { walkId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const preselectedDogId = searchParams.get('dogId');
  const isWalker = user?.role === 'walker';
  const isNew = walkId === 'new';

  const [journalData, setJournalData] = useState({
    walkDate: new Date().toISOString().split('T')[0],
    startTime: '',
    endTime: '',
    route: '',
    weather: 'sunny',
    notes: '',
    behaviorNotes: '',
    photos: []
  });
  const [ownerResponse, setOwnerResponse] = useState('');
  const [rating, setRating] = useState(5);
  const [walkInfo, setWalkInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew && walkId) {
      const loadWalk = async () => {
        try {
          const walk = await walksAPI.getById(walkId);
          setWalkInfo(walk);
          setJournalData({
            walkDate: walk.date || new Date().toISOString().split('T')[0],
            startTime: walk.startTime || '',
            endTime: walk.endTime || '',
            route: walk.route || '',
            weather: walk.weather || 'sunny',
            notes: walk.notes || '',
            behaviorNotes: walk.behaviorNotes || '',
            photos: walk.photos || []
          });
        } catch (error) {
          console.error('Failed to load walk:', error);
          navigate('/dashboard');
        } finally {
          setInitialLoading(false);
        }
      };

      loadWalk();
    }
  }, [walkId, isNew, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const updateData = {
        startTime: journalData.startTime,
        endTime: journalData.endTime,
        route: journalData.route,
        weather: journalData.weather,
        notes: journalData.notes,
        behaviorNotes: journalData.behaviorNotes,
        photos: journalData.photos,
        status: 'completed'
      };

      if (isNew) {
        // This would be for creating a new walk journal
        // Implementation depends on your specific requirements
      } else {
        await walksAPI.update(walkId!, updateData);
      }
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save walk journal:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setJournalData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const weatherOptions = [
    { value: 'sunny', label: '☀️ Sunny', color: 'text-yellow-600' },
    { value: 'cloudy', label: '☁️ Cloudy', color: 'text-slate-600' },
    { value: 'rainy', label: '🌧️ Rainy', color: 'text-blue-600' },
    { value: 'windy', label: '💨 Windy', color: 'text-slate-600' }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            {isNew ? 'Create Walk Journal' : `${walkInfo?.dog?.name}'s Walk Journal`}
          </h1>
          <p className="text-slate-600 mt-2">
            {isNew ? 'Document the walk experience' : `${walkInfo.date} • ${walkInfo.duration} minutes`}
            {isNew ? 'Document the walk experience' : `${walkInfo?.date} • ${walkInfo?.duration} minutes`}
          </p>
        </div>

        {/* Walk Summary */}
        {!isNew && (
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Walk Summary</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center text-slate-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{walkInfo?.date}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{journalData.startTime} - {journalData.endTime}</span>
              </div>
              <div className="flex items-center text-slate-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{journalData.route || 'Not specified'}</span>
              </div>
            </div>
          </div>
        )}

        {isWalker ? (
          /* Walker View - Create/Edit Journal */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Walk Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={journalData.startTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={journalData.endTime}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Route/Location
                  </label>
                  <input
                    type="text"
                    name="route"
                    value={journalData.route}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="e.g., Splott Park Loop, Adamsdown Streets"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Weather
                  </label>
                  <select
                    name="weather"
                    value={journalData.weather}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {weatherOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Photos */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Photos</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {journalData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Walk photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="h-32 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center hover:border-emerald-400 hover:bg-emerald-50 transition-colors"
                  >
                    <div className="text-center">
                      <Camera className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <span className="text-sm text-slate-600">Add Photo</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Journal Notes */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Walk Journal</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Walk Notes
                  </label>
                  <textarea
                    name="notes"
                    value={journalData.notes}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Describe the walk, what the dog enjoyed, any notable events, interactions with other dogs, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Behavior Notes
                  </label>
                  <textarea
                    name="behaviorNotes"
                    value={journalData.behaviorNotes}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="How was the dog's behavior? Any training practice, issues, or improvements noted?"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {!isNew && (
                <Link
                  to={`/walk-journal/public/${walkId}`}
                  target="_blank"
                  className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Public View
                </Link>
              )}
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
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center"
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : (isNew ? 'Create Journal' : 'Update Journal')}
              </button>
            </div>
          </form>
        ) : (
          /* Owner View - Read Journal & Respond */
          <div className="space-y-6">
            {/* Photos Gallery */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Walk Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {journalData.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Walk photo ${index + 1}`}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Walk Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Walk Notes</h2>
              <div className="prose max-w-none">
                <p className="text-slate-700 leading-relaxed">{journalData.notes}</p>
              </div>
              
              {journalData.behaviorNotes && (
                <div className="mt-6 p-4 bg-emerald-50 rounded-xl">
                  <h3 className="font-medium text-emerald-900 mb-2">Behavior Notes</h3>
                  <p className="text-emerald-800">{journalData.behaviorNotes}</p>
                </div>
              )}
            </div>

            {/* Owner Response */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Response</h2>
              
              {/* Rating */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Rate this walk
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`${
                        star <= rating ? 'text-yellow-400' : 'text-slate-300'
                      } hover:text-yellow-400 transition-colors`}
                    >
                      <Star className="h-6 w-6 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message to Sarah (Optional)
                </label>
                <textarea
                  value={ownerResponse}
                  onChange={(e) => setOwnerResponse(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Thank Sarah for the walk, ask questions, or share feedback..."
                />
              </div>

              <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center">
                <Heart className="h-4 w-4 mr-2" />
                Send Thank You
              </button>
            </div>
            
            {/* Public Share Link */}
            <div className="mt-4 p-4 bg-slate-50 rounded-xl">
              <h4 className="font-medium text-slate-900 mb-2">Share this walk journal</h4>
              <Link
                to={`/walk-journal/public/${walkId}`}
                target="_blank"
                className="text-emerald-600 hover:text-emerald-700 text-sm flex items-center"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                View public journal page
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalkJournalPage;