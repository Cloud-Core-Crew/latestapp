import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Paper, Modal, TextField, Alert } from '@mui/material';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { user, login, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const isLoggedIn = !!user;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            toast.loading('Logging in...');
            const response = await loginUser({ email, password });
            login(response.user, response.token); // set real user and token
            setShowLoginModal(false);
            navigate('/');
            toast.dismiss();
            toast.success('Logged in successfully');
        } catch (err) {
            toast.dismiss();
            setLoginError(err?.response?.data?.message || 'Invalid email or password');
            toast.error('Login failed');
        }
    };

    const logoutHandler = () => {
        logout();
        navigate('/');
        toast.success('Logged out successfully');
    };

    const closeModal = () => {
        setShowLoginModal(false);
        setEmail('');
        setPassword('');
        setLoginError('');
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            bgcolor: 'background.paper',
            boxShadow: 1
        }}>
            <Typography variant="h4"
              style={{
                color: theme === 'dark' ? '#b20710' : '#00F5D4', // Dark red in dark mode, neon aqua in light mode
                fontWeight: 'bold',
                letterSpacing: 2,
                margin: 0,
                textShadow: theme === 'dark' ? '0 1px 8px #000' : '0 0 8px #00F5D4, 0 0 16px #00F5D4',
                transition: 'color 0.2s, text-shadow 0.2s'
              }}
            >EventMerch</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Link to="/" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                    Home
                </Link>
                <Link to="/events" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                    Events
                </Link>
                <Link to="/merchandise" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                    Merchandise
                </Link>
                <Link to="/checkout" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                    Checkout
                </Link>
                
                {!isLoggedIn ? (
                    <>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                setShowLoginModal(true);
                            }}
                        >
                            Login
                        </Button>
                        <Link to="/register" sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                            '&:hover': {
                                textDecoration: 'underline'
                            }
                        }}>
                            Register
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/profile" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                            Profile
                        </Link>
                        <Link to="/orders" sx={{ textDecoration: 'none', color: 'text.primary' }}>
                            Orders
                        </Link>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={logoutHandler}
                        >
                            Logout
                        </Button>
                    </>
                )}

                <Button
                    variant="outlined"
                    color="primary"
                    onClick={toggleTheme}
                    sx={{ ml: 2 }}
                    title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    {theme === 'dark' ? '🌙' : '☀️'}
                </Button>

                {showLoginModal && (
                    <Modal
                        open={showLoginModal}
                        onClose={closeModal}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Paper
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                maxWidth: '400px',
                                width: '90%',
                                boxShadow: 4
                            }}
                        >
                            <Box sx={{ width: '100%', mb: 3 }}>
                                <Typography variant="h5" align="center" sx={{ color: 'primary.main', mb: 2 }}>
                                    Login
                                </Typography>
                                {loginError && (
                                    <Alert severity="error" sx={{ mb: 2 }}>
                                        {loginError}
                                    </Alert>
                                )}
                                <form onSubmit={handleLogin}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        margin="normal"
                                        variant="outlined"
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    >
                                        Login
                                    </Button>
                                </form>
                            </Box>
                            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                                <span>Don't have an account? </span>
                                <Link to="/register" onClick={closeModal} style={{
                                    textDecoration: 'none',
                                    color: '#e50914',
                                    cursor: 'pointer'
                                }}>
                                    Register
                                </Link>
                            </div>
                        </Paper>
                    </Modal>
                )}
            </Box>
        </Box>
    );
};

export default Navbar;