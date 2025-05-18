import API from './axios';

export const register = (data) => API.post('/auth/register', data);
export const login = async (data) => {
  console.log('Attempting login with:', data);
  try {
    const response = await API.post('/auth/login', data);
    console.log('Login response:', response);
    return response;
  } catch (error) {
    console.error('Login error in service:', error);
    throw error;
  }
};