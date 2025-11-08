import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://restaurant-api-iznm.onrender.com';

const API = axios.create({ 
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Ajoutez un intercepteur pour debugger
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const fetchMenu = () => API.get('/menu')
  .then(r => {
    // Vérifiez que la réponse contient bien un tableau
    if (Array.isArray(r.data)) {
      return r.data;
    } else if (r.data && Array.isArray(r.data.menu)) {
      return r.data.menu;
    } else if (r.data && Array.isArray(r.data.items)) {
      return r.data.items;
    } else {
      console.warn('Unexpected API response format:', r.data);
      return [];
    }
  })
  .catch(error => {
    console.error('Error fetching menu:', error);
    return [];
  });

export const fetchOrders = () => API.get('/orders')
  .then(r => {
    // Même vérification pour les commandes
    if (Array.isArray(r.data)) {
      return r.data;
    } else if (r.data && Array.isArray(r.data.orders)) {
      return r.data.orders;
    } else {
      console.warn('Unexpected API response format for orders:', r.data);
      return [];
    }
  })
  .catch(error => {
    console.error('Error fetching orders:', error);
    return [];
  });

export const createMenuItem = (item) => API.post('/menu', item).then(r => r.data);
export const updateMenuItem = (id, patch) => API.patch(`/menu/${id}`, patch).then(r => r.data);
export const deleteMenuItem = (id) => API.delete(`/menu/${id}`).then(r => r.data);

export const createOrder = (order) => API.post('/orders', order).then(r => r.data);
export const updateOrder = (id, patch) => API.patch(`/orders/${id}`, patch).then(r => r.data);
export const deleteOrder = (id) => API.delete(`/orders/${id}`).then(r => r.data);