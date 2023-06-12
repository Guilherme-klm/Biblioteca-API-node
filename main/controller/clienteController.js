const cadastroClienteService = require('../service/cadastroClienteService')
const { ApiError } = require('../exception/apiError')

function insereCliente (req, res) {
    try {
        let novoCliente = req.body
        let idGerado = cadastroClienteService.cadastrar(novoCliente)
        const responseBody = `{ message: 'Cliente cadastrado com sucesso!', id: ${idGerado} }`
        res.json(responseBody);
    } catch (e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

module.exports = {
    insereCliente
}