class ApiError extends Error {
    statusCode

    constructor(message) {
        super(message)
        this.statusCode = this.statusCode ? this.statusCode : 400
    }
}

module.exports = {
    ApiError
}