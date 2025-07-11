var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var dotenv = require('dotenv');
var authRoutes = require('./routes/authRoutes');
const logger = require('./logger');
const client = require('prom-client');

dotenv.config();

console.log('Starting auth service...');
console.log('Environment variables:', {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT
});

var app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    next();
});

const mongoUri = process.env.MONGO_URI.replace(/@/g, '%40');
console.log('Connecting to MongoDB with URI:', mongoUri);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function() {
        console.log('MongoDB connected successfully');
    })
    .catch(function(err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Create a Registry and collect default metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Routes
app.use('/api/auth', authRoutes);

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});

// Health check
app.get('/health', function(req, res) {
    console.log('Health check requested');
    res.json({
        service: 'auth-service',
        status: 'ok',
        uptime: process.uptime() + 's',
        db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Auth service error:', err);
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

// Handle 404 errors
app.use((req, res) => {
    console.error('404 Not Found:', req.method, req.url);
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource could not be found'
    });
});

var PORT = 5001; // Explicitly set port to 5001
app.listen(PORT, function() {
    console.log('Auth service running on port ' + PORT);
});