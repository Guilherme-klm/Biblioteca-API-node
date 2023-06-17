var livros = []

function temLivrosCadastrados() {
    return livros.length > 0
}

function mockLivros(mockLivros) {
    livros = mockLivros
}

function buscaLivrosDisponiveis() {
    let livrosDisponiveis = []

    livros.forEach(livro => {
        if (livro.quantidade > 0) {
            livrosDisponiveis.push(livro)
        }
    })

    return livrosDisponiveis
}

function buscarTodosLivros() {
    return livros
}

function buscarPorIdLivro(idLivro) {
    let livroBase = null

    livros.forEach(livro => {
        if(livro.isbn == idLivro) {
            livroBase = livro
            return
        }
    })

    return livroBase
}

function buscarPorIdAutor(id) {
    let livrosDoAutor = []

    livros.forEach(livro => {
        if(livro.autores.includes(Number(id))) {
            livrosDoAutor.push(livro)
        }
    })

    return livrosDoAutor
}

function buscarPorNomeLivro(nomeLivro) {
    let livroBuscadosPeloNome = []

    livros.forEach(livro => {
        if(livro.nome == nomeLivro) {
            livroBuscadosPeloNome.push(livro)
        }
    })

    return livroBuscadosPeloNome
}

function existeLivro (newLivro) {
    let livroEstaSalvoNaBase = false

    livros.forEach(livro => {
        if (livroEstaSalvoNaBase){
            return
        }

        let autoresIguaisDoNovoLivro = true

        if(newLivro.autores.length != livro.autores.length) {
            autoresIguaisDoNovoLivro = false
        } else {
            newLivro.autores.forEach(autorId => {
                if(!livro.autores.includes(autorId)) {
                    autoresIguaisDoNovoLivro = false
                    return
                }
            })
        }

        if (livro.nome == newLivro.nome
            && autoresIguaisDoNovoLivro
            && livro.editora == newLivro.editora
            && livro.anoPublicacao == newLivro.anoPublicacao) {
                livroEstaSalvoNaBase = true
            } 
    })

    return livroEstaSalvoNaBase
}

function inserir(newLivro) {
    newLivro.isbn = Math.floor(Math.random() * 100);
    livros.push(newLivro)
    return newLivro.isbn
}

module.exports = {
    temLivrosCadastrados, existeLivro, inserir, buscarTodosLivros, buscarPorIdAutor, buscarPorNomeLivro, buscarPorIdLivro, buscaLivrosDisponiveis, mockLivros
}