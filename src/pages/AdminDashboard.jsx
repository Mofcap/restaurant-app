import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeOrderStatus, loadOrders } from '../features/orders/ordersSlice';

export default function AdminDashboard(){
  const orders = useSelector(s => s.orders.items);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Auto-refresh chaque minute
  useEffect(() => {
    dispatch(loadOrders());
    const interval = setInterval(() => {
      dispatch(loadOrders());
      setLastUpdate(new Date());
    }, 60000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [dispatch]);

  const onChange = (id, status) => {
    dispatch(changeOrderStatus({ id, status }));
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      delivered: 'bg-purple-100 text-purple-800 border-purple-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'En attente',
      in_progress: 'En préparation',
      paid: 'Payée',
      delivered: 'Livrée',
      cancelled: 'Annulée'
    };
    return labels[status] || status;
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    in_progress: orders.filter(o => o.status === 'in_progress').length,
    delivered: orders.filter(o => o.status === 'delivered').length
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Tableau de bord</h1>
              <p className="text-slate-600 mt-1">Gestion des commandes en temps réel</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-600">
                Dernière mise à jour: {lastUpdate.toLocaleTimeString('fr-FR')}
              </div>
              <button 
                onClick={() => {
                  dispatch(loadOrders());
                  setLastUpdate(new Date());
                }} 
                className="px-4 py-2 bg-white border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition flex items-center gap-2 shadow-sm"
              >
                <span className="text-xl">🔄</span>
                Rafraîchir
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm font-medium">Total</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{stats.total}</p>
                </div>
                <div className="text-4xl">📦</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm border border-yellow-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-800 text-sm font-medium">En attente</p>
                  <p className="text-3xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
                </div>
                <div className="text-4xl">⏳</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm border border-blue-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-800 text-sm font-medium">En préparation</p>
                  <p className="text-3xl font-bold text-blue-900 mt-1">{stats.in_progress}</p>
                </div>
                <div className="text-4xl">👨‍🍳</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm border border-green-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 text-sm font-medium">Livrées</p>
                  <p className="text-3xl font-bold text-green-900 mt-1">{stats.delivered}</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'in_progress', 'paid', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === status 
                    ? 'bg-slate-800 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {status === 'all' ? 'Toutes' : getStatusLabel(status)}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-slate-600 text-lg">Aucune commande à afficher</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map(o => (
              <div key={o.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition overflow-hidden">
                <div className="p-6">
                  {/* Order Header */}
                  <div className="flex flex-wrap gap-4 justify-between items-start mb-4">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">👤</span>
                        <div>
                          <h3 className="font-bold text-lg text-slate-800">
                            {o.customer?.name || 'Client Anonyme'}
                          </h3>
                          <p className="text-sm text-slate-600">Commande #{o.id?.slice(-8) || o.id}</p>
                        </div>
                      </div>
                      
                      {o.customer?.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 ml-11">
                          <span>📞</span>
                          <span>{o.customer.phone}</span>
                        </div>
                      )}
                      
                      {o.customer?.address && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 ml-11 mt-1">
                          <span>📍</span>
                          <span>{o.customer.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <div className={`px-4 py-2 rounded-lg border-2 font-semibold ${getStatusColor(o.status)}`}>
                        {getStatusLabel(o.status)}
                      </div>
                      
                      <select 
                        value={o.status} 
                        onChange={e=>onChange(o.id, e.target.value)} 
                        className="px-4 py-2 border-2 border-slate-300 rounded-lg font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 cursor-pointer"
                      >
                        <option value="pending">⏳ En attente</option>
                        <option value="in_progress">👨‍🍳 En préparation</option>
                        <option value="paid">💳 Payée</option>
                        <option value="delivered">✅ Livrée</option>
                        <option value="cancelled">❌ Annulée</option>
                      </select>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <span>🛍️</span>
                      Articles commandés
                    </h4>
                    <div className="space-y-2">
                      {o.items?.map(it => (
                        <div key={it.id} className="flex justify-between items-center bg-white rounded-lg p-3">
                          <span className="text-slate-700">
                            <span className="font-medium">{it.name}</span>
                            <span className="text-slate-500 ml-2">× {it.qty}</span>
                          </span>
                          <span className="font-semibold text-slate-800">
                            {(it.price * it.qty).toFixed(2)} €
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600">
                      {new Date(o.createdAt).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-1">
                        Sous-total: {o.subtotal?.toFixed(2) || '0.00'} € 
                        {o.delivery > 0 && ` + Livraison: ${o.delivery.toFixed(2)} €`}
                      </div>
                      <div className="text-2xl font-bold text-slate-800">
                        {o.total?.toFixed(2) || '0.00'} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}