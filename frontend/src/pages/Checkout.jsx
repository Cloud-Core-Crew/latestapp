import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/api';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [expiryError, setExpiryError] = useState('');
  const [cvcError, setCvcError] = useState('');

  const handleCardChange = (e) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    setNameError('');
    setNumberError('');
    setExpiryError('');
    setCvcError('');
    if (!card.name) {
      setNameError('Cardholder name is required.');
      valid = false;
    }
    if (!card.number) {
      setNumberError('Card number is required.');
      valid = false;
    } else if (!/^\d{16,19}$/.test(card.number.replace(/\s/g, ''))) {
      setNumberError('Enter a valid card number (16-19 digits).');
      valid = false;
    }
    if (!card.expiry) {
      setExpiryError('Expiry is required.');
      valid = false;
    } else if (!/^\d{2}\/\d{2}$/.test(card.expiry)) {
      setExpiryError('Format: MM/YY');
      valid = false;
    }
    if (!card.cvc) {
      setCvcError('CVC is required.');
      valid = false;
    } else if (!/^\d{3,4}$/.test(card.cvc)) {
      setCvcError('CVC must be 3 or 4 digits.');
      valid = false;
    }
    return valid;
  };

  const handlePlaceOrder = async () => {
    setError('');
    if (!validate()) return;
    // Simple validation
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to place an order.');
      return;
    }
    try {
      await createOrder({
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.price * item.qty), 0),
        payment: { ...card, method: 'card' }
      });
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      console.error('Order creation error:', err);
      setError(err.response?.data?.message || 'Failed to place order.');
    }
  };

  if (!cart.length) {
    return (
      <div style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Checkout</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '2rem auto', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Checkout</h1>
      <table style={{ width: '100%', marginBottom: '1.5rem', background: '#222', borderRadius: 8 }}>
        <thead>
          <tr style={{ color: '#e50914' }}>
            <th>Name</th>
            <th>Type</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td>{item.name || item.title}</td>
              <td>{item.type}</td>
              <td>{item.qty}</td>
              <td>${item.price * item.qty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{ marginBottom: '1rem' }}>Total: ${cart.reduce((sum, item) => sum + (item.price * item.qty), 0)}</h2>
      <div style={{ background: '#222', borderRadius: 8, padding: '2rem', margin: '1rem auto', maxWidth: 400 }}>
        <h3 style={{ color: '#e50914', marginBottom: 16 }}>Payment Method</h3>
        <input
          type="text"
          name="name"
          placeholder="Cardholder Name"
          value={card.name}
          onChange={handleCardChange}
          style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
          required
        />
        <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{nameError || 'Enter the name on your card.'}</div>
        <input
          type="text"
          name="number"
          placeholder="Card Number"
          value={card.number}
          onChange={handleCardChange}
          style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
          maxLength={19}
          required
        />
        <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{numberError || '16-19 digits, numbers only.'}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={card.expiry}
              onChange={handleCardChange}
              style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
              maxLength={5}
              required
            />
            <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{expiryError || 'Format: MM/YY'}</div>
          </div>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              name="cvc"
              placeholder="CVC"
              value={card.cvc}
              onChange={handleCardChange}
              style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
              maxLength={4}
              required
            />
            <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{cvcError || '3 or 4 digits.'}</div>
          </div>
        </div>
        {error && <p style={{ color: 'red', marginBottom: 8 }}>{error}</p>}
      </div>
      <button onClick={handlePlaceOrder} style={{ background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Place Order</button>
    </div>
  );
};

export default Checkout;
