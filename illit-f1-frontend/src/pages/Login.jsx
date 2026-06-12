import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkServerHealth } from '../api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Check server health on component mount
  useEffect(() => {
    const checkServer = async () => {
      const isHealthy = await checkServerHealth();
      setServerStatus(isHealthy);
    };
    checkServer();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#13131b] text-[#e4e1ee] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="hud-grid absolute inset-0 opacity-10" />
      <div className="carbon-texture absolute inset-0 opacity-20" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1f1f28] border-2 border-[#5f3e39] p-8 relative overflow-hidden">
          {/* Top corner accents */}
          <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#ffb4a7] opacity-30" />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#ffb4a7] opacity-30" />

          {/* Logo/Title */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block mb-4">
              <h1 className="text-4xl font-black italic uppercase text-[#e4e1ee] tracking-tighter"
                style={{ fontFamily: 'Anybody, sans-serif' }}>
                ILLIT F1
              </h1>
            </Link>
            <div className="h-1 w-24 bg-[#ffb4a7] mx-auto mb-4" />
            <p className="font-mono text-xs text-[#eabcb4] uppercase tracking-widest">Access Control System</p>
            <h2 className="text-2xl font-bold italic uppercase mt-4 text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif' }}>
              LOGIN
            </h2>
          </div>

          {/* Server Status */}
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest">
                Server Status:
              </span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${serverStatus === true ? 'bg-[#4caf50]' : serverStatus === false ? 'bg-[#f44336]' : 'bg-[#ff9800] animate-pulse'}`} />
                <span className="font-mono text-[10px] text-[#eabcb4]">
                  {serverStatus === true ? 'Connected' : serverStatus === false ? 'Disconnected' : 'Checking...'}
                </span>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-[#93000a] border border-[#ffb4ab] text-[#ffb4ab]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span className="font-mono text-xs">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-mono text-xs text-[#eabcb4] uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-3 font-mono text-sm outline-none transition-colors"
                placeholder="driver@illitf1.racing"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-xs text-[#eabcb4] uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-3 font-mono text-sm outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffb4a7] text-[#670400] py-4 font-mono text-sm font-bold uppercase tracking-widest parallelogram hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="parallelogram-content">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Authenticating...
                  </span>
                ) : (
                  'Access System'
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#5f3e39]" />
            <span className="font-mono text-[10px] text-[#eabcb4] uppercase">Or</span>
            <div className="flex-1 h-px bg-[#5f3e39]" />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="font-mono text-xs text-[#eabcb4] mb-3">
              New to ILLIT F1 Racing?
            </p>
            <Link
              to="/register"
              className="inline-block border-2 border-[#5f3e39] text-[#e4e1ee] py-3 px-8 font-mono text-sm uppercase tracking-widest parallelogram hover:bg-[#e4e1ee] hover:text-[#13131b] transition-all"
            >
              <span className="parallelogram-content">Register New Account</span>
            </Link>
          </div>

          {/* Back to Home */}
          <Link
            to="/"
            className="block text-center mt-8 font-mono text-[10px] text-[#eabcb4] hover:text-[#ffb4a7] uppercase tracking-widest transition-colors"
          >
            <span className="flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Return to Homepage
            </span>
          </Link>
        </div>

        {/* Bottom info */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] text-[#eabcb4] opacity-50 uppercase tracking-widest">
            © 2024 ILLIT F1 ENGINEERING. STATUS: SECURE
          </p>
        </div>
      </div>
    </div>
  );
}
