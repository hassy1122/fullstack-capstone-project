const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../models/db');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'giftlink_jwt_secret_key_2024';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

function generateToken(user) {
  return jwt.sign(
    { userId: user._id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    const db = getDb();

    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);

    const token = generateToken({ _id: result.insertedId, email });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: result.insertedId,
        name,
        email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const db = getDb();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

router.put('/profile', authenticateToken, [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('email').optional().isEmail().withMessage('Valid email is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    const db = getDb();

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    if (email) {
      const existingUser = await db.collection('users').findOne({
        email,
        _id: { $ne: require('mongodb').ObjectId.createFromHexString(req.user.userId) }
      });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use by another account.' });
      }
    }

    const result = await db.collection('users').findOneAndUpdate(
      { _id: require('mongodb').ObjectId.createFromHexString(req.user.userId) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: result._id,
        name: result.name,
        email: result.email
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error during profile update.' });
  }
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
