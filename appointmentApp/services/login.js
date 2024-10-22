import axios from 'axios';

const BASE_URL = 'http://172.20.10.4:3000/api';

export const loginUser = async (email, password, loginWithEmailOnly) => {
  try {
    // הכנה של גוף הבקשה בהתאם אם יש סיסמא או לא
    const requestBody = loginWithEmailOnly ? { email } : { email, password };

    const response = await axios.post(`${BASE_URL}/login`, requestBody);

    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }

  
};
export const requestMagicLink = async (email) => {
  try {
    const response = await axios.post(`${BASE_URL}/request-magic-link`, { email });
    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
};
