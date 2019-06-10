
const express = require('express');
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
//public folder meesturen 
app.use(express.static('public'));


//wat client ziet op de slash 
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//verbinden met socket client
io.on('connection', function(socket){
  console.log("de socket is geconnecteerd")
  //Voor Live editor
  socket.on('onderwerpNaarServer',(msg)=>{
    //Doe ieeeeets!!! réééééééééééééééééééééééééééé
    console.log(msg);   
  });
});

//Om te verzenden naar client
io.on('connection',(socket)=>{
  socket.on('onderwerpNaarServer', function(msg){
    var bericht = {"tekst" : "tu es sure?"}
      io.emit('onderwerpNaarClient',bericht);    
  });  
});

http.listen(3000, function(){
  console.log('listening on *:3000');  
});