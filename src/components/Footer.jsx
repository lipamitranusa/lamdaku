import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useCompany } from '../contexts/CompanyContext';

const Footer = () => {
  const { companyInfo, logoLoaded, logoUrl } = useCompany();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="logo">
              {logoUrl && logoLoaded ? (
                <img 
                  src={logoUrl} 
                  alt={`${companyInfo.name} Logo`}
                  className="company-logo-footer"
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'contain',
                    marginRight: '8px'
                  }}
                />
              ) : (
                <FaShieldAlt style={{ marginRight: '8px', fontSize: '64px' }} />
              )}
              <span>{companyInfo.name}</span>
            </div>
            <p>
              {companyInfo.description}
            </p>
          </div>
          
          <div className="footer-section">
            <h3>Layanan</h3>
            <ul>
              <li><Link to="/services">Akreditasi Klinik</Link></li>
              <li><Link to="/services">Akreditasi Laboratorium</Link></li>
              <li><Link to="/services">Akreditasi Puskesmas</Link></li>
              <li><Link to="/services">Konsultasi Sertifikasi</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Tautan Cepat</h3>
            <ul>
              <li><Link to="/">Beranda</Link></li>
              <li><Link to="/services">Layanan</Link></li>
              <li><Link to="/profile">Profil</Link></li>
              <li><Link to="/contact">Kontak</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Kontak</h3>
            <div className="contact-info">
              <p><FaPhone /> {companyInfo.phone}</p>
              <p><FaEnvelope /> {companyInfo.email}</p>
              <p><FaMapMarkerAlt /> {companyInfo.address}</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {companyInfo.name}. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;