const cadastroLivroService = require('../service/cadastroLivroService')
const bucarLivros = require('../service/buscarLivrosService')
const atualizaLivroService = require('../service/atualizaLivroService')
const { ApiError } = require('../exception/apiError')

async function buscaLivrosDisponiveis(req, res) {
    // #swagger.tags = ['Livros']
    // #swagger.description = 'Busca todos os livros que estao disponiveis para ser alugado'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao buscar os livros',
            schema: [{ $ref: '#/definitions/LivroDTO' }]
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */

    try {
        res.json(await bucarLivros.buscaLivrosDisponiveis())
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

async function buscaLivros(req, res) {
    // #swagger.tags = ['Livros']
    // #swagger.description = 'Busca todos os livros cadastrados'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao buscar todos os livros',
            schema: [{ $ref: '#/definitions/LivroDTO' }]
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        res.json(await bucarLivros.todos())
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

async function buscaLivroPorIdAutor(req, res) {
    // #swagger.tags = ['Livros']
    // #swagger.description = 'Busca os livros atraves do ID do autor passado como parametro da URL'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao buscar os livros do autor',
            schema: [{ $ref: '#/definitions/LivroDTO' }]
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        const id = req.params.idAutor
        const livros = await bucarLivros.porIdAutor(id)
        res.json(livros)
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

async function buscaLivrosPorNome(req, res) {
    // #swagger.tags = ['Livros']
    // #swagger.description = 'Busca os livros atraves do nome do livro passado como parametro da URL'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao buscar livros pelo nome',
            schema: [{ $ref: '#/definitions/LivroDTO' }]
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        const nome = req.params.nome;
        const livro = await bucarLivros.porNomeLivro(nome)
        res.json(livro);
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

async function insereLivro(req, res) {
    // #swagger.tags = ['Livros']
    // #swagger.description = 'Cadastra livro'
    /* #swagger.parameters['livroDTI'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/LivroDTI' }
    }*/
    /* #swagger.responses[201] = {
            description: 'Sucesso ao cadastrar novo livro',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */

    try {
        const novoLivro = req.body
        const isbn = await cadastroLivroService.cadastrar(novoLivro)
        const responseBody = `{ message: 'Livro cadastrado com sucesso!', id: ${isbn} }`
        res.status(201)
        .json(responseBody);
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

async function atualizaLivroTotal(req, res) {
// #swagger.tags = ['Livros']
    // #swagger.description = 'Atualiza todo o livro'
    /* #swagger.parameters['livroDTI'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/LivroDTI' }
    }*/
    /* #swagger.responses[200] = {
            description: 'Sucesso ao atualizar livro',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */

    try {
        const novoLivro = req.body
        const isbn = await atualizaLivroService.atualizaTotal(req.params.idLivro, novoLivro)
        const responseBody = `{ message: 'Livro atualizado com sucesso!', id: ${isbn} }`
        res.status(200)
        .json(responseBody);
    } catch(e) {
        if(e instanceof ApiError) {
            res.status(e.statusCode)
            .json(`{'message': ${e.message}}`)
        } else {
            res.status(500)
            .json(`{'message': ${e.message}}`)
        }
    }
}

module.exports = {
    buscaLivros, buscaLivroPorIdAutor, buscaLivrosPorNome, insereLivro, buscaLivrosDisponiveis, atualizaLivroTotal
}