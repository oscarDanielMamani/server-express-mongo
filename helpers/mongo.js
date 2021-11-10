const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'express-server';
var db= null;

async function mongoClientGet(){
  // Use connect method to connect to the server
  if(db) return db;
  else{
    console.log("creating db")
  }

  await client.connect();
  console.log('Connected successfully to server');
  db = client.db(dbName);
  return db;
}

async function insertMany(collectioName, items) {
  let db= await mongoClientGet();
  const collection = db.collection(collectioName);

  const insertResult = await collection.insertMany(items);
  console.log('Inserted documents =>', insertResult);

  // the following code examples can be pasted here...
  return 'done.';
}

// insertMany("users", [{username: "daniel"}, {username: "jorge"}])
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

async function main(){
  await insertMany("productos", [{name: "escoba"}, {username: "limpia horno"}]);
  await insertMany("materias", [{name: "matematica"}, {username: "lengua", docente: "federico"}])
  await insertMany("materias", [{name: "matematica"}, {username: "lengua", docente: "federico"}])
}


main();