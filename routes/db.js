const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        db = client.db('miniblog');
    }
    return db;
}

module.exports = connectDB;
