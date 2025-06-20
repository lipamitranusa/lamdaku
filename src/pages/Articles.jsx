import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaUser, FaEye, FaTags } from 'react-icons/fa';
import ApiService from '../services/api';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['semua']);

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const fetchArticlesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all articles
      const articlesResponse = await ApiService.getArticles();
      
      if (articlesResponse && articlesResponse.success) {
        setArticles(articlesResponse.data || []);
        
        // Extract categories dari artikel
        const articleCategories = articlesResponse.data
          .map(article => article.category)
          .filter(Boolean);
        const uniqueCategories = [...new Set(articleCategories)];
        setCategories(['semua', ...uniqueCategories]);
      }

      // Fetch featured articles
      try {
        const featuredResponse = await ApiService.getFeaturedArticles();
        if (featuredResponse && featuredResponse.success) {
          setFeaturedArticles(featuredResponse.data || []);
        }
      } catch (featuredError) {
        console.warn('Featured articles not available:', featuredError);
      }

    } catch (error) {
      console.error('Error fetching articles:', error);
      setError(error.message);
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
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <p style={{ color: '#64748b' }}>Memuat artikel...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <div className="container">
          <div style={{ 
            background: '#fef2f2', 
            color: '#991b1b', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            margin: '2rem 0',
            textAlign: 'center'
          }}>
            <p><strong>Error:</strong> {error}</p>
            <button 
              onClick={fetchArticlesData}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '0.25rem',
                cursor: 'pointer'
              }}
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-page" style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1rem' }}>
            Portal Artikel
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Temukan artikel terbaru seputar akreditasi, kesehatan, dan industri terkait
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '2rem', 
          borderRadius: '12px', 
          marginBottom: '3rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', maxWidth: '400px' }}>
            <FaSearch style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#64748b'
            }} />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  padding: '0.5rem 1rem',
                  border: selectedCategory === category ? '2px solid #2563eb' : '1px solid #d1d5db',
                  background: selectedCategory === category ? '#2563eb' : 'white',
                  color: selectedCategory === category ? 'white' : '#374151',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticles.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
              Artikel Unggulan
            </h2>
            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              overflow: 'hidden',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}>
              {featuredArticles.slice(0, 2).map((article, index) => (
                <div key={article.id || index} style={{ padding: '1.5rem' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ 
                      background: '#dc2626', 
                      color: 'white', 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      FEATURED
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: 'bold', 
                    marginBottom: '0.5rem',
                    color: '#1e293b'
                  }}>
                    {article.title}
                  </h3>
                  <p style={{ color: '#64748b', marginBottom: '1rem' }}>
                    {article.excerpt}
                  </p>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FaUser /> {getAuthorName(article.author)}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <FaClock /> {formatDate(article.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e293b' }}>
            {selectedCategory === 'semua' ? 'Semua Artikel' : `Artikel ${selectedCategory}`}
          </h2>
          
          {filteredArticles.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '3rem',
              background: '#f8fafc',
              borderRadius: '12px',
              color: '#64748b'
            }}>
              <p>Tidak ada artikel yang ditemukan.</p>
            </div>
          ) : (
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
              gap: '2rem' 
            }}>
              {filteredArticles.map((article, index) => (
                <div 
                  key={article.id || index} 
                  style={{ 
                    background: 'white', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  {article.featured_image && (
                    <div style={{ height: '200px', overflow: 'hidden' }}>
                      <img 
                        src={article.featured_image} 
                        alt={article.title}
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover' 
                        }}
                      />
                    </div>
                  )}
                  
                  <div style={{ padding: '1.5rem' }}>
                    {article.category && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <span style={{ 
                          background: '#e5e7eb', 
                          color: '#374151', 
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          fontWeight: 'medium'
                        }}>
                          <FaTags style={{ marginRight: '0.25rem' }} />
                          {article.category}
                        </span>
                      </div>
                    )}
                    
                    <h3 style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: 'bold', 
                      marginBottom: '0.5rem',
                      color: '#1e293b',
                      lineHeight: '1.4'
                    }}>
                      {article.title}
                    </h3>
                    
                    <p style={{ 
                      color: '#64748b', 
                      marginBottom: '1rem',
                      lineHeight: '1.6'
                    }}>
                      {article.excerpt}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaUser /> {getAuthorName(article.author)}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaClock /> {formatDate(article.created_at)}
                        </span>
                      </div>
                      
                      {article.view_count && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <FaEye /> {article.view_count}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Statistics */}
        <div style={{ 
          background: '#f8fafc', 
          padding: '2rem', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '2rem' 
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                {articles.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Total Artikel
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                {categories.length - 1}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Kategori
              </div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
                {featuredArticles.length}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Artikel Unggulan
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
