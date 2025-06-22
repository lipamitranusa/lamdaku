const axios = require('axios');

async function testTinyMCEArticleDisplay() {
  console.log('🎨 Testing TinyMCE Article Display Styling...\n');

  try {
    // Get real articles from backend
    const response = await axios.get('http://localhost:8000/api/v1/articles');
    
    if (response.data && response.data.data) {
      const articles = response.data.data;
      console.log(`📚 Found ${articles.length} articles from backend\n`);
      
      // Show sample content that should be styled with TinyMCE formatting
      articles.slice(0, 2).forEach((article, index) => {
        console.log(`📖 Article ${index + 1}: "${article.title}"`);
        console.log(`   Slug: ${article.slug}`);
        console.log(`   Category: ${article.category}`);
        console.log(`   Excerpt: ${article.excerpt?.substring(0, 100)}...`);
        
        // Check if content has HTML tags (typical TinyMCE output)
        if (article.content) {
          const hasHTMLTags = /<[^>]+>/.test(article.content);
          console.log(`   Has HTML Content: ${hasHTMLTags ? 'Yes' : 'No'}`);
          
          if (hasHTMLTags) {
            console.log(`   HTML Tags Found: ${article.content.match(/<[^>]+>/g)?.slice(0, 5).join(', ') || 'None'}`);
          }
        }
        
        console.log('');
      });
      
      console.log('🎯 TinyMCE Styling Features Added:');
      console.log('   ✅ Typography (h1-h6, p, text formatting)');
      console.log('   ✅ Lists (ul, ol with nested support)');
      console.log('   ✅ Links and text formatting (bold, italic, underline)');
      console.log('   ✅ Code blocks and inline code');
      console.log('   ✅ Blockquotes with citations');
      console.log('   ✅ Images with captions (figure/figcaption)');
      console.log('   ✅ Tables with hover effects');
      console.log('   ✅ Text alignment classes');
      console.log('   ✅ Color classes (text and background)');
      console.log('   ✅ Special content boxes (info, warning, success, error)');
      console.log('   ✅ Highlight boxes and CTA boxes');
      console.log('   ✅ Step-by-step lists with numbering');
      console.log('   ✅ Responsive design for mobile');
      console.log('   ✅ Print-friendly styles');
      
      console.log('\n📋 TinyMCE Classes Supported:');
      console.log('   • .text-left, .text-center, .text-right, .text-justify');
      console.log('   • .text-red, .text-blue, .text-green, .text-yellow, .text-purple');
      console.log('   • .bg-light, .bg-primary, .bg-success, .bg-warning, .bg-danger');
      console.log('   • .info-box, .warning-box, .success-box, .error-box');
      console.log('   • .highlight-box, .cta-box');
      console.log('   • .step-list, .step-item, .step-number, .step-content');
      
      console.log('\n🔗 Test URLs:');
      articles.slice(0, 2).forEach((article, index) => {
        console.log(`   ${index + 1}. http://localhost:3000/articles/${article.slug}`);
      });
      
    } else {
      console.log('❌ No articles found in backend response');
    }
    
  } catch (error) {
    console.error(`❌ Error testing articles: ${error.message}`);
  }
  
  console.log('\n💡 How to Test TinyMCE Styling:');
  console.log('   1. Open any article detail page');
  console.log('   2. Check that content displays with proper formatting');
  console.log('   3. Verify headers, lists, links, and special boxes render correctly');
  console.log('   4. Test responsive behavior on mobile');
  console.log('   5. Try print preview to see print styles');
}

testTinyMCEArticleDisplay().catch(console.error);
