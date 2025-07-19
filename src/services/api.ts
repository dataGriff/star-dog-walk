const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('stardogwalker_token');
};

// Helper function to make authenticated requests
const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    return makeRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData: {
    email: string;
    password: string;
    name: string;
    role: 'owner' | 'walker';
    phone?: string;
    address?: string;
  }) => {
    return makeRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  verifyToken: async () => {
    return makeRequest('/auth/verify');
  },
};

// Dogs API
export const dogsAPI = {
  getAll: async () => {
    return makeRequest('/dogs');
  },

  getById: async (id: string) => {
    return makeRequest(`/dogs/${id}`);
  },

  create: async (dogData: any) => {
    return makeRequest('/dogs', {
      method: 'POST',
      body: JSON.stringify(dogData),
    });
  },

  update: async (id: string, dogData: any) => {
    return makeRequest(`/dogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(dogData),
    });
  },

  delete: async (id: string) => {
    return makeRequest(`/dogs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Walks API
export const walksAPI = {
  getAll: async () => {
    return makeRequest('/walks');
  },

  getById: async (id: string) => {
    return makeRequest(`/walks/${id}`);
  },

  getPublic: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/walks/public/${id}`);
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || 'Request failed');
    }
    return response.json();
  },

  create: async (walkData: any) => {
    return makeRequest('/walks', {
      method: 'POST',
      body: JSON.stringify(walkData),
    });
  },

  update: async (id: string, walkData: any) => {
    return makeRequest(`/walks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(walkData),
    });
  },

  updateStatus: async (id: string, status: string) => {
    return makeRequest(`/walks/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  },

  delete: async (id: string) => {
    return makeRequest(`/walks/${id}`, {
      method: 'DELETE',
    });
  },
};

// Notifications API
export const notificationsAPI = {
  getAll: async () => {
    return makeRequest('/notifications');
  },

  create: async (notificationData: any) => {
    return makeRequest('/notifications', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  },

  markAsRead: async (id: string) => {
    return makeRequest(`/notifications/${id}/read`, {
      method: 'PATCH',
    });
  },

  clearAll: async () => {
    return makeRequest('/notifications', {
      method: 'DELETE',
    });
  },
};

// Users API
export const usersAPI = {
  getProfile: async () => {
    return makeRequest('/users/profile');
  },

  updateProfile: async (userData: any) => {
    return makeRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
};