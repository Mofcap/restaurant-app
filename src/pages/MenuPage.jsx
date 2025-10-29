import React from 'react';
import { useSelector } from 'react-redux';
import DishCard from '../components/DishCard';

export default function MenuPage(){
  const items = useSelector(state => state.menu.items);
  return (
    <div className="container p-6">
      <h1 className="text-2xl font-bold mb-4">La carte</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(d => <DishCard key={d.id} dish={d} />)}
      </div>
    </div>
  );
}
