const aluguelLivroRepository = require('../../db/aluguelRepository');
const { BusinessError } = require('../../exception/businessError');

function validar(aluguel) {
    if(aluguelLivroRepository.possuiAluguel()) {
        let alugueisDoCliente = aluguelLivroRepository.buscaPorMatricula(aluguel.cliente.matricula)

        if (alugueisDoCliente.length > 0) {

            alugueisDoCliente.forEach(aluguelBase => {
                if(aluguelBase.ativo) {
                    if(aluguelBase.livro.isbn == aluguel.livro.isbn) {
                        throw new BusinessError("Nao é possivel alugar o mesmo livro novamente enquanto nao fizer a devolucao dele")
                    }
                }
            })
        }
    }
}

module.exports = {
    validar
}