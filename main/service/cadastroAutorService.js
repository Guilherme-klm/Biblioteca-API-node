const cadastroAutorConverter = require('../converter/cadastroAutorConverter')
const autorRepository = require('../db/autorRepository')

function cadastrar(novoAutor) {
    let autor = cadastroAutorConverter.converter(novoAutor)
    let id = autorRepository.inserir(autor)
    return id
}

module.exports = {
    cadastrar
}