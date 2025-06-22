import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaClock, FaEye, FaTags, FaShare, FaPrint } from 'react-icons/fa';
import ApiService from '../services/api';
import ArticleContentWrapper from '../components/ArticleContentWrapper';

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch by slug first, then by ID if slug fails
      let response;
      
      try {
        response = await ApiService.getArticleBySlug(slug);
      } catch (slugError) {
        // If slug fails, try treating it as an ID
        const id = slug.replace('article-', '');
        response = await ApiService.getArticle(id);
      }

      if (response && response.success !== false) {
        // Handle different response formats
        const articleData = response.data || response;
        setArticle(articleData);
        
        // Fetch related articles
        try {
          const relatedResponse = await ApiService.getLatestArticles(3);
          if (relatedResponse && Array.isArray(relatedResponse)) {
            setRelatedArticles(relatedResponse.filter(a => a.id !== articleData.id));
          } else if (relatedResponse && relatedResponse.data) {
            setRelatedArticles(relatedResponse.data.filter(a => a.id !== articleData.id));
          }
        } catch (relatedError) {
          console.warn('Could not fetch related articles:', relatedError);
        }
      } else {
        throw new Error('Article not found');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Artikel tidak ditemukan atau terjadi kesalahan saat memuat.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt || '',
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link artikel telah disalin ke clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRelatedArticleClick = (relatedArticle) => {
    const articleSlug = relatedArticle.slug || `article-${relatedArticle.id}`;
    navigate(`/articles/${articleSlug}`);
  };

  if (loading) {
    return (
      <div className="article-detail-page" style={{ padding: '2rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{
              width: '50px',
              height: '50px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3b82f6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem'
            }}></div>
            <p style={{ color: '#64748b', fontSize: '1.1rem' }}>Memuat artikel...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="article-detail-page" style={{ padding: '2rem 0', minHeight: '60vh' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{
              fontSize: '4rem',
              color: '#ef4444',
              marginBottom: '1rem'
            }}>
              📄
            </div>
            <h2 style={{ color: '#1e293b', marginBottom: '1rem' }}>Artikel Tidak Ditemukan</h2>
            <p style={{ color: '#64748b', marginBottom: '2rem' }}>{error}</p>
            <button
              onClick={() => navigate('/articles')}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto'
              }}
            >
              <FaArrowLeft />
              Kembali ke Daftar Artikel
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="article-detail-page" style={{ padding: '2rem 0' }}>
      <div className="container">
        {/* Back Button */}
        <button
          onClick={() => navigate('/articles')}
          style={{
            background: 'transparent',
            border: '1px solid #e2e8f0',
            color: '#64748b',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#f8fafc';
            e.target.style.borderColor = '#cbd5e1';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = '#e2e8f0';
          }}
        >
          <FaArrowLeft />
          Kembali ke Artikel
        </button>

        {/* Article Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            {article.category && (
              <span style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem'
              }}>
                <FaTags style={{ fontSize: '0.75rem' }} />
                {article.category}
              </span>
            )}
          </div>

          <h1 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: '700',
            color: '#1e293b',
            lineHeight: '1.2',
            marginBottom: '1.5rem'
          }}>
            {article.title}
          </h1>

          {/* Article Meta */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            paddingBottom: '1.5rem',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
              <FaUser style={{ fontSize: '0.875rem' }} />
              <span style={{ fontWeight: '500' }}>{getAuthorName(article.author)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
              <FaClock style={{ fontSize: '0.875rem' }} />
              <span>{formatDate(article.created_at || article.published_at)}</span>
            </div>
            {article.view_count && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b' }}>
                <FaEye style={{ fontSize: '0.875rem' }} />
                <span>{article.view_count} views</span>
              </div>
            )}
            
            {/* Action Buttons */}
            <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={handleShare}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#475569',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem'
                }}
                title="Share artikel"
              >
                <FaShare />
              </button>
              <button
                onClick={handlePrint}
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  color: '#475569',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem'
                }}
                title="Print artikel"
              >
                <FaPrint />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featured_image && (
          <div style={{ marginBottom: '3rem' }}>
            <img
              src={getImageUrl(article.featured_image)}
              alt={article.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          <article style={{
            fontSize: '1.125rem',
            lineHeight: '1.8',
            color: '#374151'
          }}>
            {/* Excerpt */}
            {article.excerpt && (
              <div style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '2rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <p style={{
                  fontSize: '1.2rem',
                  fontStyle: 'italic',
                  color: '#0f172a',
                  margin: '0',
                  fontWeight: '500'
                }}>
                  {article.excerpt}
                </p>
              </div>
            )}            {/* Article Content */}
            <ArticleContentWrapper content={article.content} />
          </article>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div style={{ marginTop: '4rem', paddingTop: '3rem', borderTop: '1px solid #e2e8f0' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '2rem'
            }}>
              Artikel Terkait
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {relatedArticles.slice(0, 3).map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  onClick={() => handleRelatedArticleClick(relatedArticle)}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <img
                    src={getImageUrl(relatedArticle.featured_image)}
                    alt={relatedArticle.title}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/200';
                    }}
                  />
                  <div style={{ padding: '1.5rem' }}>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4'
                    }}>
                      {relatedArticle.title}
                    </h4>
                    {relatedArticle.excerpt && (
                      <p style={{
                        color: '#64748b',
                        fontSize: '0.875rem',
                        lineHeight: '1.5',
                        margin: '0'
                      }}>
                        {relatedArticle.excerpt.substring(0, 120)}...
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .article-detail-page {
            padding: 0 !important;
          }
          .container {
            max-width: none !important;
            padding: 0 !important;
          }
          button {
            display: none !important;
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default ArticleDetail;
