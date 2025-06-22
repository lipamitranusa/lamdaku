import React from 'react';

const ArticleContentWrapper = ({ content }) => {
  return (
    <div
      style={{
        textAlign: 'left',
        fontSize: '1.125rem',
        lineHeight: '1.8',
        color: '#374151',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <style>{`
        .force-left-alignment * {
          text-align: left !important;
        }
        
        .force-left-alignment h1,
        .force-left-alignment h2,
        .force-left-alignment h3,
        .force-left-alignment h4,
        .force-left-alignment h5,
        .force-left-alignment h6 {
          text-align: left !important;
          margin-top: 2.5rem !important;
          margin-bottom: 1.25rem !important;
          font-weight: 700 !important;
          color: #1f2937 !important;
        }
        
        .force-left-alignment h1 { font-size: 2.5rem !important; }
        .force-left-alignment h2 { font-size: 2rem !important; }
        .force-left-alignment h3 { font-size: 1.75rem !important; }
        
        .force-left-alignment p {
          text-align: left !important;
          margin-bottom: 1.5rem !important;
        }
        
        .force-left-alignment p:not([style*="background-color"]) {
          text-align: justify !important;
        }
        
        .force-left-alignment ul,
        .force-left-alignment ol,
        .force-left-alignment li {
          text-align: left !important;
          margin: 0.5rem 0 !important;
        }
        
        .force-left-alignment ul {
          margin: 1.5rem 0 !important;
          padding-left: 2rem !important;
        }
        
        .force-left-alignment ol {
          margin: 1.5rem 0 !important;
          padding-left: 2rem !important;
        }
        
        .force-left-alignment blockquote {
          text-align: left !important;
          border-left: 4px solid #667eea !important;
          padding: 1.5rem !important;
          margin: 2rem 0 !important;
          background: linear-gradient(135deg, #f8fafc, #e2e8f0) !important;
          border-radius: 10px !important;
          font-style: italic !important;
          position: relative !important;
        }
        
        .force-left-alignment p[style*="background-color: #e7f3ff"] {
          background: linear-gradient(135deg, #e7f3ff, #dbeafe) !important;
          border-left: 4px solid #2196F3 !important;
          border-radius: 0 10px 10px 0 !important;
          padding: 1rem 1.5rem !important;
          margin: 1.5rem 0 !important;
          font-weight: 500 !important;
          color: #1e40af !important;
          text-align: left !important;
        }
        
        .force-left-alignment p[style*="background-color: #fff3e0"] {
          background: linear-gradient(135deg, #fff3e0, #fed7aa) !important;
          border-left: 4px solid #ff9800 !important;
          border-radius: 0 10px 10px 0 !important;
          padding: 1rem 1.5rem !important;
          margin: 1.5rem 0 !important;
          font-weight: 500 !important;
          color: #c2410c !important;
          text-align: left !important;
        }
        
        .force-left-alignment strong,
        .force-left-alignment b {
          font-weight: 700 !important;
          color: #1f2937 !important;
        }
        
        .force-left-alignment em,
        .force-left-alignment i {
          font-style: italic !important;
        }
      `}</style>
      <div
        className="force-left-alignment article-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ArticleContentWrapper;
