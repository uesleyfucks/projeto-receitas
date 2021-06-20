var express = require("express");
var path = require("path");

var app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));


app.use(express.static(path.join(__dirname,'./static')));

const dados = require("./dados/paises.json"); 
const dadosReceitas = require("./dados/receitas.json");
const dadosDescicao = require("./dados/descricaoReceita.json");

//Rotas
app.get('/', function(request, response){
    response.render("layout/template", {conteudo: "index" ,paises: dados});
});

app.get('/brasil', function(request, response){
    response.render("layout/template", {conteudo: "brasil" ,receitas: dadosReceitas});
});

app.get('/receita', function(request, response){
    response.render("layout/template", {conteudo: "receita",receitas: dadosDescicao });
});

app.get('/login', function(request, response){
    response.sendFile(path.join(__dirname, "/static/login.html"));
});

app.get('/usuarioLogado', function(request, response){
    response.sendFile(path.join(__dirname, "/static/usuarioLogado.html"));
});


app.listen(8000, function() {
    console.log('Servidor Rodando Na Porta 8000');
});