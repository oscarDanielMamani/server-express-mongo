const express = require('express')
const app = express();

const {getAll, insertOne, updateOne, deleteOne}= require('./helpers/mongo.js')

app.use(express.json());

app.get('/notes', async(req,res)=>{
  res.send(
    await getAll("notes")
  )
})

app.post('/notes', async(req, res)=>{
  let note= req.body;
  //TODO: agregar validaciones para la nota

  let result= await insertOne("notes", note);
  res.send({
    message: "OK",
    result: result
  })
})

app.put('/notes/:noteId', async(req,res)=>{
  let noteId= req.params.noteId;

  let noteUpdated= req.body;

  let updateResult= await updateOne("notes", noteId, noteUpdated);
  res.send({
    message: "OK",
    result: updateResult
  })
})

app.delete('/notes/:noteId', async(req,res)=>{
  let noteId= req.params.noteId;
  let deleteResult= await deleteOne("notes", noteId)
  res.send({
    message: "OK",
    result: deleteResult
  })
})

PORT= process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log("Server listening in port " + PORT)
})