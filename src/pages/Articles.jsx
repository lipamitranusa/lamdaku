import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';
import { mockArticles, mockFeaturedArticles } from '../data/mockArticles';

// Import new components
import FeaturedCarousel from '../components/Articles/FeaturedCarousel';
import ArticleCard from '../components/Articles/ArticleCard';
import SearchAndFilter from '../components/Articles/SearchAndFilter';
import ArticleStats from '../components/Articles/ArticleStats';
import { LoadingState, ErrorState, NoResultsState } from '../components/Articles/ArticleStates';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  const [selectedCategory, setSelectedCategory] = useState('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['semua']);
  const [totalViews, setTotalViews] = useState(0);
  const [articlesThisMonth, setArticlesThisMonth] = useState(0);
  useEffect(() => {
    fetchArticlesData();
  }, []);
  const fetchArticlesData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to fetch from API first
      try {
        // Fetch all articles
        const articlesResponse = await ApiService.getArticles();
        
        if (articlesResponse && articlesResponse.success) {
          const articlesData = articlesResponse.data || [];
          setArticles(articlesData);
          
          // Extract categories dari artikel
          const articleCategories = articlesData
            .map(article => article.category)
            .filter(Boolean);
          const uniqueCategories = [...new Set(articleCategories)];
          setCategories(['semua', ...uniqueCategories]);

          // Calculate stats
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();
          const thisMonthArticles = articlesData.filter(article => {
            const articleDate = new Date(article.created_at || article.published_at);
            return articleDate.getMonth() === currentMonth && articleDate.getFullYear() === currentYear;
          });
          setArticlesThisMonth(thisMonthArticles.length);

          // Calculate total views (if available)
          const totalViewCount = articlesData.reduce((sum, article) => {
            return sum + (parseInt(article.view_count) || 0);
          }, 0);
          setTotalViews(totalViewCount);

          // Fetch featured articles
          try {
            const featuredResponse = await ApiService.getFeaturedArticles();
            if (featuredResponse && featuredResponse.success) {
              setFeaturedArticles(featuredResponse.data || []);
            }
          } catch (featuredError) {
            console.warn('Featured articles not available:', featuredError);
            // Try to get featured from regular articles
            const featuredFromRegular = articlesData.filter(article => article.is_featured || article.featured);
            setFeaturedArticles(featuredFromRegular.slice(0, 3));
          }

          return; // Success, exit function
        }
      } catch (apiError) {
        console.warn('API not available, using mock data:', apiError);
      }

      // Fallback to mock data if API fails
      console.log('Loading mock articles data...');
      setArticles(mockArticles);
      setFeaturedArticles(mockFeaturedArticles);
      
      // Extract categories from mock data
      const mockCategories = [...new Set(mockArticles.map(article => article.category))];
      setCategories(['semua', ...mockCategories]);

      // Calculate stats from mock data
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const thisMonthArticles = mockArticles.filter(article => {
        const articleDate = new Date(article.created_at || article.published_at);
        return articleDate.getMonth() === currentMonth && articleDate.getFullYear() === currentYear;
      });
      setArticlesThisMonth(thisMonthArticles.length);

      // Calculate total views from mock data
      const totalViewCount = mockArticles.reduce((sum, article) => {
        return sum + (parseInt(article.view_count) || 0);
      }, 0);
      setTotalViews(totalViewCount);

    } catch (error) {
      console.error('Error in fetchArticlesData:', error);
      setError(`Failed to load articles: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getAuthorName = (author) => {
    if (typeof author === 'object' && author !== null) {
      return author.name || 'Admin';
    }
    return author || 'Admin';
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('semua');
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'semua' || 
      (article.category && article.category.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });
  if (loading) {
    return (
      <div className="articles-page">
        <div className="container">
          <LoadingState />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="articles-page">
        <div className="container">
          <ErrorState error={error} onRetry={fetchArticlesData} />
        </div>
      </div>
    );
  }
  return (
    <div className="articles-page">
      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '700',
            background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Portal Artikel LAMDAKU
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Temukan wawasan terbaru seputar akreditasi, kesehatan, dan industri terkait. 
            Dapatkan informasi berkualitas dari para ahli di bidangnya.
          </p>
        </div>

        {/* Featured Articles Carousel */}
        {featuredArticles.length > 0 && (
          <FeaturedCarousel articles={featuredArticles} />
        )}

        {/* Search and Filter */}
        <SearchAndFilter
          categories={categories}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          totalArticles={articles.length}
          filteredCount={filteredArticles.length}
        />

        {/* Articles Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '700',
              color: '#1e293b',
              margin: '0'
            }}>
              {selectedCategory === 'semua' ? 'Semua Artikel' : `Artikel ${selectedCategory}`}
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              color: '#0369a1',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid #bae6fd'
            }}>
              {filteredArticles.length} artikel ditemukan
            </div>
          </div>
          
          {filteredArticles.length === 0 ? (
            <NoResultsState 
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              onClearFilters={clearAllFilters}
            />
          ) : (
            <div className="articles-grid">
              {filteredArticles.map((article, index) => (
                <ArticleCard 
                  key={article.id || index} 
                  article={article}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

        {/* Article Statistics */}
        <ArticleStats
          totalArticles={articles.length}
          totalCategories={categories.length - 1} // Exclude 'semua'
          featuredArticles={featuredArticles.length}
          totalViews={totalViews}
          articlesThisMonth={articlesThisMonth}
        />
      </div>
    </div>
  );
};

export default Articles;
