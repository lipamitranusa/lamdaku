import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaUser, FaClock, FaStar, FaArrowRight } from 'react-icons/fa';

const FeaturedCarousel = ({ articles = [] }) => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const validArticles = articles.filter(article => article && article.title);

  useEffect(() => {
    if (!isAutoplay || validArticles.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validArticles.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, validArticles.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % validArticles.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + validArticles.length) % validArticles.length);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoplay(false);
    setTimeout(() => setIsAutoplay(true), 10000);
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
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/api/placeholder/800/400';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/storage/${imagePath}`;
  };

  const handleReadMore = (article) => {
    const articleSlug = article.slug || `article-${article.id}`;
    navigate(`/articles/${articleSlug}`);
  };

  if (!validArticles.length) {
    return (
      <div className="featured-carousel">
        <div style={{ 
          padding: '4rem', 
          textAlign: 'center', 
          color: '#64748b',
          background: '#f8fafc'
        }}>
          <p>Tidak ada artikel unggulan tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700',
          color: '#1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <FaStar style={{ color: '#fbbf24' }} />
          Artikel Unggulan
        </h2>
        <div style={{ 
          fontSize: '0.875rem', 
          color: '#64748b',
          background: 'rgba(37, 99, 235, 0.1)',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontWeight: '500'
        }}>
          {currentSlide + 1} dari {validArticles.length}
        </div>
      </div>

      <div className="featured-carousel">
        <div 
          className="carousel-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {validArticles.map((article, index) => (
            <div key={article.id || index} className="carousel-slide">
              <img 
                src={getImageUrl(article.featured_image)} 
                alt={article.title}
                style={{ 
                  width: '100%', 
                  height: '400px', 
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease'
                }}
              />
              <div className="carousel-overlay">
                <div className="carousel-featured-badge">
                  <FaStar />
                  Featured
                </div>
                <h3 className="carousel-title">{article.title}</h3>
                {article.excerpt && (
                  <p className="carousel-excerpt">{article.excerpt}</p>
                )}                <div className="carousel-meta">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <FaUser />
                    {getAuthorName(article.author)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <FaClock />
                    {formatDate(article.created_at || article.published_at)}
                  </span>
                  {article.category && (
                    <span style={{ 
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      backdropFilter: 'blur(5px)'
                    }}>
                      {article.category}
                    </span>
                  )}
                </div>
                
                {/* Read More Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReadMore(article);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '25px',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '1rem',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                  }}
                >
                  Baca Selengkapnya
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Controls */}
        {validArticles.length > 1 && (
          <>
            <div className="carousel-controls prev">
              <button className="carousel-control-btn" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
            </div>
            <div className="carousel-controls next">
              <button className="carousel-control-btn" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            </div>

            {/* Indicators */}
            <div className="carousel-indicators">
              {validArticles.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </>
        )}

        {/* Progress Bar */}
        {isAutoplay && validArticles.length > 1 && (
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            height: '3px',
            background: 'rgba(37, 99, 235, 0.8)',
            animation: 'progressBar 5s linear infinite',
            transformOrigin: 'left'
          }} />
        )}
      </div>

      {/* Custom CSS for progress bar animation */}
      <style jsx>{`
        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default FeaturedCarousel;
