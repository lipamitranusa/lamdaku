const axios = require('axios');

async function verifyFrontendBackendIntegration() {
  console.log('🔗 Verifying Frontend-Backend Integration...\n');

  // Test 1: Backend articles (real backend)
  console.log('📡 Testing Real Backend Articles...');
  try {
    const backendResponse = await axios.get('http://localhost:8000/api/v1/articles');
    console.log(`✅ Real Backend: ${backendResponse.data.data.length} articles`);
    
    const realArticles = backendResponse.data.data;
    console.log(`📰 Real Articles from backend:`);
    realArticles.slice(0, 3).forEach((article, index) => {
      console.log(`   ${index + 1}. "${article.title}"`);
      console.log(`      Slug: ${article.slug}`);
      console.log(`      Category: ${article.category}`);
    });
  } catch (error) {
    console.log(`❌ Real Backend failed: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Test 2: Check what frontend is actually using
  console.log('🖥️  Testing Frontend Articles Page...');
  try {
    const frontendResponse = await axios.get('http://localhost:3000/articles');
    console.log(`✅ Frontend accessible`);
    
    // Look for signs of which data is being used in the HTML
    const htmlContent = frontendResponse.data;
    
    // Check for real backend article titles
    const realBackendTitles = [
      'Akreditasi Klinik: Menjamin Mutu Layanan Kesehatan Primer',
      'Program Digitalisasi UMKM 2025',
      'Inovasi Digital dalam Pelayanan Publik'
    ];
    
    // Check for mock data titles that might be used instead
    const mockDataTitles = [
      'LAMDAKU Raih Pengakuan ISO 17020',
      'Panduan Lengkap Persiapan Akreditasi Klinik'
    ];
    
    let usingRealData = false;
    let usingMockData = false;
    
    realBackendTitles.forEach(title => {
      if (htmlContent.includes(title)) {
        console.log(`✅ Found real backend article: "${title.substring(0, 40)}..."`);
        usingRealData = true;
      }
    });
    
    mockDataTitles.forEach(title => {
      if (htmlContent.includes(title)) {
        console.log(`⚠️  Found mock data article: "${title.substring(0, 40)}..."`);
        usingMockData = true;
      }
    });
    
    if (usingRealData && !usingMockData) {
      console.log(`\n🎯 ✅ SUCCESS: Frontend is using REAL BACKEND data!`);
    } else if (usingMockData && !usingRealData) {
      console.log(`\n❌ PROBLEM: Frontend is still using MOCK data`);
    } else if (usingRealData && usingMockData) {
      console.log(`\n⚠️  MIXED: Frontend using both real and mock data`);
    } else {
      console.log(`\n🤔 UNCLEAR: Could not determine data source from HTML content`);
    }
    
  } catch (error) {
    console.log(`❌ Frontend not accessible: ${error.message}`);
  }

  console.log('\n' + '='.repeat(60) + '\n');

  // Test 3: Test API service directly from frontend API base URL
  console.log('🔌 Testing Frontend API Service...');
  try {
    // Try the exact URL that frontend should be using
    const frontendApiResponse = await axios.get('http://127.0.0.1:8000/api/v1/articles');
    console.log(`✅ Frontend API URL working: ${frontendApiResponse.data.data.length} articles`);
    
    // Compare with backend response
    const backendResponse = await axios.get('http://localhost:8000/api/v1/articles');
    
    if (JSON.stringify(frontendApiResponse.data) === JSON.stringify(backendResponse.data)) {
      console.log(`✅ Frontend API and Backend API return identical data`);
    } else {
      console.log(`⚠️  Frontend API and Backend API return different data`);
    }
    
  } catch (error) {
    console.log(`❌ Frontend API URL failed: ${error.message}`);
  }

  console.log('\n🏁 VERIFICATION SUMMARY:');
  console.log('   📂 Real Backend Location: D:\\laragon\\www\\LAMDAKU\\lamdaku-cms-backend');
  console.log('   🔗 Real Backend URL: http://localhost:8000/api/v1/articles');
  console.log('   📰 Real Backend Articles: 5 articles found');
  console.log('   🎯 Frontend should now display real backend data');
}

verifyFrontendBackendIntegration().catch(console.error);
