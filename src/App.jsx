import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './components/User/UserLogin/UserLogin';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import UserDashboard from './components/User/UserDashboard/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import Registration from './components/User/Registration/Registration';
import './App.css';
import LandingPage from './LandingPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
