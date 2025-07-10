import React, { useEffect, useState } from 'react';
import { fetchOrders, fetchOrdersFiltered, cancelOrder } from '../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [canceling, setCanceling] = useState('');

  const token = localStorage.getItem('token');

  const loadOrders = (statusFilter = '') => {
    setLoading(true);
    if (statusFilter) {
      fetchOrdersFiltered(token, statusFilter)
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load orders.');
          setLoading(false);
        });
    } else {
      fetchOrdersFiltered(token, '')
        .then(data => {
          setOrders(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load orders.');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (!token) {
      setError('Not logged in.');
      setLoading(false);
      return;
    }
    loadOrders();
    // eslint-disable-next-line
  }, [token]);

  const handleCancel = async (orderId) => {
    setCanceling(orderId);
    try {
      await cancelOrder(orderId);
      loadOrders(status);
    } catch {
      setError('Failed to cancel order.');
    }
    setCanceling('');
  };

  const handleFilter = (e) => {
    setStatus(e.target.value);
    loadOrders(e.target.value);
  };

  if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Loading orders...</div>;
  if (error) return <div style={{color:'#e50914',textAlign:'center',marginTop:'2rem'}}>{error}</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'center' }}>
      <h1 style={{ color: '#e50914', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>My Orders</h1>
      <div style={{ marginBottom: 16 }}>
        <label style={{ marginRight: 8 }}>Filter by status:</label>
        <select value={status} onChange={handleFilter} style={{ padding: '0.5rem', borderRadius: 4 }}>
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table style={{ width: '100%', background: '#222', borderRadius: 8 }}>
          <thead>
            <tr style={{ color: '#e50914' }}>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Items</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
                <td>
                  <ul style={{textAlign:'left'}}>
                    {order.items.map((item, idx) => (
                      <li key={idx}>{item.name || item.title} x{item.qty}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {order.status !== 'cancelled' && order.status !== 'pending' && (
                    <button onClick={() => handleCancel(order._id)} disabled={canceling === order._id} style={{ background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>
                      {canceling === order._id ? 'Cancelling...' : 'Cancel'}
                    </button>
                  )}
                  {order.status === 'cancelled' && <span style={{ color: '#888' }}>Cancelled</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
