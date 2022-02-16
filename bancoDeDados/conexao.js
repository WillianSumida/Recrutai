//CRIANDO CONEXÃO
async function conecta(){
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"root",
        database:"recruta"
    })
    console.log("Conexão efetuada com sucesso!");
    return con;
}  