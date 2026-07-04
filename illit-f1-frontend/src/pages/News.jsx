import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';

export default function News() {
  const tickerRef = useRef(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Parallelogram button press animation
    const btns = document.querySelectorAll('.parallelogram-btn');
    btns.forEach(btn => {
      btn.addEventListener('mousedown', () => btn.classList.add('scale-95'));
      btn.addEventListener('mouseup', () => btn.classList.remove('scale-95'));
      btn.addEventListener('mouseleave', () => btn.classList.remove('scale-95'));
    });

    // Ticker pause on hover
    const ticker = tickerRef.current;
    if (ticker) {
      ticker.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
      ticker.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
    }
  }, []);

  return (
    <div className="bg-[#0d0d16] text-[#e4e1ee]">
      {/* Breaking News Ticker */}
      <div className="w-full bg-[#ff553d] py-2 border-y border-[#5f3e39] overflow-hidden z-40">
        <div className="ticker-wrap font-mono text-xs text-[#5b0300] font-bold flex items-center">
          <div ref={tickerRef} className="ticker">
            {['BREAKING: UNDERBODY AERO UPDATE FOR SILVERSTONE CONFIRMED',
              'SENSOR RUMOR: NEW POWER UNIT DATA LEAKED FROM TEST FACILITY',
              'OFFICIAL: ILLIT F1 PARTNERS WITH QUANTUM COMPUTING FIRM',
              'DRIVER UPDATE: LECLERC CLAIMS POLE IN SIMULATION SESSION',
            ].map((text, i) => (
              <span key={i} className="mx-8 underline">{text}</span>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-5 md:px-16 py-12">
        {/* Hero Featured News */}
        <section className="mb-16">
          <div className="relative w-full aspect-[21/9] bg-[#1f1f28] overflow-hidden group">
            <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5vfKmP2MUaWIuwuyUR8Xkgkcbr60UICJajX4n36rWuR7735IrBfUkzczIMrK63OeS-j00fm8W0UhWLoZ2o1G1yWM8P7ZUqw7vfeqeti2Q9ZY8Mtri3I0a_wbV1Xql_edF9UnRzP8mPwRJiiVcu6xWcUW1eGZYkoQ4NfNZFZWhnRrMYF-Z7GukFT7cM7cxKojyX2l433ckODdTGnxQIEZl3st5kvK6kKCvzyud9uDlbM7Ut2SPjp-Li209s9O2Tk-D2RG2HZ1SB5U"
              alt="F1 night race" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent" />
            <div className="absolute bottom-12 left-12 right-12 max-w-2xl">
              <span className="bg-[#ff553d] text-[#5b0300] font-mono text-xs px-4 py-1 uppercase parallelogram inline-block mb-4">
                <span className="parallelogram-content">TECH EXCLUSIVE</span>
              </span>
              <h1 className="font-black italic uppercase leading-tight mb-6 text-[#e4e1ee]"
                style={{ fontFamily: 'Anybody, sans-serif', fontSize: 'clamp(1.75rem, 4.2vw, 56px)', letterSpacing: '-0.04em' }}>
                THE CARBON EVOLUTION
              </h1>
              <p className="text-lg text-[#eabcb4] max-w-xl mb-8">
                Deep dive into the material science behind our new chassis. 14% more rigid, 8% lighter, and optimized for maximum downforce.
              </p>
              <button className="parallelogram-btn parallelogram bg-[#ff553d] text-[#5b0300] font-mono text-xs px-8 py-4 hover:brightness-125 transition-all">
                <span className="parallelogram-content font-bold">READ TECHNICAL REPORT</span>
              </button>
            </div>
          </div>
        </section>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8 group cursor-pointer">
            <div className="relative aspect-video bg-[#1f1f28] overflow-hidden">
              <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3E_eXNetv0LmMkx5JLLSyB7SUUQk7fnnRSZBgGkauBe_jIAhntBeBdLnaOvnene5uQno4bmS7XOOHWakBiNLL4Sj2MHJMdv5b9ijpKYmLnA-o_QRdgKF5K2FHSCx8ynK4WfkIT3sYgD8CTVJlocTbdAe6HDa2jYGMq_c9LaUNaD_cZ1_YHNqlAX9pKpZzsNMsiOkb57XIjnSjl4l-kLJAylJFH0TxU_rdOsDrEE9aiYsagswJDoKXih7emaA90J7l0uemT6LjMQo"
                alt="F1 steering wheel" />
              <div className="absolute top-4 right-4 bg-[#ffb4a7] px-3 py-1 font-mono text-[10px] text-[#670400] font-bold">LATEST</div>
            </div>
            <div className="mt-6">
              <h3 className="text-3xl font-bold italic uppercase mb-4 group-hover:text-[#ffb4a7] transition-colors text-[#e4e1ee]"
                style={{ fontFamily: 'Anybody, sans-serif' }}>
                Digital Cockpits: The Future of Driver Interface
              </h3>
              <p className="text-[#eabcb4] mb-6">
                How ILLIT F1 is leveraging augmented reality to provide drivers with real-time strategic overlays during high-speed maneuvers.
              </p>
              <div className="flex items-center gap-4 text-[#454747] font-mono text-[10px]">
                <span>DR. ELARA VANCE</span>
                <span>|</span>
                <span>TECH REPORT</span>
                <span>|</span>
                <span>12 MIN READ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <section className="mt-24 relative p-12 border border-[#5f3e39] bg-[#1b1b24] overflow-hidden">
          <div className="hud-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black italic uppercase mb-4 text-[#e4e1ee]"
                style={{ fontFamily: 'Anybody, sans-serif' }}>SUBSCRIBE TO THE STREAM</h2>
              <p className="text-lg text-[#eabcb4]">Get un-redacted technical reports and paddock rumors delivered directly to your tactical display.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col gap-4">
              <input
                className="bg-transparent border-b-2 border-[#5f3e39] focus:border-[#ffb4a7] text-[#ffb4a7] font-mono text-xs py-4 w-full md:w-80 transition-colors outline-none"
                placeholder="ENTER EMAIL"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <button className="parallelogram-btn parallelogram bg-[#e4e1ee] text-[#13131b] font-mono text-xs font-bold px-8 py-4 hover:bg-[#ffb4a7] transition-colors">
                <span className="parallelogram-content">SUBSCRIBE</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Floating AI Chat */}
      <div className="fixed bottom-8 right-8 z-[100] group" id="ai-chat">
        <div className="absolute bottom-full right-0 mb-4 w-80 bg-[#34343e] border border-[#ffb4a7] p-4 hidden group-hover:block backdrop-blur-xl">
          <div className="hud-grid absolute inset-0 opacity-10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 border-b border-[#ffb4a7] pb-2">
              <span className="material-symbols-outlined text-[#ffb4a7] text-sm">robot_2</span>
              <span className="font-mono text-[10px] text-[#ffb4a7]">AI ASSISTANT V2.0</span>
            </div>
            <div className="font-mono text-xs text-[#e4e1ee] leading-relaxed mb-4 h-32 overflow-y-auto">
              <p className="mb-2 text-[#ffb4a7]">&gt; INITIALIZING CHANNEL...</p>
              <p className="mb-2">&gt; ANALYZING NEW DATA...</p>
              <p>&gt; WOULD YOU LIKE THE FULL CFD ANALYSIS FOR THE NEW FRONT WING?</p>
            </div>
            <input className="w-full bg-[#13131b] border border-[#5f3e39] p-2 font-mono text-[10px] text-[#ffb4a7] outline-none focus:border-[#ffb4a7]"
              placeholder="TYPE COMMAND..." type="text" />
          </div>
        </div>
        <button className="w-16 h-16 bg-[#ff553d] text-[#5b0300] flex items-center justify-center parallelogram neon-glow hover:brightness-125 transition-all">
          <span className="material-symbols-outlined parallelogram-content" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
        </button>
      </div>

      <Footer />
    </div>
  );
}
