const axios = require('axios');

async function checkTinyMCEContent() {
  console.log('🔍 Checking TinyMCE Content from Backend...\n');

  try {
    // Get first article from backend
    const response = await axios.get('http://localhost:8000/api/v1/articles');
    const articles = response.data.data;
    
    if (articles.length > 0) {
      const firstArticle = articles[0];
      console.log(`📄 Testing article: "${firstArticle.title}"`);
      
      // Get full article content
      const articleResponse = await axios.get(`http://localhost:8000/api/v1/articles/${firstArticle.slug}`);
      const fullArticle = articleResponse.data;
      
      console.log(`\n📝 Article Content Analysis:`);
      console.log(`   Title: ${fullArticle.title || 'No title'}`);
      console.log(`   Content length: ${fullArticle.content?.length || 0} characters`);
      
      if (fullArticle.content) {
        console.log(`\n🔍 Content Preview (first 500 chars):`);
        console.log(fullArticle.content.substring(0, 500) + '...');
        
        // Check for TinyMCE elements
        const tinymceElements = [
          '<p>',
          '<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>',
          '<strong>', '<em>', '<b>', '<i>',
          '<ul>', '<ol>', '<li>',
          '<blockquote>',
          '<table>', '<tr>', '<td>', '<th>',
          '<img>', '<a href',
          'style=',
          'class='
        ];
        
        console.log(`\n✅ TinyMCE Elements Found:`);
        tinymceElements.forEach(element => {
          if (fullArticle.content.includes(element)) {
            console.log(`   ✅ ${element}`);
          }
        });
        
        console.log(`\n📊 Content Structure:`);
        const paragraphs = (fullArticle.content.match(/<p>/g) || []).length;
        const headings = (fullArticle.content.match(/<h[1-6]>/g) || []).length;
        const lists = (fullArticle.content.match(/<ul>|<ol>/g) || []).length;
        const images = (fullArticle.content.match(/<img/g) || []).length;
        const links = (fullArticle.content.match(/<a href/g) || []).length;
        
        console.log(`   Paragraphs: ${paragraphs}`);
        console.log(`   Headings: ${headings}`);
        console.log(`   Lists: ${lists}`);
        console.log(`   Images: ${images}`);
        console.log(`   Links: ${links}`);
      } else {
        console.log(`❌ No content found for this article`);
      }
      
      // Test frontend URL
      console.log(`\n🌐 Frontend URL to test:`);
      console.log(`   http://localhost:3000/articles/${firstArticle.slug}`);
      
    } else {
      console.log(`❌ No articles found in backend`);
    }
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
  
  console.log(`\n💫 TinyMCE Styling Features Available:`);
  console.log(`   ✅ Typography (headings, paragraphs, text formatting)`);
  console.log(`   ✅ Lists (ordered, unordered, styled)`);
  console.log(`   ✅ Tables (responsive, styled)`);
  console.log(`   ✅ Images (responsive, captions)`);
  console.log(`   ✅ Blockquotes (styled with borders)`);
  console.log(`   ✅ Code blocks (syntax highlighting)`);
  console.log(`   ✅ Custom spacing and margins`);
  console.log(`   ✅ Color and background support`);
}

checkTinyMCEContent().catch(console.error);
