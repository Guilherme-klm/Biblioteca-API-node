# Tema: Biblioteca
## Introdução
Esse sistema consiste em ajudar os bibliotecários a terem um
controle das retiradas e devoluções dos livros de uma biblioteca.
Problema

Atualmente, a biblioteca alvo desse trabalho realiza os registros
de retirada e devolução através de papel, além do próprio controle
dos livros e de seus clientes. Esse controle manual dificulta a
busca por uma determinada informação e possui muitos
problemas de segurança: perder as informações do papel, algum
usuário ou cliente manipular o registro manualmente, etc.

## Objetivos
O objetivo desse trabalho é realizar um sistema Web que
mantenha o controle dos livros de uma biblioteca, registrando
retiradas e devoluções de livros pelos seus clientes.

## Solução
Funcionalidades realizadas pelo bibliotecário:
- Autenticação do usuário: usuário da biblioteca possui um
usuário e uma senha para realizar autenticação (já pré-definidos
no banco de dados).
- Cadastro de livros: anota-se para cada livro o ISBN, nome,
autor(es), editora e ano de publicação. Editora pode ser
relacionada como String.
- Cadastro de autores: anota-se apenas o nome do autor e o país de
origem.
- Cadastro de clientes: cliente contém como informação a
matrícula, o nome e telefone.
- Retirada de livros: registra a retirada de livros de um cliente. Um
cliente pode retirar no máximo três livros e o livro deve estar 
disponível na biblioteca. Essa funcionalidade calcula uma data
para entrega.
- Devolução de livros: registra a devolução de livros de um cliente.
Durante a devolução, o livro torna-se disponível novamente na
biblioteca. Verifica se o livro está com atraso e calcula o número
de dias de atraso.
- Buscas: buscar por livros disponíveis, livros de um autor, livros
por um determinado nome, etc.

## Dependências
- [express@4.18.2](https://www.npmjs.com/package/express/v/4.18.2)
- [jest@29.5.0](https://www.npmjs.com/package/jest/v/29.5.0)
- [moment@2.29.4](https://www.npmjs.com/package/moment/v/2.29.4)

## Dependências de Desenvolvimento
- [@babel/preset-env@7.22.5](https://www.npmjs.com/package/@babel/preset-env/v/7.22.5)
- [babel-jest@29.5.0](https://www.npmjs.com/package/babel-jest/v/29.5.0)
- [swagger-autogen@2.23.1](https://www.npmjs.com/package/swagger-autogen/v/2.23.1)
- [swagger-ui-express@4.1.4](https://www.npmjs.com/package/swagger-ui-express/v/4.1.4)

## Rodando a aplicação
### Na própria maquina
1. Primeiramente, clone o projeto: `git clone https://github.com/Guilherme-klm/trabalho-1-DSA`
2. No terminal, execute o comando para instalar todas as dependências: `npm install`
3. Agora, para iniciar a aplicação, execute o comando: `npm start`

### Docker
1. Primeiramente, clone o projeto: `git clone https://github.com/Guilherme-klm/trabalho-1-DSA`
2. No terminal, execute o comando `docker build . -t <seu_usuario>/biblioteca-api`
3. Agora, para iniciar a aplicação, execute o comando: `docker docker run -p 3000:3000 <seu_usuario>/biblioteca-api`

## Autenticação
Para poder utilizar a API corretamente, o usuario irá precisar usar o Basic Authentication.  
Basta passar no campo username o valor `admin` e no password o valor `admin`.  

- Exemplo no Postman: 

![image](https://github.com/Guilherme-klm/trabalho-1-DSA/assets/57548840/2e726273-2bc9-437a-a411-d87fd1574abf)

## Testes
Para executar os testes, utilize o seguinte comando:
`npm test`

## Cobertura de Teste
Para gerar um relatório de cobertura de teste, utilize o seguinte comando:
`npm run coverage`

## Gerando a documentacao do Swagger
1. No terminal, execute o seguinte comando: `npm run swagger-autogen`
2. Inicie a aplicação com `npm start`
3. Acesse o link `http:localhost:3000/doc`
