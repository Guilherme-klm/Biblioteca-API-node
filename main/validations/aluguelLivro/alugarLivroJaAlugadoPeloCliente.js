const aluguelLivroRepository = require('../../db/aluguelRepository');
const { BusinessError } = require('../../exception/businessError');

async function validar(aluguel) {
    let alugueisDoCliente = await aluguelLivroRepository.buscaAlugueisAtivoPorMatricula(aluguel.cliente.cli_matricula)
    
    if (alugueisDoCliente.length > 0) {
        alugueisDoCliente.forEach(aluguelBase => {
            if(aluguelBase.alu_ativo) {
                if(aluguelBase.lvr_isbn == aluguel.livro.lvr_isbn) {
                    throw new BusinessError("Nao é possivel alugar o mesmo livro novamente enquanto nao fizer a devolucao dele")
                }
            }
        })
    }
}

module.exports = {
    validar
}