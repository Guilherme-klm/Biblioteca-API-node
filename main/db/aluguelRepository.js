const dbConfig = require('../db/dbConfig');
const livroRepository = require('../db/livroRepository')
var moment = require('moment');

async function todosAlugueis() {
    let client = await dbConfig.connect()

    let result = await client.query("select * from aluguel")

    client.release()
    return result.rows
}

async function buscaPorId(idAluguel) {
    let client = await dbConfig.connect()

    let result = await client.query("select * from aluguel where alu_id = $1", [idAluguel])

    client.release()
    return result.rows[0]
}

async function buscaPorMatricula(matriculaCliente) {
    let client = await dbConfig.connect()

    let result = await client.query(
        "select * from aluguel where cli_matricula = $1", 
        [matriculaCliente])

    client.release()
    return result.rows
}

async function buscaAlugueisAtivoPorMatricula (matriculaCliente) {
    let client = await dbConfig.connect()

    let result = await client.query(
        "select * from aluguel where cli_matricula = $1 and alu_ativo = true", 
        [matriculaCliente])

    client.release()
    return result.rows
}

async function alugar(aluguel) {
    aluguel.livro.lvr_quantidade -= 1

    let client = await dbConfig.connect()

    let result = await client.query(
        "insert into aluguel(alu_ativo, lvr_isbn, alu_dataretirada, alu_datadevolucaoprogramado, alu_datadevolucao, alu_multa, cli_matricula) " + 
        "values($1, $2, $3, $4, $5, $6, $7) returning alu_id as id",
        [aluguel.ativo, aluguel.livro.lvr_isbn, aluguel.dataRetirada, aluguel.dataDevolucaoProgramado, 
        aluguel.dataDevolucao, aluguel.multa, aluguel.cliente.cli_matricula]
    )

    await client.query(
        "update livro set lvr_quantidade = $1 where lvr_isbn = $2",
        [aluguel.livro.lvr_quantidade, aluguel.livro.lvr_isbn]
    )
    
    client.release()
    return result.rows[0].id
}

async function atualizarMulta(idAluguel, multa) {
    let client = await dbConfig.connect()

    await client.query(
        "update aluguel set alu_multa = $1 where alu_id = $2",
        [multa, idAluguel]
    )

    client.release()
}

async function pagarMulta(idAluguel) {
    let client = await dbConfig.connect()

    await client.query(
        "update aluguel set alu_multa = 0, alu_multapaga = true where alu_id = $1",
        [idAluguel]
    )

    client.release()
}

async function devolverLivro(aluguel) {
    let client = await dbConfig.connect()

    await client.query(
        "update aluguel set alu_datadevolucao = $1, alu_ativo = false where alu_id = $2",
        [moment().format("DD/MM/YYYY"), aluguel.alu_id]
    )

    let livro = await livroRepository.buscarPorIdLivro(aluguel.lvr_isbn)
    livro.lvr_quantidade += 1
    
    await client.query(
        "update livro set lvr_quantidade = $1 where lvr_isbn = $2",
        [livro.lvr_quantidade, aluguel.lvr_isbn]
    )
}

module.exports = {
    alugar, buscaPorMatricula, pagarMulta, buscaPorId, todosAlugueis, devolverLivro, atualizarMulta, buscaAlugueisAtivoPorMatricula
}