const axios = require('axios');
const fs = require('fs');

async function testTinyMCEDisplay() {
  console.log('🎨 Testing TinyMCE Display with Real Content...\n');

  try {
    // Get article with content
    const response = await axios.get('http://localhost:8000/api/v1/articles/akreditasi-klinik-menjamin-mutu-layanan-kesehatan-primer');
    const article = response.data.data;
    
    console.log(`📄 Article: ${article.title}`);
    console.log(`📝 Content length: ${article.content.length} characters`);
    
    console.log(`\n🔍 TinyMCE Elements in Content:`);
    const content = article.content;
    
    // Check for specific TinyMCE elements
    const elements = {
      'Headings': content.match(/<h[1-6][^>]*>/g) || [],
      'Paragraphs': content.match(/<p[^>]*>/g) || [],
      'Strong/Bold': content.match(/<strong[^>]*>/g) || [],
      'Emphasis/Italic': content.match(/<em[^>]*>/g) || [],
      'Lists': content.match(/<[uo]l[^>]*>/g) || [],
      'List Items': content.match(/<li[^>]*>/g) || [],
      'Blockquotes': content.match(/<blockquote[^>]*>/g) || [],
      'Inline Styles': content.match(/style="[^"]*"/g) || []
    };
    
    Object.entries(elements).forEach(([name, matches]) => {
      console.log(`   ${name}: ${matches.length} found`);
      if (matches.length > 0 && matches.length <= 3) {
        matches.forEach(match => console.log(`     - ${match}`));
      }
    });
    
    // Check for custom styling
    console.log(`\n🎨 Custom Styling Found:`);
    if (content.includes('background-color')) {
      console.log(`   ✅ Background colors`);
    }
    if (content.includes('border-left')) {
      console.log(`   ✅ Border styling`);
    }
    if (content.includes('padding')) {
      console.log(`   ✅ Padding`);
    }
    
    // Create test HTML file
    const testHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TinyMCE Styling Test</title>
    <style>
        /* Copy the article-content styles */
        .article-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #374151;
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
            font-weight: 700;
            color: #1e293b;
            margin: 2rem 0 1rem 0;
            line-height: 1.3;
        }
        
        .article-content h1 { font-size: 2.25rem; }
        .article-content h2 { font-size: 1.875rem; }
        .article-content h3 { font-size: 1.5rem; }
        .article-content h4 { font-size: 1.25rem; }
        .article-content h5 { font-size: 1.125rem; }
        .article-content h6 { font-size: 1rem; }
        
        .article-content p {
            margin: 1.5rem 0;
            text-align: justify;
        }
        
        .article-content strong,
        .article-content b {
            font-weight: 600;
            color: #1e293b;
        }
        
        .article-content em,
        .article-content i {
            font-style: italic;
        }
        
        .article-content ul,
        .article-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }
        
        .article-content li {
            margin: 0.75rem 0;
            line-height: 1.7;
        }
        
        .article-content blockquote {
            margin: 2rem 0;
            padding: 1.5rem;
            background: #f8fafc;
            border-left: 4px solid #3b82f6;
            border-radius: 0 8px 8px 0;
            font-style: italic;
            position: relative;
        }
        
        .article-content blockquote:before {
            content: '"';
            font-size: 4rem;
            color: #3b82f6;
            position: absolute;
            top: -10px;
            left: 1rem;
            line-height: 1;
        }
        
        /* Handle inline styles from TinyMCE */
        .article-content [style*="background-color"] {
            border-radius: 6px;
        }
        
        .article-content [style*="border-left"] {
            border-radius: 0 6px 6px 0;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            background: #f9fafb;
        }
        
        .container {
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-radius: 12px;
            margin: 2rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="article-content">
            <h1>${article.title}</h1>
            <p><strong>Excerpt:</strong> ${article.excerpt}</p>
            <hr>
            ${article.content}
        </div>
    </div>
</body>
</html>`;
    
    // Save test file
    fs.writeFileSync('tinymce-test.html', testHTML);
    console.log(`\n📁 Test file created: tinymce-test.html`);
    console.log(`🌐 Open in browser: file://${process.cwd()}/tinymce-test.html`);
    
    console.log(`\n✅ TinyMCE Content Ready for Display:`);
    console.log(`   📄 Real content from backend`);
    console.log(`   🎨 Full CSS styling applied`);
    console.log(`   📱 Responsive design`);
    console.log(`   🎯 Test URL: http://localhost:3000/articles/${article.slug}`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

testTinyMCEDisplay().catch(console.error);
