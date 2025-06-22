import React, { useState, useEffect, useRef } from 'react';
import { FaNewspaper, FaTags, FaStar, FaEye, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const ArticleStats = ({ 
  totalArticles = 0, 
  totalCategories = 0, 
  featuredArticles = 0,
  totalViews = 0,
  articlesThisMonth = 0,
  isVisible = false 
}) => {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    totalArticles: 0,
    totalCategories: 0,
    featuredArticles: 0,
    totalViews: 0,
    articlesThisMonth: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  // Intersection Observer untuk animasi saat terlihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateNumbers();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [hasAnimated]);

  const animateNumbers = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;

    const targets = {
      totalArticles,
      totalCategories,
      featuredArticles,
      totalViews,
      articlesThisMonth
    };

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedNumbers({
        totalArticles: Math.floor(targets.totalArticles * easeOutQuart),
        totalCategories: Math.floor(targets.totalCategories * easeOutQuart),
        featuredArticles: Math.floor(targets.featuredArticles * easeOutQuart),
        totalViews: Math.floor(targets.totalViews * easeOutQuart),
        articlesThisMonth: Math.floor(targets.articlesThisMonth * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedNumbers(targets);
      }
    }, stepTime);
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const stats = [
    {
      icon: FaNewspaper,
      value: animatedNumbers.totalArticles,
      label: 'Total Artikel',
      color: '#2563eb',
      bgColor: '#dbeafe',
      description: 'Artikel yang telah dipublikasikan'
    },
    {
      icon: FaTags,
      value: animatedNumbers.totalCategories,
      label: 'Kategori',
      color: '#059669',
      bgColor: '#d1fae5',
      description: 'Beragam topik artikel'
    },
    {
      icon: FaStar,
      value: animatedNumbers.featuredArticles,
      label: 'Artikel Unggulan',
      color: '#dc2626',
      bgColor: '#fee2e2',
      description: 'Artikel pilihan redaksi'
    },
    {
      icon: FaEye,
      value: animatedNumbers.totalViews,
      label: 'Total Pembaca',
      color: '#7c3aed',
      bgColor: '#ede9fe',
      description: 'Jumlah pembaca artikel'
    },
    {
      icon: FaCalendarAlt,
      value: animatedNumbers.articlesThisMonth,
      label: 'Artikel Bulan Ini',
      color: '#ea580c',
      bgColor: '#fed7aa',
      description: 'Artikel terbaru bulan ini'
    }
  ];

  return (
    <div ref={statsRef} className="articles-stats">
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '2.5rem'
      }}>
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700',
          color: '#1e293b',
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem'
        }}>
          <FaChartLine style={{ color: '#2563eb' }} />
          Statistik Artikel
        </h2>
        <p style={{ 
          color: '#64748b', 
          fontSize: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Jelajahi koleksi artikel kami yang terus berkembang dengan berbagai topik menarik
        </p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div 
              key={stat.label}
              className="stat-item"
              style={{
                background: `linear-gradient(135deg, ${stat.bgColor} 0%, white 100%)`,
                border: `1px solid ${stat.bgColor}`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                color: 'white',
                fontSize: '1.5rem',
                boxShadow: `0 8px 25px ${stat.color}33`,
                transition: 'all 0.3s ease'
              }}>
                <IconComponent />
              </div>

              {/* Number */}
              <div 
                className="stat-number"
                style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}cc 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem',
                  lineHeight: '1'
                }}
              >
                {formatNumber(stat.value)}
              </div>

              {/* Label */}
              <div 
                className="stat-label"
                style={{
                  color: '#374151',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                {stat.label}
              </div>

              {/* Description */}
              <div style={{
                color: '#6b7280',
                fontSize: '0.75rem',
                lineHeight: '1.4',
                fontStyle: 'italic'
              }}>
                {stat.description}
              </div>

              {/* Hover effect overlay */}
              <div style={{
                position: 'absolute',
                inset: '0',
                background: `linear-gradient(135deg, ${stat.color}15 0%, transparent 100%)`,
                borderRadius: '12px',
                opacity: '0',
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
              }} 
              className="stat-hover-overlay" />
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div style={{
        marginTop: '2rem',
        textAlign: 'center',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          color: '#475569',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          <span>📊</span>
          Data diperbarui secara real-time
          <span style={{
            background: '#22c55e',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            display: 'inline-block',
            animation: 'pulse 2s infinite'
          }} />
        </div>
      </div>

      {/* Custom CSS untuk hover effects */}
      <style jsx>{`
        .stat-item:hover .stat-hover-overlay {
          opacity: 1 !important;
        }
        
        .stat-item:hover > div:first-child {
          transform: scale(1.1) rotate(5deg) !important;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .stat-item > div:first-child {
            width: 50px !important;
            height: 50px !important;
            font-size: 1.25rem !important;
          }
          
          .stat-number {
            font-size: 2rem !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ArticleStats;
