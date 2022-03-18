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

//<><><><><><><> SEÇÃO CANDIDATO <><><><><><><><>
//Inserir Candidato
async function inserirCandidato(candidato) {
    console.log("Inserindo candidato...");
    const conexao = await conecta();

    const sql = "INSERT INTO candidato(usuario_id,grau_formacao,instituicao_ensino,tag1,tag2,tag3,idade,portfolio) VALUES (?,?,?,?,?,?,?,?)";
    const param = [candidato.usuario_id, candidato.grau_formacao,candidato.instituicao_ensino,candidato.tag1,candidato.tag2,candidato.tag3,candidato.idade,candidato.portfolio];
    return await conexao.query(sql, param);
}

//Alterar Candidato
async function alterarCandidato(candidato) {
    console.log("Alterando candidato...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM candidato WHERE usuario_id=?;", [candidato.usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    const sql = "UPDATE candidato SET grau_formacao=?, instituicao_ensino=?, tag1=?, tag2=?, tag3=?, idade=?, portfolio=? WHERE usuario_id=?;";
    const param = [candidato.grau_formacao, candidato.instituicao_ensino, candidato.tag1, candidato.tag2, candidato.tag3, candidato.idade, candidato.portfolio, candidato.usuario_id];
    return await conexao.query(sql, param);
}

//Excluir Candidato
async function excluirCandidato(usuario_id) {
    console.log("Excluindo candidato...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM candidato WHERE usuario_id=?;", [usuario_id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM candidato WHERE usuario_id=?;", [usuario_id]);

}

//Listar Todos Candidatos
async function listarCandidatos() {
    console.log("Listando candidatos...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM candidato");
    return resultado;
}

//Listar Um Candidato
async function listarUmCandidato(usuario_id) {
    console.log("Listando candidato...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM candidato WHERE usuario_id=?;", [usuario_id]);

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
    listarCandidatos, listarUmCandidato, inserirCandidato, excluirCandidato, alterarCandidato
    //listarUmaVagas, listarTodasVagas, inserirVagas, excluirVagas, alterarVagas,
    //listarPerfil, inserirPerfil, excluirPerfil, alterarPerfil
}