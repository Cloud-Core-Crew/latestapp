const express = require('express');
const cors = require('cors');
const storageRoutes = require('./routes/storageRoutes');
const logger = require('./logger');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });

// Routes
app.use('/api/storage', storageRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Storage service running on port ${PORT}`);
});

module.exports = app;