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
                
                res.status(200).send("Usuário inserido com sucesso!")
                
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
};


/*
//<><><><><><><>SEÇÃO VAGAS<><><><><><><><><><>
//<><><><><><><>SOMENTE RECRUTADOR (0) TEM ESSA VISÃO<><><><><><>

    //Inserir Vagas
    app.route("/adicionarVaga")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("id_recrutador").trim().isLength({ min: 1 }),
            body("nome_recrutador").trim().isLength({ min: 1 }),
            body("empresa", "*Campo obrigatório").trim().isLength({ min: 2, max: 100 }),
            body("informacoes").trim().isLength({ min: 2, max: 255 }),
            body("localidade").trim().isLength({ min: 2, max: 100 }),
            body("salario").isLength({ min: 2 }),
            body("interesse").trim().isLength({ min: 1, max: 255 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    const resultado = await banco.inserirVaga({
                        id_recrutador: req.body.id_recrutador,
                        nome_recrutador: req.body.nome_recrutador,
                        empresa: req.body.empresa,
                        informacoes: req.body.informacoes,
                        localidade: req.body.localidade,
                        salario: req.body.salario,
                        interesse: req.body.interesse
                    });
                    res.send(resultado);
                }
            });

    //Excluir Vagas
    app.route("/excluirVaga/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.excluirVaga(req.params.id);
                if (resultado == "Id inexistente!") {
                    res.status(400).send("Id inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Alterar Vagas
    app.route("/alterarVaga")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id").trim(),
            body("id_recrutador").trim().isLength({ min: 1 }),
            body("nome_recrutador").trim().isLength({ min: 1 }),
            body("empresa", "*Campo obrigatório").trim().isLength({ min: 2, max: 100 }),
            body("informacoes").trim().isLength({ min: 2, max: 255 }),
            body("localidade").trim().isLength({ min: 2, max: 100 }),
            body("salario").isLength({ min: 2 }),
            body("interesse").trim().isLength({ min: 1, max: 255 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    const resultado = await banco.alterarVaga({
                        id: req.body.id,
                        id_recrutador: req.body.id_recrutador,
                        nome_recrutador: req.body.nome_recrutador,
                        empresa: req.body.empresa,
                        informacoes: req.body.informacoes,
                        localidade: req.body.localidade,
                        salario: req.body.salario,
                        interesse: req.body.interesse
                    });
                    res.send(resultado);
                }
            });

    //Listar Todas as Vagas
    app.route("/listarVaga")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const resultado = await banco.listarVaga();
            res.send(resultado);
        });

    //Listar Uma Vaga
    app.route("/listarUmaVaga/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {

            if (req.params.id) {
                const resultado = await banco.listarUmaVaga(req.params.id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

//<><><><><><><>SEÇÃO PERFIL DO CANDIDATO<><><><><><><><><><>
//<><><><><><><>SOMENTE CANDIDATO (1) TEM ESSA VISÃO<><><><><><>

        //Inserir Perfil
        app.route("/adicionarPerfil")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("nome_candidato").trim().isLength({ min: 2 , max: 100 }),
            body("descrição").trim().isLength({ min: 2, max: 255 }),
            body("formação").trim().isLength({ min: 2, max: 255 }),
            body("email").trim().isLength({ min: 8, max: 50 }),
            body("localidade").trim().isLength({ min: 2, max: 100 }),
            body("interesse").trim().isLength({ min: 1, max: 255 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    const resultado = await banco.inserirVaga({
                        nome_candidato: req.body.nome_candidato,
                        descricao: req.body.descricao,
                        formacao: req.body.formacao,
                        email: req.body.email,
                        localidade: req.body.localidade,
                        interesse: req.body.interesse
                    });
                    res.send(resultado);
                }
            });

    //Excluir Perfil de Candidato
    app.route("/excluirPerfil/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.excluirPerfil(req.params.id);
                if (resultado == "Id inexistente!") {
                    res.status(400).send("Id inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Alterar Perfil de Candidato
    app.route("/alterarPerfil")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id").trim(),
            body("nome_candidato").trim().isLength({ min: 2 , max: 100 }),
            body("descrição").trim().isLength({ min: 2, max: 255 }),
            body("formação").trim().isLength({ min: 2, max: 255 }),
            body("email").trim().isLength({ min: 8, max: 50 }),
            body("localidade").trim().isLength({ min: 2, max: 100 }),
            body("interesse").trim().isLength({ min: 1, max: 255 }),],

            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    const resultado = await banco.alterarVaga({
                        id: req.body.id,
                        nome_candidato: req.body.nome_candidato,
                        descricao: req.body.descricao,
                        formacao: req.body.formacao,
                        email: req.body.email,
                        localidade: req.body.localidade,
                        interesse: req.body.interesse
                    });
                    res.send(resultado);
                }
            });

    //Listar Todos os Candidatos
    app.route("/listarPerfil")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const resultado = await banco.listarPerfil();
            res.send(resultado);
        });

    //Listar Um Perfil
    app.route("/listarUmPerfil/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {

            if (req.params.id) {
                const resultado = await banco.listarUmPerfil(req.params.id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        };*/