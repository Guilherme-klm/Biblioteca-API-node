const express = require('express')
const router = express.Router()

const { verificarLogin } = require('./middleware/autenticacao')
const AluguelController = require('./controller/aluguelController')
const AutorController = require('./controller/autorController')
const ClienteController = require('./controller/clienteController')
const DevolucaoController = require('./controller/devolucaoController')
const LivroController = require('./controller/livroController')
const PagarMultaController = require('./controller/pagarMultaController')


router.post('/alugueis', verificarLogin, AluguelController.insereAluguel)
router.get('/alugueis', verificarLogin, AluguelController.buscaAlugueis)
router.patch('/alugueis/:idAluguel/pagamentos', verificarLogin, PagarMultaController.pagarMulta)
router.post('/autores', verificarLogin, AutorController.insereAutor)
router.post('/clientes', verificarLogin, ClienteController.insereCliente)
router.patch('/devolucoes/:idAluguel', verificarLogin, DevolucaoController.devolveLivro)
router.get('/livros', verificarLogin, LivroController.buscaLivros)
router.get('/livros/autores/:idAutor',verificarLogin, LivroController.buscaLivroPorIdAutor)
router.get('/livros/disponiveis', verificarLogin, LivroController.buscaLivrosDisponiveis)
router.get('/livros/nome/:nome', verificarLogin, LivroController.buscaLivrosPorNome)
router.post('/livros', verificarLogin, LivroController.insereLivro)

module.exports = router