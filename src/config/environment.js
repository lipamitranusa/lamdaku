// Environment configuration for different deployment stages
const config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:8000/api/v1',
    APP_URL: 'http://localhost:3000',
    ENVIRONMENT: 'development'
  },
  staging: {
    API_BASE_URL: 'https://staging-api.lamdaku.com/api/v1',
    APP_URL: 'https://staging.lamdaku.com',
    ENVIRONMENT: 'staging'
  },  production: {
    API_BASE_URL: 'https://api.lamdaku.com/api/v1',
    APP_URL: 'https://lamdaku.com',
    ENVIRONMENT: 'production'
  }
};

const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return config[env] || config.development;
};

export default getConfig();
