import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Homepage from './pages/Homepage';
import Drivers from './pages/Drivers';
import Teams from './pages/Teams';
import Schedule from './pages/Schedule';
import Results from './pages/Results';
import News from './pages/News';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './admin';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes without Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-preview" element={<AdminDashboard preview />} />

          {/* Routes with Navbar */}
          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/news" element={<News />} />
                <Route path="/results" element={<Results />} />
                
                {/* Protected routes - requires login */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
