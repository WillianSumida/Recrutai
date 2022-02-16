const {body, validationResult} = require("express-validator");
const banco = require("../bancoDeDados/conexao");

module.exports = app => { 

  //Página Inicial
  app.post("/login", app.configuracao.autenticacao.login)
  app.post(".validateToken", app.configuracao.autenticacao.validaChave)


  //<><><><><><><>SEÇÃO USUÁRIO<><><><><><><><><><>

  //Criando Usuário - Recrutador 1 e Candidato 0 
  app.route("./adicionarUsuario").post([
      body("nome", "*Obrigatório").trim().isLength({min:2, max:100}),
      body("empresa", "*Obrigatório").trim().isLength({min:5, max:255}),
      body("login", "*Obrigatório").trim().isLength({min: 2, max:20}),
      body("senha", "Senha deve ter entre 6 e 8 caracteres").trim().isLength({min:6,max:8}),
      body("candidato_recrutador").trim(),
  ],
  async (req, res) => {
      const erro = validationResult(req);
      if (!erro.isEmpty()) {
          res.status(400).send(erro.array())
      } else { 
          const resultado = await banco.inserirUsuario({
              nome: req.body.nome, 
              empresa: req.body.empresa,
              login: req.body.login, 
              senha: req.body.senha,
              candidato_recrutador: req.body.candidato_recrutador,
          });
          if (resultado == "Login previamente cadastrado!"){
              res.status(400).send(resultado)
          }
          res.status(200).send("Usuário inserido com sucesso!")
      }
  });

  //Excluindo Usuário
  app.route("/excluirUsuario/:id?")
    .all(app.configuracao.passport.authenticate())
    .delete(async (req, res) => {
        if(req.params.id) {
            const resultado = await banco.excluirUsuario(req.params.id);
            if(resultado=="Id Inexistente!"){
                res.status(400).send("Id Inexistente!")
            }else{
                res.send(resultado);
            }
        }
    });

    //Alterando Informações do Usuário
    app.route("/alterarUsuario")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("nome", "*Obrigatório").trim().isLength({min:2, max:100}),
            body("empresa", "*Obrigatório").trim().isLength({min:5, max:255}),
            body("login", "*Obrigatório").trim().isLength({min: 2, max:20}),
            body("senha", "Senha deve ter entre 6 e 8 caracteres").trim().isLength({min:6,max:8}),
            body("candidato_recrutador").trim(),
        ],
        async(req,res) => {
            const erro = validationResult(req);
            if(!erro.isEmpty()){
                res.send(erro.array())
            }else {
                const resultado = await banco.alterarRecrutador({
                    nome: req.body.nome,
                    empresa: req.body.empresa, 
                    login: req.body.login, 
                    senha: req.body.senha,
                    candidato_recrutador: req.body.candidato_recrutador,
                });
                res.send(resultado);
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
    app.route("/listarUmUsuário/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
            if(req.params.id) {
                const resultado = await banco.listarUmUsuario(req.params.id);
                res.send(resultado);
            } else {
                res.send("Id Inexistente!")
            }
        });

}