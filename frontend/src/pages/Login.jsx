import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { theme } = useTheme();
    const cardBorderColor = theme === 'light' ? '#00F5D4' : '#b20710';

    const validate = () => {
        let valid = true;
        setEmailError('');
        setPasswordError('');
        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setEmailError('Enter a valid email address.');
            valid = false;
        }
        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters.');
            valid = false;
        }
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        try {
            const response = await loginUser({ email, password });
            login(response.user, response.token); // update context and localStorage
            navigate('/'); // Redirect to home after successful login
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid email or password');
        }
    };

    return (
        <motion.div
            style={{
                maxWidth: '400px',
                margin: '3rem auto',
                background: theme === 'light' ? '#fff' : '#181818',
                padding: '2rem',
                borderRadius: 8,
                boxShadow: theme === 'light' ? '0 2px 16px #00F5D420' : '0 2px 16px #0008',
                border: `1.5px solid ${cardBorderColor}`,
                color: theme === 'light' ? '#222' : '#fff',
                textShadow: 'none'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1
                style={{
                    color: theme === 'light' ? '#00F5D4' : '#b20710',
                    fontWeight: 900,
                    letterSpacing: 2,
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    textShadow: 'none'
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                Login
            </motion.h1>
            {error && (
                <motion.p
                    style={{ color: '#e50914', textAlign: 'center', marginTop: '1rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {error}
                </motion.p>
            )}
            <form onSubmit={handleLogin} noValidate>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e50914' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 4,
                            border: '1px solid #333',
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                            marginBottom: '0.25rem'
                        }}
                    />
                    <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{emailError || 'Enter your registered email.'}</div>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: '#e50914' }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            borderRadius: 4,
                            border: '1px solid #333',
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                            marginBottom: '0.25rem'
                        }}
                    />
                    <div style={{ color: 'orange', fontSize: 12, minHeight: 18 }}>{passwordError || 'Password must be at least 6 characters.'}</div>
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        background: '#e50914',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer',
                        fontWeight: 700,
                        transition: 'background 0.3s ease'
                    }}
                    onClick={() => {
                        toast.loading('Logging in...');
                    }}
                >
                    Login
                </button>
            </form>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <span style={{ color: '#fff' }}>Don't have an account? </span>
                <Link to="/register" style={{
                    color: '#e50914',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer'
                }}>Register</Link>
            </div>
        </motion.div>
    );
};

export default Login;