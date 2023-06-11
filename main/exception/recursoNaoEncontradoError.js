const { ApiError } = require('../exception/apiError')

class RecursoNaoEncontradoError extends ApiError {

    constructor(message) {
        super(message, 404)
    }
}

module.exports = {
    RecursoNaoEncontradoError
}