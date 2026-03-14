// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/todos';

// export async function getTodos() {
//   const response = await axios.get(API_URL);
//   return response.data;
// }

// export async function createTodo(todo) {
//   const response = await axios.post(API_URL, todo);
//   return response.data;
// }

// export async function updateTodo(id, updates) {
//   const response = await axios.put(`${API_URL}/${id}`, updates);
//   return response.data;
// }

// export async function deleteTodo(id) {
//   const response = await axios.delete(`${API_URL}/${id}`);
//   return response.data;
// }
import client from './authApi';

// client baseURL is http://localhost:8080/api
export const getTodos = () => client.get('/todos').then(res => res.data);

export const createTodo = todo => client.post('/todos', todo).then(res => res.data);

export const updateTodo = (id, todo) =>
  client.put(`/todos/${id}`, todo).then(res => res.data);

export const deleteTodo = id => client.delete(`/todos/${id}`).then(res => res.data);