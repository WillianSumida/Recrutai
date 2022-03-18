const { body, validationResult } = require("express-validator");
const banco = require("../bancoDeDados/conexao");

module.exports = app => {

    //Página Inicial
    app.post("/login", app.configuracao.autenticacao.login)
    app.post(".validateToken", app.configuracao.autenticacao.validaChave)


    //<><><><><><><>SEÇÃO USUÁRIO<><><><><><><><><><>

    //Criando Usuário - Recrutador 1 e Candidato 0 
    app.route("/adicionarUsuario").post([
        body("login", "*Obrigatório ser o e-mail").trim().isLength({ min: 6, max: 100 }),
        body("senha", "Senha deve ter entre 6 e 8 caracteres").trim().isLength({ min: 6, max: 8 }),
        body("nome", "*Obrigatório").trim().isLength({ min: 2, max: 100 }),
        body("recrutador").trim(),
        /* body("cidade").trim().isLength({ min: 2, max: 100 }),
       body("estado").trim().isLength({ min: 2, max: 2 }),
       body("verificado").trim(),
       body("telefone").trim().isLength({ min: 8, max: 15 }), */
    ],
        async (req, res) => {
            const erro = validationResult(req);
            if (!erro.isEmpty()) {
                res.status(400).send(erro.array())
            } else {
                try {
                    const resultado = await banco.inserirUsuario({
                        login: req.body.login,
                        senha: req.body.senha,
                        nome: req.body.nome,
                        recrutador: req.body.recrutador, //por enquanto estatico
                        cidade: "",
                        estado: "",
                        verificado: 0,
                        telefone: ''
                    });
                    if (resultado == "Login previamente cadastrado!") {
                        res.status(400).send(resultado)
                    }
                } catch {
                    console.log("Erro");
                }

                //res.status(200).send("Usuário inserido com sucesso!")

            }
        });

    //Excluindo Usuário
    app.route("/excluirUsuario/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.excluirUsuario(req.params.id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Listar Todos os Usuários
    app.route("/listarUsuarios")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const resultado = await banco.listarUsuarios();
            res.send(resultado);
        });

    //Listar Um Usuário
    app.route("/listarUmUsuario/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.listarUmUsuario(req.params.id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

    //<><><><><><><>SEÇÃO PERFIL DO CANDIDATO<><><><><><><><><><>
    //<><><><><><><>SOMENTE CANDIDATO (1) TEM ESSA VISÃO<><><><><><>

    //Inserir Perfil
    app.route("/adicionarCandidato")
        .all(app.configuracao.passport.authenticate())
        .post([
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
                    const resultado = await banco.inserirCandidato({
                        usuario_id: req.body.usuario_id,
                        grau_formacao: req.body.grau_formacao,
                        instituicao_ensino: req.body.instituicao_ensino,
                        tag1: req.body.tag1,
                        tag2: req.body.tag2,
                        tag3: req.body.tag3,
                        idade: req.body.idade,
                        portfolio: req.body.portfolio
                    });
                    res.send(resultado);
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
                    res.send(resultado);
                }
            });

    //Excluindo Candidato
    app.route("/excluirCandidato/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.usuario_id) {
                const resultado = await banco.excluirCandidato(req.params.usuario_id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Listar Todos os Candidatos
    app.route("/listarCandidatos")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const resultado = await banco.listarCandidatos();
            res.send(resultado);
        });

    //Listar Um Candidato
    app.route("/listarUmCandidato/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                const resultado = await banco.listarUmCandidato(req.params.usuario_id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

};