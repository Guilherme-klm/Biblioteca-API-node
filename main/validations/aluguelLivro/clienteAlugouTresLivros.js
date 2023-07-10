const aluguelLivroRepository = require('../../db/aluguelRepository');
const { BusinessError } = require('../../exception/businessError');

async function validar(aluguel) {
    let alugueisDoCliente = await aluguelLivroRepository.buscaAlugueisAtivoPorMatricula(aluguel.cliente.cli_matricula)
    if (alugueisDoCliente.length >= 3) {
        throw new BusinessError("Nao é possivel retirar o livro pois o cliente ja tem 3 livros alugados") 
    }
}

module.exports = {
    validar
}