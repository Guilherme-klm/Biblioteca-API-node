const { ApiError } = require('../exception/apiError')

class BusinessError extends ApiError {
    constructor(message) {
        super(message, 400)
    }
}

module.exports = {
    BusinessError
}