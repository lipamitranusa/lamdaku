const axios = require('axios');
const fs = require('fs');

async function debugAlignmentIssue() {
  console.log('🔍 Debugging Alignment Issue...\n');

  try {
    // Get article content
    const response = await axios.get('http://localhost:8000/api/v1/articles/akreditasi-klinik-menjamin-mutu-layanan-kesehatan-primer');
    const article = response.data.data;
    
    // Create debug HTML with inline styles to force alignment
    const debugHTML = `
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debug Alignment Issue</title>
    <style>
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
        
        /* FORCE alignment with highest specificity */
        .debug-content,
        .debug-content *,
        .debug-content h1,
        .debug-content h2,
        .debug-content h3,
        .debug-content h4,
        .debug-content h5,
        .debug-content h6,
        .debug-content p,
        .debug-content li,
        .debug-content ul,
        .debug-content ol,
        .debug-content blockquote {
            text-align: left !important;
        }
        
        .debug-content {
            font-size: 1.125rem;
            line-height: 1.8;
            color: #374151;
        }

        .debug-content h1,
        .debug-content h2,
        .debug-content h3,
        .debug-content h4,
        .debug-content h5,
        .debug-content h6 {
            margin-top: 2.5rem;
            margin-bottom: 1.25rem;
            font-weight: 700;
            color: #1f2937;
        }

        .debug-content h1 { font-size: 2.5rem; }
        .debug-content h2 { font-size: 2rem; }
        .debug-content h3 { font-size: 1.75rem; }

        .debug-content p {
            margin-bottom: 1.5rem;
        }
        
        /* Only justify normal paragraphs */
        .debug-content p:not([style*="background-color"]) {
            text-align: justify !important;
        }

        .debug-content blockquote {
            border-left: 4px solid #667eea;
            padding: 1.5rem;
            margin: 2rem 0;
            background: linear-gradient(135deg, #f8fafc, #e2e8f0);
            border-radius: 10px;
            font-style: italic;
            position: relative;
        }
        
        .debug-content ul,
        .debug-content ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }

        .debug-content ul li,
        .debug-content ol li {
            margin-bottom: 0.5rem;
            line-height: 1.7;
        }

        .debug-content strong,
        .debug-content b {
            font-weight: 700;
            color: #1f2937;
        }

        .debug-content em,
        .debug-content i {
            font-style: italic;
        }
        
        /* Exact styling for inline TinyMCE elements */
        .debug-content p[style*="background-color: #e7f3ff"] {
            background: linear-gradient(135deg, #e7f3ff, #dbeafe) !important;
            border-left: 4px solid #2196F3 !important;
            border-radius: 0 10px 10px 0 !important;
            padding: 1rem 1.5rem !important;
            margin: 1.5rem 0 !important;
            font-weight: 500;
            color: #1e40af !important;
            text-align: left !important;
        }

        .debug-content p[style*="background-color: #fff3e0"] {
            background: linear-gradient(135deg, #fff3e0, #fed7aa) !important;
            border-left: 4px solid #ff9800 !important;
            border-radius: 0 10px 10px 0 !important;
            padding: 1rem 1.5rem !important;
            margin: 1.5rem 0 !important;
            font-weight: 500;
            color: #c2410c !important;
            text-align: left !important;
        }
        
        .debug-note {
            background: #fee2e2;
            border: 1px solid #f87171;
            border-radius: 8px;
            padding: 1rem;
            margin: 2rem 0;
            color: #991b1b;
        }
        
        .success-note {
            background: #dcfce7;
            border: 1px solid #4ade80;
            border-radius: 8px;
            padding: 1rem;
            margin: 2rem 0;
            color: #166534;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="debug-note">
            <strong>🔧 DEBUG MODE:</strong> Jika di file ini alignment sudah benar tapi di React masih center, 
            artinya ada CSS React yang meng-override styling kita.
        </div>
        
        <h1>${article.title}</h1>
        <p><strong>Excerpt:</strong> ${article.excerpt}</p>
        <hr>
        
        <div class="debug-content">
            ${article.content}
        </div>
        
        <div class="success-note">
            <strong>✅ Test Result:</strong> Jika semua text di atas left-aligned (kecuali paragraf biasa yang justified), 
            maka styling CSS sudah benar. Problem ada di CSS React yang perlu di-override.
        </div>
        
        <div class="debug-note">
            <strong>🎯 Next Steps jika masih center:</strong><br>
            1. Restart React dev server<br>
            2. Hard refresh browser (Ctrl+Shift+R)<br>
            3. Check browser dev tools untuk CSS conflicts<br>
            4. Pastikan CSS ter-compile dengan benar
        </div>
    </div>
</body>
</html>`;
    
    // Save debug file
    fs.writeFileSync('debug-alignment.html', debugHTML);
    console.log(`📁 Debug file created: debug-alignment.html`);
    console.log(`🌐 Open: file://${process.cwd()}/debug-alignment.html`);
    
    console.log(`\n🔍 Debugging Steps:`);
    console.log(`1. Open debug file dan cek apakah alignment sudah benar`);
    console.log(`2. Jika debug file benar tapi React salah = CSS conflict`);
    console.log(`3. Jika debug file juga salah = HTML content issue`);
    console.log(`4. Hard refresh React app (Ctrl+Shift+R)`);
    console.log(`5. Check browser dev tools > Elements > Computed styles`);
    
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
  }
}

debugAlignmentIssue().catch(console.error);
