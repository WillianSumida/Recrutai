const {body, validationResult} = require("express-validator");
const banco = require("../bancoDeDados/conexao");

module.exports = app => { 

  //Página Inicial
  //app.post("/login", app.configuracao.autenticacao.login)
  //app.post(".validateToken", app.configuracao.autenticacao.validaChave)

  //<><><><><><><>SEÇÃO RECRUTADOR<><><><><><><><><>

  //Criando Recrutador 
  app.route("./adicionarRecrutador").post([
      body("nome", "*Obrigatório").trim().isLength({min:2, max:100}),
      body("empresa", "*Obrigatório").trim().isLength({min:5, max:255})
  ],
  async (req, res) => {
      const erro = validationResult(req);
      if (!erro.isEmpty()) {
          res.status(400).send(erro.array())
      } else { 
          const resultado = await banco.inserirUsuario({
              nome: req.body.nome, 
              empresa: req.body.empresa
          });
          if (resultado == "Recrutador previamente cadastrado!"){
              res.status(400).send(resultado)
          }
          res.status(200).send("Recrutador inserido com sucesso!")
      }
  });

  //Excluindo Recrutador
  app.route("/excluirRecrutador/:id?")
    .all(app.configuracao.passport.authenticate())
    .delete(async (req, res) => {
        if(req.params.id) {
            const resultado = await banco.excluirRecrutador(req.params.id);
            if(resultado=="Id Inexistente!"){
                res.status(400).send("Id Inexistente!")
            }else{
                res.send(resultado);
            }
        }
    });

    //Alterando Informações do Recrutador
    app.route("/alterarRecrutador")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("nome", "*Obrigatório").trim().isLength({min:2, max:100}),
            body("empresa", "*Obrigatório").trim().isLength({min:5, max:255})
        ],
        async(req,res) => {
            const erro = validationResult(req);
            if(!erro.isEmpty()){
                res.send(erro.array())
            }else {
                const resultado = await banco.alterarRecrutador({
                    nome: req.body.nome,
                    empresa: req.body.empresa, 
                });
                res.send(resultado);
            }
        });

}