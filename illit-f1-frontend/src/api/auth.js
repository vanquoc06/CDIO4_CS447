const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const endpoints = {
  register: `${API_BASE_URL}/users`,
  login: `${API_BASE_URL}/users/login`,
  health: `${API_BASE_URL}/health`
};

const apiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Unable to connect to server. Please check if the backend is running.', { cause: error });
    }
    throw error;
  }
};

export const registerAPI = async (email, password, fullName, phoneNumber = '') => {
  await apiCall(endpoints.register, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      full_name: fullName,
      phone_number: phoneNumber
    })
  });

  return loginAPI(email, password);
};

export const loginAPI = async (email, password) => {
  const data = await apiCall(endpoints.login, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });

  const token = data.data.token;
  localStorage.setItem('illitf1_token', token);

  return {
    id: data.data.user.user_id,
    email: data.data.user.email,
    fullName: data.data.user.full_name,
    createdAt: data.data.user.created_at,
    token
  };
};

export const checkServerHealth = async () => {
  try {
    const data = await apiCall(endpoints.health);
    return data.status === 'success';
  } catch {
    return false;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('illitf1_token');
};

export const clearAuthToken = () => {
  localStorage.removeItem('illitf1_token');
};