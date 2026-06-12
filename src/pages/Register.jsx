import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password, fullName);
      navigate('/', { replace: true });
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
            <p className="font-mono text-xs text-[#eabcb4] uppercase tracking-widest">New Driver Registration</p>
            <h2 className="text-2xl font-bold italic uppercase mt-4 text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif' }}>
              REGISTER
            </h2>
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
            {/* Full Name */}
            <div>
              <label className="block font-mono text-xs text-[#eabcb4] uppercase tracking-widest mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-3 font-mono text-sm outline-none transition-colors"
                placeholder="Max Velocity"
              />
            </div>

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
                minLength={6}
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-3 font-mono text-sm outline-none transition-colors"
                placeholder="••••••••"
              />
              <p className="mt-1 font-mono text-[10px] text-[#eabcb4] opacity-50">
                Minimum 6 characters
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-mono text-xs text-[#eabcb4] uppercase tracking-widest mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Creating Account...
                  </span>
                ) : (
                  'Register Account'
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

          {/* Login Link */}
          <div className="text-center">
            <p className="font-mono text-xs text-[#eabcb4] mb-3">
              Already have an account?
            </p>
            <Link
              to="/login"
              className="inline-block border-2 border-[#5f3e39] text-[#e4e1ee] py-3 px-8 font-mono text-sm uppercase tracking-widest parallelogram hover:bg-[#e4e1ee] hover:text-[#13131b] transition-all"
            >
              <span className="parallelogram-content">Login to Account</span>
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
