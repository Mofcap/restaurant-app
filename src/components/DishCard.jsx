import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function DishCard({ dish }){
  const dispatch = useDispatch();
  return (
    <div className="border rounded p-4 bg-white">
      <h3 className="font-bold">{dish.name}</h3>
      <p className="text-sm text-gray-600">{dish.description}</p>
      <div className="flex justify-between items-center mt-3">
        <span className="font-semibold">{dish.price} €</span>
        <button
          onClick={() => dispatch(addToCart({ id: dish.id, name: dish.name, price: dish.price }))}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
