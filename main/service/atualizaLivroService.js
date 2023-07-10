const atualizaTotalLivroConverter = require('../converter/atualizaTotalLivroConverter')
const livroRepository = require('../db/livroRepository')

async function atualizaTotal(idLivro, livroDTO) {
    let livroAtualizado = await atualizaTotalLivroConverter.converterToDomain(idLivro, livroDTO)
    await livroRepository.atualizaTodoLivro(livroAtualizado)
    return idLivro
}

module.exports = {
    atualizaTotal
}