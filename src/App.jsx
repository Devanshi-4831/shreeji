import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
// import Dashboard from './pages/Dashboard.jsx';
import StockData from './pages/StockData.jsx';
import JobManagement from './pages/JobManagement.jsx';
import PartyMealManagement from './pages/PartyMealManagement.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes inside AppLayout */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Navigate to="/party-meal" replace />} />
        <Route path="/party-meal" element={<PartyMealManagement />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route path="/stock" element={<StockData />} />
        <Route path="/job" element={<JobManagement />} />
     
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
