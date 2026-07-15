import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DetailModal from '../components/DetailModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export default function Teams() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/f1/teams`);
        const data = await response.json();
        if (data?.data) {
          setTeams(data.data);
        }
      } catch (error) {
        console.error('Failed to load teams', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  useEffect(() => {
    // Glitch text on h2 hover
    const titles = document.querySelectorAll('.glitch-title');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    titles.forEach(title => {
      let intervalId = null;
      title.addEventListener('mouseenter', () => {
        const original = title.innerText;
        let iterations = 0;
        clearInterval(intervalId);
        intervalId = setInterval(() => {
          title.innerText = original.split('').map((char, i) => {
            if (i < iterations) return original[i];
            return chars[Math.floor(Math.random() * 36)];
          }).join('');
          if (iterations >= original.length) clearInterval(intervalId);
          iterations += 1 / 3;
        }, 30);
      });
    });
  }, []);

  return (
    <div className="bg-[#13131b] text-[#e4e1ee]">
      <main className="min-h-screen px-5 md:px-16 py-12">
        {/* Hero */}
        <header className="mb-10 border-l-8 border-[#ff553d] pl-6 py-4">
          <h1 className="text-3xl md:text-[44px] font-black italic uppercase leading-tight mb-4 text-[#e4e1ee]"
            style={{ fontFamily: 'Anybody, sans-serif', letterSpacing: '-0.04em' }}>
            {loading ? 'Đang tải...' : 'ĐỘI ĐUA'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[#ffb4a7] font-mono text-xs uppercase tracking-tighter">
            <span>MÙA: 2024</span>
            <span className="w-1 h-1 bg-[#5f3e39] rounded-full" />
            <span>TRẠNG THÁI: DỮ LIỆU TRỰC TIẾP</span>
            <span className="w-1 h-1 bg-[#5f3e39] rounded-full" />
            <span>GRID: ĐỦ TẢI</span>
          </div>
        </header>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4">
          {teams.length > 0 ? teams.map((team) => {
            const leadDriver = team.Drivers?.[0];
            const wingDriver = team.Drivers?.[1];
            const accentClass = team.name?.toLowerCase().includes('red') ? 'text-[#ffb4a7]' : 'text-[#00eefc]';
            const hoverBorder = team.name?.toLowerCase().includes('red') ? 'hover:border-[#ffb4a7]' : 'hover:border-[#00eefc]';
            const btnHover = team.name?.toLowerCase().includes('red') ? 'group-hover:bg-[#ffb4a7] group-hover:text-[#5b0300]' : 'group-hover:bg-[#00eefc] group-hover:text-[#00686f]';
            const badgeBg = team.name?.toLowerCase().includes('red') ? 'bg-[#ff553d] text-[#5b0300]' : 'bg-[#00eefc] text-[#00686f]';
            const color = team.name?.toLowerCase().includes('red') ? '#ff553d' : '#00eefc';
            return (
              <button key={team.team_id} type="button" onClick={() => setSelectedTeam(team)} className={`group relative bg-[#1b1b24] border-r border-b border-[#5f3e39] ${hoverBorder} transition-all duration-500 text-left`}>
                <div className={`absolute -top-4 -left-4 ${badgeBg} px-4 py-1 parallelogram z-10 font-mono text-xs`}>
                  <span className="font-bold">POS {String(teams.indexOf(team) + 1).padStart(2, '0')}</span>
                </div>
                <div className="relative aspect-video overflow-hidden bg-[#34343e]">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800" alt={team.name} />
                  <div className="absolute bottom-0 right-0 p-4">
                    <span className="font-black italic text-[40px] opacity-10 group-hover:opacity-30 transition-opacity"
                      style={{ fontFamily: 'Anybody, sans-serif' }}>{team.Race_Results?.length || 0}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="glitch-title text-3xl font-black italic uppercase mb-1 text-[#e4e1ee]"
                        style={{ fontFamily: 'Anybody, sans-serif' }}>{team.name}</h2>
                      <p className={`font-mono text-xs ${accentClass}`}>{team.chassis || 'Chassis'} • {team.power_unit || 'Power Unit'}</p>
                    </div>
                    <div className="w-2 h-12" style={{ backgroundColor: color }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-[#5f3e39] pt-6">
                    <div className="space-y-1">
                      <span className="block font-mono text-[10px] opacity-50 uppercase">Tài xế dẫn đầu</span>
                      <span className="text-lg font-bold uppercase" style={{ fontFamily: 'Anybody, sans-serif' }}>{leadDriver ? `${leadDriver.first_name} ${leadDriver.last_name}` : '—'}</span>
                    </div>
                    <div className="space-y-1 border-l border-[#5f3e39] pl-4">
                      <span className="block font-mono text-[10px] opacity-50 uppercase">Tài xế phụ</span>
                      <span className="text-lg font-bold uppercase" style={{ fontFamily: 'Anybody, sans-serif' }}>{wingDriver ? `${wingDriver.first_name} ${wingDriver.last_name}` : '—'}</span>
                    </div>
                  </div>
                  <span className={`mt-8 block w-full parallelogram bg-[#393842] py-3 ${btnHover} transition-all duration-300 text-center`}>
                    <span className="font-mono font-bold uppercase tracking-widest text-xs">Xem telemetry</span>
                  </span>
                </div>
              </button>
            );
          }) : <div className="md:col-span-3 text-[#a5a0b3]">Chưa có dữ liệu đội đua</div>}
        </div>

        {/* Technical Footer Overlay */}
        <div className="mt-24 p-8 border-2 border-[#5f3e39] hud-overlay">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <span className="font-mono text-[#ffb4a7] text-[10px] uppercase block">Luồng dữ liệu</span>
              <p className="text-xs font-mono opacity-60">Đồng bộ telemetry đội đua qua 24 nút toàn cầu. Độ trễ: 12ms. Mất gói: 0%.</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[#ffb4a7] text-[10px] uppercase block">Động cơ phân tích</span>
              <p className="text-xs font-mono opacity-60">Mô hình học máy dự đoán quỹ đạo đội đua dựa trên các cập nhật khí động học.</p>
            </div>
            <div className="md:col-span-2 flex items-center justify-end">
              <button className="parallelogram bg-[#ffb4a7] px-8 py-4 hover:scale-105 transition-transform">
                <span className="text-2xl font-bold italic uppercase text-[#670400]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  Tải báo cáo mùa giải đầy đủ
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DetailModal isOpen={Boolean(selectedTeam)} onClose={() => setSelectedTeam(null)} item={selectedTeam} type="team" />
    </div>
  );
}
