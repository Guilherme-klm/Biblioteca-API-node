const cadastroLivroConverter = require('../converter/cadastroLivroConverter')
const livroRepository = require('../db/livroRepository')

async function cadastrar(newLivro) {
    let livro = await cadastroLivroConverter.converterToDomain(newLivro)
    let isbn = await livroRepository.inserir(livro)
    return isbn
}

module.exports = {
    cadastrar
}