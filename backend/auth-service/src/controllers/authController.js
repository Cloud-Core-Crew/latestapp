const User = require('../models/user_new');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async function(req, res) {
    try {
        console.log('Register endpoint hit:', req.body);
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.error('Missing required fields');
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully');

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword
        });

        console.log('Saving new user:', newUser);
        await newUser.save();
        console.log('User saved successfully');
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err);
        
        if (err.code === 11000) {
            const field = Object.keys(err.keyValue)[0];
            return res.status(409).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists` });
        }

        return res.status(500).json({ 
            message: 'Error saving user', 
            error: err.message 
        });
    }
};

// User login
exports.login = function(req, res) {
    console.log('Login endpoint hit:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        console.error('Missing required fields');
        return res.status(400).json({ message: 'Missing required fields' });
    }

    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Error logging in' });
        }
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Found user:', user);
        user.comparePassword(password, function(err, isMatch) {
            if (err) {
                console.error('Password comparison error:', err);
                return res.status(500).json({ message: 'Error logging in' });
            }
            if (!isMatch) {
                console.log('Invalid credentials');
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            console.log('Login successful, generating token');
            res.status(200).json({ 
                token, 
                user: { id: user.id, username: user.username, email: user.email, createdAt: user.createdAt }
            });
        });
    });
};

// User logout
exports.logoutUser = function(req, res) {
    // For JWT, logout is handled client-side by deleting the token.
    // This endpoint exists for frontend compatibility.
    res.status(200).json({ message: 'Logged out successfully' });
};

// Export with correct names for routes
exports.registerUser = exports.register;
exports.loginUser = exports.login;