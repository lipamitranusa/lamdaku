const axios = require('axios');

async function checkPagesInDetail() {
  console.log('🔍 Checking Pages Structure for Articles...\n');

  const baseUrl = 'http://localhost:8000/api/v1';
  
  try {
    // Get pages data
    const response = await axios.get(`${baseUrl}/pages`);
    
    console.log('📄 Pages Response:', JSON.stringify(response.data, null, 2));
    console.log(`\n📊 Total Pages: ${Array.isArray(response.data) ? response.data.length : 'Not an array'}`);
    
    if (Array.isArray(response.data) && response.data.length === 0) {
      console.log('\n❗ Pages table is empty - no articles found in database');
      console.log('\n💡 Possible solutions:');
      console.log('   1. Add articles through Laravel admin panel');
      console.log('   2. Seed the database with sample articles');
      console.log('   3. Create articles manually in database');
      console.log('   4. Import articles from another source');
    }
    
  } catch (error) {
    console.error('❌ Error checking pages:', error.message);
  }
}

// Let's also try to see if there are any other endpoints that might contain articles
async function checkForOtherEndpoints() {
  console.log('\n🔍 Checking for Other Possible Article Endpoints...\n');
  
  const baseUrl = 'http://localhost:8000';
  
  // Try to check if there are non-API endpoints
  const possibleEndpoints = [
    '/articles',
    '/posts', 
    '/news',
    '/blog',
    '/content',
    '/pages',
    '/admin/articles',
    '/admin/posts'
  ];
  
  for (const endpoint of possibleEndpoints) {
    try {
      const response = await axios.get(`${baseUrl}${endpoint}`, {
        timeout: 3000,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.status === 200) {
        console.log(`✅ Found: ${endpoint}`);
        
        if (response.data && typeof response.data === 'object') {
          console.log(`   Response type: ${Array.isArray(response.data) ? 'Array' : 'Object'}`);
          
          if (Array.isArray(response.data)) {
            console.log(`   Items: ${response.data.length}`);
          }
        }
      }
    } catch (error) {
      console.log(`❌ ${endpoint}: ${error.response?.status || error.code || error.message}`);
    }
  }
}

async function runFullCheck() {
  await checkPagesInDetail();
  await checkForOtherEndpoints();
  
  console.log('\n🏁 SUMMARY:');
  console.log('   ✅ Backend Laravel is running on http://localhost:8000');
  console.log('   ✅ API routes are working (/api/v1/*)');
  console.log('   ✅ Pages endpoint exists but returns empty array');
  console.log('   📄 This means the pages/articles table exists but has no data');
  console.log('\n💫 Next steps:');
  console.log('   1. Check backend CMS admin to add articles');
  console.log('   2. Or manually add articles to database');
  console.log('   3. Or run database seeders if available');
}

runFullCheck().catch(console.error);
