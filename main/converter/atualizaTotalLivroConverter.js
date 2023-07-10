const { Livro } = require('../domain/livro')
const livroRepository = require('../db/livroRepository')
const autorRepository = require('../db/autorRepository')
const { RecursoNaoEncontradoError } = require('../exception/recursoNaoEncontradoError')
const { CustomTypeError } = require('../exception/customTypeError')

async function converterToDomain(idLivro, livroDTO) {
    let livro = await loadLivro(idLivro)
    buildNome(livro, livroDTO.nome)
    await buildAutores(livro, livroDTO.autores)
    buildEditora(livro, livroDTO.editora)
    buildAnoPublicacao(livro, livroDTO.anoPublicacao)
    buildQuantidade(livro, livroDTO.quantidade)

    return livro
}

async function loadLivro(idLivro) {
    let livro = await livroRepository.buscarPorIdLivro(idLivro)

    if (livro != null) {
        return livro
    }

    throw new RecursoNaoEncontradoError("Livro não existe. Informe Id de um livro existente")
}

function buildNome(livro, nome) {
    if(nome == undefined) {
        throw new RecursoNaoEncontradoError("Nome do livro é obrigatorio")
    }

    if (typeof nome !== 'string') {
        throw new CustomTypeError("Atributo nome precisa ser do tipo string")
    }

    if(nome == "") {
        throw new RecursoNaoEncontradoError("Nome do livro é obrigatorio")
    }
    
    livro.lvr_nome = nome
}

async function buildAutores(livro, autores) {
    if(autores == undefined) {
        throw new RecursoNaoEncontradoError("Autores do livro é obrigatorio")
    }

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

    livro.autores = autores
}

function buildEditora(livro, editora) {
    if(editora == undefined) {
        throw new RecursoNaoEncontradoError("Editora do livro é obrigatorio")
    }

    if (typeof editora !== 'string') {
        throw new CustomTypeError("Atributo editora precisa ser do tipo string")
    }

    if(editora == "") {
        throw new RecursoNaoEncontradoError("Editora do livro é obrigatorio")
    }
    
    livro.lvr_editora = editora
}

function buildAnoPublicacao(livro, anoPublicacao) {
    if(anoPublicacao == undefined) {
        throw new RecursoNaoEncontradoError("Ano publicacao do livro é obrigatorio")
    }

    if (typeof anoPublicacao !== 'string') {
        throw new CustomTypeError("Atributo anoPublicacao precisa ser do tipo string")
    }

    if(anoPublicacao == "") {
        throw new RecursoNaoEncontradoError("Ano publicacao do livro é obrigatorio")
    }
    
    livro.lvr_anopublicacao = anoPublicacao
}

function buildQuantidade(livro, quantidade) {
    if(quantidade == undefined) {
        throw new RecursoNaoEncontradoError("Quantidade do livro é obrigatorio")
    }

    if (typeof quantidade !== 'number') {
        throw new CustomTypeError("Atributo quantidade precisa ser do tipo inteiro")
    }

    if(quantidade == 0) {
        throw new RecursoNaoEncontradoError("Quantidade do livro nao pode ser 0")
    }
    
    livro.lvr_quantidade = quantidade
}

module.exports = {
    converterToDomain
}