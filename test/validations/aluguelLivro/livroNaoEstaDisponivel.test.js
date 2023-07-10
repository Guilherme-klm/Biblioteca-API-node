import { BusinessError } from "../../../main/exception/businessError";
import livroNaoEstaDisponivel from "../../../main/validations/aluguelLivro/livroNaoEstaDisponivel";

describe("Retorna erro", () => {
    test("Deve retornar erro quando quantidade do livro que esta sendo alugado for 0", () => {
        let aluguel = {
            livro: {
                lvr_quantidade: 0
            }
        }
        expect(() => livroNaoEstaDisponivel.validar(aluguel)).toThrow(new BusinessError("Livro nao esta disponivel pra alugar"))
    })
})

describe("Nao retorna erro", () => {
    test("Deve retornar undefined quando quantidade do livro que esta sendo alugado for maior que 0", () => {
        let aluguel = {
            livro: {
                lvr_quantidade: 4
            }
        }

        let result = livroNaoEstaDisponivel.validar(aluguel)

        expect(result).toBeUndefined()
    })
})