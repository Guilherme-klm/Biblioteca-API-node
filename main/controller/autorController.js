const cadastroAutorService = require('../service/cadastroAutorService')
const { ApiError } = require('../exception/apiError')

async function insereAutor(req, res) {
    // #swagger.tags = ['Autores']
    // #swagger.description = 'Cadastra autor'
     /* #swagger.parameters['autorDTI'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/AutorDTI' }
    }*/
    /* #swagger.responses[201] = {
            description: 'Sucesso ao cadastrar autor',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        let novoAutor = req.body
        let idGerado = await cadastroAutorService.cadastrar(novoAutor)
        let responseBody = `{ message: 'Autor cadastrado com sucesso!', id: ${idGerado} }`
        res.status(201).json(responseBody);
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
    insereAutor
}