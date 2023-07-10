const cadastroClienteService = require('../service/cadastroClienteService')
const { ApiError } = require('../exception/apiError')

async function insereCliente (req, res) {
    // #swagger.tags = ['Clientes']
    // #swagger.description = 'Cadastra cliente'
    /* #swagger.parameters['clienteDTI'] = {
            in: 'body',
            required: true,
            schema: { $ref: '#/definitions/ClienteDTI' }
    }*/
    /* #swagger.responses[201] = {
            description: 'Sucesso ao cadastrar cliente',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    /* #swagger.responses[500] = {
            description: 'Servidor encontrou algum problema interno',
            schema: { $ref: '#/definitions/MessageDTO' }
    } */
    try {
        let novoCliente = req.body
        let idGerado = await cadastroClienteService.cadastrar(novoCliente)
        const responseBody = `{ message: 'Cliente cadastrado com sucesso!', id: ${idGerado} }`
        res.status(201).json(responseBody);
    } catch (e) {
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
    insereCliente
}