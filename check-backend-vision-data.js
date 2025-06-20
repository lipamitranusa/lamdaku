// Script untuk mengecek apakah ada data visi-misi di backend
const checkBackendForVisionMission = async () => {
  const endpoints = [
    'http://localhost:8000/api/v1/company-info',
    'http://localhost:8000/api/v1/pages',
    'http://localhost:8000/api/company-info',
    'http://localhost:8000/api/pages'
  ];
  
  console.log('Checking backend for vision-mission data...\n');
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        const data = await response.json();
        console.log(`\n=== ${endpoint} ===`);
        console.log('Status:', response.status);
        
        if (data.data) {
          // Check if it's an array or single object
          const items = Array.isArray(data.data) ? data.data : [data.data];
          
          items.forEach((item, index) => {
            console.log(`\nItem ${index + 1}:`);
            if (item.title) console.log('Title:', item.title);
            if (item.content) console.log('Content preview:', item.content.substring(0, 100) + '...');
            if (item.description) console.log('Description:', item.description);
            if (item.company_name) console.log('Company:', item.company_name);
            
            // Look for vision/mission keywords
            const text = JSON.stringify(item).toLowerCase();
            if (text.includes('visi') || text.includes('vision')) console.log('🎯 Contains VISION data!');
            if (text.includes('misi') || text.includes('mission')) console.log('🎯 Contains MISSION data!');
            if (text.includes('tujuan') || text.includes('objective')) console.log('🎯 Contains OBJECTIVES data!');
          });
        }
      }
    } catch (error) {
      console.log(`${endpoint}: Error - ${error.message}`);
    }
  }
};

checkBackendForVisionMission();
