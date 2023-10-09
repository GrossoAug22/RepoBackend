const mongoose = require("mongoose");


const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log("Base De Datos ON");
    } catch (error) {
        console.log(error)
        throw new Error("Error Al Iniciar La Base De Datos")
    }
};


module.exports = {
    DBconnection,
}