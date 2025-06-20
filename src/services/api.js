// API Service untuk LAMDAKU CMS Backend
import config from '../config/environment';

// Production-ready API URL configuration
const getApiBaseUrl = () => {
  // Production environment - use config
  if (process.env.NODE_ENV === 'production') {
    return config.API_BASE_URL;
  }
  
  // Development - dynamic detection for network access
  const currentHost = window.location.hostname;
  
  // If accessing via network IP, use the same IP for API
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return `http://${currentHost}:8000/api/v1`;
  }
  
  // Default to localhost for local development
  return 'http://127.0.0.1:8000/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

class ApiService {  
  constructor() {
    console.log(`API Base URL: ${API_BASE_URL}`);
  }

  // Generic fetch method with error handling
  async fetch(endpoint, options = {}) {    
    try {
      // Add cache-busting parameter to prevent caching
      const url = `${API_BASE_URL}${endpoint}${endpoint.includes('?') ? '&' : '?'}_t=${Date.now()}`;
      
      console.log(`Making API request to: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          ...options.headers,
        },
        cache: 'no-store',
        timeout: 10000, // 10 second timeout
        ...options,
      });

      console.log(`API Response status: ${response.status} for ${url}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`API Response data:`, data);
      return data;
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error.message);
      
      // Provide more specific error information
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error(`Network error: Cannot connect to API server at ${API_BASE_URL}. Please check if the backend server is running and accessible.`);
      }
      
      throw error;
    }
  }

  // Services API
  async getServices() {
    return this.fetch('/services');
  }

  async getService(id) {
    return this.fetch(`/services/${id}`);
  }

  async createService(serviceData) {
    return this.fetch('/services', {
      method: 'POST',
      body: JSON.stringify(serviceData),
    });
  }

  async updateService(id, serviceData) {
    return this.fetch(`/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(serviceData),
    });
  }

  async deleteService(id) {
    return this.fetch(`/services/${id}`, {
      method: 'DELETE',
    });
  }

  // Timeline API
  async getTimelines() {
    return this.fetch('/timelines');
  }

  async getTimeline(id) {
    return this.fetch(`/timelines/${id}`);
  }

  async createTimeline(timelineData) {
    return this.fetch('/timelines', {
      method: 'POST',
      body: JSON.stringify(timelineData),
    });
  }

  async updateTimeline(id, timelineData) {
    return this.fetch(`/timelines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(timelineData),
    });
  }

  async deleteTimeline(id) {
    return this.fetch(`/timelines/${id}`, {
      method: 'DELETE',
    });
  }

  // Pages API
  async getPages() {
    return this.fetch('/pages');
  }

  async getPage(id) {
    return this.fetch(`/pages/${id}`);
  }

  async createPage(pageData) {
    return this.fetch('/pages', {
      method: 'POST',
      body: JSON.stringify(pageData),
    });
  }

  async updatePage(id, pageData) {
    return this.fetch(`/pages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pageData),
    });
  }

  async deletePage(id) {
    return this.fetch(`/pages/${id}`, {
      method: 'DELETE',
    });
  }

  // Contact API
  async getContacts() {
    return this.fetch('/contacts');
  }

  async getContact(id) {
    return this.fetch(`/contacts/${id}`);
  }

  async submitContact(contactData) {
    return this.fetch('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  }

  async updateContact(id, contactData) {
    return this.fetch(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
  }

  async deleteContact(id) {
    return this.fetch(`/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  async markContactAsRead(id) {
    return this.fetch(`/contacts/${id}/mark-as-read`, {
      method: 'PATCH',
    });
  }

  // Company Info API
  async getCompanyInfo() {
    return this.fetch('/company-info');
  }

  async getCompanyContact() {
    return this.fetch('/company-info/contact');
  }
  async getCompanyLogo() {
    return this.fetch('/company-info/logo');
  }
  // Vision Mission Goal API
  async getVisionMissionGoal() {
    return this.fetch('/vision-mission-goal');
  }
  // Articles API
  async getArticles() {
    return this.fetch('/articles');
  }

  async getFeaturedArticles() {
    return this.fetch('/articles/featured');
  }

  async getLatestArticles(limit = 10) {
    return this.fetch(`/articles/latest?limit=${limit}`);
  }

  async getPopularArticles(limit = 10) {
    return this.fetch(`/articles/popular?limit=${limit}`);
  }

  async getArticle(id) {
    return this.fetch(`/articles/${id}`);
  }

  async getArticleBySlug(slug) {
    return this.fetch(`/articles/slug/${slug}`);
  }

  async createArticle(articleData) {
    return this.fetch('/articles', {
      method: 'POST',
      body: JSON.stringify(articleData),
    });
  }

  async updateArticle(id, articleData) {
    return this.fetch(`/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify(articleData),
    });
  }

  async deleteArticle(id) {
    return this.fetch(`/articles/${id}`, {
      method: 'DELETE',
    });
  }
  async getArticlesByCategory(category) {
    return this.fetch(`/articles?category=${category}`);
  }

  // Organizational Structure API
  async getOrganizationalStructure() {
    return this.fetch('/organizational-structure');
  }
}

// Export singleton instance
export default new ApiService();
