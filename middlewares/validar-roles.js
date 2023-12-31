const { request, response } = require("express");


const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuario) {
        return res.status(500).json({
            msg: "Necesita Primero Validar El Token!"
        });
    };

    const { rol, nombre } = req.usuario;

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    };

    next();
};


module.exports = {
    esAdminRole,
}