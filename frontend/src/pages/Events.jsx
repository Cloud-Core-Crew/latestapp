import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { fetchEvents } from '../services/api';
import ReviewSection from '../components/ReviewSection';
import withAuthUser from '../components/withAuthUser.jsx';
import { Skeleton } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const Events = withAuthUser(({ user }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart, isInCart, getQty, increaseQty, decreaseQty } = useCart();
    const { theme } = useTheme();
    const cardBorderColor = theme === 'light' ? '#00F5D4' : '#b20710';

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true);
            try {
                const data = await fetchEvents();
                console.log('Fetched events:', data); // Debug log
                setEvents(data);
            } catch (err) {
                setError('Failed to load events.');
            }
            setLoading(false);
        };
        loadEvents();
    }, []);

    const handleAddToCart = (event) => {
        addToCart({ ...event, id: `event-${event._id}`, type: 'event', price: event.price });
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
        <div style={{maxWidth:'1100px',margin:'2rem auto',color:'#fff'}}>
            <h1 style={{fontSize:'2.5rem',fontWeight:900,letterSpacing:2,marginBottom:'1.5rem',color:'#e50914'}}>Events</h1>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
                gap: '2rem',
                justifyItems: 'center',
            }}>
                {events.map((event, idx) => (
                    <motion.div
                        className="carousel-item"
                        key={event._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.07 }}
                        style={{
                            width: '100%',
                            maxWidth: 320,
                            minWidth: 220,
                            borderRadius: 8,
                            boxShadow: theme === 'light' ? '0 2px 16px #00F5D420' : '0 2px 12px #9B5DE520',
                            border: `1.5px solid ${cardBorderColor}`,
                            background: theme === 'light' ? '#fff' : '#222',
                            color: theme === 'light' ? '#222' : '#fff',
                            padding: 18,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'background 0.2s, color 0.2s, border 0.2s',
                        }}
                    >
                        <div style={{fontSize:'2rem',marginBottom:4}} title="Event">🎫</div>
                        <h2 style={{color:'#e50914', fontSize:'1.2rem', marginBottom:8}}>{event.title}</h2>
                        <p style={{fontWeight:600, fontSize:'1rem'}}>{event.date ? new Date(event.date).toLocaleString() : ''}</p>
                        <p style={{fontSize:'0.95rem',marginBottom:12}}>{event.description}</p>
                        {event.imageUrl && <img src={event.imageUrl} alt={event.title} style={{width:'100%',maxWidth:180,borderRadius:8,marginBottom:8}} />}
                        {event.price && <p style={{fontWeight:700, fontSize:'1.1rem'}}>${event.price}</p>}
                        {!isInCart(`event-${event._id}`) ? (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); handleAddToCart(event); }}
                                style={{marginTop:12,background:'#e50914',color:'#fff',border:'none',borderRadius:4,padding:'0.5rem 1.5rem',fontWeight:700,cursor:'pointer', zIndex: 2}}
                                title="Add to Cart"
                            >➕ Add to Cart</button>
                        ) : (
                            <div style={{marginTop:12,display:'flex',alignItems:'center',gap:8}}>
                                <span style={{color:'#43ea5e',fontWeight:700}}>Added!</span>
                                <button onClick={() => decreaseQty(`event-${event._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginRight:4}} title="Decrease">➖</button>
                                <span style={{fontWeight:700}}>{getQty(`event-${event._id}`)}</span>
                                <button onClick={() => increaseQty(`event-${event._id}`)} style={{padding:'0.3rem 0.7rem',fontWeight:700,borderRadius:4,border:'1px solid #e50914',background:'#fff',color:'#e50914',marginLeft:4}} title="Increase">➕</button>
                            </div>
                        )}
                        <ReviewSection itemId={event._id} type="event" user={user} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
});

export default Events;