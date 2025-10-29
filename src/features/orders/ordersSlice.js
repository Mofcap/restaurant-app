import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/Api';

export const loadOrders = createAsyncThunk('orders/load', async () => {
  return await api.fetchOrders();
});

export const placeOrder = createAsyncThunk('orders/place', async (order) => {
  return await api.createOrder(order);
});

export const changeOrderStatus = createAsyncThunk('orders/changeStatus', async ({id, status}) => {
  const orders = await api.fetchOrders();
  const o = orders.find(x => x.id === id);
  if(!o) throw new Error('Order not found');
  const newHistory = (o.history || []).concat([{status, at: new Date().toISOString()}]);
  const res = await api.updateOrder(id, { status, history: newHistory });
  return res;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadOrders.fulfilled, (s,a)=>{ s.items = a.payload; s.status='succeeded'; })
     .addCase(placeOrder.fulfilled, (s,a)=>{ s.items.unshift(a.payload); })
     .addCase(changeOrderStatus.fulfilled, (s,a)=> {
       const i = s.items.find(x=>x.id === a.payload.id);
       if(i) Object.assign(i, a.payload);
     });
  }
});

export default ordersSlice.reducer;
