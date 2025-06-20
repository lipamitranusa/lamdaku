// Test endpoint vision-mission-goal
const testVisionMissionGoal = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/vision-mission-goal');
    if (response.ok) {
      const data = await response.json();
      console.log('Backend Data Structure:');
      console.log(JSON.stringify(data, null, 2));
      
      // Transform data like in frontend
      if (data.success) {        const transformedData = {
          vision: data.data.vision?.[0]?.content || '',
          mission: data.data.mission?.map(item => item.content) || [],
          objectives: data.data.goals?.map(item => ({
            title: item.title,
            description: item.content
          })) || []
        };
        
        console.log('\nTransformed Data for Frontend:');
        console.log(JSON.stringify(transformedData, null, 2));
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

testVisionMissionGoal();
