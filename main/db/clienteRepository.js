let clientes = []

function possuiClientes() {
    return clientes.length > 0
}

function mockClientes(mockClientes) {
    clientes = mockClientes
}

function existeCliente(cliente) {
    let clienteSalvo = buscaCliente(cliente)
    if (clienteSalvo != null) {
        return true
    }

    return false
}

function buscaCliente(newCliente) {
    let clienteCarregado = null

    if(possuiClientes()) {
        clientes.forEach(cliente => {
            if(cliente.nome == newCliente.nome && cliente.telefone == newCliente.telefone) {
                clienteCarregado = cliente
                return
            }
        })
    }

    return clienteCarregado
}

function buscaClientePorMatricula(matricula) {
    let clienteCarregado = null

    if(possuiClientes()) {
        clientes.forEach(cliente => {
            if(cliente.matricula == matricula) {
                clienteCarregado = cliente
                return
            }
        })
    }

    return clienteCarregado
}

function inserir(newCliente) {
    newCliente.matricula = Math.floor(Math.random() * 100);
    clientes.push(newCliente)
    return newCliente.matricula
}

module.exports = {
    buscaClientePorMatricula, inserir, existeCliente, mockClientes, possuiClientes, buscaCliente
}