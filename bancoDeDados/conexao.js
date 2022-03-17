//CRIANDO CONEXÃO
async function conecta() {
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "recruta"
    })
    console.log("Conexão efetuada com sucesso!");
    return con;
}

//<><><><><><><> SEÇÃO USUÁRIO <><><><><><><><>
//Login
async function login(usuario) {
    console.log("Validando login...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    return resultado[0];
}

//Inserir 
async function inserirUsuario(usuario) {
    console.log("Inserindo usuário...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE login =?;", [usuario.login]);

    if (resultado.length > 0) {
        return "Login previamente cadastrado!"
    }

    const sql = "INSERT INTO usuario(login,senha,nome,recrutador,cidade,estado,verificado,telefone) VALUES (?,?,?,?,?,?,?,?)";
    const param = [usuario.login, usuario.senha, usuario.nome, usuario.recrutador, usuario.cidade, usuario.estado, usuario.verificado, usuario.telefone];
    return await conexao.query(sql, param);
}

//Excluir
async function excluirUsuario(id) {
    console.log("Excluindo usuário...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM usuario WHERE id=?", [id]);
}

//Listar Todos
async function listarUsuarios() {
    console.log("Listando usuários...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario");
    return resultado;
}

//Listar Um 
async function listarUmUsuario(id) {
    console.log("Listando usuário...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM usuario WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}

/*
//<><><><><><><> SEÇÃO VAGAS <><><><><><><><>
//Inserir Vagas
async function inserirVagas(vagas) {
    console.log("Inserindo vagas...");
    const conexao = await conecta();

    const sql = "INSERT INTO vagas(recrutador_id,nome_recrutador,empresa,informacoes,localidade,salario,interesse) VALUES (?,?,?,?,?,?,?)";
    const param = [vagas.recrutador_id, vagas.nome_recrutador, vagas.empresa, vagas.informacoes, vagas.localidade, vagas.salario, vagas.interesses];
    return await conexao.query(sql, param);
}

//Alterar Vagas
async function alterarVagas(vagas) {
    console.log("Alterando vagas...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vagas WHERE id=?;", [vagas.id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    const sql = "UPDATE vagas SET empresa=?, informacoes=?, localidade=?, salario=?, interesse=? WHERE id=?;";
    const param = [vagas.empresa, vagas.informacoes, vagas.localidade, vagas.salario, vagas.interesses, vagas.id];
    return await conexao.query(sql, param);
}

//Excluir Vagas
async function excluirVagas(id) {
    console.log("Excluindo vagas...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vagas WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM vagas WHERE id=?", [id]);
}

//Listar Todas as Vagas
async function listarTodasVagas(user_id) {
    console.log("Listando todos as vagas do recrutador com id: " + user_id);
    const conexaoAtiva = await conecta();

    const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [user_id]);

    if (resultado.length == 0) {
        return "Não existe usuário com o ID informado!"
    }

    const [resultado2] = await conexaoAtiva.query("SELECT * FROM vagas WHERE id_recrutador=?;", [user_id]);

    return resultado2;
}

//Listar Uma vagas
async function listarUmaVagas(id) {
    console.log("Listando vagas...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vagas WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}

//<><><><><><><> SEÇÃO PERFIL CANDIDATO <><><><><><><><>
    //Inserir Perfil
    async function inserirPerfil(perfil) {
        console.log("Inserindo perfil...");
        const conexao = await conecta();

        const sql = "INSERT INTO perfil(id_candidato,nome,descricao,formacao,email,localidade,interesse) VALUES (?,?,?,?,?,?,?)";
        const param = [perfil.id_candidato, perfil.nome, perfil.descricao, perfil.formacao, perfil.email, perfil.localidade, perfil.interesse];
        return await conexao.query(sql, param);
    }

    //Alterar Vagas
    async function alterarPerfil(perfil) {
        console.log("Alterando perfil...");
        const conexao = await conecta();
        const [resultado] = await conexao.query("SELECT * FROM perfil WHERE id=?;", [perfil.id]);

        if (resultado.length == 0) {
            return "Id Inexistente!"
        }

        const sql = "UPDATE perfil SET descricao=?,formacao=?,email=?,localidade=?,interesse=? WHERE id=?;";
        const param = [perfil.descricao, perfil.formacao, perfil.email, perfil.localidade, perfil.interesse];
        return await conexao.query(sql, param);
    }

    //Excluir Perfil
    async function excluirPerfil(id) {
        console.log("Excluindo perfil...");
        const conexao = await conecta();
        const [resultado] = await conexao.query("SELECT * FROM perfil WHERE id=?;", [id]);

        if (resultado.length == 0) {
            return "Id inexistente!"
        }

        return await conexao.query("DELETE FROM perfil WHERE id=?", [id]);
    }

    //Listar O Perfil do Candidato 
    async function listarPerfil(user_id) {
        console.log("Listando todos o perfil do candidato: " + user_id);
        const conexaoAtiva = await conecta();

        const [resultado] = await conexaoAtiva.query("SELECT * FROM usuario WHERE id=?;", [user_id]);

        if (resultado.length == 0) {
            return "Não existe usuário com o ID informado!"
        }

        const [resultado2] = await conexaoAtiva.query("SELECT * FROM perfil WHERE id_candidato=?;", [user_id]);

        return resultado2;
    }
*/

module.exports = {
    login,
    listarUsuarios, listarUmUsuario, inserirUsuario, excluirUsuario,
    //listarUmaVagas, listarTodasVagas, inserirVagas, excluirVagas, alterarVagas,
    //listarPerfil, inserirPerfil, excluirPerfil, alterarPerfil
}