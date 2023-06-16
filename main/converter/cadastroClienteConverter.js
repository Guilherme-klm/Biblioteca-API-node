const { Cliente } = require("../domain/cliente")
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')
const { RecursoDuplicadoError } = require('../exception/recursoDuplicadoError')
const clienteRepository = require('../db/clienteRepository')

function converter(novoCliente) {
    let nome = buildNome(novoCliente.nome)
    let telefone = buildTelefone(novoCliente.telefone)

    existeCliente(novoCliente)

    return new Cliente(nome, telefone)
}

function buildNome(nome) {
    if(nome == null || nome == "") {
        throw new RecursoNaoEncontradoError("Nome do cliente é obrigatorio")
    }
    
    return nome
}

function buildTelefone(telefone) {
    if(telefone == null || telefone == "") {
        throw new RecursoNaoEncontradoError("Telefone do cliente é obrigatorio")
    }
    
    return telefone
}

function existeCliente(cliente) {
    let clienteEstaCadastrado = clienteRepository.existeCliente(cliente)

    if(clienteEstaCadastrado) {
        throw new RecursoDuplicadoError('Cliente ja cadastrado', 400)
    }
}

module.exports = {
    converter
}