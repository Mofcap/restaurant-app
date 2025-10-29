import { createSlice } from '@reduxjs/toolkit';

const initialState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, name, price } = action.payload;
      const it = state.items.find(i => i.id === id);
      if(it) it.qty += 1;
      else state.items.push({ id, name, price, qty: 1 });
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    updateQty(state, action) {
      const { id, qty } = action.payload;
      const it = state.items.find(i => i.id === id);
      if(it) it.qty = qty;
      state.items = state.items.filter(i => i.qty > 0);
    },
    clearCart(state) { state.items = []; }
  }
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
