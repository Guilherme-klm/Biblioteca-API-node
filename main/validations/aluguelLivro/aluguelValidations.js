const clienteAlugouTresLivros = require('./clienteAlugouTresLivros');
const livroNaoEstaDisponivel = require('./livroNaoEstaDisponivel');
const alugarLivroJaAlugadoPeloCliente = require('./alugarLivroJaAlugadoPeloCliente');

function validar(aluguel) {
    //OK
    clienteAlugouTresLivros.validar(aluguel)
    //OK
    livroNaoEstaDisponivel.validar(aluguel)
    //OK
    alugarLivroJaAlugadoPeloCliente.validar(aluguel)
}

module.exports = {
    validar
}