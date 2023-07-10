const cadastroAutorConverter = require('../converter/cadastroAutorConverter')
const autorRepository = require('../db/autorRepository')

async function cadastrar(novoAutor) {
    let autor = await cadastroAutorConverter.converter(novoAutor)
    let id = await autorRepository.inserir(autor)
    return id
}

module.exports = {
    cadastrar
}