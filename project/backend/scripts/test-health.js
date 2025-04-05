const axios = require('axios');

async function testHealth() {
  try {
    console.log('Testing health check endpoint...');
    const response = await axios.get('http://localhost:5001/api/health');
    console.log('Health check successful!');
    console.log('Status:', response.status);
    console.log('Data:', response.data);
  } catch (error) {
    console.error('Health check failed!');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
  }
}

testHealth(); 