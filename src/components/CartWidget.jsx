import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function CartWidget(){
  const items = useSelector(s => s.cart.items);
  const qty = items.reduce((s,i)=> s + i.qty, 0);
  return (
    <Link to="/checkout" className="relative">
      <span className="px-3 py-1 border rounded">Panier</span>
      {qty > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">{qty}</span>
      )}
    </Link>
  );
}
