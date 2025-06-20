import React, { useState, useEffect, useRef } from 'react';
import { 
  FaHistory, FaEye, FaBullseye, FaUsers, FaBuilding, FaTrophy, FaGlobe,
  FaRocket, FaShieldAlt, FaFlag, FaAward, FaChartLine, FaCalendarAlt,
  FaClock, FaStar, FaCheckCircle
} from 'react-icons/fa';
import ApiService from '../services/api';

const CompanyHistory = () => {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const timelineRef = useRef(null);
  const observerRef = useRef(null);// Icon mapping untuk timeline - sesuai dengan FontAwesome backend
  const iconMap = {
    'building': <FaBuilding />,
    'trophy': <FaTrophy />,
    'globe': <FaGlobe />,
    'users': <FaUsers />,
    'eye': <FaEye />,
    'bullseye': <FaBullseye />,
    'rocket': <FaRocket />,
    'shield': <FaShieldAlt />,
    'award': <FaAward />,
    'chart-line': <FaChartLine />,
    'flag': <FaFlag />,
    // Full FontAwesome class names
    'fas fa-building': <FaBuilding />,
    'fas fa-trophy': <FaTrophy />,
    'fas fa-globe': <FaGlobe />,
    'fas fa-users': <FaUsers />,
    'fas fa-eye': <FaEye />,
    'fas fa-bullseye': <FaBullseye />,
    'fas fa-rocket': <FaRocket />,
    'fas fa-shield': <FaShieldAlt />,
    'fas fa-award': <FaAward />,
    'fas fa-chart-line': <FaChartLine />,
    'fas fa-flag': <FaFlag />,
    'fas fa-briefcase': <FaBuilding />
  };
  // Fallback timeline yang lebih ringkas
  const fallbackTimeline = [
    {
      year: 2008,
      title: "Pendirian LAMDAKU",
      description: "LAMDAKU didirikan sebagai lembaga akreditasi independen pertama di Indonesia.",
      icon: 'building'
    },
    {
      year: 2015,
      title: "Ekspansi & Sertifikasi",
      description: "Memperoleh sertifikasi ISO 9001:2015 dan ekspansi ke 5 kota besar Indonesia.",
      icon: 'trophy'
    },
    {
      year: 2020,
      title: "Standar Internasional",
      description: "Mengadopsi standar JCI dan meluncurkan platform digital untuk akreditasi online.",
      icon: 'bullseye'
    },
    {
      year: 2025,
      title: "Inovasi Digital",
      description: "Mengintegrasikan AI dan machine learning dalam proses assessment akreditasi.",
      icon: 'rocket'
    }
  ];useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiTimeline = await ApiService.getTimelines();
        
        if (apiTimeline && Array.isArray(apiTimeline) && apiTimeline.length > 0) {
          // Transform API data to include icons and sort by year
          const transformedTimeline = apiTimeline
            .filter(item => item.is_active) // Only show active timeline items
            .sort((a, b) => a.year - b.year) // Sort by year ascending
            .map(item => ({
              ...item,
              icon: iconMap[item.icon] || iconMap['fas fa-building'] || <FaBuilding />
            }));
          
          setTimeline(transformedTimeline);
        } else {
          throw new Error('No timeline data available');
        }
      } catch (error) {
        setError(error.message);
        
        // Use fallback timeline if API fails
        const transformedFallback = fallbackTimeline.map(item => ({
          ...item,
          icon: iconMap[item.icon] || <FaBuilding />
        }));
        setTimeline(transformedFallback);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);  // Simplified Intersection Observer untuk animasi scroll yang subtle
  useEffect(() => {
    if (!timelineRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observerRef.current.observe(item);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [timeline]);// Menghitung statistik timeline
  const timelineStats = {
    totalYears: timeline.length > 0 ? Math.max(...timeline.map(item => item.year)) - Math.min(...timeline.map(item => item.year)) + 1 : 0,
    totalEvents: timeline.length,
    latestYear: timeline.length > 0 ? Math.max(...timeline.map(item => item.year)) : new Date().getFullYear(),
    firstYear: timeline.length > 0 ? Math.min(...timeline.map(item => item.year)) : new Date().getFullYear()
  };

  if (loading) {
    return (
      <section className="company-history">
        <div className="container">
          <div className="section-header">
            <FaHistory className="section-icon" />
            <h2>Sejarah Perusahaan</h2>
          </div>
          <div className="timeline-loading">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error && timeline.length === 0) {
    return (
      <section className="company-history">
        <div className="container">
          <div className="section-header">
            <FaHistory className="section-icon" />
            <h2>Sejarah Perusahaan</h2>
          </div>
          <div style={{ padding: '20px', background: '#f8d7da', borderRadius: '5px', color: '#721c24' }}>
            <p>❌ Error loading timeline: {error}</p>
            <p>Using fallback data...</p>
          </div>
        </div>
      </section>
    );
  }  return (
    <section className="company-history">
      <div className="container">        <div className="section-header">
          <FaHistory className="section-icon" />
          <h2>Sejarah Perusahaan</h2>
          <p>Perjalanan panjang LAMDAKU dalam membangun standar akreditasi kesehatan terbaik</p>
        </div>
          {timeline.length > 0 && (
          <div className="timeline-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <FaCheckCircle />
              </div>
              <div className="stat-number" data-number={timelineStats.totalEvents}>{timelineStats.totalEvents}</div>
              <div className="stat-label">Milestone Penting</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaClock />
              </div>
              <div className="stat-number" data-number={timelineStats.totalYears}>{timelineStats.totalYears}</div>
              <div className="stat-label">Tahun Perjalanan</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-number" data-number={timelineStats.firstYear}>{timelineStats.firstYear}</div>
              <div className="stat-label">Tahun Didirikan</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-number" data-number={timelineStats.latestYear}>{timelineStats.latestYear}</div>
              <div className="stat-label">Update Terakhir</div>
            </div>
          </div>
        )}<div className="timeline" ref={timelineRef}>
          {timeline.length > 0 ? timeline.map((item, index) => (            <div className="timeline-item" key={item.id || index}>
              <div className="timeline-year">{item.year}</div>
              <div className="timeline-dot" data-year={item.year}>
                {item.icon || <FaBuilding />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div className="timeline-icon-small">
                    {item.icon || <FaBuilding />}
                  </div>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.description}</p>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>No timeline data available</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CompanyHistory;
