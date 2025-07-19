import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OwnerDashboard from './pages/OwnerDashboard';
import WalkerDashboard from './pages/WalkerDashboard';
import DogProfilePage from './pages/DogProfilePage';
import DogsListPage from './pages/DogsListPage';
import BookWalkPage from './pages/BookWalkPage';
import WalkJournalPage from './pages/WalkJournalPage';
import PublicWalkJournalPage from './pages/PublicWalkJournalPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-slate-50">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardRouter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dogs/:dogId?"
                element={
                  <ProtectedRoute>
                    <DogProfileRouter />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dogs"
                element={
                  <ProtectedRoute>
                    <DogsListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-walk"
                element={
                  <ProtectedRoute>
                    <BookWalkPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/walk-journal/public/:walkId"
                element={<PublicWalkJournalPage />}
              />
              <Route
                path="/walk-journal/:walkId?"
                element={
                  <ProtectedRoute>
                    <WalkJournalPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

function DogProfileRouter() {
  const { dogId } = useParams();
  
  if (!dogId) {
    return <DogsListPage />;
  }
  
  return <DogProfilePage />;
}

function DashboardRouter() {
  // This would typically check user role from context
  const userRole = 'owner'; // This should come from auth context
  
  return userRole === 'walker' ? <WalkerDashboard /> : <OwnerDashboard />;
}

export default App;