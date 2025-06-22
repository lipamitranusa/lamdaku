// Test untuk memeriksa apakah backend menyediakan konten lengkap artikel
console.log('=== Testing Backend Content Availability ===');

async function testBackendContent() {
  try {
    // Test endpoint yang mungkin menyediakan konten lengkap
    const endpoints = [
      '/articles',
      '/articles/9',
      '/articles/show/9',
      '/article/9'
    ];
    
    for (const endpoint of endpoints) {
      console.log(`\nTesting: http://127.0.0.1:8000/api/v1${endpoint}`);
      
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1${endpoint}`);
        console.log(`Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          
          if (endpoint === '/articles') {
            // Check first article for content
            if (data.success && data.data.length > 0) {
              const article = data.data[0];
              console.log('Fields available:', Object.keys(article));
              console.log('Content field:', !!article.content);
              console.log('Body field:', !!article.body);
              console.log('Description field:', !!article.description);
              console.log('Full_content field:', !!article.full_content);
            }
          } else {
            // Check detail response
            if (data.success) {
              console.log('Detail fields:', Object.keys(data.data || data));
              const article = data.data || data;
              console.log('Content field:', !!article.content);
              console.log('Body field:', !!article.body);
              console.log('Description field:', !!article.description);
              console.log('Full_content field:', !!article.full_content);
              
              if (article.content) {
                console.log('Content length:', article.content.length);
                console.log('Content preview:', article.content.substring(0, 100) + '...');
              }
            }
          }
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    }
    
  } catch (error) {
    console.log('Test failed:', error.message);
  }
}

testBackendContent();
