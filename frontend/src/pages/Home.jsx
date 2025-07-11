import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { fetchEvents, fetchMerch } from '../services/api';
import { Skeleton } from '@mui/material';

const Home = () => {
  const { addToCart, isInCart, getQty, increaseQty, decreaseQty } = useCart();
  const { theme } = useTheme();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [featuredMerch, setFeaturedMerch] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const events = await fetchEvents();
        const merch = await fetchMerch();
        setFeaturedEvents(events.slice(0, 3));
        setFeaturedMerch(merch.slice(0, 3));
      } catch (err) {
        // Optionally handle error
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const cardBorderColor = theme === 'light' ? '#00F5D4' : '#b20710';

  const cardStyle = {
    background: theme === 'light' ? '#fff' : '#222',
    color: theme === 'light' ? '#222' : '#fff',
    borderRadius: 8,
    padding: 14,
    minWidth: 260,
    maxWidth: 270,
    minHeight: 650, // further increased height
    maxHeight: 900, // further increased height
    flex: '0 0 260px',
    marginBottom: 8,
    boxShadow: theme === 'light' ? '0 2px 16px #00F5D420' : '0 2px 16px #0008',
    border: `1.5px solid ${cardBorderColor}`,
    transition: 'background 0.2s, color 0.2s, border 0.2s',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    overflow: 'hidden',
  };

  if (loading) return (
    <div style={{textAlign:'center',marginTop:'2rem',display:'flex',gap:'2rem',justifyContent:'center'}}>
      <div>
        <Skeleton variant="rectangular" width={270} height={180} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="text" width={200} height={40} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="text" width={260} height={30} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="rounded" width={120} height={40} style={{margin:'0 auto 1rem'}} />
      </div>
      <div>
        <Skeleton variant="rectangular" width={270} height={180} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="text" width={200} height={40} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="text" width={260} height={30} style={{margin:'0 auto 1rem'}} />
        <Skeleton variant="rounded" width={120} height={40} style={{margin:'0 auto 1rem'}} />
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '1100px', margin: '2rem auto', textAlign: 'center' }}>
      <motion.h1
        style={{ fontSize: '3rem', fontWeight: 900, letterSpacing: 2, marginBottom: '1.5rem', color: '#e50914' }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Welcome to EventMerch
      </motion.h1>
      <motion.p
        style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '2rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        Discover exclusive events and official merchandise
      </motion.p>

      {/* Featured Events Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#e50914', margin: 0, fontWeight: 800, fontSize: '2rem', letterSpacing: 1, textAlign: 'center', marginBottom: 18 }}>Featured Events</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Event Cards */}
          {featuredEvents.slice(0, 3).map(event => (
            <motion.div key={event._id} className="carousel-item" style={{
              ...cardStyle,
              minWidth: 260,
              maxWidth: 300,
              minHeight: 500, // even more height
              maxHeight: 800, // even more height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flex: '0 0 300px',
              position: 'relative',
            }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }}>
              <div style={{ width: '100%', marginBottom: 8 }}>
                <span style={{ color: '#e50914', fontWeight: 700, fontSize: 13 }}>Event</span>
              </div>
              {event.imageUrl && <img src={event.imageUrl} alt={event.title} style={{ width: '100%', borderRadius: 8, marginBottom: 8, maxHeight: 220, objectFit: 'contain', background: '#f5f5f5', display: 'block' }} />}
              <h3 style={{ color: '#e50914', margin: 0 }}>{event.title}</h3>
              <p style={{ margin: '6px 0', fontWeight: 600 }}>{event.date ? new Date(event.date).toLocaleString() : ''}</p>
              <p style={{ fontSize: 15, margin: '6px 0', minHeight: 60 }}>{event.description}</p>
              {event.category && <p style={{ margin: '6px 0' }}><b>Category:</b> {event.category}</p>}
              {event.location && <p style={{ margin: '6px 0' }}><b>Location:</b> {event.location}</p>}
              {event.organizer && <p style={{ margin: '6px 0' }}><b>Organizer:</b> {event.organizer}</p>}
              {event.price && <p style={{ fontWeight: 700, margin: '8px 0', fontSize: '1.35rem', textAlign: 'center', width: '100%' }}>${event.price}</p>}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 4 }}>
                {!isInCart(`event-${event._id}`) ? (
                  <button onClick={() => addToCart({ ...event, id: `event-${event._id}`, type: 'event' })} style={{ background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Add to Cart</button>
                ) : (
                  <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center'}}>
                    <span style={{color:'#43ea5e',fontWeight:700}}>Added!</span>
                    <button onClick={() => decreaseQty(`event-${event._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginRight:4}}>-</button>
                    <span style={{fontWeight:700}}>{getQty(`event-${event._id}`)}</span>
                    <button onClick={() => increaseQty(`event-${event._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginLeft:4}}>+</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <Link to="/events" style={{ color: '#e50914', fontWeight: 700, textDecoration: 'underline', fontSize: '1.1rem' }}>View All Events</Link>
        </div>
      </div>

      {/* Featured Merchandise Section */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ color: '#e50914', margin: 0, fontWeight: 800, fontSize: '2rem', letterSpacing: 1, textAlign: 'center', marginBottom: 18 }}>Featured Merchandise</h2>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 32, justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Merchandise Cards */}
          {featuredMerch.slice(0, 3).map(item => (
            <motion.div key={item._id} className="carousel-item" style={{
              ...cardStyle,
              minWidth: 260,
              maxWidth: 300,
              minHeight: 500, // even more height
              maxHeight: 800, // even more height
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flex: '0 0 300px',
              position: 'relative',
            }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} whileHover={{ scale: 1.05 }}>
              <div style={{ width: '100%', marginBottom: 8 }}>
                <span style={{ color: '#e50914', fontWeight: 700, fontSize: 13 }}>Merch</span>
              </div>
              {item.imageUrl && <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: 8, marginBottom: 8, maxHeight: 220, objectFit: 'contain', background: '#f5f5f5', display: 'block' }} />}
              <h3 style={{ color: '#e50914', margin: 0 }}>{item.name}</h3>
              <p style={{ fontSize: 15, margin: '6px 0', minHeight: 60 }}>{item.description}</p>
              {item.category && <p style={{ margin: '6px 0' }}><b>Category:</b> {item.category}</p>}
              {item.brand && <p style={{ margin: '6px 0' }}><b>Brand:</b> {item.brand}</p>}
              {item.stock && <p style={{ margin: '6px 0' }}><b>Stock:</b> {item.stock}</p>}
              {item.price && <p style={{ fontWeight: 700, margin: '8px 0', fontSize: '1.35rem', textAlign: 'center', width: '100%' }}>${item.price}</p>}
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 12, marginBottom: 4 }}>
                {!isInCart(`merch-${item._id}`) ? (
                  <button onClick={() => addToCart({ ...item, id: `merch-${item._id}`, type: 'merch' })} style={{ background: '#e50914', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', fontWeight: 700, cursor: 'pointer' }}>Add to Cart</button>
                ) : (
                  <div style={{display:'flex',alignItems:'center',gap:8,justifyContent:'center'}}>
                    <span style={{color:'#43ea5e',fontWeight:700}}>Added!</span>
                    <button onClick={() => decreaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginRight:4}}>-</button>
                    <span style={{fontWeight:700}}>{getQty(`merch-${item._id}`)}</span>
                    <button onClick={() => increaseQty(`merch-${item._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginLeft:4}}>+</button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
          <Link to="/merchandise" style={{ color: '#e50914', fontWeight: 700, textDecoration: 'underline', fontSize: '1.1rem' }}>View All Merchandise</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;