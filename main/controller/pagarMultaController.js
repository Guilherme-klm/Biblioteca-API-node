const aluguelLivrosService = require('../service/aluguelLivrosService')
const { ApiError } = require('../exception/apiError')

function pagarMulta(req, res) {
    try {
        let id = aluguelLivrosService.pagarMulta(req.params.idAluguel)
        const responseBody = `{ message: 'Multa do livro paga com sucesso!', id: ${id} }`
        res.json(responseBody)
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            console.error(e)
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

module.exports = {
    pagarMulta
}