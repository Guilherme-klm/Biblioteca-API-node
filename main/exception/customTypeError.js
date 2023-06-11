const { ApiError } = require('../exception/apiError')

class CustomTypeError extends ApiError {

    constructor(message) {
        super(message, 400)
    }
}

module.exports = {
    CustomTypeError
}