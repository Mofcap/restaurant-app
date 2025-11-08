import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { placeOrder } from '../features/orders/ordersSlice';
import { clearCart, removeFromCart, updateQty } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const cart = useSelector(s => s.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name:'', phone:'', address:'' });

  const subtotal = +(cart.reduce((s,i)=> s + i.price * i.qty, 0)).toFixed(2);
  const delivery = subtotal > 20 || subtotal === 0 ? 0 : 2.5;
  const total = +(subtotal + delivery).toFixed(2);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQty = (id, newQty) => {
    if(newQty <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQty({ id, qty: newQty }));
    }
  };

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
    <div className="container p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Panier</h1>
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Votre panier est vide</p>
          <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">
            Retour au Menu
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6 bg-white rounded-lg shadow">
            {cart.map(i => (
              <div key={i.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium">{i.name}</p>
                  <p className="text-sm text-gray-600">{i.price.toFixed(2)} €</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 border rounded">
                    <button 
                      onClick={() => handleUpdateQty(i.id, i.qty - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-2 min-w-[2rem] text-center">{i.qty}</span>
                    <button 
                      onClick={() => handleUpdateQty(i.id, i.qty + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  
                  <span className="font-semibold min-w-[4rem] text-right">
                    {(i.price * i.qty).toFixed(2)} €
                  </span>
                  
                  <button 
                    onClick={() => handleRemove(i.id)}
                    className="text-red-600 hover:text-red-800 px-2"
                    title="Supprimer"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-gray-50 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Sous-total:</span>
                <span>{subtotal} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Livraison:</span>
                <span>{delivery === 0 ? 'Gratuite' : `${delivery} €`}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total:</span>
                <span>{total} €</span>
              </div>
              {subtotal > 0 && subtotal <= 20 && (
                <p className="text-xs text-gray-600 text-right">
                  Livraison gratuite dès 20€
                </p>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-lg font-semibold mb-4">Informations de livraison</h2>
            <div className="space-y-3">
              <input 
                placeholder="Nom complet" 
                value={customer.name} 
                onChange={e=>setCustomer({...customer, name:e.target.value})} 
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <input 
                placeholder="Téléphone" 
                value={customer.phone} 
                onChange={e=>setCustomer({...customer, phone:e.target.value})} 
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
              <textarea 
                placeholder="Adresse complète" 
                value={customer.address} 
                onChange={e=>setCustomer({...customer, address:e.target.value})} 
                className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                rows="3"
              />
            </div>
          </div>

          <button 
            onClick={handlePlace} 
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Passer la commande ({total} €)
          </button>
        </>
      )}
    </div>
  );
}