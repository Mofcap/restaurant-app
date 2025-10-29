import React from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';

export default function Header(){
  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">Mon Restaurant</Link>
        <nav className="flex gap-4 items-center">
          <Link to="/menu" className="hover:underline">La carte</Link>
          <Link to="/checkout" className="hover:underline">Checkout</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
          <CartWidget />
        </nav>
      </div>
    </header>
  );
}
