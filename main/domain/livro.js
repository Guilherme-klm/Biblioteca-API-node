class Livro {
    isbn
    nome
    autores
    editora
    anoPublicacao
    quantidade

    constructor(nome, autores, editora, anoPublicacao, quantidade) {
        this.nome = nome
        this.autores = autores
        this.editora = editora
        this.anoPublicacao = anoPublicacao
        this.quantidade = quantidade
    }
}

module.exports = {
    Livro
}