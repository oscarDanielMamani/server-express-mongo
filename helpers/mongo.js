const { MongoClient, ObjectId } = require('mongodb');

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

async function insertMany(collectionName, items) {
  let db= await mongoClientGet();
  const collection = db.collection(collectionName);

  const insertResult = await collection.insertMany(items);
  console.log('Inserted documents =>', insertResult);
  return insertResult;
}

async function insertOne(collectionName, item){
  return await insertMany(collectionName, [item])
}

async function deleteOne(collectionName, itemId){
  let db= await mongoClientGet();
  const collection = db.collection(collectionName);

  const deleteResult= await collection.deleteOne({_id: ObjectId(itemId)});
  console.log("document deleted: " + itemId)
  console.log(deleteResult)
  return deleteResult;
}

async function updateOne(collectionName, itemId, itemUpdated){
  let db= await mongoClientGet();
  const collection = db.collection(collectionName);

  const updateResult= await collection.updateOne({_id: ObjectId(itemId)}, {$set: itemUpdated});
  console.log("document updated: " + itemId);
  console.log(updateResult);
  return updateResult;
}

async function getAll(collectionName){
  let db= await mongoClientGet();
  const collection = db.collection(collectionName);

  const findResult = await collection.find().toArray();
  // console.log('Found documents =>', findResult);
  return findResult;
}

module.exports={
  insertMany,
  insertOne,
  deleteOne,
  updateOne,
  getAll
}

////DESCOMENTAR PARA TESTEAR LOS METODOS, podes correr este archivo con "node helpers/mongo.js" desde tu consola

/*
async function test(){
  await insertMany("productos", [{name: "escoba"}, {username: "limpia horno"}]);
  await insertMany("materias", [{name: "matematica"}, {name: "lengua", docente: "federico"}])
  await insertMany("materias", [{name: "literatura"}, {name: "quimica", docente: "gaston"}])

  await insertOne("materias", {name: "ED fisica", docente: "ramirez"});

  await deleteOne("materias", "618c2b23c63871828247582e");

  await updateOne("materias", "618c2bfad88211a826fc3445", {name: "educacion fisica"});

  console.log(await getAll("materias"));
}
test();
*/