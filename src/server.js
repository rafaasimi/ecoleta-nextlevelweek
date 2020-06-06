const express = require("express");
const server = express();

// Pegar o banco de dados
const db = require("./database/db.js");

// Configurar pasta public
server.use(express.static("public"));

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}));

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
server.get("/", function (req, res) {
    return res.render("index.html", { title: "Um titulo" });
    // __dirname: Objeto global para pegar o diretorio atual
});

server.get("/create-point", function (req, res) {

    // Query Strings da nossa URL
    // console.log(req.query);


    return res.render("create-point.html");
    // __dirname: Objeto global para pegar o diretorio atual
});

server.post("/savepoint", function (req, res){

    // req.body: O corpo do nosso formulario
    // console.log(req.body);

    // Inserir dados no Banco de Dados
     const query = `
     INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
     ) VALUES (?,?,?,?,?,?,?);
 `

 const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.addres2,
    req.body.state,
    req.body.city,
    req.body.items
 ]

 function afterInsertData(err){
     if(err){
         console.log(err);
         return res.send("Erro no cadastro!");
     }

     console.log("Cadastrado com sucesso.");
     console.log(this);

     return res.render("create-point.html", {saved: true});
 }

 db.run(query, values, afterInsertData);
    
});



server.get("/search", function (req, res) {

    const search = req.query.search;

    if(search == ""){
        // Pesquisa vazia
        return res.render("search-results.html", { total: 0 });
    }

    // Pegar as informações do Banco de Dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err);
        }

        const total = rows.length;
        console.log("Aqui estão seus registros:");
        console.log(rows);

        // Mostrar a mágina HTML com os dados do Banco de Dados
        return res.render("search-results.html", { places: rows, total: total });
    });

    // __dirname: Objeto global para pegar o diretorio atual
});

// Ligar o servidor
server.listen(3000);