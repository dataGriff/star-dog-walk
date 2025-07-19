import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../contexts/AuthContext';
import { dogsAPI, walksAPI } from '../services/api';
import { Plus, Heart, Edit, Calendar, Camera } from 'lucide-react';

const DogsListPage: React.FC = () => {
  const { user } = useAuth();
  const isWalker = user?.role === 'walker';
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

  // Calculate walk statistics for each dog
  const getWalkStats = (dogId: string) => {
    const dogWalks = walks.filter(walk => walk.dogId === dogId && walk.status === 'completed');
    const totalWalks = dogWalks.length;
    const lastWalk = dogWalks.length > 0 
      ? dogWalks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0].date
      : null;
    
    return { totalWalks, lastWalk };
  };

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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {isWalker ? 'Client Dogs' : 'My Dogs'}
            </h1>
            <p className="text-slate-600 mt-2">
              {isWalker 
                ? 'Manage profiles for all the dogs you walk'
                : 'Manage your dog profiles and information'
              }
            </p>
          </div>
          
          {!isWalker && (
            <Link
              to="/dogs/new"
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors flex items-center shadow-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Dog
            </Link>
          )}
        </div>

        {/* Dogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dogs.map((dog) => (
            {dogs.map((dog) => {
              const { totalWalks, lastWalk } = getWalkStats(dog.id);
              return (
            <div key={dog.id} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative">
                <img
                  src={dog.photo}
                  alt={dog.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                  <Heart className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-1">{dog.name}</h3>
                    <p className="text-slate-600">{dog.breed}</p>
                    <p className="text-sm text-slate-500">{dog.age} years old</p>
                    {isWalker && (
                      <p className="text-sm text-emerald-600 font-medium mt-1">Client Dog</p>
                    )}
                  </div>
                </div>

                {dog.behaviorNotes && (
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{dog.behaviorNotes}</p>
                )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-900">{totalWalks}</div>
                    <div className="text-xs text-slate-600">Total Walks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-900">{lastWalk || 'None'}</div>
                    <div className="text-xs text-slate-600">Last Walk</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Link
                    to={`/dogs/${dog.id}`}
                    className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-center flex items-center justify-center"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isWalker ? 'View Profile' : 'Edit'}
                  </Link>
                  
                  {isWalker ? (
                    <Link
                      to={`/walk-journal/new?dogId=${dog.id}`}
                      className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center flex items-center justify-center"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Log Walk
                    </Link>
                  ) : (
                    <Link
                      to={`/book-walk?dogId=${dog.id}`}
                      className="flex-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors text-center flex items-center justify-center"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Walk
                    </Link>
                  )}
                </div>
              </div>
            </div>
              );
            })}
          ))}

          {/* Add New Dog Card (for owners only) */}
          {!isWalker && (
            <Link
              to="/dogs/new"
              className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center hover:border-emerald-400 hover:bg-emerald-50 transition-colors group min-h-80"
            >
              <Plus className="h-12 w-12 text-slate-400 group-hover:text-emerald-600 mb-4 transition-colors" />
              <h3 className="text-lg font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">Add New Dog</h3>
              <p className="text-slate-500 group-hover:text-emerald-600 transition-colors text-center">Create a profile for your pet</p>
            </Link>
          )}
        </div>

        {dogs.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-900 mb-2">
              {isWalker ? 'No client dogs yet' : 'No dogs added yet'}
            </h3>
            <p className="text-slate-600 mb-6">
              {isWalker 
                ? 'Client dogs will appear here once they book walks with you.'
                : 'Add your first dog to get started with booking walks.'
              }
            </p>
            {!isWalker && (
              <Link
                to="/dogs/new"
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Your First Dog
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DogsListPage;