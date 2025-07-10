import React, { useEffect, useState } from 'react';
import { fetchProfile } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Skeleton } from '@mui/material';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      setError('Not logged in.');
      setLoading(false);
      return;
    }
    
    fetchProfile()
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Profile fetch error:', err);
        const errorMessage = 
          err.response?.data?.message || 
          err.message || 
          'Failed to load profile. Please try again.';
        setError(errorMessage);
        setLoading(false);
      });
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) return (
    <div style={{textAlign:'center',marginTop:'2rem'}}>
      <Skeleton variant="circular" width={80} height={80} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="text" width={200} height={40} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="rectangular" width={300} height={60} style={{margin:'0 auto 1rem'}} />
    </div>
  );
  if (error) return <div style={{color:'#e50914',textAlign:'center',marginTop:'2rem'}}>{error}</div>;

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto', textAlign: 'center' }}>
      <h1 style={{ color: '#e50914', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem' }}>Profile</h1>
      <div style={{ background: '#222', borderRadius: 8, padding: '2rem', marginBottom: '1.5rem' }}>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Registered:</strong> {profile.createdAt ? new Date(profile.createdAt).toLocaleString() : ''}</p>
      </div>
      <button onClick={handleLogout} style={{ background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.7rem 2rem', fontWeight: 700, cursor: 'pointer' }}>Logout</button>
      {/* Add edit profile, change password, order history, etc. here */}
    </div>
  );
};

export default Profile;
