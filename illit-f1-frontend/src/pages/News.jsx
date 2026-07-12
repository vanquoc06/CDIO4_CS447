import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const newsCategories = ['All', 'Analysis', 'Technical', 'Lifestyle & Culture', 'F1 Unlocked', 'F2', 'F3', 'F1 Academy'];
const sortOptions = ['All', 'Latest', 'Most Read', 'Trending'];

const newsArticles = [
  { id: 1, category: 'F1 FANTASY', title: "What's the best F1 Fantasy line-up in Abu Dhabi?", timestamp: '9 minutes ago', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=450&fit=crop' },
  { id: 2, category: 'WEEKEND WARM-UP', title: 'Watch Weekend Warm-Up ahead of the Abu Dhabi GP', timestamp: '31 minutes ago', image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=450&fit=crop', isVideo: true },
  { id: 3, category: 'TECHNICAL', title: "Hamilton suggests personnel changes needed for 2026 at Ferrari", timestamp: '32 minutes ago', image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&h=450&fit=crop' },
  { id: 4, category: 'PADDOCK INSIDER', title: 'Norris, Verstappen or Piastri – the title showdown is here', timestamp: '42 minutes ago', image: 'https://images.unsplash.com/photo-1516789592301-37e2d194bd1f?w=800&h=450&fit=crop' },
  { id: 5, category: 'ANALYSIS', title: "Russell assesses Mercedes' chances of sealing P2 in Abu Dhabi", timestamp: '2 hours ago', image: 'https://images.unsplash.com/photo-1562618142-210ffdce33e3?w=800&h=450&fit=crop' },
  { id: 6, category: 'LIFESTYLE', title: "'F1 is my life' – Tsunoda reacts to Red Bull's driver decision", timestamp: '2 hours ago', image: 'https://images.unsplash.com/photo-1471879832106-c7ab9019e8de?w=800&h=450&fit=crop' },
];

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

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
            Latest F1 News
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
            {newsArticles.map((article) => (
              <article key={article.id} className="group cursor-pointer overflow-hidden" onClick={() => handleArticleClick(article)}>
                <div className="relative aspect-video bg-[#1f1f28] overflow-hidden mb-4">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={article.image}
                    alt={article.title}
                  />
                  {article.isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <span className="material-symbols-outlined text-white text-2xl ml-1">play_arrow</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <span className="inline-block bg-[#ff553d] text-[#5b0300] px-3 py-1 font-mono text-[10px] font-bold">
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold leading-tight group-hover:text-[#ffb4a7] transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-mono text-xs text-[#a5a0b3]">
                    {article.timestamp}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Article Notification */}
      {selectedArticle && (
        <div className="fixed top-8 right-8 z-[200] w-96 bg-[#1f1f28] border border-[#ff553d] rounded-lg overflow-hidden shadow-2xl animate-in fade-in slide-in-from-right-4 duration-300">
          <div className="bg-[#ff553d] text-[#5b0300] px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">info</span>
              <span className="font-mono text-xs font-bold">ARTICLE SELECTED</span>
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
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <span className="inline-block bg-[#ff553d] text-[#5b0300] px-3 py-1 font-mono text-[10px] font-bold mb-2">
                {selectedArticle.category}
              </span>
              <h3 className="text-sm font-bold text-[#e4e1ee] leading-tight mb-2">
                {selectedArticle.title}
              </h3>
              <p className="font-mono text-xs text-[#a5a0b3]">
                {selectedArticle.timestamp}
              </p>
            </div>

            <button className="w-full bg-[#ff553d] text-[#5b0300] py-2 font-mono text-xs font-bold rounded hover:brightness-110 transition-all">
              READ FULL ARTICLE
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
