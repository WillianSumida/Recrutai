const {authSecret} = require("../.env")
const jwt = require('jwt-simple')
const banco = require("../bancoDeDados/conexao");

module.exports = app => {
    const login = async (req, res) => {
        console.log("req: ", req);
        //Validando se o campo foi preenchido
        if (!req.body.login || !req.body.senha) {
            res.status(401).send("Informe usuário e senha!")
        } else {
            //Se foi preenchido, valida se eixste no banco na função login
            const resultado = await banco.login({
                login: req.body.login,
                senha: req.body.senha,
            });
            
            //console.log("resultado: ", resultado)
            //console.log("req.body.senha: ", req.body.senha)
            //Exceção para usuário não cadastrado
            if (resultado == null) { 
                return res.status(400).send("Usuário não cadastrado!") 
            }
            
            const isMath = req.body.senha == resultado.senha ? true : false
            if (!isMath) { 
                return res.status(401).send("Acesso negado!") 
            }
            
            const now = Math.floor(Date.now() / 1000)
            
            //Monta o conteúdo que será incluido no JSON
            const payload = {
                id: resultado.id, //id do usuário
                nome: resultado.nome, //nome do usuário
                email: resultado.admin, //valida se é admin ou não
                recrutador: resultado.recrutador,
                verificado: resultado.verificado,
                iat: now, //data de cadastro
                exp: now * (60 * 60 * 2) //cálculo de data de expiração
            }

            //Monta o JSON com o payload e o token
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        }
    }

    const validaChave = async (req, res) => {
        const usuarioDados = req.body || null
        try {
            if (usuarioDados) {
                const chave = jwt.decode(usuarioDados.token, authSecret)
                //if (new Date(chave.exp * 1000) > new Date()) {
                    return res.send(true) //Usuário válido
                //}
            }
        } catch (e) { }
    }

    //Retorna o login e o resultado da validação
    return {login, validaChave}
}