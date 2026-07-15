import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { checkServerHealth } from '../api/auth';
import heroImg from '../assets/hero.png';

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
    <div className="h-screen bg-[#13131b] text-[#e4e1ee] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="hud-grid absolute inset-0 opacity-10" />
      <div className="carbon-texture absolute inset-0 opacity-20" />
      <img src={heroImg} alt="Racing hero" className="absolute top-4 right-4 w-32 opacity-30 pointer-events-none" />

      {/* Form Container */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1f1f28] border-2 border-[#5f3e39] p-6 relative overflow-hidden">
          {/* Top corner accents */}
          <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-[#ffb4a7] opacity-30" />
          <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-[#ffb4a7] opacity-30" />

          {/* Logo/Title */}
          <div className="text-center mb-5">
            <Link to="/" className="inline-block mb-2">
              <h1 className="text-3xl font-black italic uppercase text-[#e4e1ee] tracking-tighter"
                style={{ fontFamily: 'Anybody, sans-serif' }}>
                ILLIT F1
              </h1>
            </Link>
            <div className="h-1 w-20 bg-[#ffb4a7] mx-auto mb-2" />
            <p className="font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest">Hệ thống kiểm soát truy cập</p>
            <h2 className="text-xl font-bold italic uppercase mt-2 text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif' }}>
              ĐĂNG NHẬP
            </h2>
          </div>

          {/* Server Status */}
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest">Máy chủ:</span>
            <div className={`w-2 h-2 rounded-full ${serverStatus === true ? 'bg-[#4caf50]' : serverStatus === false ? 'bg-[#f44336]' : 'bg-[#ff9800] animate-pulse'}`} />
            <span className="font-mono text-[10px] text-[#eabcb4]">
              {serverStatus === true ? 'Đã kết nối' : serverStatus === false ? 'Mất kết nối' : 'Đang kiểm tra...'}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-[#93000a] border border-[#ffb4ab] text-[#ffb4ab]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span className="font-mono text-xs">{error}</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest mb-1">
                Địa chỉ email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-2.5 font-mono text-sm outline-none transition-colors"
                placeholder="driver@illitf1.racing"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#13131b] border-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#e4e1ee] px-4 py-2.5 font-mono text-sm outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ffb4a7] text-[#670400] py-3 font-mono text-sm font-bold uppercase tracking-widest parallelogram hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              <span className="parallelogram-content">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    Đang xác thực...
                  </span>
                ) : (
                  'Truy cập hệ thống'
                )}
              </span>
            </button>
          </form>

          {/* Bottom actions */}
          <div className="mt-6 border-t border-[#5f3e39] pt-5">
            <div className="text-center">
              <p className="font-mono text-[10px] text-[#eabcb4] uppercase tracking-widest">
                Vui lòng đăng nhập để tiếp tục.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom info */}
        <div className="mt-3 text-center">
          <p className="font-mono text-[10px] text-[#eabcb4] opacity-50 uppercase tracking-widest">
            © 2024 ILLIT F1 ENGINEERING. TRẠNG THÁI: AN TOÀN
          </p>
        </div>
      </div>
    </div>
  );
}
