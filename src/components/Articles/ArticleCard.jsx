import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaClock, FaEye, FaTags, FaArrowRight, FaCalendarAlt, FaHeart } from 'react-icons/fa';

const ArticleCard = ({ article, index = 0 }) => {
  const navigate = useNavigate();
  
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
    if (!imagePath) return '/api/placeholder/400/250';
    if (imagePath.startsWith('http')) return imagePath;
    return `${process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000'}/storage/${imagePath}`;
  };
  const handleCardClick = () => {
    // Navigate to article detail page using slug or id
    const articleSlug = article.slug || `article-${article.id}`;
    navigate(`/articles/${articleSlug}`);
  };
  return (
    <div 
      className="article-card"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden'
      }}
      onClick={handleCardClick}
    >
      {/* Article Image */}
      <div className="article-image">
        <img 
          src={getImageUrl(article.featured_image)} 
          alt={article.title}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/250';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
        />
        
        {/* Reading Time Badge */}
        {article.reading_time && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            <FaClock style={{ fontSize: '0.625rem' }} />
            {article.reading_time} min
          </div>
        )}
        
        {/* Featured Badge */}
        {article.is_featured && (
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '15px',
            fontSize: '0.75rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            animation: 'pulse 2s infinite'
          }}>
            <FaHeart style={{ fontSize: '0.625rem' }} />
            Featured
          </div>
        )}
        
        {/* Hover Overlay with Enhanced Button */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '0',
          transition: 'all 0.4s ease',
          backdropFilter: 'blur(3px)'
        }}
        className="article-overlay">
          <button style={{
            background: 'linear-gradient(135deg, #2563eb, #3b82f6)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '30px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.875rem',
            transform: 'translateY(20px) scale(0.9)',
            transition: 'all 0.4s ease',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            Baca Selengkapnya 
            <FaArrowRight style={{ 
              transition: 'transform 0.3s ease' 
            }} />
          </button>
        </div>
      </div>

      {/* Article Content */}
      <div className="article-content">
        {/* Category */}
        {article.category && (
          <div className="article-category">
            <FaTags style={{ fontSize: '0.625rem' }} />
            {article.category}
          </div>
        )}

        {/* Title */}
        <h3 className="article-title">{article.title}</h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="article-excerpt">{article.excerpt}</p>
        )}        {/* Meta Information */}
        <div className="article-meta">
          <div className="meta-left">
            <div className="meta-item">
              <FaUser style={{ fontSize: '0.75rem' }} />
              <span>{getAuthorName(article.author)}</span>
            </div>
            <div className="meta-item">
              <FaCalendarAlt style={{ fontSize: '0.75rem' }} />
              <span>{formatDate(article.created_at || article.published_at)}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {article.view_count && (
              <div className="meta-item">
                <FaEye style={{ fontSize: '0.75rem' }} />
                <span>{article.view_count}</span>
              </div>
            )}
            
            {/* Like Button (placeholder for future functionality) */}
            <div className="meta-item" style={{ cursor: 'pointer' }}>
              <FaHeart style={{ 
                fontSize: '0.75rem', 
                color: '#ef4444',
                transition: 'all 0.3s ease'
              }} />
              <span>{Math.floor(Math.random() * 50) + 5}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS for hover effects */}
      <style jsx>{`
        .article-card:hover .article-overlay {
          opacity: 1 !important;
        }
        
        .article-card:hover .article-overlay button {
          transform: translateY(0) scale(1) !important;
        }

        .article-card:hover .article-overlay button svg {
          transform: translateX(5px);
        }

        .article-card:hover .article-category {
          transform: translateY(-3px) scale(1.05);
        }

        .article-card:hover img {
          transform: scale(1.1);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleCard;
