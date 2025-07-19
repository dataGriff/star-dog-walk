import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { dogsAPI, walksAPI } from '../services/api';
import { Calendar, Plus, Heart, Camera, Clock, MapPin } from 'lucide-react';

const OwnerDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const [dogs, setDogs] = useState<any[]>([]);
  const [walks, setWalks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [dogsData, walksData] = await Promise.all([
          dogsAPI.getAll(),
          walksAPI.getAll()
        ]);
        setDogs(dogsData);
        setWalks(walksData);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter walks by status
  const upcomingWalks = walks.filter(walk => 
    ['pending', 'confirmed'].includes(walk.status) && 
    new Date(walk.date) >= new Date()
  );
  
  const recentWalks = walks.filter(walk => 
    walk.status === 'completed'
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome back!</h1>
          <p className="text-slate-600 mt-2">Manage your dogs and schedule walks with ease.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/book-walk"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 rounded-2xl transition-colors group"
          >
            <div className="flex items-center">
              <Plus className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-semibold text-lg">Book a Walk</h3>
                <p className="text-emerald-100">Schedule your next walk</p>
              </div>
            </div>
          </Link>

          <Link
            to="/dogs/new"
            className="bg-orange-500 hover:bg-orange-600 text-white p-6 rounded-2xl transition-colors group"
          >
            <div className="flex items-center">
              <Heart className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-semibold text-lg">Add New Dog</h3>
                <p className="text-orange-100">Create dog profile</p>
              </div>
            </div>
          </Link>

          <Link
            to="/walk-journal"
            className="bg-slate-600 hover:bg-slate-700 text-white p-6 rounded-2xl transition-colors group"
          >
            <div className="flex items-center">
              <Camera className="h-8 w-8 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <h3 className="font-semibold text-lg">Walk Journals</h3>
                <p className="text-slate-300">View walk history</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'upcoming', label: 'Upcoming Walks' },
              { id: 'history', label: 'Walk History' },
              { id: 'dogs', label: 'My Dogs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  selectedTab === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Walks */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Upcoming Walks</h3>
              <div className="space-y-4">
                {upcomingWalks.map((walk) => (
                  <div key={walk.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">{walk.dog?.name} - {walk.duration} mins</p>
                        <p className="text-sm text-slate-600">{walk.date} at {walk.startTime}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      walk.status === 'confirmed' 
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {walk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Recent Walks</h3>
              <div className="space-y-4">
                {recentWalks.map((walk) => (
                  <div key={walk.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-slate-600" />
                      <div>
                        <p className="font-medium text-slate-900">{walk.dog?.name} - {walk.route || 'Walk completed'}</p>
                        <p className="text-sm text-slate-600">{walk.date} • {walk.photos?.length || 0} photos</p>
                      </div>
                    </div>
                    <Link
                      to={`/walk-journal/${walk.id}`}
                      className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
                    >
                      View Journal
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'dogs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-slate-900">My Dogs</h3>
              <Link
                to="/dogs"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View All Dogs →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.slice(0, 3).map((dog) => (
                <div key={dog.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={dog.photo}
                    alt={dog.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="font-semibold text-slate-900">{dog.name}</h4>
                    <p className="text-sm text-slate-600">{dog.breed} • {dog.age} years</p>
                    <Link
                      to={`/dogs/${dog.id}`}
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium mt-2 inline-block"
                    >
                      View Profile →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'upcoming' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWalks.map((walk) => {
              const dog = dogs.find(d => d.id === walk.dogId);
              return (
              <div key={walk.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">{dog?.name || 'Unknown Dog'}</h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    walk.status === 'confirmed' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {walk.status}
                  </span>
                </div>
                <p className="text-slate-600 mb-2">{walk.date} at {walk.startTime}</p>
                <p className="text-sm text-slate-500">{walk.duration} minutes</p>
              </div>
              );
            })}
          </div>
        )}

        {selectedTab === 'history' && (
          <div className="space-y-4">
            {recentWalks.map((walk) => {
              const dog = dogs.find(d => d.id === walk.dogId);
              return (
              <div key={walk.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-900">{dog?.name || 'Unknown Dog'} - {walk.route || 'Walk completed'}</h4>
                    <p className="text-slate-600">{walk.date} • {walk.photos?.length || 0} photos</p>
                  </div>
                  <Link
                    to={`/walk-journal/${walk.id}`}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    View Journal →
                  </Link>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;