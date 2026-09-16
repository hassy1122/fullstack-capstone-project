const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/giftlink';
let client;
let db;

async function connectToDatabase() {
  if (db) return db;

  try {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('giftlink');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

function getDb() {
  if (!db) throw new Error('Database not initialized. Call connectToDatabase() first.');
  return db;
}

function getClient() {
  return client;
}

async function closeConnection() {
  if (client) {
    await client.close();
    db = null;
    console.log('MongoDB connection closed');
  }
}

module.exports = { connectToDatabase, getDb, getClient, closeConnection };
