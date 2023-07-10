const livroRepository = require('../db/livroRepository');
const clienteRepository = require('../db/clienteRepository');
const { Aluguel } = require('../domain/aluguel');
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')
var moment = require('moment');

async function converter (aluguel) {
    let livro = await buildLivro(aluguel.idLivro)
    let dataRetirada = buildDataRetirada()
    let dataDevolucaoProgramado = buildDataDevolucaoProgramado()
    let cliente = await buildCliente(aluguel.matricula)

    return new Aluguel(true, livro, dataRetirada, dataDevolucaoProgramado, cliente)
}

async function buildLivro(idLivro) {
    let livro = await livroRepository.buscarPorIdLivro(idLivro)
    
    if (livro != null) {
        return livro
    }
    
    throw new RecursoNaoEncontradoError("Livro nao existe")
}

function buildDataRetirada() {
    var dataRetirada = moment().format("DD/MM/YYYY");
    return dataRetirada
}

function buildDataDevolucaoProgramado() {
    var dataDevolucaoProgramado = moment().add(7, 'days').format("DD/MM/YYYY");
    return dataDevolucaoProgramado
}

async function buildCliente(matriculaCliente) {
    let cliente = await clienteRepository.buscaClientePorMatricula(matriculaCliente)

    if (cliente != null) {
        return cliente
    }

    throw new RecursoNaoEncontradoError("Cliente nao encontrado")
}

module.exports = {
    converter
}