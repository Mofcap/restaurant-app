import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

export default function DishCard({ dish }){
  const dispatch = useDispatch();
  return (
    <div className="border border-amber-200/30 rounded-lg overflow-hidden bg-amber-50/20 hover:shadow-xl transition-shadow duration-300">
      {/* Image container */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
        <img 
          src={dish.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop`}
          alt={dish.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {/* Prix badge sur l'image */}
        <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 font-bold px-3 py-1 rounded-full shadow-lg">
          {dish.price} €
        </div>
      </div>
      
      {/* Contenu */}
      <div className="p-4">
        <h3 className="font-bold text-xl text-yellow-400 mb-2">{dish.name}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-2">{dish.description}</p>
        
        <button
          onClick={() => dispatch(addToCart({ id: dish.id, name: dish.name, price: dish.price }))}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}