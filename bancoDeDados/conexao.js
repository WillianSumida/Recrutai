

//CRIANDO CONEXÃO
async function conecta() {
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host: "localhost",
        port: 3306,
        user: "sa",
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
    try{
        const sql = "INSERT INTO usuario(login,senha,nome,recrutador,cidade,estado,verificado,telefone) VALUES (?,?,?,?,?,?,?,?)";
        const param = [usuario.login, usuario.senha, usuario.nome, usuario.recrutador, usuario.cidade, usuario.estado, usuario.verificado, usuario.telefone];
        return await conexao.query(sql, param);
    }
    catch(erro)
    {
        return "Erro ao inserir" + erro;
    }   
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

//<><><><><><><> SEÇÃO EXPERIÊNCIAS <><><><><><><><>
//Inserir Experiência
async function inserirExperiencia(experiencia) {
    console.log("Inserindo experiência...");
    const conexao = await conecta();

    const sql = "INSERT INTO experiencia(id,candidato_usuario_id,empresa,cargo) VALUES (?,?,?,?)";
    const param = [experiencia.id, experiencia.candidato_usuario_id, experiencia.empresa,experiencia.cargo];
    return await conexao.query(sql, param);
}

//Alterar Experiência
async function alterarExperiencia(experiencia) {
    console.log("Alterando experiência...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM experiencia WHERE id=?;", [experiencia.id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    //NO FRONT, O ID DO USUÁRIO DEVE SER ESTÁTICO, NÃO PODE DEIXAR O USUÁRIO ALTERAR
    const sql = "UPDATE experiencia SET empresa=?, cargo=? WHERE id=?;";
    const param = [experiencia.empresa, experiencia.cargo, experiencia.id];
    return await conexao.query(sql, param);
}

//Excluir Experiência - Deleta a experiência em específico
async function excluirExperiencia(id) {
    console.log("Excluindo experiência...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM experiencia WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM experiencia WHERE id=?;", [id]);

}

//Listar Experiências
async function listarExperiencias(candidato_usuario_id) {
    console.log("Listando experiências...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM experiencia WHERE candidato_usuario_id=?;", [candidato_usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}

//<><><><><><><> SEÇÃO RECRUTADOR <><><><><><><><>

//Inserir Candidato
async function inserirRecrutador(recrutador) {
    console.log("Inserindo recrutador...");
    const conexao = await conecta();

    const sql = "INSERT INTO recrutador(usuario_id,empresa,cargo) VALUES (?,?,?)";
    const param = [recrutador.usuario_id, recrutador.empresa,recrutador.cargo];
    return await conexao.query(sql, param);
}


//Alterar Recrutador
async function alterarRecrutador(recrutador) {
    console.log("Alterando recrutador...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM recrutador WHERE usuario_id=?;", [recrutador.usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    const sql = "UPDATE recrutador SET empresa=?, cargo=? WHERE usuario_id=?;";
    const param = [recrutador.empresa, recrutador.cargo, recrutador.usuario_id];
    return await conexao.query(sql, param);
}

//Excluir Recrutador
async function excluirRecrutador(usuario_id) {
    console.log("Excluindo recrutador...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM recrutador WHERE usuario_id=?;", [usuario_id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM usuario WHERE id=?;", [usuario_id]);

}

//Listar Todos Recrutadores
async function listarRecrutadores() {
    console.log("Listando recrutadores...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM recrutador");
    return resultado;
}

//Listar Um Recrutador
async function listarUmRecrutador(usuario_id) {
    console.log("Listando recrutador...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM recrutador WHERE usuario_id=?;", [usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}


//<><><><><><><> SEÇÃO VAGA <><><><><><><><>
//Inserir Vaga
async function inserirVaga(vaga) {
    console.log("Inserindo vaga...");
    const conexao = await conecta();

    const sql = "INSERT INTO vaga(cargo,descricao,salario,tipo,tag1,tag2,tag3,cidade,estado,ativo,quantidade,recrutador_usuario_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    const param = [vaga.cargo,vaga.descricao,vaga.salario,vaga.tipo,vaga.tag1,vaga.tag2,vaga.tag3,vaga.cidade,vaga.estado,vaga.ativo,vaga.quantidade,vaga.recrutador_usuario_id];
    return await conexao.query(sql, param);
}

//Alterar Vaga
async function alterarVaga(vaga) {
    console.log("Alterando vaga...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vaga WHERE id=?;", [vaga.id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    const sql = "UPDATE vaga SET cargo=?, descricao=?,salario=?,tipo=?,tag1=?,tag2=?,tag3=?,cidade=?,estado=?,ativo=?,quantidade=?,recrutador_usuario_id=? WHERE id=?;";
    const param = [vaga.cargo, vaga.descricao,vaga.salario,vaga.tipo,vaga.tag1,vaga.tag2,vaga.tag3,vaga.cidade,vaga.estado,vaga.ativo,vaga.quantidade,vaga.recrutador_usuario_id, vaga.id];
    return await conexao.query(sql, param);
}

//Excluir Vaga
async function excluirVaga(id) {
    console.log("Excluindo vaga...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vaga WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM vaga WHERE id=?;", [id])
}

//Listar Todas Vagas
async function listarVagas() {
    console.log("Listando vagas...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vaga");
    return resultado;
}

//Listar Uma Vaga
async function listarUmaVaga(id) {
    console.log("Listando vaga...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM vaga WHERE id=?;", [id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}

//<><><><><><><> SEÇÃO PROCESSO <><><><><><><><>
//Inserir Processo
async function inserirProcesso(processo) {
    console.log("Inserindo processo...");
    const conexao = await conecta();

    const sql = "INSERT INTO processo(candidato_usuario_id,recrutador_usuario_id,vaga_id,contato,devolutiva) VALUES (?,?,?,?,?)";
    const param = [processo.candidato_usuario_id,processo.recrutador_usuario_id,processo.vaga_id, processo.contato, processo.devolutiva];
    return await conexao.query(sql, param);
}

//Alterar Processo
async function alterarProcesso(processo) {
    console.log("Alterando processo...");
    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM processo WHERE candidato_usuario_id =? and recrutador_usuario_id =? and vaga_id =?;", [processo.candidato_usuario_id, processo.recrutador_usuario_id, processo.vaga_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    const sql = "UPDATE processo SET contato=?, devolutiva=? WHERE candidato_usuario_id =? and recrutador_usuario_id =? and vaga_id=?;";
    const param = [processo.contato, processo.devolutiva, processo.candidato_usuario_id,processo.recrutador_usuario_id, processo.vaga_id];
    return await conexao.query(sql, param);
}

//Listar Processo Candidato
async function listarProcessosCandidato(candidato_usuario_id) {
    console.log("Listando processo do candidato...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM processo WHERE candidato_usuario_id=?;", [candidato_usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}
//Listar Processo Recrutador
async function listarProcessosRecrutador(recrutador_usuario_id) {
    console.log("Listando processos do recrutador...");

    const conexao = await conecta();
    const [resultado] = await conexao.query("SELECT * FROM processo WHERE recrutador_usuario_id=?;", [recrutador_usuario_id]);

    if (resultado.length == 0) {
        return "Id Inexistente!"
    }

    return resultado[0];
}

module.exports = {
    login,
    listarUsuarios, listarUmUsuario, inserirUsuario, excluirUsuario,
    listarCandidatos, listarUmCandidato, inserirCandidato, excluirCandidato, alterarCandidato,
    listarVagas, listarUmaVaga, inserirVaga, excluirVaga, alterarVaga,
    listarUmRecrutador, listarRecrutadores, inserirRecrutador, excluirRecrutador, alterarRecrutador,
    listarExperiencias, inserirExperiencia, excluirExperiencia, alterarExperiencia,
    listarProcessosCandidato, listarProcessosRecrutador, inserirProcesso, alterarProcesso
}