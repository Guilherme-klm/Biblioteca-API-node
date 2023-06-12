const cadastroLivroService = require('../service/cadastroLivroService')
const bucarLivros = require('../service/buscarLivrosService')
const { ApiError } = require('../exception/apiError')

function buscaLivros(req, res) {
    res.json(bucarLivros.todos())
}

function buscaLivroPorIdAutor(req, res) {
    try {
        const id = req.params.idAutor
        const livros = bucarLivros.porIdAutor(id)
        res.json(livros)
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

function buscaLivrosPorNome(req, res) {
    try {
        const nome = req.params.nome;
        const livro = bucarLivros.porNomeLivro(nome)
        res.json(livro);
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

function insereLivro(req, res) {
    try {
        const novoLivro = req.body
        const isbn = cadastroLivroService.cadastrar(novoLivro)
        const responseBody = `{ message: 'Livro cadastrado com sucesso!', id: ${isbn} }`
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
    buscaLivros, buscaLivroPorIdAutor, buscaLivrosPorNome, insereLivro
}