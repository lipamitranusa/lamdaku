import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';

const SearchAndFilter = ({ 
  categories = [], 
  selectedCategory, 
  searchQuery, 
  onCategoryChange, 
  onSearchChange,
  totalArticles = 0,
  filteredCount = 0
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, onSearchChange]);

  const clearSearch = () => {
    setLocalSearch('');
    onSearchChange('');
  };

  const clearFilters = () => {
    setLocalSearch('');
    onSearchChange('');
    onCategoryChange('semua');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'semua';

  return (
    <div className="search-filter-section">
      {/* Search Results Summary */}
      <div style={{ 
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600',
            color: '#1e293b',
            margin: '0'
          }}>
            Pencarian & Filter
          </h3>
          <div style={{
            background: filteredCount !== totalArticles ? '#dbeafe' : '#f0fdf4',
            color: filteredCount !== totalArticles ? '#1e40af' : '#166534',
            padding: '0.375rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            {filteredCount} dari {totalArticles} artikel
          </div>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            style={{
              background: '#ef4444',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#dc2626';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#ef4444';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <FaTimes style={{ fontSize: '0.75rem' }} />
            Hapus Filter
          </button>
        )}
      </div>

      {/* Search Box */}
      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Cari artikel berdasarkan judul atau konten..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.875rem 1rem 0.875rem 3rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            background: 'white'
          }}
        />
        {localSearch && (
          <button
            onClick={clearSearch}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#ef4444'}
            onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Category Filter Toggle for Mobile */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: '1rem'
      }}>
        <span style={{ 
          color: '#374151', 
          fontWeight: '500',
          fontSize: '0.875rem'
        }}>
          Filter Kategori
        </span>
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          style={{
            background: 'none',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#374151'
          }}
          className="filter-toggle-mobile"
        >
          <FaFilter />
          {isFilterExpanded ? 'Sembunyikan' : 'Tampilkan'}
        </button>
      </div>

      {/* Category Filters */}
      <div 
        className="category-filters"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          maxHeight: isFilterExpanded ? 'none' : '100px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            style={{
              padding: '0.625rem 1.25rem',
              border: selectedCategory === category ? '2px solid #2563eb' : '2px solid #e5e7eb',
              background: selectedCategory === category 
                ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)'
                : 'white',
              color: selectedCategory === category ? 'white' : '#6b7280',
              borderRadius: '25px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textTransform: 'capitalize',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {category}
            {selectedCategory === category && (
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'rgba(255, 255, 255, 0.1)',
                animation: 'shimmer 1.5s ease-in-out infinite'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          borderRadius: '8px',
          border: '1px solid #bae6fd'
        }}>
          <div style={{ 
            fontSize: '0.875rem', 
            color: '#0369a1',
            fontWeight: '500',
            marginBottom: '0.5rem'
          }}>
            Filter Aktif:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {searchQuery && (
              <span style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                Pencarian: "{searchQuery}"
              </span>
            )}
            {selectedCategory !== 'semua' && (
              <span style={{
                background: '#0ea5e9',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '15px',
                fontSize: '0.75rem',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}>
                Kategori: {selectedCategory}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Custom CSS for mobile responsive */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @media (max-width: 768px) {
          .filter-toggle-mobile {
            display: flex !important;
          }
          
          .category-filters {
            display: ${isFilterExpanded ? 'flex' : 'none'} !important;
          }
        }

        @media (min-width: 769px) {
          .category-filters {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchAndFilter;
