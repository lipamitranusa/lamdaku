// Script untuk mengecek detail pages data
const checkPagesData = async () => {
  try {
    const response = await fetch('http://localhost:8000/api/v1/pages');
    if (response.ok) {
      const data = await response.json();
      console.log('Pages data structure:');
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

checkPagesData();
