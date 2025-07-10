import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
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
                background: '#181818',
                padding: '2rem',
                borderRadius: 8,
                boxShadow: '0 2px 16px #e5091420'
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <motion.h1
                style={{
                    color: '#e50914',
                    fontWeight: 900,
                    letterSpacing: 2,
                    marginBottom: '1.5rem',
                    textAlign: 'center'
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
            <form onSubmit={handleLogin}>
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
                            background: '#222',
                            color: '#fff',
                            marginBottom: '1rem'
                        }}
                    />
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
                            background: '#222',
                            color: '#fff',
                            marginBottom: '1rem'
                        }}
                    />
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