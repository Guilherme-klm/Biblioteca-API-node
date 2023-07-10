const dbConfig = require('./dbConfig');
const format = require('pg-format');

async function temLivrosCadastrados() {
    let client = await dbConfig.connect()
    
    let result = await client.query("select * from livro limit 1")

    client.release()
    return result.rows.length > 0
}

async function buscaLivrosDisponiveis() {
    let client = await dbConfig.connect()

    let result = await client.query("select * from livro where lvr_quantidade > 0 order by lvr_isbn")

    client.release()
    return result.rows
}

async function buscarTodosLivros() {
    let client = await dbConfig.connect()

    let result = await client.query("select * from livro order by lvr_isbn")

    client.release()
    return result.rows
}

async function buscarPorIdLivro(idLivro) {
    let client = await dbConfig.connect()

    let result = await client.query("select * from livro where lvr_isbn = $1", [idLivro])
    
    client.release()
    return result.rows[0]
}

async function buscarPorIdAutor(id) {
    let client = await dbConfig.connect()

    let query = "select * from livro " +
    "where lvr_isbn in ( " +
        "select lvr_isbn from livroautor al " +
        "inner join autor a on " +
        "a.aut_id = al.aut_id " +
        "where al.aut_id = $1 " +
        " )"

    let result = await client.query(query, [id])

    client.release()
    return result.rows
}

async function buscarPorNomeLivro(nomeLivro) {
    let client = await dbConfig.connect()

    let query = "select * from livro where lvr_nome = $1 order by lvr_isbn"

    let result = await client.query(query, [nomeLivro])

    client.release()
    return result.rows
}

async function existeLivro (newLivro) {
    let client = await dbConfig.connect()

    let query = format("SELECT count(*) as total " +
    "FROM livro l " +
    "INNER JOIN ( " +
        "SELECT lvr_isbn " +
        "FROM livroautor " +
        "GROUP BY lvr_isbn " +
        "HAVING COUNT(DISTINCT aut_id) = $1 " +
        "AND SUM(CASE WHEN aut_id IN (%L) THEN 1 ELSE 0 END) = $1 " +
    ") la on l.lvr_isbn = la.lvr_isbn " +
    "WHERE l.lvr_nome = $2 " +
    "AND l.lvr_editora = $3 " +
    "AND l.lvr_anopublicacao = $4 " +
    "AND l.lvr_quantidade = $5 ", newLivro.autores)

    let result = await client.query(query, 
            [
                newLivro.autores.length, 
                newLivro.nome, 
                newLivro.editora,
                newLivro.anoPublicacao,
                newLivro.quantidade,
            ]
        )
    client.release()
    return result.rows[0].total > 0
}

async function inserir(newLivro) {
    let client = await dbConfig.connect()
    let livroIsbn

    await client.query("insert into livro(lvr_nome, lvr_editora, lvr_anopublicacao, lvr_quantidade) values($1, $2, $3, $4) returning lvr_isbn",
    [newLivro.nome, newLivro.editora, newLivro.anoPublicacao, newLivro.quantidade])
        .then((result) => {
            livroIsbn = result.rows[0].lvr_isbn

            newLivro.autores.forEach((autor) => {
                client.query("insert into livroautor(lvr_isbn, aut_id) values($1, $2)", [livroIsbn, autor])
            })
        })
    
    client.release()
    return livroIsbn
}

module.exports = {
    temLivrosCadastrados, existeLivro, inserir, buscarTodosLivros, buscarPorIdAutor, 
    buscarPorNomeLivro, buscarPorIdLivro, buscaLivrosDisponiveis
}