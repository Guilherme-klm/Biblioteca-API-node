const aluguelLivroRepository = require('../../db/aluguelRepository');
const { BusinessError } = require('../../exception/businessError');

function validar(aluguel) {
    let alugueisDoCliente = aluguelLivroRepository.buscaPorMatricula(aluguel.cliente.matricula)
    if (alugueisDoCliente.length >= 3) {
        throw new BusinessError("Nao é possivel retirar o livro pois o cliente ja tem 3 livros alugados") 
    }
}

module.exports = {
    validar
}