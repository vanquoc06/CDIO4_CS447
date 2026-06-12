import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/schedule', label: 'Schedule' },
  { to: '/drivers', label: 'Drivers' },
  { to: '/news', label: 'News' },
  { to: '/results', label: 'Results' },
  { to: '/teams', label: 'Teams' },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center w-full px-16 py-4 sticky top-0 z-50 bg-[#0d0d16] bg-opacity-90 backdrop-blur-md border-b-2 border-[#5f3e39]">
      <Link to="/" className="font-black italic text-2xl text-[#e4e1ee] tracking-tighter uppercase hover:text-[#ffb4a7] transition-all"
        style={{ fontFamily: 'Anybody, sans-serif' }}>
        ILLIT F1
      </Link>

      <div className="hidden md:flex gap-8 items-center">
        {links.map(({ to, label }) => {
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`font-mono text-xs uppercase tracking-widest transition-all duration-300 relative
                ${active
                  ? 'text-[#ffb4a7] after:content-[\'\'] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#ffb4a7]'
                  : 'text-[#e4e1ee] opacity-70 hover:opacity-100 hover:text-[#ffb4a7]'
                }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-[#e4e1ee] hover:text-[#ffb4a7] transition-colors"
            >
              <span className="material-symbols-outlined">account_circle</span>
              <span className="hidden lg:block font-mono text-xs">{user.fullName || user.email}</span>
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#1f1f28] border-2 border-[#5f3e39] z-50 shadow-xl">
                  <div className="p-4 border-b border-[#5f3e39]">
                    <p className="font-mono text-xs text-[#ffb4a7] uppercase tracking-widest mb-1">Logged in as</p>
                    <p className="font-mono text-sm text-[#e4e1ee] truncate">{user.email}</p>
                    {user.fullName && <p className="font-mono text-xs text-[#eabcb4] mt-1">{user.fullName}</p>}
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest text-[#e4e1ee] hover:bg-[#292933] transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">person</span>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 font-mono text-xs uppercase tracking-widest text-[#e4e1ee] hover:bg-[#ffb4a7] hover:text-[#670400] transition-colors flex items-center gap-2"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      Logout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/register"
              className="hidden md:block border-2 border-[#5f3e39] text-[#e4e1ee] px-6 py-2 font-mono text-xs uppercase tracking-widest hover:border-[#ffb4a7] hover:text-[#ffb4a7] transition-all"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              className="bg-[#ffb4a7] text-[#670400] px-6 py-2 font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
