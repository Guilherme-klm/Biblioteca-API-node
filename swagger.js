const swaggerAutogen = require('swagger-autogen')()
const path = require('path')

const outputFile = './swagger_output.json'
const endpointsFiles = [path.join(__dirname, '/main/routes.js')]

const doc = {
    info: {
        version: "1.0.0",
        title: "Biblioteca API",
        description: "Documentacao detalhada dos endpoints e models"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        basicAuth: {
            type: 'basic',
        }
    },
    tags: [
        {
            name: "Livros",
            description: "Busca e insercao de livros"            
        },
        {
            name: "Alugueis",
            description: "Busca e devolucao de alugueis"
        },
        {
            name: "Pagamentos",
            description: "Pagamento multas de alugueis"
        }, 
        {
            name: "Autores",
            description: "Insere autores"
        },
        {
            name: "Clientes",
            description: "Insere clientes"
        }
    ],
    definitions: {
        LivroDTO: {
            isbn: 1,
            nome: "Harry Potter",
            autores: [1, 2, 3],
            editora: "Editora ABC",
            anoPublicacao: "01/01/2030",
            quantidade: 5
        },
        LivroDTI: {
            nome: "Harry Potter",
            autores: [1, 2, 3],
            editora: "Editora ABC",
            anoPublicacao: "01/01/2030",
            quantidade: 5
        },
        AutorDTI: {
            nome: "Marcio Alvez",
            origem: "Brasil"
        },
        MessageDTO: {
            message: 'mensagem'
        },
        ClienteDTO: {
            matricula: 1,
            nome: "Alberto",
            telefone: "51 984630283"
        },
        ClienteDTI: {
            nome: "Alberto",
            telefone: "51 984630283"   
        },
        AluguelDTI: {
            idLivro: 1,
            matricula: 1
        },
        AluguelDTO: {
            id: 1,
            ativo: true,
            livro: {
                $ref: "#/definitions/LivroDTO"
            },
            dataRetirada: "01/01/2050",
            dataDevolucaoProgramado: "08/01/2050",
            dataDevolucao: "05/01/2050",
            multa: 0,
            cliente: {
                $ref: "#/definitions/ClienteDTO"
            }
        }
    }
}


swaggerAutogen(outputFile, endpointsFiles, doc)
