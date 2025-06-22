const axios = require('axios');

// Test the actual API routes dari file routes
async function testActualRoutes() {
  console.log('🔍 Testing Actual API Routes from routes/api.php...\n');

  const baseUrl = 'http://localhost:8000/api';
  
  // Routes yang ada di file api.php
  const routes = [
    '/v1/pages',
    '/v1/services', 
    '/v1/timelines',
    '/v1/contacts',
    '/v1/company-info',
    '/v1/company-info/contact',
    '/v1/company-info/logo'
  ];

  for (const route of routes) {
    try {
      console.log(`📡 Testing: ${baseUrl}${route}`);
      
      const response = await axios.get(`${baseUrl}${route}`, {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ SUCCESS: ${route}`);
      console.log(`📊 Status: ${response.status}`);
      
      if (response.data) {
        // Check if it's pages (might contain articles)
        if (route.includes('pages')) {
          console.log(`📄 Pages Response:`, JSON.stringify(response.data, null, 2));
        } else {
          console.log(`📄 Response Type: ${typeof response.data}`);
          console.log(`📄 Sample Response:`, JSON.stringify(response.data, null, 2).substring(0, 300) + '...');
        }
      }
      
      console.log(`${'='.repeat(50)}\n`);
      
    } catch (error) {
      if (error.response) {
        console.log(`❌ ${route}: HTTP ${error.response.status} - ${error.response.statusText}`);
        
        // Show error details if it's a server error
        if (error.response.status >= 500) {
          console.log(`   Error: ${error.response.data?.message || 'Internal Server Error'}`);
        }
      } else {
        console.log(`❌ ${route}: ${error.message}`);
      }
      console.log('');
    }
  }
}

// Run the test
testActualRoutes().catch(console.error);
