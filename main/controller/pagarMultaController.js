const aluguelLivrosService = require('../service/aluguelLivrosService')
const { ApiError } = require('../exception/apiError')

async function pagarMulta(req, res) {
    // #swagger.tags = ['Pagamentos']
    // #swagger.description = 'Pagamento da multa do aluguel'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao pagar a multa do aluguel',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        let id = await aluguelLivrosService.pagarMulta(req.params.idAluguel)
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