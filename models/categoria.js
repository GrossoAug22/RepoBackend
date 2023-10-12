const { Schema, model} = require("mongoose");


const categoriaSCHEMA = Schema({
    nombre: {
        type: String,
        required: [true, "El Nombre Es Obligatiorio!"],
        unique:true,
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});


module.exports = model("Categoria", categoriaSCHEMA);