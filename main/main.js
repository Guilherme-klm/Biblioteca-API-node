const express = require('express');
const app = express();
const PORTA = 3000;
const livroRoute = require('./routes/livroController');
const autorRoute = require('./routes/autorController');
const clienteRoute = require('./routes/clienteController');
const aluguelRoute = require('./routes/aluguelController');
const devolucaoRoute = require('./routes/devolucaoController');
const pagarMultaRoute = require('./routes/pagarMultaController');

// dotenv.config();
app.use(express.json());
app.use(livroRoute)
app.use(autorRoute)
app.use(clienteRoute)
app.use(aluguelRoute)
app.use(devolucaoRoute)
app.use(pagarMultaRoute)

app.listen(PORTA, () => {
    console.log("Servidor iniciado com sucesso...")
})