import React, { createContext, useContext, useState, useEffect } from 'react';
import ApiService from '../services/api';
import config from '../config/environment';

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState({
    name: 'LAMDAKU',
    logo: '1749712652_LOGO_LAMDAKU.png', // Set known logo immediately
    description: 'Lembaga akreditasi terpercaya untuk fasilitas kesehatan di Indonesia. Berpengalaman lebih dari 15 tahun dalam memberikan layanan sertifikasi berkualitas tinggi.',
    phone: '+62 21 1234 5678',
    email: 'info@lamdaku.co.id',
    address: 'Jakarta Pusat, Indonesia'
  });
  const [logoLoaded, setLogoLoaded] = useState(true); // Start with true to show immediately
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadCompanyInfo = async () => {
      try {
        // Immediately set known logo for LAMDAKU
        setCompanyInfo(prev => ({
          ...prev,
          logo: '1749712652_LOGO_LAMDAKU.png'
        }));
        
        // Aggressively preload the known logo immediately
        aggressivePreloadLogo('1749712652_LOGO_LAMDAKU.png');
        
        // Check cache
        const cachedData = localStorage.getItem('companyInfo');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setCompanyInfo(parsedData);
          
          if (parsedData.logo && localStorage.getItem('companyLogo') === 'loaded') {
            setLogoLoaded(true);
          }
        }

        // Fetch fresh data in background
        const response = await ApiService.getCompanyInfo();
        
        if (response?.success && response?.data) {
          const newData = {
            name: response.data.company_name || response.data.name || 'LAMDAKU',
            logo: response.data.logo || '1749712652_LOGO_LAMDAKU.png',
            description: response.data.description || companyInfo.description,
            phone: response.data.phone || companyInfo.phone,
            email: response.data.email || companyInfo.email,
            address: response.data.address || companyInfo.address
          };
          
          setCompanyInfo(newData);
          localStorage.setItem('companyInfo', JSON.stringify(newData));
        }
      } catch (error) {
        console.error('Error loading company info:', error);
        // Even on error, ensure we have the logo
        setCompanyInfo(prev => ({
          ...prev,
          logo: '1749712652_LOGO_LAMDAKU.png'
        }));
        aggressivePreloadLogo('1749712652_LOGO_LAMDAKU.png');
      } finally {
        setLoading(false);
      }
    };

    loadCompanyInfo();
  }, []);
  const aggressivePreloadLogo = (logoFilename) => {
    const logoUrl = getLogoUrl(logoFilename);
    
    // Multiple fast preloading strategies
    const img = new Image();
    img.onload = () => {
      setLogoLoaded(true);
      localStorage.setItem('companyLogo', 'loaded');
    };
    img.src = logoUrl;
    
    // Also create fetch for browser cache
    fetch(logoUrl, { mode: 'no-cors' }).catch(() => {});
  };

  const getLogoUrl = (logoFilename) => {
    if (!logoFilename) return null;
    
    // Production environment - use API domain
    if (process.env.NODE_ENV === 'production') {
      return `${config.API_BASE_URL.replace('/api/v1', '')}/storage/logos/${logoFilename}`;
    }
    
    // Development - dynamic detection for network access
    const currentHost = window.location.hostname;
    
    if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
      return `http://${currentHost}:8000/storage/logos/${logoFilename}`;
    }
    
    return `http://localhost:8000/storage/logos/${logoFilename}`;
  };
  const value = {
    companyInfo,
    logoLoaded,
    loading,
    logoUrl: getLogoUrl(companyInfo.logo)
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};
