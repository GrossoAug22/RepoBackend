const mongoose = require("mongoose");


const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.mongodb_cnn);
    } catch (error) {
        console.log(error)
        throw new Error("Error Al Iniciar La Base De Datos")
    }
};


module.exports = {
    DBconnection,
}