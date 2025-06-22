// Test script untuk melihat struktur lengkap data artikel dari backend
console.log('=== Testing Backend Article Structure ===');

fetch('http://127.0.0.1:8000/api/v1/articles', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  if (data.success && data.data.length > 0) {
    console.log('✅ Backend Article Structure:');
    const firstArticle = data.data[0];
    
    // Show all available fields
    console.log('Available fields in backend article:');
    Object.keys(firstArticle).forEach(key => {
      console.log(`- ${key}: ${typeof firstArticle[key]} = ${
        typeof firstArticle[key] === 'object' 
          ? JSON.stringify(firstArticle[key])
          : firstArticle[key]
      }`);
    });
    
    console.log('\n=== Key Fields Check ===');
    console.log('ID:', firstArticle.id);
    console.log('Title:', firstArticle.title);
    console.log('Excerpt length:', firstArticle.excerpt?.length || 'No excerpt');
    console.log('Content available:', !!firstArticle.content);
    console.log('Content length:', firstArticle.content?.length || 'No content');
    console.log('Featured image:', firstArticle.featured_image);
    console.log('Category:', firstArticle.category);
    console.log('Author type:', typeof firstArticle.author);
    console.log('Published at:', firstArticle.published_at);
    console.log('View count:', firstArticle.view_count);
    console.log('Is featured:', firstArticle.is_featured);
    console.log('Reading time:', firstArticle.reading_time);
    
  } else {
    console.log('❌ No articles data received');
  }
})
.catch(error => {
  console.log('❌ Error:', error);
});
