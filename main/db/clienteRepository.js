const dbConfig = require('./dbConfig');

async function existeCliente(cliente) {
    let clienteSalvo = await buscaCliente(cliente)
    if (clienteSalvo != null) {
        return true
    }

    return false
}

async function buscaCliente(newCliente) {
    let client = await dbConfig.connect()

    let result = await client.query(
        "select * from cliente c " +
        "where c.cli_nome = $1 and " +
        "cli_telefone = $2 ", [newCliente.nome, newCliente.telefone])
    
    client.release()
    return result.rows[0]
}

async function buscaClientePorMatricula(matricula) {
    let client = await dbConfig.connect()

    let result = await client.query(
        "select * from cliente c " +
        "where cli_matricula = $1", [matricula])
    
    client.release()
    return result.rows[0]
}

async function inserir(newCliente) {
    let client = await dbConfig.connect()

    let result = await client.query("insert into cliente(cli_nome, cli_telefone) values($1, $2) returning cli_matricula as matricula", [newCliente.nome, newCliente.telefone])

    client.release()
    return result.rows[0].matricula
}

module.exports = {
    buscaClientePorMatricula, inserir, existeCliente, buscaCliente
}