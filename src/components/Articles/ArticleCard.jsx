import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaClock, FaEye, FaTags, FaArrowRight } from 'react-icons/fa';

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
        cursor: 'pointer'
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
        />
        
        {/* Overlay with Read More button - visible on hover */}
        <div style={{
          position: 'absolute',
          inset: '0',
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: '0',
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(2px)'
        }}
        className="article-overlay">
          <button style={{
            background: 'white',
            color: '#1e293b',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            transform: 'translateY(10px)',
            transition: 'transform 0.3s ease'
          }}>
            Baca Selengkapnya <FaArrowRight />
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
        )}

        {/* Meta Information */}
        <div className="article-meta">
          <div className="meta-left">
            <div className="meta-item">
              <FaUser style={{ fontSize: '0.75rem' }} />
              <span>{getAuthorName(article.author)}</span>
            </div>
            <div className="meta-item">
              <FaClock style={{ fontSize: '0.75rem' }} />
              <span>{formatDate(article.created_at || article.published_at)}</span>
            </div>
          </div>
          
          {article.view_count && (
            <div className="meta-item">
              <FaEye style={{ fontSize: '0.75rem' }} />
              <span>{article.view_count}</span>
            </div>
          )}
        </div>
      </div>

      {/* Custom styles for hover effects */}
      <style jsx>{`
        .article-card:hover .article-overlay {
          opacity: 1 !important;
        }
        
        .article-card:hover .article-overlay button {
          transform: translateY(0) !important;
        }

        .article-card:hover .article-category {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default ArticleCard;
