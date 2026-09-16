require('dotenv').config();
const natural = require('natural');
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db');
const giftRoutes = require('./giftRoutes');
const searchRoutes = require('./searchRoutes');
const authRoutes = require('./authRoutes');

const tokenizer = new natural.WordTokenizer();
const TfIdf = natural.TfIdf;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use(giftRoutes);
app.use(searchRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'GiftLink API is running' });
});

app.get('/api/health', async (req, res) => {
  try {
    const db = await connectToDatabase();
    await db.command({ ping: 1 });
    res.json({ status: 'healthy', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', database: 'disconnected' });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

if (require.main === module) {
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`GiftLink server running on port ${PORT}`);
    });
  });
}

module.exports = app;
