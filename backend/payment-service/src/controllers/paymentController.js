import Payment from '../models/payment.js';

export const getPayments = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const payments = await Payment.find({ userId });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
};

export const addPayment = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { orderId, amount } = req.body;
    const payment = new Payment({ userId, orderId, amount, status: 'success' });
    await payment.save();
    res.json({ message: 'Payment simulated', payment });
  } catch (err) {
    res.status(500).json({ message: 'Failed to simulate payment' });
  }
};
