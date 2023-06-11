const aluguelLivroRepository = require('../db/aluguelRepository');
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError');
const devolucaoValidations = require('../validations/devolucaoLivro/devolucaoValidations');
var moment = require('moment');

function devolver(idAluguel) {
    let aluguel = aluguelLivroRepository.buscaPorId(idAluguel)
    
    if(aluguel == null) {
        throw new RecursoNaoEncontradoError("Aluguel nao existe")
    }
    
    devolucaoValidations.validar(aluguel)
    devolverLivro(aluguel)
    return aluguel.id
}

function devolverLivro(aluguel) {
    aluguel.dataDevolucao = moment().format("DD/MM/YYYY");
    aluguel.ativo = false
    aluguel.livro.quantidade += 1
}

module.exports = {
    devolver
}