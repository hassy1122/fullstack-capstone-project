require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftlink';

async function seedDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('giftlink');

    const seedData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seed.json'), 'utf8'));

    const giftsWithDates = seedData.map(item => ({
      ...item,
      userId: 'seed-user',
      createdAt: new Date()
    }));

    const result = await db.collection('gifts').insertMany(giftsWithDates);

    console.log(`Successfully inserted ${result.insertedCount} documents into MongoDB`);
    console.log('Inserted item IDs:');
    for (const [key, value] of Object.entries(result.insertedIds)) {
      console.log(`  ${key}: ${value}`);
    }

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

seedDatabase();
