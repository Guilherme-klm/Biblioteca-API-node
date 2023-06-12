const express = require('express');
const app = express();
const PORTA = 3000;
const router = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

app.use(express.json());
app.use(router)
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

require('../main/routes')

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso...")
})