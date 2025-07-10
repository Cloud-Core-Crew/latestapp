import React, { useState } from 'react';
import { registerUser } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let valid = true;
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (!form.name) {
      setNameError('Name is required.');
      valid = false;
    } else if (form.name.length < 2) {
      setNameError('Name must be at least 2 characters.');
      valid = false;
    }
    if (!form.email) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setEmailError('Enter a valid email address.');
      valid = false;
    }
    if (!form.password) {
      setPasswordError('Password is required.');
      valid = false;
    } else if (form.password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    }
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!validate()) return;
    try {
      await registerUser({ username: form.name, email: form.email, password: form.password });
      setMessage('Registration successful!');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
      <h1 style={{ color: '#e50914', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Register</h1>
      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
          required
        />
        <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{nameError || 'Enter your full name.'}</div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
          required
        />
        <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{emailError || 'Enter a valid email address.'}</div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ width: '100%', marginBottom: '0.25rem', padding: '0.5rem' }}
          required
        />
        <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{passwordError || 'Password must be at least 6 characters.'}</div>
        <button type="submit" style={{ width: '100%', padding: '0.7rem', background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 700 }}>
          Register
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default Register;
