const { MongoClient } = require("mongodb");
const fs = require("fs");

const { DATABASE_NAME, COLLECTION_NAME } = require("./config/mongodb.json");
console.log('DATABASE_NAME: ', DATABASE_NAME, 'COLLECTION_NAME: ', COLLECTION_NAME);

const uri = "mongodb://localhost:27017?writeConcern=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// INPUTs
// const array = JSON.parse(fs.readFileSync('filename.extension', 'utf8'));

async function run() {
  try {
    await client.connect();
    const db = client.db(DATABASE_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // await find(collection);
    
  } finally {
    await client.close();
  }
}

async function find(collection) {
  const response = await collection.findOne();
  console.log(response);
}

run().catch(console.dir);
