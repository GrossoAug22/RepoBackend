
const Usuario = require("../models/usuario");

const Rol = require("../models/rol");


const esMailValido = async (correo) => {
    const existeMail = await Usuario.findOne({ correo });

    if (existeMail) {
        throw new Error(`El Correo ${correo} Ya Esta En Uso!`);
    }
};

const esRolValido = async (rol) => {
    const rolValido = await Rol.findOne({ rol });

    if (!rolValido) {
        throw new Error(`El Rol ${rol} No Es Valido!`);
    };

};

const esIdValido = async (id) => {
    const existeUsuario = await Usuario.findById(id);

    if (!existeUsuario) {
        throw new Error(`El Id ${id} No Fue Encontrado`);  
    };
}

const esCategoriaValida = async(id)=>{
    const Existeusuario = await Usuario.findById(id);

    if(!Existeusuario){
        throw new Error("La categoria No existe en la base de datos!");

    };
}
module.exports = {
    esMailValido,
    esRolValido,
    esIdValido,
    esCategoriaValida,
}