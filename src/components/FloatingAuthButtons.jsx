import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function FloatingAuthButtons() {
  const { isAuthenticated } = useAuth();

  // Don't show if user is already logged in
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-3">
      {/* Register Button */}
      <Link
        to="/register"
        className="group bg-[#1f1f28] border-2 border-[#ffb4a7] hover:bg-[#ffb4a7] transition-all duration-300 shadow-2xl"
        style={{ width: '56px', height: '56px' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[#ffb4a7] group-hover:text-[#670400] transition-colors text-2xl">
            person_add
          </span>
          <span className="font-mono text-[8px] text-[#ffb4a7] group-hover:text-[#670400] uppercase tracking-widest mt-1">
            Sign Up
          </span>
        </div>
      </Link>

      {/* Login Button */}
      <Link
        to="/login"
        className="group bg-[#ffb4a7] hover:bg-[#ff9a8e] transition-all duration-300 shadow-2xl glow-red"
        style={{ width: '56px', height: '56px' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center">
          <span className="material-symbols-outlined text-[#670400] transition-colors text-2xl">
            login
          </span>
          <span className="font-mono text-[8px] text-[#670400] uppercase tracking-widest mt-1">
            Login
          </span>
        </div>
      </Link>
    </div>
  );
}
