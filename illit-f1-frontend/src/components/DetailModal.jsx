import { useEffect } from 'react';

export default function DetailModal({ isOpen, onClose, item, type }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  const renderContent = () => {
    switch (type) {
      case 'driver':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Driver Profile</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {item.name} {item.surname}
                </h3>
                <p className="text-[#eabcb4] mt-2">{item.team}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#ff553d] hover:text-[#5b0300] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#5f3e39]">
              <img src={item.img} alt={item.name} className="h-56 w-full object-cover" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ['Điểm', item.pts],
                ['Hạng', item.pos],
                ['Podium', item.podiums],
                ['Số xe', item.number],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl border border-[#2a2a34] bg-[#15151e] p-3">
                  <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">{label}</p>
                  <p className="mt-1 text-lg font-bold text-[#e4e1ee]">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#1f1f28] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb4a7]">Tóm tắt mùa giải</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#e4e1ee]">
                <li>• Tốc độ phản hồi cực tốt ở các sector ép tốc, phù hợp với kiểu đường đua bám tốc độ cao.</li>
                <li>• Duy trì ổn định trên cả điều kiện đường khô và ướt.</li>
                <li>• Là một trong những tài xế có mức tăng trưởng biểu đồ điểm số ổn định nhất.</li>
              </ul>
            </div>
          </>
        );

      case 'team':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00eefc]">Team Detail</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {item.name}
                </h3>
                <p className="text-[#eabcb4] mt-2">Động cơ {item.engine}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#00eefc] hover:text-[#00363a] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#5f3e39]">
              <img src={item.img} alt={item.name} className="h-56 w-full object-cover" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Lead Driver</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.lead}</p>
              </div>
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Wingman</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.wing}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#15151e] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb4a7]">Phân tích chiến thuật</h4>
              <p className="mt-3 text-sm text-[#e4e1ee]">
                Đội này đang có tốc độ cao ở giai đoạn đầu mùa, đặc biệt ở các chặng đua có nhiều khúc cua và yêu cầu kiểm soát nhiệt lốp.
              </p>
            </div>
          </>
        );

      case 'race':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Race Detail</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {item.name}
                </h3>
                <p className="text-[#eabcb4] mt-2">{item.location}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#ff553d] hover:text-[#5b0300] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Round</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.round}</p>
              </div>
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Địa điểm</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.location}</p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-[#15151e] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb4a7]">Thông tin chung</h4>
              <ul className="mt-3 space-y-2 text-sm text-[#e4e1ee]">
                <li>• Chặng đua có nhiều đoạn đường hẹp và yêu cầu bứt tốc ở các khúc cua chậm.</li>
                <li>• Tỷ lệ vượt qua rất cao nếu đội đạt chất lượng pit-stop tốt.</li>
                <li>• Đây là một trong những chặng đua nổi tiếng nhất mùa giải.</li>
              </ul>
            </div>
          </>
        );

      case 'result':
        // Results can be many shapes: race (gp), driver standing, team standing, or award
        const isRace = item && (item.gp || item.round || (item.name && item.location));
        const isDriver = item && (item.driver || (item.name && item.surname) || item.rank);
        const isTeam = item && (item.name && item.lead && item.wing);
        const isAward = item && item.title && item.winner;

        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Result Detail</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {isRace ? (item.gp || item.name) : isDriver ? (item.driver || item.name) : isTeam ? item.name : (item.title || 'Chi tiết')}
                </h3>
                <p className="text-[#eabcb4] mt-2">{isRace ? (item.team || item.location) : isDriver ? (item.team || '') : isTeam ? `Lead: ${item.lead}` : (item.detail || '')}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#ff553d] hover:text-[#5b0300] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {isRace && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Round</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.round || item.gp}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Winner / Time</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.winner || item.driver || '-'} • {item.time || item.duration || '-'}</p>
                  </div>
                </>
              )}

              {isDriver && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Hạng</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.pos || item.rank || '-'}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Điểm</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.pts || item.points || '-'}</p>
                  </div>
                </>
              )}

              {isTeam && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Points</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.pts || item.points || '-'}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Lead / Wing</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.lead} / {item.wing}</p>
                  </div>
                </>
              )}

              {isAward && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Winner</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.winner}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Detail</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.detail || '-'}</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-[#15151e] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb4a7]">Phân tích</h4>
              <p className="mt-3 text-sm text-[#e4e1ee]">
                Thông tin này được hiển thị trên frontend để bạn xem nhanh nội dung chi tiết mà không cần gọi API hay backend.
              </p>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
      <div className="w-full max-w-2xl rounded-3xl border border-[#5f3e39] bg-[#13131b] p-6 shadow-2xl shadow-black/50" onClick={(event) => event.stopPropagation()}>
        {renderContent()}
      </div>
    </div>
  );
}
