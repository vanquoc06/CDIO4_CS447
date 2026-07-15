import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import DetailModal from '../components/DetailModal';

const resultTabs = ['Chặng đua', 'Tài xế', 'Đội đua', 'Giải thưởng'];
const filterOptions = ['Tất cả', 'Hoàn thành'];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export default function Results() {
  const [messages, setMessages] = useState([
    { type: 'system', text: '# ANALYZING RACE STRATEGY...' },
    { type: 'engineer', text: "Verstappen maintained an average sector 2 delta of -0.21s compared to Leclerc." },
    { type: 'system2', text: "Tire management was critical in lap 45-60. No degradation anomalies detected." },
  ]);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('Chặng đua');
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [selectedResult, setSelectedResult] = useState(null);
  const [raceCalendarResults, setRaceCalendarResults] = useState([]);
  const [driverStandings, setDriverStandings] = useState([]);
  const [teamStandings, setTeamStandings] = useState([]);
  const [awardResults, setAwardResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [racesRes, standingsRes, awardsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/f1/races`),
          fetch(`${API_BASE_URL}/f1/standings`),
          fetch(`${API_BASE_URL}/f1/awards`)
        ]);

        const racesData = await racesRes.json();
        const standingsData = await standingsRes.json();
        const awardsData = await awardsRes.json();

        const mappedRaces = (racesData?.data || []).map((race) => ({
          gp: race.race_name,
          flag: '🏁',
          date: new Date(race.race_date).toLocaleDateString('vi-VN'),
          winner: race.Race_Results?.[0]?.Drivers ? `${race.Race_Results[0].Drivers.first_name} ${race.Race_Results[0].Drivers.last_name}` : '—',
          team: race.Race_Results?.[0]?.Teams?.name || '—',
          laps: race.total_laps,
          time: race.Race_Results?.[0]?.time_or_status || '—',
          status: 'Hoàn thành'
        }));

        const mappedDrivers = (standingsData?.data?.driverStandings || []).map((item) => ({
          rank: `0${item.rank}`.slice(-2),
          flag: '🏁',
          name: `${item.driver?.first_name || ''} ${item.driver?.last_name || ''}`.trim(),
          team: item.team?.name || '—',
          wins: 0,
          podiums: 0,
          points: item.totalPoints
        }));

        const mappedTeams = (standingsData?.data?.teamStandings || []).map((item) => ({
          rank: `0${item.rank}`.slice(-2),
          flag: '🏁',
          name: item.team?.name || '—',
          wins: item.wins || 0,
          podiums: item.podiums || 0,
          points: item.totalPoints
        }));

        const mappedAwards = (awardsData?.data || []).map((award) => ({
          title: award.award_name,
          winner: award.Drivers ? `${award.Drivers.first_name} ${award.Drivers.last_name}` : award.Teams?.name || '—',
          detail: award.description || '—'
        }));

        setRaceCalendarResults(mappedRaces);
        setDriverStandings(mappedDrivers);
        setTeamStandings(mappedTeams);
        setAwardResults(mappedAwards);
      } catch (error) {
        console.error('Failed to load results data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRaces = activeFilter === 'Tất cả'
    ? raceCalendarResults
    : raceCalendarResults.filter(race => race.status === activeFilter);

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
        {/* Results controls */}
        <section className="border-b border-[#2a2a34] bg-[#09090d]">
          <div className="px-5 md:px-16 py-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4 font-mono text-xs uppercase">
              <button className="inline-flex items-center gap-1 text-[#e4e1ee] hover:text-[#ffb4a7]">
                <span>2025</span>
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
              <div className="flex items-center gap-1 overflow-x-auto">
                {resultTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-5 py-3 font-bold ${activeTab === tab ? 'text-[#e4e1ee]' : 'text-[#a5a0b3] hover:text-[#e4e1ee]'}`}
                  >
                    {tab}
                    {activeTab === tab && <span className="absolute left-3 right-3 -bottom-[1px] h-[2px] bg-[#ff553d]" />}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-mono text-[10px] uppercase text-[#a5a0b3]" htmlFor="result-filter">Lọc</label>
              <select
                id="result-filter"
                value={activeFilter}
                onChange={(event) => setActiveFilter(event.target.value)}
                className="bg-[#15151e] border border-[#e4e1ee] rounded-full px-5 py-2 font-mono text-xs font-bold text-[#e4e1ee] outline-none"
              >
                {filterOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Results quick view */}
        <section className="px-5 md:px-16 py-10 bg-[#13131b]">
          <h2 className="text-3xl md:text-[40px] font-black italic uppercase mb-8" style={{ fontFamily: 'Anybody, sans-serif' }}>
            {loading ? 'Đang tải dữ liệu...' : `Kết quả ${activeTab} năm 2025`}
          </h2>

          {activeTab === 'Chặng đua' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Grand Prix', 'Ngày', 'Người chiến thắng', 'Đội', 'Vòng', 'Thời gian'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {filteredRaces.length > 0 ? filteredRaces.map((race) => (
                    <tr key={race.gp} onClick={() => setSelectedResult(race)} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
                      <td className="py-5 px-6 font-bold flex items-center gap-3">
                        <span className="text-xl">{race.flag}</span>
                        {race.gp}
                      </td>
                      <td className="py-5 px-6 text-[#a5a0b3]">{race.date}</td>
                      <td className="py-5 px-6 font-bold text-[#ffb4a7]">{race.winner}</td>
                      <td className="py-5 px-6">{race.team}</td>
                      <td className="py-5 px-6 font-bold">{race.laps}</td>
                      <td className="py-5 px-6 font-bold text-[#e4e1ee]">{race.time}</td>
                    </tr>
                  )) : <tr><td colSpan="6" className="py-6 px-6 text-[#a5a0b3]">Chưa có dữ liệu</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Tài xế' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Hạng', 'Tài xế', 'Quốc tịch', 'Đội', 'Điểm'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {driverStandings.length > 0 ? driverStandings.map((driver) => (
                    <tr key={driver.name} onClick={() => setSelectedResult(driver)} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
                      <td className="py-5 px-6 font-bold">{driver.rank}</td>
                      <td className="py-5 px-6 font-bold flex items-center gap-3">
                        <span className="text-xl">{driver.flag}</span>
                        {driver.name}
                      </td>
                      <td className="py-5 px-6 text-[#a5a0b3]">GBR</td>
                      <td className="py-5 px-6">{driver.team}</td>
                      <td className="py-5 px-6 font-bold text-[#e4e1ee]">{driver.points}</td>
                    </tr>
                  )) : <tr><td colSpan="5" className="py-6 px-6 text-[#a5a0b3]">Chưa có dữ liệu</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Đội đua' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Hạng', 'Đội', 'Thắng', 'Podium', 'Điểm'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {teamStandings.length > 0 ? teamStandings.map((team) => (
                    <tr key={team.name} onClick={() => setSelectedResult(team)} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
                      <td className="py-5 px-6 font-bold">{team.rank}</td>
                      <td className="py-5 px-6 font-bold flex items-center gap-3">
                        <span className="text-xl">{team.flag}</span>
                        {team.name}
                      </td>
                      <td className="py-5 px-6">{team.wins}</td>
                      <td className="py-5 px-6">{team.podiums}</td>
                      <td className="py-5 px-6 font-bold text-[#e4e1ee]">{team.points}</td>
                    </tr>
                  )) : <tr><td colSpan="5" className="py-6 px-6 text-[#a5a0b3]">Chưa có dữ liệu</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Giải thưởng' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {awardResults.length > 0 ? awardResults.map((award) => (
                <button key={award.title} type="button" onClick={() => setSelectedResult(award)} className="bg-[#050507] border border-[#2a2a34] p-5 text-left hover:border-[#ffb4a7] transition-colors">
                  <p className="font-mono text-xs uppercase text-[#a5a0b3]">{award.title}</p>
                  <h3 className="text-xl font-black italic uppercase mt-3 text-[#ffb4a7]" style={{ fontFamily: 'Anybody, sans-serif' }}>{award.winner}</h3>
                  <p className="font-mono text-xs mt-4 text-[#e4e1ee]">{award.detail}</p>
                </button>
              )) : <div className="md:col-span-4 text-[#a5a0b3]">Chưa có dữ liệu</div>}
            </div>
          )}
        </section>

      </main>

      <Footer />
      <DetailModal isOpen={Boolean(selectedResult)} onClose={() => setSelectedResult(null)} item={selectedResult} type="result" />
    </div>
  );
}
