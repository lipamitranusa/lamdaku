// Test untuk mencari endpoint yang tepat untuk konten lengkap
console.log('=== Finding Correct Content Endpoint ===');

async function findContentEndpoint() {
  try {
    // First get the article slug from the list
    const listResponse = await fetch('http://127.0.0.1:8000/api/v1/articles');
    const listData = await listResponse.json();
    
    if (listData.success && listData.data.length > 0) {
      const firstArticle = listData.data[0];
      console.log('Testing with article:', {
        id: firstArticle.id,
        slug: firstArticle.slug,
        title: firstArticle.title
      });
      
      // Try different endpoint patterns
      const endpoints = [
        `/articles/${firstArticle.id}`,
        `/articles/show/${firstArticle.id}`,
        `/articles/${firstArticle.slug}`,
        `/article/${firstArticle.id}`,
        `/content/articles/${firstArticle.id}`,
        `/api/articles/${firstArticle.id}`,
        `/v1/articles/${firstArticle.id}/full`,
        `/articles/${firstArticle.id}?include=content`,
        `/articles/${firstArticle.id}?with=content`
      ];
      
      for (const endpoint of endpoints) {
        console.log(`\nTrying: http://127.0.0.1:8000/api/v1${endpoint}`);
        
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1${endpoint}`);
          console.log(`Status: ${response.status}`);
          
          if (response.ok) {
            const data = await response.json();
            const article = data.data || data;
            
            console.log('SUCCESS! Fields:', Object.keys(article));
            
            if (article.content) {
              console.log('✅ FOUND CONTENT!');
              console.log('Content length:', article.content.length);
              console.log('Content preview:', article.content.substring(0, 200) + '...');
              return endpoint; // Return the working endpoint
            }
            
            if (article.body) {
              console.log('✅ FOUND BODY!');
              console.log('Body length:', article.body.length);
              console.log('Body preview:', article.body.substring(0, 200) + '...');
              return endpoint;
            }
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
      }
      
      // Try direct backend server routes (non-API)
      console.log('\n=== Trying Direct Backend Routes ===');
      const directEndpoints = [
        `/articles/${firstArticle.id}`,
        `/article/${firstArticle.id}`,
        `/post/${firstArticle.id}`,
        `/${firstArticle.slug}`
      ];
      
      for (const endpoint of directEndpoints) {
        console.log(`\nTrying: http://127.0.0.1:8000${endpoint}`);
        
        try {
          const response = await fetch(`http://127.0.0.1:8000${endpoint}`);
          console.log(`Status: ${response.status}`);
          
          if (response.ok) {
            const text = await response.text();
            if (text.length > 1000) {
              console.log('✅ FOUND HTML CONTENT!');
              console.log('Content length:', text.length);
              console.log('Has article content:', text.includes('article') || text.includes('content'));
            }
          }
        } catch (error) {
          console.log(`Error: ${error.message}`);
        }
      }
    }
    
  } catch (error) {
    console.log('Test failed:', error.message);
  }
}

findContentEndpoint();
