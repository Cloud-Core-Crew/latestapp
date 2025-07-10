const express = require('express');
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const jwtMiddleware = require('../middleware/jwtMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', jwtMiddleware, (req, res) => {
  if (!req.user) {
    console.error('User not found for token:', req.userId);
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log('Returning user profile for:', req.user.username);
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    createdAt: req.user.createdAt,
  });
});

module.exports = router;