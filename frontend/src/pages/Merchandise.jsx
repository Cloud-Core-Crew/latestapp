import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { fetchMerch } from '../services/api';
import ReviewSection from '../components/ReviewSection';
import withAuthUser from '../components/withAuthUser.jsx';
import { Skeleton } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const Merchandise = withAuthUser(({ user }) => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, isInCart, getQty, increaseQty, decreaseQty } = useCart();
  const { theme } = useTheme();
  const cardBorderColor = theme === 'light' ? '#00F5D4' : '#b20710';

  useEffect(() => {
    const loadMerch = async () => {
      setLoading(true);
      try {
        const data = await fetchMerch();
        setMerch(data);
      } catch (err) {
        setError('Failed to load merchandise.');
      }
      setLoading(false);
    };
    loadMerch();
  }, []);

  const handleAddToCart = (item) => {
    addToCart({ ...item, id: `merch-${item._id}`, type: 'merch' });
  };

  if (loading) return (
    <div style={{textAlign:'center',marginTop:'2rem'}}>
      <Skeleton variant="rectangular" width={320} height={180} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="text" width={200} height={40} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="text" width={260} height={30} style={{margin:'0 auto 1rem'}} />
      <Skeleton variant="rounded" width={120} height={40} style={{margin:'0 auto 1rem'}} />
    </div>
  );
  if (error) return <div style={{color:'#e50914',textAlign:'center',marginTop:'2rem'}}>{error}</div>;

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', color: '#fff' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', color: '#e50914' }}>Merchandise</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
        gap: '2rem',
        justifyItems: 'center',
      }}>
        {merch.map((item, idx) => (
          <motion.div
            className="carousel-item"
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.07 }}
            style={{
              minWidth: 260,
              maxWidth: 300,
              minHeight: 500,
              maxHeight: 800,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderRadius: 8,
              boxShadow: theme === 'light' ? '0 2px 16px #00F5D420' : '0 2px 12px #9B5DE520',
              border: `1.5px solid ${cardBorderColor}`,
              background: theme === 'light' ? '#fff' : '#222',
              color: theme === 'light' ? '#222' : '#fff',
              padding: 18,
              gap: 18,
              marginBottom: 18,
              transition: 'background 0.2s, color 0.2s, border 0.2s',
              overflow: 'hidden',
            }}
          >
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: 8, marginBottom: 8, maxHeight: 220, objectFit: 'contain', background: '#f5f5f5', display: 'block' }} />}
            <h3 style={{ color: '#e50914', margin: 0 }}>{item.name}</h3>
            {/* Description: only render if present, and no minHeight if missing */}
            {item.description ? (
              <p style={{ fontSize: 15, margin: '6px 0', minHeight: 60 }}>{item.description}</p>
            ) : null}
            {item.category && <p style={{ margin: '6px 0' }}><b>Category:</b> {item.category}</p>}
            {item.brand && <p style={{ margin: '6px 0' }}><b>Brand:</b> {item.brand}</p>}
            {item.stock && <p style={{ margin: '6px 0' }}><b>Stock:</b> {item.stock}</p>}
            {item.price && <p style={{ fontWeight: 700, margin: '8px 0', fontSize: '1.35rem', textAlign: 'center', width: '100%' }}>${item.price}</p>}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 4, flexDirection: 'column', alignItems: 'center' }}>
              {!isInCart(`merch-${item._id}`) ? (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                  style={{background:'#e50914',color:'#fff',border:'none',borderRadius:4,padding:'0.5rem 1.5rem',fontWeight:700,cursor:'pointer', zIndex: 2, width: '80%', maxWidth: 180, margin: '0 auto'}}
                  title="Add to Cart"
                >Add to Cart</button>
              ) : (
                <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center', width: '100%'}}>
                  <span style={{color:'#43ea5e',fontWeight:700}}>Added!</span>
                  <button onClick={() => decreaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginRight:4}} title="Decrease">-</button>
                  <span style={{fontWeight:700}}>{getQty(`merch-${item._id}`)}</span>
                  <button onClick={() => increaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginLeft:4}} title="Increase">+</button>
                </div>
              )}
              <ReviewSection itemId={item._id} type="merch" user={user} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});

export default Merchandise;
