import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import DetailModal from '../components/DetailModal';

const upcomingRaces = [
  { round: 'R09 // 07-09 JUN', name: 'Canada', location: 'Montreal', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGDUjaw9DI_uGvMgTTY44krqeRzOQ1Jv0cxLNg5N5GPIHvRrhQVDNW4CziAm-1hlCiJ-2-K4_5-DKQRh2Brrs8_R8RfALxPP3DHvWASWJ0Yf6EkYm_HKxvsUfP7Zri17lxmorBRRf2tX9KfJV6HMudK1ZRoOEgK2SQjie9lRZ8kLTbuL39YaIjpE74_VLi7AuANAhCyqVN8GRq1-bbAxkWiS01YhpokTkdxXUZRTaUtxd0zUgACua5JyiYkwj56vjS5BiryaPim78' },
  { round: 'R10 // 21-23 JUN', name: 'Spain', location: 'Barcelona', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaT_GW3ODXDlnI0uSbf01irHdKfdCUAy2x_ApYaI7uC4F4WqwmDrKvydu-YBRgvRq08SUSXl9O8zp0UAe0HuTUu3dmLbsqG_Qf4IrhqKB9cB6W3wJZkpUk3kjM4fja1XScNDRJoc8vTtbtsMgA113xXkA9oTfX8xDo16m9EDJWsT-3UfhQGeV_xczyi1j7034auEMHbc0O4Uj5z5n8MLIHSTBOeRxQl7MWlyFl_etUfdC9KOy0Gb3_sMJ1xfBZEMOIuiDt3EfJG6k' },
  { round: 'R11 // 28-30 JUN', name: 'Austria', location: 'Spielberg', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0TICHHpKHtnC-s1gmCMmKeyJD5MQQT6o2ioAb2X0NZL__DULBCOA3fWtwPAPalDjhpwHR4HNZ1wrOeg0LfwAbNDHq_kt4PtH5AamlvX6vCyclWkoDnWth26C6Py7XMZobREMQ0pLNa_u0b7fYCKiU47t79y7GBvUzedFsPoElhKgw4iCamYdSMo7fTGgQQGoPzK7l2MiGMptShyqvcp145dk0S8G29WseKqgOJBQfPJLGDH72Uu-m7QIit-7Rnd3FtdsFHXlJYaI' },
  { round: 'R12 // 05-07 JUL', name: 'Great Britain', location: 'Silverstone', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6xZ684Bv2v7DENra7mQamSyo6VQHl7eAKLf4Mb-D2XunJQa-5piiW1yGW3M-VSqTNODWkjgR9RBuHpeUEYoomwvUSFN3uNMutPuPWG8xlFyTOZu9zEPNbBkaBLr17z6zf2cum6BSCvPlbb4Gj_opqbKzqpBJ8f7Tdye4-JbEhJoOrZZ8YiW5C7Z3rkCCKm2Ybwk0XJSnR4_Qijz_D6Y9cF1Ij90urlH3b0fDZvfef6pFxobPlDGZC84lBp5fa0CM-z-jVL4UZIXI' },
  { round: 'R13 // 19-21 JUL', name: 'Hungary', location: 'Budapest', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrPyHkdWxM0r3S-TxW2RduCmLsKgqXV_bHiNeddCmB-6aAUs_IJMjKdzJWCGtsmgXl55OF-5AHfcLetqk62G6SSh6xkzDaj84kIcpBwkU5aZj2jEK3_eZA82_XyvtGLbWsNfqJ9ucVigTvM3UaLx8yjbBL4Vh450-lM0ywkAf_T9xcrhDRXsHUMM45QjZZSrqzGR3mdS13qVi2RksFQ4rym2sodE5g3mPl7x7RguUsur5qVnaMFGUQBRdYSqZAcJlshgkJKk6boQ4' },
  { round: 'R14 // 26-28 JUL', name: 'Belgium', location: 'Spa', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCqlJbh3hVNTD3WDCNyIlpH6AfnmSURe_NEzg6SIa96JDoAtg-xbJW4YZRvjCFnsGd-VNG5DqSFLQ7zE67rw1CB6wejP6fUgMTSfRm6_SpFTP4AP-VFNXkBU2DoIcBxktQN4-LAqTbdPdpaID5zHh5Ho13ywSiGPxp4qRFA5J2XeXjq6NnFTIwTKGSX21gkswK-Ed06CwddaOQMQtcg1Z0gEwF8ByAf5WqfAhb_3TWbkjDU8uk2DfGFaGDgwIA6FYMQr5SKH1yJ44' },
];

export default function Schedule() {
  const dRef = useRef(null);
  const hRef = useRef(null);
  const mRef = useRef(null);
  const [selectedRace, setSelectedRace] = useState(null);

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
              <span className="px-3 py-1 bg-[#ffb4a7] text-[#670400] font-mono text-xs parallelogram-sm">LIVE TELEMETRY ACTIVE</span>
              <span className="font-mono text-xs text-[#d3fbff]">SEASON 2024 // STAGE 08</span>
            </div>
            <h1 className="text-3xl md:text-[44px] font-black italic uppercase leading-tight text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif', letterSpacing: '-0.04em' }}>
              Race <br />Schedule
            </h1>
            <p className="text-lg max-w-2xl opacity-80">Follow the pinnacle of speed sport. Live timing for every Grand Prix around the globe.</p>
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
                    <div className="text-[#ffb4a7] font-mono text-xs uppercase tracking-widest">Next Event</div>
                    <h2 className="text-5xl font-black italic uppercase text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>Monaco Grand Prix</h2>
                    <p className="text-[#eabcb4]">Circuit de Monaco, Monte Carlo</p>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-[#eabcb4] uppercase">Starts In</div>
                    <div className="flex gap-4 mt-2">
                      {[['04', 'DAYS', dRef], ['12', 'HRS', hRef], ['45', 'PHÚT', mRef]].map(([val, label, ref]) => (
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
                    <div className="font-mono text-xs text-[#eabcb4] mb-4 uppercase border-l-2 border-[#ffb4a7] pl-4">Technical Data</div>
                    <div className="grid grid-cols-2 gap-y-4">
                      {[['Laps', '78'], ['Track Length', '3.337 km'], ['Race Distance', '260.2 km'], ['Lap Record', '1:10.166']].map(([label, val]) => (
                        <div key={label}>
                          <div className="font-mono text-[10px] uppercase opacity-50">{label}</div>
                          <div className="text-2xl font-bold" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 flex flex-col gap-4">
                    <button className="w-full py-4 bg-[#ffb4a7] text-[#670400] font-mono text-xs uppercase parallelogram-sm hover:scale-105 transition-all active:scale-95">Buy Tickets</button>
                    <button className="w-full py-4 border-2 border-[#e4e1ee] text-[#e4e1ee] font-mono text-xs uppercase parallelogram-sm hover:bg-[#e4e1ee] hover:text-[#13131b] transition-all active:scale-95">View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Races */}
          <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {upcomingRaces.map((race) => (
              <button key={race.name} type="button" onClick={() => setSelectedRace(race)} className="bg-[#1f1f28] border border-[#5f3e39] hover:border-[#ffb4a7] transition-all p-6 group cursor-pointer overflow-hidden text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-mono text-[10px] text-[#eabcb4] uppercase">{race.round}</div>
                    <h4 className="text-xl font-bold italic uppercase group-hover:text-[#ffb4a7] transition-colors" style={{ fontFamily: 'Anybody, sans-serif' }}>{race.name}</h4>
                  </div>
                  <div className="w-12 h-12 opacity-40 group-hover:opacity-100 transition-opacity">
                    <img className="w-full h-full object-contain invert" src={race.img} alt={race.name} />
                  </div>
                </div>
                <div className="mt-8 flex justify-between items-end">
                  <div>
                    <div className="font-mono text-[10px] opacity-40 uppercase">Location</div>
                    <div className="text-sm">{race.location}</div>
                  </div>
                  <span className="px-4 py-2 bg-[#ffb4a7]/10 text-[#ffb4a7] border border-[#ffb4a7]/20 parallelogram-sm font-mono text-[10px] uppercase hover:bg-[#ffb4a7] hover:text-[#670400] transition-all">Details</span>
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
