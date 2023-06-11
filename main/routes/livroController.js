const cadastroLivroService = require('../service/cadastroLivroService')
const bucarLivros = require('../service/buscarLivrosService')
const express = require('express');
var router = express.Router();

//OK
router.get('/livros', (req, res) => {
    res.json(bucarLivros.todos());
})

//OK
router.get('/livros/autores/:id', (req, res) => {
    try {
        const id = req.params.id
        const livros = bucarLivros.porNomeAutor(id)
        res.json(livros)
    } catch(e) {
        res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
    }
})

//OK
router.get('/livros/:nome', (req,res) => {
    try {
        const nome = req.params.nome;
        const livro = bucarLivros.porNomeLivro(nome)
        res.json(livro);
    } catch(e) {
        res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
    }
})

//OK
router.post('/livros', (req, res) => {
    try {
        const novoLivro = req.body
        const isbn = cadastroLivroService.cadastrar(novoLivro)
        const responseBody = `{ message: 'Livro cadastrado com sucesso!', id: ${isbn} }`
        res.json(responseBody);
    } catch(error) {
        res.status(error.statusCode)
            .json(`{'message': ${error.message}}`)
    }
})

module.exports = router