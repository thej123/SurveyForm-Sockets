var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static(path.join(__dirname, "./static")));
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname,'./views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
})

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    
    socket.on('posting_from', function (data) {
        console.log(data.data)
        var random = Math.floor(Math.random() * 1000)+1;
        var sentence = `Your luck number emitted by the server is ${random}`
        console.log(sentence)
        var sentence2 = `You emitted the following information to the server: { name: '${data.data.name}', location:
        '${data.data.location}', language: '${data.data.language}', comment: '${data.data.comment}'}`
        socket.emit('random number', {data: sentence, data2: sentence2});
        // var sentence2 = `You emitted the following information to the server: { name: '${data.data.name}', location:
        //  '${data.data.location}', language: '${data.data.language}', comment: '${data.data.comment}'}`
        // console.log(sentence2)
        //socket.emit('updated message', {data: sentence2});
    })
})