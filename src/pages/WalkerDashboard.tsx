import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Calendar, Camera, MapPin, Clock, Dog, CheckCircle, XCircle } from 'lucide-react';

const WalkerDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('today');

  // Mock data - in real app this would come from API
  const todayWalks = [
    {
      id: '1',
      time: '09:00',
      duration: 60,
      dog: 'Max',
      owner: 'Sophie Williams',
      address: 'Splott Road, Cardiff',
      status: 'upcoming',
      notes: 'Afraid of bicycles, loves puddles'
    },
    {
      id: '2',
      time: '14:00',
      duration: 45,
      dog: 'Bella',
      owner: 'James Thompson',
      address: 'Adamsdown, Cardiff',
      status: 'completed',
      notes: 'Very energetic, good with other dogs'
    }
  ];

  const pendingRequests = [
    {
      id: '3',
      date: '2024-01-17',
      time: '10:30',
      duration: 60,
      dog: 'Charlie',
      owner: 'Emma Davies',
      address: 'Splott Park area'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Good morning, Sarah!</h1>
          <p className="text-slate-600 mt-2">You have 2 walks scheduled for today in Splott & Adamsdown.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-emerald-600 text-white p-6 rounded-2xl">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Today</h3>
                <p className="text-emerald-100">2 walks scheduled</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-500 text-white p-6 rounded-2xl">
            <div className="flex items-center">
              <Clock className="h-8 w-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">This Week</h3>
                <p className="text-orange-100">8 walks booked</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-600 text-white p-6 rounded-2xl">
            <div className="flex items-center">
              <Dog className="h-8 w-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Active Dogs</h3>
                <p className="text-slate-300">12 regular clients</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500 text-white p-6 rounded-2xl">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Pending</h3>
                <p className="text-yellow-100">1 new request</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'today', label: 'Today\'s Walks' },
              { id: 'pending', label: 'Pending Requests' },
              { id: 'calendar', label: 'Weekly Calendar' },
              { id: 'clients', label: 'My Clients' }
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
        {selectedTab === 'today' && (
          <div className="space-y-6">
            {todayWalks.map((walk) => (
              <div key={walk.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      walk.status === 'completed' ? 'bg-emerald-100' : 'bg-slate-100'
                    }`}>
                      {walk.status === 'completed' ? 
                        <CheckCircle className="h-6 w-6 text-emerald-600" /> :
                        <Clock className="h-6 w-6 text-slate-600" />
                      }
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{walk.dog?.name}</h3>
                      <p className="text-slate-600">Owner: {walk.ownerId}</p>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    walk.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {walk.status}
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{walk.startTime} ({walk.duration} mins)</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{walk.pickupAddress}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Dog className="h-4 w-4 mr-2" />
                    <span>{walk.specialNotes}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {walk.status === 'confirmed' ? (
                    <>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        Start Walk
                      </button>
                      <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                        Contact Owner
                      </button>
                    </>
                  ) : (
                    <Link
                      to={`/walk-journal/${walk.id}`}
                      className="bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors flex items-center"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      View Journal
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'pending' && (
          <div className="space-y-6">
            {pendingRequests.map((request) => (
              <div key={request.id} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900">{request.dog?.name}</h3>
                    <p className="text-slate-600">Owner: {request.ownerId}</p>
                  </div>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
                    Pending Review
                  </span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center text-slate-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{request.date}</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{request.startTime} ({request.duration} mins)</span>
                  </div>
                  <div className="flex items-center text-slate-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{request.pickupAddress}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAcceptWalk(request.id)}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Accept
                  </button>
                  <button 
                    onClick={() => handleDeclineWalk(request.id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Decline
                  </button>
                  <button className="border border-slate-300 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">
                    Message Owner
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalkerDashboard;