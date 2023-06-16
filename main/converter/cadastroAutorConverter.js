let autorRepository = require('../db/autorRepository')
const { Autor } = require('../domain/autor')
const { RecursoDuplicadoError } = require('../exception/recursoDuplicadoError')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')

function converter (novoAutor) {
    let nome = buildNome(novoAutor.nome)
    let origem = buildOrigem(novoAutor.origem)
    
    existeAutor(novoAutor)

    return new Autor(nome, origem)
}

function buildNome(novoNome) {
    if(novoNome == "" || novoNome == null) {
        throw new RecursoNaoEncontradoError("Nome do autor é obrigatorio")
    }
    
    return novoNome
}

function buildOrigem(novaOrigem) {
    if(novaOrigem == "" || novaOrigem == null) {
        throw new RecursoNaoEncontradoError("Origem do autor é obrigatorio")
    }
    
    return novaOrigem
}

function existeAutor (autor) {
    if(autorRepository.temAutoresCadastrados()) {
        let autorEstaCadastrado = autorRepository.existeAutor(autor)

        if(autorEstaCadastrado) {
            throw new RecursoDuplicadoError('Autor ja cadastrado', 400)
        }
    }
}

module.exports = {
    converter
}