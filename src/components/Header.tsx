import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import { MapPin, Bell, User, LogOut, Home, ChevronRight } from 'lucide-react';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useNotifications();
  const location = useLocation();
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [{ label: 'Home', path: user ? '/dashboard' : '/' }];
    
    if (path.includes('/dogs')) {
      breadcrumbs.push({ label: 'My Dogs', path: '/dogs' });
      if (path.includes('/new')) {
        breadcrumbs.push({ label: 'Add New Dog', path: '/dogs/new' });
      } else if (path.match(/\/dogs\/\d+/)) {
        breadcrumbs.push({ label: 'Dog Profile', path: path });
      }
    } else if (path.includes('/book-walk')) {
      breadcrumbs.push({ label: 'Book a Walk', path: '/book-walk' });
    } else if (path.includes('/walk-journal')) {
      breadcrumbs.push({ label: 'Walk Journal', path: '/walk-journal' });
    }
    
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <>
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to={user ? '/' : '/'} className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity">
                <MapPin className="h-8 w-8 text-emerald-600" />
                <h1 className="ml-2 text-xl font-bold text-slate-900">
                  Star<span className="text-emerald-600">dog</span>walker
                </h1>
              </Link>
              <div className="hidden sm:block ml-4">
                <span className="text-sm text-slate-600">Splott & Adamsdown, Cardiff</span>
              </div>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-slate-600" />
                  <span className="text-sm font-medium text-slate-900">{user?.name}</span>
                </div>
                
                <button
                  onClick={logout}
                  className="p-2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* Breadcrumbs */}
      {user && breadcrumbs.length > 1 && (
        <div className="bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center py-3 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.path}>
                  {index === 0 && <Home className="h-4 w-4 text-slate-400 mr-2" />}
                  <Link
                    to={crumb.path}
                    className={`${
                      index === breadcrumbs.length - 1
                        ? 'text-slate-900 font-medium'
                        : 'text-slate-600 hover:text-slate-900'
                    } transition-colors`}
                  >
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;