const express = require('express');
const cors = require('cors');
const httpProxy = require('express-http-proxy');
const logger = require('./logger');
const client = require('prom-client');

const app = express();
const register = new client.Registry();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add logging middleware
app.use((req, res, next) => {
    logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Proxy configuration
const authProxy = httpProxy('http://localhost:5001', {
    proxyReqPathResolver: (req) => '/api/auth' + req.url,
    onError: (err, req, res) => {
        console.error('Auth proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to auth service'
        });
    }
});

const ordersProxy = httpProxy('http://localhost:5004', {
    proxyReqPathResolver: (req) => '/api/orders' + req.url,
    onError: (err, req, res) => {
        console.error('Orders proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to orders service'
        });
    }
});

const eventsProxy = httpProxy('http://localhost:5002', {
    proxyReqPathResolver: (req) => req.originalUrl, // Forward full /api/events path
    onError: (err, req, res) => {
        console.error('Events proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to events service'
        });
    }
});

const merchProxy = httpProxy('http://localhost:5003', {
    proxyReqPathResolver: (req) => req.originalUrl, // Forward full /api/merch path
    onError: (err, req, res) => {
        console.error('Merch proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to merch service'
        });
    }
});

const reviewsProxy = httpProxy('http://localhost:5006', {
    proxyReqPathResolver: (req) => req.originalUrl, // Forward full /api/reviews path
    onError: (err, req, res) => {
        console.error('Reviews proxy error:', err);
        res.status(502).json({
            error: 'Service unavailable',
            message: 'Failed to connect to review service'
        });
    }
});

// Routes
app.use('/api/auth', authProxy);
app.use('/api/orders', ordersProxy);
app.use('/api/events', eventsProxy);
app.use('/api/merch', merchProxy);
app.use('/api/reviews', reviewsProxy);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Gateway error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

client.collectDefaultMetrics({ register });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway is running on port ${PORT}`);
});

module.exports = app;