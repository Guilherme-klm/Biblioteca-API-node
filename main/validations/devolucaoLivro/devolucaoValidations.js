const livroEstaComMulta = require('./livroEstaComMulta');

function validar(aluguel) {
    livroEstaComMulta.validar(aluguel)
}

module.exports = {
    validar
}