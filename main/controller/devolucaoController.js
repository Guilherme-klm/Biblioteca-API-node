const devolucaoLivroService = require('../service/devolucaoLivroService')
const { ApiError } = require('../exception/apiError')

function devolveLivro (req, res) {
    try {
        let devolucaoId = devolucaoLivroService.devolver(req.params.idAluguel)
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