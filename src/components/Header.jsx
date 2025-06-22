import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useCompany } from '../contexts/CompanyContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { companyInfo, logoLoaded, logoUrl } = useCompany();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="logo">
          {logoUrl && logoLoaded ? (
            <img 
              src={logoUrl} 
              alt={`${companyInfo.name} Logo`}
              className="company-logo-header"
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
          {companyInfo.name}
        </Link>
          <ul className={`nav-links ${isMenuOpen ? 'nav-open' : ''}`}>
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Beranda</Link></li>
          <li><Link to="/services" onClick={() => setIsMenuOpen(false)}>Layanan</Link></li>
          <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profil</Link></li>
          <li><Link to="/articles" onClick={() => setIsMenuOpen(false)}>Artikel</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Kontak</Link></li>
        </ul>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>
    </header>
  );
};

export default Header;