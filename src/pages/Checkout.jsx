import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../features/orders/ordersSlice';
import { clearCart } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const cart = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name:'', phone:'', address:'' });

  const subtotal = +(cart.reduce((s,i)=> s + i.price * i.qty, 0)).toFixed(2);
  const delivery = subtotal > 20 || subtotal === 0 ? 0 : 2.5;
  const total = +(subtotal + delivery).toFixed(2);

  const handlePlace = async () => {
    if(cart.length === 0){ alert('Panier vide'); return; }
    if(!customer.name || !customer.phone || !customer.address){ alert('Remplis les infos client'); return; }

    const order = {
      items: cart,
      subtotal,
      delivery,
      total,
      customer,
      payment: { method: 'on_delivery', status: 'not_paid' },
      status: 'pending',
      history: [{ status:'pending', at: new Date().toISOString() }],
      createdAt: new Date().toISOString()
    };
    try {
      await dispatch(placeOrder(order)).unwrap();
      dispatch(clearCart());
      alert('Commande passée !');
      navigate('/');
    } catch (err) {
      alert('Erreur lors de la commande');
    }
  };

  return (
    <div className="container p-6">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? <p>Panier vide</p> : (
        <>
          <div className="mb-4 bg-white p-4 rounded shadow">
            {cart.map(i => <div key={i.id} className="flex justify-between">{i.name} x{i.qty} <span>{(i.price * i.qty).toFixed(2)} €</span></div>)}
            <div className="mt-2">Sous-total: {subtotal}€</div>
            <div>Livraison: {delivery}€</div>
            <div className="font-bold">Total: {total}€</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input placeholder="Nom" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} className="p-2 border" />
            <input placeholder="Téléphone" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})} className="p-2 border" />
            <input placeholder="Adresse" value={customer.address} onChange={e=>setCustomer({...customer, address:e.target.value})} className="p-2 border md:col-span-2" />
          </div>

          <button onClick={handlePlace} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Passer la commande</button>
        </>
      )}
    </div>
  );
}
