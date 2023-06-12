const { ApiError } = require("./apiError");

class PagarMultaError extends ApiError {

    constructor(message) {
        super(message)
        this.statusCode = 400 
    }
}

module.exports = {
    PagarMultaError
}