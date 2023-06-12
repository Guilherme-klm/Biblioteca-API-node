const aluguelLivrosService = require('../service/aluguelLivrosService')
const { ApiError } = require('../exception/apiError')

function insereAluguel(req, res) {
    try {
        let aluguelDTO = criaAluguelDTO(req)
        let idAluguel = aluguelLivrosService.alugar(aluguelDTO)
        const responseBody = `{ message: 'Aluguel cadastrado com sucesso!', id: ${idAluguel} }`
        res.status(201).json(responseBody);
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

function buscaAlugueis(req, res) {
    res.json(aluguelLivrosService.todosAlugueis())
}

function criaAluguelDTO(req) {
    if (req.body.idLivro == undefined || req.body.idLivro == null) {
        req.body.idLivro = req.param.idLivro
    }
    return req.body
}


module.exports = {
    insereAluguel, buscaAlugueis
}