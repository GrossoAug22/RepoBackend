const { response, request } = require("express");

const Usuario = require("../models/usuario");

const bcrypt = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
    const { desde, limit } = req.query;

    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).skip(desde).limit(limit),
    ]);

    res.json({
        mensaje: "Envio Datos",
        total,
        usuarios,
    });
};

const usuariosPost = async (req = request, res = response) => {
    const datos = req.body;
    const { nombre, correo, password, rol } = datos;

    const usuario = new Usuario({ nombre, correo, password, rol });

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario,
        mensaje: "El usuario se creo correctamente!",
    });
};

const usuariosPut = async (req = request, res = response) => {
    const { id } = req.params;

    const { password, ...updUsuario } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        updUsuario.password = bcrypt.hashSync(password, salt);
    };

    const usuario = await Usuario.findByIdAndUpdate(id, updUsuario, { new: true, });


    res.json({
        mensaje: "Usuario Modificado Correctamente!",
        usuario,
        id,
    });
};
const usuariosDelete = async (req = request, res = response) => {
    const { id } = req.params;

    const usuarioAdmin = req.usuario;

    const usuario = await Usuario.findById(id);

    if (!usuario.estado) {
        return res.json({
            msg: ("El Usuario Ya Esta Inactivo!"),
        });
    };

    const usuarioInactivo = await Usuario.findByIdAndUpdate(id,
        { estado: false },
        { new: true });

    res.json({
        mensaje: "Usuario Eliminado",
        usuarioInactivo,
        usuarioAdmin,
    })
};


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,

} 