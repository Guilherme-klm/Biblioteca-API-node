let autores = []

function temAutoresCadastrados() {
    return autores.length > 0
}

function inserir(newAutor) {
    newAutor.id = Math.floor(Math.random() * 100);
    autores.push(newAutor)
    return newAutor.id
}

function naoExisteAutor(idAutor) {
    if (autores.length == 0) {
        false
    }
    
    return !autores.map(autor => autor.id).includes(idAutor)
}

function existeAutor(novoAutor) {
    if(autores.length == 0) {
        return false
    }

    let existeAutor = false

    autores.forEach(autor => {
        if(autor.nome == novoAutor.nome && autor.origem == novoAutor.origem) {
            existeAutor = true
            return
        }
    })

    return existeAutor
}

module.exports = {
    existeAutor, temAutoresCadastrados, inserir, naoExisteAutor
}