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

  const driverName = item?.first_name || item?.name || '';
  const driverSurname = item?.last_name || item?.surname || '';
  const driverTeam = item?.Teams?.name || item?.team || '—';
  const driverNationality = item?.nationality || '—';
  const driverPoints = item?.Race_Results?.reduce((sum, result) => sum + (typeof result.points?.toNumber === 'function' ? result.points.toNumber() : Number(result.points || 0)), 0) || item?.pts || '—';
  const driverPosition = item?.Race_Results?.[0]?.position || item?.pos || '—';
  const driverPodiums = item?.Race_Results?.filter((result) => Number(result.position) <= 3).length || item?.podiums || '—';
  const driverNumber = item?.number || item?.driver_id?.slice(0, 4).toUpperCase() || '—';
  const teamLead = item?.Drivers?.[0] ? `${item.Drivers[0].first_name} ${item.Drivers[0].last_name}` : item?.lead || '—';
  const teamWing = item?.Drivers?.[1] ? `${item.Drivers[1].first_name} ${item.Drivers[1].last_name}` : item?.wing || '—';
  const raceName = item?.race_name || item?.name || item?.gp || 'Chi tiết';
  const raceLocation = item?.circuit_name || item?.location || item?.country || '—';
  const raceDate = item?.race_date ? new Date(item.race_date).toLocaleDateString('vi-VN') : item?.date || '—';
  const raceRound = item?.round || item?.race_id?.slice(0, 6) || '—';
  const raceLaps = item?.total_laps || item?.laps || '—';
  const raceTime = item?.time_or_status || item?.time || '—';

  const renderContent = () => {
    switch (type) {
      case 'driver':
        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Hồ sơ tài xế</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {driverName} {driverSurname}
                </h3>
                <p className="text-[#eabcb4] mt-2">{driverTeam}</p>
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
                ['Điểm', driverPoints],
                ['Hạng', driverPosition],
                ['Podium', driverPodiums],
                ['Quốc tịch', driverNationality],
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00eefc]">Chi tiết đội đua</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {item.name}
                </h3>
                <p className="text-[#eabcb4] mt-2">{item.chassis || item.engine || 'Thông tin đội đua'}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#00eefc] hover:text-[#00363a] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#5f3e39]">
              <img src={item.img || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'} alt={item.name} className="h-56 w-full object-cover" />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Tài xế dẫn đầu</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{teamLead}</p>
              </div>
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Tài xế phụ</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{teamWing}</p>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Chi tiết chặng đua</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {raceName}
                </h3>
                <p className="text-[#eabcb4] mt-2">{raceLocation}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#ff553d] hover:text-[#5b0300] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Vòng</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{raceRound}</p>
              </div>
              <div className="rounded-2xl bg-[#1f1f28] p-5">
                <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Địa điểm</p>
                <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{raceLocation}</p>
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
        const isRace = item && (item.gp || item.round || (item.name && item.location));
        const isDriver = item && (item.driver || (item.name && item.surname) || item.rank);
        const isTeam = item && (item.name && item.lead && item.wing);
        const isAward = item && item.title && item.winner;

        return (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffb4a7]">Chi tiết kết quả</p>
                <h3 className="text-2xl font-black italic uppercase mt-2 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
                  {isRace ? (item.gp || raceName) : isDriver ? (item.driver || `${driverName} ${driverSurname}`.trim()) : isTeam ? item.name : (item.title || 'Chi tiết')}
                </h3>
                <p className="text-[#eabcb4] mt-2">{isRace ? (item.team || raceLocation) : isDriver ? (item.team || driverTeam) : isTeam ? `Tài xế dẫn đầu: ${teamLead}` : (item.detail || '')}</p>
              </div>
              <button onClick={onClose} className="rounded-full border border-[#5f3e39] px-3 py-2 text-xs font-mono uppercase text-[#e4e1ee] hover:bg-[#ff553d] hover:text-[#5b0300] transition-all">
                Đóng
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {isRace && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Vòng</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.round || item.gp || raceRound}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Người chiến thắng / Thời gian</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.winner || item.driver || '-'} • {item.time || item.duration || raceTime || '-'}</p>
                  </div>
                </>
              )}

              {isDriver && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Hạng</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.pos || item.rank || driverPosition || '-'}</p>
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
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Điểm</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.pts || item.points || '-'}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Đầu / Phụ</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{teamLead} / {teamWing}</p>
                  </div>
                </>
              )}

              {isAward && (
                <>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Người thắng</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.winner}</p>
                  </div>
                  <div className="rounded-2xl bg-[#1f1f28] p-5">
                    <p className="font-mono text-[10px] uppercase text-[#a5a0b3]">Chi tiết</p>
                    <p className="mt-2 text-xl font-bold text-[#e4e1ee]">{item.detail || '-'}</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 rounded-2xl bg-[#15151e] p-5">
              <h4 className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffb4a7]">Phân tích</h4>
              <p className="mt-3 text-sm text-[#e4e1ee]">
                Thông tin này được lấy từ dữ liệu API và phản ánh nội dung từ backend/SQL hiện tại.
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
