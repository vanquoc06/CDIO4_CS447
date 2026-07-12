import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function Homepage() {
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroImage = document.querySelector('.hero-parallax');
      if (heroImage) heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-body bg-[#13131b] text-[#e4e1ee]">
      {/* Hero Section */}
      <section className="relative min-h-[620px] flex items-center overflow-hidden py-12">
        <div className="absolute inset-0 z-0">
          <img
            className="hero-parallax w-full h-full object-cover brightness-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBghBHlFN973Bl8ZeSH5GIPVes1Vp7RGcfbNW3utdONBBHvIIkZ7sIU2rbQWV1BNxGEttP_9RUZryQLcQ_1mCVLSkH-J01qwDr6TwvGTwmIPXj37mXUH5lVYlsHLN_KHCS5UaZFAZTTVXi5qdrikF7H3Xh1WDq9aLcxPsaxRR5Mp5n8LBeID7P04APcwPimKgUEqVzW44Q7lT7n5YPEA3fM4wPeV9yH4HfmsrGI_VoXB4Gx5T3fNZqs0NCjkslnIB1KeXgkSay94Vc"
            alt="F1 car at night"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13131b] via-transparent to-transparent" />
          <div className="hud-grid absolute inset-0 opacity-20" />
        </div>
        <div className="relative z-10 px-6 md:px-12 w-full max-w-[1000px] mx-auto">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#ffb4a7]/10 border border-[#ffb4a7]/20 px-3 py-1 mb-3">
              <span className="material-symbols-outlined text-[#ffb4a7] text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-mono text-[0.65rem] text-[#ffb4a7] uppercase">Engine status: Maximum performance</span>
            </div>
            <h1 className="font-display text-3xl md:text-[44px] font-black italic uppercase leading-tight text-[#e4e1ee] tracking-[-0.04em]">
              DESIGNED<br /><span className="text-[#ffb4a7]">FOR SPEED</span>
            </h1>
            <p className="font-body text-sm md:text-base text-[#eabcb4] max-w-lg opacity-80">
              Welcome to the digital heart of Formula 1. Experience the intersection of pure mechanical power and elite engineering.
            </p>
            <div className="flex flex-wrap gap-4 pt-8">
              <Link to="/schedule" className="bg-[#ffb4a7] text-[#670400] parallelogram px-10 py-4 font-mono text-xs uppercase tracking-widest hover:scale-105 transition-transform inline-flex items-center justify-center">
                <span className="parallelogram-content">Explore the track</span>
              </Link>
              <Link to="/schedule" className="border-2 border-[#e4e1ee] text-[#e4e1ee] parallelogram px-10 py-4 font-mono text-xs uppercase tracking-widest hover:bg-[#e4e1ee] hover:text-[#13131b] transition-all inline-flex items-center justify-center">
                <span className="parallelogram-content">View the schedule</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase opacity-40">Scroll to Explore</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#ffb4a7] to-transparent" />
        </div>
      </section>

      {/* The Pinnacle of Motorsport */}
      <section className="py-12 bg-[#0d0d16] carbon-texture">
        <div className="px-6 md:px-12 max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="font-mono text-[#ffb4a7] text-xs uppercase tracking-widest">TECHNICAL PRESTIGE</span>
                <h2 className="font-display text-4xl md:text-5xl font-black italic uppercase leading-tight text-[#e4e1ee]">
                  The Pinnacle of Motorsport
                </h2>
                <div className="h-1 w-24 bg-[#ffb4a7]" />
              </div>
              <div className="font-body space-y-6 text-[#eabcb4] leading-relaxed">
                <p>Formula 1 is the ultimate icon of automotive engineering. Every car is a prototype, a complex symphony of carbon fiber, hybrid powertrain, and aerodynamic surfaces engineered to control the very air it breathes.</p>
                <p>When G-forces climb above 5G through corners and engines produce over 1,000 horsepower, the line between human and machine blurs.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-[#ffb4a7] pl-4">
                  <div className="font-mono text-2xl text-[#e4e1ee]">370+ KPH</div>
                  <div className="font-mono text-[10px] uppercase opacity-50">Top speed capability</div>
                </div>
                <div className="border-l-2 border-[#ffb4a7] pl-4">
                  <div className="font-mono text-2xl text-[#e4e1ee]">1.8 SEC</div>
                  <div className="font-mono text-[10px] uppercase opacity-50">World record pit stop</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-[#292933] overflow-hidden border border-[#5f3e39] group">
                <img
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvtZrYIo25zT0gJyLnO1qGpYK0zYu-NP8uh2cfIURK56VWpiJi1nRKKetveR51K1syQVOArXlaFPyESblkuXaueokpEXZBHiZ2JgJ7oLCpopsxW8Ww8PuINcfgZN3JCBM0YzQ2Hk8jVTztfuhVJMvpG3gAmRS6l2XaeHejut4mOSfbZxNlr8ozBMNqHplXlwUAxwTF8lcBfjBEAHZ2r4YqVdV4GEUVmi1jT_QHWOqodsK0NO5dBnd8bMUiWBFYyRNTMWln9YrF50"
                  alt="F1 blueprint"
                />
                <div className="hud-grid absolute inset-0 opacity-10" />
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#13131b]/80 backdrop-blur-sm border border-[#ffb4a7]/20">
                  <div className="font-mono text-[10px] text-[#ffb4a7] uppercase mb-1">DATA ANALYSIS</div>
                  <div className="font-mono text-xs">AERO_EFFICIENCY_MAP_V2.04</div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#ffb4a7] opacity-30" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-[#ffb4a7] opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* 2024 Season Coverage */}
      <section className="py-12 bg-[#13131b]">
        <div className="px-6 md:px-12 max-w-[1000px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="space-y-2">
              <h2 className="font-display text-3xl md:text-4xl font-black italic uppercase text-[#e4e1ee]">
                Track the 2024 Season
              </h2>
              <p className="font-mono text-xs text-[#eabcb4] tracking-[0.2em]">LIVE FROM PIT WALL</p>
            </div>
            <Link to="/schedule" className="font-mono text-xs text-[#ffb4a7] hover:underline flex items-center gap-2">
              SEE 2024 SCHEDULE <span className="material-symbols-outlined text-sm">calendar_month</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Card */}
            <div className="group bg-[#1f1f28] border border-[#5f3e39] hover:border-[#ffb4a7] transition-all duration-500 overflow-hidden">
              <div className="aspect-video relative overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsp55UM8txec0otU9upO7PagQqsnAoSsXEUzwF7gl3Zhdw9M7rLe7NtKqIk3hAgXpmxyIFZSfqLHxQrx3Di0zSoqx_4AxFH-DpzduADYTKI5sh70RKADiOd7zSTP9O5hU7S5eJfokTEeO7XyYY7SxlpoXcSpVCT2UgcutU466QnCIOy5tM-eTsUo_C4w3Q_N99lxAI5oRca4jL2ZPtF3xLnlmEPujWo3VtYLGTOvpY46F5hr8nNIYu6CXDvc8agnZrOnjpRpDp7kg"
                  alt="F1 race" />
                <div className="absolute top-4 left-4 bg-[#ffb4a7] text-[#670400] px-3 py-1 font-mono text-[10px]">LATEST NEWS</div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="font-display text-2xl font-bold italic uppercase text-[#e4e1ee]">The Physics of a Perfect Pit Stop</h3>
                <p className="font-body text-[#eabcb4] opacity-70">How 1.8 seconds determine the outcome of a 300km race. Inside the pit wall telemetry.</p>
                <Link to="/news" className="inline-flex items-center gap-2 text-[#ffb4a7] font-mono text-xs uppercase tracking-widest group-hover:translate-x-2 transition-transform">
                  READ REPORT <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-[#1f1f28] border border-[#5f3e39] p-8 flex flex-col justify-between relative overflow-hidden">
              <div className="hud-grid absolute inset-0 opacity-5" />
              <div className="relative space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#ffb4a7] uppercase">Next Grand Prix</span>
                  <span className="material-symbols-outlined text-[#eabcb4]">timer</span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold italic uppercase text-[#e4e1ee]">Silverstone</h3>
                  <p className="font-mono text-xs text-[#eabcb4]">United Kingdom | July 05-07</p>
                </div>
                <div className="space-y-4 pt-4 border-t border-[#5f3e39]">
                  {[['Practice 1', 'THU 12:30'], ['Qualifying', 'SAT 15:00']].map(([label, time]) => (
                    <div key={label} className="flex justify-between items-center opacity-50">
                      <span className="font-mono text-[10px] uppercase">{label}</span>
                      <span className="font-mono text-xs">{time}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center text-[#ffb4a7]">
                    <span className="font-mono text-[10px] uppercase font-bold">Race Day</span>
                    <span className="font-mono text-xs font-bold">SUN 15:00</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 border border-[#eabcb4]/30 py-3 font-mono text-xs uppercase hover:bg-[#e4e1ee] hover:text-[#13131b] transition-colors">
                Set reminder
              </button>
            </div>

            {/* Standings Card */}
            <div className="bg-[#1f1f28] border border-[#5f3e39] p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[10px] text-[#ffb4a7] uppercase">Driver Standings</span>
                  <span className="material-symbols-outlined text-[#eabcb4]">leaderboard</span>
                </div>
                {[
                  { pos: '01', name: 'Max Verstappen', team: 'Red Bull Racing', pts: '219', active: true },
                  { pos: '02', name: 'Lando Norris', team: 'McLaren', pts: '150', active: false },
                  { pos: '03', name: 'Charles Leclerc', team: 'Ferrari', pts: '148', active: false },
                ].map(({ pos, name, team, pts, active }) => (
                  <div key={pos} className="flex items-center gap-4">
                    <span className={`font-mono text-xl italic font-black ${active ? 'text-[#ffb4a7]' : 'opacity-30'}`}>{pos}</span>
                    <div className="flex-1">
                      <div className="font-display text-sm font-bold uppercase">{name}</div>
                      <div className="font-mono text-[10px] text-[#eabcb4]">{team}</div>
                    </div>
                    <span className="font-mono text-sm">{pts} PTS</span>
                  </div>
                ))}
                <Link to="/results" className="block text-center mt-4 font-mono text-[10px] text-[#eabcb4] hover:text-[#ffb4a7] uppercase tracking-widest transition-colors">
                  VIEW TEAM STANDINGS
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Impact */}
      <section className="py-24 bg-[#1b1b24] carbon-texture border-t border-[#5f3e39]">
        <div className="px-16 max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-12">
            <div className="space-y-4">
              <h2 className="font-display text-5xl font-black italic uppercase leading-none text-[#e4e1ee]">
                Global Impact &amp; History
              </h2>
              <p className="font-body text-lg text-[#eabcb4] leading-relaxed">
                From the first race at Silverstone in 1950 to the modern high-tech spectacles in Las Vegas and Singapore, Formula 1 has evolved into a global phenomenon reaching over 1.5 billion fans annually.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#ffb4a7]" style={{ fontVariationSettings: "'FILL' 1" }}>language</span>
                  <h4 className="font-mono text-sm uppercase font-bold">24 races across 5 continents</h4>
                </div>
                <p className="font-body text-[#eabcb4] text-sm opacity-80">A grueling calendar that tests the limits of logistics and human endurance, spanning the entire globe from March to December.</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-[#ffb4a7]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                  <h4 className="font-mono text-sm uppercase font-bold">Net zero emissions by 2030</h4>
                </div>
                <p className="font-body text-[#eabcb4] text-sm opacity-80">Bringing the future of sustainable fuels and hybrid technology to the forefront, ensuring top-tier racing remains relevant for generations to come.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}