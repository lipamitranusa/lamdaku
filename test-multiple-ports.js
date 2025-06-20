// Test multiple ports untuk cari backend lamdaku-cms-backend
const testMultiplePorts = async () => {
  const ports = [8000, 8080, 3000, 3001, 9000, 7000, 8001, 8888];
  const paths = ['/api/v1/vision-mission', '/api/vision-mission', '/vision-mission', '/api/v1/company-info'];
  
  console.log('Testing multiple ports for lamdaku-cms-backend...\n');
  
  for (const port of ports) {
    console.log(`\n=== PORT ${port} ===`);
      for (const path of paths) {
      const url = `http://localhost:${port}${path}`;
      try {
        const response = await fetch(url, { timeout: 2000 });
        
        if (response.ok) {
          const data = await response.json();
          console.log(`✅ ${url} - Status: ${response.status}`);
          
          if (path.includes('vision') || path.includes('company')) {
            console.log('Data preview:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
          }
        } else {
          console.log(`❌ ${url} - Status: ${response.status}`);
        }
      } catch (error) {
        console.log(`⚠️  ${url} - ${error.message}`);
      }
    }
  }
};

testMultiplePorts();
