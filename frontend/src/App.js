import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Citizen Pages
import CitizenDashboard from './pages/citizen/Dashboard';
import ApplyPassport from './pages/citizen/ApplyPassport';
import MyApplications from './pages/citizen/MyApplications';
import Payment from './pages/citizen/Payment';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminApplications from './pages/admin/Applications';
import AdminReports from './pages/admin/Reports';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Citizen Routes - Protected */}
            <Route path="/citizen/dashboard" element={
              <PrivateRoute>
                <CitizenDashboard />
              </PrivateRoute>
            } />
            <Route path="/citizen/apply" element={
              <PrivateRoute>
                <ApplyPassport />
              </PrivateRoute>
            } />
            <Route path="/citizen/applications" element={
              <PrivateRoute>
                <MyApplications />
              </PrivateRoute>
            } />
            <Route path="/citizen/payment" element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            } />

            {/* Admin Routes - Protected & Admin Only */}
            <Route path="/admin/dashboard" element={
              <PrivateRoute adminOnly>
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/applications" element={
              <PrivateRoute adminOnly>
                <AdminApplications />
              </PrivateRoute>
            } />
            <Route path="/admin/reports" element={
              <PrivateRoute adminOnly>
                <AdminReports />
              </PrivateRoute>
            } />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;