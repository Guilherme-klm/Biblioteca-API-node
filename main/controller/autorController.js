const cadastroAutorService = require('../service/cadastroAutorService')
const { ApiError } = require('../exception/apiError')

function insereAutor(req, res) {
    try {
        let novoAutor = req.body
        let idGerado = cadastroAutorService.cadastrar(novoAutor)
        let responseBody = `{ message: 'Autor cadastrado com sucesso!', id: ${idGerado} }`
        res.json(responseBody);
    } catch(e) {
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
    insereAutor
}