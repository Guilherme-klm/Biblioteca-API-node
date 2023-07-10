import livroEstaComMulta from "../../../main/validations/devolucaoLivro/livroEstaComMulta";
import { BusinessError } from "../../../main/exception/businessError";
const aluguelLivroRepository = require('../../../main/db/aluguelRepository');

describe("Retorna erro", () => {
    test("Deve retornar msg de erro dizendo que livro esta com multa quando a devolucao for dois dias depois da data de devolucao esperada", async() => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-06-17T00:00:00Z').valueOf());
        jest.spyOn(aluguelLivroRepository, "atualizarMulta").mockImplementation(() => undefined)  

        let aluguel = {
            alu_dataRetirada: '08/06/2023',
            alu_dataDevolucaoProgramado: '15/06/2023',
        }

        await livroEstaComMulta.validar(aluguel).catch(e =>
            expect(e.message).toMatch("Nao é possivel devolver o livro pois ele tem multa de R$ 4,00")
        )
    })
})

describe("Nao retorna erro", () => {
    test("Deve retornar undefined quando cliente devolve o livro antes da data de devolucao programada", async() => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-06-14T00:00:00Z').valueOf());        
        jest.spyOn(aluguelLivroRepository, "atualizarMulta").mockImplementation(() => undefined)  

        let aluguel = {
            alu_dataRetirada: '08/06/2023',
            alu_dataDevolucaoProgramado: '15/06/2023',
        }

        let result = await livroEstaComMulta.validar(aluguel)

        expect(result).toBeUndefined()
    })

    test("Deve retornar undefined quando cliente devolve o livro no mesmo dia da data de devolucao programada", async() => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-06-15T00:00:00Z').valueOf());
        jest.spyOn(aluguelLivroRepository, "atualizarMulta").mockImplementation(() => undefined)        

        let aluguel = {
            alu_dataRetirada: '08/06/2023',
            alu_dataDevolucaoProgramado: '15/06/2023',
        }

        let result = await livroEstaComMulta.validar(aluguel)

        expect(result).toBeUndefined()
    })

    test("Deve retornar undefined quando cliente ja pagou a multa do aluguel", async() => {
        jest.spyOn(global.Date, 'now').mockImplementation(() => new Date('2023-06-15T00:00:00Z').valueOf());        
        jest.spyOn(aluguelLivroRepository, "atualizarMulta").mockImplementation(() => undefined)  

        let aluguel = {
            alu_multaPaga: true
        }

        let result = await livroEstaComMulta.validar(aluguel)

        expect(result).toBeUndefined()
    })
})

