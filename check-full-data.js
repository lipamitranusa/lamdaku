const axios = require('axios');

async function checkFullArticleData() {
  console.log('🔍 Checking Full Article Data Structure...\n');

  try {
    // Get articles list
    const listResponse = await axios.get('http://localhost:8000/api/v1/articles');
    console.log(`📚 Articles found: ${listResponse.data.data.length}`);
    
    // Get first article details
    if (listResponse.data.data.length > 0) {
      const firstArticle = listResponse.data.data[0];
      console.log(`\n📄 Article Details:`);
      console.log(JSON.stringify(firstArticle, null, 2));
      
      // Try to get individual article by ID
      console.log(`\n🔍 Testing individual article by ID: ${firstArticle.id}`);
      try {
        const byIdResponse = await axios.get(`http://localhost:8000/api/v1/articles/${firstArticle.id}`);
        console.log(`✅ By ID Response:`);
        console.log(JSON.stringify(byIdResponse.data, null, 2));
      } catch (error) {
        console.log(`❌ By ID failed: ${error.response?.status || error.message}`);
      }
      
      // Try to get individual article by slug
      console.log(`\n🔍 Testing individual article by slug: ${firstArticle.slug}`);
      try {
        const bySlugResponse = await axios.get(`http://localhost:8000/api/v1/articles/${firstArticle.slug}`);
        console.log(`✅ By Slug Response:`);
        console.log(JSON.stringify(bySlugResponse.data, null, 2));
      } catch (error) {
        console.log(`❌ By Slug failed: ${error.response?.status || error.message}`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

checkFullArticleData().catch(console.error);
