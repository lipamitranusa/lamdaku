// Test endpoint alternatif untuk konten lengkap
console.log('=== Testing Alternative Backend Endpoints ===');

async function testAlternativeEndpoints() {
  try {
    const endpoints = [
      '/articles?include=content',
      '/articles?full=true',
      '/articles/9/content',
      '/articles/slug/akreditasi-klinik-menjamin-mutu-layanan-kesehatan-primer',
      '/posts',
      '/posts/9'
    ];
    
    for (const endpoint of endpoints) {
      console.log(`\nTesting: http://127.0.0.1:8000/api/v1${endpoint}`);
      
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1${endpoint}`);
        console.log(`Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Response structure:', Object.keys(data));
          
          if (data.success) {
            const article = Array.isArray(data.data) ? data.data[0] : data.data;
            if (article) {
              console.log('Article fields:', Object.keys(article));
              console.log('Has content:', !!article.content);
              console.log('Has body:', !!article.body);
              
              if (article.content) {
                console.log('Content length:', article.content.length);
                console.log('Content type:', typeof article.content);
              }
            }
          }
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    
    // Test direct admin routes
    console.log('\n=== Testing Admin Routes ===');
    const adminEndpoints = [
      '/admin/articles',
      '/admin/articles/9'
    ];
    
    for (const endpoint of adminEndpoints) {
      console.log(`\nTesting: http://127.0.0.1:8000${endpoint}`);
      
      try {
        const response = await fetch(`http://127.0.0.1:8000${endpoint}`);
        console.log(`Status: ${response.status}`);
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.log('Test failed:', error.message);
  }
}

testAlternativeEndpoints();
