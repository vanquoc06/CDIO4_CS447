import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import heroImg from '../assets/hero.png';

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    : 'Unknown';

  if (!user) {
    return null;
  }

  return (
    <div className="bg-[#13131b] text-[#e4e1ee] min-h-screen">
      <main className="max-w-[1200px] mx-auto px-5 md:px-12 py-10">
        {/* Header */}
        <div className="relative mb-12 border-l-8 border-[#ffb4a7] pl-8 py-4">
          <img src={heroImg} alt="Driver profile" className="absolute top-0 right-0 w-40 opacity-10 pointer-events-none" />
          <h1 className="text-4xl md:text-[56px] font-black italic uppercase leading-tight mb-4 text-[#e4e1ee]"
            style={{ fontFamily: 'Anybody, sans-serif', letterSpacing: '-0.04em' }}>
            HỒ SƠ <span className="text-[#ffb4a7]">TÀI XẾ</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[#ffb4a7] font-mono text-xs uppercase tracking-tighter">
            <span>Cấp độ truy cập: Đã xác thực</span>
            <span className="w-1 h-1 bg-[#5f3e39] rounded-full" />
            <span>Trạng thái: Hoạt động</span>
          </div>
        </div>

        {/* Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="bg-[#1f1f28] border-2 border-[#5f3e39] p-8 relative overflow-hidden">
              {/* Corner accents */}
              <div className="absolute -top-2 -left-2 w-16 h-16 border-t-4 border-l-4 border-[#ffb4a7] opacity-30" />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-4 border-r-4 border-[#ffb4a7] opacity-30" />

              <div className="relative">
                <div className="flex items-start gap-8 mb-8">
                  {/* Avatar */}
                  <div className="w-32 h-32 bg-[#292933] border-4 border-[#ffb4a7] flex items-center justify-center">
                    <span className="material-symbols-outlined text-[80px] text-[#ffb4a7]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      account_circle
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-black italic uppercase mb-2 text-[#e4e1ee]"
                      style={{ fontFamily: 'Anybody, sans-serif' }}>
                      {user.fullName || 'Driver'}
                    </h2>
                    <p className="font-mono text-sm text-[#eabcb4] mb-4">{user.email}</p>
                    <div className="inline-flex items-center gap-2 bg-[#ffb4a7]/10 border border-[#ffb4a7]/20 px-4 py-1.5">
                      <span className="w-2 h-2 bg-[#ffb4a7] rounded-full animate-pulse" />
                      <span className="font-mono text-xs text-[#ffb4a7] uppercase">Phiên hoạt động</span>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t-2 border-[#5f3e39]">
                  <div className="border-l-2 border-[#ffb4a7] pl-4">
                    <p className="font-mono text-[10px] text-[#eabcb4] uppercase mb-1">Thành viên từ</p>
                    <p className="font-mono text-lg font-bold text-[#e4e1ee]">
                      {memberSince}
                    </p>
                  </div>
                  <div className="border-l-2 border-[#ffb4a7] pl-4">
                    <p className="font-mono text-[10px] text-[#eabcb4] uppercase mb-1">Cấp độ truy cập</p>
                    <p className="font-mono text-lg font-bold text-[#e4e1ee]">Driver</p>
                  </div>
                  <div className="border-l-2 border-[#ffb4a7] pl-4">
                    <p className="font-mono text-[10px] text-[#eabcb4] uppercase mb-1">Trạng thái</p>
                    <p className="font-mono text-lg font-bold text-[#ffb4a7]">Active</p>
                  </div>
                  <div className="border-l-2 border-[#ffb4a7] pl-4">
                    <p className="font-mono text-[10px] text-[#eabcb4] uppercase mb-1">Mã</p>
                    <p className="font-mono text-lg font-bold text-[#e4e1ee]">#{user.id?.slice(-6) || '000000'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Quick Actions */}
            <div className="bg-[#1f1f28] border border-[#5f3e39] p-6">
              <h3 className="font-mono text-xs text-[#ffb4a7] uppercase tracking-widest mb-4">Hành động nhanh</h3>
              <div className="space-y-3">
                <Link
                  to="/results"
                  className="block w-full text-left px-4 py-3 bg-[#292933] border border-[#5f3e39] hover:border-[#ffb4a7] font-mono text-xs uppercase tracking-widest text-[#e4e1ee] hover:text-[#ffb4a7] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">leaderboard</span>
                    Xem kết quả
                  </span>
                </Link>
                <Link
                  to="/schedule"
                  className="block w-full text-left px-4 py-3 bg-[#292933] border border-[#5f3e39] hover:border-[#ffb4a7] font-mono text-xs uppercase tracking-widest text-[#e4e1ee] hover:text-[#ffb4a7] transition-all"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    Lịch đua
                  </span>
                </Link>
              </div>
            </div>

            {/* Account Management */}
            <div className="bg-[#ff553d] p-6">
              <h3 className="font-mono text-xs text-[#5b0300] uppercase tracking-widest mb-4">Tài khoản</h3>
              <button
                onClick={handleLogout}
                className="w-full bg-[#5b0300] text-white py-3 px-6 font-mono text-xs font-bold uppercase tracking-widest parallelogram hover:bg-[#670400] transition-all"
              >
                <span className="parallelogram-content flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-sm">logout</span>
                  Đăng xuất
                </span>
              </button>
            </div>

            {/* HUD Info */}
            <div className="hud-border bg-[#1b1b24] p-4 carbon-texture">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#d3fbff] text-lg">shield</span>
                <span className="font-mono text-[10px] text-[#d3fbff]">Trạng thái bảo mật</span>
              </div>
              <p className="font-mono text-xs leading-relaxed opacity-80">
                <span className="text-[#ffb4a7]">&gt;</span> Phiên đang hoạt động<br />
                <span className="text-[#ffb4a7]">&gt;</span> Token xác thực hợp lệ<br />
                <span className="text-[#ffb4a7]">&gt;</span> Đăng nhập gần nhất: Hôm nay
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
