const aluguelLivroRepository = require('../db/aluguelRepository');
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError');
const devolucaoValidations = require('../validations/devolucaoLivro/devolucaoValidations');

async function devolver(idAluguel) {
    let aluguel = await aluguelLivroRepository.buscaPorId(idAluguel)
    
    if(aluguel == null) {
        throw new RecursoNaoEncontradoError("Aluguel nao existe")
    }
    
    await devolucaoValidations.validar(aluguel)
    await devolverLivro(aluguel)
    return aluguel.alu_id
}

async function devolverLivro(aluguel) {
    await aluguelLivroRepository.devolverLivro(aluguel)
}

module.exports = {
    devolver
}