const { response, request } = require("express");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
    res.json({
        mensaje: "recibo el mensaje",
    });
};

const usuariosPost = async (req = request, res = response) => {
    const datos= req.body;
    const { nombre, correo, password, rol } = datos;

    const usuario = new Usuario(nombre, correo, password, rol);

    await usuario.save();

    res.json({
        usuario,
        mensaje: "envio el mensaje",
    });
};

const usuariosPut = (req = request, res = response) => {
    res.json({
        mensaje: "modifico el mensaje",
    });
};
const usuariosDelete = (req = request, res = response) => {
    res.json({
        mensaje: "elimino el mensaje",
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

} 