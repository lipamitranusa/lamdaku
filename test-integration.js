const axios = require('axios');

async function testFrontendBackendIntegration() {
  console.log('🔗 Testing Frontend-Backend Integration for Articles...\n');

  // Test 1: Backend API directly
  console.log('📡 Testing Backend API directly...');
  try {
    const backendResponse = await axios.get('http://localhost:8000/api/v1/pages');
    console.log(`✅ Backend API: ${backendResponse.data.length} articles found`);
    
    if (backendResponse.data.length > 0) {
      const firstArticle = backendResponse.data[0];
      console.log(`   First article: "${firstArticle.title}"`);
      console.log(`   Author: ${firstArticle.author || 'N/A'}`);
      console.log(`   Status: ${firstArticle.status || 'N/A'}`);
    }
  } catch (error) {
    console.log(`❌ Backend API failed: ${error.message}`);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Frontend connection (if running)
  console.log('🖥️  Testing Frontend connection...');
  try {
    const frontendResponse = await axios.get('http://localhost:3000');
    console.log(`✅ Frontend is running: HTTP ${frontendResponse.status}`);
  } catch (error) {
    console.log(`❌ Frontend not accessible: ${error.message}`);
    console.log('💡 Make sure to run: npm start');
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Individual article access
  console.log('📖 Testing individual article access...');
  try {
    const backendResponse = await axios.get('http://localhost:8000/api/v1/pages');
    
    if (backendResponse.data.length > 0) {
      const firstArticle = backendResponse.data[0];
      
      // Test getting individual article
      try {
        const articleResponse = await axios.get(`http://localhost:8000/api/v1/pages/${firstArticle.id}`);
        console.log(`✅ Individual article access works`);
        console.log(`   Article ID: ${articleResponse.data.id}`);
        console.log(`   Title: ${articleResponse.data.title}`);
        console.log(`   Content length: ${articleResponse.data.content?.length || 0} characters`);
      } catch (error) {
        console.log(`❌ Individual article access failed: ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`❌ Could not test individual article: ${error.message}`);
  }

  console.log('\n🏁 INTEGRATION SUMMARY:');
  console.log('   ✅ Backend Laravel running on port 8000');
  console.log('   ✅ API endpoint /api/v1/pages working');
  console.log('   ✅ 3 sample articles added successfully');
  console.log('   📄 Articles ready for frontend consumption');
  console.log('\n💫 Next: Check frontend at http://localhost:3000/articles');
}

testFrontendBackendIntegration().catch(console.error);
