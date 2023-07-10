const cadastroClienteConverter = require('../converter/cadastroClienteConverter')
const clienteRepository = require('../db/clienteRepository')

async function cadastrar(newCliente) {
    let cliente = await cadastroClienteConverter.converter(newCliente)
    let id = await clienteRepository.inserir(cliente)
    return id
}


module.exports = {
    cadastrar
}