import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import DetailModal from '../components/DetailModal';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export default function Schedule() {
  const dRef = useRef(null);
  const hRef = useRef(null);
  const mRef = useRef(null);
  const [selectedRace, setSelectedRace] = useState(null);
  const [races, setRaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/f1/races`);
        const data = await res.json();
        if (data?.data) {
          setRaces(data.data);
        }
      } catch (error) {
        console.error('Failed to load races', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dRef.current) return;
      let d = parseInt(dRef.current.innerText);
      let h = parseInt(hRef.current.innerText);
      let m = parseInt(mRef.current.innerText);
      m--;
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; d--; }
      if (d < 0) d = 0;
      dRef.current.innerText = String(d).padStart(2, '0');
      hRef.current.innerText = String(h).padStart(2, '0');
      mRef.current.innerText = String(m).padStart(2, '0');
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMove = (e) => {
      document.querySelectorAll('.carbon-texture').forEach(card => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    document.addEventListener('mousemove', handleMove);
    return () => document.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="bg-[#13131b] text-[#e4e1ee]">
      <main className="min-h-screen">
        {/* Hero */}
        <header className="relative w-full min-h-[480px] flex flex-col justify-end px-6 md:px-12 pb-10 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-40 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqp88Q5q83oMS4bMPzaBGGUk3x0uIGejfFx7W5mYEd8k4XDG6Bppx3StaYk_wULKjlNdVttvAY83fuTk5hnrJw4TNRFhLKOb--6HNEJ7I3NrAYnTUymAlR9pb_R22j2ZEJS4xwBgqo-_B_3PhTscd8OOb8Ju70D0VoJSX128nx8lwIIWta91lzPD0_jqHWiat4jUHdzcyZnWoCOMn4O9yuQv__q4MrnuN7J_l7D40yc25pkZ5C5TPUm2JLg1DHgb4-l1FCxgggbOY"
              alt="F1 car blur" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-[#ffb4a7] text-[#670400] font-mono text-xs parallelogram-sm">TELEMETRY TRỰC TIẾP ĐANG HOẠT ĐỘNG</span>
              <span className="font-mono text-xs text-[#d3fbff]">MÙA 2024 // GIAI ĐOẠN 08</span>
            </div>
            <h1 className="text-3xl md:text-[44px] font-black italic uppercase leading-tight text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif', letterSpacing: '-0.04em' }}>
              Lịch <br />đua
            </h1>
            <p className="text-lg max-w-2xl opacity-80">Theo dõi đỉnh cao của môn thể thao tốc độ. Đồng hồ thời gian trực tiếp cho từng Grand Prix trên toàn cầu.</p>
            <Link to="/" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-[#ffb4a7]/10 border border-[#ffb4a7]/20 text-[#ffb4a7] hover:bg-[#ffb4a7] hover:text-[#670400] transition-all parallelogram-sm">
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span className="font-mono text-xs uppercase tracking-widest">Quay về trang chủ</span>
            </Link>
          </div>
        </header>

        {/* Race Grid */}
        <section className="px-6 md:px-16 py-10 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Featured Race */}
          <div className="md:col-span-12 lg:col-span-8 group">
            <div className="bg-[#1f1f28] h-full carbon-texture relative overflow-hidden border border-[#5f3e39] hover:border-[#ffb4a7]/50 transition-all duration-500">
              <div className="p-8 flex flex-col h-full justify-between gap-12">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="text-[#ffb4a7] font-mono text-xs uppercase tracking-widest">Sự kiện tiếp theo</div>
                    <h2 className="text-5xl font-black italic uppercase text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>{loading ? 'Đang tải...' : (races[0]?.race_name || 'Chưa có dữ liệu')}</h2>
                    <p className="text-[#eabcb4]">{loading ? 'Đang tải thông tin chặng đua...' : `${races[0]?.circuit_name || ''}, ${races[0]?.country || ''}`}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-[#eabcb4] uppercase">Bắt đầu sau</div>
                    <div className="flex gap-4 mt-2">
                      {[['04', 'NGÀY', dRef], ['12', 'GIỜ', hRef], ['45', 'PHÚT', mRef]].map(([val, label, ref]) => (
                        <div key={label} className="flex flex-col items-center">
                          <span ref={ref} className="text-2xl font-bold tabular-nums" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</span>
                          <span className="font-mono text-[10px] opacity-50">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-end justify-between">
                  <div className="w-full md:w-1/2">
                    <div className="font-mono text-xs text-[#eabcb4] mb-4 uppercase border-l-2 border-[#ffb4a7] pl-4">Dữ liệu kỹ thuật</div>
                    <div className="grid grid-cols-2 gap-y-4">
                      {[
                        ['Laps', loading ? '...' : (races[0]?.total_laps || '-')],
                        ['Track Length', loading ? '...' : `${races[0]?.circuit_length_km || '-'} km`],
                        ['Race Distance', loading ? '...' : `${(races[0]?.total_laps || 0) * 2.5} km`],
                        ['Race Date', loading ? '...' : new Date(races[0]?.race_date).toLocaleDateString('vi-VN')]
                      ].map(([label, val]) => (
                        <div key={label}>
                          <div className="font-mono text-[10px] uppercase opacity-50">{label}</div>
                          <div className="text-2xl font-bold" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <button className="w-full py-4 bg-[#ffb4a7] text-[#670400] font-mono text-xs uppercase parallelogram-sm hover:scale-105 transition-all active:scale-95">Mua vé</button>
                    <button className="w-full py-4 border-2 border-[#e4e1ee] text-[#e4e1ee] font-mono text-xs uppercase parallelogram-sm hover:bg-[#e4e1ee] hover:text-[#13131b] transition-all active:scale-95">Xem chi tiết</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Races */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {races.map((race) => (
              <button key={race.race_id} type="button" onClick={() => setSelectedRace(race)} className="bg-[#1f1f28] border border-[#5f3e39] hover:border-[#ffb4a7] transition-all p-6 group cursor-pointer overflow-hidden text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-[10px] text-[#eabcb4] uppercase">{new Date(race.race_date).toLocaleDateString('vi-VN')}</div>
                    <h4 className="text-xl font-bold italic uppercase group-hover:text-[#ffb4a7] transition-colors" style={{ fontFamily: 'Anybody, sans-serif' }}>{race.race_name}</h4>
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[10px] opacity-40 uppercase">Địa điểm</div>
                    <div className="text-sm">{race.circuit_name} • {race.country}</div>
                  </div>
                  <span className="px-4 py-2 bg-[#ffb4a7]/10 text-[#ffb4a7] border border-[#ffb4a7]/20 parallelogram-sm font-mono text-[10px] uppercase hover:bg-[#ffb4a7] hover:text-[#670400] transition-all">Chi tiết</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <DetailModal isOpen={Boolean(selectedRace)} onClose={() => setSelectedRace(null)} item={selectedRace} type="race" />
    </div>
  );
}
