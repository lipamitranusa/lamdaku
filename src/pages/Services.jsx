import React, { useState, useEffect } from 'react';
import { FaHospital, FaFlask, FaHeartbeat, FaCertificate, FaUsers, FaShieldAlt, FaCheckCircle, FaClipboardCheck, FaBuilding, FaGraduationCap, FaSearch } from 'react-icons/fa';
import ApiService from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Icon mapping untuk services dari backend
  const iconMap = {
    'hospital': <FaHospital />,
    'flask': <FaFlask />,
    'heartbeat': <FaHeartbeat />,
    'certificate': <FaCertificate />,
    'users': <FaUsers />,
    'shield': <FaShieldAlt />,
    'building': <FaBuilding />,
    'graduationcap': <FaGraduationCap />,
    'search': <FaSearch />,
    // Database icon names (case-sensitive)
    'Hospital': <FaHospital />,
    'FlaskConical': <FaFlask />,
    'Heart': <FaHeartbeat />,
    'Certificate': <FaCertificate />,
    'Users': <FaUsers />,
    'ShieldAlt': <FaShieldAlt />,
    'Building2': <FaBuilding />,
    'GraduationCap': <FaGraduationCap />,
    'Search': <FaSearch />,
  };

  // Fallback services yang lebih ringkas
  const fallbackServices = [
    {
      title: "Akreditasi Klinik",
      description: "Layanan akreditasi komprehensif untuk klinik swasta dan pemerintah",
      icon: <FaHospital />,
      features: ["Evaluasi standar pelayanan", "Audit sistem manajemen", "Sertifikasi nasional", "Pendampingan implementasi"]
    },
    {
      title: "Akreditasi Laboratorium", 
      description: "Sertifikasi laboratorium medis sesuai standar ISO 15189",
      icon: <FaFlask />,
      features: ["Audit teknis laboratorium", "Validasi metode pemeriksaan", "Evaluasi sistem mutu", "Sertifikasi ISO 15189"]
    },
    {
      title: "Konsultasi & Pelatihan",
      description: "Bimbingan profesional dan pelatihan untuk persiapan akreditasi",
      icon: <FaCertificate />,
      features: ["Gap analysis", "Perencanaan strategis", "Penyusunan dokumen", "Simulasi audit"]
    }
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiServices = await ApiService.getServices();
        
        if (apiServices && Array.isArray(apiServices) && apiServices.length > 0) {
          // Transform API data to include icons and create features from content
          const transformedServices = apiServices
            .filter(service => service.is_active) // Only show active services
            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)) // Sort by sort_order
            .map(service => ({
              ...service,
              icon: iconMap[service.icon] || <FaCertificate />,
              // Create features from content or use default features
              features: service.features ? 
                (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) :
                [
                  "Evaluasi standar kualitas yang komprehensif",
                  "Audit sistem manajemen profesional", 
                  "Sertifikasi sesuai standar nasional",
                  "Pendampingan implementasi berkelanjutan"
                ]
            }));
          
          setServices(transformedServices);
        } else {
          throw new Error('No services data available');
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        setError(error.message);
        // Use fallback services if API fails
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const benefits = [
    "Meningkatkan kredibilitas dan kepercayaan masyarakat",
    "Memenuhi persyaratan regulasi pemerintah",
    "Meningkatkan kualitas pelayanan kesehatan",
    "Mengurangi risiko medis dan operasional",
    "Meningkatkan efisiensi operasional",
    "Akses ke pasar yang lebih luas"
  ];

  if (loading) {
    return (
      <div className="services-page" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #2563eb',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 1rem'
            }}></div>
            <h2 style={{ color: '#64748b' }}>Memuat Layanan...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="hero-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1rem' }}>
            Layanan Akreditasi Profesional
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Solusi lengkap untuk kebutuhan akreditasi fasilitas kesehatan Anda dengan standar internasional 
            dan tim ahli berpengalaman lebih dari 15 tahun.
          </p>
          
          {error && (
            <div style={{ 
              background: '#fef3cd', 
              color: '#856404', 
              padding: '0.75rem 1rem', 
              borderRadius: '0.375rem',
              margin: '1rem auto',
              maxWidth: '600px',
              border: '1px solid #ffeaa7'
            }}>
              <small>
                <strong>⚠️ Perhatian:</strong> Menggunakan data fallback karena API tidak tersedia. 
                {error && ` Error: ${error}`}
              </small>
            </div>
          )}
        </div>

        <div className="services-grid" style={{ marginBottom: '4rem' }}>
          {services.map((service, index) => (
            <div key={service.id || index} className="service-card" style={{ marginBottom: '2rem' }}>
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p style={{ marginBottom: '1.5rem' }}>{service.description}</p>
              
              {/* Show content excerpt if available from backend */}
              {service.content && (
                <div style={{ 
                  background: '#f8fafc', 
                  padding: '1rem', 
                  borderRadius: '8px', 
                  marginBottom: '1.5rem',
                  fontSize: '0.9rem',
                  color: '#475569',
                  textAlign: 'left'
                }}>
                  <strong>Detail:</strong> {service.content.length > 150 ? 
                    service.content.substring(0, 150) + '...' : 
                    service.content
                  }
                </div>
              )}
              
              <ul style={{ textAlign: 'left', listStyle: 'none', padding: 0 }}>
                {service.features && service.features.map((feature, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', color: '#64748b' }}>
                    <FaCheckCircle style={{ color: '#22c55e', marginRight: '0.5rem', fontSize: '0.9rem' }} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Show price if available and not 0 */}
              {service.price && parseFloat(service.price) > 0 && (
                <div style={{ 
                  marginTop: '1rem', 
                  padding: '0.5rem', 
                  background: '#2563eb', 
                  color: 'white', 
                  borderRadius: '6px',
                  fontSize: '0.9rem',
                  fontWeight: 'bold'
                }}>
                  Mulai dari: Rp {parseFloat(service.price).toLocaleString('id-ID')}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="benefits-section" style={{ background: '#f8fafc', padding: '3rem 2rem', borderRadius: '12px', marginBottom: '4rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#1e293b' }}>
            Manfaat Akreditasi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {benefits.map((benefit, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '1rem' }}>
                <FaClipboardCheck style={{ color: '#2563eb', marginRight: '1rem', fontSize: '1.2rem' }} />
                <span style={{ color: '#374151' }}>{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ marginBottom: '1rem', color: '#1e293b' }}>
            Siap Memulai Proses Akreditasi?
          </h2>
          <p style={{ marginBottom: '2rem', color: '#64748b' }}>
            Hubungi tim ahli kami untuk konsultasi gratis dan dapatkan penawaran terbaik untuk kebutuhan akreditasi Anda.
          </p>
          <a 
            href="/contact" 
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'transform 0.3s ease'
            }}
          >
            Konsultasi Gratis Sekarang
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;