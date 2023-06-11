const { BusinessError } = require("../../exception/businessError")

function validar(aluguel) {
    if (livroNaoEstaDisponivelParaAlugar(aluguel)) {
        throw new BusinessError("Livro nao esta disponivel pra alugar")
    }
}

function livroNaoEstaDisponivelParaAlugar(aluguel) {
    return aluguel.livro.quantidade == 0
}

module.exports = {
    validar
}