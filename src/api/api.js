import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:4000' });

export const fetchMenu = () => API.get('/menu').then(r => r.data);
export const createMenuItem = (item) => API.post('/menu', item).then(r => r.data);
export const updateMenuItem = (id, patch) => API.patch(`/menu/${id}`, patch).then(r => r.data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`).then(r => r.data);

export const fetchOrders = () => API.get('/orders').then(r => r.data);
export const createOrder = (order) => API.post('/orders', order).then(r => r.data);
export const updateOrder = (id, patch) => API.patch(`/orders/${id}`, patch).then(r => r.data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`).then(r => r.data);
