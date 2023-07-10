const dbConfig = require('./dbConfig');

async function existeUsuario(credenciais) {
    let client = await dbConfig.connect()
    let result = await client.query(
        "select usr_nome, usr_senha from usuario where usr_nome= $1 and usr_senha= $2", 
        [credenciais.username, credenciais.password])
    
    client.release()
    
    if(result.rows.length == 0) {
        return false
    }

    return true
}

module.exports = { 
    existeUsuario
}