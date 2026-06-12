export default function Footer() {
  return (
    <footer className="w-full px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4 bg-[#13131b] border-t border-[#5f3e39]">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="font-black italic text-2xl text-[#e4e1ee] uppercase" style={{ fontFamily: 'Anybody, sans-serif' }}>
          ILLIT F1
        </span>
        <span className="font-mono text-[10px] text-[#eabcb4] opacity-50 uppercase tracking-widest">
          © 2024 ILLIT F1 ENGINEERING. STATUS: OPTIMAL
        </span>
      </div>
      <div className="flex gap-8">
        {['Telemetry', 'Pit Wall', 'Privacy', 'Terms', 'API'].map(item => (
          <a key={item} href="#" className="font-mono text-[10px] text-[#eabcb4] hover:text-[#ffb4a7] transition-colors uppercase tracking-widest">
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}
