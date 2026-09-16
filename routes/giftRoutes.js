const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../models/db');
const { authenticateToken } = require('./authRoutes');

const router = express.Router();

router.get('/api/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('gifts').find({}).sort({ createdAt: -1 }).toArray();
    res.json(gifts);
  } catch (error) {
    console.error('Error fetching gifts:', error);
    res.status(500).json({ error: 'Server error fetching gifts.' });
  }
});

router.get('/api/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid gift ID format.' });
    }

    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found.' });
    }

    res.json(gift);
  } catch (error) {
    console.error('Error fetching gift:', error);
    res.status(500).json({ error: 'Server error fetching gift.' });
  }
});

router.post('/api/gifts', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { title, description, category, condition, location, imageUrl } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Title, description, and category are required.' });
    }

    const newGift = {
      title,
      description,
      category,
      condition: condition || 'Good',
      location: location || '',
      imageUrl: imageUrl || '',
      userId: req.user.userId,
      createdAt: new Date(),
      comments: []
    };

    const result = await db.collection('gifts').insertOne(newGift);

    res.status(201).json({
      message: 'Gift listed successfully',
      gift: { ...newGift, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating gift:', error);
    res.status(500).json({ error: 'Server error creating gift.' });
  }
});

router.delete('/api/gifts/:id', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid gift ID format.' });
    }

    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(id) });

    if (!gift) {
      return res.status(404).json({ error: 'Gift not found.' });
    }

    if (gift.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this gift.' });
    }

    await db.collection('gifts').deleteOne({ _id: new ObjectId(id) });

    res.json({ message: 'Gift deleted successfully' });
  } catch (error) {
    console.error('Error deleting gift:', error);
    res.status(500).json({ error: 'Server error deleting gift.' });
  }
});

router.post('/api/gifts/:id/comments', authenticateToken, async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Comment text is required.' });
    }

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid gift ID format.' });
    }

    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(id) });
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found.' });
    }

    const newComment = {
      _id: new ObjectId(),
      text,
      userId: req.user.userId,
      userEmail: req.user.email,
      createdAt: new Date()
    };

    await db.collection('gifts').updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: newComment } }
    );

    res.status(201).json({
      message: 'Comment added successfully',
      comment: newComment
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Server error adding comment.' });
  }
});

module.exports = router;
