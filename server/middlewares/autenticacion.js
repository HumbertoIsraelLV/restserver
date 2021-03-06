const jwt = require('jsonwebtoken');


//////////////////////
//VERIFICAR TOKEN
////////////////////
let verificaToken = (req, res, next) => {
    let token = req.get('token'); //AUTHORIZATION

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};
//////////////////////
//VERIFICAR TOKEN PARA IMAGEN
////////////////////
let verificaTokenImg = (req, res, next) => {
    let token = req.query.token;
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: 'token no valido'
            });
        }
        req.usuario = decoded.usuario;
        next();
    });

}



//////////////////////
//VERIFICAR ADMIN ROLE
////////////////////
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role == 'ADMIN_ROLE')
        next();
    else {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};


module.exports = {
    verificaToken,
    verificaAdminRole,
    verificaTokenImg
};