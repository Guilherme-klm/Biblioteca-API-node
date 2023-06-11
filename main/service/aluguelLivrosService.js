const aluguelLivroConverter = require('../converter/aluguelLivroConverter');
const aluguelLivroRepository = require('../db/aluguelRepository');
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
    aluguel.multa = 0
    aluguel.multaPaga = true
    return aluguel.id
}

module.exports = {
    alugar, todosAlugueis, pagarMulta
}