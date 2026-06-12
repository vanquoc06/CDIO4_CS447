import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#13131b] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#ffb4a7] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-mono text-xs text-[#eabcb4] uppercase tracking-widest">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
