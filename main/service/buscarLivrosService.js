const livroRepository = require('../db/livroRepository')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')

function todos () {
    return livroRepository.buscarTodosLivros()
}

function porIdAutor(id) {
    let livros = livroRepository.buscarPorIdAutor(id)
    
    if(livros.length == 0) {
        throw new RecursoNaoEncontradoError("Nao existem livros com este autor")
    }

    return livros
}

function porNomeLivro(nomeLivro) {
    let livro = livroRepository.buscarPorNomeLivro(nomeLivro)

    if(livro.length == 0) {
        throw new RecursoNaoEncontradoError("Nao existe livro com este nome")
    }

    return livro
}

module.exports = {
    todos, porIdAutor, porNomeLivro
}