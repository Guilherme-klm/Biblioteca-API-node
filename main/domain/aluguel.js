
class Aluguel {
    id
    ativo
    livro
    dataRetirada
    dataDevolucaoProgramado
    dataDevolucao
    multa
    cliente

    constructor(ativo, livro, dataRetirada, dataDevolucaoProgramado, cliente) {
        this.ativo = ativo
        this.livro = livro
        this.dataRetirada = dataRetirada
        this.dataDevolucaoProgramado = dataDevolucaoProgramado
        this.cliente = cliente
        this.dataDevolucao = null
        this.multa = 0
    }

    set multa(newValor) {
        this.multa = newValor
    }

    get multa() {
        return this.multa
    }
}

module.exports = {
    Aluguel
}