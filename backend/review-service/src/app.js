import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import reviewRoutes from './routes/reviewRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';
import logger from './logger.js';
import client from 'prom-client';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use('/api/reviews', reviewRoutes);

// Prometheus metrics endpoint
const register = new client.Registry();
client.collectDefaultMetrics({ register });
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (req, res) => {
  res.json({
    service: 'review-service',
    status: 'ok',
    uptime: process.uptime() + 's',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5006;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Review Service running on port ${PORT}`));
  })
  .catch(err => console.error(err));
