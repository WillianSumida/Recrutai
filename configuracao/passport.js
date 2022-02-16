const {authSecret} = require("../.env")
const passport = require("passport")
const passportJwt = require("passport-jwt")
const {Strategy,ExtractJwt} = passportJwt
const banco = require('../bancoDeDados/conexao')

//Exemplos de autenticação com https://tableless.com.br/autenticar-usuarios-com-jwt-e-passport/
module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {      
       
        //Coloca na variável user o ID de usuário e valida se ele é válido
        const user = banco.listarUmRecrutador || banco.listarUmCandidato({
            id: payload.id,
        });
        
        //Se o resultado da requisição for diferente de Id Inexistente, é autenticado
        if (user != 'Id Inexistente!') {
            return done(null, { ...payload })
        } else{ 
            return false 
        }
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false}) //Utilizado para informar o Passport que a API não irá gerenciar a sessão
    }
}