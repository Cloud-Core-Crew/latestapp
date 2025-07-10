import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '@mui/material';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.loading) return (
    <div style={{textAlign:'center',marginTop:'2rem'}}>
      <Skeleton variant="rectangular" width={600} height={40} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="rectangular" width={800} height={60} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="rectangular" width={800} height={60} style={{margin:'0 auto 1rem'}} />
    </div>
  );

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table style={{ width: '100%', marginBottom: '1.5rem', background: '#222', borderRadius: 8 }}>
            <thead>
              <tr style={{ color: '#e50914' }}>
                <th>Name</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item) => (
                <tr key={item._id + item.type}>
                  <td>{item.name || item.title}</td>
                  <td>{item.type}</td>
                  <td>{item.qty}</td>
                  <td>${item.price * item.qty}</td>
                  <td><button onClick={() => handleRemove(item)} style={{ color: '#e50914', border: 'none', background: 'none', cursor: 'pointer' }}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2 style={{ marginBottom: '1rem' }}>Total: ${cart.total}</h2>
          <button onClick={handleCheckout} style={{ marginRight: 12, background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Checkout</button>
          <button onClick={handleClear} style={{ background: '#444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
