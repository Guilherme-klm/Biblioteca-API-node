const livroEstaComMulta = require('./livroEstaComMulta');

async function validar(aluguel) {
    await livroEstaComMulta.validar(aluguel)
}

module.exports = {
    validar
}