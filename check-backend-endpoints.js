const axios = require('axios');

// Test backend endpoints yang sudah ada
const baseUrl = 'http://localhost:8000/api';

async function checkExistingEndpoints() {
  console.log('🔍 Checking Existing Backend Endpoints...\n');

  const endpoints = [
    '/company-info',
    '/vision-mission', 
    '/organizational-structure',
    '/services',
    '/contact',
    '/articles',
    '/posts',
    '/news',
    ''  // Base API endpoint
  ];

  for (const endpoint of endpoints) {
    try {
      const url = `${baseUrl}${endpoint}`;
      console.log(`📡 Testing: ${url}`);
      
      const response = await axios.get(url, {
        timeout: 5000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      console.log(`✅ SUCCESS: ${endpoint || 'base'}`);
      console.log(`📊 Status: ${response.status}`);
      
      if (response.data) {
        console.log(`📄 Response Keys:`, Object.keys(response.data));
        
        // If it's an object with data array
        if (response.data.data && Array.isArray(response.data.data)) {
          console.log(`📰 Items Found: ${response.data.data.length}`);
          
          // Show sample item
          if (response.data.data.length > 0) {
            const sample = response.data.data[0];
            console.log(`📖 Sample Item Keys:`, Object.keys(sample));
            
            // Check if it looks like articles
            if (sample.title || sample.judul || sample.content || sample.konten) {
              console.log(`🎯 This might be ARTICLES data!`);
              console.log(`   Title: ${sample.title || sample.judul || 'N/A'}`);
              console.log(`   Content preview: ${(sample.content || sample.konten || '').substring(0, 100)}...`);
            }
          }
        }
        
        // If it's a direct array
        if (Array.isArray(response.data)) {
          console.log(`📰 Items Found: ${response.data.length}`);
          
          if (response.data.length > 0) {
            const sample = response.data[0];
            console.log(`📖 Sample Item Keys:`, Object.keys(sample));
          }
        }
      }
      
      console.log(`${'='.repeat(50)}\n`);
      
    } catch (error) {
      console.log(`❌ ${endpoint || 'base'}: ${error.response?.status || error.message}`);
    }
  }
}

// Also check what routes are available
async function checkAvailableRoutes() {
  console.log('\n🛣️  Checking Available Routes...\n');
  
  try {
    // Try to get route list (common Laravel debug endpoints)
    const debugEndpoints = [
      '/routes',
      '/debug/routes', 
      '/api-docs',
      '/'
    ];
    
    for (const endpoint of debugEndpoints) {
      try {
        const response = await axios.get(`http://localhost:8000${endpoint}`, {
          timeout: 3000
        });
        
        if (response.status === 200) {
          console.log(`✅ Found: http://localhost:8000${endpoint}`);
          
          if (typeof response.data === 'string' && response.data.includes('route')) {
            console.log('📋 This might contain route information');
          }
        }
      } catch (error) {
        // Ignore errors for debug endpoints
      }
    }
  } catch (error) {
    console.log('No debug routes found');
  }
}

// Run both tests
async function runTests() {
  await checkExistingEndpoints();
  await checkAvailableRoutes();
}

runTests().catch(console.error);
