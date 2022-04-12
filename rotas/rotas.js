const { body, validationResult } = require("express-validator");
const banco = require("../bancoDeDados/conexao");

module.exports = app => {

    //Página Inicial
    app.post("/login", app.configuracao.autenticacao.login)
    app.post(".validateToken", app.configuracao.autenticacao.validaChave)

    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO USUÁRIO<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

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

//<><><><><><><><><><><><><><><><><><><><><><><><><><><><>
//<><><><><><><>    SEÇÃO CANDIDATO   <><><><><><><><><><>
//<><><><><><><><><><><><><><><><><><><><><><><><><><><><>

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
                    const resultado = await banco.inserirExperiencia({
                        id: req.body.id,
                        candidato_usuario_id: req.body.candidato_usuario_id,
                        empresa: req.body.empresa,
                        cargo: req.body.cargo
                    });
                    res.send(resultado);
                }
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
                    const resultado = await banco.alterarExperiencia({
                        id: req.body.id,
                        candidato_usuario_id: req.body.candidato_usuario_id,
                        empresa: req.body.empresa,
                        cargo: req.body.cargo
                    });
                    res.send(resultado);
                }
            });

    //Excluindo Experiência - Passar como parametro o id da vaga!
    app.route("/excluirExperiencia/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.excluirExperiencia(req.params.id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Listar Experiências
    app.route("/listarExperiencias/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                const resultado = await banco.listarExperiencias(req.params.usuario_id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
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
                    const resultado = await banco.inserirRecrutador({
                        usuario_id: req.body.usuario_id,
                        empresa: req.body.empresa,
                        cargo: req.body.cargo
                    });
                    res.send(resultado);
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
                    const resultado = await banco.alterarRecrutador({
                        usuario_id: req.body.usuario_id,
                        empresa: req.body.empresa,
                        cargo: req.body.cargo
                    });
                    res.send(resultado);
                }
            });


    //Excluindo Recrutador
    app.route("/excluirRecrutador/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.usuario_id) {
                const resultado = await banco.excluirRecrutador(req.params.usuario_id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });


    //Listar Todos os Recrutadores
    app.route("/listarRecrutadores")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            const resultado = await banco.listarRecrutadores();
            res.send(resultado);
        });

    //Listar Um Recrutador
    app.route("/listarUmRecrutador/:usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.usuario_id) {
                const resultado = await banco.listarUmRecrutador(req.params.usuario_id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });


    //<><><><><><><><><><><><><><><><><><><><><><><><><>
    //<><><><><><><>SEÇÃO VAGAS<><><><><><><><><><>
    //<><><><><><><><><><><><><><><><><><><><><><><><><>

    //Inserir Vaga
    app.route("/adicionarVaga")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("id").trim().isLength({ min: 1 }),
            body("cargo").trim().isLength({ min: 2, max: 100 }),
            body("descricao").trim().isLength({ min: 0, max: 255 }),
            body("salario").trim().isLength({ min: 2, max: 10 }),
            body("tipo").trim().isLength({ min: 2, max: 100 }),
            body("tag1").trim().isLength({ min: 2, max: 100 }),
            body("tag2").trim().isLength({ min: 2, max: 100 }),
            body("tag3").trim().isLength({ min: 2, max: 100 }),
            body("cidade").trim().isLength({ min: 1, max: 100 }),
            body("estado").trim().isLength({ min: 0, max: 2 }),
            body("ativo").trim(),
            body("quantidade").trim().isLength({ min: 1, max: 3 }),
            body("recrutador_usuario_id").trim().isLength({ min: 1 }),],
            async (req, res) => {
                const erro = validationResult(req);

                if (!erro.isEmpty()) {
                    res.send(erro.array())
                } else {
                    const resultado = await banco.inserirVaga({
                        id: req.body.id,
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
        body("tipo").trim().isLength({ min: 0, max: 100 }),
        body("tag1").trim().isLength({ min: 0, max: 100 }),
        body("tag2").trim().isLength({ min: 0, max: 100 }),
        body("tag3").trim().isLength({ min: 0, max: 100 }),
        body("cidade").trim().isLength({ min: 1, max: 100 }),
        body("estado").trim().isLength({ min: 0, max: 2 }),
        body("ativo").trim(),
        body("quantidade").trim().isLength({ min: 1, max: 3 }),
        body("recrutador_usuario_id").trim().isLength({ min: 1 }),],
       async (req, res) => {
           const erro = validationResult(req);

           if (!erro.isEmpty()) {
                console.log(erro);
               res.send(erro.array())
           } else {
               try{
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
                        ativo: true, 
                        quantidade: req.body.quantidade, 
                        recrutador_usuario_id: req.body.recrutador_usuario_id
                    });
                    res.send(resultado);
                }
                catch{
                    console.log("Erro.");
                }
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
        body("tipo").trim().isLength({ min: 2, max: 100 }),
        body("tag1").trim().isLength({ min: 2, max: 100 }),
        body("tag2").trim().isLength({ min: 2, max: 100 }),
        body("tag3").trim().isLength({ min: 2, max: 100 }),
        body("cidade").trim().isLength({ min: 1, max: 100 }),
        body("estado").trim().isLength({ min: 0, max: 2 }),
        body("ativo").trim(),
        body("quantidade").trim().isLength({ min: 1, max: 3 }),
        body("recrutador_usuario_id").trim().isLength({ min: 1 }),],
       async (req, res) => {
           const erro = validationResult(req);

           if (!erro.isEmpty()) {
               res.send(erro.array())
           } else {
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
                quantidade: req.body.quantidade, 
                recrutador_usuario_id: req.body.recrutador_usuario_id
               });
               res.send(resultado);
           }
       });

    //Excluindo Vaga
    app.route("/excluirVaga/:id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.excluirVaga(req.params.id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Listar Todas as Vagas
    app.route("/listarVagas")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            try{
            const resultado = await banco.listarVagas();
            console.log(resultado);
            res.send(resultado);
            }catch{

            }
        });

    //Listar Uma Vaga
    app.route("/listarUmaVaga/:id")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.id) {
                const resultado = await banco.listarUmaVaga(req.params.id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
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
                    const resultado = await banco.inserirProcesso({
                        candidato_usuario_id: req.body.candidato_usuario_id,
                        recrutador_usuario_id: req.body.recrutador_usuario_id,
                        vaga_id: req.body.vaga_id,
                        contato: req.body.contato,
                        devolutiva: req.body.devolutiva
                    });
                    res.send(resultado);
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
                    const resultado = await banco.alterarProcesso({
                        candidato_usuario_id: req.body.candidato_usuario_id,
                        recrutador_usuario_id: req.body.recrutador_usuario_id,
                        vaga_id: req.body.vaga_id,
                        contato: req.body.contato,
                        devolutiva: req.body.devolutiva
                    });
                    res.send(resultado);
                }
            });


    //Excluindo Processo
    app.route("/excluirProcesso/:candidato_usuario_id?&recrutador_usuario_id?&vaga_id?")
        .all(app.configuracao.passport.authenticate())
        .delete(async (req, res) => {
            if (req.params.candidato_usuario_id && req.params.recrutador_usuario_id && req.params.vaga_id) {
                const resultado = await banco.excluirProcesso(req.params.candidato_usuario_id,req.params.recrutador_usuario_id,req.params.vaga_id);
                if (resultado == "Id Inexistente!") {
                    res.status(400).send("Id Inexistente!")
                } else {
                    res.send(resultado);
                }
            }
        });

    //Listar Processos Candidato
    app.route("/listarProcessosCandidato/:candidato_usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.candidato_usuario_id) {
                const resultado = await banco.listarProcessosCandidato(req.params.candidato_usuario_id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

    //Listar Processos Recrutador
    app.route("/listarProcessosRecrutador/:recrutador_usuario_id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if (req.params.recrutador_usuario_id) {
                const resultado = await banco.listarProcessosRecrutador(req.params.recrutador_usuario_id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

};