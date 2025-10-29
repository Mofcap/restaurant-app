import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api/Api';

export const loadMenu = createAsyncThunk('menu/loadMenu', async () => {
  return await api.fetchMenu();
});
export const addMenuItem = createAsyncThunk('menu/add', async (item) => {
  return await api.createMenuItem(item);
});
export const patchMenuItem = createAsyncThunk('menu/patch', async ({id, patch}) => {
  return await api.updateMenuItem(id, patch);
});
export const removeMenuItem = createAsyncThunk('menu/remove', async (id) => {
  await api.deleteMenuItem(id);
  return id;
});

const menuSlice = createSlice({
  name: 'menu',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadMenu.pending, (s) => { s.status = 'loading'; })
      .addCase(loadMenu.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload; })
      .addCase(loadMenu.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; })
      .addCase(addMenuItem.fulfilled, (s, a) => { s.items.push(a.payload); })
      .addCase(patchMenuItem.fulfilled, (s, a) => {
        const i = s.items.find(x => x.id === a.payload.id);
        if(i) Object.assign(i, a.payload);
      })
      .addCase(removeMenuItem.fulfilled, (s, a) => {
        s.items = s.items.filter(x => x.id !== a.payload);
      });
  }
});

export default menuSlice.reducer;
