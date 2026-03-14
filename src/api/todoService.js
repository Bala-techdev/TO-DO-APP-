import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const client = axios.create({ baseURL: API_BASE });

function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getTodos() {
  const res = await client.get('/todos', { headers: authHeader() });
  return res.data;
}

export async function createTodo(todo) {
  const res = await client.post('/todos', todo, { headers: authHeader() });
  return res.data;
}

export async function updateTodo(id, todo) {
  const res = await client.put(`/todos/${id}`, todo, { headers: authHeader() });
  return res.data;
}

export async function deleteTodo(id) {
  const res = await client.delete(`/todos/${id}`, { headers: authHeader() });
  return res.data;
}

export default {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
