import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TeamAssignments from './pages/TeamAssignments';
import VehicleInspection from './pages/VehicleInspection';
import Shifts from './pages/Shifts';
import Guards from './pages/Guards';
import Maintenance from './pages/Maintenance';
import Reports from './pages/Reports';
import DebugInfo from './pages/DebugInfo';


const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="debug" element={<DebugInfo />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        {user.role === 'manager' && (
          <>
            <Route path="assignments" element={<TeamAssignments />} />
            <Route path="shifts" element={<Shifts />} />
            <Route path="reports" element={<Reports />} />
          </>
        )}
        {(user.role === 'manager' || user.role === 'driver' || user.role === 'firefighter') && (
          <>
            <Route path="inspection/vehicle/:vehicleId" element={<VehicleInspection />} />
            <Route path="vehicles" element={<Dashboard />} />
            <Route path="maintenance" element={<Maintenance />} />
          </>
        )}
        {(user.role === 'manager' || user.role === 'guard') && (
          <Route path="guards" element={<Guards />} />
        )}
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App rtl">
          <AppRoutes />
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Noto Sans Arabic, sans-serif',
                direction: 'rtl',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;