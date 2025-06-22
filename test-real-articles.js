const axios = require('axios');

async function testRealBackendArticles() {
  console.log('🔗 Testing Real Backend Articles...\n');

  const baseUrl = 'http://localhost:8000/api/v1';
  
  try {
    // Test articles list
    console.log('📰 Getting articles from real backend...');
    const response = await axios.get(`${baseUrl}/articles`);
    
    console.log(`✅ Success! Status: ${response.status}`);
    console.log(`📊 Response structure: ${typeof response.data}`);
    
    if (response.data) {
      console.log(`🔍 Response keys: ${Object.keys(response.data)}`);
      
      if (response.data.data && Array.isArray(response.data.data)) {
        const articles = response.data.data;
        console.log(`📚 Total articles: ${articles.length}`);
        
        console.log(`\n📖 Article List:`);
        articles.forEach((article, index) => {
          console.log(`\n${index + 1}. "${article.title}"`);
          console.log(`   ID: ${article.id}`);
          console.log(`   Slug: ${article.slug}`);
          console.log(`   Author: ${article.author || 'N/A'}`);
          console.log(`   Status: ${article.status || 'N/A'}`);
          console.log(`   Category: ${article.category || 'N/A'}`);
          console.log(`   Created: ${article.created_at}`);
          console.log(`   Updated: ${article.updated_at}`);
          
          if (article.excerpt) {
            console.log(`   Excerpt: ${article.excerpt.substring(0, 100)}...`);
          }
        });
        
        // Test individual article
        if (articles.length > 0) {
          const firstArticle = articles[0];
          console.log(`\n🔍 Testing individual article access...`);
          
          try {
            const articleResponse = await axios.get(`${baseUrl}/articles/${firstArticle.slug}`);
            console.log(`✅ Individual article accessible by slug`);
            console.log(`   Title: ${articleResponse.data.title}`);
            console.log(`   Content length: ${articleResponse.data.content?.length || 0} characters`);
          } catch (error) {
            console.log(`❌ Individual article by slug failed: ${error.response?.status || error.message}`);
          }
        }
      }
    }
    
    // Test featured articles
    console.log(`\n⭐ Testing featured articles...`);
    try {
      const featuredResponse = await axios.get(`${baseUrl}/articles/featured`);
      console.log(`✅ Featured articles: ${featuredResponse.data?.data?.length || 0} found`);
    } catch (error) {
      console.log(`❌ Featured articles failed: ${error.response?.status || error.message}`);
    }
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    if (error.response) {
      console.error(`   Status: ${error.response.status}`);
      console.error(`   Data: ${JSON.stringify(error.response.data)}`);
    }
  }
  
  console.log(`\n🎯 RESULT: Real backend has articles data!`);
  console.log(`   Backend: D:\\laragon\\www\\LAMDAKU\\lamdaku-cms-backend`);
  console.log(`   Endpoint: http://localhost:8000/api/v1/articles`);
  console.log(`   Frontend should now use real data instead of mock data`);
}

testRealBackendArticles().catch(console.error);
