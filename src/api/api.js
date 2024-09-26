import axios from 'axios';

export const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'https://api.phemesoft.com/user';

// Function to get data from the backend
export const getDataFromBackend = async (endpoint) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from backend:', error);
    throw error;
  }
};

// Function to post data to the backend
export const postDataToBackend = async (endpoint, data) => {
  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error posting data to backend:', error);
    throw error;
  }
};
