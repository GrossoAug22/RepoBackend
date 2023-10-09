const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const generarJWT = require("../helpers/generar-JWT");


const login = async (req = request, res = response) => {
    const { correo, password } = req.body;


    try {
        const usuario = await Usuario.findOne({ correo });

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!usuario) {
            return res.status(400).json({
                msg: "El Correo O Contraseña es incorrecto! | correo"
            });
        };

        if (!validPassword) {
            return res.status(400).json({
                msg: "El Correo O Contraseña es incorrecto! | contraseña"
            })
        };

        if (!usuario.estado) {
            return res.status(400).json({
                msg: "El Usuario Esta Actualmente Deshabilitado!"
            });
        };

        const token = await generarJWT(usuario.id);

        res.json({
            msg: "Login Ok!",
            correo,
            password,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error En El Servidor!"
        })
    };

};


module.exports = {
    login,
}