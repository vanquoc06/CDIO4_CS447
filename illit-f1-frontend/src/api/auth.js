const API_BASE_URL = 'http://localhost:8080/api';

// API endpoints
const endpoints = {
  register: `${API_BASE_URL}/users`,
  login: `${API_BASE_URL}/users/login`,
  health: `${API_BASE_URL}/health`
};

// API helper function
const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API error responses
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    // Network or parsing errors
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    throw error;
  }
};

// Register API call
export const registerAPI = async (email, password, fullName, phoneNumber = '') => {
  const data = await apiCall(endpoints.register, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      phone_number: phoneNumber
    })
  });

  // Return user data in the format expected by AuthContext
  return {
    id: data.data.user_id,
    email: data.data.email,
    fullName: data.data.full_name
  };
};

// Login API call
export const loginAPI = async (email, password) => {
  const data = await apiCall(endpoints.login, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });

  // Store JWT token
  const token = data.data.token;
  localStorage.setItem('illitf1_token', token);

  // Return user data in the format expected by AuthContext
  return {
    id: data.data.user.user_id,
    email: data.data.user.email,
    fullName: data.data.user.full_name,
    token: token
  };
};

// Check server health
export const checkServerHealth = async () => {
  try {
    const data = await apiCall(endpoints.health);
    return data.status === 'success';
  } catch (error) {
    return false;
  }
};

// Get JWT token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('illitf1_token');
};

// Clear JWT token
export const clearAuthToken = () => {
  localStorage.removeItem('illitf1_token');
};