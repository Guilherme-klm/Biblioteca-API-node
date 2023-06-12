const swaggerAutogen = require('swagger-autogen')()
const path = require('path')

const outputFile = './swagger_output.json'
const endpointsFiles = [path.join(__dirname, '/main/routes.js')]

swaggerAutogen(outputFile, endpointsFiles)
