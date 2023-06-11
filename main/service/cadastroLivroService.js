const cadastroLivroConverter = require('../converter/cadastroLivroConverter')
const livroRepository = require('../db/livroRepository')

function cadastrar(newLivro) {
    let livro = cadastroLivroConverter.converterToDomain(newLivro)
    let isbn = livroRepository.inserir(livro)
    return isbn
}

module.exports = {
    cadastrar
}