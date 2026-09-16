const express = require('express');
const { getDb } = require('../models/db');

const router = express.Router();

router.get('/api/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    const db = getDb();
    const query = {};

    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ];
    }

    const results = await db.collection('gifts').find(query).sort({ createdAt: -1 }).toArray();

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Server error during search.' });
  }
});

module.exports = router;
