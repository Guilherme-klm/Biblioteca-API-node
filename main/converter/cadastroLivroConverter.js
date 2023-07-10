const { Livro } = require('../domain/livro')
const livroRepository = require('../db/livroRepository')
const autorRepository = require('../db/autorRepository')
const { RecursoDuplicadoError } = require('../exception/recursoDuplicadoError')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')
const { CustomTypeError } = require('../exception/customTypeError')

async function converterToDomain(newLivro) {
    let nome = buildNome(newLivro.nome)
    let autores = await buildAutores(newLivro.autores)
    let editora = buildEditora(newLivro.editora)
    let anoPublicacao = buildAnoPublicacao(newLivro.anoPublicacao)
    let quantidade = buildQuantidade(newLivro.quantidade)

    await existeLivro(newLivro)

    return new Livro(nome, autores, editora, anoPublicacao, quantidade)
}

function buildNome(nome) {
    if (typeof nome !== 'string') {
        throw new CustomTypeError("Atributo nome precisa ser do tipo string")
    }

    if(nome == "") {
        throw new RecursoNaoEncontradoError("Nome do livro é obrigatorio")
    }
    
    return nome
}

async function buildAutores(autores) {
    if (!Array.isArray(autores)) {
        throw new CustomTypeError("Atributo autores precisa ser do tipo lista de inteiros")
    }

    if(autores.length == 0) {
        throw new RecursoNaoEncontradoError("Autores do livro é obrigatorio")
    }

    let possuiValorNaoNumero = autores.filter(autorId => {
        return typeof autorId !== 'number'
    })

    if(possuiValorNaoNumero.length > 0) {
        throw new CustomTypeError("Id do autor precisa ser do tipo numero")
    }

    const algumAutorNaoExistente = async () => {
        for await (const autorId of autores) {
            let naoExisteAutor = await autorRepository.naoExisteAutor(autorId)
            
            if(naoExisteAutor) {
                return true
            }
        }
        return false
    }

    if (await algumAutorNaoExistente()) {
        throw new RecursoNaoEncontradoError("Autor(es) nao existe(m), verifique se esta passando os Id(s) corretos")
    }
    
    return autores
}

function buildEditora(editora) {
    if (typeof editora !== 'string') {
        throw new CustomTypeError("Atributo editora precisa ser do tipo string")
    }

    if(editora == "") {
        throw new RecursoNaoEncontradoError("Editora do livro é obrigatorio")
    }
    
    return editora
}

function buildAnoPublicacao(anoPublicacao) {
    if (typeof anoPublicacao !== 'string') {
        throw new CustomTypeError("Atributo anoPublicacao precisa ser do tipo string")
    }

    if(anoPublicacao == "") {
        throw new RecursoNaoEncontradoError("Ano publicacao do livro é obrigatorio")
    }
    
    return anoPublicacao
}

function buildQuantidade(quantidade) {
    if (typeof quantidade !== 'number') {
        throw new CustomTypeError("Atributo quantidade precisa ser do tipo inteiro")
    }

    if(quantidade == 0) {
        throw new RecursoNaoEncontradoError("Quantidade do livro nao pode ser 0")
    }
    
    return quantidade
}

async function existeLivro(newLivro) {
    let livroEstaCadastrado = await livroRepository.existeLivro(newLivro)
    
    if(livroEstaCadastrado) {
        throw new RecursoDuplicadoError('Livro ja cadastrado', 400)
    }
}

module.exports = {
    converterToDomain
}