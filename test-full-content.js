// Test untuk memverifikasi konten lengkap artikel
console.log('=== Testing Full Article Content ===');

async function testFullContent() {
  try {
    // Test artikel pertama dengan slug
    const articlesResponse = await fetch('http://127.0.0.1:8000/api/v1/articles');
    const articlesData = await articlesResponse.json();
    
    if (articlesData.success && articlesData.data.length > 0) {
      const firstArticle = articlesData.data[0];
      
      console.log('Testing article:', {
        id: firstArticle.id,
        title: firstArticle.title,
        slug: firstArticle.slug
      });
      
      // Test getting full content by slug
      const fullContentResponse = await fetch(`http://127.0.0.1:8000/api/v1/articles/${firstArticle.slug}`);
      const fullContentData = await fullContentResponse.json();
      
      if (fullContentData.success) {
        console.log('✅ Full content loaded successfully');
        console.log('Available fields:', Object.keys(fullContentData.data));
        console.log('Content available:', !!fullContentData.data.content);
        console.log('Content length:', fullContentData.data.content?.length || 0);
        
        if (fullContentData.data.content) {
          console.log('Content preview (first 300 chars):');
          console.log(fullContentData.data.content.substring(0, 300) + '...');
          
          // Check if content contains HTML
          const hasHTML = fullContentData.data.content.includes('<') && fullContentData.data.content.includes('>');
          console.log('Content has HTML formatting:', hasHTML);
        }
        
        console.log('\n=== Testing frontend navigation simulation ===');
        console.log(`Frontend URL: /articles/${firstArticle.id}`);
        console.log('Will find in list by ID:', firstArticle.id);
        console.log('Will fetch full content by slug:', firstArticle.slug);
        console.log('Expected result: Full content display with', fullContentData.data.content?.length || 0, 'characters');
        
      } else {
        console.log('❌ Failed to get full content');
      }
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testFullContent();
