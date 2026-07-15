import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const newsCategories = ['Tất cả', 'Phân tích', 'Kỹ thuật', 'Đời sống & Văn hóa', 'F1 Unlocked', 'F2', 'F3', 'F1 Academy'];
const sortOptions = ['Tất cả', 'Mới nhất', 'Đọc nhiều', 'Xu hướng'];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export default function News() {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('Tất cả');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/f1/news`);
        const data = await response.json();
        if (data?.data) {
          setNewsArticles(data.data);
        }
      } catch (error) {
        console.error('Failed to load news', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="bg-[#13131b] text-[#e4e1ee]">
      {/* Breaking News Ticker */}
      <div className="w-full bg-[#ff553d] py-2 border-y border-[#5f3e39] overflow-hidden z-40">
        <div className="ticker-wrap font-mono text-xs text-[#5b0300] font-bold flex items-center">
          <div className="ticker">
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

      <main className="max-w-[1440px] mx-auto">
        {/* Breadcrumb */}
        <div className="px-5 md:px-16 py-4 border-b border-[#2a2a34] bg-[#09090d]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#a5a0b3]">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>Abu Dhabi</span>
            <span>›</span>
          </div>
        </div>

        {/* News Header Section */}
        <section className="px-5 md:px-16 py-10 border-b border-[#2a2a34] bg-[#13131b]">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase mb-8 text-[#e4e1ee]" style={{ fontFamily: 'Anybody, sans-serif' }}>
            Tin tức F1 mới nhất
          </h1>

          {/* Category Filters */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 overflow-x-auto">
              {newsCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-4 py-2 rounded-full font-mono text-xs font-bold transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[#e4e1ee] text-[#13131b]'
                      : 'bg-transparent border border-[#e4e1ee] text-[#e4e1ee] hover:border-[#ffb4a7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#15151e] border border-[#e4e1ee] rounded-full px-4 py-2 font-mono text-xs font-bold text-[#e4e1ee] outline-none"
            >
              {sortOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </section>

        {/* News Grid */}
        <section className="px-5 md:px-16 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsArticles.length > 0 ? newsArticles.map((article) => (
              <article key={article.news_id} className="group cursor-pointer overflow-hidden" onClick={() => handleArticleClick(article)}>
                <div className="relative aspect-video bg-[#1f1f28] overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={article.image_url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'}
                    alt={article.title}
                  />
                </div>
                <div className="space-y-3">
                  <span className="inline-block bg-[#ff553d] text-[#5b0300] px-3 py-1 font-mono text-[10px] font-bold">
                    {article.summary ? article.summary.slice(0, 25) : 'TIN TỨC'}
                  </span>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-[#ffb4a7] transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-mono text-xs text-[#a5a0b3]">
                    {new Date(article.created_at).toLocaleString('vi-VN')}
                  </p>
                </div>
              </article>
            )) : <div className="md:col-span-2 text-[#a5a0b3]">Chưa có dữ liệu tin tức</div>}
          </div>
        </section>
      </main>

      {/* Article Notification */}
      {selectedArticle && (
        <div className="fixed top-8 right-8 z-[200] w-96 bg-[#1f1f28] border border-[#ff553d] rounded-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-[#ff553d] text-[#5b0300] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              <span className="font-mono text-xs font-bold">ĐÃ CHỌN BÀI VIẾT</span>
            </div>
            <button
              onClick={() => setSelectedArticle(null)}
              className="material-symbols-outlined text-sm hover:brightness-75 transition-all"
            >
              close
            </button>
          </div>
          
          <div className="p-4 space-y-3">
            <div className="relative aspect-video overflow-hidden rounded">
              <img
                src={selectedArticle.image_url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <span className="inline-block bg-[#ff553d] text-[#5b0300] px-3 py-1 font-mono text-[10px] font-bold mb-2">
                {selectedArticle.summary ? selectedArticle.summary.slice(0, 25) : 'TIN TỨC'}
              </span>
              <h3 className="text-sm font-bold text-[#e4e1ee] leading-tight mb-2">
                {selectedArticle.title}
              </h3>
              <p className="font-mono text-xs text-[#a5a0b3]">
                {new Date(selectedArticle.created_at).toLocaleString('vi-VN')}
              </p>
            </div>

            <button className="w-full bg-[#ff553d] text-[#5b0300] py-2 font-mono text-xs font-bold rounded hover:brightness-110 transition-all">
              ĐỌC TOÀN BỘ BÀI VIẾT
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
