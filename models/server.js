const express = require("express");

const cors = require("cors");

const { DBconnection } = require("../database/config");


class Server {
    constructor() {
        this.app = express();

        this.port = process.env.port;

        this.usuarioPath = "/api/usuarios";

        this.ConectarBD();

        this.middleWares();

        this.routes();
    }



    async ConectarBD(){
        await DBconnection();
        console.log("Base De Datos ON");
    }

    middleWares() {
        this.app.use(cors);

        this.app.use(express.json());

        this.app.use(express.static("public"));
    }


    routes() {
        this.app.use(this.usuarioPath, require("../routes/usuarios.js"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server On ${this.port} `);
        });
    }
};


module.exports = Server;
