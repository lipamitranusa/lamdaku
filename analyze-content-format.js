// Analisis format konten backend saat ini
console.log('=== Analyzing Backend Content Format ===');

async function analyzeContentFormat() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/articles');
    const data = await response.json();
    
    if (data.success && data.data.length > 0) {
      // Test beberapa artikel untuk melihat format konten
      for (let i = 0; i < Math.min(3, data.data.length); i++) {
        const article = data.data[i];
        
        console.log(`\n--- Article ${i + 1}: ${article.title.substring(0, 50)}... ---`);
        
        // Get full content
        const fullResponse = await fetch(`http://127.0.0.1:8000/api/v1/articles/${article.slug}`);
        if (fullResponse.ok) {
          const fullData = await fullResponse.json();
          const content = fullData.data.content;
          
          console.log('Content length:', content.length);
          console.log('Content sample (first 200 chars):');
          console.log(content.substring(0, 200));
          console.log('\n--- Format Analysis ---');
          
          // Analyze content format
          const hasHTML = content.includes('<') && content.includes('>');
          const hasLineBreaks = content.includes('\n');
          const hasParagraphs = content.includes('<p>') || content.includes('</p>');
          const hasHeadings = content.includes('<h1>') || content.includes('<h2>') || content.includes('<h3>');
          const hasBold = content.includes('<strong>') || content.includes('<b>');
          const hasItalic = content.includes('<em>') || content.includes('<i>');
          const hasList = content.includes('<ul>') || content.includes('<ol>');
          
          console.log('Has HTML tags:', hasHTML);
          console.log('Has line breaks (\\n):', hasLineBreaks);
          console.log('Has paragraph tags:', hasParagraphs);
          console.log('Has heading tags:', hasHeadings);
          console.log('Has bold formatting:', hasBold);
          console.log('Has italic formatting:', hasItalic);
          console.log('Has list formatting:', hasList);
          
          // Check for emoji and special characters
          const hasEmoji = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]/u.test(content);
          console.log('Has emoji:', hasEmoji);
          
          // Suggest improvements
          console.log('\n--- Formatting Suggestions ---');
          if (!hasParagraphs) {
            console.log('❌ Missing: <p> tags for paragraphs');
          }
          if (!hasHeadings) {
            console.log('❌ Missing: <h2>, <h3> tags for sections');
          }
          if (!hasBold && !hasItalic) {
            console.log('❌ Missing: Text emphasis (<strong>, <em>)');
          }
          if (!hasList) {
            console.log('❌ Missing: Lists (<ul>, <ol>) for structured content');
          }
          
          if (hasHTML && hasParagraphs && hasHeadings) {
            console.log('✅ Good: Content has proper HTML structure');
          }
        }
      }
      
      console.log('\n=== RECOMMENDATIONS FOR BACKEND ===');
      console.log('1. Use proper HTML formatting in content field');
      console.log('2. Structure with <h2>, <h3> for sections');
      console.log('3. Use <p> tags for paragraphs');
      console.log('4. Add <strong> for important text');
      console.log('5. Use <ul>/<ol> for lists');
      console.log('6. Add CSS classes for better styling');
      
    }
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

analyzeContentFormat();
