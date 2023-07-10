const clienteAlugouTresLivros = require('./clienteAlugouTresLivros');
const livroNaoEstaDisponivel = require('./livroNaoEstaDisponivel');
const alugarLivroJaAlugadoPeloCliente = require('./alugarLivroJaAlugadoPeloCliente');

async function validar(aluguel) {
    await clienteAlugouTresLivros.validar(aluguel)
    livroNaoEstaDisponivel.validar(aluguel)
    await alugarLivroJaAlugadoPeloCliente.validar(aluguel)
}

module.exports = {
    validar
}