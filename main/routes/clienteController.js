const express = require('express');
var router = express.Router();
const cadastroClienteService = require('../service/cadastroClienteService')

//OK
router.post('/clientes', (req, res) => {
    try {
        let novoCliente = req.body
        let idGerado = cadastroClienteService.cadastrar(novoCliente)
        const responseBody = `{ message: 'Cliente cadastrado com sucesso!', id: ${idGerado} }`
        res.json(responseBody);
    } catch (error) {
        res.status(error.statusCode)
            .json(`{'message': ${error.message}}`)
    }
})

module.exports = router