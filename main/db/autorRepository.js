const dbConfig = require('./dbConfig');

async function temAutoresCadastrados() {
    let client = await dbConfig.connect()

    let result = await client.query("select count(*) as quantidade from autor limit 1")

    client.release()
    return result.rows[0].quantidade > 0
}

async function inserir(newAutor) {
    let client = await dbConfig.connect()

    let result = await client.query(
    "insert into autor(aut_nome, aut_origem) values($1, $2) returning aut_id as id", 
    [newAutor.nome, newAutor.origem])

    client.release()
    return result.rows[0].id
}

async function naoExisteAutor(idAutor) {
    let client = await dbConfig.connect()

    let result = await client.query("select count(*) as quantidade from autor where aut_id = $1", [idAutor])

    client.release()
    return result.rows[0].quantidade == "0"
}

async function existeAutor(novoAutor) {
    let client = await dbConfig.connect()

    let result = await client.query(
        "select * from autor where aut_nome = $1 and aut_origem = $2", 
        [novoAutor.nome, novoAutor.origem])

    client.release()
    return result.rows[0] != null
}

module.exports = {
    existeAutor, temAutoresCadastrados, inserir, naoExisteAutor
}