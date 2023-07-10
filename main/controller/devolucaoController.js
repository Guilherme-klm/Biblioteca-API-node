const devolucaoLivroService = require('../service/devolucaoLivroService')
const { ApiError } = require('../exception/apiError')

async function devolveLivro (req, res) {
    // #swagger.tags = ['Alugueis']
    // #swagger.description = 'Devolucao do livro'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao devolver novo livro',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        let devolucaoId = await devolucaoLivroService.devolver(req.params.idAluguel)
        const responseBody = `{ message: 'Devolucao do livro feita com sucesso!', id: ${devolucaoId} }`
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
    devolveLivro
}