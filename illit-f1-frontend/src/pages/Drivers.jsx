import { useEffect, useMemo, useRef, useState } from 'react';
import Footer from '../components/Footer';
import DetailModal from '../components/DetailModal';

const drivers = [
  { id: 2, name: 'LUCA', surname: 'BIANCHI', team: 'CYBERDRIVE GP', number: 11, pts: 189, pos: '04', podiums: '06', color: 'secondary-fixed-dim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYbYhlA-L6FTDbl0ij4Ivh5cQFVWM-kCogKgCb24GKPqqqlbCEuxNwh2zthaDZAoPSWDeMzvMRG2Mifbsgf7lCpLSuQYnQ4EGCoCb-_Z_XJoJ9BqzjJCqhCQS9Ex7UtohYiuFnSJJZWz1doyWvFEIygfbY_IPuzPgy0A2Ko7V1YeJ4vu1ylDgYI5MdhB4vfu4ecAoOpzMPRuQjU60iZ8aloruFDEnYXvO8oAJ5zhepN91UDkDHIuHfl2oMTvntHdFeXxsJuco9II8' },
  { id: 3, name: 'SOFIA', surname: 'RHODES', team: 'APEX DYNAMICS', number: 7, pts: 154, pos: '06', podiums: '03', color: 'primary', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHUCWdG4D93Zh-ul5bm6YUI5lUP2y0nd5cabQF3b_YiA9wBl6peWxAT5adhORlHRHZE5V1a4UCcjLKrt5gJUzT-bQPnCtGgAkOFcp7EaXGKkUtPnJd3Jl5m8Koma9LKJXOUdGcj8l4rbv609K9tNVOQZbCEUjfeSKtx4oCrHcqesD1JVwtTvhpCzVOqVi6e59kks2pEg59FZ5f9cttxGQK42Ul2mTp1w4ykP_cIv6XJHdVLSRlk2C5gA6HGzXN7kymgbJMogIdkUE' },
  { id: 4, name: 'JAXON', surname: 'REED', team: 'NOVA TECH F1', number: 22, pts: 112, pos: '09', podiums: '01', color: 'secondary-fixed-dim', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIalQ4JW9v4s15h2yzGm8B2Pp0dQRVJgOTTiAcA_M95FGDZ2lcvuqa4IhiJw9SCBv3oj1X-CGFDvhAHhJLSI432O0r_uLsY9GS_Lfx925ZqLvWl1ufPPbd1L8gnoYBOtjDyZ3zeIAsEVcO4f4ZcLk3TnxFp8wWq0PBs_eL6jLeF3BEFYl1qV6g_IJXA0Wyij0YSXFSbM-ZN06lK_tRkw2Ef_R5oN9rYpon5BcVgdqdsgeCi2PLkks9lNc_rQIAJXBTCsCXvI5SDk4' },
];

const AI_LOGS = [
  '> TRACK TEMP: 48.2°C', '> DOWNFORCE ADJUSTMENT: +1.2%', '> FUEL MIX: STRATEGY 3 ACTIVE',
  '> DRIVER VITAL: HR 162 BPM (STEADY)', '> G-FORCE PEAK: 5.4G (TURN 8)',
  '> DRS ENABLED: SECTOR 2', '> CALCULATING DELTA TO P2...', '> GAP: -1.242s (GAINING)',
];

export default function Drivers() {
  const terminalRef = useRef(null);
  const logIndex = useRef(0);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const driverList = useMemo(() => drivers, []);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    const interval = setInterval(() => {
      const p = document.createElement('p');
      p.textContent = AI_LOGS[logIndex.current % AI_LOGS.length];
      p.className = 'text-[#d3fbff]';
      terminal.appendChild(p);
      terminal.scrollTop = terminal.scrollHeight;
      logIndex.current++;
      if (terminal.children.length > 30) terminal.removeChild(terminal.firstChild);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#13131b] text-[#e4e1ee]">
      {/* Hero */}
      <header className="relative w-full min-h-[460px] flex items-end px-6 md:px-12 pb-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfahAutrwOMT52zzb3GhcenAy-bpJnSKPPun2nnyumdLt6K_AKcXWpg7FOCoYyxqOhKE9qtqhsuztawkkdbkK5vx-QKEmJX0w3PGyqMguxI0imh6tdpgx74bJYknlh5Ksw5IEpOjsZ51pJGgtKC0bqCzoNmjNYbuVftD80rkmAMOTxL9vDj-OuUL0UZdJxYJk_JgSiBo06lkK6WlEwzQiGAtIjYy2OPMNid_iSmO1Jn8zzYx9w-EwM-gDQqeWx3AwmUvNq7F3rSwM"
            alt="F1 car" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl">
          <h1 className="text-3xl md:text-[48px] font-black italic uppercase leading-tight mb-4 text-[#e4e1ee]"
            style={{ fontFamily: 'Anybody, sans-serif', letterSpacing: '-0.04em' }}>
            GRID <span className="text-[#ff553d]">2024</span>
          </h1>
          <p className="text-lg text-[#eabcb4] max-w-xl">
            Precision engineering combined with raw human talent. Discover the elite roster pushing the boundaries of physics and performance.
          </p>
        </div>
      </header>

      {/* Driver Bento Grid */}
      <main className="px-6 md:px-12 py-16 bg-[#13131b]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Featured Driver Card */}
          <div className="md:col-span-8 group relative overflow-hidden bg-[#292933] border border-[#5f3e39] hover:border-[#ffb4a7] transition-all duration-500">
            <div className="absolute top-6 left-6 z-20">
              <span className="font-mono text-xs bg-[#ff553d] text-[#5b0300] px-3 py-1 parallelogram inline-block">
                <span className="parallelogram-content">HẠNG #01</span>
              </span>
            </div>
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/2 relative overflow-hidden h-[400px] md:h-auto">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkhuZOdP5GCfFqQoLgblH-yzsqdZ9O2dxNBwoYgfipCZSefqfB6tMshC4S0p4uSc8aOPoMXZKBU012YV0ED6j2zLLRG8QuPHCHMMTn_JwTvGOhLgyJpXsqTcOm-VtbkKgLBvqouDjH_RXDsxRMnv_52m3ZOuhSaTynEpP1QoRqS5mxJT_Iieowew2fDJdyclgJbOCSAORecuzFVj9j5n6_03KUlxZHajT0ahEESMGnHplgRKR6sAlQQkymEFEtkbsVbrfZWy8sWI0"
                  alt="Driver 1" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#292933] hidden md:block" />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                <div className="font-black italic text-[48px] absolute -right-4 -top-8 opacity-5 text-[#e4e1ee] pointer-events-none">44</div>
                <h2 className="text-3xl font-black italic uppercase leading-none mb-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  MAX <br /><span className="text-[#ffb4a7]">VELOCITY</span>
                </h2>
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-mono text-xs text-[#eabcb4] border-r border-[#5f3e39] pr-4">ILLIT RACING</span>
                  <span className="font-mono text-xs text-[#ffb4a7]">STATUS: OPTIMAL</span>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[['WINS', '12'], ['PODIUMS', '18'], ['POINTS', '342']].map(([label, val]) => (
                    <div key={label}>
                      <p className="font-mono text-xs text-[#eabcb4] uppercase">{label}</p>
                      <p className="text-2xl font-bold" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</p>
                    </div>
                  ))}
                </div>
                {/* Telemetry Hover Overlay */}
                <div className="absolute inset-0 bg-[#34343e] p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center border-l-4 border-[#ffb4a7]">
                  <h3 className="font-mono text-xs text-[#d3fbff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">analytics</span> LIVE DATA
                  </h3>
                  <div className="space-y-4">
                    {[['RESPONSE TIME', '0.18s', '92%', '#ffb4a7'], ['AVG CORNERING G', '5.2G', '85%', '#00dbe9'], ['TIRE MANAGEMENT', 'OPTIMAL', '98%', '#ffb4a7']].map(([label, val, w, color]) => (
                      <div key={label}>
                        <div className="flex justify-between font-mono text-[10px] mb-1">
                          <span>{label}</span><span>{val}</span>
                        </div>
                        <div className="h-1 bg-[#34343e] w-full overflow-hidden">
                          <div className="h-full" style={{ width: w, backgroundColor: color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-8 parallelogram bg-[#ffb4a7] text-[#670400] py-3 px-6 w-fit font-mono text-xs hover:bg-white hover:text-black transition-colors">
                    <span className="parallelogram-content">FULL DATA SET</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Standard Driver Cards */}
          {driverList.map((d) => (
            <button key={d.id} type="button" onClick={() => setSelectedDriver(d)} className="md:col-span-4 group bg-[#1f1f28] border border-[#5f3e39] hover:border-[#ffb4a7] transition-all text-left">
              <div className="relative h-64 overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={d.img} alt={d.name} />
                <div className="absolute bottom-0 right-0 font-black italic text-6xl text-white opacity-20 p-4"
                  style={{ fontFamily: 'Anybody, sans-serif' }}>{d.number}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold italic uppercase mb-1 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {d.name} <span className="text-[#ffb4a7]">{d.surname}</span>
                </h3>
                <p className="font-mono text-xs text-[#eabcb4] mb-6 uppercase">{d.team}</p>
                <div className="flex justify-between border-t border-[#5f3e39] pt-4">
                  {[['POINTS', d.pts], ['POSITION', d.pos], ['PODIUMS', d.podiums]].map(([label, val]) => (
                    <div key={label} className="text-center">
                      <span className="block font-mono text-[10px] opacity-50 uppercase">{label}</span>
                      <span className="text-2xl font-bold" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </button>
          ))}

          {/* CTA Card */}
          <div className="md:col-span-4 bg-[#ff553d] p-8 flex flex-col justify-between parallelogram">
            <div className="parallelogram-content">
              <h3 className="text-2xl font-bold text-[#5b0300] leading-tight mb-4" style={{ fontFamily: 'Anybody, sans-serif' }}>
                REAL-TIME PERFORMANCE<br />HUB
              </h3>
              <p className="text-[#5b0300] opacity-80 mb-6">Access raw telemetry data directly from ECU to your display.</p>
            </div>
            <div className="parallelogram-content">
              <button className="w-full bg-[#5b0300] text-white py-4 font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                LAUNCH DASHBOARD
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* AI Terminal Section */}
      <section className="px-6 md:px-12 py-16 bg-[#13131b] relative overflow-hidden">
        <div className="carbon-pattern absolute inset-0 opacity-10" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-8 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
              AI STRATEGY <span className="text-[#ffb4a7]">GARA</span>
            </h2>
            <div className="bg-[#292933] border border-[#d3fbff]/30 p-6 font-mono text-[#d3fbff] overflow-hidden">
              <div ref={terminalRef} className="space-y-2 h-64 overflow-y-auto" />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg mb-8">Our in-house AI analyzes millions of data points per second to deliver strategic advantage.</p>
            <div className="flex flex-wrap gap-4">
              <button className="parallelogram border-2 border-white px-8 py-3 font-mono hover:bg-white hover:text-black transition-all">
                <span className="parallelogram-content">VIEW ENGINE DATA</span>
              </button>
              <button className="parallelogram bg-[#00eefc] text-[#00686f] px-8 py-3 font-mono hover:bg-[#d3fbff] transition-all">
                <span className="parallelogram-content">STRATEGY REPORT</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <DetailModal isOpen={Boolean(selectedDriver)} onClose={() => setSelectedDriver(null)} item={selectedDriver} type="driver" />
    </div>
  );
}
