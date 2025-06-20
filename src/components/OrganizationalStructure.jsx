import React, { useState, useEffect, useRef } from 'react';
import { FaUserTie, FaUsers, FaClipboardCheck, FaCogs, FaChartLine } from 'react-icons/fa';
import ApiService from '../services/api';

const OrganizationalStructure = () => {
  const [orgData, setOrgData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const orgChartRef = useRef(null);
  const observerRef = useRef(null);
  // Icon mapping untuk backend data
  const iconMap = {
    'crown': <FaUserTie />,
    'cogs': <FaCogs />,
    'user': <FaUsers />,
    'chart-line': <FaChartLine />,
    'hospital': <FaClipboardCheck />,
    'flask': <FaClipboardCheck />,
    'shield-alt': <FaClipboardCheck />,
    'graduation-cap': <FaUsers />,
    // Fallback defaults
    'UserTie': <FaUserTie />,
    'Users': <FaUsers />,
    'ClipboardCheck': <FaClipboardCheck />,
    'Cogs': <FaCogs />,
    'ChartLine': <FaChartLine />,
    'user-tie': <FaUserTie />,
    'users': <FaUsers />,
    'clipboard-check': <FaClipboardCheck />
  };useEffect(() => {
    const fetchOrganizationalData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Menggunakan ApiService untuk mengambil data dari backend Laravel yang sudah ada
        const response = await ApiService.getOrganizationalStructure();
          if (response?.success) {
          // Transform backend data to match frontend format
          const backendData = response.data;
          
          // Convert backend structure (grouped by level) to frontend format
          const structure = Object.keys(backendData)
            .filter(key => !isNaN(key)) // Only numeric keys (levels)
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort by level
            .map(levelKey => ({
              level: parseInt(levelKey),
              positions: backendData[levelKey].map(person => ({
                title: person.position,
                name: person.name,
                description: person.description,
                icon: iconMap[person.icon_class?.replace('fas fa-', '')] || <FaUserTie />,
                photo: person.photo,
                backgroundColor: person.background_color
              }))
            }));          const transformedData = {
            structure: structure
          };
          
          setOrgData(transformedData);
        } else {
          throw new Error('API response indicates failure');
        }
      } catch (error) {
        console.error('Error fetching organizational data:', error);
        setError(error.message);
          // Fallback ke data statis
        setOrgData({
          structure: [
            {
              level: 1,
              positions: [
                {
                  title: "Direktur Utama",
                  name: "Dr. Ahmad Santoso, M.Kes",
                  icon: <FaUserTie />,
                  description: "Memimpin kebijakan strategis dan pengembangan organisasi"
                }
              ]
            },
            {
              level: 2,
              positions: [
                {
                  title: "Direktur Operasional",
                  name: "Dr. Sari Wijaya, M.M",
                  icon: <FaCogs />,
                  description: "Mengawasi operasional harian dan implementasi standar"
                },
                {
                  title: "Direktur Pengembangan",
                  name: "Prof. Budi Hartono, Ph.D",
                  icon: <FaChartLine />,
                  description: "Bertanggung jawab atas R&D dan inovasi metodologi"
                }
              ]
            },
            {
              level: 3,
              positions: [
                {
                  title: "Manajer Akreditasi Klinik",
                  name: "Dr. Lisa Permata, Sp.PK",
                  icon: <FaClipboardCheck />,
                  description: "Memimpin tim akreditasi untuk klinik dan rumah sakit"
                },
                {
                  title: "Manajer Akreditasi Lab",
                  name: "Dr. Rio Mandala, M.Si",
                  icon: <FaClipboardCheck />,
                  description: "Mengelola akreditasi laboratorium medis"
                },
                {
                  title: "Manajer SDM & Pelatihan",
                  name: "Dewi Anggraini, M.Psi",
                  icon: <FaUsers />,
                  description: "Mengembangkan kapasitas tim dan program pelatihan"
                }
              ]
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationalData();
  }, []);

  // Intersection Observer untuk animasi scroll yang subtle
  useEffect(() => {
    if (!orgChartRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Observe org levels
    const orgLevels = orgChartRef.current.querySelectorAll('.org-level');
    orgLevels.forEach((level) => {
      observerRef.current.observe(level);
    });

    // Observe position cards with staggered delay
    const positionCards = orgChartRef.current.querySelectorAll('.position-card');
    positionCards.forEach((card, index) => {
      // Add slight delay for staggered animation
      setTimeout(() => {
        observerRef.current.observe(card);
      }, index * 50);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [orgData]); // Re-run when orgData changes

  if (loading) {
    return (
      <section className="organizational-structure">
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
            <p style={{ color: '#64748b' }}>Memuat struktur organisasi...</p>
          </div>
        </div>
      </section>
    );
  }
  const { structure: orgStructure } = orgData || {};

  return (
    <>      <style>{`
        .positions-row {
          place-items: center;
        }
        
        @media (max-width: 1024px) {
          .positions-row {
            grid-template-columns: repeat(2, 1fr) !important;
            max-width: 600px !important;
            justify-content: center !important;
          }
        }
        
        @media (max-width: 640px) {
          .positions-row {
            grid-template-columns: 1fr !important;
            max-width: 300px !important;
            gap: 1rem !important;
            justify-content: center !important;
          }
        }
      `}</style>
      <section className="organizational-structure">
      <div className="container">
        {error && (
          <div style={{ 
            background: '#fef3cd', 
            color: '#856404', 
            padding: '0.75rem 1rem', 
            borderRadius: '0.375rem',
            margin: '0 0 2rem 0',
            border: '1px solid #ffeaa7',
            textAlign: 'center'
          }}>
            <small>
              <strong>⚠️ Perhatian:</strong> Menggunakan data fallback karena API tidak tersedia.
              {error && ` Error: ${error}`}
            </small>
          </div>
        )}
        
        <div className="section-header">
          <h2>Struktur Organisasi</h2>
          <p>Tim profesional dengan pengalaman dan keahlian di bidang akreditasi kesehatan</p>
        </div>        {/* Struktur Hirarki */}
        <div className="org-chart" style={{ width: '100%' }} ref={orgChartRef}>
          {orgStructure?.map((level, levelIndex) => (
            <div key={levelIndex} className={`org-level level-${level.level}`} style={{ marginBottom: '3rem' }}>
              {/* Level Title */}
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 0.5rem 0'
                }}>
                  Level {level.level}
                </h3>
                <div style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#2563eb',
                  margin: '0 auto',
                  borderRadius: '2px'
                }}></div>
              </div>              <div 
                className="positions-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: level.positions?.length >= 4 ? 'repeat(4, 1fr)' : 
                                     level.positions?.length === 3 ? 'repeat(3, 1fr)' : 
                                     level.positions?.length === 2 ? 'repeat(2, 1fr)' : '1fr',
                  maxWidth: level.positions?.length >= 4 ? '1200px' :
                           level.positions?.length === 3 ? '900px' :
                           level.positions?.length === 2 ? '600px' : '300px',
                  margin: '0 auto',
                  gap: '2rem',
                  padding: '0 1rem',
                  justifyItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {level.positions?.map((position, posIndex) => (                  <div 
                    key={posIndex} 
                    className="position-card"
                    style={{
                      minHeight: '280px',
                      width: '250px',
                      maxWidth: '250px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '1.5rem',
                      backgroundColor: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: '1px solid #e5e7eb',
                      cursor: 'pointer'
                    }}
                  >
                    <div className="position-photo" style={{ marginBottom: '1rem' }}>
                      {position.photo ? (
                        <img 
                          src={`http://127.0.0.1:8000/storage/${position.photo}`} 
                          alt={position.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '3px solid #fff',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="position-icon"
                        style={{
                          display: position.photo ? 'none' : 'flex',
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          backgroundColor: position.backgroundColor || '#f0f0f0',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          color: '#fff',
                          border: '3px solid #fff',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}
                      >
                        {position.icon}
                      </div>
                    </div>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      color: '#1f2937',
                      textAlign: 'center',
                      margin: '0 0 0.5rem 0',
                      lineHeight: '1.3',
                      minHeight: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>{position.title}</h3>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '500',
                      color: '#2563eb',
                      textAlign: 'center',
                      margin: '0 0 1rem 0',
                      lineHeight: '1.4',
                      minHeight: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>{position.name}</h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      textAlign: 'center',
                      lineHeight: '1.5',
                      margin: '0',
                      flex: '1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>{position.description}</p>
                  </div>
                ))}
              </div>
              {levelIndex < orgStructure.length - 1 && (
                <div className="org-connector"></div>
              )}
            </div>          ))}        </div>
      </div>
    </section>
    </>
  );
};

export default OrganizationalStructure;
