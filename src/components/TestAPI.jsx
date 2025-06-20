import React, { useState, useEffect } from 'react';
import ApiService from '../services/api';

const TestAPI = () => {  const [testResults, setTestResults] = useState({
    services: null,
    timelines: null,
    pages: null,
    companyInfo: null,
    visionMission: null,
    articles: null,
    organizationalStructure: null,
    error: null
  });
  const [loading, setLoading] = useState(false);
  
  const testAllAPIs = async () => {
    setLoading(true);
    const results = { services: null, timelines: null, pages: null, companyInfo: null, visionMission: null, articles: null, organizationalStructure: null, error: null };
    
    try {
      // Test Services API
      console.log('Testing Services API...');
      const services = await ApiService.getServices();
      results.services = { success: true, count: services.length, data: services };
      console.log('Services API Response:', services);
    } catch (error) {
      results.services = { success: false, error: error.message };
      console.error('Services API Error:', error);
    }

    try {
      // Test Timelines API
      console.log('Testing Timelines API...');
      const timelines = await ApiService.getTimelines();
      results.timelines = { success: true, count: timelines.length, data: timelines };
      console.log('Timelines API Response:', timelines);
    } catch (error) {
      results.timelines = { success: false, error: error.message };
      console.error('Timelines API Error:', error);
    }    try {
      // Test Pages API
      console.log('Testing Pages API...');
      const pages = await ApiService.getPages();
      results.pages = { success: true, count: pages.length, data: pages };
      console.log('Pages API Response:', pages);
    } catch (error) {
      results.pages = { success: false, error: error.message };
      console.error('Pages API Error:', error);
    }    try {
      // Test Company Info API
      console.log('Testing Company Info API...');
      const companyData = await ApiService.getCompanyContact();
      results.companyInfo = { success: companyData?.success || false, data: companyData?.data || null };
      console.log('Company Info API Response:', companyData);
    } catch (error) {
      results.companyInfo = { success: false, error: error.message };
      console.error('Company Info API Error:', error);
    }    try {
      // Test Vision Mission Goal API
      console.log('Testing Vision Mission Goal API...');
      const visionData = await ApiService.getVisionMissionGoal();
      results.visionMission = { success: visionData?.success || false, data: visionData?.data || null };
      console.log('Vision Mission Goal API Response:', visionData);
    } catch (error) {
      results.visionMission = { success: false, error: error.message };
      console.error('Vision Mission Goal API Error:', error);
    }    try {
      // Test Articles API
      console.log('Testing Articles API...');
      const articlesData = await ApiService.getArticles();
      results.articles = { success: articlesData?.success || false, count: articlesData?.data?.length || 0, data: articlesData?.data || null };
      console.log('Articles API Response:', articlesData);
    } catch (error) {
      results.articles = { success: false, error: error.message };
      console.error('Articles API Error:', error);
    }

    try {
      // Test Organizational Structure API
      console.log('Testing Organizational Structure API...');
      const orgData = await ApiService.getOrganizationalStructure();
      results.organizationalStructure = { success: orgData?.success || false, data: orgData?.data || null };
      console.log('Organizational Structure API Response:', orgData);
    } catch (error) {
      results.organizationalStructure = { success: false, error: error.message };
      console.error('Organizational Structure API Error:', error);
    }

    setTestResults(results);
    setLoading(false);
  };

  useEffect(() => {
    testAllAPIs();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Laravel API Connection Test</h1>
      
      <button 
        onClick={testAllAPIs} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Testing APIs...' : 'Test All APIs'}
      </button>

      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Services Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.services?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Services API Test</h3>
          {testResults.services ? (
            testResults.services.success ? (
              <div>
                <p>✅ Success! Found {testResults.services.count} services</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.services.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.services.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>
          )}
        </div>

        {/* Timelines Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.timelines?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Timelines API Test</h3>
          {testResults.timelines ? (
            testResults.timelines.success ? (
              <div>
                <p>✅ Success! Found {testResults.timelines.count} timeline events</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.timelines.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.timelines.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>
          )}
        </div>

        {/* Pages Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.pages?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Pages API Test</h3>
          {testResults.pages ? (
            testResults.pages.success ? (
              <div>
                <p>✅ Success! Found {testResults.pages.count} pages</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.pages.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.pages.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>          ) : (
            <p>⏳ Waiting to test</p>
          )}
        </div>

        {/* Company Info Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.companyInfo?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Company Info API Test</h3>
          {testResults.companyInfo ? (
            testResults.companyInfo.success ? (
              <div>
                <p>✅ Success! Company contact information loaded</p>
                <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '3px' }}>
                  <h5>Contact Information:</h5>
                  <p><strong>Phone:</strong> {testResults.companyInfo.data.phone}</p>
                  <p><strong>Mobile:</strong> {testResults.companyInfo.data.mobile}</p>
                  <p><strong>Email:</strong> {testResults.companyInfo.data.email}</p>
                  <p><strong>Address:</strong> {testResults.companyInfo.data.address}</p>
                </div>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.companyInfo.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.companyInfo.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>          )}
        </div>

        {/* Vision Mission API Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.visionMission?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Vision Mission Goal API Test</h3>
          {testResults.visionMission ? (
            testResults.visionMission.success ? (
              <div>
                <p>✅ Success! Vision, Mission, and Goals loaded</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.visionMission.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.visionMission.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>
          )}
        </div>

        {/* Articles API Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.articles?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Articles API Test</h3>
          {testResults.articles ? (
            testResults.articles.success ? (
              <div>
                <p>✅ Success! Found {testResults.articles.count} articles</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.articles.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.articles.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>          )}
        </div>

        {/* Organizational Structure API Test */}
        <div style={{ 
          border: '1px solid #ddd', 
          padding: '15px', 
          borderRadius: '5px',
          backgroundColor: testResults.organizationalStructure?.success ? '#d4edda' : '#f8d7da'
        }}>
          <h3>Organizational Structure API Test</h3>
          {testResults.organizationalStructure ? (
            testResults.organizationalStructure.success ? (
              <div>
                <p>✅ Success! Organizational structure data loaded</p>
                <details>
                  <summary>Show Raw Data</summary>
                  <pre style={{ fontSize: '12px', backgroundColor: '#f8f9fa', padding: '10px', overflow: 'auto' }}>
                    {JSON.stringify(testResults.organizationalStructure.data, null, 2)}
                  </pre>
                </details>
              </div>
            ) : (
              <p>❌ Failed: {testResults.organizationalStructure.error}</p>
            )
          ) : loading ? (
            <p>🔄 Testing...</p>
          ) : (
            <p>⏳ Waiting to test</p>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e7f3ff', borderRadius: '5px' }}>
        <h4>Troubleshooting Tips:</h4>
        <ul>
          <li>Make sure Laravel server is running on <code>http://127.0.0.1:8000</code></li>
          <li>Check browser console for detailed error messages</li>
          <li>Verify CORS settings in Laravel backend</li>
          <li>Test API endpoints directly in browser: <a href="http://127.0.0.1:8000/api/v1/services" target="_blank">http://127.0.0.1:8000/api/v1/services</a></li>
        </ul>
      </div>
    </div>
  );
};

export default TestAPI;
