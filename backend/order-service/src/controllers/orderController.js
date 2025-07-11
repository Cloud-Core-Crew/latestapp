const Order = require('../models/order.js');
const client = require('prom-client');

const orderCounter = new client.Counter({
  name: 'orders_created_total',
  help: 'Total number of orders created'
});
const orderCancelCounter = new client.Counter({
  name: 'orders_cancelled_total',
  help: 'Total number of orders cancelled'
});

const getOrders = async (req, res) => {
  try {
    let filter = { userId: req.user.id };
    if (req.query.status) {
      filter.status = req.query.status;
    }
    console.log('Order fetch filter:', filter);
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    console.log('Orders found:', orders);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
};

const addOrder = async (req, res) => {
  try {
    console.log('Order creation request:', {
      user: req.user,
      body: req.body
    });
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'User data not found in request'
      });
    }
    
    const { items, total, payment } = req.body;
    const newOrder = new Order({
      userId: req.user.id,
      items,
      total,
      payment,
      status: 'paid',
      createdAt: new Date()
    });
    await newOrder.save();
    orderCounter.inc(); // Increment order created metric
    console.log('Order created:', newOrder);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ 
      message: 'Error creating order',
      error: err.message
    });
  }
};

const cancelOrder = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'User data not found in request'
      });
    }
    
    const order = await Order.findOne({ _id: req.params.id, userId: req.user.id });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.status === 'cancelled') return res.status(400).json({ message: 'Order already cancelled' });
    order.status = 'cancelled';
    await order.save();
    orderCancelCounter.inc(); // Increment order cancelled metric
    res.json({ message: 'Order cancelled', order });
  } catch (err) {
    console.error('Order cancellation error:', err);
    res.status(500).json({ 
      message: 'Error cancelling order',
      error: err.message
    });
  }
};

module.exports = {
  getOrders,
  addOrder,
  cancelOrder
};
