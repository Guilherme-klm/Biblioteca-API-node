const { ApiError } = require('../exception/apiError')

class RecursoDuplicadoError extends ApiError {
    constructor(message, statusCode) {
        super(message, statusCode)
    }
}

module.exports = {
    RecursoDuplicadoError
}