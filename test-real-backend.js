const axios = require('axios');

async function testRealBackend() {
  console.log('🔍 Testing Real Backend: D:\\laragon\\www\\LAMDAKU\\lamdaku-cms-backend\n');

  // Test different ports for the real backend
  const ports = [8000, 8080, 80, 8001];
  
  for (const port of ports) {
    const baseUrl = `http://localhost:${port}/api/v1`;
    
    console.log(`📡 Testing backend on port ${port}...`);
    
    try {
      // Test articles endpoint (the correct one from routes)
      const articlesResponse = await axios.get(`${baseUrl}/articles`, { timeout: 3000 });
      
      if (articlesResponse.status === 200) {
        console.log(`✅ FOUND REAL BACKEND on port ${port}!`);
        console.log(`📰 Articles found: ${articlesResponse.data?.length || 'Unknown count'}`);
        
        if (Array.isArray(articlesResponse.data)) {
          console.log(`   Total articles: ${articlesResponse.data.length}`);
          
          if (articlesResponse.data.length > 0) {
            console.log(`\n📖 Sample Articles:`);
            articlesResponse.data.slice(0, 3).forEach((article, index) => {
              console.log(`   ${index + 1}. ${article.title || 'No title'}`);
              console.log(`      ID: ${article.id}`);
              console.log(`      Slug: ${article.slug || 'No slug'}`);
              console.log(`      Author: ${article.author || 'No author'}`);
              console.log(`      Created: ${article.created_at || 'No date'}`);
              console.log('');
            });
          } else {
            console.log(`   ❗ No articles found in database`);
          }
        } else if (articlesResponse.data && typeof articlesResponse.data === 'object') {
          console.log(`   Response format: Object with keys: ${Object.keys(articlesResponse.data)}`);
          
          if (articlesResponse.data.data && Array.isArray(articlesResponse.data.data)) {
            console.log(`   Articles in data array: ${articlesResponse.data.data.length}`);
          }
        }
        
        // Test other endpoints
        console.log(`\n🔗 Testing other endpoints on port ${port}:`);
        const endpoints = ['/company-info', '/services', '/organizational-structure'];
        
        for (const endpoint of endpoints) {
          try {
            const response = await axios.get(`${baseUrl}${endpoint}`, { timeout: 2000 });
            console.log(`   ✅ ${endpoint}: Working`);
          } catch (error) {
            console.log(`   ❌ ${endpoint}: ${error.response?.status || error.code}`);
          }
        }
        
        return port; // Found working backend
      }
    } catch (error) {
      console.log(`   ❌ Port ${port}: ${error.code || error.response?.status || error.message}`);
    }
    
    console.log('');
  }
  
  console.log('❌ Real backend not found on any port');
  return null;
}

async function checkBackendStatus() {
  console.log('🚀 Checking if real Laravel backend is running...\n');
  
  // Check if Laravel is running by looking at process
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execPromise = util.promisify(exec);
    
    const { stdout } = await execPromise('netstat -an | findstr :8000');
    if (stdout.includes(':8000')) {
      console.log('✅ Something is running on port 8000');
    } else {
      console.log('❌ Nothing running on port 8000');
    }
  } catch (error) {
    console.log('❌ Could not check port status');
  }
  
  const workingPort = await testRealBackend();
  
  if (workingPort) {
    console.log(`\n🎯 SOLUTION: Update frontend to use port ${workingPort}`);
    console.log(`   Current: Using wrong backend (possibly mock data)`);
    console.log(`   Correct: Should use http://localhost:${workingPort}/api/v1/articles`);
  } else {
    console.log(`\n💡 NEXT STEPS:`);
    console.log(`   1. Start the real Laravel backend:`);
    console.log(`      cd "D:\\laragon\\www\\LAMDAKU\\lamdaku-cms-backend"`);
    console.log(`      php artisan serve --port=8000`);
    console.log(`   2. Or check if it's running on a different port`);
  }
}

checkBackendStatus().catch(console.error);
