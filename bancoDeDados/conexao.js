//CRIANDO CONEXÃO
async function conecta(){
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host:"localhost",
        port:3306,
        user:"sa",
        password:"root",
        database:"recruta"
    })
    console.log("Conexão efetuada com sucesso!");
    return con;
}  

//<><><><><><><> SEÇÃO USUÁRIO <><><><><><><><>
//Login
async function login(usuario){
    console.log("Validando login...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    return resultado[0];
}

//Inserir 
async function inserirUsuario(usuario){
    console.log("Inserindo usuário...");
    const conexao = await conecta();
    const[resultado] = await conexao.query("SELECT * FROM usuario WHERE login =?;", [usuario.login]);
    
    if(resultado.length>0){
        return "Login previamente cadastrado!"
    }

    const sql = "INSERT INTO usuario(nome,login,senha,candidato_recrutador) VALUES (?,?,?,?)";
    const param = [usuario.nome, usuario.login, usuario.senha, usuario.candidato_recrutador];
    return await conexao.query(sql,param);
}

//Excluir
async function excluirUsuario(id){
    console.log("Excluindo usuário...");
    const conexao = await conecta();
    const[resultado] = await conexao.query("SELECT * FROM usuario WHERE id=?;", [id]);

    if(resultado.length==0){
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM usuario WHERE id=?",[id]);
}

//Listar Todos
async function listarUsuarios(){
    console.log("Listando usuários...");
    const conexao = await conecta();
    const[resultado] = await conexao.query("SELECT * FROM usuario");
    return resultado; 
}

//Listar Um 
async function listarUmUsuario(id){
    console.log("Listando usuário...");

    const conexao = await conecta();
    const[resultado] = await conexao.query("SELECT * FROM usuario WHERE id=?;",[id]);

    if(resultado.length==0){
        return "Id Inexistente!"
    }

    return resultado[0];
}

module.exports = { login,
    listarUsuarios, listarUmUsuario, inserirUsuario, excluirUsuario
}