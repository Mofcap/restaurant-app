import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Header from './components/Header';
import { useDispatch } from 'react-redux';
import { loadMenu } from './features/menu/menuSlice';
import { loadOrders } from './features/orders/ordersSlice';

export default function App(){
  const dispatch = useDispatch();
  useEffect(()=>{ dispatch(loadMenu()); dispatch(loadOrders()); }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<MenuPage/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}
