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

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GiftLink</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; }
    .container { text-align: center; color: white; padding: 40px; }
    h1 { font-size: 3.5em; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
    .tagline { font-size: 1.5em; margin-bottom: 15px; opacity: 0.95; }
    .description { font-size: 1.1em; max-width: 600px; margin: 0 auto 40px; opacity: 0.85; line-height: 1.6; }
    .btn { display: inline-block; padding: 15px 40px; background: white; color: #667eea; text-decoration: none; border-radius: 50px; font-size: 1.2em; font-weight: bold; box-shadow: 0 4px 15px rgba(0,0,0,0.2); transition: transform 0.3s, box-shadow 0.3s; }
    .btn:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.3); }
  </style>
</head>
<body>
  <div class="container">
    <h1>GiftLink</h1>
    <p class="tagline">Give what you don't need. Find what you do.</p>
    <p class="description">GiftLink connects people who want to give away household items they no longer need with people who prefer to recycle or find free items instead of purchasing new ones. Reduce waste, help others, and declutter your home.</p>
    <a href="/api/gifts" class="btn">Get Started</a>
  </div>
</body>
</html>`);
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
