import React, { useState } from 'react';
import CompanyHistory from '../components/CompanyHistory';
import VisionMission from '../components/VisionMission';
import OrganizationalStructure from '../components/OrganizationalStructure';
import { FaHistory, FaEye, FaUsers } from 'react-icons/fa';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('history');

  const tabs = [
    {
      id: 'history',
      label: 'Sejarah Perusahaan',
      icon: <FaHistory />
    },
    {
      id: 'vision-mission',
      label: 'Visi Misi & Tujuan',
      icon: <FaEye />
    },
    {
      id: 'organization',
      label: 'Struktur Organisasi',
      icon: <FaUsers />
    }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'history':
        return <CompanyHistory />;
      case 'vision-mission':
        return <VisionMission />;
      case 'organization':
        return <OrganizationalStructure />;
      default:
        return <CompanyHistory />;
    }
  };

  return (
    <div className="profile-page" style={{ paddingTop: '2rem' }}>
      <div className="container">
        {/* Page Header */}
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>          <h1 style={{ fontSize: '2.5rem', color: '#1e293b', marginBottom: '1rem' }}>
            Profil LAMDAKU
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Mengenal lebih dekat perjalanan, visi misi, dan struktur organisasi LAMDAKU 
            sebagai lembaga akreditasi terpercaya di Indonesia.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation" style={{ marginBottom: '3rem' }}>
          <div className="tab-buttons" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem',
            borderBottom: '2px solid #e2e8f0',
            flexWrap: 'wrap'
          }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  border: 'none',
                  background: activeTab === tab.id ? '#2563eb' : 'transparent',
                  color: activeTab === tab.id ? 'white' : '#64748b',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                  marginBottom: '-2px'
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
