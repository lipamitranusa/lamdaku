import React from 'react';
import { FaNewspaper, FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export const LoadingState = () => {
  return (
    <div className="articles-loading">
      <div className="loading-spinner" />
      <div className="loading-text">
        <FaNewspaper style={{ marginRight: '0.5rem' }} />
        Memuat artikel terbaru...
      </div>
      <div style={{ 
        fontSize: '0.875rem', 
        color: '#9ca3af',
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: '1.5'
      }}>
        Tunggu sebentar, kami sedang mengambil artikel terbaru untuk Anda
      </div>
    </div>
  );
};

export const ErrorState = ({ error, onRetry }) => {
  return (
    <div className="articles-error">
      <div style={{ 
        fontSize: '3rem', 
        marginBottom: '1rem',
        color: '#dc2626'
      }}>
        <FaExclamationTriangle />
      </div>
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600',
        marginBottom: '0.75rem',
        color: '#991b1b'
      }}>
        Oops! Terjadi Kesalahan
      </h3>
      <p style={{ 
        marginBottom: '1.5rem',
        lineHeight: '1.6',
        color: '#dc2626'
      }}>
        <strong>Error:</strong> {error}
      </p>
      <div style={{
        background: 'rgba(220, 38, 38, 0.1)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        fontSize: '0.875rem',
        color: '#7f1d1d',
        lineHeight: '1.5'
      }}>
        <strong>Kemungkinan penyebab:</strong>
        <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
          <li>Koneksi internet tidak stabil</li>
          <li>Server backend tidak dapat diakses</li>
          <li>Terjadi masalah pada database</li>
        </ul>
      </div>
      <button 
        onClick={onRetry}
        className="error-retry-btn"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          margin: '0 auto'
        }}
      >
        <FaRedo />
        Coba Lagi
      </button>
    </div>
  );
};

export const NoResultsState = ({ searchQuery, selectedCategory, onClearFilters }) => {
  const hasFilters = searchQuery || selectedCategory !== 'semua';

  return (
    <div className="no-results">
      <div style={{ 
        fontSize: '4rem', 
        marginBottom: '1.5rem',
        color: '#9ca3af'
      }}>
        📰
      </div>
      
      <h3 style={{ 
        fontSize: '1.5rem', 
        fontWeight: '600',
        marginBottom: '1rem',
        color: '#374151'
      }}>
        {hasFilters ? 'Tidak Ada Hasil Ditemukan' : 'Belum Ada Artikel'}
      </h3>
      
      <p style={{ 
        marginBottom: '1.5rem',
        color: '#64748b',
        lineHeight: '1.6',
        maxWidth: '500px',
        margin: '0 auto 1.5rem auto'
      }}>
        {hasFilters ? (
          <>
            Tidak ada artikel yang cocok dengan pencarian 
            {searchQuery && <strong> "{searchQuery}"</strong>}
            {selectedCategory !== 'semua' && <strong> di kategori "{selectedCategory}"</strong>}.
            Coba ubah kata kunci atau filter yang Anda gunakan.
          </>
        ) : (
          'Saat ini belum ada artikel yang tersedia. Silakan kembali lagi nanti untuk membaca artikel terbaru.'
        )}
      </p>

      {hasFilters && (
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onClearFilters}
            style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '25px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            🔍 Lihat Semua Artikel
          </button>
        </div>
      )}

      {!hasFilters && (
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          padding: '1.5rem',
          borderRadius: '12px',
          marginTop: '2rem',
          maxWidth: '400px',
          margin: '2rem auto 0 auto'
        }}>
          <h4 style={{ 
            color: '#0369a1', 
            marginBottom: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            💡 Saran untuk Anda
          </h4>
          <ul style={{ 
            color: '#0369a1', 
            fontSize: '0.875rem',
            lineHeight: '1.6',
            paddingLeft: '1.25rem'
          }}>
            <li>Bookmark halaman ini untuk mendapatkan update artikel terbaru</li>
            <li>Kunjungi halaman lain untuk informasi menarik lainnya</li>
            <li>Hubungi kami jika Anda memiliki saran topik artikel</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default { LoadingState, ErrorState, NoResultsState };
