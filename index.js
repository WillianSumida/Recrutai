var express = require('express');
var app = express();
const consing = require('consign');

app.use(express.urlencoded({extended: true}));

consing()
.include('.rotas/rotas.js')
.into(app)

app.listen(8080, function() {
    console.log("Rodando na porta 8080");
})