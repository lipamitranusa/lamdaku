import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaClock, FaUser, FaEye } from 'react-icons/fa';
import apiService from '../services/api';
import './Articles-detik.css';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState([
    'semua', 'teknologi', 'bisnis', 'pendidikan', 'kesehatan', 'olahraga'
  ]);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await apiService.getArticles();
      
      if (response.success) {
        setArticles(response.data);
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Gagal memuat artikel. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAuthorName = (author) => {
    if (typeof author === 'object' && author !== null) {
      return author.name || 'Admin';
    }
    return author || 'Admin';
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'semua' || 
      (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
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
          <div className="breaking-text">
            Selamat datang di portal berita terkini kami - Dapatkan informasi terbaru seputar teknologi dan inovasi
          </div>
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
        <div className="news-layout">
          {/* Main Articles */}
          <div className="news-main">
            {/* Featured Article */}
            {filteredArticles.length > 0 && (
              <div className="featured-article">
                <div className="featured-image">
                  <img 
                    src={filteredArticles[0].featured_image || '/api/placeholder/600/300'} 
                    alt={filteredArticles[0].title}
                  />
                </div>
                <div className="featured-content">
                  <span className="featured-category">{filteredArticles[0].category || 'Berita'}</span>
                  <h2 className="featured-title">{filteredArticles[0].title}</h2>
                  <p className="featured-excerpt">{filteredArticles[0].excerpt}</p>
                  <div className="featured-meta">
                    <span><FaUser /> {getAuthorName(filteredArticles[0].author)}</span>
                    <span><FaClock /> {formatDate(filteredArticles[0].created_at)}</span>
                    <span><FaEye /> {Math.floor(Math.random() * 1000) + 100} views</span>
                  </div>
                </div>
              </div>
            )}

            {/* News Grid */}
            <div className="news-grid">
              <div className="news-cards">                {filteredArticles.slice(1).map((article, index) => (
                  <Link key={article.id || index} to={`/artikel/${article.slug}`} className="news-card">
                    <img 
                      src={article.featured_image || '/api/placeholder/300/200'} 
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
                          <FaUser /> {getAuthorName(article.author)}                        </span>
                        <span className="news-card-date">
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

            {/* Trending Articles */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Trending</h3>
              <ul className="trending-list">                {filteredArticles.slice(0, 5).map((article, index) => (
                  <li key={article.id || index} className="trending-item">
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

            {/* Popular Categories */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Kategori Populer</h3>
              <div className="category-tags">
                {categories.slice(1).map(category => (
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

            {/* Latest News */}
            <div className="sidebar-section">
              <h3 className="sidebar-title">Berita Terbaru</h3>
              <div className="latest-news">                {filteredArticles.slice(-3).map((article, index) => (
                  <Link key={article.id || index} to={`/artikel/${article.slug}`} className="latest-item">
                    <img 
                      src={article.featured_image || '/api/placeholder/80/60'} 
                      alt={article.title}
                      className="latest-image"
                    />
                    <div className="latest-content">
                      <h4>{article.title}</h4>
                      <p className="latest-date">{formatDate(article.created_at)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        {filteredArticles.length > 10 && (
          <div className="load-more-section">
            <button className="load-more-btn">
              Muat Lebih Banyak Berita
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
