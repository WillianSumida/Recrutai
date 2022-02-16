const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(bodyParser.json()) //Analisa o corpo da solicitação de entrada no middleware antes de manipulá-lo
    app.use(cors()) //Utilizado para permitir o consumo de informações pelo navegador
}