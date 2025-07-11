const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const orderRoutes = require('./routes/orderRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const logger = require('./logger');
const client = require('prom-client');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(authMiddleware);

app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });

app.use('/api/orders', orderRoutes);

// Prometheus metrics endpoint
const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (req, res) => {
  res.json({
    service: 'order-service',
    status: 'ok',
    uptime: process.uptime() + 's',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use((err, req, res, next) => { logger.error(err.stack); res.status(500).send('Something broke!'); });

const PORT = process.env.PORT || 5004;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
  })
  .catch(err => console.error(err));
