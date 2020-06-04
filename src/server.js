const express = require("express");
const server = express();

// Configurar pasta public
server.use(express.static("public"));

// Utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true, // Para não usar cache no ambiente de desenvolvimento
});

// Configurar caminhos da aplicação
// Página Inicial
// Req: Requisição
// Res: Resposta
server.get("/", function(req, res){
    return res.render("index.html", {title: "Um titulo"});
    // __dirname: Objeto global para pegar o diretorio atual
});

server.get("/create-point", function(req, res){
    return res.render("create-point.html");
    // __dirname: Objeto global para pegar o diretorio atual
});

server.get("/search", function(req, res){
    return res.render("search-results.html");
    // __dirname: Objeto global para pegar o diretorio atual
});

// Ligar o servidor
server.listen(3000);