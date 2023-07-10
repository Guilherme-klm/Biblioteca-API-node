let autorRepository = require('../db/autorRepository')
const { Autor } = require('../domain/autor')
const { RecursoDuplicadoError } = require('../exception/recursoDuplicadoError')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')

async function converter (novoAutor) {
    let nome = buildNome(novoAutor.nome)
    let origem = buildOrigem(novoAutor.origem)
    
    await existeAutor(novoAutor)

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

async function existeAutor (autor) {
    let autorEstaCadastrado = await autorRepository.existeAutor(autor)

    if(autorEstaCadastrado) {
        throw new RecursoDuplicadoError('Autor ja cadastrado', 400)
    }
}

module.exports = {
    converter
}