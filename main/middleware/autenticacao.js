const usuarioRepository = require('../db/usuarioRepository');

function verificarLogin(req, res, next) {
    const authheader = req.headers.authorization;

    if (!authheader) {
        return res.status(401).json({ message: 'Credenciais de autenticacao invalidas' });
    }

    const base64Credenciais =  req.headers.authorization.split(' ')[1];
    const credenciais = Buffer.from(base64Credenciais, 'base64').toString();
    const [username, password] = credenciais.split(':');
    const existeUsuario = usuarioRepository.existeUsuario({ username, password });

    if(!existeUsuario) {
        return res.status(401).json({ message: 'Credenciais de autenticacao invalidas' });
    }

    next()
}

module.exports = {
    verificarLogin
}