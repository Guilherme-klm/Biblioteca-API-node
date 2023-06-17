import { existeUsuario } from "../../main/db/usuarioRepository"

describe('Sucesso', () => {
    test('Deve retornar verdadeiro quando o usuario for admin', () => {
        let usuarioDTO = {
            username: "admin",
            password: "admin"
        }

        let usuarioAdmin = existeUsuario(usuarioDTO)

        expect(usuarioAdmin).toBeTruthy()
    });
});

describe('Erro', () => {
    test('Deve retornar falso quando usuario nao for admin', () => {
        let usuarioDTO = {
            username: "abc",
            password: "123"
        } 

        let usuarioAdmin = existeUsuario(usuarioDTO)

        expect(usuarioAdmin).toBeFalsy()
    });

    test('Deve retornar falso quando senha do usuario admin for diferente de admin', () => {
        let usuarioDTO = {
            username: "admin",
            password: "123"
        } 

        let usuarioAdmin = existeUsuario(usuarioDTO)

        expect(usuarioAdmin).toBeFalsy()
    });
});