import React, { useState, useEffect } from 'react';
import { FaEye, FaBullseye, FaFlag } from 'react-icons/fa';
import ApiService from '../services/api';

const VisionMission = () => {
  const [visionMissionData, setVisionMissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data sebagai backup
  const fallbackData = {
    vision: "Menjadi lembaga akreditasi kesehatan terdepan dan terpercaya di Asia Tenggara yang berkomitmen meningkatkan kualitas pelayanan kesehatan melalui standar akreditasi internasional yang komprehensif dan berkelanjutan.",
    mission: [
      "Memberikan layanan akreditasi berkualitas tinggi sesuai standar internasional",
      "Meningkatkan kompetensi dan profesionalisme tenaga kesehatan",
      "Mengembangkan sistem manajemen mutu yang berkelanjutan",
      "Memberikan konsultasi dan pendampingan terbaik kepada klien",
      "Melakukan inovasi berkelanjutan dalam metodologi akreditasi",
      "Membangun kemitraan strategis dengan stakeholder kesehatan"
    ],
    objectives: [
      {
        title: "Meningkatkan Kualitas Pelayanan",
        description: "Memastikan setiap fasilitas kesehatan yang kami akreditasi memberikan pelayanan terbaik kepada masyarakat"
      },
      {
        title: "Membangun Kepercayaan Publik", 
        description: "Menciptakan sistem akreditasi yang transparan dan dapat dipertanggungjawabkan kepada masyarakat"
      },
      {
        title: "Mendorong Inovasi",
        description: "Mengembangkan standar dan metodologi akreditasi yang adaptif terhadap perkembangan teknologi kesehatan"
      },
      {
        title: "Memperluas Jangkauan",
        description: "Membuat layanan akreditasi dapat diakses oleh seluruh fasilitas kesehatan di Indonesia"
      }
    ]
  };

  useEffect(() => {
    const fetchVisionMission = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await ApiService.getVisionMissionGoal();
        
        if (data && data.success) {
          // Transform backend data structure
          const transformedData = {
            vision: data.data.vision?.[0]?.content || fallbackData.vision,
            mission: data.data.mission?.map(item => item.content) || fallbackData.mission,
            objectives: data.data.goals?.map(item => ({
              title: item.title,
              description: item.content
            })) || fallbackData.objectives
          };
          
          setVisionMissionData(transformedData);
        } else {
          throw new Error('API response indicates failure');
        }
      } catch (error) {
        console.error('Error fetching vision mission data:', error);
        setError(error.message);
        setVisionMissionData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchVisionMission();
  }, []);

  if (loading) {
    return (
      <section className="vision-mission">
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
            <p style={{ color: '#64748b' }}>Memuat visi, misi, dan tujuan...</p>
          </div>
        </div>
      </section>
    );
  }

  const data = visionMissionData || fallbackData;

  return (
    <section className="vision-mission">
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
        
        <div className="vision-mission-grid">
          
          {/* Visi */}
          <div className="vm-card">
            <div className="vm-icon">
              <FaEye />
            </div>
            <h2>Visi</h2>
            <p>{data.vision}</p>
          </div>
          
          {/* Misi */}
          <div className="vm-card">
            <div className="vm-icon">
              <FaBullseye />
            </div>
            <h2>Misi</h2>
            <ul className="mission-list">
              {data.mission.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          
          {/* Tujuan */}
          <div className="vm-card full-width">
            <div className="vm-icon">
              <FaFlag />
            </div>
            <h2>Tujuan</h2>
            <div className="objectives-grid">
              {data.objectives.map((objective, index) => (
                <div key={index} className="objective-item">
                  <h4>{objective.title}</h4>
                  <p>{objective.description}</p>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
