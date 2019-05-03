var express =require('express');
var socket = require('socket.io');//require socket
//App setUp
var app=express();
//creating the server
var server=app.listen(4002,function(){
console.log('Listening to the request port 4002');
})
//Static files

app.use(express.static('public'));

//socket setup
var io=socket(server);//sitting around in the backend
//what to do in the browser when a socket event occured
io.on('connection',function(socket){
    console.log('made socket connection',socket.id);
    
    socket.on('chat',function(data){

        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data)
    {
        socket.broadcast.emit('typing',data)
    });
});