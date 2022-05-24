const { body, validationResult } = require("express-validator");
const fetch = require("node-fetch");
const cors = require("cors");
const banco = require("../bancoDeDados/conexao");
const { filter } = require("lodash");

module.exports = app => {

    //Página Inicial
    app.post("/login", app.configuracao.autenticacao.login)
    app.post(".validateToken", app.configuracao.autenticacao.validaChave)
    app.use(cors());

    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO USUÁRIO<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Criando Usuário - Recrutador 1 e Candidato 0 
    app.route("/adicionarUsuario").post([
        body("login", "*Obrigatório ser o e-mail").trim().isLength({ min: 6, max: 100 }),
        body("senha", "Senha deve ter entre 6 e 8 caracteres").trim().isLength({ min: 6, max: 8 }),
        body("nome", "*Obrigatório").trim().isLength({ min: 2, max: 100 }),
        body("recrutador").trim(),
    ],
        async (req, res) => {
            const erro = validationResult(req);
            const retorno = null

            if (!erro.isEmpty()) {
                res.status(400).send(erro.array())
            } else {
                try {
                    const resultado = await banco.inserirUsuario({
                        login: req.body.login,
                        senha: req.body.senha,
                        nome: req.body.nome,
                        recrutador: req.body.recrutador,
                        localizacao: '',
                        verificado: 0,
                        telefone: ''
                    });
                    if (resultado == "Login previamente cadastrado!") {
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    }
                } catch {
                    retorno = ({ 'error': true, 'mensagem': 'Cadastro não realizado!' })
                }
                res.send(retorno);
            }
        });

    //Excluindo Usuário
    app.route("/excluirUsuario/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {

            const retorno = null;

            if (req.params.id) {
                try {
                    const resultado = await banco.excluirUsuario(req.params.id);
                    resultado = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    resultado = ({ 'error': true, 'mensagem': 'Falha ao exluir usuário!' })
                }
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
                res.send(retorno);
            }
        });

    //Listar Todos os Usuários
    app.route("/listarUsuarios")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const retorno = null;
            try {
                const resultado = await banco.listarUsuarios();
                retorno = ({ 'error': false, 'mensagem': resultado })
            } catch {
                retorno = ({ 'error': true, 'mensagem': 'Falha ao listar usuários!' })
            }
            res.send(retorno);
        });

    //Listar Um Usuário
    app.route("/listarUmUsuario/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const retorno = null;

            if (req.params.id) {
                try {
                    const resultado = await banco.listarUmUsuario(req.params.id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': 'Usuário não existente!' })
                }
            } else {
                res.send("Id Inexistente!")
            }
            res.send(retorno)
        });

    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO CANDIDATO<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Perfil
    app.route("/adicionarCandidato")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("usuario_id").trim().isLength({ min: 1 }),
            body("localizacao").trim().isLength({ min: 2, max: 100 }),
            body("telefone").trim().isLength({ min: 8, max: 16 }),
            body("grau_formacao").trim().isLength({ min: 2, max: 100 }),
            body("instituicao_ensino").trim().isLength({ min: 2, max: 100 }),
            body("tag1").trim().isLength({ min: 0, max: 100 }),
            body("tag2").trim().isLength({ min: 0, max: 100 }),
            body("tag3").trim().isLength({ min: 0, max: 100 }),
            body("data").trim().isLength({ min: 1, max: 10 }),
            body("portfolio").trim().isLength({ min: 1, max: 100 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.inserirCandidato({
                            usuario_id: req.body.usuario_id,
                            portfolio: req.body.portfolio,
                            grau_formacao: req.body.grau_formacao,
                            instituicao_ensino: req.body.instituicao_ensino,
                            tag1: req.body.tag1,
                            tag2: req.body.tag2,
                            tag3: req.body.tag3,
                            data: req.body.data,
                        });
                        const resultado2 = await banco.atualizarUsuarioCandidato({
                            localizacao: req.body.localizacao,
                            telefone: req.body.telefone,
                            usuario_id: req.body.usuario_id,
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch(ex) {
                        retorno = ({ 'error': true, 'mensagem': ex })
                    }
                    res.send(retorno);
                }
            });

    //Alterar Candidato
    app.route("/alterarCandidato")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("usuario_id").trim().isLength({ min: 1 }),
            body("grau_formacao").trim().isLength({ min: 2, max: 100 }),
            body("instituicao_ensino").trim().isLength({ min: 2, max: 100 }),
            body("tag1").trim().isLength({ min: 2, max: 100 }),
            body("tag2").trim().isLength({ min: 2, max: 100 }),
            body("tag3").trim().isLength({ min: 2, max: 100 }),
            body("idade").trim().isLength({ min: 1, max: 3 }),
            body("portfolio").trim().isLength({ min: 1, max: 100 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.alterarCandidato({
                            usuario_id: req.body.usuario_id,
                            grau_formacao: req.body.grau_formacao,
                            instituicao_ensino: req.body.instituicao_ensino,
                            tag1: req.body.tag1,
                            tag2: req.body.tag2,
                            tag3: req.body.tag3,
                            idade: req.body.idade,
                            portfolio: req.body.portfolio
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Falha ao editar candidato!" })
                    }
                    res.send(retorno);
                }
            });

    //Excluindo Candidato
    app.route("/excluirCandidato/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.usuario_id) {
                try {
                    const resultado = await banco.excluirCandidato(req.params.usuario_id);
                    if (resultado == "Id Inexistente!") {
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    }
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao excluir candidato!" })
                }
            }
            res.send(retorno);
        });

    //Listar Todos os Candidatos
    app.route("/listarCandidatos")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            try {
                const resultado = await banco.listarCandidatos();
                retorno = ({ 'error': false, 'mensagem': resultado })
            } catch {
                retorno = ({ 'error': true, 'mensagem': "Erro ao listar candidatos!" })
            }
            res.send(retorno);
        });

    //Listar Um Candidato
    app.route("/listarUmCandidato/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                try {
                    const resultado = await banco.listarUmCandidato(req.params.usuario_id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Usuário inexistente!" })
                }
            }
        });

    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><> EXPERIÊNCIA <><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Experiência
    app.route("/adicionarExperiencia")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("id").trim().isLength({ min: 1 }),
            body("candidato_usuario_id").trim().isLength({ min: 1 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),
            body("empresa").trim().isLength({ min: 2, max: 100 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.inserirExperiencia({
                            id: req.body.id,
                            candidato_usuario_id: req.body.candidato_usuario_id,
                            empresa: req.body.empresa,
                            cargo: req.body.cargo
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao cadastrar experiência!" })
                    }
                }
                res.send(retorno);
            });

    //Alterar Experiência
    app.route("/alterarExperiencia")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id").trim().isLength({ min: 1 }),
            body("candidato_usuario_id").trim().isLength({ min: 1 }),
            body("empresa").trim().isLength({ min: 2, max: 100 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.alterarExperiencia({
                            id: req.body.id,
                            candidato_usuario_id: req.body.candidato_usuario_id,
                            empresa: req.body.empresa,
                            cargo: req.body.cargo
                        });
                        retorno = ({ 'error': false, 'mensagem': retorno })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao alterar experiência!" })
                    }
                    res.send(retorno);
                }
            });

    //Excluindo Experiência - Passar como parametro o id da vaga!
    app.route("/excluirExperiencia/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                try {
                    const resultado = await banco.excluirExperiencia(req.params.id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao excluir experiência!" })
                }
            }
            res.send(retorno)
        });

    //Listar Experiências
    app.route("/listarExperiencias/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                try {
                    const resultado = await banco.listarExperiencias(req.params.usuario_id);
                    retorno = ({ 'error': false, 'mensagem': retorno })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro listar experiências do usuário!" })
                }
                res.send(retorno)
            }
        });


    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO RECRUTADOR<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Recrutador
    app.route("/adicionarRecrutador")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("usuario_id").trim().isLength({ min: 1 }),
            body("empresa").trim().isLength({ min: 2, max: 100 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.inserirRecrutador({
                            usuario_id: req.body.usuario_id,
                            empresa: req.body.empresa,
                            cargo: req.body.cargo
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao cadastrar recrutador!" })
                    }
                    res.send(retorno);
                }
            });

    //Alterar Recrutador
    app.route("/alterarRecrutador")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("usuario_id").trim().isLength({ min: 1 }),
            body("empresa").trim().isLength({ min: 2, max: 100 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.alterarRecrutador({
                            usuario_id: req.body.usuario_id,
                            empresa: req.body.empresa,
                            cargo: req.body.cargo
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao alterar recrutador!" })
                    }

                    res.send(retorno);
                }
            });


    //Excluindo Recrutador
    app.route("/excluirRecrutador/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.usuario_id) {
                try {
                    const resultado = await banco.excluirRecrutador(req.params.usuario_id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro excluir recrutador!" })
                }
                res.send(retorno)
            }
        });


    //Listar Todos os Recrutadores
    app.route("/listarRecrutadores")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            try {
                const resultado = await banco.listarRecrutadores();
                retorno = ({ 'error': false, 'mensagem': resultado })
            } catch {
                retorno = ({ 'error': true, 'mensagem': "Erro ao listar recrutadores!" })
            }
            res.send(retorno);
        });

    //Listar Um Recrutador
    app.route("/listarUmRecrutador/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                try {
                    const resultado = await banco.listarUmRecrutador(req.params.usuario_id);
                    retorno = ({ 'error': true, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Recrutador Inexistente!" })
                }
                res.send(retorno);
            }
        });


    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO VAGAS<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Vaga
    app.route("/adicionarVaga")
        .all(app.configuracao.passport.authenticate())
        .post([
            //body("id").trim().isLength({ min: 1 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),
            body("descricao").trim().isLength({ min: 0, max: 255 }),
            body("salario").trim().isLength({ min: 2, max: 10 }),
            body("tipo").trim().isLength({ min: 2, max: 100 }),
            body("tag1").trim().isLength({ min: 0, max: 100 }),
            body("tag2").trim().isLength({ min: 0, max: 100 }),
            body("tag3").trim().isLength({ min: 0, max: 100 }),
            body("cidade").trim().isLength({ min: 1, max: 100 }),
            body("estado").trim().isLength({ min: 0, max: 2 }),
            body("ativo").trim(),
            body("nivel").trim(),
            body("quantidade").trim().isLength({ min: 1, max: 3 }),
            body("recrutador_usuario_id").trim().isLength({ min: 1 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.inserirVaga({
                            //id: req.body.id,
                            cargo: req.body.cargo,
                            descricao: req.body.descricao,
                            salario: req.body.salario,
                            tipo: req.body.tipo,
                            tag1: req.body.tag1,
                            tag2: req.body.tag2,
                            tag3: req.body.tag3,
                            cidade: req.body.cidade,
                            estado: req.body.estado,
                            ativo: req.body.ativo,
                            nivel: req.body.nivel,
                            quantidade: req.body.quantidade,
                            recrutador_usuario_id: req.body.recrutador_usuario_id
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch(ex) {
                        retorno = ({ 'error': true, 'mensagem': ex });
                    }
                    res.send(retorno);
                }
            });

    //Alterar Vaga
    app.route("/alterarVaga")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id").trim().isLength({ min: 1 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),
            body("descricao").trim().isLength({ min: 0, max: 255 }),
            body("salario").trim().isLength({ min: 2, max: 10 }),
            body("tipo").trim().isLength({ min: 1, max: 100 }),
            body("tag1").trim().isLength({ min: 0, max: 100 }),
            body("tag2").trim().isLength({ min: 0, max: 100 }),
            body("tag3").trim().isLength({ min: 0, max: 100 }),
            body("cidade").trim().isLength({ min: 1, max: 100 }),
            body("estado").trim().isLength({ min: 0, max: 2 }),
            body("ativo").trim(),
            body("nivel").trim(),
            body("quantidade").trim().isLength({ min: 1, max: 3 }),
            body("recrutador_usuario_id").trim().isLength({ min: 1 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.alterarVaga({
                            id: req.body.id,
                            cargo: req.body.cargo,
                            descricao: req.body.descricao,
                            salario: req.body.salario,
                            tipo: req.body.tipo,
                            tag1: req.body.tag1,
                            tag2: req.body.tag2,
                            tag3: req.body.tag3,
                            cidade: req.body.cidade,
                            estado: req.body.estado,
                            ativo: req.body.ativo,
                            nivel: req.body.nivel,
                            quantidade: req.body.quantidade,
                            recrutador_usuario_id: req.body.recrutador_usuario_id
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao alterar vaga!" })
                    }
                    res.send(retorno);
                }
            });

    //Excluindo Vaga
    app.route("/excluirVaga/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                try {
                    const resultado = await banco.excluirVaga(req.params.id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao cadastrar experiência!" })
                }
                res.send(retorno)
            }
        });

    //Listar Todas as Vagas
    app.route("/listarVagas")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            try {
                const resultado = await banco.listarVagas();
                retorno = ({ 'error': false, 'mensagem': resultado })
            } catch {
                retorno = ({ 'error': true, 'mensagem': "Erro ao listar vagas!" })
            }
            res.send(retorno)
        });

    //Listar Uma Vaga
    app.route("/listarUmaVaga/:id")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.id) {
                try {
                    const resultado = await banco.listarUmaVaga(req.params.id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Vaga Inexistente!" })
                }
                res.send(retorno);
            }
        });

    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO PROCESSO<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Processo
    app.route("/adicionarProcesso")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("candidato_usuario_id").trim().isLength({ min: 1 }),
            body("recrutador_usuario_id").trim().isLength({ min: 1 }),
            body("vaga_id").trim().isLength({ min: 1 }),
            body("contato").trim().isLength({ min: 1 }),
            body("devolutiva").trim().isLength({ min: 1 })],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.inserirProcesso({
                            candidato_usuario_id: req.body.candidato_usuario_id,
                            recrutador_usuario_id: req.body.recrutador_usuario_id,
                            vaga_id: req.body.vaga_id,
                            contato: req.body.contato,
                            devolutiva: req.body.devolutiva
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao cadastrar processo!" })
                    }
                    res.send(retorno);
                }
            });

    //Alterar Processo
    app.route("/alterarProcesso")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("candidato_usuario_id").trim().isLength({ min: 1 }),
            body("recrutador_usuario_id").trim().isLength({ min: 1 }),
            body("vaga_id").trim().isLength({ min: 1 }),
            body("contato").trim().isLength({ min: 1 }),
            body("devolutiva").trim().isLength({ min: 1 })],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    try {
                        const resultado = await banco.alterarProcesso({
                            candidato_usuario_id: req.body.candidato_usuario_id,
                            recrutador_usuario_id: req.body.recrutador_usuario_id,
                            vaga_id: req.body.vaga_id,
                            contato: req.body.contato,
                            devolutiva: req.body.devolutiva
                        });
                        retorno = ({ 'error': false, 'mensagem': resultado })
                    } catch {
                        retorno = ({ 'error': true, 'mensagem': "Erro ao alterar processo!" })
                    }
                    res.send(retorno);
                }
            });


    //Excluindo Processo
    app.route("/excluirProcesso/:candidato_usuario_id?&recrutador_usuario_id?&vaga_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.candidato_usuario_id && req.params.recrutador_usuario_id && req.params.vaga_id) {
                try {
                    const resultado = await banco.excluirProcesso(req.params.candidato_usuario_id, req.params.recrutador_usuario_id, req.params.vaga_id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao excluir processo!" })
                }
                res.send(retorno);

            }
        });

    //Listar Processos Candidato
    app.route("/listarProcessosCandidato/:candidato_usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.candidato_usuario_id) {
                try {
                    const resultado = await banco.listarProcessosCandidato(req.params.candidato_usuario_id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao listar processos seletivos!" })
                }
                res.send(retorno);
            }
        });

    //Listar Processos Recrutador
    app.route("/listarProcessosRecrutador/:recrutador_usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.recrutador_usuario_id) {
                try {
                    const resultado = await banco.listarProcessosRecrutador(req.params.recrutador_usuario_id);
                    retorno = ({ 'error': false, 'mensagem': resultado })
                } catch {
                    retorno = ({ 'error': true, 'mensagem': "Erro ao listar processos seletivos do recrutador!" })
                }
                res.send(retorno);
            }
        });

    //Consumo conteudo git
    app.post("/listarInfoGit", function (req, res) {
        const setItem = new Set();
        var retorno = [];
        var location;
            const url_api = 'https://api.github.com/users/' + req.body.portfolio;
            fetch(url_api).then(function(res1) { 
                return res1.json();
            }).then(function(res2) {
                location = res2.location; 
                return res2.repos_url
            }).then(function(res3){
                fetch(res3).then(function(res4) { 
                    return res4.json();
                }).then(function(res5) {
                    res5.forEach(data => {
                        retorno.push({'language': data.language, 'data': data.created_at})
                    })

                    retorno.forEach(item => { item.data = new Date(item.data).getTime()  })

                    retorno.sort(function(a, b) { return a.data - b.data; });
        
                    const filter = retorno.filter((item) => {
                        if(item.language != null){
                        const duplicatedItem = setItem.has(item.language);
                        setItem.add(item.language);
                        return !duplicatedItem;
                        }
                    });
                    
                    var array = {'location': location,"tag1": filter[filter.length - 1].language, "tag2": filter[filter.length - 2].language, "tag3": filter[filter.length - 3].language}

                    res.send(array);
                })
            })

    });


};