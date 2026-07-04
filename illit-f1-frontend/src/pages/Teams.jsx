import { useEffect } from 'react';
import Footer from '../components/Footer';

const teams = [
  { pos: 'POS 01', name: 'RED BULL RACING', engine: 'HONDA RBPT', pts: 860, color: '#0600EF', accentClass: 'text-[#ffb4a7]', hoverBorder: 'hover:border-[#ffb4a7]', btnHover: 'group-hover:bg-[#ffb4a7] group-hover:text-[#5b0300]', lead: 'M. Verstappen', wing: 'S. Perez', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKEreIyF2O-Vq7DFkbEfq_-P2swEi7o-CC6Jq6yAEwoME3nysiLTqHBW6r-UcON0sZhuWHzYty4sgVajEpCr4nol2uO4OW4faNgEJEcMv-9d6__V-NxjxcsfzUWDKdWOWxmSRUybNro3UaYDnuhJG--seMmYpZi9DyGtLabtCq2zsMtXaMgEmw4SdT3roL0Vcw5unB96lLy0_74DUgxRnAtpZRkP2YE9Yrjbec1iNsuYSamd0kDeCIld_wxPZIkLIlS_Dm-7ZCT4U', badgeBg: 'bg-[#ff553d] text-[#5b0300]' },
  { pos: 'POS 02', name: 'MERCEDES-AMG', engine: 'MERCEDES', pts: 409, color: '#00A19B', accentClass: 'text-[#00eefc]', hoverBorder: 'hover:border-[#00eefc]', btnHover: 'group-hover:bg-[#00eefc] group-hover:text-[#00686f]', lead: 'L. Hamilton', wing: 'G. Russell', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5tBHAB0INfKgr3SkTtQOH5NzgKFWsvs9bGR-zixdY9c9LGBBzdGEKsiOvmMHxX7QYLiMGUzP1quH5aFqQEFIki0pzkoB2VIQJzh64Ka7VV3fBtmRs4FPiGoTpb95VIuY5aXty9i5U_epXxJ3QjhAOU7V2Az00xB10UF8Dif_RJbTHHmB5ByxqsKxvEdqN8PzhTqT-nkXXhhNjkMyldCB37Andz-rw5GmE0gHQQhOn1Y2hOo6iAaf2C2KsMgtsAFQJWa53dRDi3NU', badgeBg: 'bg-[#00eefc] text-[#00686f]' },
  { pos: 'POS 03', name: 'SCUDERIA FERRARI', engine: 'FERRARI', pts: 406, color: '#EF1A2D', accentClass: 'text-[#ffb4ab]', hoverBorder: 'hover:border-[#ffb4ab]', btnHover: 'group-hover:bg-[#ffb4ab] group-hover:text-[#690005]', lead: 'C. Leclerc', wing: 'C. Sainz', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgM-vtroxoMot5Vkwt-z_utFmL1VU4FSVhz_tY75rDExtSzc0BRGJRNrB3gWwvWZ-7zowTSv6Ee7J_dckn24JP008SQhuYvo1Aea2Ti9EXxCFYGA6GEp9b3Wdk6XmO7On81jXlj3gP76_ndS4I14kQUmJXwIUGmo6Cvd0o8IQC9vcPla-7rYsxUNkYtD-WytIMzSD3NxctrSnDVKBLWcr_h1MLI8rmcbIJAf3isyDkq-IObWJxxXcq2QC6e0ea21wleRTx4S1pxfg', badgeBg: 'bg-[#ffb4ab] text-[#690005]' },
  { pos: 'POS 04', name: 'MCLAREN F1', engine: 'MERCEDES', pts: 302, color: '#FF8700', accentClass: 'text-[#ff553d]', hoverBorder: 'hover:border-[#ff553d]', btnHover: 'group-hover:bg-[#ff553d] group-hover:text-[#5b0300]', lead: 'L. Norris', wing: 'O. Piastri', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJgHOs_5-WhGcxQASDH_tc5nkkr1epJYuz5ChAYLAjEOLm2iVCUAu3qoJDQRhmZbL3NacHUKs8OXVJXojeksIALHhrlMffom8abkCqEIldFtUvmF0t0Xair41mUYFCg74POnIMhlRExHr67w40cBUl7Fhw5UVL1FUlX0DPiNbtVjSZZ5Fq5EdS-r234oc_Ck60EIluXN0epzvnNlCkyxKLphQ-av-mTsQifXefj0yraBdJmBNKhGUD5GH8FDVXaC7yg4f-dLT_LXo', badgeBg: 'bg-[#ff553d] text-[#5b0300]' },
  { pos: 'POS 05', name: 'ASTON MARTIN', engine: 'MERCEDES', pts: 280, color: '#006F62', accentClass: 'text-[#b08780]', hoverBorder: 'hover:border-[#b08780]', btnHover: 'group-hover:bg-[#b08780] group-hover:text-[#0d0d16]', lead: 'F. Alonso', wing: 'L. Stroll', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWkm0sPX1YsQ08T_dVjDtgpqSIpnqdQ7OU47nOKnLTdLMN8Nni2loRouOACsyOEx3tbbQ47aI_Xiumd6bXWiEtPasC3m1AvccK_5FhHu9_7lOWXPT02btDoCTYA9x1CGuFPFQmbDHk05ET2OxS65lB1ZJY6sG8ZCIh5SXShpURmrAus1dmB-G8VV_tkterllaLtsvHTdQuMp4rl12r5rOt2NkLbSmfEKN-_pg0QsEZuWgdYDhLd2pEKLkJQXRg7OAxtjM3H9w7fyo', badgeBg: 'bg-[#b08780] text-[#400200]' },
  { pos: 'POS 06', name: 'ALPINE F1', engine: 'RENAULT', pts: 120, color: '#0090FF', accentClass: 'text-[#d3fbff]', hoverBorder: 'hover:border-[#d3fbff]', btnHover: 'group-hover:bg-[#d3fbff] group-hover:text-[#00363a]', lead: 'P. Gasly', wing: 'E. Ocon', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7mRqqU8zgU0lMa7lEtCyfeZIgOupyNtxsDQD7S1J1rHkAxnKXbDnTNOCH_5tLx1kr5uG_UjUJP3ScDZUN1okzc1H46_I-VMJUBnkyNAFjnIVQ4t2wMwvOx3WEZsWEuYo7zTmdONM4d2_AT7CFNtWgT-zjf7580UpyEJ0J--i0I8YMvibpN10dFnqSanX04dwfqff-fbs9o5qVAPuM0TTo8aZMGnVjSFz5E5uUZpyXhHHmO02gKcZ-0bHdbhYjpjHGwhEs1-zdoy0', badgeBg: 'bg-[#d3fbff] text-[#00363a]' },
];

export default function Teams() {
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
            CONSTRUCTORS
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[#ffb4a7] font-mono text-xs uppercase tracking-tighter">
            <span>SEASON: 2024</span>
            <span className="w-1 h-1 bg-[#5f3e39] rounded-full" />
            <span>STATUS: LIVE FEED</span>
            <span className="w-1 h-1 bg-[#5f3e39] rounded-full" />
            <span>GRID: FULL CAPACITY</span>
          </div>
        </header>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4">
          {teams.map((team) => (
            <div key={team.name} className={`group relative bg-[#1b1b24] border-r border-b border-[#5f3e39] ${team.hoverBorder} transition-all duration-500`}>
              <div className={`absolute -top-4 -left-4 ${team.badgeBg} px-4 py-1 parallelogram z-10 font-mono text-xs`}>
                <span className="font-bold">{team.pos}</span>
              </div>
              <div className="relative aspect-video overflow-hidden bg-[#34343e]">
                <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src={team.img} alt={team.name} />
                <div className="absolute bottom-0 right-0 p-4">
                  <span className="font-black italic text-[40px] opacity-10 group-hover:opacity-30 transition-opacity"
                    style={{ fontFamily: 'Anybody, sans-serif' }}>{team.pts}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="glitch-title text-3xl font-black italic uppercase mb-1 text-[#e4e1ee]"
                      style={{ fontFamily: 'Anybody, sans-serif' }}>{team.name}</h2>
                    <p className={`font-mono text-xs ${team.accentClass}`}>{team.engine}</p>
                  </div>
                  <div className="w-2 h-12" style={{ backgroundColor: team.color }} />
                </div>
                <div className="grid grid-cols-2 gap-4 border-t border-[#5f3e39] pt-6">
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] opacity-50 uppercase">Lead Driver</span>
                    <span className="text-lg font-bold uppercase" style={{ fontFamily: 'Anybody, sans-serif' }}>{team.lead}</span>
                  </div>
                  <div className="space-y-1 border-l border-[#5f3e39] pl-4">
                    <span className="block font-mono text-[10px] opacity-50 uppercase">Wingman</span>
                    <span className="text-lg font-bold uppercase" style={{ fontFamily: 'Anybody, sans-serif' }}>{team.wing}</span>
                  </div>
                </div>
                <button className={`mt-8 w-full parallelogram bg-[#393842] py-3 ${team.btnHover} transition-all duration-300`}>
                  <span className="font-mono font-bold uppercase tracking-widest text-xs">View Telemetry</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Footer Overlay */}
        <div className="mt-24 p-8 border-2 border-[#5f3e39] hud-overlay">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <span className="font-mono text-[#ffb4a7] text-[10px] uppercase block">Data Stream</span>
              <p className="text-xs font-mono opacity-60">Synchronizing team telemetry across 24 global nodes. Latency: 12ms. Packet Loss: 0%.</p>
            </div>
            <div className="space-y-2">
              <span className="font-mono text-[#ffb4a7] text-[10px] uppercase block">Analysis Engine</span>
              <p className="text-xs font-mono opacity-60">Machine learning models predicting constructor trajectory based on aero-evolution updates.</p>
            </div>
            <div className="md:col-span-2 flex items-center justify-end">
              <button className="parallelogram bg-[#ffb4a7] px-8 py-4 hover:scale-105 transition-transform">
                <span className="text-2xl font-bold italic uppercase text-[#670400]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  Download Full Season Report
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
