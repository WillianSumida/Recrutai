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

//<><><><><><><> SEÇÃO USUÁRIO <><><><><><><><>
//Login
async function login(usuario){
    console.log("Validando login...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    console.log("Vou printar resultado", resultado)
    console.log("Vou printar resultado 0", resultado[0])
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

    const sql = "INSERT INTO usuario(nome,login,senha,admin) VALUES (?,?,?,?)";
    const param = [usuario.nome, usuario.login, usuario.senha, usuario.admin];
    return await conexao.query(sql,param);
}

//Alterar
async function alterarUsuario(usuario){
    console.log("Alterando usuário...");
    const conexao = await conecta();
    const[resultado] = await conexao.query("SELECT * FROM usuario WHERE id=?;",[usuario.id]);

    if (resultado.length==0){
        return "Id Inexistente!"
    }

    const sql = "UPDATE usuario SET nome=?, senha=?, admin=? WHERE id=?;";
    const param = [usuario.nome, usuario.senha, usuario.admin, usuario.id];
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
    listarUsuarios, listarUmUsuario, inserirUsuario, excluirUsuario, alterarUsuario
}