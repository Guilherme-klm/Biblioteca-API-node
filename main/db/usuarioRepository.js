let usuarios = [{
    username: "admin",
    password: "admin"
}]

function existeUsuario(credencias) {
    let existeUsuario = false

    usuarios.forEach(usuario => {
        if(usuario.username == credencias.username && usuario.password == credencias.password) {
            existeUsuario = true
            return
        }
    });
    
    return existeUsuario
}

module.exports = {
    existeUsuario
}