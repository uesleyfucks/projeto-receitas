var express = require("express");
var path = require("path");

var app = express();

app.use(express.static(path.join(__dirname,'./static')));

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname, './static/index.html'))
});

app.listen(8000, function() {
    console.log('Servidor Rodando Na Porta 8000');
});