const cadastroClienteConverter = require('../converter/cadastroClienteConverter')
const clienteRepository = require('../db/clienteRepository')

function cadastrar(newCliente) {
    let cliente = cadastroClienteConverter.converter(newCliente)
    let id = clienteRepository.inserir(cliente)
    return id
}


module.exports = {
    cadastrar
}