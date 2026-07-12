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

const resultTabs = ['Races', 'Drivers', 'Teams', 'Awards'];
const filterOptions = ['All', 'Completed'];

const raceCalendarResults = [
  { gp: 'Australia', flag: '🇦🇺', date: '16 Mar', winner: 'Lando Norris', team: 'McLaren', laps: 57, time: '1:42:06.304', status: 'Completed' },
  { gp: 'China', flag: '🇨🇳', date: '23 Mar', winner: 'Oscar Piastri', team: 'McLaren', laps: 56, time: '1:30:55.026', status: 'Completed' },
  { gp: 'Japan', flag: '🇯🇵', date: '06 Apr', winner: 'Max Verstappen', team: 'Red Bull Racing', laps: 53, time: '1:22:06.983', status: 'Completed' },
  { gp: 'Bahrain', flag: '🇧🇭', date: '13 Apr', winner: 'Oscar Piastri', team: 'McLaren', laps: 57, time: '1:35:39.435', status: 'Completed' },
];

const driverStandings = [
  { rank: '01', flag: '🇳🇱', name: 'Max Verstappen', team: 'Red Bull Racing', wins: 4, podiums: 7, points: 166 },
  { rank: '02', flag: '🇬🇧', name: 'Lando Norris', team: 'McLaren', wins: 2, podiums: 6, points: 150 },
  { rank: '03', flag: '🇦🇺', name: 'Oscar Piastri', team: 'McLaren', wins: 2, podiums: 5, points: 138 },
  { rank: '04', flag: '🇲🇦', name: 'Charles Leclerc', team: 'Ferrari', wins: 0, podiums: 4, points: 112 },
];

const teamStandings = [
  { rank: '01', flag: '🧡', name: 'McLaren', wins: 4, podiums: 11, points: 288 },
  { rank: '02', flag: '🔵', name: 'Red Bull Racing', wins: 4, podiums: 8, points: 242 },
  { rank: '03', flag: '🔴', name: 'Ferrari', wins: 0, podiums: 6, points: 210 },
  { rank: '04', flag: '⚪', name: 'Mercedes', wins: 0, podiums: 3, points: 160 },
];

const awardResults = [
  { title: 'Driver of the Day', winner: 'Lando Norris', detail: 'Australia GP' },
  { title: 'Fastest Lap', winner: 'Lewis Hamilton', detail: '1:12.909 - Monaco' },
  { title: 'Best Pit Stop', winner: 'Red Bull Racing', detail: '2.15s stop time' },
  { title: 'Strategy Award', winner: 'McLaren', detail: 'Two-stop undercut execution' },
];

export default function Results() {
  const [messages, setMessages] = useState([
    { type: 'system', text: '# ANALYZING RACE STRATEGY...' },
    { type: 'engineer', text: "Verstappen maintained an average sector 2 delta of -0.21s compared to Leclerc." },
    { type: 'system2', text: "Tire management was critical in lap 45-60. No degradation anomalies detected." },
  ]);
  const [input, setInput] = useState('');
  const [chatVisible, setChatVisible] = useState(true);
  const [activeTab, setActiveTab] = useState('Races');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredRaces = activeFilter === 'All'
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
              <label className="font-mono text-[10px] uppercase text-[#a5a0b3]" htmlFor="result-filter">Filter</label>
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
            2025 {activeTab} Results
          </h2>

          {activeTab === 'Races' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Grand Prix', 'Date', 'Winner', 'Team', 'Laps', 'Time'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {filteredRaces.map((race) => (
                    <tr key={race.gp} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
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
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Drivers' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Pos.', 'Driver', 'Nationality', 'Team', 'Pts.'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {driverStandings.map((driver) => (
                    <tr key={driver.name} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
                      <td className="py-5 px-6 font-bold">{driver.rank}</td>
                      <td className="py-5 px-6 font-bold flex items-center gap-3">
                        <span className="text-xl">{driver.flag}</span>
                        {driver.name}
                      </td>
                      <td className="py-5 px-6 text-[#a5a0b3]">GBR</td>
                      <td className="py-5 px-6">{driver.team}</td>
                      <td className="py-5 px-6 font-bold text-[#e4e1ee]">{driver.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Teams' && (
            <div className="bg-[#050507] rounded-lg overflow-hidden border border-[#2a2a34]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#777782] font-mono text-xs uppercase text-[#a5a0b3] bg-[#13131b]">
                    {['Pos.', 'Team', 'Wins', 'Podiums', 'Pts.'].map((head) => <th key={head} className="py-4 px-6">{head}</th>)}
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  {teamStandings.map((team) => (
                    <tr key={team.name} className="border-b border-[#24242d] hover:bg-[#1b1b24] transition-colors cursor-pointer">
                      <td className="py-5 px-6 font-bold">{team.rank}</td>
                      <td className="py-5 px-6 font-bold flex items-center gap-3">
                        <span className="text-xl">{team.flag}</span>
                        {team.name}
                      </td>
                      <td className="py-5 px-6">{team.wins}</td>
                      <td className="py-5 px-6">{team.podiums}</td>
                      <td className="py-5 px-6 font-bold text-[#e4e1ee]">{team.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Awards' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {awardResults.map((award) => (
                <div key={award.title} className="bg-[#050507] border border-[#2a2a34] p-5">
                  <p className="font-mono text-xs uppercase text-[#a5a0b3]">{award.title}</p>
                  <h3 className="text-xl font-black italic uppercase mt-3 text-[#ffb4a7]" style={{ fontFamily: 'Anybody, sans-serif' }}>{award.winner}</h3>
                  <p className="font-mono text-xs mt-4 text-[#e4e1ee]">{award.detail}</p>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}
