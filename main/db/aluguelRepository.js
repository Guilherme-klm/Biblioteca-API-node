let alugueis = [
    {
        id: 23,
        ativo: true,
        livro: {
          isbn: 13,
          nome: 'livro',
          autores: [ 10 ],
          editora: 'editora 222',
          anoPublicacao: '20/04/1999',
          quantidade: 0
        },
        dataRetirada: '08/06/2023',
        dataDevolucaoProgramado: '15/06/2023',
        dataDevolucao: null,
        multa: 0,
        cliente: {
          matricula: 2,
          nome: 'Guilherme Karam',
          telefone: '51 98423-9203'
        }
    }
]

function possuiAluguel() {
    return alugueis.length > 0
}

function todosAlugueis() {
    return alugueis
}

function buscaPorId(idAluguel) {
    let aluguelSalvo = null

    if(possuiAluguel()) {
        alugueis.forEach((aluguel) => {
            if(aluguel.id == idAluguel) {
                aluguelSalvo = aluguel
                return
            }
        })
    }
    return aluguelSalvo
}

function buscaPorMatricula(matriculaCliente) {
    let alugueisDoCliente = []

    if(possuiAluguel()) {
        alugueis.forEach(aluguel => {
            if(aluguel.cliente.matricula == matriculaCliente) {
                alugueisDoCliente.push(aluguel)
            }
        })
    }
    return alugueisDoCliente
}

function alugar(aluguel) {
    aluguel.id = Math.floor(Math.random() * 100);
    aluguel.livro.quantidade -= 1
    alugueis.push(aluguel)
    return aluguel.id
}

module.exports = {
    alugar, buscaPorMatricula, possuiAluguel, buscaPorId, todosAlugueis
}