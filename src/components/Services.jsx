import React, { useState, useEffect } from 'react';
import { FaHospital, FaFlask, FaHeartbeat, FaCertificate, FaUsers, FaShieldAlt, FaBuilding, FaGraduationCap, FaSearch } from 'react-icons/fa';
import ApiService from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Icon mapping untuk services
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
    'Building2': <FaBuilding />,
    'Users': <FaUsers />,
    'GraduationCap': <FaGraduationCap />,
    'Search': <FaSearch />,
  };

  // Fallback services jika API tidak tersedia
  const fallbackServices = [
    {
      icon: <FaHospital />,
      title: "Akreditasi Klinik",
      description: "Layanan akreditasi komprehensif untuk klinik swasta dan pemerintah. Memastikan standar pelayanan kesehatan yang optimal dan keselamatan pasien."
    },
    {
      icon: <FaFlask />,
      title: "Akreditasi Laboratorium",
      description: "Sertifikasi laboratorium medis sesuai standar ISO 15189. Memastikan akurasi hasil pemeriksaan dan kualitas layanan laboratorium."
    },
    {
      icon: <FaHeartbeat />,
      title: "Akreditasi Puskesmas",
      description: "Program akreditasi khusus untuk pusat kesehatan masyarakat. Meningkatkan kualitas pelayanan kesehatan primer di tingkat komunitas."
    },
    {
      icon: <FaCertificate />,
      title: "Konsultasi Sertifikasi",
      description: "Bimbingan dan konsultasi profesional untuk persiapan akreditasi. Tim ahli kami siap membantu mencapai standar yang diinginkan."
    },
    {
      icon: <FaUsers />,
      title: "Pelatihan Tim",
      description: "Program pelatihan komprehensif untuk staf dan manajemen. Membekali tim dengan pengetahuan dan keterampilan yang diperlukan."
    },
    {
      icon: <FaShieldAlt />,
      title: "Audit & Monitoring",
      description: "Layanan audit berkelanjutan dan monitoring compliance. Memastikan standar akreditasi tetap terjaga dalam jangka panjang."
    }
  ];

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiServices = await ApiService.getServices();
      // Transform API data to include icons
      const transformedServices = apiServices.map(service => ({
        ...service,
        icon: iconMap[service.icon] || <FaCertificate />
      }));
      setServices(transformedServices);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      setError(error.message);
      // Use fallback services if API fails
      setServices(fallbackServices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="services">
        <div className="container">
          <h2>Layanan Kami</h2>
          <p className="services-subtitle">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Layanan Kami</h2>
        <p className="services-subtitle">
          Kami menyediakan layanan akreditasi terlengkap untuk berbagai jenis fasilitas kesehatan 
          dengan standar internasional dan tim ahli berpengalaman.
        </p>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;