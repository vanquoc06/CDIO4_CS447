import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const emptyDriver = { first_name: '', last_name: '', nationality: '', dob: '', team_id: '' };
const emptyTeam = { name: '', principal: '', chassis: '', power_unit: '' };
const emptyNews = { title: '', summary: '', content: '', image_url: '' };

const mockDrivers = [
  { driver_id: '1', first_name: 'Max', last_name: 'Verstappen', nationality: 'Dutch', dob: '1997-09-30', team_id: 'team-1', Teams: { name: 'Red Bull Racing' } },
  { driver_id: '2', first_name: 'Charles', last_name: 'Leclerc', nationality: 'Monegasque', dob: '1997-10-16', team_id: 'team-2', Teams: { name: 'Scuderia Ferrari' } }
];

const mockTeams = [
  { team_id: 'team-1', name: 'Red Bull Racing', principal: 'Christian Horner', chassis: 'RB20', power_unit: 'Honda', Drivers: [] },
  { team_id: 'team-2', name: 'Scuderia Ferrari', principal: 'Fred Vasseur', chassis: 'SF-24', power_unit: 'Ferrari', Drivers: [] }
];

const mockNews = [
  { news_id: 'news-1', title: 'Chuẩn bị mùa giải mới', summary: 'Mùa giải 2026 sắp bắt đầu với nhiều thay đổi', content: 'Tin tức F1 mới nhất', image_url: '' },
  { news_id: 'news-2', title: 'Đội đua mới gia nhập', summary: 'Một đội đua mới xuất hiện trên đường đua.', content: 'Tin tức F1 mới nhất 2', image_url: '' }
];

export default function AdminDashboard({ preview = false }) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('drivers');
  const [formDriver, setFormDriver] = useState(emptyDriver);
  const [formTeam, setFormTeam] = useState(emptyTeam);
  const [formNews, setFormNews] = useState(emptyNews);
  const [editingDriverId, setEditingDriverId] = useState(null);
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [editingNewsId, setEditingNewsId] = useState(null);
  const [message, setMessage] = useState('');
  const [isPreview, setIsPreview] = useState(preview);

  const isAdmin = useMemo(() => {
    return user?.email?.includes('admin') || user?.fullName?.includes('admin') || user?.role === 'admin';
  }, [user]);

  useEffect(() => {
    if (isPreview) {
      setDrivers(mockDrivers);
      setTeams(mockTeams);
      setNews(mockNews);
      setLoading(false);
      setMessage('Chế độ xem demo admin');
      return;
    }

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      setMessage('Chỉ tài khoản admin mới được vào trang này.');
      setLoading(false);
      return;
    }

    bootstrapAdminAccess();
  }, [isAuthenticated, isAdmin, navigate, isPreview]);

  const bootstrapAdminAccess = async () => {
    try {
      const token = localStorage.getItem('illitf1_token');
      const response = await fetch(`${API_BASE_URL}/admin/bootstrap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(result.message || 'Không thể kích hoạt quyền admin.');
        return;
      }
      setMessage(result.message || 'Admin access enabled');
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage('Không thể kích hoạt quyền admin.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('illitf1_token');
      const headers = { Authorization: `Bearer ${token}` };
      const [driversRes, teamsRes, newsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/drivers`, { headers }),
        fetch(`${API_BASE_URL}/admin/teams`, { headers }),
        fetch(`${API_BASE_URL}/admin/news`, { headers })
      ]);

      const driversData = await driversRes.json();
      const teamsData = await teamsRes.json();
      const newsData = await newsRes.json();

      if (driversData?.data) setDrivers(driversData.data);
      if (teamsData?.data) setTeams(teamsData.data);
      if (newsData?.data) setNews(newsData.data);
    } catch (error) {
      console.error(error);
      setMessage('Không thể tải dữ liệu admin.');
    } finally {
      setLoading(false);
    }
  };

  const saveDriver = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('illitf1_token');
    const method = editingDriverId ? 'PUT' : 'POST';
    const url = editingDriverId ? `${API_BASE_URL}/admin/drivers/${editingDriverId}` : `${API_BASE_URL}/admin/drivers`;
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formDriver)
    });
    const result = await response.json();
    setMessage(result.message || 'Đã lưu tài xế');
    setFormDriver(emptyDriver);
    setEditingDriverId(null);
    fetchData();
  };

  const saveTeam = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('illitf1_token');
    const method = editingTeamId ? 'PUT' : 'POST';
    const url = editingTeamId ? `${API_BASE_URL}/admin/teams/${editingTeamId}` : `${API_BASE_URL}/admin/teams`;
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formTeam)
    });
    const result = await response.json();
    setMessage(result.message || 'Đã lưu đội');
    setFormTeam(emptyTeam);
    setEditingTeamId(null);
    fetchData();
  };

  const saveNews = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('illitf1_token');
    const method = editingNewsId ? 'PUT' : 'POST';
    const url = editingNewsId ? `${API_BASE_URL}/admin/news/${editingNewsId}` : `${API_BASE_URL}/admin/news`;
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(formNews)
    });
    const result = await response.json();
    setMessage(result.message || 'Đã lưu tin tức');
    setFormNews(emptyNews);
    setEditingNewsId(null);
    fetchData();
  };

  const removeDriver = async (driverId) => {
    const token = localStorage.getItem('illitf1_token');
    const response = await fetch(`${API_BASE_URL}/admin/drivers/${driverId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    const result = await response.json();
    setMessage(result.message || 'Đã xóa tài xế');
    fetchData();
  };

  const removeTeam = async (teamId) => {
    const token = localStorage.getItem('illitf1_token');
    const response = await fetch(`${API_BASE_URL}/admin/teams/${teamId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    const result = await response.json();
    setMessage(result.message || 'Đã xóa đội');
    fetchData();
  };

  const removeNews = async (newsId) => {
    const token = localStorage.getItem('illitf1_token');
    const response = await fetch(`${API_BASE_URL}/admin/news/${newsId}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    const result = await response.json();
    setMessage(result.message || 'Đã xóa tin tức');
    fetchData();
  };

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#f3f4f6]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <aside className="w-full border-b border-[#23283a] bg-[#11151f] p-6 lg:w-72 lg:border-b-0 lg:border-r">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-[#7dd3fc]">Admin Panel</p>
            <h1 className="mt-2 text-2xl font-semibold">F1 Dashboard</h1>
            <p className="mt-2 text-sm text-[#8b95a8]">Quản lý nội dung website</p>
          </div>

          <nav className="space-y-2">
            {['drivers', 'teams', 'news'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm transition ${activeTab === tab ? 'bg-[#1d4ed8] text-white' : 'bg-[#171c28] text-[#dbe3f0] hover:bg-[#1f2534]'}`}
              >
                <span>{tab === 'drivers' ? 'Tài xế' : tab === 'teams' ? 'Đội đua' : 'Tin tức'}</span>
                <span className="text-xs opacity-70">→</span>
              </button>
            ))}
          </nav>

          <div className="mt-8 rounded-lg border border-[#23283a] bg-[#151a26] p-4 text-sm text-[#9aa4b2]">
            <p className="font-medium text-[#f3f4f6]">Trạng thái</p>
            <p className="mt-1">Đăng nhập với quyền quản trị</p>
            <button onClick={() => navigate('/')} className="mt-4 w-full rounded bg-[#1f2937] px-3 py-2 text-sm text-[#f3f4f6] hover:bg-[#374151]">Về trang web</button>
          </div>
        </aside>

        <main className="flex-1 p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{activeTab === 'drivers' ? 'Quản lý tài xế' : activeTab === 'teams' ? 'Quản lý đội đua' : 'Quản lý tin tức'}</h2>
              <p className="text-sm text-[#8b95a8]">Thao tác nhanh, giao diện tập trung cho admin.</p>
            </div>
            <div className="rounded-full border border-[#23283a] bg-[#11151f] px-3 py-1 text-sm text-[#7dd3fc]">{message || 'Sẵn sàng'}</div>
          </div>

          {loading ? (
            <div className="rounded-xl border border-[#23283a] bg-[#11151f] p-8 text-center text-[#8b95a8]">Đang tải dữ liệu...</div>
          ) : (
            <>
              {activeTab === 'drivers' && (
                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Danh sách tài xế</h3>
                      <span className="text-sm text-[#8b95a8]">{drivers.length} mục</span>
                    </div>
                    <div className="space-y-3">
                      {drivers.map((driver) => (
                        <div key={driver.driver_id} className="flex items-center justify-between rounded-lg border border-[#23283a] bg-[#171c28] p-3">
                          <div>
                            <p className="font-medium">{driver.first_name} {driver.last_name}</p>
                            <p className="text-sm text-[#8b95a8]">{driver.Teams?.name || 'Chưa gán đội'}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => { setFormDriver({ first_name: driver.first_name, last_name: driver.last_name, nationality: driver.nationality || '', dob: driver.dob ? driver.dob.slice(0, 10) : '', team_id: driver.team_id || '' }); setEditingDriverId(driver.driver_id); }} className="rounded bg-[#1f2937] px-3 py-2 text-sm">Sửa</button>
                            <button onClick={() => removeDriver(driver.driver_id)} className="rounded bg-[#7f1d1d] px-3 py-2 text-sm">Xóa</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <form onSubmit={saveDriver} className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5 space-y-4">
                    <h3 className="text-lg font-medium">{editingDriverId ? 'Cập nhật tài xế' : 'Thêm tài xế'}</h3>
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Tên" value={formDriver.first_name} onChange={(e) => setFormDriver({ ...formDriver, first_name: e.target.value })} required />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Họ" value={formDriver.last_name} onChange={(e) => setFormDriver({ ...formDriver, last_name: e.target.value })} required />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Quốc tịch" value={formDriver.nationality} onChange={(e) => setFormDriver({ ...formDriver, nationality: e.target.value })} />
                    <input type="date" className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" value={formDriver.dob} onChange={(e) => setFormDriver({ ...formDriver, dob: e.target.value })} />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="team_id" value={formDriver.team_id} onChange={(e) => setFormDriver({ ...formDriver, team_id: e.target.value })} />
                    <div className="flex gap-3">
                      <button type="submit" className="rounded bg-[#2563eb] px-4 py-2 text-sm font-medium text-white">Lưu</button>
                      <button type="button" onClick={() => { setFormDriver(emptyDriver); setEditingDriverId(null); }} className="rounded border border-[#23283a] px-4 py-2 text-sm">Hủy</button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'teams' && (
                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Danh sách đội đua</h3>
                      <span className="text-sm text-[#8b95a8]">{teams.length} mục</span>
                    </div>
                    <div className="space-y-3">
                      {teams.map((team) => (
                        <div key={team.team_id} className="flex items-center justify-between rounded-lg border border-[#23283a] bg-[#171c28] p-3">
                          <div>
                            <p className="font-medium">{team.name}</p>
                            <p className="text-sm text-[#8b95a8]">{team.principal || 'Chưa có principal'}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => { setFormTeam({ name: team.name, principal: team.principal || '', chassis: team.chassis || '', power_unit: team.power_unit || '' }); setEditingTeamId(team.team_id); }} className="rounded bg-[#1f2937] px-3 py-2 text-sm">Sửa</button>
                            <button onClick={() => removeTeam(team.team_id)} className="rounded bg-[#7f1d1d] px-3 py-2 text-sm">Xóa</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <form onSubmit={saveTeam} className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5 space-y-4">
                    <h3 className="text-lg font-medium">{editingTeamId ? 'Cập nhật đội' : 'Thêm đội'}</h3>
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Tên đội" value={formTeam.name} onChange={(e) => setFormTeam({ ...formTeam, name: e.target.value })} required />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Principal" value={formTeam.principal} onChange={(e) => setFormTeam({ ...formTeam, principal: e.target.value })} />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Chassis" value={formTeam.chassis} onChange={(e) => setFormTeam({ ...formTeam, chassis: e.target.value })} />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Power Unit" value={formTeam.power_unit} onChange={(e) => setFormTeam({ ...formTeam, power_unit: e.target.value })} />
                    <div className="flex gap-3">
                      <button type="submit" className="rounded bg-[#2563eb] px-4 py-2 text-sm font-medium text-white">Lưu</button>
                      <button type="button" onClick={() => { setFormTeam(emptyTeam); setEditingTeamId(null); }} className="rounded border border-[#23283a] px-4 py-2 text-sm">Hủy</button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'news' && (
                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <section className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-lg font-medium">Danh sách tin tức</h3>
                      <span className="text-sm text-[#8b95a8]">{news.length} mục</span>
                    </div>
                    <div className="space-y-3">
                      {news.map((item) => (
                        <div key={item.news_id} className="rounded-lg border border-[#23283a] bg-[#171c28] p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-[#8b95a8]">{item.summary || item.content}</p>
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => { setFormNews({ title: item.title, summary: item.summary || '', content: item.content, image_url: item.image_url || '' }); setEditingNewsId(item.news_id); }} className="rounded bg-[#1f2937] px-3 py-2 text-sm">Sửa</button>
                              <button onClick={() => removeNews(item.news_id)} className="rounded bg-[#7f1d1d] px-3 py-2 text-sm">Xóa</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <form onSubmit={saveNews} className="rounded-2xl border border-[#23283a] bg-[#11151f] p-5 space-y-4">
                    <h3 className="text-lg font-medium">{editingNewsId ? 'Cập nhật tin' : 'Thêm tin mới'}</h3>
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Tiêu đề" value={formNews.title} onChange={(e) => setFormNews({ ...formNews, title: e.target.value })} required />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Tóm tắt" value={formNews.summary} onChange={(e) => setFormNews({ ...formNews, summary: e.target.value })} />
                    <textarea className="min-h-[140px] w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Nội dung" value={formNews.content} onChange={(e) => setFormNews({ ...formNews, content: e.target.value })} required />
                    <input className="w-full rounded-lg border border-[#23283a] bg-[#0f1117] px-3 py-2" placeholder="Image URL" value={formNews.image_url} onChange={(e) => setFormNews({ ...formNews, image_url: e.target.value })} />
                    <div className="flex gap-3">
                      <button type="submit" className="rounded bg-[#2563eb] px-4 py-2 text-sm font-medium text-white">Lưu</button>
                      <button type="button" onClick={() => { setFormNews(emptyNews); setEditingNewsId(null); }} className="rounded border border-[#23283a] px-4 py-2 text-sm">Hủy</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
