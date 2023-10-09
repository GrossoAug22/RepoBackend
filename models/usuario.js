const { Schema, model } = require("mongoose");

const USERschema = Schema(
    {
        nombre: {
            type: String,
            required:[true, "El Nombre Es Un Campo Obligatorio"]
        },
        correo: {
            type: String,
            required: [true, "El Correo Es Un Campo Obligatorio"],
            unique:true,
        },
        password: {
            type: String,
            required:[true,"El Password Es Un Campo Obligatorio"]
        },
        img: {
            type: String,
        },
        rol: {
            type: String,
            required: [true,],
            
        },
        estado: {
            type: Boolean,
            default: true,
        },
    });

USERschema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
};


module.exports = model("Usuario", USERschema);