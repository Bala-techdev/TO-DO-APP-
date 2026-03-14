import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const client = axios.create({ baseURL: API_BASE });

export function setAuthToken(token) {
  if (token) client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete client.defaults.headers.common['Authorization'];
}

export async function register({ name, email, password }) {
  const res = await client.post('/auth/register', { name, email, password });
  return res.data;
}

export async function login({ email, password }) {
  const res = await client.post('/auth/login', { email, password });
  return res.data;
}

// verify can be implemented either via header or body depending on backend
// verify accepts an object (e.g. { email, otp }) depending on your backend
export async function verify(payload) {
  const res = await client.post('/auth/verify', payload);
  return res.data;
}

export async function getProfile() {
  const res = await client.get('/user/profile');
  return res.data;
}

export default client;
