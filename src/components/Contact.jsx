import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import ApiService from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Konsultasi Akreditasi',
    message: ''
  });

  const [companyInfo, setCompanyInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data = await ApiService.getCompanyContact();
        if (data && data.success) {
          setCompanyInfo(data.data);
        }
      } catch (error) {
        console.error('Error fetching company info:', error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (!formData.email.trim()) newErrors.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Format email tidak valid';
    if (!formData.message.trim()) newErrors.message = 'Pesan wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const showNotificationMessage = (type, message) => {
    setSubmitStatus(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await ApiService.submitContact(formData);
      showNotificationMessage('success', 'Terima kasih! Pesan Anda telah dikirim. Tim kami akan menghubungi Anda segera.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Konsultasi Akreditasi',
        message: ''
      });
    } catch (error) {
      showNotificationMessage('error', 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="container">
        {/* Notification */}
        {showNotification && (
          <div className={`notification ${submitStatus}`}>
            <div className="notification-content">
              {submitStatus === 'success' ? (
                <FaCheckCircle className="notification-icon" />
              ) : (
                <FaExclamationTriangle className="notification-icon" />
              )}
              <div className="notification-text">
                {submitStatus === 'success' 
                  ? 'Terima kasih! Pesan Anda telah dikirim. Tim kami akan menghubungi Anda segera.'
                  : 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'
                }
              </div>
              <button 
                className="notification-close"
                onClick={() => setShowNotification(false)}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <h2>Hubungi Kami</h2>
        <p className="contact-subtitle">
          Siap membantu Anda mencapai standar akreditasi terbaik. Konsultasi gratis untuk kebutuhan akreditasi fasilitas kesehatan Anda.
        </p>
        
        <div className="contact-content">
          <div className="contact-info">
            <h3>Informasi Kontak</h3>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h4>Telepon</h4>
                <div className="contact-values">
                  <p>{companyInfo?.phone || '(031) 555-7890'}</p>
                  <p>{companyInfo?.mobile || '0812 3456 7890'}</p>
                </div>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <div className="contact-values">
                  <p>{companyInfo?.email || 'info@lamdaku.co.id'}</p>
                </div>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="contact-details">
                <h4>Alamat</h4>
                <div className="contact-values">
                  <p>{companyInfo?.address || 'Jl. Raya Darmo No. 88, Surabaya, Jawa Timur, 60241 Indonesia'}</p>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="map-container">
              <h4>Lokasi Kami</h4>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.3729942892473!2d112.73879861430762!3d-7.294394973935869!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sJl.%20Raya%20Darmo%2C%20Wonokromo%2C%20Surabaya%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1638350000000!5m2!1sen!2sid"
                  width="100%"
                  height="250"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi LAMDAKU"
                />
              </div>
              <div className="map-actions">
                <a 
                  href="https://maps.google.com/?q= Jl. Simpang Dukuh 38-40, Kota Surabaya, Jawa Timur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  <FaMapMarkerAlt />
                  Buka di Google Maps
                </a>
              </div>
            </div>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama Lengkap *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Masukkan nama lengkap Anda"
                required
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="contoh@email.com"
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Nomor Telepon</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xx xxxx xxxx"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Nama Institusi/Fasilitas</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Nama Puskesmas, klinik, atau laboratorium"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subjek *</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="Konsultasi Akreditasi">Konsultasi Akreditasi</option>
                <option value="Akreditasi Klinik">Akreditasi Klinik</option>
                <option value="Akreditasi Laboratorium">Akreditasi Laboratorium</option>
                <option value="Akreditasi Puskesmas">Akreditasi Puskesmas</option>
                <option value="Pelatihan">Pelatihan</option>
                <option value="Audit Internal">Audit Internal</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Pesan *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Ceritakan tentang kebutuhan akreditasi Anda..."
                required
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              <FaPaperPlane />
              {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;