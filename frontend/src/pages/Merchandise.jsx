import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { fetchMerch } from '../services/api';

const Merchandise = () => {
  const [merch, setMerch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart, isInCart, getQty, increaseQty, decreaseQty } = useCart();

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

  if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Loading merchandise...</div>;
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
            whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #e5091440' }}
            style={{
              width: '100%',
              maxWidth: 320,
              minWidth: 220,
              background: '#222', // match Home card style
              borderRadius: 8,
              boxShadow: '0 2px 12px #e5091410',
              padding: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <h2 style={{ color: '#e50914', fontSize: '1.3rem', marginBottom: 8 }}>{item.name}</h2>
            {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{width:'100%',maxWidth:180,borderRadius:8,marginBottom:8}} />}
            {item.price && <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>${item.price}</p>}
            <p style={{fontSize:'0.95rem',marginBottom:12}}>{item.description}</p>
            {!isInCart(`merch-${item._id}`) ? (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleAddToCart(item); }}
                style={{marginTop:12,background:'#e50914',color:'#fff',border:'none',borderRadius:4,padding:'0.5rem 1.5rem',fontWeight:700,cursor:'pointer', zIndex: 2}}
              >Add to Cart</button>
            ) : (
              <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
                <span style={{color:'#43ea5e',fontWeight:700}}>Added!</span>
                <button onClick={() => decreaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginRight:4}}>-</button>
                <span style={{fontWeight:700}}>{getQty(`merch-${item._id}`)}</span>
                <button onClick={() => increaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginLeft:4}}>+</button>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Merchandise;
