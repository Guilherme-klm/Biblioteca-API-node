const aluguelLivroConverter = require('../converter/aluguelLivroConverter');
const aluguelLivroRepository = require('../db/aluguelRepository');
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError');
const { PagarMultaError } = require('../exception/pagarMultaError')
const aluguelLivroValidations = require('../validations/aluguelLivro/aluguelValidations');

async function alugar(aluguelDTO) {
    let aluguelNovo = await aluguelLivroConverter.converter(aluguelDTO)
    await aluguelLivroValidations.validar(aluguelNovo)
    let idGerado = await aluguelLivroRepository.alugar(aluguelNovo)
    return idGerado
}

async function todosAlugueis() {
    return await aluguelLivroRepository.todosAlugueis()
}

async function pagarMulta(idAluguel) {
    let aluguel = await aluguelLivroRepository.buscaPorId(idAluguel)

    if(aluguel != null) {
        if(aluguel.alu_ativo && aluguel.alu_multa > 0) {
            await aluguelLivroRepository.pagarMulta(idAluguel)
            return aluguel.alu_id
        } else {
            throw new PagarMultaError("Este aluguel nao tem multa para pagar")
        }
    }
    throw new RecursoNaoEncontradoError("Aluguel inexistente")
}

module.exports = {
    alugar, todosAlugueis, pagarMulta
}