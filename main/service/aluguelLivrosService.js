const aluguelLivroConverter = require('../converter/aluguelLivroConverter');
const aluguelLivroRepository = require('../db/aluguelRepository');
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError');
const { PagarMultaError } = require('../exception/pagarMultaError')
const aluguelLivroValidations = require('../validations/aluguelLivro/aluguelValidations');

function alugar(aluguelDTO) {
    let aluguelNovo = aluguelLivroConverter.converter(aluguelDTO)
    aluguelLivroValidations.validar(aluguelNovo)
    let idGerado = aluguelLivroRepository.alugar(aluguelNovo)
    return idGerado
}

function todosAlugueis() {
    return aluguelLivroRepository.todosAlugueis()
}

function pagarMulta(idAluguel) {
    let aluguel = aluguelLivroRepository.buscaPorId(idAluguel)

    if(aluguel != null) {
        if(aluguel.ativo && aluguel.multa > 0) {
            aluguel.multa = 0
            aluguel.multaPaga = true
            return aluguel.id
        } else {
            throw new PagarMultaError("Este aluguel nao tem multa para pagar")
        }
    }
    throw new RecursoNaoEncontradoError("Aluguel inexistente")
}

module.exports = {
    alugar, todosAlugueis, pagarMulta
}