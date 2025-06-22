const axios = require('axios');

// Test multiple possible backend URLs
const backendUrls = [
  'http://localhost:8000/api',
  'http://localhost:8080/api', 
  'http://127.0.0.1:8000/api',
  'http://127.0.0.1:8080/api'
];

async function testArticleEndpoints() {
  console.log('🔍 Testing Backend Article Endpoints...\n');

  for (const baseUrl of backendUrls) {
    console.log(`📡 Testing: ${baseUrl}`);
    
    try {
      // Test artikel endpoints
      const endpoints = [
        '/articles',
        '/artikel', 
        '/posts',
        '/news',
        '/content'
      ];

      for (const endpoint of endpoints) {
        try {
          const response = await axios.get(`${baseUrl}${endpoint}`, {
            timeout: 5000,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });

          if (response.status === 200) {
            console.log(`✅ SUCCESS: ${baseUrl}${endpoint}`);
            console.log(`📊 Status: ${response.status}`);
            
            if (response.data) {
              console.log(`📄 Response Type: ${typeof response.data}`);
              
              // Check if it's an array or object with data
              if (Array.isArray(response.data)) {
                console.log(`📰 Articles Found: ${response.data.length}`);
                
                // Show first few articles
                response.data.slice(0, 3).forEach((article, index) => {
                  console.log(`\n📖 Article ${index + 1}:`);
                  console.log(`   ID: ${article.id || 'N/A'}`);
                  console.log(`   Title: ${article.title || article.judul || 'N/A'}`);
                  console.log(`   Slug: ${article.slug || 'N/A'}`);
                  console.log(`   Author: ${article.author || article.penulis || 'N/A'}`);
                  console.log(`   Created: ${article.created_at || article.tanggal || 'N/A'}`);
                });
              } else if (response.data.data && Array.isArray(response.data.data)) {
                console.log(`📰 Articles Found: ${response.data.data.length}`);
                
                // Show first few articles
                response.data.data.slice(0, 3).forEach((article, index) => {
                  console.log(`\n📖 Article ${index + 1}:`);
                  console.log(`   ID: ${article.id || 'N/A'}`);
                  console.log(`   Title: ${article.title || article.judul || 'N/A'}`);
                  console.log(`   Slug: ${article.slug || 'N/A'}`);
                  console.log(`   Author: ${article.author || article.penulis || 'N/A'}`);
                  console.log(`   Created: ${article.created_at || article.tanggal || 'N/A'}`);
                });
              } else {
                console.log(`📄 Response Structure:`);
                console.log(JSON.stringify(response.data, null, 2).substring(0, 500) + '...');
              }
            }
            
            console.log(`\n${'='.repeat(50)}\n`);
            return; // Found working endpoint, stop searching
          }
        } catch (endpointError) {
          console.log(`❌ ${endpoint}: ${endpointError.message}`);
        }
      }
    } catch (error) {
      console.log(`❌ ${baseUrl}: ${error.message}\n`);
    }
  }
}

// Run the test
testArticleEndpoints().catch(console.error);
