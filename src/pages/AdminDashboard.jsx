import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrderStatus, loadOrders } from '../features/orders/ordersSlice';

export default function AdminDashboard(){
  const orders = useSelector(s => s.orders.items);
  const dispatch = useDispatch();

  const onChange = (id, status) => {
    dispatch(changeOrderStatus({ id, status }));
  };

  return (
    <div className="container p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin - Commandes</h1>
        <button onClick={() => dispatch(loadOrders())} className="px-3 py-1 border rounded">Rafraîchir</button>
      </div>

      {orders.length === 0 && <p>Aucune commande</p>}
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o.id} className="border p-4 rounded bg-white">
            <div className="flex justify-between">
              <div>
                <div className="font-bold">#{o.id} — {o.customer?.name || 'Anonyme'}</div>
                <div className="text-sm">Total: {o.total}€ — Statut: <strong>{o.status}</strong></div>
              </div>
              <div className="flex gap-2">
                <select defaultValue={o.status} onChange={e=>onChange(o.id, e.target.value)} className="p-1 border">
                  <option value="pending">pending</option>
                  <option value="in_progress">in_progress</option>
                  <option value="paid">paid</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </div>
            </div>
            <div className="mt-2 text-sm">
              {o.items?.map(it => <div key={it.id}>{it.name} x{it.qty}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
