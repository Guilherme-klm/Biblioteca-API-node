let alugueis = []

function possuiAluguel() {
    return alugueis.length > 0
}

function todosAlugueis() {
    return alugueis
}

function buscaPorId(idAluguel) {
    let aluguelSalvo = []

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