
/**
 * API service for handling all API requests
 */
const API_URL = 'http://localhost:5000/api';

// Helper for making API requests
const apiRequest = async (endpoint, method = 'GET', data = null) => {
  const url = `${API_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json'
  };
  
  // Add auth token to headers if available
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const options = {
    method,
    headers,
    credentials: 'same-origin'
  };
  
  if (data) {
    options.body = JSON.stringify(data);
  }
  
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Something went wrong');
    }
    
    return result;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Auth API methods
const AuthAPI = {
  login: (userData) => apiRequest('/login', 'POST', userData),
  register: (userData) => apiRequest('/register', 'POST', userData)
};

// Tasks API methods
const TasksAPI = {
  getTasks: () => apiRequest('/tasks'),
  createTask: (taskData) => apiRequest('/tasks', 'POST', taskData),
  deleteTask: (taskId) => apiRequest(`/tasks/${taskId}`, 'DELETE')
};
