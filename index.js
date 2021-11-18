const express = require('express')
const app = express();
var jwt = require('jsonwebtoken');

//TODO: en una app real no quiero tener harcodeado mi secreto por que cuando lo pushee a github va a estar visible para todos los que tengan acceso al repo
//TODO: deberiamos sacarlo de un archivo de configuracion o de una variable del sistem
//o de docket secrets;
let secret= 'miSecreto';

const {getAll, insertOne, updateOne, deleteOne}= require('./helpers/mongo.js')

app.use(express.json());

app.get("/jwt", (req,res) => {
  let user={
    "username": "pepe@gmail.com",
    "userType": "admin",
  }

  var token = jwt.sign(user, secret );

  //A: supongamos que este token creado lo recibimos
  let tokenCreado= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBlcGVAZ21haWwuY29tIiwidXNlclR5cGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNjM3MTgyNTY1fQ.Cu4uu6nXiKITY8zWFL_x9lxeQP8qOSeDiCeEtl-_ruM";

  try {
    var decoded = jwt.verify(tokenCreado, secret);
    console.log("JWT verificado")
    console.log(decoded) // bar
  } catch (error) {
    console.log("JWT error de verificacion");
  }

  res.send({
    "message": "OK",
    "token": token
  })
})

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