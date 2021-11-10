const express = require('express')
const app = express();

app.use(express.json());
 
app.get('/user', function (req, res) {
  res.send({
    "message": "Hola mundo",
    "result": "ERROR"
  })
})

app.post('/user', function(req,res){
  let headers= req.headers;
  let body= req.body;

  let query= req.query;

  // console.log(headers);
  console.log(body);
  console.log(query)
  res.send({
    "message": "Hola desde post",
    "result": "ERROR"
  })
})

app.put('/user', function(req,res){
  res.send({
    "message": "Hola desde put",
    "result": "ERROR"
  })
})

app.delete('/user/:userId/foto/:fotoId', function(req,res){
  let params= req.params;
  console.log(params)
  res.send({
    "message": "Hola desde delete",
    "result": "ERROR"
  })
})

app.listen(3000, ()=>{
  console.log("Server listening in port 3000")
})