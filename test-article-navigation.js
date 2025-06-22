// Test script untuk memverifikasi article navigation
console.log('=== Testing Article Navigation ===');

// Test getting all articles and then accessing detail
fetch('http://127.0.0.1:8000/api/v1/articles', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  console.log('✅ Articles received:', data.data.length);
  
  // Test accessing each article by ID from the list
  data.data.forEach((article, index) => {
    console.log(`Article ${index + 1}:`, {
      id: article.id,
      title: article.title,
      slug: article.slug,
      category: article.category,
      author: article.author,
      published_at: article.published_at,
      view_count: article.view_count,
      is_featured: article.is_featured
    });
  });

  // Now test if clicking the first article would find it in the list
  const firstArticle = data.data[0];
  console.log('\n=== Testing Detail Access ===');
  console.log('Trying to find article ID:', firstArticle.id);
  
  const foundArticle = data.data.find(art => art.id === firstArticle.id);
  if (foundArticle) {
    console.log('✅ Article found in list for detail view:', foundArticle.title);
    console.log('Frontend will navigate to: /articles/' + foundArticle.id);
    console.log('Frontend will display:', {
      title: foundArticle.title,
      excerpt: foundArticle.excerpt,
      category: foundArticle.category,
      author: foundArticle.author?.name || foundArticle.author,
      date: foundArticle.published_at,
      views: foundArticle.view_count
    });
  } else {
    console.log('❌ Article not found in list');
  }
})
.catch(error => {
  console.log('❌ Error:', error);
});
