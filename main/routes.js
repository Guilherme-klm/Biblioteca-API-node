const express = require('express')
const router = express.Router()

const AluguelController = require('./controller/aluguelController')
const AutorController = require('./controller/autorController')
const ClienteController = require('./controller/clienteController')
const DevolucaoController = require('./controller/devolucaoController')
const LivroController = require('./controller/livroController')
const PagarMultaController = require('./controller/pagarMultaController')


router.post('/alugueis/:idLivro', AluguelController.insereAluguel)
router.get('/alugueis', AluguelController.buscaAlugueis)
router.patch('/alugueis/:idAluguel/pagamentos', PagarMultaController.pagarMulta)
router.post('/autores', AutorController.insereAutor)
router.post('/clientes', ClienteController.insereCliente)
router.patch('/devolucoes/:idAluguel', DevolucaoController.devolveLivro)
router.get('/livros', LivroController.buscaLivros)
router.get('/livros/autores/:idAutor', LivroController.buscaLivroPorIdAutor)
router.get('/livros/:nome', LivroController.buscaLivrosPorNome)
router.post('/livros', LivroController.insereLivro)

module.exports = router