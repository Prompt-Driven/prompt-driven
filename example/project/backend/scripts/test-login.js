const axios = require('axios');

async function testLogin() {
  try {
    console.log('Attempting to login with admin credentials...');
    const response = await axios.post('http://localhost:5001/api/auth/login', {
      email: 'admin@example.com',
      password: 'admin123'
    });
    console.log('Login successful!');
    console.log('Response data:', response.data);
  } catch (error) {
    console.error('Login failed!');
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

testLogin(); 