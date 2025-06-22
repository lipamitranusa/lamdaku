import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaSpinner, FaClock, FaUser, FaEye } from 'react-icons/fa';
import ArticleCard from '../components/ArticleCard';
import apiService from '../services/api';
import './Articles-detik.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [trendingArticles, setTrendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([
    'semua', 'teknologi', 'bisnis', 'pendidikan', 'kesehatan', 'olahraga'
  ]);
  const [breakingNews, setBreakingNews] = useState('Selamat datang di portal berita terkini kami - Dapatkan informasi terbaru seputar teknologi dan inovasi');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticles();
    fetchFeaturedArticle();
    fetchTrendingArticles();
  }, [currentPage, selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await apiService.getArticles(
        currentPage, 
        selectedCategory === 'semua' ? null : selectedCategory
      );
      
      if (response.success) {
        setArticles(response.data);
        setTotalPages(response.pagination?.last_page || 1);
        
        // Extract unique categories from API response
        const allCategories = response.data.map(article => article.category);
        const uniqueCategories = [...new Set(allCategories)].filter(Boolean);
        setCategories(['semua', ...uniqueCategories]);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Gagal memuat artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedArticle = async () => {
    try {
      const response = await apiService.getFeaturedArticles();
      if (response.success && response.data.length > 0) {
        setFeaturedArticle(response.data[0]); // Ambil artikel featured pertama
      }
    } catch (err) {
      console.error('Error fetching featured article:', err);
    }
  };

  const fetchTrendingArticles = async () => {
    try {
      const response = await apiService.getArticles(1, null);
      if (response.success) {
        // Ambil 5 artikel pertama sebagai trending
        setTrendingArticles(response.data.slice(0, 5));
      }
    } catch (err) {
      console.error('Error fetching trending articles:', err);
    }
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorName = (author) => {
    if (typeof author === 'object' && author !== null) {
      return author.name || 'Admin';
    }
    return author || 'Admin';
  };

  if (loading && currentPage === 1) {
    return (
      <div className="articles-page">
        <div className="articles-container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Memuat berita terkini...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <div className="articles-container">
          <div className="error-state">
            <p>{error}</p>
            <button onClick={fetchArticles} className="retry-button">
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="articles-page">
      <div className="articles-container">
        {/* News Header */}
        <div className="news-header">
          <h1>Portal Berita</h1>
          <p className="subtitle">Informasi terkini seputar teknologi, bisnis, dan inovasi terdepan</p>
        </div>

        {/* Breaking News Bar */}
        <div className="breaking-news">
          <span className="breaking-badge">Breaking</span>
          <div className="breaking-text">{breakingNews}</div>
        </div>

        {/* Navigation Tabs */}
        <div className="news-tabs">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`news-tab ${selectedCategory === category ? 'active' : ''}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="news-content">
          {/* Featured Article Section */}
          <div className="featured-section">
            {featuredArticle && (
              <Link to={`/artikel/${featuredArticle.slug}`} className="featured-article">
                <img 
                  src={featuredArticle.image || '/api/placeholder/800/350'} 
                  alt={featuredArticle.title}
                  className="featured-image"
                />
                <div className="featured-overlay">
                  <span className="featured-category">
                    {featuredArticle.category || 'Utama'}
                  </span>
                  <h2 className="featured-title">{featuredArticle.title}</h2>
                  <p className="featured-excerpt">{featuredArticle.excerpt}</p>                  <div className="featured-meta">
                    <span><FaUser /> {typeof featuredArticle.author === 'object' ? featuredArticle.author?.name || 'Admin' : featuredArticle.author || 'Admin'}</span>
                    <span><FaClock /> {formatDate(featuredArticle.created_at)}</span>
                    <span><FaEye /> {Math.floor(Math.random() * 1000) + 100} views</span>
                  </div>
                </div>
              </Link>
            )}

            {/* Articles Grid Below Featured */}
            <div className="articles-grid">
              <h2>Berita Terbaru</h2>
              <div className="news-articles-list">                {filteredArticles.slice(0, 6).map(article => (
                  <Link key={article.id} to={`/artikel/${article.slug}`} className="news-article-card">
                    <img 
                      src={article.image || '/api/placeholder/300/180'} 
                      alt={article.title}
                      className="news-card-image"
                    />
                    <div className="news-card-content">
                      <span className="news-card-category">
                        {article.category || 'Berita'}
                      </span>
                      <h3 className="news-card-title">{article.title}</h3>
                      <p className="news-card-excerpt">{article.excerpt}</p>
                      <div className="news-card-meta">
                        <span className="news-card-author">
                          <FaUser /> {article.author || 'Admin'}
                        </span>                        <span className="news-card-date">
                          <FaClock /> {formatDate(article.created_at)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="news-sidebar">
            {/* Trending Articles */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Trending</h3>
              <ul className="trending-list">                {trendingArticles.map((article, index) => (
                  <li key={article.id} className="trending-item">
                    <Link to={`/artikel/${article.slug}`} className="trending-link">
                      <span className="trending-number">{index + 1}</span>
                      <div className="trending-content">
                        <h4>{article.title}</h4>
                        <p className="meta">
                          <FaClock /> {formatDate(article.created_at)}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search Box */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Pencarian</h3>
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Popular Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Kategori Populer</h3>
              <div className="category-tags">
                {categories.slice(1, 6).map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* More Articles Section */}
        {filteredArticles.length > 6 && (
          <div className="articles-grid">
            <h2>Artikel Lainnya</h2>
            <div className="news-articles-list">              {filteredArticles.slice(6).map(article => (
                <Link key={article.id} to={`/artikel/${article.slug}`} className="news-article-card">
                  <img 
                    src={article.image || '/api/placeholder/300/180'} 
                    alt={article.title}
                    className="news-card-image"
                  />
                  <div className="news-card-content">
                    <span className="news-card-category">
                      {article.category || 'Berita'}
                    </span>
                    <h3 className="news-card-title">{article.title}</h3>
                    <p className="news-card-excerpt">{article.excerpt}</p>
                    <div className="news-card-meta">
                      <span className="news-card-author">
                        <FaUser /> {article.author || 'Admin'}
                      </span>
                      <span className="news-card-date">
                        <FaClock /> {formatDate(article.created_at)}                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Sebelumnya
            </button>

            <div className="page-numbers">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`page-number ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Selanjutnya
            </button>
          </div>
        )}

        {/* No Articles Found */}
        {filteredArticles.length === 0 && !loading && (
          <div className="no-articles">
            <p>Tidak ada artikel yang ditemukan.</p>
            {(selectedCategory !== 'semua' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('semua');
                  setSearchQuery('');
                }}
                className="clear-filters"
              >
                Hapus Filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
