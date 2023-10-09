const { Schema, model } = require("mongoose");


const RolSchema = Schema({
    rol:{type: String,
        require: [true, "El Rol Es Obligatorio!"],
    }
    
});


module.exports = model("Rol", RolSchema);