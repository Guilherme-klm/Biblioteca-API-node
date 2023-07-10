const livroRepository = require('../db/livroRepository')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')

async function todos () {
    return await livroRepository.buscarTodosLivros()
}

async function buscaLivrosDisponiveis() {
    return await livroRepository.buscaLivrosDisponiveis()
}

async function porIdAutor(id) {
    let livros = await livroRepository.buscarPorIdAutor(id)
    
    if(livros.length == 0) {
        throw new RecursoNaoEncontradoError("Nao existem livros com este autor")
    }

    return livros
}

async function porNomeLivro(nomeLivro) {
    let livro = await livroRepository.buscarPorNomeLivro(nomeLivro)

    if(livro.length == 0) {
        throw new RecursoNaoEncontradoError("Nao existe livro com este nome")
    }

    return livro
}

module.exports = {
    todos, porIdAutor, porNomeLivro, buscaLivrosDisponiveis
}