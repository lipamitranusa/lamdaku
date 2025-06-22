const axios = require('axios');
const fs = require('fs');

async function createBackendStyleTest() {
  console.log('🎨 Creating Backend-Style Test File...\n');

  try {
    // Get article with content
    const response = await axios.get('http://localhost:8000/api/v1/articles/akreditasi-klinik-menjamin-mutu-layanan-kesehatan-primer');
    const article = response.data.data;
    
    console.log(`📄 Article: ${article.title}`);
    console.log(`📝 Content length: ${article.content.length} characters`);
    
    // Create test HTML file with exact backend styling
    const testHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TinyMCE Backend Style Test</title>
    <style>
        /* Backend Article Content Styling - Exact Copy */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            background: #f9fafb;
            padding: 2rem;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-radius: 12px;
            padding: 3rem;
        }
        
        .article-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #374151;
        }

        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            font-weight: 700;
            color: #1f2937;
        }

        .article-content h1 { font-size: 2.5rem; }
        .article-content h2 { font-size: 2rem; }
        .article-content h3 { font-size: 1.75rem; }

        .article-content p {
            margin-bottom: 1.5rem;
            text-align: justify;
        }

        .article-content blockquote {
            border-left: 4px solid #667eea;
            padding: 1.5rem;
            margin: 2rem 0;
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            border-radius: 10px;
            font-style: italic;
            position: relative;
        }

        .article-content blockquote::before {
            content: '"';
            font-size: 4rem;
            color: #667eea;
            position: absolute;
            top: -10px;
            left: 20px;
            opacity: 0.3;
        }
        
        .article-content ul,
        .article-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }

        .article-content ul li,
        .article-content ol li {
            margin-bottom: 0.5rem;
            line-height: 1.7;
        }

        .article-content ul {
            list-style-type: disc;
        }

        .article-content ol {
            list-style-type: decimal;
        }

        .article-content strong,
        .article-content b {
            font-weight: 700;
            color: #1f2937;
        }

        .article-content em,
        .article-content i {
            font-style: italic;
        }
        
        /* Exact styling for inline TinyMCE elements */
        .article-content p[style*="background-color: #e7f3ff"] {
            background: linear-gradient(135deg, #e7f3ff, #dbeafe) !important;
            border-left: 4px solid #2196F3 !important;
            border-radius: 0 10px 10px 0 !important;
            padding: 1rem 1.5rem !important;
            margin: 1.5rem 0 !important;
            font-weight: 500;
            color: #1e40af !important;
        }

        .article-content p[style*="background-color: #fff3e0"] {
            background: linear-gradient(135deg, #fff3e0, #fed7aa) !important;
            border-left: 4px solid #ff9800 !important;
            border-radius: 0 10px 10px 0 !important;
            padding: 1rem 1.5rem !important;
            margin: 1.5rem 0 !important;
            font-weight: 500;
            color: #c2410c !important;
        }
        
        .comparison-note {
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            padding: 1rem;
            margin: 2rem 0;
            color: #0369a1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="comparison-note">
            <strong>🎯 Test:</strong> Styling ini dibuat untuk mencocokkan tampilan backend Laravel. 
            Bandingkan dengan frontend React untuk memastikan konsistensi.
        </div>
        
        <h1>${article.title}</h1>
        <p><strong>Excerpt:</strong> ${article.excerpt}</p>
        <hr>
        <div class="article-content">
            ${article.content}
        </div>
        
        <div class="comparison-note">
            <strong>✅ Elemen yang ditest:</strong><br>
            • Font size: 1.125rem (18px)<br>
            • Line height: 1.8<br>
            • Color: #374151<br>
            • Headers: Bold 700, #1f2937<br>
            • Info boxes: Gradient background + border<br>
            • Blockquotes: #667eea border, gradient background<br>
            • Lists: Proper spacing<br>
            • Paragraphs: Justified text
        </div>
    </div>
</body>
</html>`;
    
    // Save test file
    fs.writeFileSync('backend-style-test.html', testHTML);
    console.log(`\n📁 Backend style test file created: backend-style-test.html`);
    console.log(`🌐 Open in browser: file://${process.cwd()}/backend-style-test.html`);
    
    console.log(`\n🔍 Comparison URLs:`);
    console.log(`   Backend Style: file://${process.cwd()}/backend-style-test.html`);
    console.log(`   Frontend React: http://localhost:3000/articles/${article.slug}`);
    
    console.log(`\n✅ Styling Features Applied:`);
    console.log(`   📏 Font size: 1.125rem (18px) - matches backend`);
    console.log(`   📐 Line height: 1.8 - matches backend`);
    console.log(`   🎨 Colors: #374151 text, #1f2937 headers - matches backend`);
    console.log(`   📦 Info boxes: Gradient backgrounds with borders`);
    console.log(`   💬 Blockquotes: #667eea border with gradient`);
    console.log(`   📝 Headers: Bold 700 weight, proper hierarchy`);
    console.log(`   📋 Lists: Proper spacing and indentation`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

createBackendStyleTest().catch(console.error);
