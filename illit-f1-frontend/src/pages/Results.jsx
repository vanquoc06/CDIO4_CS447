import { useState } from 'react';
import Footer from '../components/Footer';

const raceResults = [
  { pos: '04', driver: 'GEORGE RUSSELL', car: 'MERCEDES', time: '+13.309s', pts: 12 },
  { pos: '05', driver: 'OSCAR PIASTRI', car: 'MCLAREN', time: '+14.120s', pts: 10 },
  { pos: '06', driver: 'CARLOS SAINZ', car: 'FERRARI', time: '+15.541s', pts: 8 },
  { pos: '07', driver: 'LEWIS HAMILTON', car: 'MERCEDES', time: '+18.001s', pts: 7, note: '*' },
  { pos: '08', driver: 'FERNANDO ALONSO', car: 'ASTON MARTIN', time: '+22.112s', pts: 4 },
  { pos: 'DNF', driver: 'SERGIO PEREZ', car: 'RED BULL RACING', time: 'GEARBOX', pts: 0, dnf: true },
];

const constructors = [
  { name: 'RED BULL RACING', pts: 342, pct: '90%' },
  { name: 'FERRARI', pts: 288, pct: '75%' },
  { name: 'MCLAREN', pts: 245, pct: '65%' },
  { name: 'MERCEDES', pts: 160, pct: '45%', dim: true },
];

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export default function Results() {
  const [messages, setMessages] = useState([
    { type: 'system', text: '# ANALYZING RACE STRATEGY...' },
    { type: 'engineer', text: "Verstappen maintained an average sector 2 delta of -0.21s compared to Leclerc." },
    { type: 'system2', text: "Tire management was critical in lap 45-60. No degradation anomalies detected." },
  ]);
  const [input, setInput] = useState('');
  const [chatVisible, setChatVisible] = useState(true);

  const sendMessage = () => {
    const msg = input.trim();
    if (!msg) return;
    setMessages(prev => [
      ...prev,
      { type: 'user', text: msg },
      { type: 'response', text: 'Message received. Processing...' },
    ]);
    setInput('');
  };

  return (
    <div className="bg-[#13131b] text-[#e4e1ee]">
      <main className="max-w-[1440px] mx-auto">
        {/* Hero */}
        <section className="px-5 md:px-16 py-12 flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <div className="h-1 w-12 bg-[#ffb4a7]" />
            <span className="font-mono text-xs text-[#ffb4a7] uppercase tracking-[0.3em]">TELEMETRY SESSION 042</span>
          </div>
          <h1 className="font-black italic uppercase leading-tight text-[#e4e1ee]"
            style={{ fontFamily: 'Anybody, sans-serif', fontSize: 'clamp(1.75rem, 5vw, 48px)', letterSpacing: '-0.04em' }}>
            FORMULA 1 MONACO<br /><span className="text-[#ff553d]">GRAND PRIX</span>
          </h1>
          <div className="flex gap-8 mt-4">
            {[['STATUS', 'COMPLETED'], ['LAPS', '78/78'], ['TRACK TEMP', '48.2°C']].map(([label, val]) => (
              <div key={label}>
                <p className="font-mono text-xs opacity-50 uppercase">{label}</p>
                <p className="text-2xl font-bold" style={{ fontFamily: 'Anybody, sans-serif' }}>{val}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Podium */}
        <section className="px-5 md:px-16 py-8 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* P2 */}
          <div className="relative group bg-[#1b1b24] p-2 border-l-4 border-[#5f3e39] carbon-texture">
            <div className="absolute -top-6 left-4 font-black italic text-[72px] opacity-10 pointer-events-none text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif' }}>02</div>
            <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS6o_unOL33OEw2vK5sv1Wr7xszw3Dx1i3pOHsQ75T8o4VSRvW9umLf54iKLZ6UuwzvrW3EtedCs3UeiNcdoykgeZOoVOIDATkivF4I_oriQB2-bnv1U2qmP2rROg51h1IBrIHHPmXtZ2hlA5hQDH95H2AVIU85PeawlG4PY7sEkCuCvDzGaWqKC7pCak4YAUU7_nuwu0XV99pz_1b8kEbFOCgjgcKaM_4OpuXhoh0j7NEqh_I73Z7Z-csOej-beOoLBCqFvf3YE0"
                alt="P2" />
            </div>
            <div className="mt-4">
              <p className="font-mono text-xs text-[#ffb4a7]">SCUDERIA FERRARI</p>
              <h3 className="text-2xl font-bold italic uppercase text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>CHARLES LECLERC</h3>
              <p className="font-mono text-xs opacity-70 mt-2">+0.00.742</p>
            </div>
          </div>

          {/* P1 */}
          <div className="relative group bg-[#34343e] p-4 border-t-8 border-[#ffb4a7] carbon-texture scale-105 z-10">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black italic text-[96px] text-[#ffb4a7] opacity-20 pointer-events-none"
              style={{ fontFamily: 'Anybody, sans-serif' }}>01</div>
            <div className="aspect-[4/5] overflow-hidden">
              <img className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWaAIpOJKi3hnpAnUczz6qw2-n2CRF0ftbzNundd3-OJTiN70e1L7PZISw5dJyz8dpw8kmGeVzACkesFdcYvsXm4RFhqkblK3tWY77D8t6anwUcxUliUb8yiVdzxXqsEQYCexLW5apyD_Y3ZgmlTn6aydMcd5p4E-pM6o-wMjzPM93GZEJIXBsDSSSbYS87qUgYTJgrypJCBDTYVjZ9vicWgrLAHB0-8AL36qd1vqpiSMCHbTW0odM-8LbCBBFzYuPcNUk3ZqaZu0"
                alt="P1" />
            </div>
            <div className="mt-4 flex justify-between items-end">
              <div>
                <p className="font-mono text-xs text-[#ffb4a7]">RED BULL RACING</p>
                <h3 className="text-3xl font-black italic uppercase leading-none text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>MAX VERSTAPPEN</h3>
              </div>
              <div className="bg-[#ffb4a7] px-4 py-2 parallelogram">
                <span className="font-mono font-bold text-[#670400]">WINNER</span>
              </div>
            </div>
          </div>

          {/* P3 */}
          <div className="relative group bg-[#1b1b24] p-2 border-r-4 border-[#5f3e39] carbon-texture">
            <div className="absolute -top-6 right-4 font-black italic text-[120px] opacity-10 pointer-events-none text-[#e4e1ee]"
              style={{ fontFamily: 'Anybody, sans-serif' }}>03</div>
            <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <img className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4EX2FxsNGsv64EJUt8w4dIlaNl1YhlAWVcb05TnzpO0-HwtrYQ5KziKBx4cy1nDYGlvLmWtjsiLS0DUfpDLTgU5xmGzxr7TpyV8EEUAA5JqVh9ghKVtCMH4Nn7Cu8HkvMzrU43jpacoWmkId2HTXUjDISBcEGojIZ40F5WsXv9qaJZ0XCrlt4fjFyeHD1YCQbNgEKzhydcIg-advGh3e7xEpOmOVxz66w19Vn0NzJHD4MzBl5qu9KQ64YhKvFphpHV-8tEOvTqBA"
                alt="P3" />
            </div>
            <div className="mt-4 text-right">
              <p className="font-mono text-xs text-[#ffb4a7]">MCLAREN F1</p>
              <h3 className="text-2xl font-bold italic uppercase text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>LANDO NORRIS</h3>
              <p className="font-mono text-xs opacity-70 mt-2">+0.08.215</p>
            </div>
          </div>
        </section>

        {/* Race Data */}
        <section className="px-5 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Table */}
          <div className="lg:col-span-8 bg-[#1f1f28] p-6 border border-[#5f3e39] overflow-x-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-tight" style={{ fontFamily: 'Anybody, sans-serif' }}>RACE CLASSIFICATION</h2>
              <span className="font-mono text-xs text-[#ffb4a7]">VERIFIED TELEMETRY</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#5f3e39]">
                  {['POS', 'DRIVER', 'CAR', 'TIME/RETIRED', 'PTS'].map(h => (
                    <th key={h} className="py-4 font-mono text-xs opacity-50 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-mono">
                {raceResults.map((r) => (
                  <tr key={r.driver} className="border-b border-[#5f3e39]/30 hover:bg-[#34343e]/20 transition-colors cursor-pointer"
                    onClick={e => { e.currentTarget.style.transform = 'scale(0.98)'; setTimeout(() => e.currentTarget.style.transform = '', 75); }}>
                    <td className={`py-4 ${r.dnf ? 'text-[#ffb4ab]' : ''}`}>{r.pos}</td>
                    <td className="py-4 font-bold">{r.driver}</td>
                    <td className="py-4 opacity-70">{r.car}</td>
                    <td className={`py-4 ${r.dnf ? 'text-[#ffb4ab]' : ''}`}>{r.time}</td>
                    <td className="py-4 text-[#ffb4a7]">{r.pts > 0 ? `${r.pts}${r.note || ''}` : '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex gap-4">
              <div className="flex items-center gap-1 text-[10px] opacity-50">
                <span className="material-symbols-outlined text-sm">timer</span>
                <span>* INCLUDES FASTEST LAP POINT</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Fastest Lap */}
            <div className="bg-[#ffb4a7] text-[#670400] p-6 parallelogram relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <span className="material-symbols-outlined text-[120px]">speed</span>
              </div>
              <p className="font-mono text-xs uppercase tracking-widest mb-2 parallelogram-content">FASTEST LAP</p>
              <h3 className="text-2xl font-bold italic uppercase leading-none parallelogram-content" style={{ fontFamily: 'Anybody, sans-serif' }}>L. HAMILTON</h3>
              <p className="text-4xl font-black italic mt-2 parallelogram-content" style={{ fontFamily: 'Anybody, sans-serif' }}>1:12.909</p>
              <p className="font-mono text-xs mt-2 parallelogram-content">LAP 72 / MERCEDES F1</p>
            </div>

            {/* Constructor Standings */}
            <div className="bg-[#292933] p-6 border border-[#5f3e39] flex flex-col gap-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#ffb4a7]">CONSTRUCTOR STANDINGS</h4>
              <div className="space-y-4">
                {constructors.map((c) => (
                  <div key={c.name} className={`flex items-center justify-between ${c.dim ? 'opacity-50' : ''}`}>
                    <span className="font-mono text-xs">{c.name}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 h-2 bg-[#34343e] rounded-full overflow-hidden">
                        <div className="h-full bg-[#ffb4a7]" style={{ width: c.pct }} />
                      </div>
                      <span className="font-mono font-bold text-xs">{c.pts}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 border border-[#b08780] py-2 uppercase font-mono text-xs hover:bg-[#ffb4a7] hover:text-[#670400] transition-colors italic">
                VIEW FULL SEASON DATA
              </button>
            </div>

            {/* AI HUD */}
            <div className="hud-border bg-[#1b1b24] p-4 carbon-texture">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#d3fbff] text-lg">emergency_home</span>
                <span className="font-mono text-[10px] text-[#d3fbff]">AI ANALYTICS ENGINE</span>
              </div>
              <p className="font-mono text-xs leading-relaxed opacity-80">
                <span className="text-[#ffb4a7]">&gt;</span> DEGRADATION RATE: NOMINAL<br />
                <span className="text-[#ffb4a7]">&gt;</span> OVERTAKE EFFICIENCY: 12%<br />
                <span className="text-[#ffb4a7]">&gt;</span> PIT STOP AVG: 2.15s<br />
                <span className="text-[#ffb4a7]">&gt;</span> STRATEGY DEVIATION: -4.2s
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-5 md:px-12 py-16">
          <div className="relative w-full aspect-[21/9] flex items-center justify-center overflow-hidden">
            <img className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlPlHNzGximRBI6Ismp6i_7_sTIOB6wo88RcU8sHXYyxwHgxtZB-zQ98SsciS_g8nUF8mYUoP2pSKJpmDNVasp34jd9hcmReIcrzA5CpBZjgsmw-SKr3euJc0gaTG8xC2DQR-fa6O6Nv6AKlqStEW9IIRjkg08VUDOANPA5Ac1stm6wgW2V9M8rwZ_qHj5KnBv0F9X1sIrZebQ85GTZ50IXR-m7V0EfSVbMs0M2aBYV4yoW3vIqO3OjGKdsuTf1Q3pJEFo0PiL6MM"
              alt="F1 motion" />
            <div className="relative z-10 text-center flex flex-col items-center gap-6">
              <h2 className="font-black italic uppercase text-[#e4e1ee]"
                style={{ fontFamily: 'Anybody, sans-serif', fontSize: 'clamp(2rem, 6vw, 84px)', letterSpacing: '-0.04em' }}>
                UNPARALLELED ACCESS
              </h2>
              <p className="text-lg max-w-xl">Join the inner circle of ILLIT F1 for exclusive technical breakdowns.</p>
              <div className="flex w-full max-w-md">
                <input className="bg-[#1b1b24] border-0 border-b-2 border-[#5f3e39] focus:border-[#ffb4a7] focus:ring-0 w-full font-mono text-xs text-[#e4e1ee] px-3 py-3"
                  placeholder="ENTER TELEMETRY ID (EMAIL)" type="email" />
                <button className="bg-[#ffb4a7] text-[#670400] parallelogram px-8 py-3 font-mono font-bold text-xs uppercase hover:scale-105 transition-transform">
                  <span className="parallelogram-content">JOIN</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* HUD Chat Widget */}
      {chatVisible && (
        <div className="fixed bottom-8 right-8 z-[100] hidden md:block">
          <div className="hud-border bg-[#0d0d16]/80 backdrop-blur-md w-72 p-6 carbon-texture shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#d3fbff] animate-pulse rounded-full" />
                <span className="font-mono text-[10px] text-[#d3fbff]">PIT_COMMUNICATION_LINK</span>
              </div>
              <button onClick={() => setChatVisible(false)} className="material-symbols-outlined text-[#eabcb4] text-sm cursor-pointer">close</button>
            </div>
            <div className="font-mono text-xs text-[#e4e1ee] space-y-4 mb-4 h-48 overflow-y-auto pr-2">
              {messages.map((m, i) => (
                <p key={i}>
                  {m.type === 'system' && <span className="opacity-50">{m.text}</span>}
                  {m.type === 'engineer' && <><span className="text-[#ffb4a7]">[ENGINEER]:</span> {m.text}</>}
                  {m.type === 'system2' && <><span className="text-[#ffb4a7]">[SYSTEM]:</span> {m.text}</>}
                  {m.type === 'user' && <><span className="text-[#d3fbff]">[USER]:</span> {m.text}</>}
                  {m.type === 'response' && <><span className="text-[#ffb4a7]">[SYSTEM]:</span> {m.text}</>}
                </p>
              ))}
            </div>
            <div className="relative flex gap-2">
              <input
                className="flex-1 bg-[#1f1f28] border-0 border-b-2 border-[#d3fbff] focus:ring-0 font-mono text-[10px] uppercase text-[#e4e1ee] px-2 py-1"
                placeholder="ASK_PIT_WALL..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="text-[#ffb4a7] material-symbols-outlined">send</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
