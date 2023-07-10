const aluguelLivrosService = require('../service/aluguelLivrosService')
const { ApiError } = require('../exception/apiError')

async function insereAluguel(req, res) {
    // #swagger.tags = ['Alugueis']
    // #swagger.description = 'Cadastra aluguel'
    /* #swagger.parameters['livroDTI'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/AluguelDTI' }
    }*/
    /* #swagger.responses[201] = {
            description: 'Sucesso ao cadastrar aluguel',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */

    try {
        let aluguelDTO = req.body
        let idAluguel = await aluguelLivrosService.alugar(aluguelDTO)
        const responseBody = `{ message: 'Aluguel cadastrado com sucesso!', id: ${idAluguel} }`
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

async function buscaAlugueis(req, res) {
    // #swagger.tags = ['Alugueis']
    // #swagger.description = 'Cadastra aluguel'
    /* #swagger.responses[200] = {
            description: 'Sucesso ao buscar todos os alugueis',
            schema: [{ $ref: '#/definitions/AluguelDTO' }]
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    res.json(await aluguelLivrosService.todosAlugueis())
}


module.exports = {
    insereAluguel, buscaAlugueis
}