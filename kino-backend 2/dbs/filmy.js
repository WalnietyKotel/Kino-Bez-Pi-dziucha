const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url)

const dbName = 'filmy';

async function connect() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = await client.db(dbName);
    return db;
}

module.exports = connect
