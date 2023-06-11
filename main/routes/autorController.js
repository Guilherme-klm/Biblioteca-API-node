const cadastroAutorService = require('../service/cadastroAutorService')
const express = require('express');
var router = express.Router();

//OK
router.post("/autores",  (req, res) => {
    try {
        let novoAutor = req.body
        let idGerado = cadastroAutorService.cadastrar(novoAutor)
        let responseBody = `{ message: 'Autor cadastrado com sucesso!', id: ${idGerado} }`
        res.json(responseBody);
    } catch(e) {
        res.status(e.statusCode)
            .json(`{'message': ${error.message}}`)
    }
})

module.exports = router