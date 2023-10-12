const { request, response } = require("express");
const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");



const validarJWT = async (req = request , res = response, next) => {
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            msg: "Falta El Token En La Peticion!"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: "El Token No Es Valido! El Usuario no existe!"
            });
        }

        if (!usuario.estado) {
            return res.status(401).json({
                msg: "El Token No Es Valido! El Usuario esta inactivo!"
            });
        }
        req.usuario = usuario;

        next();


    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "El Token No Es Valido!"
        });
    };

};


module.exports = {
    validarJWT,
}