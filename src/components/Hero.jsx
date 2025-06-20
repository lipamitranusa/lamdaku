import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCertificate } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>
            Lembaga Akreditasi Terpercaya untuk
            <span className="text-primary"> Fasilitas Kesehatan</span>
          </h1>
          <p className="subtitle">
            Kami adalah lembaga akreditasi profesional yang memberikan sertifikasi berkualitas tinggi 
            untuk klinik, laboratorium, dan puskesmas di seluruh Indonesia. Meningkatkan standar 
            pelayanan kesehatan dengan akreditasi yang komprehensif dan terpercaya.
          </p>
          <Link to="/contact" className="cta-button">
            Konsultasi Gratis
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;