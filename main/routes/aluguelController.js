const aluguelLivrosService = require('../service/aluguelLivrosService')
const express = require('express');
var router = express.Router();

//OK
router.post('/alugueis/:idLivro', (req, res) => {
    try {
        let aluguelDTO = criaAluguelDTO(req)
        let idAluguel = aluguelLivrosService.alugar(aluguelDTO)
        const responseBody = `{ message: 'Aluguel cadastrado com sucesso!', id: ${idAluguel} }`
        res.status(201).json(responseBody);
    } catch(e) {
        res.status(e.statusCode)
        .json(`{'message': ${e.message}}`)
    }
})

//OK
router.get('/alugueis', (req, res) => {
    res.json(aluguelLivrosService.todosAlugueis())
})

function criaAluguelDTO(req) {
    if (req.body.idLivro == undefined || req.body.idLivro == null) {
        req.body.idLivro = req.param.idLivro
    }
    return req.body
}


module.exports = router